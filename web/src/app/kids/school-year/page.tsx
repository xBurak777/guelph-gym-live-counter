import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "School Year Programs — Kids & Camps" };

export default function SchoolYearPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="School Year Programs"
        subtitle="Winter Break Camp, March Break Camp and year-round training programs — High Five PHCD Certification and the Home Alone Workshop — for kids and youth."
        imageSrc="/images/heroes/kids-camps-hub.jpg"
        imageAlt="Winter Break Camp at Gryphon Fit & Rec"
        crumbs={[{ label: "Kids & Camps", href: "/kids" }, { label: "School Year Programs" }]}
      />

      <Section>
        <SectionHeader eyebrow="Break-week camps" title="Winter & March Break" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="December"
            title="Winter Break Camp"
            description="Week-long day camp during the University's winter closure. Camp-style programming with a holiday theme — arts, sports, gym time and swim time."
          />
          <InfoCard
            eyebrow="March"
            title="March Break Camp"
            description="Week-long day camp during Ontario March Break. Same camp-style rotation as summer plus new theme days built around the March schedule."
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Training programs" title="Youth training & certifications" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            eyebrow="Certification"
            title="High Five PHCD Certification"
            description="Principles of Healthy Child Development — the national quality standard for children's programming in Canada. Required credential for anyone working with kids in Gryphon Camps. Open to camp counsellors, coaches and youth-program leaders."
          />
          <InfoCard
            eyebrow="Ages 10–13"
            title="Home Alone Workshop"
            description="One-day workshop teaching kids how to stay home safely. Kitchen safety, first-aid basics, emergency response and stranger-safety scenarios. Includes a take-home resource kit."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Registration" title="How to sign up" />
          <div className="mt-8">
            <Callout title="Register through CONNECT">
              Winter Break Camp registration opens in November. March Break Camp registration opens in February. High Five PHCD and Home Alone Workshop dates are announced 4-6 weeks in advance in the <a href="/about/news" className="underline">What's New</a> feed. Same $30 non-refundable deposit per camper per week applies to break camps as to summer camps.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
