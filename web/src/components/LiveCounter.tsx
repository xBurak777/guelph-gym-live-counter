"use client";

import { useEffect, useState } from "react";

type Occupancy = {
  occupancy: number;
  capacity: number;
  percentFull: number;
  avgVisitMinutes: number;
  crowd: {
    level: "quiet" | "moderate" | "busy" | "packed";
    label: string;
    message: string;
    color: string;
    face: string;
  };
  updatedAt: string;
};

export default function LiveCounter({ initial }: { initial: Occupancy }) {
  const [data, setData] = useState<Occupancy>(initial);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch("/api/occupancy", { cache: "no-store" });
        if (!res.ok) return;
        const next: Occupancy = await res.json();
        if (cancelled) return;
        if (next.occupancy !== data.occupancy) {
          setPulse(true);
          setTimeout(() => setPulse(false), 400);
        }
        setData(next);
      } catch { /* ignore transient */ }
    };
    const id = setInterval(tick, 5000);
    return () => { cancelled = true; clearInterval(id); };
  }, [data.occupancy]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Big number */}
        <div className="md:col-span-2 p-8 md:p-10 bg-gradient-to-br from-gryphon-black to-slate-800 text-white">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gryphon-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gryphon-gold" />
            </span>
            Live · updated every 5 s
          </div>

          <div className={`mt-3 flex items-baseline gap-3 ${pulse ? "animate-counter-pop" : ""}`}>
            <span className="text-7xl md:text-8xl font-black tracking-tight tabular-nums">
              {data.occupancy}
            </span>
            <span className="text-lg text-slate-300">/ {data.capacity}</span>
          </div>
          <div className="mt-1 text-sm text-slate-300">people in the gym right now</div>

          <div className="mt-6">
            <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, data.percentFull)}%`, backgroundColor: data.crowd.color }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] uppercase tracking-widest text-slate-400">
              <span>Quiet</span><span>Moderate</span><span>Busy</span><span>Packed</span>
            </div>
          </div>
        </div>

        {/* Status face + advice */}
        <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div
              className="text-6xl leading-none"
              style={{ color: data.crowd.color }}
              aria-hidden
            >
              {data.crowd.face}
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: data.crowd.color }}>
                {data.crowd.label}
              </div>
              <div className="text-slate-600 mt-0.5">{data.crowd.message}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <MetricCard
              label="Avg. visit today"
              value={`${data.avgVisitMinutes} min`}
              hint="Rolling 14-day"
            />
            <MetricCard
              label="Capacity used"
              value={`${data.percentFull}%`}
              hint={`${data.capacity - data.occupancy} spots free`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{label}</div>
      <div className="mt-1 text-2xl font-black tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{hint}</div>
    </div>
  );
}
