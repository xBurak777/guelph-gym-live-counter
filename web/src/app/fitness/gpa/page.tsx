import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Gryphons Performance Academy (GPA)" };

const values = [
  { title: "Caring", desc: "We put the well-being of every athlete first — mental, physical and social." },
  { title: "Determined", desc: "We hold ourselves and our athletes to a standard of intentional daily effort." },
  { title: "Respectful", desc: "We honour the whole athlete — coaches, teammates, families and the broader community." },
  { title: "Engaged", desc: "We show up fully — for each rep, each session, and each conversation." },
  { title: "Authentic", desc: "We coach honestly, teach transparently and build trust through consistency." },
];

export default function GPAPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness / Wellness"
        title="Gryphons Performance Academy"
        subtitle="'You don't rise to the occasion — you fall to your level of your preparation.' The Gryphon Performance Academy is a true academy in the sense that we're an inclusive place of learning and training for developing athletes."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="Gryphons Performance Academy training"
        crumbs={[{ label: "Fitness / Wellness" }, { label: "Gryphons Performance Academy" }]}
      />

      <Section>
        <SectionHeader eyebrow="Our mission" title="An inclusive place of learning and training" subtitle="GPA supports athletes at every stage of their development, with programming grounded in five core Gryphon values." />
        <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {values.map((v) => (
            <InfoCard key={v.title} eyebrow="Value" title={v.title} description={v.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Contact" title="Visit the academy" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Location" title="Historic wing — GGAC" description="Guelph Gryphons Athletics Centre, 50 Stone Road E, Guelph ON. The GPA occupies the historic east wing of the building." />
            <InfoCard eyebrow="Contact" title="519-824-4120 ext. 56253" description="Email: gpa@uoguelph.ca. Contact the academy team for athlete assessments, program enrollment and coach-training partnerships." />
          </div>
          <div className="mt-8">
            <Callout title="Coach & athlete development">
              GPA runs in parallel with the university's Fitness Certifications pathway — many GPA coaches hold Personal Trainer, Strength Training Fundamentals and canfitpro certifications earned through our programs.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
