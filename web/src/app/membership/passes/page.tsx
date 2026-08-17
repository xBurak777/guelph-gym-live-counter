import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, Callout, CTAButton } from "@/components/ui";

export const metadata = { title: "Day & Week Passes" };

export default function PassesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership"
        title="Day & Week Passes"
        subtitle="Not a member? Try Fit & Rec with a single-visit day pass or a 5- or 7-day pass. All passes include Fitness Centre, drop-in recreation, and the walking/jogging track."
        imageSrc="/images/facilities/fitness-centre-alt.jpg"
        imageAlt="Fitness Centre floor"
        crumbs={[
          { label: "Membership", href: "/membership" },
          { label: "Passes" },
        ]}
      />

      <Section>
        <SectionHeader
          eyebrow="Day pass rates"
          title="Single-day access"
          subtitle="Pay per visit. Great for occasional users, travellers, or friends visiting a Fit & Rec member. HST included."
        />
        <div className="mt-8">
          <PriceTable
            columns={["Category", "Day Pass"]}
            rows={[
              ["Adult (18+)", "$14.16"],
              ["Student (with ID)", "$8.85"],
              ["Youth (12–17)", "$8.85"],
              ["Senior (60+)", "$8.85"],
              ["Child (under 12, with parent)", "$5.31"],
            ]}
            caption="Purchase at Client Services, Larry Pearson lobby. HST included."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Multi-day passes"
            title="5-day and 7-day options"
            subtitle="Ideal for short-term visitors, conference attendees, or families in Guelph for the week."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Category", "5-Day", "7-Day"]}
              rows={[
                ["Adult (18+)", "$44.20", "$55.75"],
                ["Student (with ID)", "$27.65", "$34.55"],
                ["Youth / Senior", "$27.65", "$34.55"],
                ["Child (under 12)", "$16.60", "$20.80"],
              ]}
              caption="Passes are consecutive days from date of first use. Rates HST-included."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">10-Visit Pass</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Punch pack</div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Bundled savings for irregular visits — 10 punches for use across drop-in fitness and
              recreation over a 6-month window. Ideal for community members who train less than
              weekly.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <div>• Adult: <strong>$118.00</strong></div>
              <div>• Student / Youth / Senior: <strong>$73.50</strong></div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Climbing punches</div>
            <div className="mt-3 text-2xl font-black text-slate-900">Rock wall access</div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Purchase punch passes for the GGAC Climbing Wall — priced separately from general
              recreation passes. All equipment (shoes, harnesses, chalk) included.
            </p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <div>• 5 climbs: <strong>$30 + HST</strong></div>
              <div>• 10 climbs: <strong>$50 + HST</strong></div>
              <div>• Day pass: <strong>$15 + HST</strong></div>
            </div>
            <div className="mt-6">
              <CTAButton href="/sports/climbing" variant="ghost">Climbing Wall Info</CTAButton>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Callout title="First-time visiting? Bring these.">
          Government photo ID (student card, driver&apos;s licence, or passport), clean non-marking
          athletic shoes, and appropriate athletic clothing. Locker rentals available at Client
          Services.
        </Callout>
      </Section>
    </PageShell>
  );
}
