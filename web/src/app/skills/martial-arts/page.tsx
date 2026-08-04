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

export const metadata = { title: "Martial Arts Programs" };

const programs = [
  {
    name: "Brazilian Jiu-Jitsu",
    sessionId: "#38984",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue / Thu 10:30AM–12:00PM",
    fee: "$175.00",
    format: "2×/week · 10 weeks",
    desc: "Brazilian Jiu-Jitsu is a martial art focusing on grappling techniques, including throws, wrestling takedowns, joint locks, choke holds, and other self-defense techniques. This discipline emphasizes technique and leverage over strength making it an effective means of self-defense for smaller individuals fending off larger aggressors. Classes consist of a warm-up, technical lessons, and sparring, in roughly equal amounts. No previous martial arts or athletic experience is required; beginners are welcome!",
    gear: "No equipment required for beginners.",
  },
  {
    name: "Karate",
    sessionId: "#38985 (Fall) · #38388 (Spring)",
    dates: "Sept 21 – Nov 30, 2026 · May 13 – Jul 29, 2026",
    time: "Mon / Wed 8:00–9:30PM",
    fee: "$100.00 Fall · $90.00 Spring",
    format: "2×/week · 20 classes",
    desc: "Karate originated in Japan and is an unarmed martial-arts discipline employing kicking, striking and defensive blocking with arms and legs. This class will focus on the traditional karate styles under the supervision of experienced Goju-Ryu and Shotokan instructors. It is a great place to improve yourself and meet amazing friends.",
    gear: "Traditional gi encouraged but not required to start.",
  },
  {
    name: "Muay Thai",
    sessionId: "#38986",
    dates: "Sept 21 – Nov 30, 2026",
    time: "Mon / Wed 6:30–8:00PM",
    fee: "$150.00",
    format: "2×/week · 10 weeks",
    desc: "Thailand’s national sport of Muay Thai is a full contact ring sport in which competitors use fists, feet, elbows and knees to strike their opponents. Training is conducted in a safe and inclusive manner, providing challenges for those at all levels ranging from beginner to intermediate to advanced levels.",
    gear: "Participants should be in good physical condition and must have their own hand wraps and mouth guard.",
  },
  {
    name: "Tae Kwon Do",
    sessionId: "#38988",
    dates: "Sept 22 – Dec 1, 2026",
    time: "Tue / Thu 5:30–7:00PM",
    fee: "$110.00",
    format: "2×/week · 10 weeks",
    desc: "Tae Kwon Do (also known as Taekwondo) is the art of self defense that originated in Korea. It is recognized as one of the oldest forms of martial arts in the world, reaching back over 2,000 years. The name was selected for its appropriate description of the art: Tae (foot), Kwon (hand), Do (art).",
    gear: "Bare feet; athletic clothing suitable for kicking drills.",
  },
  {
    name: "Self-Defence Class",
    sessionId: "#38987",
    dates: "Oct 3, 2026",
    time: "Sat 10:00AM–12:00PM",
    fee: "$30.00",
    format: "Single 2-hour session",
    desc: "Gain knowledge of how to stay safe with emphasis on the practice of useful skills through which greater confidence is also acquired. The basic philosophy of this program is to evade and escape, strike with arms and hands, pinch, head butt, kick to lower legs, as well as fight from the ground and safely fall and roll.",
    gear: "No experience or equipment required.",
  },
];

export default function MartialArtsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Martial Arts Programs"
        subtitle="Whether you’re new to martial arts and looking to learn a new skill or continue your training here at the University of Guelph, our talented instructors will demonstrate the skills for each in a safe and inclusive manner."
        imageSrc="/images/facilities/wf-mitchell-1.jpg"
        imageAlt="Mitchell Athletics Centre gymnasium used for martial arts instruction"
        crumbs={[{ label: "Skill Development" }, { label: "Martial Arts" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Fall 2026"
          title="Five disciplines, one registration window"
          subtitle="Fall Registration opens on Monday, August 31st at 6:30am. A Recreation Membership is not a pre-requisite to enroll — registration fees apply and spaces are limited."
        />
        <div className="mt-8">
          <Callout title="Registration opens August 31 at 6:30am">
            Martial arts blocks fill quickly because class sizes are capped for safe partner work.
            Have your CONNECT login ready before the window opens, and note the session ID for the
            program you want.
          </Callout>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Program listings"
            title="Fall 2026 martial arts roster"
            subtitle="All programs run in the GGAC and Mitchell Athletics Centre studio spaces under experienced instructors."
          />
          <div className="mt-10 space-y-6">
            {programs.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-gryphon-red hover:shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                      {p.format}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gryphon-red">{p.fee}</div>
                    <div className="text-xs text-slate-500">Session {p.sessionId}</div>
                  </div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">{p.desc}</p>
                <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-5 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="font-semibold text-slate-900">Dates</dt>
                    <dd className="mt-1 text-slate-600">{p.dates}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Day / Time</dt>
                    <dd className="mt-1 text-slate-600">{p.time}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">What to bring</dt>
                    <dd className="mt-1 text-slate-600">{p.gear}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <SectionHeader eyebrow="Fees" title="Martial arts pricing" />
            <div className="mt-6">
              <PriceTable
                columns={["Program", "Fee", "Format"]}
                rows={[
                  ["Brazilian Jiu-Jitsu", "$175.00", "2×/week, 10 weeks"],
                  ["Karate", "$90.00 – $100.00", "2×/week, 11-week block"],
                  ["Muay Thai", "$150.00", "2×/week, 10 weeks"],
                  ["Tae Kwon Do", "$110.00", "2×/week, 10 weeks"],
                  ["Self-Defence Class", "$30.00", "Single 2-hour session"],
                ]}
                caption="HST is added at checkout. Program details are subject to change prior to registration opening."
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/membership/register">Register on CONNECT</CTAButton>
              <CTAButton href="/about/policies" variant="ghost">
                Withdrawal Policies
              </CTAButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/wf-mitchell-2.jpg"
              alt="Mitchell Athletics Centre interior"
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
            eyebrow="Keep going"
            title="Related skill development"
            subtitle="Martial arts sits alongside dance, aquatics, and climbing in the Skill Development stream."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoCard
              eyebrow="Skill Development"
              title="Dance Programs"
              description="Sixteen weekly classes across ballet, contemporary, hip hop, jazz, Latin, tap, and line dancing, from $58 per semester."
              href="/skills/dance"
            />
            <InfoCard
              eyebrow="Skill Development"
              title="Aquatic Programs"
              description="Adult semi-private and women’s-only swim lessons, plus Learn to Scuba in the Gold and Red Pools."
              href="/skills/aquatics"
            />
            <InfoCard
              eyebrow="Sports & Clubs"
              title="Indoor Climbing Wall"
              description="Bouldering, top rope, and auto belay with free equipment. Day passes from $15 +HST."
              href="/sports/climbing"
            />
          </div>
          <div className="mt-8">
            <Callout variant="note" title="Sparring and contact rules">
              Contact and sparring are only permitted inside supervised instructional programs. Facility
              guidelines prohibit sparring or contact during Drop-in Rec times, and no personal
              coaching or organized practices are allowed in drop-in spaces.
            </Callout>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
