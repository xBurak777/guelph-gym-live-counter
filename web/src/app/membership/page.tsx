import Image from "next/image";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, PriceTable, CTAButton, Callout } from "@/components/ui";

export const metadata = { title: "Membership Plans & Pricing" };

const tiers = [
  {
    name: "Student NRG Plus",
    price: "$55",
    unit: "per semester",
    audience: "U of G Students (Full-time)",
    perks: [
      "Full Fitness Centre access",
      "All NRG group fitness classes",
      "Indoor Rock Climbing Wall",
      "Walking/Jogging Track",
      "Drop-in recreation",
    ],
    featured: true,
    cta: "Register at Client Services",
  },
  {
    name: "Student NRG (Mid-term)",
    price: "$30",
    unit: "per semester (mid-term rate)",
    audience: "U of G Students joining mid-semester",
    perks: [
      "Fitness Centre access",
      "Drop-in recreation",
      "Walking/Jogging Track",
      "NRG classes not included (upgrade available)",
    ],
    featured: false,
    cta: "See Registration Steps",
  },
  {
    name: "Community NRG",
    price: "$71.90",
    unit: "per month",
    audience: "Adult community members (18+)",
    perks: [
      "Fitness Centre access",
      "Group fitness classes",
      "Rec swimming, drop-in sports",
      "Walking/Jogging Track",
    ],
    featured: false,
    cta: "Register at Client Services",
  },
  {
    name: "Youth Membership",
    price: "$53.94",
    unit: "per month",
    audience: "Ages 12–17",
    perks: [
      "Fitness Centre (with orientation)",
      "Rec swimming",
      "Drop-in recreation (supervised)",
    ],
    featured: false,
    cta: "See eligibility",
  },
];

export default function MembershipPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership"
        title="Plans built for every Gryphon."
        subtitle="Whether you're a U of G student, staff member, alum, or Guelph resident — there's a Fit & Rec tier that fits how you train. All memberships include Fitness Centre access, drop-in recreation, and the walking/jogging track."
        imageSrc="/images/facilities/fitness-centre-hires.jpg"
        imageAlt="W.F. Mitchell Fitness Centre floor"
        crumbs={[{ label: "Membership" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Choose your tier"
          title="Four core membership options."
          subtitle="All memberships require an in-person visit to Client Services during posted business hours. HST is included where applicable."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-7 ${
                t.featured
                  ? "border-gryphon-red bg-gradient-to-b from-white to-red-50/40 shadow-lg"
                  : "border-slate-200 bg-white"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-gryphon-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most popular
                </div>
              )}
              <div className="text-sm font-semibold text-slate-500">{t.audience}</div>
              <div className="mt-1 text-lg font-black text-slate-900">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-gryphon-red">{t.price}</span>
              </div>
              <div className="text-sm text-slate-500 mt-1">{t.unit}</div>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-gryphon-red mt-1 shrink-0">●</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <CTAButton
                  href="/membership/register"
                  variant={t.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  {t.cta}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Extras"
            title="Passes and add-ons"
            subtitle="Not ready to commit? Grab a day or week pass, or add climbing to any membership."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <InfoCard
              eyebrow="Day Pass"
              title="From $14.16 / adult"
              description="Full access for a single day. Also available for students, seniors, and youth. See the full pass matrix on the Passes page."
              href="/membership/passes"
            />
            <InfoCard
              eyebrow="10-Visit Pass"
              title="Bundled savings"
              description="Ideal for irregular visits. 10 punches for use across drop-in fitness and recreation."
              href="/membership/passes"
            />
            <InfoCard
              eyebrow="Climbing Add-on"
              title="NRG Plus upgrade $44/sem"
              description="Add unlimited climbing wall access to any Recreation membership. Punch passes and day passes also available."
              href="/sports/climbing"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <SectionHeader
              eyebrow="Registration"
              title="How to sign up"
              subtitle="In-person registration at Client Services in the Larry Pearson entrance lobby of the W.F. Mitchell Athletics Centre."
            />
            <ol className="mt-8 space-y-4 text-slate-700">
              <li className="flex gap-4">
                <span className="shrink-0 h-8 w-8 rounded-full bg-gryphon-red text-white font-black text-sm flex items-center justify-center">1</span>
                <div>
                  <div className="font-semibold text-slate-900">Bring valid photo ID</div>
                  <div className="text-sm text-slate-600 mt-1">Student card, driver's licence, or passport. Students require a valid U of G ID.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 h-8 w-8 rounded-full bg-gryphon-red text-white font-black text-sm flex items-center justify-center">2</span>
                <div>
                  <div className="font-semibold text-slate-900">Visit Client Services</div>
                  <div className="text-sm text-slate-600 mt-1">Larry Pearson entrance, W.F. Mitchell Athletics Centre. Ext. 56253 for questions.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 h-8 w-8 rounded-full bg-gryphon-red text-white font-black text-sm flex items-center justify-center">3</span>
                <div>
                  <div className="font-semibold text-slate-900">Complete registration and payment</div>
                  <div className="text-sm text-slate-600 mt-1">Debit, credit, or U of G payroll deduction accepted for eligible staff.</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 h-8 w-8 rounded-full bg-gryphon-red text-white font-black text-sm flex items-center justify-center">4</span>
                <div>
                  <div className="font-semibold text-slate-900">Get your Fit & Rec access</div>
                  <div className="text-sm text-slate-600 mt-1">Swipe-in at the front entrance. No card sharing. Fitness Centre orientation available for first-time users.</div>
                </div>
              </li>
            </ol>
            <div className="mt-8">
              <CTAButton href="/membership/register">Full Registration Guide</CTAButton>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Fine print</div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p><strong className="text-slate-900">Photo ID required</strong> at every visit. Cards may not be shared.</p>
              <p><strong className="text-slate-900">Children under 12</strong> must be accompanied by a parent/guardian (16+) within eyesight at all times.</p>
              <p><strong className="text-slate-900">Community memberships</strong> are month-to-month with pre-authorized debit.</p>
              <p><strong className="text-slate-900">Full HST</strong> included in listed pricing where applicable.</p>
              <p><strong className="text-slate-900">Retiree, alumni,</strong> and family plans available — contact Client Services for pricing.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Callout title="Not affiliated with the University — for now.">
          This is a demo site showcasing a Live Gym Counter concept, built with the University of
          Guelph Gryphons visual identity for context. If you'd like to see this deployed as an
          official U of G tool, get in touch.
        </Callout>
      </Section>
    </PageShell>
  );
}
