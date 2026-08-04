import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import {
  Section,
  SectionHeader,
  InfoCard,
  Callout,
  CTAButton,
  StatGrid,
} from "@/components/ui";

export const metadata = { title: "Sports Clubs" };

const criteria = [
  "A minimum of 10 active members.",
  "A program-appropriate activity that fits the Sports Club model.",
  "Suitable on-campus facilities available for the activity.",
  "Financial self-reliance after a one-year probationary period.",
  "A minimal-risk activity profile.",
  "Adequate regional competition within a 600-mile radius, for competitive clubs.",
];

export default function ClubsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sports & Clubs"
        title="Sports Clubs"
        subtitle="Student-run, executive-led, and funded by the members themselves. Clubs are where Gryphons build leadership alongside their sport."
        imageSrc="/images/heroes/home-banner-1.jpg"
        imageAlt="Gryphon students participating in club sport activity"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Clubs" }]}
      />

      <Section>
        <SectionHeader eyebrow="The program" title="Sport, run by students" />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] items-start">
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              The University of Guelph Sports Club programs are student-run, led by a team of student
              executives, and funded through student-set membership rates, fundraising, and a small
              grant pool.
            </p>
            <p>
              Our clubs provide an opportunity to engage in sport at various skill levels, contribute to
              the development of student leadership, and bring like-minded students and community
              members together. Some clubs are organized primarily for competition, either
              inter-university or among other club members, while others are recreational.
            </p>
            <p>
              Select a club below for more information, or submit a new club request if the sport you
              want isn’t represented yet.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CTAButton href="/contact">Request a New Club</CTAButton>
              <CTAButton href="/sports/intramurals" variant="ghost">
                Compare with Intramurals
              </CTAButton>
            </div>
          </div>
          <div>
            <StatGrid
              items={[
                { value: "3", label: "Club levels", sub: "Competitive to recreational" },
                { value: "10", label: "Minimum active members", sub: "To apply for status" },
                { value: "1 yr", label: "Probationary period", sub: "Before self-reliance" },
                { value: "600 mi", label: "Competition radius", sub: "Competitive clubs" },
              ]}
            />
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Club program structure"
            title="Three levels of club status"
            subtitle="Levels determine whether a club competes externally, offers instruction, and charges a membership fee."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Level I
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                External competition
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Competes against external university groups and clubs. Charges a membership fee set by
                the student executive. Requires adequate regional competition within a 600-mile radius.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Level II
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                Instructional or internal
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                May or may not include instruction, and competition is typically among club members.
                Charges a membership fee.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Level III
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                Purely recreational
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Recreational participation only, with no fee required. The lowest-barrier entry point
                for a new club.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                How to apply for club status
              </h3>
              <ol className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700">
                <li className="border-l-2 border-gryphon-red pl-4">
                  <span className="block font-semibold text-slate-900">
                    1. Submit the Request for Status form
                  </span>
                  Complete the Club Sport Request for Status / Recognition Form.
                </li>
                <li className="border-l-2 border-slate-200 pl-4">
                  <span className="block font-semibold text-slate-900">2. Gather your petition</span>
                  Submit the Petition to Form a New Sport Club, signed by prospective members.
                </li>
                <li className="border-l-2 border-slate-200 pl-4">
                  <span className="block font-semibold text-slate-900">
                    3. Meet the Sports Club Coordinator
                  </span>
                  Book an appointment to review facilities, risk, and financial planning.
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Approval criteria</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
                {criteria.map((c) => (
                  <li key={c} className="flex gap-3 border-b border-slate-200 pb-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gryphon-red" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Active clubs"
          title="A sample of the club roster"
          subtitle="The full club list rotates each year as executives graduate and new clubs receive status. Email clubs@uoguelph.ca for the current roster and contact details."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            eyebrow="Dance · Performance"
            title="Hip Hop – Atcha Crew"
            description="A student-run hip hop performance crew rehearsing and competing throughout the Fall and Winter semesters."
          />
          <InfoCard
            eyebrow="Dance · Performance"
            title="Dance Pak"
            description="Guelph’s long-running student dance company. Reach the executive at dancepak@uoguelph.ca or follow @guelphdancepak on Instagram."
          />
          <InfoCard
            eyebrow="Running"
            title="Gryphons Run Club"
            description="Meets Mondays 6:30–7:30pm at the Edward Johnson Public School gymnasium. Contact gryphonsrunclub@uoguelph.ca to join a run."
          />
          <InfoCard
            eyebrow="Aquatics · Competitive"
            title="Artistic Swimming Club"
            description="Competes at the Canadian University Artistic Swimming League Eastern Divisional Championships, most recently hosted at the University of Toronto."
          />
        </div>
        <div className="mt-8">
          <Callout variant="note" title="Looking for a club that isn’t listed?">
            The live club selector on the Department site carries the complete roster, which is larger
            than the sample above. Email{" "}
            <a href="mailto:clubs@uoguelph.ca" className="text-gryphon-red hover:underline">
              clubs@uoguelph.ca
            </a>{" "}
            or call the Sports Clubs office at 519-824-4120 ext. 53763 for the current list.
          </Callout>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Which one is right for me?
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Clubs, intramurals, or drop-in?
              </h2>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-slate-300">
                <p className="border-l-2 border-gryphon-gold pl-5">
                  <span className="block font-bold text-white">Sports Clubs</span>
                  Season-long commitment, student-run, often travels to compete. You help run the
                  organization as well as play.
                </p>
                <p className="border-l-2 border-white/20 pl-5">
                  <span className="block font-bold text-white">Intramurals</span>
                  6–8 scheduled games per semester in a structured league. Team Bond $100 ($300 for Ice
                  Hockey), Free Agent $15 ($30 Ice Hockey).
                </p>
                <p className="border-l-2 border-white/20 pl-5">
                  <span className="block font-bold text-white">Drop-in Rec</span>
                  No commitment at all — included in your Recreation Membership or Day Pass, nine
                  activities on a weekly rotating calendar.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/sports/intramurals">Intramural Leagues</CTAButton>
                <CTAButton
                  href="/sports/drop-in"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  Drop-in Rec
                </CTAButton>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Sports Clubs contacts</h3>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-white">General inquiries</dt>
                  <dd className="mt-1 text-slate-300">
                    <a href="mailto:clubs@uoguelph.ca" className="text-gryphon-gold hover:underline">
                      clubs@uoguelph.ca
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">Clubs Supervisor</dt>
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
                  <dt className="font-semibold text-white">Sports Clubs office</dt>
                  <dd className="mt-1 text-slate-300">519-824-4120 ext. 53763</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
