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

export const metadata = { title: "Indoor Climbing Wall" };

const protocols = [
  "Enter via the Larry Pearson entrance and check in at Client Services.",
  "You must pass the belay test before top-roping with a belayer.",
  "Sanitize your hands before climbing and between climbs.",
  "Liquid chalk or chalk socks only — loose chalk is not permitted.",
  "Maintain one route of separation from other climbers at all times.",
];

export default function ClimbingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sports & Clubs"
        title="Indoor Climbing Wall"
        subtitle="Bouldering, top rope, and auto belay in the GGAC. All equipment is free — including climbing shoes and harnesses."
        imageSrc="/images/facilities/rock-climbing.jpg"
        imageAlt="Climber on the GGAC Indoor Climbing Wall"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Indoor Climbing Wall" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Welcome to the wall"
          title="Access during Fall & Winter semesters"
        />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Welcome to the GGAC Indoor Climbing Wall. During Fall and Winter semesters, U of G
              students and adults 18+ with a Recreation Membership get access to the Indoor Climbing
              Wall during posted hours by purchasing an NRG Plus Membership, a Rock Climbing Membership,
              Punch Passes, or a Climbing Day Pass.
            </p>
            <p>
              All equipment is free, including climbing shoes and harnesses. Kids can check out our
              Discover Rock Climbing program by visiting Kids Skill Development for details and to
              enroll.
            </p>
            <p>
              During the Summer 2026 semester, regular drop-in hours are closed and only Group Bookings
              operate.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CTAButton href="/membership">Get an NRG Membership</CTAButton>
              <CTAButton href="/hours" variant="ghost">
                Climbing Wall Hours
              </CTAButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/rock-climbing.jpg"
              alt="Bouldering wall at the Guelph Gryphons Athletics Centre"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-12">
          <StatGrid
            items={[
              { value: "Free", label: "Shoes & harnesses", sub: "Included with all access" },
              { value: "$15", label: "Climbing Day Pass", sub: "+HST per day" },
              { value: "1:6", label: "Group booking staff ratio", sub: "Trained Climbing Monitors" },
              { value: "2", label: "Certification levels", sub: "Level 1 red · Level 2 yellow" },
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Pricing"
            title="Four ways to buy access"
            subtitle="Pick the option that matches how often you climb. Passes never require a separate registration — just present at Client Services."
          />
          <div className="mt-8">
            <PriceTable
              columns={["Access Type", "Student", "Non-Student"]}
              rows={[
                [
                  "NRG Plus",
                  "$99 +HST / semester (upgrade from existing NRG)",
                  "$44 +HST one-time / semester (add-on to monthly NRG fee)",
                ],
                ["Climbing Membership", "$70 +HST / semester", "$70 +HST / semester"],
                [
                  "Punch Pass",
                  "$30 +HST / 5 climbs · $50 +HST / 10 climbs",
                  "$30 +HST / 5 climbs · $50 +HST / 10 climbs",
                ],
                ["Climbing Day Pass", "$15 +HST / day", "$15 +HST / day"],
              ]}
              caption="A Recreation Membership is required for adults 18+ before adding climbing access."
            />
          </div>
          <div className="mt-10">
            <PriceTable
              columns={["Group Booking Size", "Fee"]}
              rows={[
                ["Up to 12 climbers", "$158 +HST"],
                ["Up to 18 climbers", "$225 +HST"],
              ]}
              caption="Two-hour bookings including an Indoor Rock Climbing Orientation at a 1:6 staff ratio."
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <SectionHeader eyebrow="First-time climbers" title="Get certified on your first visit" />
            <p className="mt-5 text-slate-700 leading-relaxed">
              Upon your first visit to the climbing wall, you must participate in one of the following
              certifications. At the end of the certifications, you must complete our competency
              checklist.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-gryphon-red" />
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    Level 1 (red)
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Climbing wall orientation, bouldering, and an auto belay run-through.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-gryphon-gold" />
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    Level 2 (yellow)
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Top-rope belaying — knot tying and Gri Gri operation — in addition to all the Level 1
                  requirements.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Callout title="Returning climbers">
                If you climbed with us during the Fall 2024 and/or Winter 2025 semester, you are required
                to take the Returning Climber Competency Review upon your first visit.
              </Callout>
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Protocols & guidelines" title="Wall etiquette" />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700">
              {protocols.map((p) => (
                <li key={p} className="flex gap-3 border-b border-slate-200 pb-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gryphon-red" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                Group booking contact
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Kevin Lindner · 519-824-4120 ext. 53738 ·{" "}
                <a href="mailto:lindner@uoguelph.ca" className="text-gryphon-red hover:underline">
                  lindner@uoguelph.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Group bookings"
            title="Team spirit, 2 hours at a time"
            subtitle="Climbing Wall Group Bookings are open to everyone — you do not need to be a Climbing Wall Member or a U of G student, and previous climbing experience is not required."
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Looking to create some team spirit with your student group, team, or organization? We’ve
                got you covered with our 2-hour Group Booking options.
              </p>
              <p>
                Through our Indoor Rock Climbing Orientation, trained Climbing Monitors will provide an
                introduction to climbing with a 1:6 staff ratio, ensuring each person gets to experience
                bouldering, top rope climbing, and auto belays.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <CTAButton href="/contact">Book a Group Session</CTAButton>
                <CTAButton href="/kids/camps" variant="ghost">
                  Kids Climbing Programs
                </CTAButton>
              </div>
            </div>
            <blockquote className="rounded-2xl border-l-4 border-gryphon-red bg-white p-6 md:p-8">
              <p className="text-base leading-relaxed text-slate-700">
                “I just wanted to let you know that the experience was amazing!! The staff were so
                wonderful at engaging the boys when some seemed to lose attention. It was great that
                there were a variety of options and some of the boys who had climbed before said it was
                the best climbing wall they have been to.”
              </p>
              <footer className="mt-5 text-sm font-semibold text-slate-900">
                — Hockey Team Group Booking
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Related" title="More at Sports & Clubs" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard
            eyebrow="Sports & Clubs"
            title="Drop-in Rec"
            description="Nine activities included with your Recreation Membership — swimming, track, basketball, squash, soccer, hockey, skating, badminton, and volleyball."
            href="/sports/drop-in"
          />
          <InfoCard
            eyebrow="Sports & Clubs"
            title="Intramural Leagues"
            description="Fourteen sports across Competitive, Recreational, and Fun divisions. Team Bond $100 per semester."
            href="/sports/intramurals"
          />
          <InfoCard
            eyebrow="Membership"
            title="NRG Plus"
            description="$99 +HST per semester for students — the climbing wall bundled with the full NRG fitness class schedule."
            href="/membership"
          />
        </div>
      </Section>
    </PageShell>
  );
}
