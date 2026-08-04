import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard } from "@/components/ui";

export const metadata = { title: "Outdoor Sports Fields — Facilities" };

const fields = [
  { title: "Gryphon Soccer Complex", desc: "Multi-field varsity soccer complex hosting Gryphons men's and women's soccer, as well as community soccer, 11v11 intramurals and the 3-Pitch Community League." },
  { title: "Varsity Field", desc: "Practice-grade outdoor field adjacent to Alumni Stadium used for varsity training, intramural 11v11 soccer and community rentals." },
  { title: "Softball Diamonds", desc: "Home of the 3-Pitch Community Summer League (May–August). Standard three-diamond configuration with dugouts and backstops." },
  { title: "Beach Volleyball Courts", desc: "Outdoor sand courts running Beach Volleyball intramurals and the spring/summer Beach Volleyball Community League (Wednesdays 6:30–8:30pm)." },
  { title: "Johnston Green", desc: "Open green space on North Ring Road used for pick-up ultimate frisbee, disc golf drop-in and outdoor events." },
];

export default function SoccerComplexPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="Outdoor sports fields"
        subtitle="Gryphon Soccer Complex, Varsity Field, Softball Diamonds, Beach Volleyball Courts and Johnston Green. Outdoor field inventory across the University of Guelph campus for varsity, intramural and community use."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="University of Guelph outdoor fields"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "Outdoor Sports Fields" }]}
      />

      <Section>
        <SectionHeader eyebrow="Outdoor inventory" title="Five outdoor spaces" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((f) => (
            <InfoCard key={f.title} title={f.title} description={f.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Booking" title="Reserve an outdoor field" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Athletics Facility Booking" title="519-824-4120 ext. 53790" description="gryphon.facility@uoguelph.ca · Monday–Friday 8:30am–4:30pm. Include date, start/end time, field, and expected group size." />
            <InfoCard eyebrow="Community leagues" title="External-league bookings" description="For community-league play (3-Pitch, Beach Volleyball, Pickleball, GOHL) see the Community Leagues page." href="/sports/community-leagues" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
