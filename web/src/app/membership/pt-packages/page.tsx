import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, PriceTable, Callout, CTAButton } from "@/components/ui";

export const metadata = { title: "Personal Training Packages" };

export default function PTPackagesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Membership"
        title="Personal Training Packages"
        subtitle="1:1 coaching with 8 certified trainers, including Master Trainer Lynne Skilton-Hayes. Choose the package size that matches your goals — from single sessions to full-semester programs."
        imageSrc="/images/facilities/fitness-centre-hires.jpg"
        imageAlt="Personal training session on the Fitness Centre floor"
        crumbs={[
          { label: "Membership", href: "/membership" },
          { label: "PT Packages" },
        ]}
      />

      <Section>
        <SectionHeader
          eyebrow="1:1 Personal Training"
          title="Session bundles"
          subtitle="All PT packages are with the same trainer of your choosing. Sessions are 60 minutes. Rates below include HST."
        />
        <div className="mt-8">
          <PriceTable
            columns={["Package", "Sessions", "Student", "Member", "Non-Member"]}
            rows={[
              ["Single", "1", "$55.00", "$65.00", "$79.00"],
              ["Starter", "5", "$255.00", "$305.00", "$372.00"],
              ["Momentum", "10", "$495.00", "$590.00", "$720.00"],
              ["Commit", "20", "$960.00", "$1,145.00", "$1,395.00"],
              ["Full Semester", "36", "$1,690.00", "$2,015.00", "$2,455.00"],
            ]}
            caption="Package rates include a complimentary Fitness Assessment. Sessions expire 12 months from purchase date."
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Small-Group PT"
            title="Group Personal Training (2–4 people)"
            subtitle="Train with a friend or small group at a lower per-person rate. Perfect for teammates or workout buddies who want structured coaching."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Group Size", "5 Sessions (Student)", "5 Sessions (Member)", "10 Sessions (Student)", "10 Sessions (Member)"]}
              rows={[
                ["Duo (2)", "$165 / person", "$195 / person", "$310 / person", "$370 / person"],
                ["Trio (3)", "$130 / person", "$155 / person", "$245 / person", "$290 / person"],
                ["Quad (4)", "$110 / person", "$130 / person", "$205 / person", "$245 / person"],
              ]}
              caption="Includes an intake session and program design. All group members must have a current Fit & Rec membership."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Fitness assessment</div>
            <div className="mt-3 text-2xl font-black text-slate-900">One-time $45</div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              A 60-minute intake session covering health history, goals, movement screening, and
              a baseline strength/cardio benchmark. Complimentary with any 5+ session PT package.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Program design</div>
            <div className="mt-3 text-2xl font-black text-slate-900">$85 per program</div>
            <p className="mt-3 text-slate-600 leading-relaxed">
              A 12-week custom training program written by one of our certified trainers — for
              athletes who want the plan without the weekly 1:1 sessions.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Callout title="Meet the team">
          Our 8-trainer roster includes Master Trainer <strong>Lynne Skilton-Hayes</strong>, plus
          certified specialists in strength, hypertrophy, rehabilitation, running gait, and
          post-natal fitness. Full bios available on the Personal Training page.
        </Callout>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton href="/fitness/personal-training">Meet the Trainers</CTAButton>
          <CTAButton href="/membership" variant="ghost">See Membership Options</CTAButton>
        </div>
      </Section>
    </PageShell>
  );
}
