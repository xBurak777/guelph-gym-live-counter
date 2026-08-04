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

export const metadata = { title: "Wellness Programs" };

export default function WellnessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Fitness & Wellness"
        title="Wellness Programs"
        subtitle="Pilates and Yoga, Group Personal Training, and the sensory-reduced NRG Zone. Programming designed for recovery, mobility, and confidence — not just performance."
        imageSrc="/images/heroes/pilates-pt.png"
        imageAlt="Pilates and group personal training in a GGAC studio"
        crumbs={[{ label: "Fitness & Wellness" }, { label: "Wellness Programs" }]}
      />

      <Section>
        <SectionHeader
          eyebrow="What we offer"
          title="Four ways into wellness at Fit & Rec"
          subtitle="Wellness at Guelph is delivered across four connected streams. All of them are covered by — or build on top of — an NRG Fitness Membership."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            eyebrow="Mind-body"
            title="Pilates & Yoga"
            description="Controlled movement, breath work, and mobility on the NRG Schedule — plus CIRCL Mobility™ fascial release."
            href="/fitness/group-classes"
          />
          <InfoCard
            eyebrow="Small group"
            title="Group Personal Training"
            description="2- and 3-person coaching with a certified trainer. NRG members only; each person registers independently."
            href="/membership/pt-packages"
          />
          <InfoCard
            eyebrow="Sensory-reduced"
            title="NRG Zone"
            description="Studio 3202: dim lights, no music, blinds drawn, 20-person cap. Women’s-only, staff/faculty/grad, and open blocks."
          />
          <InfoCard
            eyebrow="Professional"
            title="Fitness Certifications"
            description="canfitpro-affiliated Personal Trainer, Fitness Instructor, Cycle, and Strength Training Fundamentals courses."
            href="/skills/certifications"
          />
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/facilities/pilates-yoga.jpg"
                alt="Pilates and yoga class at the Guelph Gryphons Athletics Centre"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeader
                eyebrow="Pilates & Yoga"
                title="Move with control, breathe with intent"
              />
              <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
                <p>
                  <strong>Pilates:</strong> improve both posture and balance by learning to focus on
                  controlled movements in order to strengthen the core and create stabilization
                  around the joints.
                </p>
                <p>
                  <strong>Yoga:</strong> yoga aims to unite movement with breath to bring about a
                  peaceful, meditative mind while also toning the body.
                </p>
                <p>
                  <strong>CIRCL Mobility™:</strong> a yoga-style stretch class combined with foam
                  rolling fascial release techniques. Release tension and remove stuck stress to aid
                  in recovery and improve your mobility.
                </p>
                <p>
                  Mind-body classes run in Studio Rooms 3214 and 302. Mats and rollers are provided;
                  Studio 302 is an equipment-free shared space where you supply your own mat and, if
                  you want music, your own device and headphones.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTAButton href="/nrg">See Class Times</CTAButton>
                <CTAButton href="/fitness/group-classes" variant="ghost">
                  Full Class Catalogue
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Group Personal Training"
          title="Coaching, shared"
          subtitle="Workout with a buddy under the guidance of one of our personal trainers. This is a great way to stay motivated and save money at the same time. 2-person and 3-person options are available to NRG members only, and each individual must register independently and pay the applicable fee."
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
            caption="Fees listed are per person. Small Group Programs also run inside the NRG Zone with our certified personal trainers — additional fees apply and registration is required."
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <CTAButton href="/membership/pt-packages">All PT Packages</CTAButton>
          <CTAButton href="/fitness/personal-training" variant="ghost">
            Meet the Trainers
          </CTAButton>
        </div>
      </Section>

      <section className="bg-gryphon-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="text-xs font-bold uppercase tracking-widest text-gryphon-gold">
            NRG Zone — Studio 3202
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl font-black tracking-tight leading-tight">
            A small-scale, sensory-reduced studio
          </h2>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-slate-300">
            The NRG Zone is a small-scale fitness studio located in Studio 3202 on the 3rd floor of
            the GGAC. This space offers a range of equipment, including selectorized machines, a
            squat rack, a bench press, dumbbells, a step mill, a virtual bike, and much more. NRG
            Members can enjoy this space during scheduled drop-in times.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Zone features</h3>
              <ul className="mt-4 space-y-2 list-disc pl-5 text-sm leading-relaxed text-slate-300">
                <li>Friendly, knowledgeable fitness staff on hand</li>
                <li>Window blinds drawn for seclusion</li>
                <li>Dim lights and no music — sensory reduced</li>
                <li>Capped at a 20-person maximum capacity</li>
                <li>No registration required — first come, first served</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <h3 className="text-lg font-bold text-white">Drop-in blocks</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-white/15 text-left text-xs uppercase tracking-widest text-slate-400">
                      <th className="py-2 pr-4 font-semibold">Day</th>
                      <th className="py-2 pr-4 font-semibold">Women’s-Only</th>
                      <th className="py-2 pr-4 font-semibold">Staff / Faculty / Grad</th>
                      <th className="py-2 font-semibold">Open</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-white">Monday</td>
                      <td className="py-2.5 pr-4">5–7pm</td>
                      <td className="py-2.5 pr-4">12–1pm</td>
                      <td className="py-2.5">7–9pm</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-white">Tuesday</td>
                      <td className="py-2.5 pr-4">5–7pm</td>
                      <td className="py-2.5 pr-4">N/A</td>
                      <td className="py-2.5">7–9pm</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-white">Wednesday</td>
                      <td className="py-2.5 pr-4">N/A</td>
                      <td className="py-2.5 pr-4">12–1pm</td>
                      <td className="py-2.5">4–6pm</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-white">Friday</td>
                      <td className="py-2.5 pr-4">N/A</td>
                      <td className="py-2.5 pr-4">12–1pm</td>
                      <td className="py-2.5">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Blocks rotate by semester. Confirm the current grid at Client Services or the Fitness
                Centre Desk before you visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <SectionHeader
              eyebrow="Why identity-specific programming"
              title="Women’s-only and LGBTQ2IA+ blocks"
            />
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                The Department of Athletics and Recreation is committed to providing equitable,
                inclusive, safe, and welcoming access to our spaces for all members of our
                community. As part of this commitment, we offer women’s-only and LGBTQ2IA+
                programming to help create a supportive and identity-affirming environment for folks
                who have historically been underrepresented in sport and recreation.
              </p>
              <p>
                Our goal with identity-specific programs is to reduce barriers to participation in
                fitness and recreation and create spaces that foster a sense of comfort, safety,
                belonging, and confidence. These designated opportunities also support inclusion
                across diverse backgrounds, helping more individuals engage in physical activity and
                wellness in ways that meet their needs and accommodations.
              </p>
              <p>
                The Gryphon Way ensures that we break down barriers in recreation and sport so
                everyone in the Gryphon community has opportunities to learn, grow, and thrive in
                athletics.
              </p>
            </div>
            <div className="mt-7">
              <Callout variant="note" title="Accommodations">
                For accessibility needs or accommodation requests in any wellness program, contact
                the Athletics IEDI team at{" "}
                <a href="mailto:ath-iedi@uoguelph.ca" className="text-gryphon-red hover:underline">
                  ath-iedi@uoguelph.ca
                </a>
                .
              </Callout>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src="/images/facilities/studio-3216.jpg"
              alt="Studio Room 3216 with stationary bikes"
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
            eyebrow="Signature wellness programming"
            title="Beyond the weekly schedule"
            subtitle="Semester-long series, one-day intensives, and community wellness events run alongside the standing NRG Schedule."
          />
          <div className="mt-8">
            <StatGrid
              items={[
                { value: "20", label: "NRG Zone capacity", sub: "First come, first served" },
                { value: "1 hr", label: "Free orientation", sub: "Book at ext. 52105" },
                { value: "Free", label: "Reduced Noise Hour", sub: "No music, first hour daily" },
                { value: "4", label: "Certification streams", sub: "canfitpro affiliated" },
              ]}
            />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoCard
              eyebrow="Recovery"
              title="Reduced Noise Hours"
              description="There is no music playing in the Fitness Centre for the first hour of the day, every day — a quieter entry point for members who need it."
            />
            <InfoCard
              eyebrow="Intensive"
              title="Dance Intensive Open House"
              description="A full-day sampler across dance styles on Sunday, September 20, 2026, 9:00AM–6:00PM. Flat $15 fee whether you attend part of the day or all of it."
              href="/skills/dance"
            />
            <InfoCard
              eyebrow="Aquatic wellness"
              title="Aquafit & women’s-only swim"
              description="Low-impact water conditioning plus Women’s Only Small Group Swim Lessons ($120 per session block) in the Gold and Red Pools."
              href="/skills/aquatics"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/membership">Join Fit & Rec</CTAButton>
            <CTAButton href="/hours" variant="ghost">
              Facility Hours
            </CTAButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
