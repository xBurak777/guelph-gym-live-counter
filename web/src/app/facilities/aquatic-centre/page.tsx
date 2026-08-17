import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Gryphon Aquatic Centre — Facilities" };

export default function AquaticCentrePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="Gryphon Aquatic Centre"
        subtitle="Twin-pool aquatic centre inside the W.F. Mitchell Athletics Centre. Houses the 25m Gold Pool, the 25yd Red Pool with diving board, and a hot tub on the Gold Pool deck."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Gryphon Aquatic Centre pools"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "Gryphon Aquatic Centre" }]}
      />

      <Section>
        <SectionHeader eyebrow="Pool inventory" title="Two pools + hot tub" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoCard
            eyebrow="Gold Pool"
            title="25m lap pool"
            description="8 lanes · 6 ft deep · used for lap swim, aquafit, aquatic certifications, and NRG Aquafit classes."
          />
          <InfoCard
            eyebrow="Red Pool"
            title="25yd recreation pool"
            description="5 lanes · variable depth from 4 ft to 11 ft with a diving board. Used for rec swims, family swim, learn-to-swim and Swim to Survive lessons."
          />
          <InfoCard
            eyebrow="Hot tub"
            title="On Gold Pool deck"
            description="Available whenever the Gold Pool is open. Status of the hot tub is posted at the pool entrance and in the What's New feed."
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Rental pricing" title="Book pool time" subtitle="Rates include lifeguard staffing as noted. HST additional." />
        <div className="mt-6">
          <PriceTable
            columns={["Pool", "Rate", "Included staff"]}
            rows={[
              ["Gold Pool (25m)", "$168.69/hr + HST", "3 lifeguards"],
              ["Red Pool (25yd)", "$141.69/hr + HST", "2 lifeguards"],
              ["Additional lifeguard", "$27.00/hr + HST", "Add on request"],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Contact" title="Facility supervisor" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Facility Supervisor" title="Beth Fisher" description="Tel: 519-824-4120 ext. 52220 · Email: bfisher@uoguelph.ca" />
            <InfoCard eyebrow="Aquatic Office" title="On-deck staff" description="Ext. 56144 · Reach the aquatic team directly for lesson placements or lifeguard staffing." />
          </div>
          <div className="mt-8">
            <Callout title="Pool admission standards">
              All recreation swim participants must enter the facility through the front doors. Children 5 years of age and under must be directly supervised (within arm&apos;s reach) at all times. Detailed pool admission standards are posted on the on-deck signage.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
