import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Job Opportunities — Gryphon Fit & Rec" };

const roles = [
  {
    title: "Intramural Referees",
    highlight: "#1 hiring need",
    desc: "Officiate intramural games across all 14 sports and 3 levels of play. Paid training provided. Ideal for students with playing experience in soccer, basketball, volleyball, flag football, dodgeball, ice hockey, ultimate frisbee, or badminton.",
  },
  {
    title: "Fieldhouse & Field Operators",
    highlight: "Turf & track shifts",
    desc: "Support Gryphon Fieldhouse and outdoor field operations — game-day setup, equipment management, and rental support. Great fit for students studying kin, hospitality or sport management.",
  },
  {
    title: "Varsity Event Staff",
    highlight: "Game-day operations",
    desc: "Support varsity home games (football, hockey, basketball, volleyball, soccer) with game-day ticketing, ushering, event setup and event control.",
  },
  {
    title: "Client Services Staff",
    highlight: "Front desk",
    desc: "Membership sales, program registrations, cash handling, phone/email support, and general front-desk operations at the W.F. Mitchell Athletics Centre.",
  },
  {
    title: "Fitness Centre Staff",
    highlight: "Gym floor",
    desc: "Fitness floor supervision, member orientations, equipment cleaning and enforcement of the Fair Play Code. Applicants must hold Standard First Aid + CPR C.",
  },
  {
    title: "Aquatic Centre Staff",
    highlight: "Lifeguards + instructors",
    desc: "Lifeguards, swim instructors and pool supervisors. Required: current National Lifeguard, Standard First Aid + CPR C, and LSS Instructor certification for instructor roles.",
  },
  {
    title: "Camp Counsellors",
    highlight: "Summer + March Break",
    desc: "Lead activities and supervise campers ages 5–14 at Gryphon Summer Camps and School Year Programs. Standard First Aid + CPR C required. High Five PHCD training an asset.",
  },
];

export default function JobsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Info"
        title="Job Opportunities"
        subtitle="Looking for a fun, flexible on-campus job? We've got you covered. Details on all available student jobs within Athletics are available online at Experience Guelph."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Gryphon Athletics jobs"
        crumbs={[{ label: "About" }, { label: "Job Opportunities" }]}
      />

      <Section>
        <SectionHeader eyebrow="Roles we hire" title="Where you can work" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <InfoCard key={r.title} eyebrow={r.highlight} title={r.title} description={r.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Annual event" title="Athletics Job Fair — O-Week" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="When" title="Returning Fall 2026" description="This event takes place annually during O-Week. Meet hiring managers from every Fit & Rec department in one place." />
            <InfoCard eyebrow="Who we hire" title="Referees, ops, event staff" description="We typically hire varsity event staff, fieldhouse and field operators, and intramural referees — our #1 hiring need." />
          </div>
          <div className="mt-8">
            <Callout title="Where to apply">
              All Gryphon Athletics student jobs are posted on Experience Guelph, the university&apos;s official student-jobs portal. Search for &apos;Athletics&apos; or &apos;Fit &amp; Rec&apos; at experienceguelph.ca. For questions about specific roles contact Client Services at 519-824-4120 ext. 56253.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
