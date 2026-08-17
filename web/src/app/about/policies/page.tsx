import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, Callout } from "@/components/ui";

export const metadata = { title: "Policies & Guidelines" };

const sections = [
  {
    title: "Facility Access",
    items: [
      "Swipe-in required at the front entrance for every visit.",
      "Membership cards are non-transferable — no card sharing.",
      "Photo ID is required at signup and may be requested at any visit.",
      "Children 12 and under must be accompanied by a parent/guardian (16+) within eyesight at all times.",
      "Children 7+ use gender-designated change rooms.",
      "Universal / non-gender change rooms are available.",
    ],
  },
  {
    title: "Attire & Conduct",
    items: [
      "Appropriate athletic clothing required.",
      "Clean, non-marking indoor athletic footwear required — no outdoor shoes on gym floors.",
      "No personal coaching or organized practices during drop-in recreation.",
      "No soliciting business (private lessons, PT, sales) inside the facility.",
      "No sparring, contact play, or full-contact martial arts during drop-in.",
      "Zero tolerance for abusive, harassing, or discriminatory behaviour.",
    ],
  },
  {
    title: "Food, Bikes & Equipment",
    items: [
      "No food or glass containers permitted in gymnasiums, pool decks, or the Fitness Centre floor.",
      "Water bottles (non-glass) are permitted throughout.",
      "No bicycles inside the facility — use exterior racks.",
      "Equipment provided must be returned to designated storage after use.",
      "Personal equipment (mats, foam rollers, gloves) is welcome — please wipe down shared equipment after each use.",
    ],
  },
  {
    title: "Program Timing & Closing",
    items: [
      "All programming ends 30–60 minutes before closing.",
      "Equipment must be returned before facility closing time.",
      "Change rooms are inspected at closing — please retrieve all personal items.",
      "Late arrivals to scheduled classes may be turned away at instructor's discretion.",
    ],
  },
  {
    title: "Suspension & Enforcement",
    items: [
      "Failure to follow these guidelines may result in removal from the facility and/or loss of access privileges.",
      "Minimum suspension for a first infraction is 4 months.",
      "Longer suspensions apply for repeated or severe incidents.",
      "Refusal to comply with staff direction is grounds for immediate removal.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Policies & Guidelines"
        subtitle="Our shared expectations for a safe, welcoming, and productive facility. These policies apply to all members, guests, program participants, and staff."
        imageSrc="/images/facilities/wf-mitchell-2.jpg"
        imageAlt="Athletics Centre interior"
        crumbs={[
          { label: "About", href: "/about" },
          { label: "Policies" },
        ]}
      />

      <Section>
        <Callout title="If you feel sick, please stay home.">
          For the health of every member, do not visit Fit & Rec facilities if you have flu-like
          symptoms, fever, or any illness that could spread through communal spaces. Rebook affected
          program dates via Client Services.
        </Callout>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <div key={s.title}>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-gryphon-red tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{s.title}</h2>
              </div>
              <ul className="mt-5 space-y-3 text-slate-700 max-w-3xl">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gryphon-red shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">EDI</div>
              <div className="mt-3 text-lg font-bold text-slate-900">Equity, Diversity, Inclusion</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Report accessibility or inclusion concerns to <a className="text-gryphon-red hover:underline" href="mailto:ath-iedi@uoguelph.ca">ath-iedi@uoguelph.ca</a>.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Concussion</div>
              <div className="mt-3 text-lg font-bold text-slate-900">Brain 101 resources</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Concussion education materials referenced across all Sport Clubs and Intramural
                programming: &quot;Brain 101&quot; and &quot;Concussions 101: A primer for kids and parents.&quot;
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gryphon-red">Emergency</div>
              <div className="mt-3 text-lg font-bold text-slate-900">On-campus</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                For emergencies inside a Fit & Rec facility, dial <strong>52000</strong> from any
                U of G phone or call Campus Community Police at <strong>519-840-5000</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
