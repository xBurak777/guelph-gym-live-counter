import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, Callout, CTAButton, InfoCard } from "@/components/ui";

export const metadata = { title: "How to Register" };

export default function RegisterPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership"
        title="Register for Fit & Rec."
        subtitle="Everything you need to bring, know, and do to activate your Gryphon Fit & Rec membership at the W.F. Mitchell Athletics Centre."
        imageSrc="/images/facilities/wf-mitchell-1.jpg"
        imageAlt="Client Services desk at the Mitchell"
        crumbs={[
          { label: "Membership", href: "/membership" },
          { label: "How to Register" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeader
              eyebrow="4-Step Process"
              title="It takes about 10 minutes."
              subtitle="Registration is completed in person at Client Services during posted business hours. There is no online-only registration at this time — that's exactly the kind of digital upgrade this Live Counter project proposes."
            />

            <div className="mt-10 space-y-6">
              {[
                {
                  step: "01",
                  title: "Verify your eligibility",
                  body: "U of G students have automatic access through their tuition-funded student athletic fees plus optional NRG Plus upgrades. Staff, faculty, retirees, alumni, and Guelph community members choose the tier that matches — see the Membership page for the full grid.",
                },
                {
                  step: "02",
                  title: "Bring valid photo ID and payment",
                  body: "Photo ID (U of G student card, driver's licence, or passport) is required at signup and at every subsequent visit. Debit, credit, or U of G payroll deduction (eligible staff only) is accepted.",
                },
                {
                  step: "03",
                  title: "Visit Client Services in person",
                  body: "Enter via the Larry Pearson lobby of the W.F. Mitchell Athletics Centre, 50 East Ring Road. Client Services staff will walk you through the paperwork and set up your access card.",
                },
                {
                  step: "04",
                  title: "Complete Fitness Centre orientation (optional but recommended)",
                  body: "First-time Fitness Centre users are strongly encouraged to book a free equipment orientation with our fitness staff. Bring clean non-marking indoor shoes.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 flex gap-6"
                >
                  <div className="text-4xl font-black text-gryphon-red tabular-nums leading-none">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{s.title}</div>
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Client Services
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div><strong>Phone:</strong> 519-824-4120 ext. 56253</div>
                <div><strong>Email:</strong> fitandrec@uoguelph.ca</div>
                <div><strong>Location:</strong> W.F. Mitchell Athletics Centre, Larry Pearson lobby</div>
                <div><strong>Address:</strong> 50 East Ring Road, Guelph, ON N1G 2W1</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">
                What to bring
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✓ Government-issued photo ID</li>
                <li>✓ U of G Student ID (for student rates)</li>
                <li>✓ Payment method (debit/credit)</li>
                <li>✓ Void cheque (for community NRG PAD)</li>
                <li>✓ Clean, non-marking athletic shoes</li>
              </ul>
            </div>

            <Callout title="Under 18?">
              Youth memberships (12–17) require a parent/guardian signature and are subject to
              additional supervision policies. Children under 12 must be accompanied by an adult
              (16+) within eyesight during their visit.
            </Callout>
          </aside>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader
            eyebrow="After you register"
            title="Your first week at the Mitchell"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Book a fitness orientation"
              description="Free with your membership. Walk through the Fitness Centre with a staff member and learn safe equipment use."
              href="/fitness/personal-training"
            />
            <InfoCard
              title="Try an NRG class"
              description="40+ weekly sessions — Yoga, HIIT, Cycle, Strength, Barre, Zumba. Check the live schedule and drop in."
              href="/nrg"
            />
            <InfoCard
              title="Check the live counter"
              description="See the current Fitness Centre occupancy on the homepage before you head over. Never wait for a bench."
              href="/"
            />
          </div>
          <div className="mt-10">
            <CTAButton href="/membership">Back to Membership Plans</CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
