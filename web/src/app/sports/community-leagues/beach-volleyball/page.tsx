import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Beach Volleyball League — Community Leagues" };

export default function BeachVolleyballPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community Leagues"
        title="Beach Volleyball Community League"
        subtitle="Spring and summer outdoor beach volleyball at the University of Guelph Beach Volleyball Courts. Wednesdays 6:30–8:30pm, 2 games per week for 8 weeks with a single-elimination playoff bracket."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Beach volleyball at U of G"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Community Leagues", href: "/sports/community-leagues" }, { label: "Beach Volleyball" }]}
      />

      <Section>
        <SectionHeader eyebrow="Format" title="Season at a glance" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard eyebrow="Season" title="Spring & Summer" description="Two seasons available: Spring (May–June) and Summer (July–August)." />
          <InfoCard eyebrow="Nights" title="Wednesdays 6:30–8:30pm" description="Full 2-hour window each week; both games back-to-back." />
          <InfoCard eyebrow="Games" title="2 games / week" description="10 regular-season games over 8 weeks — then single-elimination playoffs." />
          <InfoCard eyebrow="Venue" title="U of G Beach Volleyball Courts" description="Sand courts adjacent to the Gryphon Soccer Complex." />
          <InfoCard eyebrow="Roster" title="Coed 4-on-4" description="Minimum ratio of women/gender-diverse players per team enforced per league rules." />
          <InfoCard eyebrow="Playoffs" title="Single elimination" description="Top teams from the regular season enter a knockout bracket; league champion crowned week 9." />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Register" title="How to enter a team" />
          <div className="mt-8">
            <Callout title="Registration">
              Registration opens each spring through CONNECT. Fees and cancellation policy follow the standard <a href="/sports/community-leagues" className="underline">Community Leagues</a> A/B/C schedule. Contact the Athletics Facility Booking Office at ext. 53790 to confirm your team's placement.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
