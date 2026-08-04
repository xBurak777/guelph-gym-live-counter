import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, Callout } from "@/components/ui";

export const metadata = { title: "FAQ — Gryphon Fit & Rec" };

const faqs: { q: string; a: string }[] = [
  {
    q: "As a student, can I opt out of my fees associated with the Department of Athletics?",
    a: "You cannot opt out of Athletics and Recreation fees. All undergraduate students on the Guelph campus pay a mandatory Recreation Membership fee as part of their compulsory tuition fees.",
  },
  {
    q: "How do I book a squash court?",
    a: "Squash courts must be booked in advance. Bookings can only be made for yourself. Individuals may book a maximum of 3 slots for the week. Individuals may only book 1 court per day.",
  },
  {
    q: "Do I need to purchase a locker?",
    a: "All gym bags and knapsacks must be stored prior to any activity. Day lockers are free — bring your own combination lock. PLEASE REMOVE ALL CONTENTS FROM DAY LOCKERS AT THE END OF YOUR ACTIVITY. Failure to do so results in a $10 fee. For dedicated storage, see the Locker & Towel Service page.",
  },
  {
    q: "What happens if I lose my membership card?",
    a: "A $10 fee will be applied for anyone requiring a new membership card. Bring photo ID to Client Services for replacement.",
  },
  {
    q: "Are Gender Neutral / Universal change rooms available?",
    a: "Universal Change Rooms are available for anyone looking for a non-gender-specific space. Locations are posted in the W.F. Mitchell Athletics Centre and at the Aquatic Centre entrance.",
  },
  {
    q: "Is there a Lost and Found?",
    a: "Valuable items such as wallets, iPod, keys, etc. are taken to Campus Police. Non-valuable items are held at Client Services for 30 days before being donated.",
  },
  {
    q: "What is the size of the pools?",
    a: "Gold Pool — 25 metre lap pool. Red Pool — 25 yard recreation pool with diving board. Hot Tub — located on Gold Pool deck.",
  },
  {
    q: "What are the weather-closure procedures?",
    a: "Facility closures follow the University of Guelph's overall campus-closure decision. When campus closes, Fit & Rec closes. Signage is posted at facility entrances and status updates go out through the What's New feed and U of G Alert.",
  },
  {
    q: "How do withdrawals and refunds work for registered programs?",
    a: "A tiered refund policy applies based on how far in advance you withdraw from a program. See the Policies page for the full A/B/C schedule and the Community Leagues page for league-specific rules.",
  },
  {
    q: "Is there a waitlist for full programs?",
    a: "Yes — full programs have automatic waitlists through the CONNECT registration system. If space opens you'll be contacted by email in order.",
  },
  {
    q: "Can I transfer between semesters or programs?",
    a: "Transfers between semesters or programs are considered on a case-by-case basis. Contact Client Services with the details of your original registration and desired change.",
  },
  {
    q: "Do you offer guest passes?",
    a: "Yes — see the Day & Week Passes page for pricing across Adult, Student, Senior, Youth, Child, Toddler and Family categories, plus one-week passes and rec-skate day passes.",
  },
];

export default function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us · Info"
        title="Frequently Asked Questions"
        subtitle="Self-service answers to the most common questions about memberships, bookings, safety, refunds and daily-use policies."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="FAQ"
        crumbs={[{ label: "About" }, { label: "FAQ" }]}
      />

      <Section>
        <SectionHeader eyebrow="Answers" title="Common questions" />
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5 open:bg-slate-50">
              <summary className="flex cursor-pointer items-start justify-between gap-4 text-left">
                <span className="text-base font-semibold text-slate-900">{f.q}</span>
                <span className="text-gryphon-red transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Didn't find it?" title="Ask us directly" />
          <div className="mt-8">
            <Callout title="Talk to Client Services">
              Call 519-824-4120 ext. 56253 or visit the Client Services desk in the W.F. Mitchell Athletics Centre. For registration-specific help email <a href="mailto:reghelp@uoguelph.ca" className="underline">reghelp@uoguelph.ca</a>.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
