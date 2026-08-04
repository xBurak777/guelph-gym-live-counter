import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Aquatic & Safety Certifications — Skill Development" };

export default function AquaticSafetyCertsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Aquatic & Safety Certifications"
        subtitle="Lifesaving Society (LSS) aquatic and first aid certifications hosted at the Gryphon Aquatic Centre. Full lifeguard pathway from Bronze Star through National Lifeguard, plus First Aid, Instructor and Examiner training."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Lifeguard training at the Aquatic Centre"
        crumbs={[{ label: "Skill Development" }, { label: "Aquatic & Safety Certifications" }]}
      />

      <Section>
        <SectionHeader eyebrow="Course catalogue" title="Certifications offered" subtitle="Register in advance at Client Services or online. HST additional." />
        <div className="mt-8">
          <PriceTable
            columns={["Certification", "Fee", "Prerequisites & format"]}
            rows={[
              ["Basic First Aid with CPR C & AED (LSS)", "$120.00", "16-hour course. Meets WSIB workplace first-aid requirements effective June 22, 2026."],
              ["Bronze Cross", "$125.00", "Includes a timed 400m swim. Prerequisite for National Lifeguard."],
              ["Bronze Medallion + Basic First Aid with CPR C & AED", "$180.00", "Combined course covering rescue skills and first aid basics."],
              ["National Lifeguard (NL)", "See CONNECT", "Prerequisite: Bronze Cross + current Standard First Aid. Certifies you to work as a lifeguard."],
              ["Examiners Course (LSS)", "$125.00", "Trains certified instructors to examine Bronze-level candidates."],
              ["High Five PHCD", "See CONNECT", "4-hour Principles of Healthy Child Development training workshop — required for aquatic instructors working with children."],
              ["Instructor Recertification Course (LSS)", "$115.00", "Renewal course for expired LSS Instructor certifications."],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="WSIB requirements" title="Workplace first-aid rule change" />
          <div className="mt-8">
            <Callout variant="warning" title="Effective June 22, 2026">
              Beginning June 22, 2026, all first aid providers will be updating their first aid programs to meet the new WSIB requirements. Existing certifications remain valid until their expiry date; renewals must be completed under the new curriculum.
            </Callout>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Contact" title="Aquatic office" description="Ext. 56144 · Contact the aquatic team for placement testing, Bronze Cross scheduling and National Lifeguard candidate approval." />
            <InfoCard eyebrow="Contact" title="Facility Supervisor — Beth Fisher" description="Tel: 519-824-4120 ext. 52220 · bfisher@uoguelph.ca" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
