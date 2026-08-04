import Link from "next/link";
import { brand } from "@/lib/brand";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="bg-gryphon-gold text-black text-xs">
        <div className="mx-auto max-w-7xl px-6 py-1.5 flex items-center gap-6">
          <Link href="/nrg" className="font-semibold hover:underline">View NRG Schedule</Link>
          <Link href="/hours" className="hover:underline">Hours</Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="opacity-80">{brand.contact.phone}</span>
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-10 w-10 rounded-full bg-gryphon-red flex items-center justify-center">
            <span className="text-gryphon-gold font-black text-lg">G</span>
          </div>
          <div className="leading-tight">
            <div className="font-black tracking-tight">GUELPH</div>
            <div className="text-[10px] font-bold tracking-widest text-gryphon-red">GRYPHONS</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {brand.nav.map((item) => (
            <li key={item.label} className="group relative">
              <button className="flex items-center gap-1 py-2 hover:text-gryphon-red transition-colors">
                {item.label}
                <svg className="h-3 w-3 opacity-60" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                <div className="min-w-[220px] rounded-xl border border-slate-200 bg-white shadow-lg p-2">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50 hover:text-gryphon-red"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden md:inline-flex items-center rounded-full bg-gryphon-red px-4 py-2 text-sm font-semibold text-white hover:bg-gryphon-red-dark transition-colors"
          >
            Join Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
