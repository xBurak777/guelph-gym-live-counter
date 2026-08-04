import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, PriceTable, Callout } from "@/components/ui";

export const metadata = { title: "Birthdays & Group Bonding" };

export default function BirthdaysPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Gryphon Birthdays & Group Bonding"
        subtitle="Birthday parties from October to May, plus year-round group-bonding events for residence floors, sports teams, corporate teams and community groups. Climbing, camp-style parties and NERF Action available."
        imageSrc="/images/heroes/kids-camps-hub.jpg"
        imageAlt="Kids birthday party at Fit & Rec"
        crumbs={[{ label: "Kids & Camps", href: "/kids" }, { label: "Birthdays" }]}
      />

      <Section>
        <SectionHeader eyebrow="Birthday options" title="Three party formats" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoCard eyebrow="Ages 6+" title="Climbing Birthdays" description="Two hours of top-rope climbing and bouldering at the UGAA Rock Wall Centre. Instructor-led. All equipment provided." />
          <InfoCard eyebrow="Ages 5–12" title="Camp-Style Birthdays" description="Gym-based party with games, obstacle courses and camp-style activities. Includes party room for cake." />
          <InfoCard eyebrow="Ages 8+" title="NERF Action Birthdays" description="NERF-blaster party in the fieldhouse with foam-safe game modes: capture the flag, elimination and team objectives." />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Pricing" title="Birthday party rates" subtitle="Book at least 2 weeks in advance through Client Services." />
        <div className="mt-8">
          <PriceTable
            columns={["Package", "Guests", "Duration", "Rate"]}
            rows={[
              ["Camp-Style Birthday", "Up to 10 kids", "2 hours", "$220 + HST"],
              ["Camp-Style Birthday", "11–20 kids", "2 hours", "$285 + HST"],
              ["Climbing Birthday", "Up to 10 kids", "2 hours", "$260 + HST"],
              ["Climbing Birthday", "11–15 kids", "2 hours", "$325 + HST"],
              ["NERF Action Birthday", "Up to 15 kids", "1.5 hours", "$285 + HST"],
              ["NERF Action Birthday", "16–24 kids", "1.5 hours", "$355 + HST"],
            ]}
            caption="Includes staff supervision, activity setup/cleanup and dedicated party room. Food is not included."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Group bonding" title="Beyond birthdays" subtitle="Perfect for teams, corporate groups, residence floors and community events." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard title="Residence floors" description="Bring a floor of first-years for a climbing wall night or NERF Action session. Custom packages for RA-led events." />
            <InfoCard title="Sports teams" description="High-school or minor sports teams can book the fieldhouse, an ice pad or the aquatic centre for team bonding." />
            <InfoCard title="Corporate & community" description="Structured team-building programming led by Kevin Lindner via the Team Building page — from ropes-style challenges to strategy games." href="/skills/team-building" />
          </div>
          <div className="mt-8">
            <Callout title="Book a party">
              To book, contact the Athletics Facility Booking Office at 519-824-4120 ext. 53790 or <a href="mailto:gryphon.facility@uoguelph.ca" className="underline">gryphon.facility@uoguelph.ca</a>. A refundable deposit secures your date.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
