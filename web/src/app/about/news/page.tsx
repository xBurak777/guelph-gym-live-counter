import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "What's New — Gryphon Fit & Rec" };

const news = [
  {
    date: "June 2026",
    tag: "Gryphon Greatness",
    title: "June 2026 Gryphon Greatness — Raef Wykes",
    body: "We are excited to recognize Raef Wykes as our Gryphon Greatness winner for June! Raef has been an outstanding member of the Client Services team.",
  },
  {
    date: "July 6, 2026",
    tag: "Membership",
    title: "Midterm Pricing now on",
    body: "One semester lockers are 50% off. See Client Services to reserve your locker today. Student NRG Memberships are now $30 for the remainder of the term.",
  },
  {
    date: "Summer 2026",
    tag: "Facility",
    title: "New outdoor AEDs installed at Varsity Field & Soccer Complex",
    body: "The University of Guelph, Department of Athletics has installed two outdoor, climate-controlled SaveStation® cabinets equipped with life-saving automated external defibrillators (AEDs) at popular Varsity Field and the University's Soccer Complex. The gold standard in campus cardiac care, the new outdoor AEDs are an extension of the University's already robust campus cardiac safety program, and gives untrained bystanders 24/7 public access to AEDs for use during sudden cardiac emergencies.",
  },
  {
    date: "Spring 2026",
    tag: "Aquatics",
    title: "Hot tub — status update",
    body: "As you may be aware, the hot tub in the Guelph Gryphons Aquatic Centre has been out of order frequently over the last semester for various repairs. Despite numerous attempts to repair, it is currently out of order again due to an unlocated leak. We continue to work with our vendors to restore service.",
  },
  {
    date: "January 26, 2026",
    tag: "Closure",
    title: "Fit & Rec facilities re-opening after storm",
    body: "All fitness and recreation facilities will re-open today (Jan. 26) at 4pm. The rest of campus will remain closed today (Jan. 26). For information on campus closures see the U of G alert page.",
  },
  {
    date: "Winter 2026",
    tag: "Programming",
    title: "Gryphon Camps — new and improved programs",
    body: "Check out our new and improved Gryphon Camps programs for summer 2026, including expanded sport camps and a new Kids Skill Development track.",
  },
  {
    date: "Ongoing",
    tag: "Recognition",
    title: "Part-Time Staff Appreciation Banquet — annual recap",
    body: "Each year we recognize the students who make Fit & Rec run — Fitness Centre staff, aquatic team, intramural officials, camp counsellors and Client Services teammates. Nominations open every spring.",
  },
];

export default function NewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Info"
        title="What's New"
        subtitle="Gryphon Greatness recognitions, facility updates, hours changes and programming announcements from across the Department of Athletics."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Gryphon Fit & Rec news"
        crumbs={[{ label: "About" }, { label: "What's New" }]}
      />

      <Section>
        <SectionHeader eyebrow="Recent updates" title="Latest posts" />
        <div className="mt-8 space-y-6">
          {news.map((n) => (
            <article key={n.title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="font-semibold uppercase tracking-widest text-gryphon-red">{n.tag}</span>
                <span className="text-slate-400">·</span>
                <time className="text-slate-500">{n.date}</time>
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">{n.title}</h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{n.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Recognition" title="Gryphon Greatness monthly awards" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard title="Nominate a teammate" description="Any member can nominate a Gryphon Fit & Rec staff member for the monthly Gryphon Greatness recognition. Nominations go to the Athletics Communications team." />
            <InfoCard title="Read past winners" description="Past Gryphon Greatness posts are archived in the What's New feed. Winners come from Client Services, aquatics, intramurals, fitness and camps." />
          </div>
          <div className="mt-8">
            <Callout title="Job openings">
              Looking for a fun, flexible on-campus job? See <a href="/about/jobs" className="underline">Job Opportunities</a> for hiring cycles and the annual Athletics Job Fair.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
