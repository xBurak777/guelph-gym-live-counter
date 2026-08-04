import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "NRG Zone — Identity-Inclusive Fitness Studio" };

export default function NRGZonePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness / Wellness"
        title="NRG Zone"
        subtitle="The NRG Zone is a small-scale fitness studio located in Studio 3202 on the 3rd floor of the Guelph Gryphons Athletics Centre. Designed as a sensory-reduced and identity-inclusive alternative to the main Fitness Centre floor."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="NRG Zone studio"
        crumbs={[{ label: "Fitness / Wellness" }, { label: "NRG Zone" }]}
      />

      <Section>
        <SectionHeader eyebrow="What it is" title="A smaller, calmer studio" subtitle="Fully equipped for strength training, cardio and mobility work — with reduced foot traffic, controlled music volume and identity-specific hours to make space for everyone." />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <InfoCard
            eyebrow="Identity-specific"
            title="Women's Only hours"
            description="Please note this is an identity-specific NRG Zone time. Reserved for anyone who identifies as a woman — no fitness supervisor is required."
          />
          <InfoCard
            eyebrow="Identity-specific"
            title="LGBTQ2IA+ hours"
            description="This time is open to LGBTQ2IA+ people only, to provide a safer, braver space for folks to show up, move their bodies and build community."
          />
          <InfoCard
            eyebrow="Open hours"
            title="Staff / Faculty / Grad Students"
            description="Dedicated weekly windows for U of G staff, faculty and grad students. Any member can use the Zone during general Open hours."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Access" title="Membership required" />
          <div className="mt-8">
            <Callout title="Included with NRG Plus">
              NRG Plus members can access the NRG Zone during posted hours. See the printed weekly schedule at the Zone entrance for current Women's-Only, LGBTQ2IA+, Staff/Faculty/Grad and Open hours, which are updated at the start of every semester and posted on-site.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
