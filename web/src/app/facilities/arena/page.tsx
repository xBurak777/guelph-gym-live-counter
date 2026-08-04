import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Gryphon Centre Arena — Facilities" };

export default function ArenaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="Gryphon Centre Arena"
        subtitle="149 Reynolds Walk · Guelph, ON N1G 2W1. Twin-rink complex with the Olympic-sized Gold Rink and NHL-sized Red Rink. Home to the Gryphons men's and women's varsity hockey teams, adult and community hockey leagues, learn-to-skate and skill development programming."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Gryphon Centre Arena"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "Gryphon Centre Arena" }]}
      />

      <Section>
        <SectionHeader eyebrow="Overview" title="Two rinks under one roof" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="Gold Rink"
            title="Olympic-sized — 200′ × 100′"
            description="Capacity: 1,200 spectators / 120 participants. Full boards, plexi, LED scoreboard and player benches. Site of Gryphons women's varsity home games."
          />
          <InfoCard
            eyebrow="Red Rink"
            title="NHL-sized — 198′ × 85′"
            description="Capacity: 250 spectators / 120 participants. NHL sheet with dressing rooms adjacent. Preferred for adult league and rec-hockey rentals."
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Rental pricing" title="Book ice time" subtitle="Includes ice, boards, lighting and rink attendant. HST additional." />
        <div className="mt-6">
          <PriceTable
            columns={["Rink", "Non-Prime", "Prime", "Notes"]}
            rows={[
              ["Gold Rink", "$155.42/hr + HST", "$275.71/hr + HST", "Prime: weekdays 5pm–11pm and all weekends"],
              ["Red Rink", "$155.42/hr + HST", "$275.71/hr + HST", "Same prime windows"],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="In-arena amenities" title="On-site food, retail and safety" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard title="Tim Hortons" description="Full-service Tim Hortons location open during arena hours for skaters, spectators and staff." />
            <InfoCard title="Craft Kitchen & Ale House" description="Licensed on-site restaurant and lounge overlooking the Gold Rink. Available for team socials and post-game bookings." />
            <InfoCard title="Gryph's Locker Pro Shop" description="Skate sharpening, hockey equipment, stick tape, Gryphons merchandise and skate rentals ($10 per rental)." />
            <InfoCard title="AED — Gold Rink lobby" description="Publicly accessible AED cabinet at the Gold Rink main entrance." />
            <InfoCard title="AED — Red Rink corridor" description="Second AED located between the Red Rink dressing rooms." />
            <InfoCard title="Universal change rooms" description="Non-gender-specific change rooms available for any skater who needs them." />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Contact" title="Facility supervisor" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard eyebrow="Facility Supervisor" title="Jordan Grau" description="Tel: 519-824-4120 ext. 53607 · Email: jgrau@uoguelph.ca" />
          <InfoCard eyebrow="Booking office" title="Athletics Facility Booking" description="Tel: 519-824-4120 ext. 53790 · Email: gryphon.facility@uoguelph.ca · Monday–Friday 8:30am–4:30pm" />
        </div>
        <div className="mt-8">
          <Callout title="Rec Skate & Rec Hockey drop-in">
            Public rec-skate and rec-hockey sessions run throughout the year on both rinks. See the <a href="/sports/drop-in" className="underline">Drop-in Rec calendar</a> for the current schedule. Day passes: Adult $5.31 + HST, Child/Senior $3.54 + HST, Family $10.62 + HST.
          </Callout>
        </div>
      </Section>
    </PageShell>
  );
}
