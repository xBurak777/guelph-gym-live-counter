import Image from "next/image";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  crumbs = [],
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gryphon-black text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gryphon-black via-gryphon-black/70 to-gryphon-black/40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        {crumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="opacity-40">/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
          {eyebrow && (
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-gryphon-gold">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
