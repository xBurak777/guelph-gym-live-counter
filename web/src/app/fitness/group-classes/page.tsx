import Image from "next/image";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import {
  Section,
  SectionHeader,
  InfoCard,
  PriceTable,
  Callout,
  CTAButton,
} from "@/components/ui";

export const metadata = { title: "Group Fitness Classes" };

const strengthCardio = [
  { name: "Body Blast", desc: "Full-body strength and cardio intervals that move through every major muscle group." },
  { name: "Cardio & Strength Intervals", desc: "Alternating blocks of loaded strength work and cardio conditioning." },
  { name: "Pure Strength", desc: "Barbell, dumbbell, and stability-ball strength work — improve your strength, balance, mobility, and cardiovascular ability." },
  { name: "Strength ’N Stamina", desc: "Longer strength sets paired with sustained cardio effort for muscular endurance." },
  { name: "Workout OTD", desc: "Workout of the day — the format changes every class, so no two sessions repeat." },
  { name: "Rock Bottom", desc: "Lower-body focused conditioning: glutes, hamstrings, quads, and calves." },
];

const cardioDance = [
  { name: "Zumba®", desc: "This Latin dance fitness class combines fast and slow rhythms that tone and sculpt the body with easy to follow dance steps." },
  { name: "Glow Zumba®", desc: "Zumba® under the lights — same easy-to-follow choreography, party atmosphere." },
  { name: "STRONG® Nation", desc: "High-intensity music-driven bodyweight training synced beat-for-beat to the track." },
  { name: "Belly Dance Fit (Women’s Only)", desc: "Belly dance technique and isolations delivered as a cardio workout in a women’s-only space." },
  { name: "Barre Burn", desc: "Ballet-inspired isometric holds and small-range work at the barre." },
  { name: "Step ’N Strength", desc: "Step choreography combined with loaded strength intervals." },
];

const coreMindBody = [
  { name: "Pilates", desc: "Improve both posture and balance by learning to focus on controlled movements in order to strengthen the core and create stabilization around the joints." },
  { name: "Yoga", desc: "Yoga aims to unite movement with breath to bring about a peaceful, meditative mind while also toning the body." },
  { name: "CIRCL Mobility™", desc: "A Yoga style stretch class, combined with foam rolling fascial release techniques. Release tension and remove stuck stress to aid in recovery and improve your mobility." },
  { name: "Crush ’N Core", desc: "A class devoted solely to toning and strengthening the core — from your neck to your knees." },
  { name: "Step ’N Core", desc: "Experience an intense cardio workout on the step to challenge your mind & muscles, followed by conditioning work on the floor to tighten & tone your core." },
  { name: "TRX® Suspension", desc: "TRX®, which stands for Total Body Resistance Exercise, is a revolutionary workout method that uses your body weight and gravity as resistance to build strength, balance, coordination, flexibility, core and joint stability." },
];

const combat = [
  { name: "Cardio Kickbox", desc: "Kickboxing combinations choreographed to music — no contact, no equipment needed." },
  { name: "Knockout Boxing", desc: "Boxing footwork, combinations, and conditioning rounds in a non-contact format." },
  { name: "Aquafit", desc: "Water-based conditioning in the Gryphon Aquatic Centre — low impact, high resistance." },
  { name: "Group Cycle", desc: "Indoor cycling intervals in Studio Room 3216, home to our stationary bike fleet." },
];

function ClassGrid({ items }: { items: { name: string; desc: string }[] }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <div
          key={c.name}
          className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-gryphon-red hover:shadow-md"
        >
          <h3 className="text-lg font-bold tracking-tight text-slate-900">{c.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function GroupClassesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness & Wellness"
        title="Group Fitness Classes"
        subtitle="Your NRG Fitness Membership or day pass gives you access to every class on the NRG Schedule — yoga, Pilates, cycle, Zumba®, boxing, step, TRX® and more, taught live in the GGAC studios."
        imageSrc="/images/facilities/fitness-classes.jpg"
        imageAlt="Participants in a group fitness class at the Guelph Gryphons Athletics Centre"
        crumbs={[
          { label: "Fitness & Wellness", href: "/fitness/wellness" },
          { label: "Group Classes" },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <SectionHeader
              eyebrow="What NRG means"
              title="Nurture. Recreate. Gear up."
              subtitle="NRG is the umbrella for all instructor-led group fitness at Fit & Rec. One membership covers unlimited classes, the 22,000 sq/ft Fitness Centre Gym, the sensory-reduced NRG Zone, and Gryphon Fitness OnDemand virtual classes."
            />
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Classes are delivered live by certified instructors — many of whom trained through
                our own canfitpro-affiliated Fitness Instructor and Group Cycle certification
                courses. Formats span strength, cardio, dance, combat, aquatic, and mind-body.
              </p>
              <p>
                The full weekly grid is published on the NRG Schedule and refreshed every Tuesday.
                The Summer 2026 schedule runs Monday, July 6 to Friday, September 4, 2026.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/nrg">View the NRG Schedule</CTAButton>
              <CTAButton href="/membership" variant="ghost">
                Membership Options
              </CTAButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/pilates-yoga.jpg"
              alt="Pilates and yoga class in a GGAC studio"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Where classes run"
            title="The studios"
            subtitle="Group fitness is delivered across five spaces on the second and third floors of the Guelph Gryphons Athletics Centre, plus the Gryphon Aquatic Centre for Aquafit."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              eyebrow="Studio Room 3212"
              title="Main group fitness studio"
              description="74' × 44' with a stage platform — our largest studio, used for step, strength, dance, and high-capacity cardio formats."
            />
            <InfoCard
              eyebrow="Studio Room 3214"
              title="Barre & mind-body"
              description="64' × 52' with a portable ballet bar. Home to Barre Burn, Pilates, Yoga, and CIRCL Mobility™."
            />
            <InfoCard
              eyebrow="Studio Room 3216"
              title="Cycle studio"
              description="39' × 29', outfitted with our stationary bike fleet. Group Cycle classes must be booked with a department instructor."
            />
            <InfoCard
              eyebrow="Studio Room 302"
              title="Rec Studio"
              description="60' × 40' with a ballet bar — a shared, no-equipment movement space. Access is granted at Client Services and requires a minimum of two people in the room."
            />
            <InfoCard
              eyebrow="NRG Zone (Studio 3202)"
              title="Sensory-reduced training"
              description="Small-scale studio on the 3rd floor: dim lights, no music, blinds drawn, 20-person cap. Drop-in only — no registration required."
            />
            <InfoCard
              eyebrow="Gryphon Aquatic Centre"
              title="Aquafit"
              description="Water-based classes run in the Gold and Red Pools in the historic wing of the GGAC."
              href="/skills/aquatics"
            />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Class catalogue"
          title="Strength & conditioning"
          subtitle="Loaded, structured formats for members who want to build strength and work capacity in a group setting."
        />
        <ClassGrid items={strengthCardio} />
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow="Class catalogue"
          title="Cardio & dance"
          subtitle="Choreographed, music-led formats. No dance experience required — instructors break every combination down."
        />
        <ClassGrid items={cardioDance} />
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow="Class catalogue"
          title="Core, mobility & mind-body"
          subtitle="Controlled movement, breath, and recovery work. These formats pair well with a heavy training week."
        />
        <ClassGrid items={coreMindBody} />
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow="Class catalogue"
          title="Combat, cycle & aquatic"
          subtitle="Non-contact boxing and kickboxing, indoor cycling, and pool-based conditioning."
        />
        <ClassGrid items={combat} />
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Choosing a class"
            title="Which level is right for you?"
            subtitle="Every NRG class is open to all members — instructors offer regressions and progressions in real time. Use this as a rough guide to your first booking."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoCard
              eyebrow="New to group fitness"
              title="Start here"
              description="Yoga, Pilates, CIRCL Mobility™, Aquafit, and Zumba®. Low impact, choreography broken down step by step, minimal equipment."
            />
            <InfoCard
              eyebrow="Comfortable and consistent"
              title="Build from here"
              description="Body Blast, Step ’N Core, Barre Burn, Cardio Kickbox, Group Cycle, TRX® Suspension. Expect sustained effort and light-to-moderate load."
            />
            <InfoCard
              eyebrow="Experienced"
              title="Push here"
              description="Pure Strength, Strength ’N Stamina, Knockout Boxing, STRONG® Nation, Workout OTD. Higher intensity, heavier loading, faster transitions."
            />
          </div>
          <div className="mt-8">
            <Callout variant="note" title="Class protocols">
              Arrive 5–10 minutes early so the instructor can set you up. Bring your own water and a
              towel. Photography and videography are not permitted in the studios, the Fitness
              Centre, or the Climbing Wall. NRG stickers are picked up at Client Services, the
              Fitness Centre Desk, or directly from your class instructor.
            </Callout>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Access"
          title="What it costs to attend"
          subtitle="Group fitness is bundled into NRG membership tiers rather than sold per class. Day pass holders get the same class access for a single visit."
        />
        <div className="mt-8">
          <PriceTable
            columns={["Access type", "Price", "Class access"]}
            rows={[
              ["Student NRG Membership", "$30 +HST / semester (Midterm Pricing)", "Unlimited NRG classes + Fitness Centre Gym + NRG Zone"],
              ["Student NRG Plus Membership", "$55 +HST / semester (Midterm Pricing)", "Everything in NRG, plus the Indoor Climbing Wall"],
              ["Non-Student (18+) NRG Fitness Membership", "$71.90 +HST / month", "Unlimited NRG classes + Fitness Centre Gym"],
              ["Youth NRG Membership (13–17)", "$53.94 +HST / month", "Unlimited NRG classes + Fitness Centre Gym after mandatory orientation"],
              ["U of G Staff / Faculty / Retiree", "Subsidized monthly rate", "No initiation fee, month to month, pause anytime without penalty"],
              ["Adult Day Pass (18–64)", "$14.16 +HST", "NRG classes + Fitness Centre Gym for one day"],
              ["Youth Day Pass (13–17)", "$12.39 +HST", "NRG classes only — Fitness Centre Gym requires orientation"],
            ]}
            caption="Summer 2026 semester rates (May 1 – September 1, 2026). HST is added at checkout. NRG memberships carry a 10-day cooling-off period for full refunds."
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/nrg">This Week’s Schedule</CTAButton>
          <CTAButton href="/membership/register" variant="secondary">
            How to Register
          </CTAButton>
          <CTAButton href="/fitness/wellness" variant="ghost">
            Wellness Programs
          </CTAButton>
        </div>
      </Section>
    </PageShell>
  );
}
