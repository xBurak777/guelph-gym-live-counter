import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Pickleball League — Community Leagues" };

export default function PickleballLeaguePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community Leagues"
        title="Pickleball Community League"
        subtitle="Indoor pickleball league running through Mitchell and West Gyms across the fall and winter semesters. Recreational-competitive format open to community members, staff and students."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Pickleball at Mitchell Gym"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Community Leagues", href: "/sports/community-leagues" }, { label: "Pickleball" }]}
      />

      <Section>
        <SectionHeader eyebrow="Format" title="Season at a glance" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard eyebrow="Semester" title="Fall + Winter" description="Two seasons per year, each running approximately 10 weeks." />
          <InfoCard eyebrow="Venue" title="Mitchell / West Gym" description="Indoor courts set up for both singles and doubles play." />
          <InfoCard eyebrow="Divisions" title="Rec + Competitive" description="Choose your division at registration. Both play under the same league schedule." />
          <InfoCard eyebrow="Format" title="Round-robin + playoffs" description="Regular season followed by a single-elimination playoff bracket." />
          <InfoCard eyebrow="Equipment" title="Bring your own paddle" description="Balls and nets are provided; paddles may be borrowed from Equipment Lending as needed." />
          <InfoCard eyebrow="Also available" title="Intramural Pickleball" description="Students also have access to the indoor Intramural Pickleball season and the winter Pickleball Tournament." />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Register" title="How to enter" />
          <div className="mt-8">
            <Callout title="Registration">
              Register via CONNECT or in person at Client Services. Cancellation policy follows the standard <a href="/sports/community-leagues" className="underline">Community Leagues</a> A/B/C schedule.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
