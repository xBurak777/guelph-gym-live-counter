import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Intramural Policies & Procedures" };

export default function IntramuralPoliciesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Intramurals"
        title="Policies & Procedures"
        subtitle="Governance rules for intramural play at the University of Guelph. Bonds, cancellations, forfeits, fines, eligibility, and the protest & appeals process."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Intramural rulebook"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Intramurals", href: "/sports/intramurals" }, { label: "Policies" }]}
      />

      <Section>
        <SectionHeader eyebrow="Bonds" title="Team bonds & free-agent fees" subtitle="Refundable at the end of the season provided no fines or defaults are outstanding." />
        <div className="mt-8">
          <PriceTable
            columns={["Category", "Amount", "Per"]}
            rows={[
              ["Team Bond — All sports except Hockey", "$100.00", "Per team per semester"],
              ["Team Bond — Ice Hockey", "$300.00", "Per team per semester"],
              ["Free Agent Fee — All sports except Hockey", "$15.00", "Per player per semester"],
            ]}
          />
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeader eyebrow="Fines" title="Default & administrative fines" />
        <div className="mt-6">
          <PriceTable
            columns={["Offence", "Fine"]}
            rows={[
              ["First Game Default — Ice Hockey", "$300.00"],
              ["First Game Default — Other Sports", "$100.00"],
              ["Second Game Default", "Full bond forfeit + removal from league"],
              ["Late Team Roster Submission", "$15.00"],
              ["Team Bond Cheque NSF", "$40.00"],
            ]}
            caption="Defaulting teams may still be responsible for the remainder of the season's game fees."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Governance" title="Cancellations, forfeits & eligibility" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard eyebrow="Cancellation policy" title="Sunday games" description="Sunday games must be cancelled by Thursday at 5pm. Later cancellations count as a default." />
            <InfoCard eyebrow="Defaults / forfeits" title="10-minute default rule" description="A 10-minute default rule applies. If a team is not ready to play within 10 minutes of scheduled tip-off, they forfeit the match." />
            <InfoCard eyebrow="Eligibility" title="Recreation Membership required" description="The Recreation Membership is a prerequisite to play intramurals. Each participant can play on only 1 men's or women's team per sport plus 1 mixed team." />
            <InfoCard eyebrow="Protest & appeals" title="Formal review process" description="Disputes can be filed with the Intramural Office within 48 hours of the incident. A review committee will meet, hear both parties, and issue a written decision." />
          </div>
          <div className="mt-8">
            <Callout title="Fair play code">
              All intramural participants must abide by the Fair Play Code of Conduct: demonstrate respect for all individuals — players, officials, staff and spectators. Failure to abide by our Fair Play Code results in expulsion and/or loss of membership and access privileges.
            </Callout>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Contact" title="Intramural office" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard eyebrow="Phone" title="519-824-4120 ext. 56137" description="Monday to Friday during business hours." />
          <InfoCard eyebrow="Register" title="CONNECT registration system" description="Intramural registration and roster management is handled through CONNECT." />
        </div>
      </Section>
    </PageShell>
  );
}
