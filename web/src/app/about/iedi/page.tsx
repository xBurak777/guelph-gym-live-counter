import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout, StatGrid } from "@/components/ui";

export const metadata = { title: "IEDI — Gryphon Athletics" };

export default function IEDIPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Info"
        title="IEDI Purpose & Objectives"
        subtitle="Indigenization, Equity, Diversity, Inclusion and Accessibility (IEDIA) in Gryphon Athletics. The Department of Athletics is deeply committed to identifying and addressing systemic racism and discrimination and building an equitable and inclusive community for everyone."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Gryphon Athletics inclusion statement"
        crumbs={[{ label: "About" }, { label: "IEDI" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Our commitment"
          title="Equitable, inclusive, safe and welcoming access"
          subtitle="The Department of Athletics and Recreation affirms and celebrates the diverse identities of our community and visitors. We are committed to equitable, inclusive, safe, and welcoming access to our spaces, and we acknowledge the ongoing impacts of colonialism in shaping our shared experiences. We strive to foster a community where everyone feels supported to learn, grow and thrive."
        />

        <div className="mt-10">
          <StatGrid
            items={[
              { value: "1,300+", label: "Members trained", sub: "Anti-oppression & anti-racism training completed" },
              { value: "1", label: "IEDIA Advisor", sub: "Dedicated departmental advisor position created" },
              { value: "1", label: "Advisory Committee", sub: "IEDIA Advisory Committee guiding department policy" },
              { value: "24/7", label: "Public AEDs", sub: "Outdoor AED cabinets at Varsity Field & Soccer Complex" },
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Steps taken" title="Progress on IEDIA in Gryphon Athletics" subtitle="The Department of Athletics has taken important steps to ensure every student-athlete, staff, and coach feels supported and valued." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard eyebrow="Governance" title="IEDIA Advisory Committee" description="Cross-departmental committee that guides policy, program design, and hiring practice through an IEDIA lens." />
            <InfoCard eyebrow="Training" title="1,300+ members trained" description="Anti-oppression and anti-racism training delivered to more than 1,300 department members — including varsity coaches, student-athletes, staff and part-time employees." />
            <InfoCard eyebrow="Leadership" title="New departmental advisor" description="A new departmental advisor position was created specifically for IEDIA work — supporting the department's programs, staff and student-athletes." />
            <InfoCard eyebrow="Inclusion statement" title="Department Inclusivity Statement" description="Development of a formal Inclusivity Statement outlining the department's commitments and standards around IEDIA." />
            <InfoCard eyebrow="Programming" title="Identity-inclusive spaces" description="The NRG Zone offers identity-specific fitness hours: Women's-Only and LGBTQ2IA+ dedicated windows in a smaller, sensory-reduced studio." href="/fitness/nrg-zone" />
            <InfoCard eyebrow="Accessibility" title="Universal change rooms & Blindsquare" description="Universal (non-gender-specific) change rooms across facilities, plus Blindsquare navigation-app support for visitors with low vision." />
          </div>
          <div className="mt-8">
            <Callout title="More information">
              For the full Purpose & Objectives statement, see <a href="https://gryphons.ca/sports/2023/9/15/iedi-purpose-objectives.aspx" className="underline">gryphons.ca — IEDI Purpose &amp; Objectives</a>. Feedback and questions can be directed to Client Services at 519-824-4120 ext. 56253.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
