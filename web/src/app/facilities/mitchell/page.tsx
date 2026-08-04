import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout, PriceTable } from "@/components/ui";

export const metadata = { title: "W.F. Mitchell Athletics Centre — Facilities" };

export default function MitchellPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Facility"
        title="W.F. Mitchell Athletics Centre"
        subtitle="50 East Ring Road · Guelph, ON N1G 4Z8. Also known as the Guelph Gryphons Athletics Centre (GGAC). The main athletic building on campus, housing the Fitness Centre, Event Centre, three gyms, seven studio rooms, the aquatic centre and every combatives/wrestling room on site."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="W.F. Mitchell Athletics Centre"
        crumbs={[{ label: "Facilities", href: "/facilities" }, { label: "W.F. Mitchell Athletics Centre" }]}
      />

      <Section>
        <SectionHeader eyebrow="What's inside" title="Fitness Centre, gyms, studios, meeting rooms" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard eyebrow="Gyms" title="Event Centre" description="Main 3-court gym used for varsity basketball/volleyball, event bookings and championship hosting." />
          <InfoCard eyebrow="Gyms" title="Mitchell Gym" description="Second full-size gym for intramurals, drop-in and NRG group fitness overflow." />
          <InfoCard eyebrow="Gyms" title="West Gym" description="Multipurpose gym used for badminton, pickleball, dodgeball and skill-development programs." />
          <InfoCard eyebrow="Gyms" title="Small Gym" description="Single-court space ideal for private team practices, self-defence and clinic bookings." />
          <InfoCard eyebrow="Studios" title="Studio Room 173" description="Ground-floor mirrored studio room used for NRG Fitness and Dance classes." />
          <InfoCard eyebrow="Studios" title="Combatives Room 242" description="Padded flooring, mirrored walls; home of Karate, Brazilian Jiu-Jitsu, Muay Thai and Self-Defence." />
          <InfoCard eyebrow="Studios" title="Studio 300 / 302" description="Third-floor studios used for Pilates, Yoga and specialty group fitness formats." />
          <InfoCard eyebrow="Studios" title="Wrestling Rm 3206" description="Full wrestling mat with chin-up bars and climbing ropes; used for varsity wrestling and Wrestling Club." />
          <InfoCard eyebrow="Studios" title="Studios 3212–3216" description="Small studio rooms used for meetings, small-group PT, and NRG Zone breakout sessions." />
          <InfoCard eyebrow="Meeting rooms" title="Meeting Room 131" description="Boardroom-style meeting room bookable through the Athletics Facility Booking Office." />
          <InfoCard eyebrow="Meeting rooms" title="Meeting Room 3201 / 3203" description="Third-floor meeting rooms adjacent to Studio 3213 for classroom-style bookings." />
          <InfoCard eyebrow="Additional" title="NRG Zone (Studio 3202)" description="Small-scale identity-inclusive fitness studio on the 3rd floor. See our NRG Zone page for schedule." href="/fitness/nrg-zone" />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Rental pricing" title="Rent a room in the GGAC" />
          <div className="mt-6">
            <PriceTable
              columns={["Space", "Hourly rate"]}
              rows={[
                ["Event Centre", "$250.00/hr + HST"],
                ["Mitchell Gym", "$135.00/hr + HST"],
                ["West Gym", "$135.00/hr + HST"],
                ["Small Gym", "$78.00/hr + HST"],
                ["Studio room (any)", "$55.12/hr + HST"],
              ]}
              caption="Event add-ons: bleachers $300, carpet/tarp $700, mic/TV $10 each, audio pkg $100, podium $25, projector $150."
            />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Contact" title="Facility supervisor" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard eyebrow="Facility Supervisor" title="Andrew Godard" description="Tel: 519-824-4121 ext. 58863 · Email: godarda@uoguelph.ca" />
          <InfoCard eyebrow="Booking office" title="Athletics Facility Booking" description="Tel: 519-824-4120 ext. 53790 · Email: gryphon.facility@uoguelph.ca" />
        </div>
        <div className="mt-8">
          <Callout title="Fitness Centre orientation">
            All new Fitness Centre members must complete a FREE 1-hour orientation before accessing the gym floor. A Fitness Centre staff member will contact you by email to book this session after registration.
          </Callout>
        </div>
      </Section>
    </PageShell>
  );
}
