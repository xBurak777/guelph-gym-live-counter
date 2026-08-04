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

export const metadata = { title: "Kids Swim Lessons" };

export default function KidsSwimPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Kids Swim Lessons"
        subtitle="We offer a range of Kids Swim Lessons including Private, Semi-Private, and group lessons — now delivered under the Lifesaving Society curriculum."
        imageSrc="/images/facilities/aquatics.jpg"
        imageAlt="Children learning to swim in the Red Pool"
        crumbs={[{ label: "Kids & Camps" }, { label: "Kids Swim Lessons" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Program provider"
          title="We’ve moved to the Lifesaving Society"
          subtitle="We have switched our Learn to Swim provider from The Canadian Red Cross to The Lifesaving Society. The same lesson formats remain available — only the level names have changed."
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/aquatics.jpg"
              alt="Instructor working with young swimmers at the Gryphon Aquatic Centre"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Level conversion chart
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                If your child previously held a Red Cross level, this is where they land now.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[11px] uppercase tracking-widest text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Age group</th>
                      <th className="py-2 font-semibold">Lifesaving Society level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-2.5 pr-4">4–12 months</td>
                      <td className="py-2.5">Parent &amp; Tot 1</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">13 months – 4 years</td>
                      <td className="py-2.5">Parent &amp; Tot 2 &amp; 3</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">Ages 4–6</td>
                      <td className="py-2.5">Preschool 1 – 5</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4">Ages 7+</td>
                      <td className="py-2.5">Rookie (Level 7), Ranger (8), Star Patrol (9)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6">
              <StatGrid
                items={[
                  { value: "4 mo+", label: "Youngest swimmers", sub: "Parent & Tot 1" },
                  { value: "9", label: "Group levels offered", sub: "Parent & Tot to Star Patrol" },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Parent & Tot"
            title="In the water together"
            subtitle="Through structured in-water interaction between parent and child, we stress the importance of play in developing water positive attitudes and skills."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Program", "Ages", "Session ID", "Dates", "Day / Time", "Fee"]}
              rows={[
                [
                  "Parent & Tot 1",
                  "4–12 months",
                  "#38207",
                  "May 2 – Jun 20, 2026 (excl. May 16)",
                  "Sat 8:00–8:30AM",
                  "$147.00",
                ],
                [
                  "Parent & Tot 2 & 3",
                  "13 months – 4 yrs",
                  "#38208",
                  "May 5 – Jun 23, 2026",
                  "Tue 5:00–5:30PM",
                  "$168.00",
                ],
              ]}
            />
          </div>

          <div className="mt-14">
            <SectionHeader
              eyebrow="Preschool"
              title="Preschool 1 through 5"
              subtitle="Parents are welcome to participate with their child for the first three classes of Preschool 1. Intensive sessions compress the same curriculum into a shorter block."
            />
            <div className="mt-8">
              <PriceTable
                columns={["Program", "Ages", "Session ID", "Dates", "Fee"]}
                rows={[
                  ["Preschool 1", "4–6", "#36640 / #36641", "Jan 13/15 – Mar 17/19, 2026", "$189.00"],
                  ["Preschool 1", "4–6", "#38209", "May 5 – Jun 23, 2026", "$176.00"],
                  ["Preschool 1 (intensive)", "4–6", "#38210", "Aug 4 – 13, 2026", "$154.00"],
                  ["Preschool 2 & 3", "5–6", "#36642", "Winter 2026", "$189.00"],
                  ["Preschool 2 & 3", "5–6", "#38211", "Summer 2026", "$154.00"],
                  ["Preschool 4 & 5", "5–6", "#38212", "Summer 2026", "$154.00"],
                  ["Preschool 4 & 5 (intensive)", "5–6", "#38213", "Summer 2026", "$176.00"],
                ]}
              />
            </div>
          </div>

          <div className="mt-14">
            <SectionHeader
              eyebrow="Patrol levels"
              title="Rookie, Ranger, and Star Patrol"
              subtitle="For swimmers ages 7 and up. These levels build endurance, rescue skills, and water safety judgement — and lead directly into the Junior Lifeguard Club and Bronze Star."
            />
            <div className="mt-8">
              <PriceTable
                columns={["Program", "Ages", "Session ID", "Dates", "Day / Time", "Fee"]}
                rows={[
                  [
                    "Rookie Patrol / Swimmer Level 7",
                    "7+",
                    "#38214",
                    "Summer 2026",
                    "See CONNECT",
                    "$176.00",
                  ],
                  [
                    "Rookie Patrol / Swimmer Level 7",
                    "7+",
                    "#36646",
                    "Winter 2026",
                    "See CONNECT",
                    "$189.00",
                  ],
                  [
                    "Ranger Patrol / Swimmer Level 8",
                    "7+",
                    "#36645",
                    "Jan 16 – Mar 20, 2026",
                    "Fri 5:30–6:00PM",
                    "$189.00",
                  ],
                  [
                    "Star Patrol / Swimmer Level 9",
                    "7+",
                    "#36647",
                    "Winter 2026",
                    "See CONNECT",
                    "$189.00",
                  ],
                ]}
                caption="Program details are subject to change prior to registration opening. HST is added at checkout where applicable."
              />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Private & family formats"
          title="One-on-one and family lessons"
          subtitle="If group levels don’t fit your child’s schedule or comfort level, we offer three individualized formats. Fees are quoted at registration."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard
            eyebrow="Ages 3+ · 1:1"
            title="Private Swim Lessons"
            description="One instructor, one swimmer. The fastest route through a level, and the best option for swimmers who need individual attention or accommodations."
          />
          <InfoCard
            eyebrow="Ages 3+ · 2–4 swimmers"
            title="Family Swim Lessons"
            description="Two to four swimmers per registration with a minimum of one parent in the water. Ideal for siblings at different levels."
          />
          <InfoCard
            eyebrow="Ages 3–16 · 1:1"
            title="Private Kids Swim Lessons"
            description="Extended age range for older kids and teens who want private instruction, stroke correction, or exam preparation for a patrol level."
          />
        </div>
        <div className="mt-8">
          <Callout variant="note" title="Fee note">
            Private, Family, and Private Kids lesson fees are confirmed at the time of registration and
            vary by instructor availability and lesson length. Contact Client Services or check CONNECT
            for current rates.
          </Callout>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Pool guidelines for families
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Before your first lesson
              </h2>
              <ul className="mt-8 space-y-4 text-sm leading-relaxed text-slate-300">
                <li className="border-l-2 border-gryphon-gold pl-5">
                  Swimmers should not be on deck until five minutes before their scheduled lesson time.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  Wait for a lifeguard on duty before entering the water.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  Children ages 5–12 must be accompanied by a parent or guardian (16+) within eyesight at
                  all times during recreational swims.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  Swimmers 7 and older use the gender-designated change rooms; universal / non-gender
                  change rooms are also available.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  No street shoes on the pool deck. Spectator gallery access involves approximately 12
                  stairs.
                </li>
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-slate-400">
                For accessibility needs or accommodation requests, contact the Athletics IEDI team at{" "}
                <a href="mailto:ath-iedi@uoguelph.ca" className="text-gryphon-gold hover:underline">
                  ath-iedi@uoguelph.ca
                </a>
                .
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/membership/register">Register on CONNECT</CTAButton>
                <CTAButton
                  href="/skills/aquatics"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  Adult Aquatic Programs
                </CTAButton>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Sample fees by program</h3>
              <dl className="mt-5 space-y-3.5 text-sm">
                {[
                  ["Parent & Tot 1 (4–12 months)", "$147.00"],
                  ["Parent & Tot 2 & 3 (13 mo–4 yrs)", "$168.00"],
                  ["Preschool 1 (ages 4–6)", "$154 – $189"],
                  ["Preschool 2 & 3 (ages 5–6)", "$154 – $189"],
                  ["Preschool 4 & 5 (ages 5–6)", "$154 – $176"],
                  ["Rookie / Ranger / Star Patrol (7+)", "$176 – $189"],
                ].map(([label, fee]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0"
                  >
                    <dt className="text-slate-300">{label}</dt>
                    <dd className="shrink-0 font-bold text-white">{fee}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">
                Fee ranges reflect differences in session length — shorter August intensives cost less
                than the ten-week Winter blocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Related" title="More for kids at Fit & Rec" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard
            eyebrow="Kids & Camps"
            title="Gryphon Summer Camps"
            description="Junior Activity Camp, Sport Camps, Swim 2 Survive, and March Break programming for ages 5–14."
            href="/kids/camps"
          />
          <InfoCard
            eyebrow="Skill Development"
            title="Aquatic Programs"
            description="Adult semi-private lessons, women’s-only small group swim, and Learn to Scuba in the Gold and Red Pools."
            href="/skills/aquatics"
          />
          <InfoCard
            eyebrow="Sports & Clubs"
            title="Discover Rock Climbing"
            description="Kids climbing programming on the GGAC Indoor Climbing Wall, with all equipment provided free."
            href="/sports/climbing"
          />
        </div>
      </Section>
    </PageShell>
  );
}
