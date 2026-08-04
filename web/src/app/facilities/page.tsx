import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout, PriceTable } from "@/components/ui";

export const metadata = { title: "Facilities & Rentals — Gryphon Fit & Rec" };

const facilities = [
  { href: "/facilities/arena", title: "Gryphon Centre Arena", desc: "Twin-rink complex with the Olympic-sized Gold Rink and NHL-sized Red Rink at 149 Reynolds Walk." },
  { href: "/facilities/fieldhouse", title: "Gryphon Fieldhouse", desc: "Indoor turf field with a 200m banked track and 60m sprint lanes at 55 East Ring Road." },
  { href: "/facilities/aquatic-centre", title: "Gryphon Aquatic Centre", desc: "Twin-pool aquatic facility housing the 25m Gold Pool and 25yd Red Pool with a hot tub on deck." },
  { href: "/facilities/mitchell", title: "W.F. Mitchell Athletics Centre", desc: "Home of the Fitness Centre, Event Centre, Mitchell/West/Small Gyms and every studio/combatives/wrestling room on campus." },
  { href: "/facilities/alumni-stadium", title: "Alumni Stadium", desc: "CFL-sized varsity football field with an IAAF-certified 400m track and 8,500-seat grandstand at 26 Lang Way." },
  { href: "/facilities/soccer-complex", title: "Gryphon Soccer Complex & Outdoor Fields", desc: "Varsity Field, Soccer Complex, Softball Diamonds, Beach Volleyball Courts and Johnston Green." },
];

export default function FacilitiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facilities"
        title="Athletic facilities & rentals"
        subtitle="The University of Guelph campus has a variety of athletic facilities to offer, for both indoor and outdoor, competitive or recreational play. Rentals available to teams, clubs, community leagues and corporate groups year-round."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Guelph Gryphons Athletics Centre exterior"
        crumbs={[{ label: "About" }, { label: "Facilities" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Athletics Facility Booking Office"
          title="Book any Gryphon facility"
          subtitle="Contact the Athletics Facility Booking Office for arena ice time, fieldhouse turf, pool rentals, gym/court bookings, and studio room reservations."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoCard eyebrow="Phone" title="519-824-4120, ext. 53790" description="Monday to Friday, 8:30am – 4:30pm" />
          <InfoCard eyebrow="Email" title="gryphon.facility@uoguelph.ca" description="Include date, time, activity and group size in your enquiry." />
          <InfoCard eyebrow="In person" title="W.F. Mitchell Athletics Centre" description="50 East Ring Road, Guelph, ON N1G 4Z8" />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Explore" title="Individual facility detail" subtitle="Pricing, capacities, supervisor contacts and rental notes for every bookable space." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <InfoCard key={f.href} title={f.title} description={f.desc} href={f.href} />
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Pricing snapshot"
          title="Arena rink rentals"
          subtitle="Gold and Red rink hourly rates with lighting, ice and staff included. HST additional."
        />
        <div className="mt-8">
          <PriceTable
            columns={["Rink", "Non-Prime rate", "Prime rate"]}
            rows={[
              ["Gold Rink (Olympic-sized, 200′ × 100′)", "$155.42/hr + HST", "$275.71/hr + HST"],
              ["Red Rink (NHL-sized, 198′ × 85′)", "$155.42/hr + HST", "$275.71/hr + HST"],
            ]}
            caption="Prime hours: weekdays 5pm–11pm & weekends. Includes ice, lighting and rink attendant."
          />
        </div>

        <div className="mt-10">
          <SectionHeader eyebrow="Pricing snapshot" title="Fieldhouse turf & track" />
          <div className="mt-6">
            <PriceTable
              columns={["Season", "Hourly rate"]}
              rows={[
                ["Winter (peak indoor)", "$187.27/hr + HST"],
                ["Spring / Fall", "$113.61/hr + HST"],
                ["Summer", "$85.21/hr + HST"],
              ]}
              caption="Field is 90′ × 180′ Polytan Liga synthetic turf. Track is a 200m banked oval with 60m sprint lanes."
            />
          </div>
        </div>

        <div className="mt-10">
          <SectionHeader eyebrow="Pricing snapshot" title="Aquatic Centre pool rentals" />
          <div className="mt-6">
            <PriceTable
              columns={["Pool", "Hourly rate", "Staffing included"]}
              rows={[
                ["Gold Pool (25m, 8 lanes)", "$168.69/hr + HST", "3 lifeguards"],
                ["Red Pool (25yd, 5 lanes)", "$141.69/hr + HST", "2 lifeguards"],
                ["Extra lifeguard (any pool)", "$27.00/hr + HST", "Added by request"],
              ]}
            />
          </div>
        </div>

        <div className="mt-10">
          <SectionHeader eyebrow="Pricing snapshot" title="Gyms & studios" />
          <div className="mt-6">
            <PriceTable
              columns={["Space", "Hourly rate"]}
              rows={[
                ["Event Centre (main gym)", "$250.00/hr + HST"],
                ["Mitchell Gym", "$135.00/hr + HST"],
                ["West Gym", "$135.00/hr + HST"],
                ["Small Gym", "$78.00/hr + HST"],
                ["Studio Room (173, 300, 302, 3212–3216, Combatives 242, Wrestling 3206)", "$55.12/hr + HST"],
              ]}
              caption="Add-ons (per event): bleachers $300, carpet/tarp $700, mic/TV $10 each, audio package $100, podium $25, projector $150."
            />
          </div>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <Callout variant="warning" title="Community leagues, tournaments and corporate rentals welcome">
            <span className="text-slate-800">
              We regularly host external teams, corporate groups, community leagues and tournaments year-round. Get in touch
              at <a href="mailto:gryphon.facility@uoguelph.ca" className="underline">gryphon.facility@uoguelph.ca</a> for
              multi-date bookings, exclusive-use pricing and event packages.
            </span>
          </Callout>
        </div>
      </section>
    </PageShell>
  );
}
