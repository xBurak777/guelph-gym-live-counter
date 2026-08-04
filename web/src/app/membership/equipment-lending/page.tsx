import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Equipment Lending — Membership" };

const freeItems = [
  "Agility Ladder",
  "Badminton Birdies & Nets",
  "Badminton Racquets",
  "Basketballs",
  "Boxing Gloves & Pads",
  "Disc Golf Set",
  "Foam Rollers",
  "Footballs",
  "Pickleball Net System & Paddles",
  "Pinnies",
  "Pylons",
  "Resistance Bands",
  "Rugby Balls",
  "Skipping Ropes",
  "Soccer Balls",
  "Squash Racquets",
  "Roundnet (formerly Spikeball)",
  "Table Tennis Paddles & Balls",
  "Ultimate Frisbees",
  "Volleyballs",
  "Yoga Mats",
];

export default function EquipmentLendingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership benefit"
        title="Equipment Lending"
        subtitle="Free equipment lending for all active members. Pick up gear at Client Services with your Guelph OneCard or membership card. Return within your visit."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Equipment lending counter"
        crumbs={[{ label: "Membership", href: "/membership" }, { label: "Equipment Lending" }]}
      />

      <Section>
        <SectionHeader eyebrow="Free to borrow" title="21 items — no charge" subtitle="Signed out with your Guelph OneCard or membership card at Client Services. Please return before leaving the facility." />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {freeItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800">
              <span className="h-2 w-2 rounded-full bg-gryphon-red" aria-hidden />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Paid rentals" title="Daily add-ons" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <InfoCard title="Daily Towel Rental" description="$4.43 + HST per day. Consider a Locker & Towel package if you visit more than 3× per week." />
            <InfoCard title="Combination Lock (one-time purchase)" description="$0.88 + HST. Purchase in advance for day lockers so your gym bag has a home." />
          </div>
        </div>
      </section>

      <Section>
        <Callout title="Squash Court Bookings">
          Squash courts must be booked in advance. Bookings can only be made for yourself. Individuals may book a maximum of 3 slots per week and 1 court per day. See our <a href="/about/faq" className="underline">FAQ</a> for the full policy.
        </Callout>
      </Section>
    </PageShell>
  );
}
