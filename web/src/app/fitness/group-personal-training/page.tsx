import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, PriceTable, Callout } from "@/components/ui";

export const metadata = { title: "Group Personal Training — Fitness / Wellness" };

const programs = [
  {
    name: "Learn to Lift — Men's Only",
    fee: "$78.00",
    desc: "Identity-specific cohort for men who want structured barbell coaching in the NRG Zone. Small-group format with a certified U of G Personal Trainer.",
  },
  {
    name: "Learn to Lift — Women's Only",
    fee: "$78.00",
    desc: "Identity-specific cohort for women. All sessions take place in the NRG Zone, our small-scale training studio on the 3rd floor of the GGAC.",
  },
  {
    name: "Learn to Lift — U of G Staff Only",
    fee: "$78.00",
    desc: "Reserved for U of G staff and faculty. Same barbell coaching curriculum in a staff-only environment.",
  },
  {
    name: "Pilates Group Reformer",
    fee: "$80.00",
    desc: "The Reformer is a versatile machine designed to facilitate a wide range of exercises that focus on strength, flexibility, and body awareness. Fall and Winter blocks run with instructors Kathryn, Mel, Indigo, Jenn M, Morgan, Layla, Tanya and Alayna.",
  },
];

export default function GroupPTPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness / Wellness"
        title="Group Personal Training"
        subtitle="Structured small-group training with certified Gryphon Personal Trainers. Identity-specific Learn to Lift cohorts and Pilates Reformer sessions run every fall and winter block."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="Group personal training session"
        crumbs={[{ label: "Fitness / Wellness" }, { label: "Group Personal Training" }]}
      />

      <Section>
        <SectionHeader eyebrow="Programs" title="Fall & Winter blocks" subtitle="HST additional. Register at Client Services or online via CONNECT." />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <InfoCard key={p.name} eyebrow={p.fee} title={p.name} description={p.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Other formats" title="Pair up or bring a friend" />
          <div className="mt-6">
            <PriceTable
              columns={["Format", "Student rate", "Member rate"]}
              rows={[
                ["2-Person Personal Training (1 session)", "$31.00 / person + HST", "$36.00 / person + HST"],
                ["2-Person Personal Training (5 sessions)", "$149.00 / person + HST", "$174.00 / person + HST"],
                ["2-Person Personal Training (10 sessions)", "$288.00 / person + HST", "$338.00 / person + HST"],
              ]}
              caption="Both participants must have a valid Recreation or NRG membership."
            />
          </div>
          <div className="mt-8">
            <Callout title="Where sessions take place">
              All Learn to Lift and Pilates Reformer sessions take place in the NRG Zone (Studio 3202) or Studio 300/302 depending on the block schedule. Check your confirmation email for the exact room assignment.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
