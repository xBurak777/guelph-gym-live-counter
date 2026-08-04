import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Excursions & Team Building — Skill Development" };

export default function TeamBuildingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Excursions & Team Building"
        subtitle="Bond with your teammates and build strong connections with your residence, club, organization or group. Customized team-building experiences at the Indoor Climbing Wall and across the W.F. Mitchell Athletics Centre."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Team building at the climbing wall"
        crumbs={[{ label: "Skill Development" }, { label: "Team Building" }]}
      />

      <Section>
        <SectionHeader eyebrow="Featured experience" title="Indoor Climbing Wall bookings" subtitle="Our UGAA Rock Wall Centre is a state-of-the-art facility that includes top roping, bouldering and lead climbing." />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="Up to 12 climbers"
            title="Small-group booking"
            description="$158.00 + HST for a 2-hour session with a Gryphon climbing instructor. Includes shoe, harness and belay-device rentals; auto-belay walls and bouldering area."
          />
          <InfoCard
            eyebrow="Up to 18 climbers"
            title="Large-group booking"
            description="$225.00 + HST for a 2-hour session. Best for residence floors, corporate away-days, athletic teams and club-level bonding events."
          />
        </div>
        <div className="mt-8">
          <Callout title="Book a team-building event">
            To book your team building event at the wall contact Kevin Lindner at <a href="mailto:lindner@uoguelph.ca" className="underline">lindner@uoguelph.ca</a>. Please book at least 10 days in advance of the desired date so we can staff instructors and reserve wall time.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Other formats" title="Custom group experiences" subtitle="We can package any Gryphon Fit & Rec facility into a team-building experience — the climbing wall is just the most popular." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard title="Aquatic Centre challenges" description="Team relays, Swim to Survive stations and hot-tub cool-downs. Priced per hour at Aquatic Centre rental rates + instructor fees." />
            <InfoCard title="Fieldhouse mini-Olympics" description="Turf and track rotations built from soccer, ultimate frisbee, sprint relays and dodgeball. Available spring, fall and summer." />
            <InfoCard title="Studio + Combatives package" description="Combine Karate/self-defence intro sessions with yoga or mobility to give the group a strength-plus-recovery day." />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
