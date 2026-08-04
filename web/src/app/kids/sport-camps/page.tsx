import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Gryphon Sport Camps" };

const camps = [
  { name: "Learn to Sport (L2S)", ages: "5–7", desc: "Multi-sport introduction — basketball, soccer, volleyball, hockey and track basics in a low-pressure environment." },
  { name: "Multi-Sport Camp", ages: "8–14", desc: "Two-sport rotation each week — for example basketball + volleyball, or rugby + track." },
  { name: "Gryphon Rugby Camp", ages: "8–14", desc: "Led by Gryphon Rugby Coaches. Contact and non-contact skills, mini-game situations and full-team scrimmages." },
  { name: "Gryphon Basketball Camp", ages: "8–14", desc: "Skill development with Gryphon Basketball Coaches. Shooting, ball-handling, defensive footwork, situational offence." },
  { name: "Gryphon Volleyball Camp", ages: "8–14", desc: "Serving, receiving, setting and hitting technique. Position-specific drills and 6-on-6 game play." },
  { name: "Kids Ninja Ready", ages: "5–10", desc: "Ninja-style obstacle-course camp — climbing, agility, warped walls, salmon ladders (age-appropriate)." },
  { name: "Kids Field & Track Camp", ages: "8–14", desc: "Sprints, middle-distance, jumps and throws with Gryphon track coaches at Alumni Stadium IAAF track." },
  { name: "Gryphon Triathlon Camp", ages: "10–14", desc: "Multi-sport triathlon prep — swim technique, cycling skills, and running form clinics." },
  { name: "Gryphon Aquatic Fitness Camp", ages: "8–14", desc: "Water-based fitness camp — deep-water running, aqua-jog, swim conditioning and pool games." },
  { name: "Gryphon Flag Football Camp", ages: "8–14", desc: "Flag football fundamentals with Gryphon coaches. Passing, routes, defensive positioning and 5-on-5 games." },
];

export default function SportCampsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Gryphon Sport Camps"
        subtitle="Sport Camps offer sport-specific programming led by Gryphon Coaches and staff. Choose from Rugby, Basketball, Volleyball, Triathlon, Track & Field, Flag Football, Aquatic Fitness, Ninja Ready and more."
        imageSrc="/images/heroes/camps-welcome.png"
        imageAlt="Gryphon Sport Camps"
        crumbs={[{ label: "Kids & Camps", href: "/kids" }, { label: "Sport Camps" }]}
      />

      <Section>
        <SectionHeader eyebrow="10 sport tracks" title="Choose your sport" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((c) => (
            <InfoCard key={c.name} eyebrow={`Ages ${c.ages}`} title={c.name} description={c.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Coaching" title="Led by Gryphon Varsity Coaches" />
          <div className="mt-8">
            <Callout title="Athlete-led instruction">
              Each Sport Camp is led by current Gryphon Varsity Coaches and current or former Gryphon student-athletes. Campers get the same drills and coaching cues used at the varsity level, delivered in a fun, age-appropriate format.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
