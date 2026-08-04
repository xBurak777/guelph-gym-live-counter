import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Kids & Camps — Gryphon Fit & Rec" };

const categories = [
  { href: "/kids/activity-camps", title: "Gryphon Activity Camps", desc: "Over 30 camps for ages 5–16 all summer long. General activity-level programming grouped by age and skill." },
  { href: "/kids/sport-camps", title: "Gryphon Sport Camps", desc: "Sport-specific camps and clinics led by Gryphon Coaches. Basketball, Rugby, Triathlon, Aquatic Fitness, Flag Football and more." },
  { href: "/kids/skill-development", title: "Kids Skill Development", desc: "Rock climbing, learn-to-skate, wrestling, dance, junior lifeguard and water polo intro programs for kids." },
  { href: "/kids/birthdays", title: "Gryphon Birthdays & Group Bonding", desc: "Birthday parties from October to May (climbing, camp-style, Nerf action) and group-bonding events for teams and residence floors." },
  { href: "/kids/school-year", title: "School Year Programs", desc: "Winter Break Camp, March Break Camp, High Five PHCD training and the Home Alone Workshop." },
  { href: "/kids/swim", title: "Swim Lessons", desc: "Learn-to-swim lessons for children ages 4 months and up. Private, semi-private and group formats through the Lifesaving Society." },
];

export default function KidsHubPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Welcome to Gryphon Kids & Camp Programming"
        subtitle="Select a category below. Gryphon Camps offers a variety of camps categorized into Activity Camps or Sport Camps, plus year-round Kids Skill Development, birthdays, group bonding, school-year programs and learn-to-swim lessons."
        imageSrc="/images/heroes/kids-camps-hub.jpg"
        imageAlt="Gryphon Kids & Camps"
        crumbs={[{ label: "Kids & Camps" }]}
      />

      <Section>
        <SectionHeader eyebrow="Explore" title="Six programming categories" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <InfoCard key={c.href} title={c.title} description={c.desc} href={c.href} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Sun-safe camp" title="SUN AWARE Certified for 2026" />
          <div className="mt-8">
            <Callout title="Certified sun safety">
              Gryphon Summer Camps is SUN AWARE Certified for the 2026 season. The SUN AWARE Sun Safety Certification Program is developed by Melanoma Canada to help protect children and teens from skin cancer by supporting community organizations in implementing best practices in sun safety across Canada.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
