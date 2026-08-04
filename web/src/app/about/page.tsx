import Image from "next/image";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, StatGrid, CTAButton, Callout } from "@/components/ui";

export const metadata = { title: "About the Department" };

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Department of Athletics"
        subtitle="Gryphon Fitness & Recreation is part of the University of Guelph Department of Athletics. We build inclusive, welcoming spaces where students, staff, and community members can move together, train hard, and live well."
        imageSrc="/images/facilities/wf-mitchell-1.jpg"
        imageAlt="Athletes on the field at Mitchell"
        crumbs={[{ label: "About" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
          <div>
            <SectionHeader
              eyebrow="Who we are"
              title="Nurture. Recreate. Gear up."
            />
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Gryphon Fit & Rec runs the fitness, recreation, and community programs housed at
                the W.F. Mitchell Athletics Centre and the Gryphon Centre Arena. We serve U of G
                students, staff, and faculty, as well as Guelph community members through our
                Community NRG memberships.
              </p>
              <p>
                Our Fitness Centre — newly renovated in September 2016 after 12 years of planning
                — is the largest post-secondary strength and conditioning space in Guelph, with
                capacity for 450 members at peak.
              </p>
              <p>
                We deliver programming across five main pillars: <strong>Fitness & Wellness</strong>,
                <strong> Skill Development</strong>, <strong>Sports & Clubs</strong>,
                <strong> Kids & Camps</strong>, and <strong>Aquatics</strong>. Every program is led
                by certified, trained staff.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200">
            <Image
              src="/images/facilities/fitness-centre-hires.jpg"
              alt="Fitness Centre"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="By the numbers"
            title="Fit & Rec at a glance"
          />
          <div className="mt-8">
            <StatGrid
              items={[
                { value: "450", label: "Fitness Centre capacity", sub: "Peak occupancy" },
                { value: "40+", label: "Weekly NRG classes", sub: "Across Fall/Winter" },
                { value: "14", label: "Intramural sports", sub: "3 levels of play" },
                { value: "8", label: "Certified trainers", sub: "1 Master Trainer" },
              ]}
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">EDI Statement</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Inclusion at Fit & Rec</h3>
            <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
              <p>
                The Department of Athletics is committed to equity, diversity, and inclusion. Our
                facilities, programs, and staff work to ensure every member feels welcome and
                safe.
              </p>
              <p>
                Universal / non-gender change rooms are available. Accessibility features and
                inclusive programming are ongoing priorities. For accommodations or accessibility
                inquiries, contact <a href="mailto:ath-iedi@uoguelph.ca" className="text-gryphon-red hover:underline">ath-iedi@uoguelph.ca</a>.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Fair Play Code</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Code of Conduct</h3>
            <div className="mt-4 space-y-3 text-slate-700 leading-relaxed text-sm">
              <p>
                All Fit & Rec participants — members, guests, instructors, and staff — are expected
                to follow the Fair Play Code:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Respect the rules and officials</li>
                <li>Play safely, fairly, and inclusively</li>
                <li>Zero tolerance for abusive behaviour</li>
                <li>Honour the game — win, lose, or draw</li>
              </ul>
              <p className="pt-2 border-t border-slate-100">
                Violations may result in suspension of privileges — starting at a minimum 4-month
                suspension, with severity dictating longer penalties.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">History</div>
              <div className="mt-3 text-3xl font-black tracking-tight">2016</div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Fitness Centre renovation opened in September 2016 after 12 years of planning,
                design, and construction — expanding the facility by 40%.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">Land Acknowledgement</div>
              <div className="mt-3 text-lg font-black tracking-tight">Between the Rivers</div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                The University of Guelph resides on the ancestral lands of the Attawandaron
                people, and the treaty lands of the Mississaugas of the Credit.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">Get Involved</div>
              <div className="mt-3 text-lg font-black tracking-tight">Volunteer or work with us</div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Fit & Rec regularly hires student staff, camp counsellors, lifeguards, and
                fitness instructors. Watch the U of G career board for openings.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <CTAButton
              href="/about/policies"
              variant="ghost"
              className="!border-white/40 !text-white hover:!bg-white/10"
            >
              Read Full Policies
            </CTAButton>
            <CTAButton
              href="/contact"
              className="!bg-gryphon-red"
            >
              Contact the Team
            </CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
