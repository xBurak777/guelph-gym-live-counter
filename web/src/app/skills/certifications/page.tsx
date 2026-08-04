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

export const metadata = { title: "Instructor Certifications" };

const courses = [
  {
    name: "Strength Training Fundamentals Certification",
    hours: "16 hours · 2-day course",
    dates: "Sept 12–13, 2026 · Jan 16–17, 2027",
    schedule: "Sat/Sun 9:00AM–5:00PM",
    fee: "$241.00",
    desc: "This 16-hour course will focus on developing practical teaching skills for exercise instruction. This course is required to work in our Fitness Centre and is a highly recommended prerequisite for our personal training course.",
  },
  {
    name: "Cycle Instructor Certification",
    hours: "1-day course",
    dates: "Oct 4, 2026 · Jan 31, 2027",
    schedule: "Sun 9:00AM–5:00PM",
    fee: "$172.00",
    desc: "The University of Guelph has developed its own Group Cycle Certification course. The principles of conditioning will be applied by incorporating details around set-up, class format, applied anatomy and kinesiology. Learn the do’s and don’ts, precautions of cycling and the basics to coaching participants through this type of workout. Certification includes a written exam and a practical assessment to be booked for a later date.",
  },
  {
    name: "Fitness Instructor Certification",
    hours: "30 hours · 3 days over 2 weekends",
    dates: "Oct 17–24, 2026 · Feb 6–27, 2027",
    schedule: "Sat/Sun 8:30AM–6:00PM",
    fee: "$315.00",
    desc: "Become a group fitness instructor. Help people achieve their goals in a fun and motivating group setting with music. This 30-hour course, affiliated with the canfitpro national certification program, is split into both theory and in-class practical training. Attendance is mandatory for all dates.",
  },
  {
    name: "Personal Trainer Certification",
    hours: "36 hours · 4 days over 2 weekends",
    dates: "Nov 14–22, 2026 · Mar 6–21, 2027",
    schedule: "Sat/Sun 8:30AM–5:30PM",
    fee: "$474.00",
    desc: "This applied comprehensive 36-hour course is designed to give you the knowledge, skills and confidence to work with clients in a one-on-one or small group setting. Affiliated with the canfitpro national certification program. Course content includes physiology, anatomy, applied kinesiology, energy metabolism, principles of conditioning, postural assessment and correction, health screening, goal setting and programming.",
  },
];

export default function CertificationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Skill Development"
        title="Instructor Certifications"
        subtitle="Fall and Winter Registration opens on Saturday, August 1st at 6:30am. Four canfitpro-affiliated certification streams plus mentorship programs, taught in-house at the Guelph Gryphons Athletics Centre."
        imageSrc="/images/facilities/fitness-centre-alt.jpg"
        imageAlt="Certification candidates on the GGAC Fitness Centre floor"
        crumbs={[{ label: "Skill Development" }, { label: "Certifications" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="Why certify at Guelph"
          title="Train here, get hired here"
          subtitle="Our certification stream is the same pipeline that staffs the GGAC Fitness Centre and the NRG class schedule. A Recreation Membership is not a pre-requisite to enroll in certification courses."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "4", label: "Certification courses", sub: "Plus 3 mentorships" },
              { value: "canfitpro", label: "National affiliation", sub: "Fitness Instructor & PT" },
              { value: "36 hrs", label: "Personal Trainer course", sub: "4 days, 2 weekends" },
              { value: "33+ yrs", label: "Lead educator experience", sub: "Lynne Skilton-Hayes" },
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Course catalogue"
            title="2026–27 certification courses"
            subtitle="Each course runs twice per academic year — once in the Fall and once in the Winter. Attendance at all scheduled dates is mandatory."
          />
          <div className="mt-10 space-y-6">
            {courses.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all hover:border-gryphon-red hover:shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gryphon-red">
                      {c.hours}
                    </div>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      {c.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gryphon-red">{c.fee}</div>
                    <div className="text-xs text-slate-500">+ HST at checkout</div>
                  </div>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <dl className="mt-6 grid gap-4 border-t border-slate-100 pt-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-900">Course dates</dt>
                    <dd className="mt-1 text-slate-600">{c.dates}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Schedule</dt>
                    <dd className="mt-1 text-slate-600">{c.schedule}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Mentorship"
          title="Practical hours with a supervisor"
          subtitle="Approval is required to join these programs. Contact Lynne Skilton-Hayes, Fitness Program Supervisor, at 519-824-4120 ext. 52670 for approval before registering."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard
            eyebrow="6 × 1-hour sessions"
            title="Fitness Instructor Mentorship"
            description="Six weekly one-hour sessions shadowing and co-teaching on the NRG Schedule. Member $60 / Non-Member $100."
          />
          <InfoCard
            eyebrow="20 hours · valid 4 months"
            title="Personal Trainer Mentorship"
            description="Twenty supervised hours on the Fitness Centre floor working with real clients. Member $60 / Non-Member $100."
          />
          <InfoCard
            eyebrow="Valid 4 months"
            title="Cycle Instructor Mentorship"
            description="Practical coaching hours in the Studio 3216 cycle studio ahead of your practical assessment. Member $55 / Non-Member $85."
          />
        </div>
        <div className="mt-8">
          <PriceTable
            columns={["Certification", "Dates (2026–27)", "Schedule", "Fee"]}
            rows={[
              ["Strength Training Fundamentals", "Sept 12–13, 2026 / Jan 16–17, 2027", "Sat/Sun 9:00AM–5:00PM", "$241.00"],
              ["Cycle Instructor Certification", "Oct 4, 2026 / Jan 31, 2027", "Sun 9:00AM–5:00PM", "$172.00"],
              ["Fitness Instructor Certification", "Oct 17–24, 2026 / Feb 6–27, 2027", "Sat/Sun 8:30AM–6:00PM (2 weekends)", "$315.00"],
              ["Personal Trainer Certification", "Nov 14–22, 2026 / Mar 6–21, 2027", "Sat/Sun 8:30AM–5:30PM (2 weekends)", "$474.00"],
              ["Fitness Instructor Mentorship", "By arrangement", "6 × 1-hr weekly sessions", "Member $60 / Non-Member $100"],
              ["Personal Trainer Mentorship", "By arrangement", "20 hrs, valid 4 months", "Member $60 / Non-Member $100"],
              ["Cycle Instructor Mentorship", "By arrangement", "Valid 4 months", "Member $55 / Non-Member $85"],
            ]}
            caption="Certification withdrawals require 7 business days’ notice. HST is added at checkout."
          />
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
                Recommended pathway
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight leading-tight">
                From member to Fitness Centre staff
              </h2>
              <ol className="mt-8 space-y-5 text-sm leading-relaxed text-slate-300">
                <li className="border-l-2 border-gryphon-gold pl-5">
                  <span className="block font-bold text-white">1. Strength Training Fundamentals</span>
                  Required to work in our Fitness Centre and the recommended prerequisite for the
                  Personal Trainer course. Two days, $241.00.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  <span className="block font-bold text-white">2. Choose your stream</span>
                  Group fitness candidates take the Fitness Instructor Certification ($315.00);
                  one-on-one coaching candidates take the Personal Trainer Certification ($474.00).
                  Cycle instructors add the Group Cycle course ($172.00).
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  <span className="block font-bold text-white">3. Complete a mentorship</span>
                  Log supervised hours on the floor or on the schedule. Approval required from Lynne
                  Skilton-Hayes, ext. 52670.
                </li>
                <li className="border-l-2 border-white/20 pl-5">
                  <span className="block font-bold text-white">4. Apply</span>
                  Details on all available student jobs within Athletics are posted through Experience
                  Guelph. Our current trainer roster is largely made up of graduates of this pathway.
                </li>
              </ol>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/fitness/personal-training">Meet Our Certified Trainers</CTAButton>
                <CTAButton
                  href="/contact"
                  variant="ghost"
                  className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold"
                >
                  Contact Fit & Rec
                </CTAButton>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15">
              <Image
                src="/images/facilities/fitness-centre-hires.jpg"
                alt="Fitness Centre training floor at the GGAC"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Callout variant="warning" title="Approval and lifesaving prerequisites">
          Mentorship programs are approval-gated — call Lynne Skilton-Hayes at 519-824-4120 ext. 52670
          before registering. Aquatic leadership awards (Bronze Star, National Lifeguard, Standard
          First Aid with CPR-C and AED) are delivered through our Lifesaving Society aquatic stream —
          see the Aquatics page for current session listings.
        </Callout>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton href="/skills/aquatics">Aquatic Certifications</CTAButton>
          <CTAButton href="/membership/register" variant="ghost">
            How to Register
          </CTAButton>
        </div>
      </Section>
    </PageShell>
  );
}
