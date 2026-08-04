"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { brand } from "@/lib/brand";
import SearchBox from "@/components/SearchBox";

export default function NavBar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* utility bar */}
      <div className="hidden md:block bg-gryphon-black text-slate-200 text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center gap-6">
          <Link href="/hours" className="hover:text-white">Hours</Link>
          <Link href="/nrg" className="hover:text-white">NRG Schedule</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/about/policies" className="hover:text-white">Policies</Link>
          <div className="ml-auto flex items-center gap-4">
            <a href={`tel:${brand.contact.phone}`} className="hover:text-white">
              {brand.contact.phone}
            </a>
            <a
              href="https://www.uoguelph.ca"
              target="_blank"
              rel="noopener"
              className="text-slate-400 hover:text-white"
            >
              uoguelph.ca ↗
            </a>
          </div>
        </div>
      </div>

      {/* main nav */}
      <nav className="mx-auto max-w-7xl px-4 lg:px-4 xl:px-4 min-[1440px]:px-6 py-4 flex items-center gap-2 xl:gap-3 min-[1440px]:gap-5">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Image
            src="/images/logos/fitandrec-logo.png"
            alt="Guelph Gryphons Fit & Rec"
            width={72}
            height={72}
            priority
            className="h-12 w-12 xl:h-12 xl:w-12 min-[1440px]:h-14 min-[1440px]:w-14 object-contain"
          />
          <div className="leading-tight hidden sm:block lg:hidden xl:block">
            <div className="text-[12px] min-[1440px]:text-sm min-[1600px]:text-base font-black tracking-tight text-slate-900 group-hover:text-gryphon-red transition-colors whitespace-nowrap">
              GRYPHON FIT & REC
            </div>
            <div className="text-[8px] min-[1440px]:text-[9px] min-[1600px]:text-[10px] font-bold tracking-widest text-gryphon-red whitespace-nowrap">
              UNIVERSITY OF GUELPH
            </div>
          </div>
        </Link>

        <ul className="hidden xl:flex items-center gap-1.5 min-[1440px]:gap-3 min-[1600px]:gap-4 text-sm font-semibold text-slate-800">
          {brand.nav.map((item) => (
            <li key={item.label} className="group relative">
              <button className="flex items-center gap-1 py-2 hover:text-gryphon-red transition-colors whitespace-nowrap">
                {item.label}
                <svg className="h-3 w-3 opacity-60" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                <div className="min-w-[240px] rounded-xl border border-slate-200 bg-white shadow-xl p-2">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-gryphon-red"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:gap-3 shrink-0">
          {/* Desktop search — visible md+ */}
          <div className="hidden md:block w-36 lg:w-32 xl:w-28 min-[1440px]:w-36 min-[1600px]:w-44">
            <SearchBox variant="nav" placeholder="Search…" />
          </div>

          <Link
            href="/membership"
            className="hidden md:inline-flex items-center whitespace-nowrap rounded-full bg-gryphon-red px-3.5 py-2 text-sm font-semibold text-white hover:bg-gryphon-red-dark transition-colors shrink-0"
          >
            Join Now
          </Link>

          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="xl:hidden rounded-lg border border-slate-200 p-2 text-slate-700 hover:border-slate-300"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {openMobile ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {openMobile && (
        <div className="xl:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-3 divide-y divide-slate-100">
            {/* Mobile search sits at the top of the menu */}
            <div className="py-3 md:hidden">
              <SearchBox
                variant="nav-mobile"
                onNavigate={() => setOpenMobile(false)}
                placeholder="Search programs, staff, hours…"
              />
            </div>
            {brand.nav.map((item) => (
              <div key={item.label} className="py-2">
                <button
                  onClick={() => setOpenMobileItem(openMobileItem === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between py-2 text-sm font-semibold text-slate-800"
                >
                  {item.label}
                  <span className={`transition-transform ${openMobileItem === item.label ? "rotate-180" : ""}`}>▾</span>
                </button>
                {openMobileItem === item.label && (
                  <ul className="pl-3 pb-2 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpenMobile(false)}
                          className="block py-2 text-sm text-slate-600 hover:text-gryphon-red"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Link
                href="/membership"
                onClick={() => setOpenMobile(false)}
                className="block w-full text-center rounded-full bg-gryphon-red px-4 py-2.5 text-sm font-semibold text-white"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
