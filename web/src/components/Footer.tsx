import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";

const footerNav = [
  {
    heading: "Fitness & Wellness",
    links: [
      { label: "Personal Training", href: "/fitness/personal-training" },
      { label: "Group Fitness Classes", href: "/fitness/group-classes" },
      { label: "NRG Schedule", href: "/nrg" },
      { label: "Wellness Programs", href: "/fitness/wellness" },
    ],
  },
  {
    heading: "Membership",
    links: [
      { label: "Plans & Pricing", href: "/membership" },
      { label: "How to Register", href: "/membership/register" },
      { label: "Day & Week Passes", href: "/membership/passes" },
      { label: "PT Packages", href: "/membership/pt-packages" },
    ],
  },
  {
    heading: "Sports & Skills",
    links: [
      { label: "Drop-in Recreation", href: "/sports/drop-in" },
      { label: "Intramurals", href: "/sports/intramurals" },
      { label: "Sport Clubs", href: "/sports/clubs" },
      { label: "Rock Climbing", href: "/sports/climbing" },
      { label: "Aquatics", href: "/skills/aquatics" },
      { label: "Dance", href: "/skills/dance" },
    ],
  },
  {
    heading: "About & Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Policies", href: "/about/policies" },
      { label: "Contact", href: "/contact" },
      { label: "Hours", href: "/hours" },
      { label: "Kids Swim", href: "/kids/swim" },
      { label: "Camps", href: "/kids/camps" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-gryphon-black text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/fitandrec-logo.png"
                alt="Guelph Gryphons"
                width={56}
                height={56}
                className="h-14 w-14 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <div className="text-lg font-black tracking-tight text-white">GRYPHON FIT & REC</div>
                <div className="text-xs font-bold tracking-widest text-gryphon-gold">
                  UNIVERSITY OF GUELPH
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              {brand.taglines.department}. Fitness, recreation, and community programs for students,
              staff, and Guelph residents at the W.F. Mitchell Athletics Centre.
            </p>

            <address className="mt-6 not-italic text-sm text-slate-400 leading-relaxed">
              <div className="font-semibold text-white">{brand.facilities.mitchell.name}</div>
              <div>{brand.facilities.mitchell.address}</div>
              <div className="mt-3">
                <a href={`tel:${brand.contact.phone}`} className="hover:text-white">
                  {brand.contact.phone}
                </a>
                <span className="mx-2 opacity-40">·</span>
                <a href={`mailto:${brand.contact.generalEmail}`} className="hover:text-white">
                  {brand.contact.generalEmail}
                </a>
              </div>
            </address>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-bold uppercase tracking-widest text-white">
                {col.heading}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} University of Guelph, Department of Athletics.</div>
          <div className="flex items-center gap-4">
            <span>Land Acknowledgement: Between the Rivers</span>
            <span aria-hidden>·</span>
            <span>Made with the Gryphons in mind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
