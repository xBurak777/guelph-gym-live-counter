import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard } from "@/components/ui";

export const metadata = { title: "Alumni Stadium — Facilities" };

export default function AlumniStadiumPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="Alumni Stadium"
        subtitle="26 Lang Way · Guelph, ON. Outdoor CFL-sized football field with an IAAF-certified 400m track and an 8,500-seat grandstand. Home of Gryphons football and outdoor track & field."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Alumni Stadium at the University of Guelph"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "Alumni Stadium" }]}
      />

      <Section>
        <SectionHeader eyebrow="Overview" title="Field, track, grandstand" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="Field"
            title="110yd × 65yd — CFL-sized"
            description="Full CFL-regulation football field. Grandstand seating for approximately 8,500 spectators. Home of the Guelph Gryphons football team and host site for CIS/U SPORTS football events."
          />
          <InfoCard
            eyebrow="Track"
            title="400m IAAF-certified"
            description="8-lane 400m running track surrounding the football field. Certified for sanctioned track meets and used by Gryphon Track & Field, USports championships, and community running clubs."
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Rental pricing" title="Lighting & rental" subtitle="Lighting fee schedule under Sun-down conditions. HST additional." />
        <div className="mt-6">
          <PriceTable
            columns={["Lighting tier", "Hourly rate"]}
            rows={[
              ["Practice lighting", "$27.80/hr + HST"],
              ["Game lighting", "$29.68/hr + HST"],
              ["TV / broadcast lighting", "$38.59/hr + HST"],
            ]}
            caption="Field rental fees are quoted separately; contact the Athletics Facility Booking Office for a custom quote."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Booking" title="Reserve Alumni Stadium" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Athletics Facility Booking Office" title="519-824-4120 ext. 53790" description="gryphon.facility@uoguelph.ca · Monday–Friday 8:30am–4:30pm" />
            <InfoCard eyebrow="AED" title="Outdoor SaveStation" description="Publicly accessible AED cabinet installed adjacent to the Varsity Field and University Soccer Complex — 24/7 access for cardiac emergencies." />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
