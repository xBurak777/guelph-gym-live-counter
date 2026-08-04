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
  StatGrid,
} from "@/components/ui";

export const metadata = { title: "Gryphon Kids & Camps" };

const sportCamps = [
  { name: "Hockey", ages: "See calendar", note: "Led by Gryphon coaches at the Gryphon Centre Arena." },
  { name: "Youth Fitness", ages: "10–14", note: "Introduction to strength and conditioning in the GGAC." },
  { name: "Rugby", ages: "11–14", note: "Skills and small-sided games on the varsity fields." },
  { name: "Triathlon (Half Day)", ages: "11–16", note: "Swim, bike, and run blocks across campus facilities." },
  { name: "Basketball", ages: "7–9", note: "Fundamentals in the Event Centre and Mitchell Gym." },
  { name: "Flag Football", ages: "10–14", note: "Non-contact football skills and league play." },
  { name: "Aquatic Fitness (Half Day)", ages: "10–14", note: "Water-based conditioning in the Gryphon Aquatic Centre." },
  { name: "Pre-Season Swim", ages: "See calendar", note: "Not currently offered for the 2026 season." },
];

export default function KidsCampsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Welcome to Gryphon Kids & Camp Programming"
        subtitle="We offer a variety of exciting programs for campers ages 5–14. Whether your camper is looking to get active, learn new skills and sports, explore nature, or make lasting friendships, we have a program for everyone."
        imageSrc="/images/heroes/kids-camps-hub.jpg"
        imageAlt="Campers at Gryphon Summer Camps"
        crumbs={[{ label: "Kids & Camps" }, { label: "Camps" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Registration"
          title="Summer 2026 registration opens February 9"
          subtitle="Registration begins Monday, February 9 at 6:30am. A $30 non-refundable deposit per camper per week secures the spot under our payment plan."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "5–14", label: "Camper ages served", sub: "Activity & Sport Camps" },
              { value: "1:6", label: "Staff-to-camper ratio", sub: "Junior Activity Camp" },
              { value: "$35", label: "Extended Day per week", sub: "4:30–5:30pm supervision" },
              { value: "SUN AWARE", label: "Certified for 2026", sub: "Melanoma Canada program" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Callout title="SUN AWARE Certified for 2026">
            Gryphon Summer Camps is SUN AWARE Certified for the 2026 season. The SUN AWARE Sun Safety
            Certification Program is developed by Melanoma Canada to help protect children and teens from
            skin cancer by supporting the community in implementing best practices in sun safety across
            Canada.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/heroes/activity-camps.png"
                alt="Junior Activity Camp participants"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeader
                eyebrow="Ages 5–7"
                title="Junior Activity Camp"
                subtitle="Purposeful fun that is age-appropriate and engaging."
              />
              <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Campers engage in thoughtful and deliberately planned activities — games, crafts,
                  challenges, outdoor fun. Each week allows for creativity, physical recreation,
                  reinforcing independence, and developing social skills.
                </p>
                <p>
                  Junior Activity Camp groups include 3 staff per 18 campers, a 1:6 ratio. Campers will
                  not participate in recreational swimming; instead, water games are incorporated into
                  activities throughout the week.
                </p>
                <p>
                  Campers can look forward to <strong>Whimsical Wednesdays</strong>, a day with a few
                  “twists,” and the <strong>Fun Friday Finale</strong>, theme-based challenges to
                  conclude their camp week.
                </p>
                <p className="text-sm text-slate-600">
                  Available weeks: June 29–30 and July 2–3, plus Weeks 1 through 9.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTAButton href="/membership/register">Register a Camper</CTAButton>
                <CTAButton href="/contact" variant="ghost">
                  Ask a Question
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Daily schedule"
          title="Drop-off, programming, and pick-up"
          subtitle="The same daily rhythm applies across all Gryphon camp programs."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            { time: "8:00–8:45am", label: "Drop-Off", note: "Sign in at the camp check-in desk." },
            { time: "8:45am–4:00pm", label: "Programming", note: "Activities, games, and lessons." },
            { time: "4:00–4:30pm", label: "Pick-Up", note: "Authorized guardians only." },
            {
              time: "4:30–5:30pm",
              label: "Extended Day",
              note: "$35/week per camper, available for purchase in June.",
            },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                {b.time}
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">{b.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Sport Camps"
            title="Coached by Gryphons"
            subtitle="Gryphon Camps offer a variety of camps that are categorized into Activity Camps or Sport Camps. Sport Camps offer a focused approach to sport-specific skill development led by Gryphon Coaches and trained staff, designed to teach and facilitate growth that is age and skill level appropriate. Sport Camp weeks are limited due to facility and coaching staff availability."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sportCamps.map((c) => (
              <InfoCard
                key={c.name}
                eyebrow={`Ages ${c.ages}`}
                title={c.name}
                description={c.note}
              />
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Per-camp fees and the exact week each Sport Camp runs are published in the Summer Camp 2026
            Calendar. Contact the camps office for the current calendar.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Signature programs"
          title="Three camps worth knowing about"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Learn to swim + camp
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Swim 2 Survive</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <p>
                Through the creative programming of our Junior Activity Camp combined with daily
                learn-to-swim lessons, campers will develop water safety skills and learn swimming
                basics while gaining self-confidence, independence, new skills, and new friendships.
              </p>
              <p>
                The program is for campers of all skill levels, including those with zero previous swim
                experience. Campers will gain confidence in the water through daily 90-minute swim
                lessons with certified swim instructors.
              </p>
            </div>
            <div className="mt-6">
              <CTAButton href="/kids/swim" variant="ghost">
                Kids Swim Lessons
              </CTAButton>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Community partnership
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Girls at Bat</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <p>
                Delivered in partnership with the Toronto Blue Jays’ Jays Care Foundation. Past cohorts
                have included a Community Clubhouse experience — 21 campers attended in the 2023
                edition.
              </p>
              <p>
                Girls at Bat combines baseball skill development with leadership and confidence-building
                programming. Registration begins Monday, February 9 at 6:30am alongside all other summer
                programs.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Ages 5–12 · Session #36597
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
              March Break Gryphons Camp
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <p>
                March 16–20, 2026, Monday to Friday, 8:00AM–4:30PM. A full week of activity camp
                programming during the school break, run out of the GGAC and Gryphon Field House.
              </p>
              <p className="text-lg font-black text-gryphon-red">$300.00 / week</p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Fees & policies"
            title="What camp costs"
            subtitle="Camp fees vary by program and week. The figures below are confirmed rates for add-ons, March Break, and our deposit and withdrawal policy."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Camp / Add-on", "Age", "Fee"]}
              rows={[
                ["Post-Camp Extended Day Supervision (4:30–5:30pm)", "All ages", "$35 / week / camper"],
                ["March Break Activity Camp (#36597)", "5–12", "$300.00 / week"],
                ["Camp deposit (Payment Plan)", "—", "$30 non-refundable per camper per week"],
                ["Withdrawal fee (10+ days’ notice)", "—", "$30"],
              ]}
              caption="Extended Day Supervision becomes available for purchase in June. Weekly Activity and Sport Camp fees are published in the Summer Camp 2026 Calendar."
            />
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/heroes/camps-welcome.png"
                alt="Gryphon Summer Camps welcome banner"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <Callout variant="warning" title="Withdrawal notice">
                Camp withdrawals require a minimum of 10 days’ notice and carry a $30 administrative fee.
                The $30 per-camper, per-week payment plan deposit is non-refundable.
              </Callout>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                  Camps office
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  <a href="mailto:camps@uoguelph.ca" className="text-gryphon-red hover:underline">
                    camps@uoguelph.ca
                  </a>{" "}
                  · 519-824-4120 ext. 56131
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Year-round kids programming
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Camp isn’t the only option
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Kids Skill Development runs alongside camps through the school year — swim lessons,
                Discover Rock Climbing, ballet in the Fall and Dance Fusion in the Winter, and March
                Break programming. Registration for all kids programming runs through CONNECT.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/kids/swim">Kids Swim Lessons</CTAButton>
                <CTAButton
                  href="/sports/climbing"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  Discover Rock Climbing
                </CTAButton>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15">
              <Image
                src="/images/facilities/kids-camps-2.jpg"
                alt="Campers taking part in Gryphon camp activities"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
