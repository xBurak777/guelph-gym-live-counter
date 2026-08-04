import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Kids Skill Development" };

const programs = [
  { name: "Kids Rock Climbing", ages: "6–12", desc: "Weekly small-group climbing coaching at the UGAA Rock Wall Centre. Top-rope + bouldering. All equipment provided." },
  { name: "Kids Learn to Skate", ages: "3–10", desc: "Learn-to-Skate program at the Gryphon Centre Arena. Skill badges, small-group instruction. Helmet with cage required." },
  { name: "Kids Wrestling Club", ages: "8–14", desc: "Age-appropriate wrestling coaching in Combatives Room 242. Focus on fundamentals, fitness and sportsmanship." },
  { name: "Kids Dance", ages: "3–14", desc: "Rec dance classes — Ballet, Jazz, Hip Hop, Contemporary and Modern. Culminates in the Fall & Winter Dance Recitals." },
  { name: "Junior Lifeguard Program", ages: "10–14", desc: "Pre-Lifeguarding pathway for kids interested in becoming lifeguards. Fitness, rescue skills, first-aid basics." },
  { name: "Water Polo Introduction", ages: "8–14", desc: "Learn-to-play water polo — passing, treading, positioning and small-sided games at the Gold Pool." },
];

export default function SkillDevelopmentPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Kids Skill Development"
        subtitle="Year-round skill-based programming for kids. Ongoing weekly programs (not week-long camps) for climbing, skating, wrestling, dance, junior lifeguarding and water polo."
        imageSrc="/images/heroes/kids-camps-hub.jpg"
        imageAlt="Kids programming at Gryphon Fit & Rec"
        crumbs={[{ label: "Kids & Camps", href: "/kids" }, { label: "Skill Development" }]}
      />

      <Section>
        <SectionHeader eyebrow="Weekly programming" title="Programs" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <InfoCard key={p.name} eyebrow={`Ages ${p.ages}`} title={p.name} description={p.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Registration" title="How to sign up" />
          <div className="mt-8">
            <Callout title="Register via CONNECT">
              Kids Skill Development programs run in Fall, Winter and Spring/Summer session blocks. Register through CONNECT or in-person at Client Services. Standard <a href="/about/policies" className="underline">refund policy</a> applies.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
