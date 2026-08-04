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

export const metadata = { title: "Intramurals" };

const outdoorSports = ["3-Pitch", "11v11 Soccer", "Beach Volleyball"];
const indoorSports = [
  "5v5 Indoor Soccer",
  "Badminton",
  "Basketball",
  "Dodgeball",
  "Flag Football",
  "Ice Hockey",
  "Multi-Sport",
  "Pickleball",
  "Roundnet",
  "Squash",
  "Ultimate Frisbee",
  "Volleyball",
];
const winterOnly = ["Arena Football", "Arena Ultimate Frisbee"];

export default function IntramuralsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sports & Clubs"
        title="Intramurals"
        subtitle="Fourteen sports, three levels of play, and leagues running Monday through Thursday evenings and all day Sunday. Register as a team or come in as a free agent."
        imageSrc="/images/heroes/home-banner-2.jpg"
        imageAlt="Intramural competition at the Guelph Gryphons Athletics Centre"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Intramurals" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Registration"
          title="Key dates and deadlines"
          subtitle="Teams play one to two times per week, Monday to Thursday 6:00pm–12:00am and/or Sunday 12:00pm–12:00am."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "Aug 31", label: "Fall registration opens", sub: "2026 at 6:30am" },
              { value: "Sept 15", label: "Outdoor registration closes", sub: "2026 at 11:59pm" },
              { value: "Sept 21", label: "Indoor registration closes", sub: "2026 at 11:59pm" },
              { value: "Nov 30", label: "Winter registration opens", sub: "2026 at 6:30am" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Callout variant="warning" title="You must pay before you play">
            Bond amounts are returned at the end of the semester if no Defaults are incurred.
            Regardless of registering as a team or a free agent, your spot is not guaranteed until you
            have paid. Registering solely on IM Leagues does <strong>not</strong> guarantee you a spot
            in a league.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Level of play"
            title="Pick the league that matches you"
            subtitle="Every sport is offered at more than one level so the games stay competitive and fun for everyone in them."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                6 games + playoffs
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Competitive</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                You’re a skilled and knowledgeable player having experience at a rep or travel level.
                You enjoy a competitive atmosphere and take the game seriously. Teams will receive 6
                regular season games, plus playoffs.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                6 games + playoffs
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Recreational</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                The middle tier — for players with some experience who want real games without the
                intensity of the competitive divisions. Teams will receive 6 regular season games, plus
                playoffs.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                8 games, no playoffs
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Fun</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                You’ve never played the sport before or you’re looking for a social experience. You want
                to get out and meet people in a fun and athletic atmosphere. This level is geared
                towards the beginner player. Teams will play 8 games, no playoffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Sports played"
          title="Fourteen sports across two semesters"
          subtitle="Outdoor sports run in the Fall only. Indoor sports run in both Fall and Winter, with two arena variants added in the Winter semester."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Outdoor · Fall only
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {outdoorSports.map((s) => (
                <li key={s} className="border-b border-slate-100 pb-2 last:border-0">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Indoor · Fall & Winter
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
              {indoorSports.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
              Arena · Winter only
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {winterOnly.map((s) => (
                <li key={s} className="border-b border-slate-100 pb-2 last:border-0">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              Arena variants use the Gryphon Centre Arena floor once the ice is out for the season.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Bonds & fees"
            title="What it costs to play"
            subtitle="Bonds are refundable. A Default — a no-show, a forfeit, or a discipline incident — is deducted from the bond at the end of the semester."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Fee Type", "All Sports (except Hockey)", "Ice Hockey"]}
              rows={[
                ["Team Bond", "$100 / semester", "$300 / semester"],
                ["Free Agent Fee", "$15 / semester", "$30 / semester"],
              ]}
              caption="Bond amounts are returned at the end of the semester if no Defaults are incurred."
            />
          </div>

          <div className="mt-14">
            <SectionHeader
              eyebrow="Sample division schedule"
              title="When leagues play"
              subtitle="An excerpt from the full 60+ row division grid. Exact division times are confirmed after registration closes and rosters are finalized."
            />
            <div className="mt-8">
              <PriceTable
                columns={["Sport (Facility)", "Division", "Day / Time"]}
                rows={[
                  ["3-Pitch (Twin Diamonds)", "Mixed Competitive", "Sunday 12:00pm–3:00pm"],
                  ["3-Pitch (Twin Diamonds)", "Mixed Recreational", "Sunday 3:00pm–6:00pm"],
                  [
                    "11v11 Outdoor Soccer (Gryphon Soccer Complex / Varsity Field)",
                    "Men’s Comp A/B",
                    "Sunday 6:00pm–11:59pm",
                  ],
                  ["11v11 Outdoor Soccer", "Women’s Competitive", "Thursday 8:00pm–11:59pm"],
                  ["Basketball (Event Centre)", "Men’s Comp A/B", "Monday 8:00pm–12:00am"],
                  ["Basketball (Event Centre)", "Mixed Comp A/B", "Tuesday 8:00pm–12:00am"],
                  ["Ice Hockey (Gryphons Centre Arena)", "Men’s Competitive A", "Monday 9:30pm–1:00am"],
                  ["Ice Hockey", "Women’s Competitive", "Sunday 7:30pm–11:30pm"],
                  ["Volleyball (West Gym)", "Women’s Competitive A/B", "Sunday 5:00pm–9:00pm"],
                  ["Pickleball (Mitchell Gym)", "Open Comp A/B (Mon/Tue/Wed)", "7:00pm–12:00am"],
                ]}
                caption="Excerpt only — the complete grid covers all 14 sports and every division."
              />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Player safety"
          title="Concussion education"
          subtitle="All intramural participants are directed to the Department’s concussion education resources before their first game."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <InfoCard
            eyebrow="Resource"
            title="Brain 101: What’s a concussion?"
            description="A primer on recognizing concussion symptoms and the removal-from-play protocol used across Gryphon recreation programming."
          />
          <InfoCard
            eyebrow="Resource"
            title="Concussions 101: A primer for kids and parents"
            description="Return-to-learn and return-to-play guidance for younger participants in Gryphon camps and youth leagues."
          />
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Get in touch
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                No team? No problem.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Register as a free agent for $15 per semester ($30 for Ice Hockey) and we’ll place you
                on a roster that needs players. Free agents are the fastest way into a league if you’re
                new to campus.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/membership/register">Register on CONNECT</CTAButton>
                <CTAButton
                  href="/sports/drop-in"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  Try Drop-in Rec Instead
                </CTAButton>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Intramural contacts</h3>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-white">General inquiries</dt>
                  <dd className="mt-1 text-slate-300">
                    519-824-4120 ext. 56137 ·{" "}
                    <a href="mailto:iplayim@uoguelph.ca" className="text-gryphon-gold hover:underline">
                      iplayim@uoguelph.ca
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Intramural Supervisor</dt>
                  <dd className="mt-1 text-slate-300">
                    Adam Bailey ·{" "}
                    <a
                      href="mailto:abaile06@uoguelph.ca"
                      className="text-gryphon-gold hover:underline"
                    >
                      abaile06@uoguelph.ca
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Sports Clubs</dt>
                  <dd className="mt-1 text-slate-300">
                    <a href="mailto:clubs@uoguelph.ca" className="text-gryphon-gold hover:underline">
                      clubs@uoguelph.ca
                    </a>{" "}
                    · see the Clubs page for the student-run program
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
