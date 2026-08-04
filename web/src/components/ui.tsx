import Link from "next/link";
import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export function InfoCard({
  eyebrow,
  title,
  description,
  href,
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  className?: string;
  children?: ReactNode;
}) {
  const inner = (
    <div className={`h-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-gryphon-red hover:shadow-lg ${className}`}>
      {eyebrow && (
        <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red mb-3">
          {eyebrow}
        </div>
      )}
      <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
      {description && (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{description}</p>
      )}
      {children}
      {href && (
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gryphon-red">
          Learn more <span aria-hidden>→</span>
        </div>
      )}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function PriceTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: (string | ReactNode)[][];
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-4 md:px-6 py-4 text-left font-semibold text-slate-700 ${
                    i === 0 ? "" : "text-right md:text-left"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/70">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 md:px-6 py-4 ${
                      j === 0 ? "font-medium text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-xs text-slate-500">{caption}</div>}
    </div>
  );
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warning" | "note";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: "border-l-gryphon-red bg-red-50/40",
    warning: "border-l-gryphon-gold bg-amber-50",
    note: "border-l-slate-300 bg-slate-50",
  } as const;
  return (
    <div className={`rounded-r-lg border-l-4 px-5 py-4 ${styles[variant]}`}>
      {title && <div className="font-semibold text-slate-900 mb-1">{title}</div>}
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-custom space-y-4 text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

export function StatGrid({
  items,
}: {
  items: { label: string; value: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {items.map((s, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-3xl font-black tracking-tight text-gryphon-red">{s.value}</div>
          <div className="mt-2 text-sm font-semibold text-slate-900">{s.label}</div>
          {s.sub && <div className="text-xs text-slate-500 mt-1">{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary: "bg-gryphon-red text-white hover:bg-gryphon-red-dark",
    secondary: "bg-gryphon-black text-white hover:bg-slate-800",
    ghost: "border border-slate-300 text-slate-900 hover:border-gryphon-red hover:text-gryphon-red",
  } as const;
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
