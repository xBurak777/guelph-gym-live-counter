import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard } from "@/components/ui";

export const metadata = { title: "Gryphon Fieldhouse — Facilities" };

export default function FieldhousePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="Gryphon Fieldhouse"
        subtitle="55 East Ring Road · Guelph, ON. Indoor multi-purpose fieldhouse housing a 90′ × 180′ Polytan Liga synthetic turf field and a 200m banked track with 60m sprint lanes. Home base for indoor soccer, ultimate frisbee, flag football and varsity track & field training."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Gryphon Fieldhouse turf and track"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "Gryphon Fieldhouse" }]}
      />

      <Section>
        <SectionHeader eyebrow="Overview" title="Turf, track and everything in between" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="Field"
            title="90′ × 180′ Polytan Liga synthetic turf"
            description="FIFA-approved surface configured for 8v8/11v11 soccer, ultimate frisbee, flag football, cricket practice and lacrosse. Portable nets, goalposts and boundary lines available on request."
          />
          <InfoCard
            eyebrow="Track"
            title="200m banked track + 60m sprint lanes"
            description="Six-lane banked oval with dedicated 60m sprint lanes, long-jump pit and high-jump apron. Used by Gryphon Track & Field and open to the public for walking/jogging drop-in sessions."
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Rental pricing" title="Rent the field or the track" subtitle="Rates are per hour, HST additional. Includes lighting and standard equipment set-up." />
        <div className="mt-6">
          <PriceTable
            columns={["Season", "Field rate", "Track rate"]}
            rows={[
              ["Winter (peak indoor demand)", "$187.27/hr + HST", "$187.27/hr + HST"],
              ["Spring / Fall", "$113.61/hr + HST", "$113.61/hr + HST"],
              ["Summer", "$85.21/hr + HST", "$85.21/hr + HST"],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Contact" title="Facility supervisor" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Facility Supervisor" title="Cameron Lawrie" description="Tel: 519-824-4120 ext. 56140 · Email: lawriec@uoguelph.ca" />
            <InfoCard eyebrow="Fieldhouse Ops" title="Field House desk" description="Ext. 52045 · On-site staff during operating hours for equipment set-up." />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
