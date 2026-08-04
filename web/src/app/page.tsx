import Link from "next/link";
import NavBar from "@/components/NavBar";
import LiveCounter from "@/components/LiveCounter";
import { brand } from "@/lib/brand";
import {
  getCurrentOccupancy,
  getAverageVisitMinutes,
  getCrowdLevel,
  GYM_CAPACITY,
} from "@/lib/occupancy";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [occupancy, avgVisitMinutes] = await Promise.all([
    getCurrentOccupancy(),
    getAverageVisitMinutes(),
  ]);
  const crowd = getCrowdLevel(occupancy, GYM_CAPACITY);
  const percentFull = Math.round((occupancy / GYM_CAPACITY) * 100);

  return (
    <>
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gryphon-red via-gryphon-red-dark to-gryphon-black -z-10" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,#FFC72C_0%,transparent_50%)] -z-10" />

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-gryphon-gold" />
              {brand.taglines.department}
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Know before <br />
              you go.
            </h1>
            <p className="mt-5 text-lg text-white/80 max-w-lg">
              Real-time gym occupancy at the W.F. Mitchell Athletics Centre.
              Never wait for a bench again — check the counter, then head over.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/membership"
                className="inline-flex items-center rounded-full bg-gryphon-gold text-black px-5 py-2.5 font-semibold hover:bg-yellow-300 transition"
              >
                Get an NRG membership
              </Link>
              <Link
                href="/hours"
                className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/25 px-5 py-2.5 font-semibold hover:bg-white/15 transition"
              >
                See gym hours
              </Link>
            </div>
          </div>

          <div>
            <LiveCounter
              initial={{
                occupancy,
                capacity: GYM_CAPACITY,
                percentFull,
                avgVisitMinutes,
                crowd,
                updatedAt: new Date().toISOString(),
              }}
            />
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            title="Real-time counts"
            body="Every card tap updates the counter in under a second. No more guessing based on Google Maps popular times."
            icon="⚡"
          />
          <Feature
            title="Plan around the crowd"
            body="See how full the gym is right now and the rolling average visit length — arrive when it's actually quiet."
            icon="📊"
          />
          <Feature
            title="Front-desk visibility"
            body="Staff instantly see who scanned in, their photo, and membership tier — no more card-swap confusion."
            icon="🪪"
          />
        </div>
      </section>

      {/* Program cards mirroring real Guelph IA */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Everything happening at Fit & Rec
            </h2>
            <p className="mt-3 text-slate-600">
              From personal training to intramurals and kids&apos; camps —
              programs for every Gryphon.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProgramCard title="Fitness / Wellness" desc="Personal training, group classes, wellness programs." href="/fitness/personal-training" />
            <ProgramCard title="Skill Development" desc="Aquatics, dance, and instructor certifications." href="/skills/aquatics" />
            <ProgramCard title="Membership" desc="NRG plans, day passes, and PT packages." href="/membership" />
            <ProgramCard title="Sports & Clubs" desc="Drop-in rec, intramurals, sport clubs, climbing." href="/sports/drop-in" />
            <ProgramCard title="Kids & Camps" desc="Swim lessons and sport & activity camps." href="/kids/camps" />
            <ProgramCard title="Hours & Contact" desc="Facility hours, addresses, and staff contacts." href="/hours" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gryphon-black text-white/80">
        <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gryphon-red flex items-center justify-center">
                <span className="text-gryphon-gold font-black">G</span>
              </div>
              <div className="font-black">Guelph Gryphons Fit & Rec</div>
            </div>
            <p className="mt-4 text-sm text-white/60">{brand.taglines.department}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50">Athletics Centre</div>
            <div className="mt-2 text-sm">{brand.facilities.mitchell.address}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50">Arena</div>
            <div className="mt-2 text-sm">{brand.facilities.gryphonCentre.address}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50">Contact</div>
            <div className="mt-2 text-sm">{brand.contact.phone}</div>
            <div className="text-sm">{brand.contact.generalEmail}</div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-white/50 flex flex-wrap justify-between gap-3">
            <span>© {new Date().getFullYear()} Portfolio project by Burak Aksoy · Not affiliated with the University of Guelph.</span>
            <span>Built with Next.js · TypeScript · Prisma · Neon Postgres</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function Feature({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white">
      <div className="text-3xl">{icon}</div>
      <div className="mt-3 font-black text-lg">{title}</div>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}

function ProgramCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="group block rounded-2xl border border-slate-200 bg-white p-6 hover:border-gryphon-red hover:shadow-md transition-all">
      <div className="text-lg font-black tracking-tight">{title}</div>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
      <div className="mt-4 text-sm font-semibold text-gryphon-red inline-flex items-center gap-1">
        Explore <span aria-hidden className="group-hover:translate-x-0.5 transition">→</span>
      </div>
    </Link>
  );
}
