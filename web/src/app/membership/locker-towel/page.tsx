import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Locker & Towel Service — Membership" };

export default function LockerTowelPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership add-on"
        title="Locker & Towel Service"
        subtitle="Semesterly and monthly locker + towel packages for members using the Fitness Centre, Aquatic Centre and studios. All gym bags and knapsacks must be stored in a locker prior to any activity."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Fitness Centre lockers"
        crumbs={[{ label: "Membership", href: "/membership" }, { label: "Locker & Towel Service" }]}
      />

      <Section>
        <SectionHeader eyebrow="Pricing" title="Locker & towel packages" subtitle="All packages include unlimited towel service. HST additional. Purchase or renew in person at Client Services." />
        <div className="mt-8">
          <PriceTable
            columns={["Package", "Price", "Notes"]}
            rows={[
              ["1/2 Locker & Towel Service", "$65.00 + HST / semester", "Half-height locker in main change room"],
              ["2/3 Locker & Towel Service", "$80.00 + HST / semester", "Two-thirds height locker (most common)"],
              ["Full Locker & Towel Service", "$90.00 + HST / semester", "Full-height locker for boots + coats"],
              ["Towel Only Service — Semesterly", "$50.00 + HST / semester", "No locker; unlimited towels"],
              ["Towel Only Service — Monthly", "$13.75 + HST / month", "Month-to-month towel access"],
              ["Extra Towel Membership", "$20.00 + HST / semester", "Add-on for extra daily towels"],
              ["Lock purchase", "$10.00 + HST", "One-time fee (or bring your own combo lock)"],
              ["Daily Locker Rental", "Free", "Bring your own lock; empty at end of visit"],
              ["Daily Towel Rental", "$4.43 + HST / day", "Pay per visit at Client Services"],
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Important dates" title="Semester renewal & clean-out deadlines" />
          <div className="mt-6">
            <PriceTable
              columns={["Semester", "Rental starts", "Renewal deadline", "Clean-out"]}
              rows={[
                ["Fall 2026", "Sept 2, 2026", "Dec 12, 2026", "Dec 20, 2026"],
                ["Winter 2027", "Jan 5, 2027", "Apr 10, 2027", "Apr 18, 2027"],
                ["Summer 2027", "May 3, 2027", "Aug 14, 2027", "Aug 22, 2027"],
              ]}
              caption="Locks not removed by the clean-out date are cut and contents held for 30 days at Client Services."
            />
          </div>
          <div className="mt-8">
            <Callout variant="warning" title="Day locker rule">
              PLEASE REMOVE ALL CONTENTS FROM DAY LOCKERS AT THE END OF YOUR ACTIVITY. Failure to do so results in a $10 fee.
            </Callout>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Where to buy" title="Purchase at Client Services" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard eyebrow="In person" title="Client Services desk" description="Main floor of the W.F. Mitchell Athletics Centre. Bring your Guelph OneCard or membership card." />
          <InfoCard eyebrow="Phone" title="519-824-4120 ext. 56253" description="Client Services can answer package questions and check semester availability." />
        </div>
      </Section>
    </PageShell>
  );
}
