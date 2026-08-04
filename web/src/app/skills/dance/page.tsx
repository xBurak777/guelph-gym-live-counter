import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import {
  Section,
  SectionHeader,
  InfoCard,
  PriceTable,
  Callout,
  CTAButton,
  StatGrid,
} from "@/components/ui";

export const metadata = { title: "Dance Programs" };

type DanceClass = {
  name: string;
  instructor: string;
  level: "Beginner" | "Beginner / Intermediate" | "Intermediate / Advanced" | "Advanced" | "All levels";
  dates: string;
  time: string;
  fee: string;
  desc: string;
};

const classes: DanceClass[] = [
  {
    name: "Acro & Conditioning",
    instructor: "Kyla R.",
    level: "Intermediate / Advanced",
    dates: "Sept 23 – Nov 25, 2026",
    time: "Wed 6:30–8:00PM",
    fee: "$85.00",
    desc: "Experienced acrobatic dancers will work on conditioning while mastering Acrobatic dance foundations. Dancers must be able to complete a front and back walkover prior to registering for this class.",
  },
  {
    name: "Advanced Combo Class",
    instructor: "Rotating Instructors",
    level: "Advanced",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue 7:00–8:00PM",
    fee: "$58.00",
    desc: "This advanced class is all about good vibes and great movement. Choreography rotates with the instructor each week. This class will not partake in the recital.",
  },
  {
    name: "Ballet Beginner/Intermediate",
    instructor: "Olivia S.",
    level: "Beginner / Intermediate",
    dates: "Sept 23 – Nov 25, 2026",
    time: "Wed 5:00–6:30PM",
    fee: "$85.00",
    desc: "Barre work, centre practice, and classical technique for dancers building their ballet foundation.",
  },
  {
    name: "Ballet Intermediate/Advanced",
    instructor: "Olivia S.",
    level: "Intermediate / Advanced",
    dates: "Sept 24 – Nov 26, 2026",
    time: "Thu 6:30–8:00PM",
    fee: "$85.00",
    desc: "Improve overall technique with focus on fine tuning skills such as jetés and pirouettes. At least five previous years of experience in ballet is required.",
  },
  {
    name: "Contemporary Advanced",
    instructor: "Karla D.",
    level: "Advanced",
    dates: "Sept 21 – Nov 30, 2026",
    time: "Mon 7:45–9:15PM",
    fee: "$85.00",
    desc: "Focus will be placed on lyrical/contemporary and open movement pieces.",
  },
  {
    name: "Contemporary Advanced",
    instructor: "Karley O.",
    level: "Advanced",
    dates: "Sept 23 – Nov 25, 2026",
    time: "Wed 8:00–9:30PM",
    fee: "$85.00",
    desc: "A second advanced contemporary section with its own choreography and recital piece.",
  },
  {
    name: "Contemporary Beginner/Intermediate",
    instructor: "Ally C.",
    level: "Beginner / Intermediate",
    dates: "Sept 21 – Nov 30, 2026",
    time: "Mon 5:00–6:30PM",
    fee: "$85.00",
    desc: "Lyrical and open movement fundamentals — floor work, momentum, and phrasing for newer contemporary dancers.",
  },
  {
    name: "Hip Hop Beginner/Intermediate",
    instructor: "Eden Sage",
    level: "Beginner / Intermediate",
    dates: "Sept 21 – Nov 30, 2026",
    time: "Mon 6:15–7:45PM",
    fee: "$85.00",
    desc: "This class will focus on hip hop choreography and footwork. Come join us for this high-energy class.",
  },
  {
    name: "Hip Hop Intermediate/Advanced",
    instructor: "Allie F.",
    level: "Intermediate / Advanced",
    dates: "Sept 24 – Nov 26, 2026",
    time: "Thu 5:00–6:30PM",
    fee: "$85.00",
    desc: "Faster choreography pick-up, layered textures, and performance quality for experienced hip hop dancers.",
  },
  {
    name: "Jazz Advanced",
    instructor: "Karley O.",
    level: "Advanced",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue 8:00–9:30PM",
    fee: "$85.00",
    desc: "Advanced jazz technique, turns, and leaps built into a recital piece.",
  },
  {
    name: "Jazz Advanced",
    instructor: "Kelsey I.",
    level: "Advanced",
    dates: "Sept 23 – Nov 25, 2026",
    time: "Wed 5:00–6:30PM",
    fee: "$85.00",
    desc: "A second advanced jazz section — different choreographer, different repertoire.",
  },
  {
    name: "Jazz Beginner/Intermediate",
    instructor: "Allison B.",
    level: "Beginner / Intermediate",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue 5:30–7:00PM",
    fee: "$85.00",
    desc: "Jazz fundamentals: isolations, kicks, turns, and combinations that build week over week.",
  },
  {
    name: "Latin",
    instructor: "Alika",
    level: "Beginner",
    dates: "Sept 23 – Nov 25, 2026",
    time: "Wed 7:30–9:00PM",
    fee: "$85.00",
    desc: "Latin dancers will build rhythm, coordination, and confidence while learning foundational Latin dance skills across Salsa and Bachata. Brush up on your beginner salsa foundations or start your salsa journey — basic footwork and styling are broken down without the need of a partner.",
  },
  {
    name: "Line Dancing",
    instructor: "Adrienne C.",
    level: "All levels",
    dates: "Sept 24 – Nov 26, 2026",
    time: "Thu 5:30–6:30PM",
    fee: "$58.00",
    desc: "Country and pop line dances taught step by step. No partner and no experience required.",
  },
  {
    name: "Seductive",
    instructor: "Robyn W.",
    level: "All levels",
    dates: "Sept 24 – Nov 26, 2026",
    time: "Thu 8:00–9:30PM",
    fee: "$85.00",
    desc: "Seductive Dance will not only provide you with a great workout but also allow you to feel comfortable and confident as you learn the intricacies of how to dance seductively.",
  },
  {
    name: "Tap Intermediate/Advanced",
    instructor: "Lorena D.",
    level: "Intermediate / Advanced",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue 6:00–7:30PM",
    fee: "$85.00",
    desc: "We know you want to get in touch with your inner Gene Kelly or Fred Astaire, so join us for this fun class format. Previous tap experience is not mandatory and tap shoes are needed.",
  },
];

const levelStyles: Record<DanceClass["level"], string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  "Beginner / Intermediate": "bg-emerald-100 text-emerald-800",
  "Intermediate / Advanced": "bg-amber-100 text-amber-800",
  Advanced: "bg-rose-100 text-rose-800",
  "All levels": "bg-slate-100 text-slate-700",
};

export default function DancePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Dance Programs"
        subtitle="We offer a variety of styles of dance that include beginner to advanced options to fit your skill level during the fall and winter semesters."
        imageSrc="/images/facilities/fitness-classes.jpg"
        imageAlt="Dancers rehearsing in a Guelph Gryphons Athletics Centre studio"
        crumbs={[{ label: "Skill Development" }, { label: "Dance" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Fall 2026 semester"
          title="Sixteen weekly classes, seventeen instructors"
          subtitle="Fall Registration opens on Monday, August 31st at 6:30am through CONNECT. Classes run September 20 to December 1, 2026 in the GGAC studios."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "16", label: "Weekly dance classes", sub: "Fall 2026 semester" },
              { value: "$85", label: "Most weekly classes", sub: "Per semester" },
              { value: "$15", label: "Dance Intensive Open House", sub: "Sun Sept 20, flat rate" },
              { value: "2", label: "Recitals per year", sub: "End of Fall & Winter" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Callout title="Dance Recitals">
            Be sure to attend our Dance Recitals at the end of the Fall and Winter semester as we
            showcase our instructional Dancers. Note that the Advanced Combo Class does not partake
            in the recital.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Class listings"
            title="Fall 2026 roster"
            subtitle="Real instructors, real dates, real fees. Each class meets once per week for the full block. Registration is required and fees apply — a Recreation Membership is not a pre-requisite."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <div
                key={`${c.name}-${c.instructor}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-gryphon-red hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
                    {c.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${levelStyles[c.level]}`}
                  >
                    {c.level}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-gryphon-red">{c.instructor}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <dl className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <div className="flex justify-between gap-3">
                    <dt className="font-semibold text-slate-900">Dates</dt>
                    <dd className="text-right">{c.dates}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="font-semibold text-slate-900">Time</dt>
                    <dd className="text-right">{c.time}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="font-semibold text-slate-900">Fee</dt>
                    <dd className="text-right font-bold text-slate-900">{c.fee}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <SectionHeader
              eyebrow="One-day sampler"
              title="Dance Intensive Open House"
              subtitle="Sunday, September 20, 2026 · 9:00AM–6:00PM"
            />
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Try multiple styles and meet the instructors before committing to a semester-long
                class. The flat rate fee is $15 whether you attend part of the day or choose to join
                us for the full day.
              </p>
              <p>
                The Open House is the fastest way to figure out where you belong in the level system —
                instructors are on hand to advise whether Beginner/Intermediate or
                Intermediate/Advanced is the right registration for you.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/membership/register">Register on CONNECT</CTAButton>
              <CTAButton href="/sports/clubs" variant="ghost">
                Student Dance Clubs
              </CTAButton>
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Fees" title="Dance pricing" />
            <div className="mt-6">
              <PriceTable
                columns={["Class", "Fee"]}
                rows={[
                  [
                    "Most weekly classes (Acro, Ballet, Contemporary, Hip Hop, Jazz, Latin, Seductive, Tap)",
                    "$85.00 / semester",
                  ],
                  ["Line Dancing, Advanced Combo Class", "$58.00 / semester"],
                  ["Dance Intensive Open House (one-day sampler)", "$15.00 flat"],
                ]}
                caption="HST is added at checkout. Withdrawals carry a $15 administrative fee, are prorated, and are not refunded after the third class."
              />
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Also dancing at Guelph"
            title="Beyond the instructional program"
            subtitle="Dance shows up in three places at Fit & Rec — instructional classes, student-run clubs, and the NRG group fitness schedule."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoCard
              eyebrow="Student clubs"
              title="Hip Hop – Atcha Crew & Dance Pak"
              description="Student-run, executive-led performance clubs funded through membership rates and fundraising. Dance Pak can be reached at dancepak@uoguelph.ca."
              href="/sports/clubs"
            />
            <InfoCard
              eyebrow="NRG Schedule"
              title="Zumba®, Glow Zumba® & Belly Dance Fit"
              description="Dance-based cardio formats included with any NRG Fitness Membership — no registration, no choreography experience needed."
              href="/nrg"
            />
            <InfoCard
              eyebrow="Kids programming"
              title="Kids Dance"
              description="Ballet in the Fall and Dance Fusion in the Winter through Kids Skill Development, with sample fees from $52 for a six-week Tuesday evening session."
              href="/kids/camps"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
