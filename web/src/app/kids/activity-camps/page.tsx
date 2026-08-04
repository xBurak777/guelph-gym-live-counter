import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, InfoCard, Callout } from "@/components/ui";

export const metadata = { title: "Gryphon Activity Camps" };

const camps = [
  { name: "Junior Activity Camp", ages: "5–7", desc: "Small-group activity camp with a 1:6 staff-to-camper ratio. Arts & crafts, outdoor games, sports and theme days." },
  { name: "Intermediate Activity Camp", ages: "8–10", desc: "Mid-age camp with expanded sports rotation, campus-wide games and structured activity blocks." },
  { name: "Senior Activity Camp", ages: "11–14", desc: "Older campers with more autonomy — offsite excursions, adventure activities and leadership building." },
  { name: "Rock Climbing Camp", ages: "8–14", desc: "Introduction to bouldering and top-rope climbing at the UGAA Rock Wall Centre. All equipment provided." },
  { name: "Adventures Extravaganza", ages: "8–14", desc: "Multi-week adventure track — canoeing, orienteering, disc golf, wide games and outdoor cooking." },
  { name: "Robotics Camp", ages: "8–14", desc: "Hands-on Robotics camp using kits and challenges to teach mechanics, gearing and simple programming." },
  { name: "Stop Motion Animation", ages: "8–14", desc: "Learn stop-motion basics: storyboarding, set building, character rigging and editing to a final short film." },
  { name: "Voices on Air", ages: "10–14", desc: "Radio & podcasting camp — interview skills, on-air presence, script writing and audio editing." },
  { name: "Arboretum: Nature Art / Scientist", ages: "8–12", desc: "Nature-based art and applied science camps run in partnership with the University of Guelph Arboretum." },
  { name: "Become a Journalist", ages: "10–14", desc: "Camp reporters produce their own newsletter — interviewing, photography, layout and editorial." },
  { name: "Toonflix", ages: "8–14", desc: "Cartoon animation camp — character design, in-betweening, motion basics and final flipbook screenings." },
  { name: "Leadership Development / B.E.A.T. / G.R.O.W.T.H.", ages: "12–14", desc: "Three tiered leadership programs preparing older campers for the Counsellor-in-Training pipeline." },
  { name: "Counsellor in Training (CIT)", ages: "14–16", desc: "Intensive four-week CIT program with mentoring rotations across every camp track. Application required." },
  { name: "Home Alone Workshop", ages: "10–13", desc: "One-day workshop teaching kids how to stay home safely — kitchen safety, first-aid, emergency response." },
  { name: "Swim 2 Survive", ages: "5–12", desc: "Water-safety focused camp using the LSS Swim to Survive standard — swim, tread and safe entries." },
  { name: "Girls at Bat", ages: "6–10", desc: "$35/week per camper. Drop-off 8:00–8:45am, programming 8:45am–4pm, pick-up 4:00–4:30pm, extended day supervision 4:30–5:30pm." },
];

export default function ActivityCampsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Kids & Camps"
        title="Gryphon Activity Camps"
        subtitle="Gryphon Camps offers a variety of camps, which are categorized into Activity Camps or Sports Camps. Activity Camps offer general activity-level programming, in which campers are grouped based on age and appropriate skill level. Camp programs include arts and crafts, outdoor games and activities, sports, and special theme days. Programming will spend most of the day outdoors, with designated indoor spaces in case of inclement weather."
        imageSrc="/images/heroes/activity-camps.png"
        imageAlt="Gryphon Activity Camp participants"
        crumbs={[{ label: "Kids & Camps", href: "/kids" }, { label: "Activity Camps" }]}
      />

      <Section>
        <SectionHeader eyebrow="Over 30 camps" title="Choose your week" subtitle="Full Summer Camp 2026 Calendar available as PDF from Client Services — new-and-improved schedule for 2026." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {camps.map((c) => (
            <InfoCard key={c.name} eyebrow={`Ages ${c.ages}`} title={c.name} description={c.desc} />
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader eyebrow="Daily rhythm" title="A typical camp day" />
          <div className="mt-8">
            <Callout title="Drop-off, programming, pick-up, extended day">
              Drop-off 8:00am to 8:45am · Programming 8:45am to 4:00pm · Pick-up 4:00pm to 4:30pm · Post-camp Extended Day supervision 4:30pm to 5:30pm ($35/week per camper). A $30 non-refundable deposit per camper per week secures the spot under our payment plan.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
