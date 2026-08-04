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
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-gryphon-black via-slate-900 to-slate-800 text-white shadow-2xl overflow-hidden">
      {/* Live badge */}
      <div className="px-7 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/70 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gryphon-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gryphon-gold" />
          </span>
          Live · updated every 5s
        </div>
        <div className="text-[11px] uppercase tracking-widest text-white/50 font-semibold">
          W.F. Mitchell Athletics Centre
        </div>
      </div>

      {/* Big count */}
      <div className="px-7 pt-3 pb-5">
        <div className={`flex items-baseline gap-3 ${pulse ? "animate-counter-pop" : ""}`}>
          <span className="text-6xl md:text-7xl font-black tracking-tight tabular-nums leading-none">
            {data.occupancy}
          </span>
          <span className="text-xl md:text-2xl text-white/50 tabular-nums font-semibold">
            /&nbsp;{data.capacity}
          </span>
        </div>
        <div className="mt-1.5 text-sm text-white/60">people in the gym right now</div>
      </div>

      {/* Status row: face + label */}
      <div className="px-7 py-5 border-t border-white/10 flex items-center gap-4">
        <div
          className="text-5xl leading-none shrink-0"
          style={{ color: data.crowd.color }}
          aria-hidden
        >
          {data.crowd.face}
        </div>
        <div className="min-w-0">
          <div
            className="text-xl md:text-2xl font-black tracking-tight"
            style={{ color: data.crowd.color }}
          >
            {data.crowd.label}
          </div>
          <div className="text-sm text-white/70 mt-0.5">{data.crowd.message}</div>
        </div>
      </div>

      {/* Capacity bar with proper 4-column labels */}
      <div className="px-7 py-5 border-t border-white/10">
        <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, data.percentFull)}%`, backgroundColor: data.crowd.color }}
          />
        </div>
        <div
          className="mt-2 text-[10px] uppercase tracking-widest text-white/50 font-semibold"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <span className="text-left">Quiet</span>
          <span className="text-center">Moderate</span>
          <span className="text-center">Busy</span>
          <span className="text-right">Packed</span>
        </div>
      </div>

      {/* Metric grid */}
      <div className="px-7 py-5 border-t border-white/10 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
            Avg. visit today
          </div>
          <div className="mt-1 text-xl md:text-2xl font-black tracking-tight text-white">
            {data.avgVisitMinutes} min
          </div>
          <div className="text-[11px] text-white/50 mt-0.5">Rolling 14-day</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
            Capacity used
          </div>
          <div className="mt-1 text-xl md:text-2xl font-black tracking-tight text-white">
            {data.percentFull}%
          </div>
          <div className="text-[11px] text-white/50 mt-0.5">
            {data.capacity - data.occupancy} spots free
          </div>
        </div>
      </div>
    </div>
  );
}
