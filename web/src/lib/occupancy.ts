import { prisma } from "./prisma";

/**
 * Authoritative live gym occupancy.
 *
 * The /api/scan endpoint owns Member.isInside. Approved scans toggle it;
 * denied, expired, inactive, and unknown scans never touch it.
 */
export async function getCurrentOccupancy(): Promise<number> {
  return prisma.member.count({ where: { isInside: true } });
}

/** Rolling 14-day average visit duration in minutes. */
export async function getAverageVisitMinutes(): Promise<number> {
  const rows: Array<{ avg: number | null }> = await prisma.$queryRaw`
    SELECT AVG("durationMinutes")::float AS avg
    FROM "GymSession"
    WHERE "enteredAt" >= NOW() - INTERVAL '14 days';
  `;
  return Math.round(rows[0]?.avg ?? 65);
}

export type CrowdLevel = "quiet" | "moderate" | "busy" | "packed";

export function getCrowdLevel(occupancy: number, capacity: number): {
  level: CrowdLevel;
  label: string;
  message: string;
  color: string;
  face: string;
} {
  const pct = occupancy / capacity;
  if (pct < 0.35)
    return {
      level: "quiet",
      label: "Great time to go",
      message: "It's quiet - you'll have your pick of equipment.",
      color: "#22c55e",
      face: "😀",
    };
  if (pct < 0.65)
    return {
      level: "moderate",
      label: "Moderately busy",
      message: "Some wait times possible, but generally fine.",
      color: "#eab308",
      face: "🙂",
    };
  if (pct < 0.85)
    return {
      level: "busy",
      label: "Busy right now",
      message: "Expect to wait for popular equipment.",
      color: "#f97316",
      face: "😐",
    };
  return {
    level: "packed",
    label: "Not the best time",
    message: "The gym is packed. Consider coming back later.",
    color: "#ef4444",
    face: "😣",
  };
}

export const GYM_CAPACITY = Number(process.env.GYM_MAX_CAPACITY ?? 450);

export async function computeOccupancy() {
  const [occupancy, avgVisitMinutes] = await Promise.all([
    getCurrentOccupancy(),
    getAverageVisitMinutes(),
  ]);
  const capacity = GYM_CAPACITY;
  const percentFull = Math.round((occupancy / capacity) * 100);
  const crowd = getCrowdLevel(occupancy, capacity);
  return {
    occupancy,
    capacity,
    percentFull,
    avgVisitMinutes,
    crowd,
    updatedAt: new Date().toISOString(),
  };
}
