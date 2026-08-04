import Image from "next/image";
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

export const metadata = { title: "Drop-in Rec" };

const activities = [
  {
    name: "Rec Swimming",
    location: "Gryphon Aquatic Centre",
    note: "Gold Pool (25 m, 8 lanes) and Red Pool (25 yd, diving board). Length swim and recreational swim blocks.",
    href: "/skills/aquatics",
  },
  {
    name: "Walking / Jogging Track",
    location: "Guelph Gryphons Athletics Centre",
    note: "Elevated track on the 2nd floor of the GGAC. Direction of travel is posted and reverses on alternating days.",
  },
  {
    name: "Rec Basketball",
    location: "Event Centre Gym & Mitchell Gym",
    note: "Two courts in rotation. Half-court pick-up during peak blocks; bring your own ball if you want a specific size.",
  },
  {
    name: "Rec Squash",
    location: "West Gym Squash Courts",
    note: "Pre-booking mandatory — the only drop-in activity requiring a reservation. Book up to 7 days ahead, max 3 slots per week, 1 court per day.",
  },
  {
    name: "Rec Soccer",
    location: "Gryphons Soccer Complex",
    note: "Outdoor pick-up soccer on the turf complex. Clean, non-marking footwear or turf shoes required.",
  },
  {
    name: "Rec Hockey",
    location: "Gryphon Centre Arena",
    note: "Full equipment required. Check in with the Rink Attendant before taking the ice.",
  },
  {
    name: "Rec Skate",
    location: "Gryphons Centre Arena",
    note: "Public skate blocks. Skate rentals are available at Gryph’s Locker for $10 per rental, adult sizing only.",
  },
  {
    name: "Rec Badminton",
    location: "West Gym",
    note: "Nets set up by staff. Racquets and shuttles are available for loan to U of G students and Athletics members.",
  },
  {
    name: "Rec Volleyball",
    location: "West Gym",
    note: "Recreational pick-up. Rotate in fairly — staff will manage court assignments during busy blocks.",
  },
];

const guidelines = [
  "Swipe-in is required at the front entrance — card sharing is not permitted.",
  "Children 12 and under must always be accompanied by an adult.",
  "Children ages 5–12 must be accompanied by a parent or guardian (16+) within eyesight at all times.",
  "Children 7 and older use the gender-designated change rooms; universal / non-gender change rooms are available.",
  "Appropriate athletic clothing and clean, non-marking footwear are required.",
  "No personal coaching or organized practices during drop-in times.",
  "No soliciting business — private lessons, personal training, or sales are prohibited.",
  "No sparring or contact.",
  "No food or glass containers in the gyms.",
  "No bicycles indoors.",
  "Zero tolerance for abusive behaviour.",
  "All programming ends 30–60 minutes before closing, with equipment returned by then. Change rooms are inspected at closing.",
];

export default function DropInPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sports & Clubs"
        title="Drop-in Rec Weekly Calendar"
        subtitle="Drop-in Rec is included within the Recreation Membership or Day Pass during specified times. Nine activities across five facilities — no registration, just swipe in and play."
        imageSrc="/images/facilities/wf-mitchell-exterior.jpg"
        imageAlt="Exterior of the W.F. Mitchell Athletics Centre"
        crumbs={[{ label: "Sports & Clubs" }, { label: "Drop-in Rec" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="How it works"
          title="Included with your membership"
          subtitle="Drop-in Rec requires no registration and no fee beyond your Recreation Membership or Day Pass. The one exception is squash, where court pre-booking is mandatory."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "9", label: "Drop-in activities", sub: "Across 5 facilities" },
              { value: "Tuesday", label: "Schedule updated", sub: "Every week" },
              { value: "$10", label: "Skate rental", sub: "Gryph’s Locker, adult sizes" },
              { value: "Free", label: "Equipment loan", sub: "Students & members" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Callout variant="warning" title="Check the calendar before you travel">
            The Drop-in Rec weekly calendar is updated every Tuesday and varies with varsity
            competition, exam periods, and facility bookings. Confirm today’s blocks at Client
            Services, the Rink Attendant desk, or the Field House Information Desk before heading over.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Activity categories & locations"
            title="Where each activity runs"
            subtitle="Locations are fixed even though the weekly time blocks rotate."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <InfoCard
                key={a.name}
                eyebrow={a.location}
                title={a.name}
                description={a.note}
                href={a.href}
              />
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <SectionHeader eyebrow="Drop-in Rec protocols" title="Before you arrive" />
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700">
              <li className="border-l-2 border-gryphon-red pl-4">
                <span className="font-semibold text-slate-900">Stay home if you’re unwell.</span> If
                you are sick or do not feel well, please stay home.
              </li>
              <li className="border-l-2 border-slate-200 pl-4">
                <span className="font-semibold text-slate-900">Use the right entrance.</span> Enter via
                the Larry Pearson entrance, the Gryphon Centre Arena doors, or the Gryphon Field House
                main doors depending on your activity.
              </li>
              <li className="border-l-2 border-slate-200 pl-4">
                <span className="font-semibold text-slate-900">Check in on arrival.</span> Check in at
                Client Services, with the Rink Attendant, or at the Field House Information Desk.
              </li>
              <li className="border-l-2 border-slate-200 pl-4">
                <span className="font-semibold text-slate-900">Supervise young participants.</span>{" "}
                Children ages 5–12 must be accompanied by a parent or guardian (16+) within eyesight at
                all times.
              </li>
            </ul>

            <div className="mt-10">
              <SectionHeader eyebrow="Equipment rental" title="Gear you don’t have to bring" />
              <p className="mt-5 text-sm leading-relaxed text-slate-700">
                A selection of equipment is available for loan to U of G students and Athletics members
                during Recreation times — basketballs, volleyballs, badminton racquets, and shuttles.
                Skate rentals are available at Gryph’s Locker at $10 per rental in adult sizing only.
                Climbing equipment, including shoes and harnesses, is free at the Indoor Climbing Wall.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTAButton href="/membership/passes">Day Passes</CTAButton>
                <CTAButton href="/hours" variant="ghost">
                  Facility Hours
                </CTAButton>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/fitness-centre-hires.jpg"
              alt="Recreation activity inside the Guelph Gryphons Athletics Centre"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
            Facility guidelines
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Twelve rules that keep the spaces open to everyone
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {guidelines.map((g) => (
              <div key={g} className="flex gap-3 border-b border-white/10 pb-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gryphon-gold" />
                <p className="text-sm leading-relaxed text-slate-300">{g}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-gryphon-red/40 bg-gryphon-red/10 p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
              Enforcement
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Failure to follow these guidelines may result in removal from the facility and/or loss of
              access privileges — starting at a minimum of a 4-month suspension, and set longer
              depending on the severity of the incident.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/about/policies">Full Policies</CTAButton>
            <CTAButton
              href="/sports/intramurals"
              variant="ghost"
              className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
            >
              Prefer a League? Try Intramurals
            </CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
