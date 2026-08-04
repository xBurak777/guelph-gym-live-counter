import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, PriceTable, Callout } from "@/components/ui";

export const metadata = { title: "Martial Arts — Skill Development" };

export default function MartialArtsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Martial Arts programs"
        subtitle="Recreational and competitive martial arts programming across five disciplines. All classes take place in the Combatives Room (242) or Wrestling Room 3206 at the W.F. Mitchell Athletics Centre."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="Martial arts training"
        crumbs={[{ label: "Skill Development" }, { label: "Martial Arts" }]}
      />

      <Section>
        <SectionHeader eyebrow="Programs & pricing" title="Five disciplines" subtitle="HST additional. Fees quoted per semester unless noted; check the online calendar for exact session dates." />
        <div className="mt-8">
          <PriceTable
            columns={["Program", "Fee", "Notes"]}
            rows={[
              ["Brazilian Jiu-Jitsu", "$175.00", "Full-contact BJJ curriculum. Gi required."],
              ["Karate", "$90.00 – $100.00", "Under the supervision of experienced Goju-Ryu and Shotokan instructors. Ages 12+."],
              ["Muay Thai", "$150.00", "Traditional Thai boxing with a strong emphasis on clinch and pad work."],
              ["Self-Defence Class", "$30.00", "One-day workshop; open to all abilities. Also offered as a Free Self-Defence Class during the Events series."],
              ["Tae Kwon Do", "$110.00", "Recreational TKD program. Belt testing coordinated with the instructor."],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Where" title="Combatives & Wrestling rooms" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Room" title="Combatives Room 242" description="Padded flooring and mirrored walls; primary home of Karate, Brazilian Jiu-Jitsu, Muay Thai and Self-Defence." />
            <InfoCard eyebrow="Room" title="Wrestling Room 3206" description="Full wrestling mat used for Tae Kwon Do, Wrestling Club and select seminar bookings." />
          </div>
          <div className="mt-8">
            <Callout title="Membership required">
              Martial Arts programs are open to NRG and Recreation members and to non-members who purchase the program fee — a Fitness Centre membership is not required. Register at Client Services or online through CONNECT.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
