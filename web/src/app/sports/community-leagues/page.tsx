import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Community Leagues — Sports & Clubs" };

const leagues = [
  { href: "/sports/community-leagues/3-pitch", title: "3-Pitch Summer Community League", desc: "May–August · One game per week, Mondays or Wednesdays 6–10:30pm at the University of Guelph Ball Diamonds." },
  { href: "/sports/community-leagues/beach-volleyball", title: "Beach Volleyball Community League", desc: "Spring & Summer · Wednesdays 6:30–8:30pm · 2 games per week for 8 weeks · single-elimination playoff bracket." },
  { href: "/sports/community-leagues/pickleball", title: "Pickleball Community League", desc: "Indoor pickleball league running out of Mitchell/West Gym across the fall and winter semesters." },
  { href: "/sports/community-leagues/gohl", title: "Gryphon Old Timer Hockey League (GOHL)", desc: "Adult non-contact hockey league (35+) played at the Gryphon Centre Arena." },
];

export default function CommunityLeaguesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sports & Clubs"
        title="Community Leagues"
        subtitle="External-community adult recreational leagues that run out of Gryphon Fit & Rec facilities. Open to community members, alumni, staff, students and neighbours of the university."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Community league play"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Community Leagues" }]}
      />

      <Section>
        <SectionHeader eyebrow="Four leagues" title="Choose your season" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {leagues.map((l) => (
            <InfoCard key={l.href} title={l.title} description={l.desc} href={l.href} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Cancellation policy" title="A / B / C tiered refunds" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard eyebrow="Tier A" title="≥ 14 days before start" description="Full refund minus a $25 + HST administrative fee." />
            <InfoCard eyebrow="Tier B" title="7–13 days before start" description="50% refund of the league fee. Non-transferable." />
            <InfoCard eyebrow="Tier C" title="< 7 days before start" description="No refund. Team spot may be transferred to another eligible team pending league approval." />
          </div>
          <div className="mt-8">
            <Callout title="Corporate & community memberships">
              Corporate teams, alumni chapters and community groups can register whole rosters into any league. Contact the Athletics Facility Booking Office at ext. 53790 or <a href="mailto:gryphon.facility@uoguelph.ca" className="underline">gryphon.facility@uoguelph.ca</a> for bulk registration.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
