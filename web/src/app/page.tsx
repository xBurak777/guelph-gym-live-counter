import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import LiveCounter from "@/components/LiveCounter";
import ValuedMembersSlider from "@/components/ValuedMembersSlider";
import { Section, SectionHeader, CTAButton } from "@/components/ui";
import { computeOccupancy } from "@/lib/occupancy";
import { FEATURED_STAFF } from "@/data/staff";

export const dynamic = "force-dynamic";

async function getInitial() {
  try {
    return await computeOccupancy();
  } catch {
    return {
      occupancy: 0,
      capacity: 450,
      percentFull: 0,
      avgVisitMinutes: 68,
      crowd: {
        level: "quiet" as const,
        label: "Quiet",
        message: "Perfect time to train.",
        color: "#22c55e",
        face: "😌",
      },
      updatedAt: new Date().toISOString(),
    };
  }
}

const programHighlights = [
  {
    title: "Personal Training",
    description:
      "1:1 coaching with 8 certified trainers including Master Trainer Lynne Skilton-Hayes. Sessions, packages, and small-group PT.",
    href: "/fitness/personal-training",
    image: "/images/facilities/fitness-centre-hires.jpg",
    tag: "Fitness",
  },
  {
    title: "NRG Group Classes",
    description:
      "40+ weekly classes: Yoga, Pilates, HIIT, Cycle, Zumba, Barre, Strength, and Mind & Body. Included with NRG Plus.",
    href: "/nrg",
    image: "/images/facilities/fitness-classes.jpg",
    tag: "Group Fitness",
  },
  {
    title: "Aquatics Programs",
    description:
      "Two pools — the 25m Gold Pool and 25yd Red Pool with diving board — plus Lifesaving Society swim lessons for all ages.",
    href: "/skills/aquatics",
    image: "/images/facilities/aquatics.jpg",
    tag: "Aquatics",
  },
  {
    title: "Rock Climbing",
    description:
      "Indoor bouldering, top-rope, and auto-belays at the GGAC Climbing Wall. Free equipment, orientation-required.",
    href: "/sports/climbing",
    image: "/images/facilities/rock-climbing.jpg",
    tag: "Sport",
  },
  {
    title: "Intramurals & Clubs",
    description:
      "14 intramural sports across three levels of play. Free-agent registration or team bond entry — Ice Hockey through Squash.",
    href: "/sports/intramurals",
    image: "/images/facilities/wf-mitchell-1.jpg",
    tag: "Sport",
  },
  {
    title: "Kids Camps & Swim",
    description:
      "SUN AWARE-certified summer camps ages 5-14, Junior Activity Camp with 1:6 ratio, and Learn-to-Swim lessons for babies through teens.",
    href: "/kids/camps",
    image: "/images/facilities/kids-camps-1.jpg",
    tag: "Kids",
  },
];

export default async function HomePage() {
  const initial = await getInitial();

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gryphon-black text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/heroes/home-banner-1.jpg"
            alt="Gryphon athletes training at the W.F. Mitchell Athletics Centre"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gryphon-black/60 via-gryphon-black/70 to-gryphon-black" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-gryphon-gold backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gryphon-gold animate-pulse" />
                Now live · Gym occupancy
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                Nurture. Recreate.
                <br />
                <span className="text-gryphon-gold">Gear up.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-slate-200 leading-relaxed">
                Fitness, recreation, and community programs for U of G students, staff, and Guelph
                residents — all at the W.F. Mitchell Athletics Centre. Now with a live gym counter
                so you never wait for a bench again.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/membership" variant="primary" className="!bg-gryphon-red">
                  Join Now
                </CTAButton>
                <CTAButton
                  href="/nrg"
                  variant="ghost"
                  className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white"
                >
                  Browse NRG Classes
                </CTAButton>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">450</div>
                  <div className="text-xs text-slate-400 mt-1">Fitness Centre capacity</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">40+</div>
                  <div className="text-xs text-slate-400 mt-1">Weekly NRG classes</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">14</div>
                  <div className="text-xs text-slate-400 mt-1">Intramural sports</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <LiveCounter initial={initial} />
              <div className="absolute -top-3 -right-3 hidden md:block rounded-full bg-gryphon-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg">
                World-first for U of G
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S HERE / PROGRAMS */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="What's here"
            title="Everything for every kind of athlete."
            subtitle="From your first personal-training session to varsity-level intramurals, from parent-and-tot swim to certification courses — Gryphon Fit & Rec is a full-service athletics department serving the University of Guelph campus and Guelph community."
          />
          <CTAButton href="/about" variant="ghost">About the Department</CTAButton>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programHighlights.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-gryphon-red hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gryphon-red">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gryphon-red">
                  Explore <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* MEMBERSHIP PROMO */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
                Membership
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                One card. Every program.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-lg">
                U of G students, staff, retirees, alumni, and Guelph community members all
                have a tier. Fitness Centre, drop-in rec, walking/jogging track, NRG classes,
                aquatics — every membership includes the essentials.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Student NRG Plus
                  </div>
                  <div className="mt-2 text-3xl font-black text-gryphon-red">$55<span className="text-base font-semibold text-slate-500">/sem</span></div>
                  <div className="text-xs text-slate-500 mt-2">Includes NRG classes + climbing.</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Community NRG
                  </div>
                  <div className="mt-2 text-3xl font-black text-gryphon-red">$71<span className="text-base font-semibold text-slate-500">.90/mo</span></div>
                  <div className="text-xs text-slate-500 mt-2">Adults 18+ Guelph residents.</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTAButton href="/membership">See All Plans</CTAButton>
                <CTAButton href="/membership/register" variant="ghost">How to Register</CTAButton>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <Image
                src="/images/facilities/fitness-centre-hires.jpg"
                alt="W.F. Mitchell Fitness Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY / LOCATION */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 order-2 lg:order-1">
            <Image
              src="/images/facilities/wf-mitchell-exterior.jpg"
              alt="W.F. Mitchell Athletics Centre exterior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
              Home base
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              W.F. Mitchell Athletics Centre
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Newly renovated in 2016 after 12 years of planning. The Mitchell houses a 450-person
              Fitness Centre, two pools, three gymnasiums, an indoor rock-climbing wall, a
              walking/jogging track, and dedicated studios for NRG and Group PT classes.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <div><span className="font-semibold">Address:</span> 50 East Ring Road, Guelph, ON N1G 2W1</div>
              <div><span className="font-semibold">Client Services:</span> 519-824-4120 ext. 56253</div>
              <div><span className="font-semibold">Fitness Centre:</span> ext. 52105 · <span className="font-semibold">Field House:</span> ext. 52045</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href="/hours">Hours of Operation</CTAButton>
              <CTAButton href="/contact" variant="ghost">Contact Us</CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* VIDEO TOUR */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
                Video tour
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Tour the Guelph Gryphons Athletics Centre.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Take a walk-through of the GGAC — the 22,000 sq ft fitness centre, walking track,
                rock climbing wall, 2,200-seat event centre with three gymnasiums, three
                change-rooms, and Aquatics Centre. Built in 2016 and open to every member on your
                first day.
              </p>
              <div className="mt-6 space-y-2 text-sm text-slate-700">
                <div>· 22,000 sq ft Fitness Centre</div>
                <div>· Two pools — Gold (25m) &amp; Red (25yd)</div>
                <div>· Indoor rock climbing wall &amp; walking/jogging track</div>
                <div>· 2,200-seat event centre with three gyms</div>
              </div>
              <div className="mt-6">
                <CTAButton href="/facilities" variant="ghost">Explore Facilities</CTAButton>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/hYuYRp1liWk?rel=0&modestbranding=1"
                title="Tour the Guelph Gryphons Athletics Centre (GGAC)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUED MEMBERS AND STAFF (real people from fitandrec.gryphons.ca) */}
      <ValuedMembersSlider members={FEATURED_STAFF} />

      {/* BOTTOM CTA */}
      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Never wait for a bench again.
          </h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Check the live counter above before you head over, or browse everything the Mitchell has
            to offer.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/membership" className="!bg-gryphon-red">Get a Membership</CTAButton>
            <CTAButton
              href="/nrg"
              variant="ghost"
              className="!border-white/40 !text-white hover:!bg-white/10"
            >
              View NRG Schedule
            </CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
