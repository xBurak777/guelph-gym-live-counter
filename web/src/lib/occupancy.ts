import { prisma } from "./prisma";

/**
 * Live gym occupancy: count of members currently inside.
 *
 * A member is "inside" if their most recent successful ScanEvent has
 * direction = 'IN' (i.e. they've scanned in and not yet scanned out).
 *
 * Implemented with a window function so it stays fast even at 10k+ members.
 */
export async function getCurrentOccupancy(): Promise<number> {
  const result: Array<{ count: bigint }> = await prisma.$queryRaw`
    WITH latest AS (
      SELECT DISTINCT ON ("memberId")
        "memberId", "direction"
      FROM "ScanEvent"
      WHERE "memberId" IS NOT NULL
        AND "result" = 'SUCCESS'
        AND "scannedAt" >= NOW() - INTERVAL '18 hours'
      ORDER BY "memberId", "scannedAt" DESC
    )
    SELECT COUNT(*)::bigint AS count FROM latest WHERE "direction" = 'IN';
  `;
  return Number(result[0]?.count ?? 0);
}

/**
 * Rolling 14-day average visit duration (minutes) across all completed sessions.
 * Shown next to the counter so members can plan when to come.
 */
export async function getAverageVisitMinutes(): Promise<number> {
  const rows: Array<{ avg: number | null }> = await prisma.$queryRaw`
    SELECT AVG("durationMinutes")::float AS avg
    FROM "GymSession"
    WHERE "enteredAt" >= NOW() - INTERVAL '14 days';
  `;
  return Math.round(rows[0]?.avg ?? 65); // 65 min sensible default before we have data
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
      message: "It's quiet — you'll have your pick of equipment.",
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
