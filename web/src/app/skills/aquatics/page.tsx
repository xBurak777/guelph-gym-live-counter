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

export const metadata = { title: "Aquatic Programs" };

export default function AquaticsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Aquatic Programs"
        subtitle="The University of Guelph houses two full-sized swimming pools — the Gold Pool and the Red Pool — located in the historic wing of the Guelph Gryphons Athletics Centre."
        imageSrc="/images/facilities/aquatics.jpg"
        imageAlt="The Gryphon Aquatic Centre pool deck"
        crumbs={[{ label: "Skill Development" }, { label: "Aquatics" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="The Gryphon Aquatic Centre"
          title="Two pools, one historic wing"
          subtitle="Lane swimming, learn-to-swim, Aquafit, scuba training, and lifesaving certification all run out of the same two tanks."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "25 m", label: "Gold Pool", sub: "8 lanes · 6 ft deep" },
              { value: "25 yd", label: "Red Pool", sub: "5 lanes · 4–11 ft · diving board" },
              { value: "2", label: "Pool decks with AEDs", sub: "Plus pool lifts" },
              { value: "Aug 31", label: "Fall registration opens", sub: "Monday, 6:30am" },
            ]}
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
          <div className="grid gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Gold Pool
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                25-metre lap pool
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Eight lanes at a uniform 6 ft depth, used for length swims, Aquafit, varsity
                training, and adult lesson programming. A hot tub sits on the Gold Pool deck.
                Rentals are $168.69/hr +HST including three lifeguards.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Red Pool
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                25-yard recreation pool
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Five lanes with a graded depth from 4 ft to 11 ft and a diving board — the home of
                recreational swims, kids swim lessons, and Swim 2 Survive. Rentals are $141.69/hr
                +HST including three lifeguards; additional lifeguards are $27.00/hr +HST.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/aquatics.jpg"
              alt="Swimmers in the Gryphon Aquatic Centre"
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
            eyebrow="Registered programs"
            title="Adult aquatic programs"
            subtitle="Below activities require registration and fees apply. A Recreation Membership is not a pre-requisite to enroll in certification courses. Winter registration opens Monday, November 24th at 6:30am — program details are subject to change prior to registration opening."
          />

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Ages 18+
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                Adult Semi Private Swim Lessons
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Small-group instruction in 30-minute slots on Wednesday evenings. Suitable for adults
                learning to swim as well as stroke correction for experienced swimmers.
              </p>
              <div className="mt-6">
                <PriceTable
                  columns={["Session ID", "Dates", "Day / Time", "Fee"]}
                  rows={[
                    ["#35947", "Oct 22 – Nov 19, 2025", "Wed 7:00–7:30PM", "$120.00"],
                    ["#35948", "Oct 22 – Nov 19, 2025", "Wed 7:30–8:00PM", "$120.00"],
                    ["#36589", "Jan 7 – Feb 4, 2026", "Wed 7:00–7:30PM", "$120.00"],
                    ["#36590", "Jan 7 – Feb 4, 2026", "Wed 7:30–8:00PM", "$120.00"],
                    ["#36591", "Feb 11 – Mar 18, 2026 (excl. Feb 18)", "Wed 7:00–7:30PM", "$120.00"],
                    ["#36592", "Feb 11 – Mar 18, 2026 (excl. Feb 18)", "Wed 7:30–8:00PM", "$120.00"],
                  ]}
                  caption="Register through CONNECT. Session IDs are the same identifiers used in the registration system."
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Women’s Only
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                Women’s Only Small Group Swim Lessons
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Participants will increase their awareness of personal safety. Swimmers will have an
                opportunity to set personal goals and develop their progress in a small class
                environment. This program is suitable for new swimmers, right up to experienced
                swimmers looking for stroke correction and endurance.
              </p>
              <div className="mt-6">
                <PriceTable
                  columns={["Session ID", "Dates", "Day / Time", "Fee"]}
                  rows={[
                    ["#37235", "Sep 21 – Oct 26, 2025 (excl. Oct 12)", "Sun 6:30–7:00PM", "$120.00"],
                    ["#37236", "Sep 21 – Oct 26, 2025 (excl. Oct 12)", "Sun 7:05–7:30PM", "$120.00"],
                    ["#36593", "Jan 15 – Feb 12, 2026", "Thu 8:30–9:00PM", "$120.00"],
                    ["#36594", "Jan 15 – Feb 12, 2026", "Thu 9:30–10:00PM", "$120.00"],
                  ]}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Ages 18+
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                Scuba Diving — Learn to Scuba
              </h3>
              <div className="mt-3 space-y-4 text-slate-600 leading-relaxed">
                <p>
                  This “Learn to Scuba” training course is designed to promote safe diving practices
                  and prepare you for a lifetime of recreational diving. After completing the
                  academic (online) and pool (confined-water) training portions of the course, Scuba
                  Trainees will be required to perform an open-water dive in a lake (local
                  certification weekend) or ocean (Universal Referral) to attain a Scuba Diver
                  certification — additional costs apply.
                </p>
                <p>
                  Participants must have basic swimming skills: the ability to swim 200 m and tread
                  water for 10 minutes. Equipment rentals are available at a cost of $75.00.
                </p>
              </div>
              <div className="mt-6">
                <PriceTable
                  columns={["Session ID", "Dates", "Day / Time", "Fee"]}
                  rows={[["#35949", "Oct 2 – Nov 13, 2025", "Thu 8:00–10:00PM", "$385.00"]]}
                  caption="Plus optional $75.00 equipment rental. Open-water certification dive fees are additional."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Drop-in swimming"
          title="Rec swim, length swim, and Aquafit"
          subtitle="Recreational swimming is included in the Recreation Membership or a day pass. The weekly Drop-in Rec calendar is updated every Tuesday — check it before you travel to the pool."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard
            eyebrow="Length swim"
            title="Gold Pool lanes"
            description="Eight lanes at 6 ft depth. Lane etiquette applies — circle swim in busy lanes and choose the lane matching your pace."
            href="/sports/drop-in"
          />
          <InfoCard
            eyebrow="Rec & family swim"
            title="Red Pool"
            description="Diving board and 4–11 ft depth. Children 5–12 require a parent or guardian (16+) within eyesight at all times; pool admission standards set supervision ratios by age."
          />
          <InfoCard
            eyebrow="NRG Schedule"
            title="Aquafit"
            description="Water-based conditioning included with any NRG Fitness Membership or day pass. Low impact, high resistance — listed on the NRG Schedule."
            href="/nrg"
          />
        </div>
        <div className="mt-8">
          <Callout variant="warning" title="Pool facility guidelines">
            Swimmers 7 and older use the gender-designated change rooms; universal / non-gender change
            rooms are also available. Wait for a lifeguard on duty before entering the water. Swimmers
            should not be on deck until five minutes before their scheduled time. No street shoes on
            the pool deck. Spectator gallery access requires approximately 12 stairs — for
            accessibility support contact{" "}
            <a href="mailto:ath-iedi@uoguelph.ca" className="text-gryphon-red hover:underline">
              ath-iedi@uoguelph.ca
            </a>
            .
          </Callout>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Our learn-to-swim partner
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Certified by the Lifesaving Society
              </h2>
              <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
                <p>
                  We have switched our Learn to Swim provider from The Canadian Red Cross to The
                  Lifesaving Society. The same lesson formats remain available — only the level names
                  have changed, and a conversion chart is published alongside the kids swim lesson
                  listings.
                </p>
                <p>
                  Lifesaving Society programming carries through our youth stream (Preschool 1–5,
                  Rookie / Ranger / Star Patrol) and into leadership awards such as Bronze Star and
                  the Junior Lifeguard Club under Kids Skill Development.
                </p>
                <p>
                  Swim lessons aren’t just for kids — adult semi-private and women’s-only small group
                  lessons are listed above.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/kids/swim">Kids Swim Lessons</CTAButton>
                <CTAButton
                  href="/membership/register"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  How to Register
                </CTAButton>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Program fees at a glance</h3>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-300">Adult Semi Private Swim Lessons</dt>
                  <dd className="font-bold text-white">$120.00</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-300">Women’s Only Small Group Lessons</dt>
                  <dd className="font-bold text-white">$120.00</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                  <dt className="text-slate-300">Scuba Diving (18+)</dt>
                  <dd className="font-bold text-white">$385.00</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-slate-300">Scuba equipment rental</dt>
                  <dd className="font-bold text-white">$75.00</dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">
                Pool and ice rental hours are limited. To enquire, contact the Athletics Facility
                Booking Office at gryphon.facility@uoguelph.ca or 519-824-4120 ext. 53790,
                Monday–Friday 8:30am–4:30pm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
