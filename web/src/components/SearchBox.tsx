"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchIndex, type SearchEntry } from "@/data/search-index";

const CATEGORY_LABELS: Record<SearchEntry["category"], string> = {
  page: "Page",
  program: "Program",
  staff: "Team",
  class: "NRG Class",
  facility: "Facility",
  policy: "Policy",
};

const CATEGORY_COLORS: Record<SearchEntry["category"], string> = {
  page: "bg-slate-100 text-slate-700",
  program: "bg-red-50 text-gryphon-red",
  staff: "bg-amber-50 text-amber-800",
  class: "bg-emerald-50 text-emerald-700",
  facility: "bg-sky-50 text-sky-700",
  policy: "bg-violet-50 text-violet-700",
};

type Props = {
  variant?: "nav" | "hero";
  onNavigate?: () => void; // fired when a result is clicked (used to close mobile menu)
  placeholder?: string;
};

export default function SearchBox({
  variant = "nav",
  onNavigate,
  placeholder = "Search programs, staff, hours…",
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchIndex(query, 10), [query]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightIdx(0);
  }, [results]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[highlightIdx];
      if (target) {
        window.location.href = target.url;
      }
    }
  }

  const inputBase =
    variant === "hero"
      ? "w-full rounded-full border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-gryphon-red focus:ring-2 focus:ring-gryphon-red/20 transition"
      : "w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-gryphon-red focus:ring-2 focus:ring-gryphon-red/20 transition";

  const iconSize = variant === "hero" ? "h-5 w-5 left-3.5" : "h-4 w-4 left-3";

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <svg
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${iconSize}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputBase}
          aria-label="Search the site"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && query.trim().length >= 2 && (
        <div
          className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
          role="listbox"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-500">
              No results for &ldquo;<span className="font-medium text-slate-700">{query}</span>&rdquo;.
              <div className="mt-1 text-xs text-slate-400">Try &ldquo;yoga&rdquo;, &ldquo;membership&rdquo;, or &ldquo;climbing&rdquo;.</div>
            </div>
          ) : (
            <>
              <div className="border-b border-slate-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
              </div>
              <ul className="divide-y divide-slate-50">
                {results.map((r, idx) => (
                  <li key={r.url + r.title}>
                    <Link
                      href={r.url}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                        onNavigate?.();
                      }}
                      onMouseEnter={() => setHighlightIdx(idx)}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                        idx === highlightIdx ? "bg-slate-50" : ""
                      }`}
                    >
                      <span
                        className={`shrink-0 mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          CATEGORY_COLORS[r.category]
                        }`}
                      >
                        {CATEGORY_LABELS[r.category]}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-slate-900 truncate">{r.title}</div>
                        <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{r.description}</div>
                      </div>
                      <svg
                        className="h-4 w-4 shrink-0 mt-1 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Use ↑ ↓ to navigate, Enter to open</span>
                <span>Esc to close</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
