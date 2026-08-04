"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { StaffMember } from "@/data/staff";

type Props = {
  members: StaffMember[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ValuedMembersSlider({
  members,
  title = "Valued Members and Staff",
  eyebrow = "Real voices",
  intro = "Hear directly from Fit & Rec team members about their experience working and training at the W.F. Mitchell Athletics Centre.",
  ctaHref = "/about/valued-members",
  ctaLabel = "See all members and staff",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    el.scrollBy({ left: dir * cardWidth * 1.1, behavior: "smooth" });
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
              {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{intro}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-gryphon-red hover:text-gryphon-red disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Scroll left"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-gryphon-red hover:text-gryphon-red disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Scroll right"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {members.map((m) => (
            <Link
              key={m.slug}
              href={`/about/valued-members#${m.slug}`}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-gryphon-red hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={m.photo}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 280px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="font-bold text-lg leading-tight">{m.name}</div>
                  <div className="text-xs text-white/80 mt-0.5">{m.role}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gryphon-red mb-1">
                  {m.program}
                </div>
                <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                  {m.bio.experience ?? m.bio.favourite ?? m.bio.meaningful}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-gryphon-red hover:text-gryphon-red transition"
          >
            {ctaLabel}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
