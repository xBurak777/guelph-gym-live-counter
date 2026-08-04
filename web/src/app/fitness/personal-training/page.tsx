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

export const metadata = { title: "Personal Training" };

const trainers = [
  {
    name: "Alina Tschirhart",
    certs: "Personal Trainer Certification",
    muscle: "Quadriceps",
    exercise: "Leg Press",
    offGym: "Cooking, hiking, or studying",
    fact: "I was a competitive dancer for 10 years.",
    quote: "Act like the person you want to become.",
    accepting: false,
  },
  {
    name: "Emily Jongert",
    certs: "U of G Personal Trainer, Standard First Aid, CPR/AED Level C",
    muscle: "Latissimus dorsi",
    exercise: "Dumbbell lateral squat",
    offGym: "In nature!",
    fact: "I have a black belt in karate.",
    quote:
      "Enjoy the little things in life, for one day you may look back and realize that they were the big things. — Robert Breault",
    accepting: true,
  },
  {
    name: "Frank Boon",
    certs:
      "CanFitPro Personal Training Specialist, U of G Personal Training Certification, Weight Training Supervisor, Emergency First Aid & CPR/AED, Eating Clean Foundations",
    muscle: "Gastrocnemius",
    exercise: "Calf raise",
    offGym: "Managing projects and planning his next dive",
    fact:
      "I have paragliding and scuba diving international licenses and I am a project management professional.",
    quote:
      "If your body matters, build it, maintain it, own it — delay is a polite name for death.",
    accepting: false,
  },
  {
    name: "Garrett Watkins",
    certs: "CanFitPro PTS, U of G Weight Training Supervisor, Emergency First Aid and CPR",
    muscle: "Deltoid",
    exercise: "Landmine Press",
    offGym: "Making/Mixing Music",
    fact: "I used to play Division 1 Ontario Basketball.",
    quote: "",
    accepting: true,
  },
  {
    name: "Indigo Walker",
    certs:
      "CanFitPro Personal Training Specialist, U of G Personal Trainer Certification, NLS, Standard First Aid w/ CPR-C & AED",
    muscle: "Quadriceps (and hamstrings)",
    exercise: "One Leg Dumbbell Romanian Deadlift with Rotation",
    offGym: "Working towards an Honours B.Sc. in Nutritional and Nutraceutical Sciences",
    fact:
      "Ten years of experience in competitive artistic swimming, competed with University of Guelph. Nonbinary, they/them.",
    quote: "",
    accepting: true,
  },
  {
    name: "Kathryn Chapman",
    certs: "UofG Personal Trainer, Standard First Aid, CPR/AED Level C",
    muscle: "Hamstrings",
    exercise: "Clean & jerks",
    offGym: "On the platform training the Olympic lifts",
    fact:
      "I am a competitive Olympic weightlifter hoping to compete in the 2025 national championships.",
    quote:
      "You don’t rise to the competition, you fall to the level of your preparation.",
    accepting: true,
  },
  {
    name: "Connor Wideman",
    certs: "Personal Training Certification",
    muscle: "Biceps brachii",
    exercise: "Z press",
    offGym: "At varsity rowing practice",
    fact: "I wake up at 4am almost every day.",
    quote: "It’s not over until you win. — Les Brown",
    accepting: true,
  },
];

export default function PersonalTrainingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness & Wellness"
        title="Personal Training"
        subtitle="Our nationally recognized personal trainers can help you achieve all of your goals. Every package begins with a consultation covering health history, lifestyle, goal-setting, postural assessment, and the Functional Movement Screen."
        imageSrc="/images/facilities/fitness-centre-hires.jpg"
        imageAlt="Trainer coaching a client on the GGAC Fitness Centre floor"
        crumbs={[
          { label: "Fitness & Wellness", href: "/fitness/wellness" },
          { label: "Personal Training" },
        ]}
      />

      <Section>
        <SectionHeader
          eyebrow="How it works"
          title="One-on-one coaching, built around your assessment"
          subtitle="Not seeing the results you desire? Our packages of personal training begin with a consultation in order to acquire the information we need to tailor a program specifically for you. From there, our personal trainers will guide you through a program to ensure you get the most out of your session."
        />
        <div className="mt-8">
          <StatGrid
            items={[
              { value: "7", label: "Certified personal trainers", sub: "Plus 1 Master Trainer" },
              { value: "48 hrs", label: "Trainer contacts you", sub: "Monday–Friday inclusive" },
              { value: "FMS", label: "Movement screen included", sub: "Every consultation" },
              { value: "Free", label: "Fitness Centre Orientation", sub: "1-hour, ext. 52105" },
            ]}
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Meet the team"
            title="Your trainers"
            subtitle="Certifications, favourite lifts, and the things you would never guess. Trainers marked “accepting new clients” have current availability this semester."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trainers.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-gryphon-red hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">{t.name}</h3>
                  {t.accepting && (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                      Accepting
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Certifications
                </p>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{t.certs}</p>
                <dl className="mt-4 space-y-1.5 text-sm text-slate-600">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-slate-900">Favourite muscle:</dt>
                    <dd>{t.muscle}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-slate-900">Favourite exercise:</dt>
                    <dd>{t.exercise}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-slate-900">Off the gym floor:</dt>
                    <dd>{t.offGym}</dd>
                  </div>
                </dl>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm italic text-slate-600 leading-relaxed">
                  “{t.fact}”
                </p>
                {t.quote && (
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">“{t.quote}”</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <SectionHeader
              eyebrow="Master Trainer"
              title="Lynne Skilton-Hayes"
              subtitle="Fitness Program Supervisor and Master Trainer. If you want to push your limits and achieve dramatic results, then our Master Trainer is the way to go — sessions include a consultation, postural assessment, FMS, and gait analysis."
            />
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Lynne holds a B.Sc. from the University of Guelph and brings 33+ years of experience
                in the fitness industry. She is an International Fitness Presenter and Educator, a
                Matrix Master Trainer, a GSTC TRX Trainer, a canfitpro ProTrainer, and a Tonic
                Ambassador. She was nominated for the Women of Distinction Award in 2016 and 2017.
              </p>
              <p>
                Favourite muscle: Glute Medius. In her own words: “Something you might not know
                about me is that I am a Grand Mal epileptic that found my way back to health and
                fitness through my experiences at U of G as a student.”
              </p>
              <p>
                Lynne also oversees the Fitness Certification stream. Approval is required to join
                the mentorship programs — contact her at{" "}
                <a href="tel:+15198244120" className="text-gryphon-red hover:underline">
                  519-824-4120
                </a>{" "}
                ext. 52670.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <CTAButton href="/membership/pt-packages">See PT Package Pricing</CTAButton>
              <CTAButton href="/skills/certifications" variant="ghost">
                Fitness Certifications
              </CTAButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/heroes/pilates-pt.png"
              alt="Group personal training session in the GGAC"
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
            eyebrow="Assessment & consultation"
            title="What your first session covers"
            subtitle="Every personal training package opens with a consultation so your trainer can build a program around your body, your history, and your goals."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              eyebrow="Step 1"
              title="Health history screen"
              description="A full intake of medical history, injuries, and any accommodations your trainer needs to program around."
            />
            <InfoCard
              eyebrow="Step 2"
              title="Lifestyle & goal setting"
              description="Lifestyle questions and goal-setting so the program matches your schedule, training age, and target outcome."
            />
            <InfoCard
              eyebrow="Step 3"
              title="Postural assessment"
              description="A standing and loaded postural assessment to identify asymmetries before adding training volume."
            />
            <InfoCard
              eyebrow="Step 4"
              title="Functional Movement Screen"
              description="The FMS scores seven fundamental movement patterns. Master Trainer sessions add a full gait analysis."
            />
          </div>
          <div className="mt-8">
            <Callout title="Free Fitness Centre Orientation">
              Before you book training, take the free 1-hour orientation covering all of the
              equipment in the GGAC Fitness Centre. Members aged 13–18 can book the Youth Fitness
              Centre Orientation instead. Book by calling 519-824-4120 ext. 52105.
            </Callout>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Group training"
          title="Train with a buddy — NRG members only"
          subtitle="Workout with a buddy under the guidance of one of our personal trainers. This is a great way to stay motivated and save money at the same time. 2-person and 3-person Group Training options are available to NRG members only, and each individual must register independently and pay the applicable fee (fees listed are per person)."
        />
        <div className="mt-8">
          <PriceTable
            columns={["Group Package", "1 Session", "5 Sessions", "10 Sessions"]}
            rows={[
              ["2-Person PT — Student", "$31 +HST", "$149 +HST", "$288 +HST"],
              ["2-Person PT — Member", "$41 +HST", "$186 +HST", "$350 +HST"],
              ["3-Person PT — Student", "$24 +HST", "$106 +HST", "$206 +HST"],
              ["3-Person PT — Member", "$35 +HST", "$163 +HST", "$292 +HST"],
            ]}
            caption="All fees are per person. Full 1:1 Personal Trainer and Master Trainer package rates are listed on the Personal Training Packages page."
          />
        </div>
        <div className="mt-6">
          <CTAButton href="/membership/pt-packages">View all package pricing</CTAButton>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
            Training policies
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
            Before your first session
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-sm leading-relaxed text-slate-300">
            <div>
              <h3 className="text-base font-bold text-white">Session protocol</h3>
              <p className="mt-3">
                A trainer will contact you within 48 hours (Monday–Friday inclusive) and will book
                your first session at that time. All clients meet their trainer in the Fitness
                Centre.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Late policy</h3>
              <p className="mt-3">
                Clients are responsible for arriving on time. Trainers are obligated to wait only 15
                minutes (10 minutes for 30-minute sessions). After that the session is either
                forfeited or the trainer may complete the time left — recorded as a full session.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cancellation policy</h3>
              <p className="mt-3">
                Contact your trainer 24 hours in advance to avoid forfeiting a session. Less than 24
                hours&rsquo; notice, or failure to contact your trainer, results in a forfeited
                session. Emergencies are at the trainer&rsquo;s discretion.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Expiry & refunds</h3>
              <p className="mt-3">
                Expiries are calculated from purchase date: 3-session packages expire in 1 month,
                6- and 11-session packages in 6 months, 26-session packages in 1 year. Packages are
                non-refundable and non-transferable after the 10-day cooling-off period.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTAButton href="/membership/pt-packages">Book Personal Training</CTAButton>
            <CTAButton href="/about/policies" variant="ghost" className="!border-white/30 !text-white hover:!border-gryphon-gold hover:!text-gryphon-gold">
              Full Policies
            </CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
