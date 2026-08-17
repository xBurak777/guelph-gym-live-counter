import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, Callout } from "@/components/ui";

export const metadata = { title: "Fitness Certifications — Fitness / Wellness" };

export default function FitnessCertsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness / Wellness"
        title="Fitness Certifications"
        subtitle="Professional fitness certification pathway hosted at the Guelph Gryphons Athletics Centre. Cycle, Fitness, Personal Trainer and Strength Training courses accredited through canfitpro."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="Certification course in progress"
        crumbs={[{ label: "Fitness / Wellness" }, { label: "Fitness Certifications" }]}
      />

      <Section>
        <SectionHeader eyebrow="Course catalogue" title="Certifications offered" subtitle="Fees are all-inclusive of course materials. HST additional." />
        <div className="mt-8">
          <PriceTable
            columns={["Certification", "Fee", "Duration & format"]}
            rows={[
              ["Cycle Instructor Certification", "$172.00", "Weekend intensive. Next cohort: October 4, 2026 (course code 39112)."],
              ["Fitness Instructor Certification", "$315.00", "30-hour course affiliated with the canfitpro national certification program."],
              ["Personal Trainer Certification", "$474.00", "36-hour applied comprehensive course. Covers assessment, program design, coaching and business."],
              ["Strength Training Fundamentals Certification", "$241.00", "16-hour course focused on Olympic-lift and compound strength coaching."],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Mentorship" title="Instructor Certification Mentorship" subtitle="Post-certification mentorship for new Fitness Instructors who want in-club supervision before teaching solo." />
          <div className="mt-8">
            <PriceTable
              columns={["Program", "Member fee", "Non-member fee"]}
              rows={[["Fitness Instructor Certification Mentorship", "$60.00", "$100.00"]]}
              caption="Approval required. Contact Lynne Skilton-Hayes at 519-824-4120 ext. 52670 for admission to the mentorship program."
            />
          </div>
          <div className="mt-8">
            <Callout title="Coach / instructor contact">
              For questions about certification prerequisites, exam scheduling and mentorship approval, contact Lynne Skilton-Hayes at 519-824-4120 ext. 52670. All courses run in Studio 173 and Studio 300 at the W.F. Mitchell Athletics Centre.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
