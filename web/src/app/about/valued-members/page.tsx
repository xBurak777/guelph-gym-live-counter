import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { Section } from "@/components/ui";
import { STAFF } from "@/data/staff";

export const metadata: Metadata = {
  title: "Valued Members and Staff — Gryphon Fit & Rec",
  description:
    "Meet the student staff and members of the W.F. Mitchell Athletics Centre in their own words.",
};

export default function ValuedMembersPage() {
  const featured = STAFF.filter((s) => s.featured);
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
              The team behind the Mitchell
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
              Valued Members and Staff
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Hear directly from some of your Valued Members and Staff by reading their experiences
              below. Details on all available student jobs within Athletics are available online
              at{" "}
              <a
                href="https://experienceguelph.ca"
                target="_blank"
                rel="noopener"
                className="underline decoration-gryphon-red underline-offset-4 hover:text-white"
              >
                Experience Guelph
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <Section>
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
            Featured this term
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            {featured.length} featured team members
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m) => (
            <a
              key={m.slug}
              href={`#${m.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-gryphon-red hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <Image
                  src={m.photo}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="font-bold text-lg leading-tight">{m.name}</div>
                  <div className="text-xs text-white/80 mt-0.5">{m.role}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* All profiles — long-form */}
      <Section className="bg-slate-50">
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
            The full roster
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            All {STAFF.length} team members
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Every profile below is a current or former student staff member sharing their own
            words on what working at Fit & Rec has meant to them.
          </p>
        </div>

        <div className="space-y-8">
          {STAFF.map((m, idx) => (
            <article
              key={m.slug}
              id={m.slug}
              className={`scroll-mt-24 rounded-2xl overflow-hidden border border-slate-200 bg-white ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="grid lg:grid-cols-[280px_1fr]">
                <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[320px] bg-slate-100">
                  <Image
                    src={m.photo}
                    alt={`${m.name} — ${m.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 280px"
                    className="object-cover"
                  />
                  {m.featured && (
                    <span className="absolute top-3 left-3 rounded-full bg-gryphon-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                    {m.role}
                  </div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                    {m.name}
                  </h3>
                  <div className="mt-1 text-sm text-slate-500">{m.program}</div>

                  <div className="mt-5 space-y-4 text-slate-700 leading-relaxed">
                    {m.bio.experience && (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                          Overall experience
                        </div>
                        <p>{m.bio.experience}</p>
                      </div>
                    )}
                    {m.bio.favourite && (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                          Favourite part of the job
                        </div>
                        <p>{m.bio.favourite}</p>
                      </div>
                    )}
                    {m.bio.meaningful && (
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                          What makes it meaningful
                        </div>
                        <p>{m.bio.meaningful}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Link
            href="/membership"
            className="inline-flex items-center rounded-full bg-gryphon-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-gryphon-red-dark transition"
          >
            Become a member
          </Link>
          <a
            href="https://experienceguelph.ca"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-gryphon-red hover:text-gryphon-red transition"
          >
            Explore student jobs ↗
          </a>
        </div>
      </Section>
    </PageShell>
  );
}
