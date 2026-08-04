import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "3-Pitch Summer League — Community Leagues" };

export default function ThreePitchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community Leagues"
        title="3-Pitch Summer Community League"
        subtitle="Coed 3-pitch softball league running May through August at the University of Guelph Ball Diamonds. One game per week, in a fun-but-competitive rec format."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="3-Pitch softball at U of G diamonds"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Community Leagues", href: "/sports/community-leagues" }, { label: "3-Pitch" }]}
      />

      <Section>
        <SectionHeader eyebrow="Schedule" title="Season format" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard eyebrow="Season" title="May – August" description="Games start early May; playoffs wrap by mid-August." />
          <InfoCard eyebrow="Nights" title="Mondays OR Wednesdays" description="Choose your night at registration. Once teams are assigned to a night the schedule is locked." />
          <InfoCard eyebrow="Game times" title="6:00 – 10:30pm" description="Diamonds run in parallel with 90-minute time slots per game." />
          <InfoCard eyebrow="Frequency" title="1 game / week" description="One regular-season game per week, plus a single-elimination playoff bracket." />
          <InfoCard eyebrow="Venue" title="U of G Ball Diamonds" description="Adjacent to the Gryphon Soccer Complex on campus." />
          <InfoCard eyebrow="Roster" title="Coed 3-pitch" description="Minimum ratio of women/gender-diverse players per team enforced per league rules." />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Register" title="Team registration" />
          <div className="mt-8">
            <Callout title="How to enter a team">
              Team registration opens each spring through CONNECT. Contact the Athletics Facility Booking Office at ext. 53790 or <a href="mailto:gryphon.facility@uoguelph.ca" className="underline">gryphon.facility@uoguelph.ca</a> to confirm openings and payment. Team bonds and refund policies follow the standard <a href="/sports/community-leagues" className="underline">Community Leagues</a> A/B/C schedule.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
