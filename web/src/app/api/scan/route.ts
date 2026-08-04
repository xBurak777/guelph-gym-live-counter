import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// The ESP32 posts to this endpoint on every card tap.
//
// Body: { "cardUid": "AA:BB:CC:DD", "gateId": "gate-1" }
// Header: Authorization: Bearer <SCAN_API_SECRET>
//
// Response: { ok: true, result: "SUCCESS", direction: "IN" | "OUT",
//             member: { firstName, lastName, membershipTier, membershipEnd },
//             occupancy: 187 }

const ScanBody = z.object({
  cardUid: z.string().min(1).max(64),
  gateId: z.string().default("gate-1"),
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. Verify shared secret
  const secret = process.env.SCAN_API_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // 2. Parse body
  const body = await req.json().catch(() => null);
  const parsed = ScanBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "bad_request", details: parsed.error.flatten() }, { status: 400 });
  }
  const { cardUid, gateId } = parsed.data;

  // 3. Look up member
  const member = await prisma.member.findUnique({ where: { cardUid } });

  // 3a. Unknown card
  if (!member) {
    await prisma.scanEvent.create({
      data: { cardUid, direction: "IN", result: "DENIED_UNKNOWN_CARD", gateId },
    });
    return NextResponse.json({
      ok: false,
      result: "DENIED_UNKNOWN_CARD",
      message: "Card not registered.",
    });
  }

  // 3b. Inactive membership
  if (!member.isActive || member.membershipEnd < new Date()) {
    await prisma.scanEvent.create({
      data: {
        memberId: member.id,
        cardUid,
        direction: "IN",
        result: member.isActive ? "DENIED_EXPIRED" : "DENIED_INACTIVE",
        gateId,
      },
    });
    return NextResponse.json({
      ok: false,
      result: member.isActive ? "DENIED_EXPIRED" : "DENIED_INACTIVE",
      message: member.isActive ? "Membership expired." : "Membership inactive.",
      member: publicMember(member),
    });
  }

  // 4. Figure out IN vs OUT — toggle based on most-recent successful scan today
  const lastSuccess = await prisma.scanEvent.findFirst({
    where: {
      memberId: member.id,
      result: "SUCCESS",
      scannedAt: { gte: startOfGymDay() },
    },
    orderBy: { scannedAt: "desc" },
  });
  const direction: "IN" | "OUT" = lastSuccess?.direction === "IN" ? "OUT" : "IN";

  // 5. Record the scan
  await prisma.scanEvent.create({
    data: { memberId: member.id, cardUid, direction, result: "SUCCESS", gateId },
  });

  // 6. On successful exit, close the visit into a GymSession
  if (direction === "OUT" && lastSuccess && lastSuccess.direction === "IN") {
    const enteredAt = lastSuccess.scannedAt;
    const exitedAt = new Date();
    const durationMinutes = Math.max(1, Math.round((exitedAt.getTime() - enteredAt.getTime()) / 60000));
    await prisma.gymSession.create({
      data: { memberId: member.id, enteredAt, exitedAt, durationMinutes },
    });
  }

  // 7. Live occupancy after this scan
  const { getCurrentOccupancy, GYM_CAPACITY } = await import("@/lib/occupancy");
  const occupancy = await getCurrentOccupancy();

  return NextResponse.json({
    ok: true,
    result: "SUCCESS",
    direction,
    message:
      direction === "IN"
        ? `Welcome, ${member.firstName}. Have a great workout.`
        : `See you next time, ${member.firstName}.`,
    member: publicMember(member),
    occupancy,
    capacity: GYM_CAPACITY,
  });
}

function publicMember(m: {
  firstName: string;
  lastName: string;
  membershipTier: string;
  membershipEnd: Date;
  photoUrl: string | null;
}) {
  return {
    firstName: m.firstName,
    lastName: m.lastName,
    membershipTier: m.membershipTier,
    membershipEnd: m.membershipEnd,
    photoUrl: m.photoUrl,
  };
}

// Gym day starts at 5am — anything scanned before that belongs to yesterday.
function startOfGymDay(): Date {
  const now = new Date();
  const start = new Date(now);
  start.setHours(5, 0, 0, 0);
  if (now < start) start.setDate(start.getDate() - 1);
  return start;
}
