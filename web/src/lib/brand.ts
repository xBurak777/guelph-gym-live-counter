/**
 * Real University of Guelph Gryphons brand tokens
 * (captured from fitandrec.gryphons.ca during the content-harvest crawl)
 */
export const brand = {
  colors: {
    red: "#C20430",       // Gryphon red — primary
    gold: "#FFC72C",      // Gryphon gold — accent
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      500: "#64748B",
      700: "#334155",
      900: "#0F172A",
    },
  },
  taglines: {
    department: "Nurture · Recreate · Gear Up",
    membership: "Move together. Train hard. Live well.",
  },
  facilities: {
    mitchell: {
      name: "W.F. Mitchell Athletics Centre",
      address: "50 East Ring Road, Guelph, ON N1G 2W1",
    },
    gryphonCentre: {
      name: "Gryphon Centre Arena",
      address: "149 Reynolds Walk, Guelph, ON N1G 2W1",
    },
  },
  contact: {
    phone: "519-824-4120",
    generalEmail: "fitandrec@uoguelph.ca",
  },
  nav: [
    {
      label: "Fitness / Wellness",
      children: [
        { label: "Personal Training", href: "/fitness/personal-training" },
        { label: "Group Fitness Classes", href: "/fitness/group-classes" },
        { label: "NRG Schedule", href: "/nrg" },
        { label: "Wellness Programs", href: "/fitness/wellness" },
      ],
    },
    {
      label: "Skill Development",
      children: [
        { label: "Aquatics", href: "/skills/aquatics" },
        { label: "Dance", href: "/skills/dance" },
        { label: "Instructor Certifications", href: "/skills/certifications" },
      ],
    },
    {
      label: "Membership",
      children: [
        { label: "Plans & Pricing", href: "/membership" },
        { label: "How to Register", href: "/membership/register" },
        { label: "Day & Week Passes", href: "/membership/passes" },
        { label: "Personal Training Packages", href: "/membership/pt-packages" },
      ],
    },
    {
      label: "Sports & Clubs",
      children: [
        { label: "Drop-in Recreation", href: "/sports/drop-in" },
        { label: "Intramurals", href: "/sports/intramurals" },
        { label: "Sport Clubs", href: "/sports/clubs" },
        { label: "Rock Climbing", href: "/sports/climbing" },
      ],
    },
    {
      label: "Kids & Camps",
      children: [
        { label: "Swim Lessons", href: "/kids/swim" },
        { label: "Sport & Activity Camps", href: "/kids/camps" },
      ],
    },
    {
      label: "About",
      children: [
        { label: "About Us", href: "/about" },
        { label: "Valued Members & Staff", href: "/about/valued-members" },
        { label: "Hours", href: "/hours" },
        { label: "Contact", href: "/contact" },
        { label: "Policies", href: "/about/policies" },
      ],
    },
  ],
} as const;
