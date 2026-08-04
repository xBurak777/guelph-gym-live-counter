import { NextResponse } from "next/server";
import {
  getCurrentOccupancy,
  getAverageVisitMinutes,
  getCrowdLevel,
  GYM_CAPACITY,
} from "@/lib/occupancy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const [occupancy, avgVisitMinutes] = await Promise.all([
    getCurrentOccupancy(),
    getAverageVisitMinutes(),
  ]);
  const level = getCrowdLevel(occupancy, GYM_CAPACITY);

  return NextResponse.json({
    occupancy,
    capacity: GYM_CAPACITY,
    percentFull: Math.round((occupancy / GYM_CAPACITY) * 100),
    avgVisitMinutes,
    crowd: level,
    updatedAt: new Date().toISOString(),
  });
}
