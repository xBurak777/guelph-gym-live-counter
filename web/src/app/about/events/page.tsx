import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Events — Gryphon Fit & Rec" };

const events = [
  {
    tag: "Fitness",
    when: "TBD Fall 2026",
    title: "Exam Stress Relief Fitness Classes",
    body: "Help reduce your exam stress by joining us for these FREE Glow Classes. Bring your own glow-in-the-dark gear and we'll provide glow sticks & mats. No registration required, open to NRG Members.",
  },
  {
    tag: "Dance",
    when: "TBD Fall 2026",
    title: "Dance Recital",
    body: "A showcase of our rec dance classes at the end of the Fall & Winter semesters. Supports United Way. General $10 · Students $5 · Children (12 & under) FREE.",
  },
  {
    tag: "Aquatics",
    when: "Monthly",
    title: "Free Introductory Swim to Survive Lessons",
    body: "These free Swim to Survive lessons are offered once a month for any non-swimmers looking to gain confidence in the water. No pre-registration required. Drowning is the third-leading cause of accidental death for adults in Canada.",
  },
  {
    tag: "Safety",
    when: "TBD Fall 2026",
    title: "Self-Defence Class",
    body: "Free one-day self-defence workshop open to all members. Runs in the Combatives Room 242.",
  },
  {
    tag: "Dance",
    when: "TBD Fall 2026",
    title: "Dance Intensive Open House",
    body: "Preview of the winter Dance Intensive program. Try a class, meet the instructors and register on the day for a discounted rate.",
  },
  {
    tag: "Fitness",
    when: "TBD, October 2026",
    title: "Halloween Fitness Class",
    body: "Themed group fitness class. Space is limited — pre-registration required. Proceeds will be donated to the United Way.",
  },
  {
    tag: "Programming",
    when: "Returning Fall 2026",
    title: "Athletics & Recreation Open House",
    body: "Open-house tour of the W.F. Mitchell Athletics Centre. Free trial classes, facility tours and program information tables.",
  },
  {
    tag: "Clubs",
    when: "Returning Fall 2026",
    title: "Athletics Club Fair",
    body: "Annual club fair with representatives from all 26 Gryphon student clubs — from Artistic Swimming and Cheerleading to Cricket, Ringette and Water Polo.",
  },
  {
    tag: "Hiring",
    when: "Returning Fall 2026 (O-Week)",
    title: "Athletics Job Fair",
    body: "This event takes place annually during O-Week. We typically hire varsity event staff, fieldhouse and field operators, and intramural referees (our #1 hiring need).",
  },
  {
    tag: "Wellness",
    when: "Ongoing",
    title: "Glowga Yoga & Athletics Centre Tours",
    body: "Guided facility tours plus themed Glowga Yoga nights, running periodically throughout the semester.",
  },
];

export default function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Info"
        title="Upcoming events"
        subtitle="Recurring events, seasonal showcases and one-off workshops across Gryphon Fit & Rec. Dance recitals, self-defence workshops, exam-stress classes, the Athletics Club Fair and the annual Athletics Job Fair."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Gryphon events"
        crumbs={[{ label: "About" }, { label: "Events" }]}
      />

      <Section>
        <SectionHeader eyebrow="Fall & Winter 2026" title="Events calendar" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <div key={e.title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-widest text-gryphon-red">{e.tag}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{e.when}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">{e.title}</h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Winter programming" title="Winter Fitness & Recreation" subtitle="Winter registration typically opens in December — watch for full schedules in the What's New feed." />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard title="Fall & winter recitals" description="Fall Recital: Early December · Winter Recital: Early April. Both showcase our recreational dance classes and support the United Way." />
            <InfoCard title="Return of favourites" description="Halloween Fitness Class, Glowga Yoga nights, and Exam Stress Relief classes all return each term." />
          </div>
          <div className="mt-8">
            <Callout title="Free trial welcome">
              Every event page above lists whether pre-registration is required. Most fitness and dance events are free of charge for NRG members; drop-ins and community members may attend by paying the day-pass rate at Client Services.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
