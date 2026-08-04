import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "GOHL — Community Leagues" };

export default function GOHLPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community Leagues"
        title="Gryphon Old Timer Hockey League (GOHL)"
        subtitle="Adult non-contact hockey league played at the Gryphon Centre Arena. Rec-level 35+ hockey with alumni divisions, dressing rooms and Zamboni-fresh ice."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Non-contact hockey at Gryphon Centre Arena"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Community Leagues", href: "/sports/community-leagues" }, { label: "GOHL" }]}
      />

      <Section>
        <SectionHeader eyebrow="Format" title="Season at a glance" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard eyebrow="Format" title="Non-contact rec league" description="Body-contact is not permitted. Full-cage or half-visor required; helmets mandatory." />
          <InfoCard eyebrow="Ages" title="35+" description="Open to adult players 35 and older. Alumni and community members welcome." />
          <InfoCard eyebrow="Venue" title="Gryphon Centre Arena" description="Games alternate between the Gold Rink and Red Rink." />
          <InfoCard eyebrow="Games" title="Weekly regular season" description="Weekly games with a regular season followed by a playoff bracket at the end of the term." />
          <InfoCard eyebrow="Roster" title="Team-based" description="Teams register a full roster prior to the season. Team bonds and fines apply." />
          <InfoCard eyebrow="Equipment" title="Full hockey gear required" description="Includes helmet, visor/cage, gloves, elbow/shin pads, mouthguard and skates." />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Register" title="Team registration" />
          <div className="mt-8">
            <Callout title="How to enter a team">
              Team registration is coordinated with the Arena Facility Supervisor Jordan Grau at <a href="mailto:jgrau@uoguelph.ca" className="underline">jgrau@uoguelph.ca</a> (519-824-4120 ext. 53607). Team bonds and refund policies follow the standard Community Leagues framework.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
