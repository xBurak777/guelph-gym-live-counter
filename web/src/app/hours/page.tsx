import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, Callout, CTAButton } from "@/components/ui";

export const metadata = { title: "Hours of Operation" };

const facilities = [
  {
    name: "Fitness Centre",
    hours: [
      ["Mon – Thu", "6:30 AM – 11:00 PM"],
      ["Friday", "6:30 AM – 9:00 PM"],
      ["Saturday", "8:00 AM – 8:00 PM"],
      ["Sunday", "9:00 AM – 9:00 PM"],
    ],
    note: "Fitness Centre orientation appointments available on request.",
  },
  {
    name: "Gryphon Aquatic Centre (Pools)",
    hours: [
      ["Mon – Fri Lap Swim", "6:30 – 9:00 AM · 11:30 AM – 1:30 PM · 4:00 – 7:00 PM"],
      ["Mon – Fri Rec Swim", "5:00 – 7:30 PM"],
      ["Saturday", "10:00 AM – 4:00 PM (Lap + Rec)"],
      ["Sunday", "12:00 – 5:00 PM (Rec + Family)"],
    ],
    note: "Two pools — 25 m Gold Pool and 25 yd Red Pool. Rec Swim requires child/adult supervision ratios.",
  },
  {
    name: "Walking / Jogging Track",
    hours: [
      ["Mon – Fri", "6:30 AM – 11:00 PM"],
      ["Sat – Sun", "8:00 AM – 9:00 PM"],
    ],
    note: "Included with all memberships. 200 m track above the field house.",
  },
  {
    name: "Indoor Rock Climbing Wall",
    hours: [
      ["Mon – Thu", "5:00 – 10:00 PM"],
      ["Friday", "5:00 – 9:00 PM"],
      ["Saturday", "12:00 – 6:00 PM"],
      ["Sunday", "Closed"],
    ],
    note: "Summer: Group Bookings only. First-time climbers must complete an orientation.",
  },
  {
    name: "Client Services",
    hours: [
      ["Mon – Fri", "8:30 AM – 8:00 PM"],
      ["Saturday", "10:00 AM – 4:00 PM"],
      ["Sunday", "12:00 – 4:00 PM"],
    ],
    note: "Registration, membership renewals, program signups, equipment rentals.",
  },
];

export default function HoursPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Info"
        title="Hours of Operation"
        subtitle="Current operating hours for every facility at the W.F. Mitchell Athletics Centre. Hours vary by academic term, statutory holidays, and university closures."
        imageSrc="/images/facilities/wf-mitchell-exterior.jpg"
        imageAlt="Athletics Centre exterior"
        crumbs={[{ label: "Hours" }]}
      />

      <Section>
        <Callout title="Live occupancy on the homepage.">
          Even during our busiest hours, the Fitness Centre often has open racks and machines.
          Check the <strong>live gym counter on the homepage</strong> to see current occupancy
          before you head over.
        </Callout>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {facilities.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7"
            >
              <div className="text-lg font-bold text-slate-900">{f.name}</div>
              <table className="mt-4 w-full text-sm">
                <tbody className="divide-y divide-slate-100">
                  {f.hours.map(([day, time]) => (
                    <tr key={day}>
                      <td className="py-2.5 font-medium text-slate-700 pr-4">{day}</td>
                      <td className="py-2.5 text-slate-600 text-right">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-xs text-slate-500 leading-relaxed">{f.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Statutory holidays</div>
              <div className="mt-3 text-lg font-bold text-slate-900">Modified schedule</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                All facilities operate on modified holiday hours. Christmas Day, Boxing Day, and
                New Year&apos;s Day: Closed.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Reading week</div>
              <div className="mt-3 text-lg font-bold text-slate-900">Full hours</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Fitness Centre remains on full academic hours during Fall and Winter Reading
                Weeks. Some NRG classes may be cancelled — check the live NRG schedule.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Summer term</div>
              <div className="mt-3 text-lg font-bold text-slate-900">Reduced hours</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                May – August: Reduced weekend hours. Climbing Wall runs Group Bookings only. Full
                summer schedule posted May 1.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Something changed?"
            title="Confirm before you go"
            subtitle="Facility hours are updated as scheduling changes. For same-day updates, call Client Services or check the live counter for real-time gym data."
            className="mx-auto text-center"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton href="/contact">Contact Client Services</CTAButton>
            <CTAButton href="/" variant="ghost">Live Gym Counter</CTAButton>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
