import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { GYM_CAPACITY } from "@/lib/occupancy";

const ScanBody = z.object({
  cardUid: z.string().min(1).max(64),
  gateId: z.string().min(1).max(64).default("gate-1"),
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const secret = process.env.SCAN_API_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = ScanBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "bad_request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const cardUid = normalizeCardUid(parsed.data.cardUid);
  const gateId = parsed.data.gateId;
  if (!cardUid) {
    return NextResponse.json({ ok: false, error: "invalid_card_uid" }, { status: 400 });
  }

  const member = await prisma.member.findUnique({ where: { cardUid } });

  // Unknown cards are logged, but never change presence or occupancy.
  if (!member) {
    await prisma.scanEvent.create({
      data: { cardUid, direction: "IN", result: "DENIED_UNKNOWN_CARD", gateId },
    });
    return NextResponse.json({
      ok: false,
      accessStatus: "DENIED",
      result: "DENIED_UNKNOWN_CARD",
      message: "Card not registered.",
      occupancy: await currentOccupancy(),
      capacity: GYM_CAPACITY,
    });
  }

  const now = new Date();

  // Expired/inactive cards are logged, but never change presence or occupancy.
  if (!member.isActive || member.membershipEnd <= now) {
    const result = member.isActive ? "DENIED_EXPIRED" : "DENIED_INACTIVE";
    await prisma.scanEvent.create({
      data: {
        memberId: member.id,
        cardUid,
        direction: member.isInside ? "OUT" : "IN",
        result,
        gateId,
      },
    });
    return NextResponse.json({
      ok: false,
      accessStatus: "DENIED",
      result,
      message: member.isActive ? "Membership expired." : "Access denied.",
      member: publicMember(member),
      occupancy: await currentOccupancy(),
      capacity: GYM_CAPACITY,
    });
  }

  // Retry serializable transactions if two requests race on the same member.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await prisma.$transaction(
        async (tx) => {
          const current = await tx.member.findUniqueOrThrow({ where: { id: member.id } });
          const direction: "IN" | "OUT" = current.isInside ? "OUT" : "IN";
          const enteredAt = current.currentVisitStartedAt;

          await tx.member.update({
            where: { id: current.id },
            data: {
              isInside: direction === "IN",
              currentVisitStartedAt: direction === "IN" ? now : null,
            },
          });

          await tx.scanEvent.create({
            data: {
              memberId: current.id,
              cardUid,
              direction,
              result: "SUCCESS",
              gateId,
              scannedAt: now,
            },
          });

          if (direction === "OUT" && enteredAt) {
            const durationMinutes = Math.max(
              1,
              Math.round((now.getTime() - enteredAt.getTime()) / 60000)
            );
            await tx.gymSession.create({
              data: {
                memberId: current.id,
                enteredAt,
                exitedAt: now,
                durationMinutes,
              },
            });
          }

          const occupancy = await tx.member.count({ where: { isInside: true } });
          return { current, direction, occupancy };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );

      const daysRemaining = Math.ceil(
        (result.current.membershipEnd.getTime() - now.getTime()) / 86_400_000
      );
      const warning = daysRemaining <= 7;

      return NextResponse.json({
        ok: true,
        accessStatus: warning ? "WARNING" : "APPROVED",
        result: "SUCCESS",
        direction: result.direction,
        message: warning
          ? `Membership expires in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}.`
          : result.direction === "IN"
            ? `Welcome, ${result.current.firstName}. Have a great workout.`
            : `See you next time, ${result.current.firstName}.`,
        member: publicMember(result.current),
        occupancy: result.occupancy,
        capacity: GYM_CAPACITY,
      });
    } catch (error) {
      const retryable =
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034";
      if (!retryable || attempt === 2) throw error;
    }
  }

  return NextResponse.json({ ok: false, error: "scan_failed" }, { status: 500 });
}

function normalizeCardUid(value: string): string {
  const hex = value.toUpperCase().replace(/[^0-9A-F]/g, "");
  if (hex.length < 8 || hex.length > 14 || hex.length % 2 !== 0) return "";
  return hex.match(/.{2}/g)?.join(":") ?? "";
}

async function currentOccupancy() {
  return prisma.member.count({ where: { isInside: true } });
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
