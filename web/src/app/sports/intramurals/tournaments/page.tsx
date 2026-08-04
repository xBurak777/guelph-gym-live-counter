import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Intramural Tournaments — Sports & Clubs" };

const tournaments = [
  {
    name: "Intramural Hockey Tournament",
    when: "Returning Fall 2026",
    desc: "Non-Contact Competitive Ice Hockey Tournament. Full equipment is required for all players, including a neck guard and full hockey visor/cage. Recreational Alumni Division also runs concurrently.",
  },
  {
    name: "Beach Volleyball Tournament",
    when: "Returning Fall 2026",
    desc: "Outdoor 4-on-4 coed tournament at the U of G Beach Volleyball Courts. Same-day single-elimination format.",
  },
  {
    name: "Roundnet Tournament (formerly Spikeball)",
    when: "Returning Fall 2026",
    desc: "Roundnet 2v2 pod-format tournament. Teams register in mixed/open divisions. Nets and balls provided.",
  },
  {
    name: "Pickleball Tournament",
    when: "Returning Winter 2027",
    desc: "Indoor pickleball tournament with singles and doubles brackets across recreational and competitive tiers.",
  },
  {
    name: "Intramural 3V3 Basketball Tournament",
    when: "Returning Winter 2027",
    desc: "Fast-format 3-on-3 basketball tournament at the West Gym. Open to student teams; free-agent list available.",
  },
];

export default function IntramuralTournamentsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Intramurals"
        title="Intramural Tournaments"
        subtitle="One-day and weekend intramural tournaments running through the fall and winter semesters. Register a team or join a free-agent pool through CONNECT."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Intramural tournament play"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Intramurals", href: "/sports/intramurals" }, { label: "Tournaments" }]}
      />

      <Section>
        <SectionHeader eyebrow="Five tournaments" title="Fall & Winter calendar" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((t) => (
            <InfoCard key={t.name} eyebrow={t.when} title={t.name} description={t.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Register" title="How to enter" />
          <div className="mt-8">
            <Callout title="Team or free agent">
              Registration for each tournament opens through CONNECT approximately 4 weeks before the start date. Team bonds and forfeit fees follow the standard <a href="/sports/intramurals/policies" className="underline">Intramural Policies</a>. Contact the Intramural Office at 519-824-4120 ext. 56137 with questions.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
