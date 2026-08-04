import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { Section, SectionHeader, Callout } from "@/components/ui";

export const metadata = { title: "Contact Us" };

const extensions = [
  { area: "Client Services (Membership & General)", ext: "56253", email: "fitandrec@uoguelph.ca" },
  { area: "Intramural General Inquiries", ext: "56137", email: "iplayim@uoguelph.ca" },
  { area: "Kids, Camps & Youth Programs", ext: "56131", email: "kidscamps@uoguelph.ca" },
  { area: "Fitness Centre Supervisor", ext: "52105", email: null },
  { area: "Field House", ext: "52045", email: null },
  { area: "Facility Rentals", ext: "53790", email: "facilityrental@uoguelph.ca" },
  { area: "Fitness Programming (Lynne Skilton-Hayes)", ext: "52670", email: "lskilton@uoguelph.ca" },
  { area: "Climbing Wall (Kevin Lindner)", ext: "53738", email: "lindner@uoguelph.ca" },
];

const staff = [
  {
    name: "Andrew Godard",
    role: "Facility Supervisor",
    email: "agodard@uoguelph.ca",
  },
  {
    name: "Lynne Skilton-Hayes",
    role: "Fitness Programming Supervisor & Master Trainer",
    email: "lskilton@uoguelph.ca",
  },
  {
    name: "Adam Bailey",
    role: "Intramural & Sport Clubs Supervisor",
    email: "abaile06@uoguelph.ca",
  },
  {
    name: "Kevin Lindner",
    role: "Climbing Wall Coordinator",
    email: "lindner@uoguelph.ca",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Info"
        title="Contact Us"
        subtitle="Reach the right person, the first time. Below are direct phone extensions, email addresses, and staff contacts for every program area."
        imageSrc="/images/facilities/wf-mitchell-1.jpg"
        imageAlt="Client Services desk"
        crumbs={[{ label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeader
              eyebrow="Main line"
              title="519-824-4120"
              subtitle="All extensions below use the same main number. Client Services answers general inquiries and can transfer you to any program area."
            />

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 md:px-6 py-4 text-left font-semibold text-slate-700">Program Area</th>
                    <th className="px-4 md:px-6 py-4 text-left font-semibold text-slate-700">Ext.</th>
                    <th className="px-4 md:px-6 py-4 text-left font-semibold text-slate-700 hidden md:table-cell">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {extensions.map((e) => (
                    <tr key={e.area} className="hover:bg-slate-50/70">
                      <td className="px-4 md:px-6 py-4 font-medium text-slate-900">{e.area}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-700 font-mono">{e.ext}</td>
                      <td className="px-4 md:px-6 py-4 text-slate-600 hidden md:table-cell">
                        {e.email ? (
                          <a href={`mailto:${e.email}`} className="hover:text-gryphon-red">
                            {e.email}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Visit us
              </div>
              <address className="mt-3 not-italic text-sm text-slate-700 leading-relaxed">
                <div className="font-semibold text-slate-900">W.F. Mitchell Athletics Centre</div>
                <div>50 East Ring Road</div>
                <div>Guelph, ON N1G 2W1</div>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="font-semibold text-slate-900">Gryphon Centre Arena</div>
                  <div>149 Reynolds Walk</div>
                  <div>Guelph, ON N1G 2W1</div>
                </div>
              </address>
            </div>
            <Callout title="Media & PR">
              For press inquiries, sponsorship, or partnership discussions, contact the Department
              of Athletics directly at <a className="underline" href="mailto:athletics@uoguelph.ca">athletics@uoguelph.ca</a>.
            </Callout>
          </aside>
        </div>
      </Section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Key contacts"
            title="Meet the leadership team"
            subtitle="Direct contacts for facility management, fitness, intramurals, and climbing."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {staff.map((s) => (
              <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="h-14 w-14 rounded-full bg-gryphon-red text-white font-black text-xl flex items-center justify-center">
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="mt-4 text-base font-bold text-slate-900">{s.name}</div>
                <div className="text-xs text-slate-500 mt-1">{s.role}</div>
                <a
                  href={`mailto:${s.email}`}
                  className="mt-3 inline-block text-xs font-semibold text-gryphon-red hover:underline break-all"
                >
                  {s.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
