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
        { label: "Group Personal Training", href: "/fitness/group-personal-training" },
        { label: "Group Fitness Classes", href: "/fitness/group-classes" },
        { label: "NRG Schedule", href: "/nrg" },
        { label: "NRG Zone", href: "/fitness/nrg-zone" },
        { label: "Wellness Programs", href: "/fitness/wellness" },
        { label: "Gryphons Performance Academy", href: "/fitness/gpa" },
        { label: "Fitness Certifications", href: "/fitness/fitness-certifications" },
      ],
    },
    {
      label: "Skill Development",
      children: [
        { label: "Aquatics", href: "/skills/aquatics" },
        { label: "Dance", href: "/skills/dance" },
        { label: "Martial Arts", href: "/skills/martial-arts" },
        { label: "Instructor Certifications", href: "/skills/certifications" },
        { label: "Aquatic & Safety Certifications", href: "/skills/aquatic-safety-certifications" },
        { label: "Team Building", href: "/skills/team-building" },
      ],
    },
    {
      label: "Membership",
      children: [
        { label: "Plans & Pricing", href: "/membership" },
        { label: "How to Register", href: "/membership/register" },
        { label: "Day & Week Passes", href: "/membership/passes" },
        { label: "Personal Training Packages", href: "/membership/pt-packages" },
        { label: "Locker & Towel Service", href: "/membership/locker-towel" },
        { label: "Equipment Lending", href: "/membership/equipment-lending" },
      ],
    },
    {
      label: "Sports & Clubs",
      children: [
        { label: "Drop-in Recreation", href: "/sports/drop-in" },
        { label: "Intramurals", href: "/sports/intramurals" },
        { label: "Intramural Tournaments", href: "/sports/intramurals/tournaments" },
        { label: "Intramural Policies", href: "/sports/intramurals/policies" },
        { label: "Sport Clubs", href: "/sports/clubs" },
        { label: "Community Leagues", href: "/sports/community-leagues" },
        { label: "Rock Climbing", href: "/sports/climbing" },
      ],
    },
    {
      label: "Kids & Camps",
      children: [
        { label: "Kids & Camps Home", href: "/kids" },
        { label: "Activity Camps", href: "/kids/activity-camps" },
        { label: "Sport Camps", href: "/kids/sport-camps" },
        { label: "Skill Development", href: "/kids/skill-development" },
        { label: "Birthdays & Group Bonding", href: "/kids/birthdays" },
        { label: "School Year Programs", href: "/kids/school-year" },
        { label: "Swim Lessons", href: "/kids/swim" },
      ],
    },
    {
      label: "Facilities",
      children: [
        { label: "All Facilities", href: "/facilities" },
        { label: "Gryphon Centre Arena", href: "/facilities/arena" },
        { label: "Gryphon Fieldhouse", href: "/facilities/fieldhouse" },
        { label: "Aquatic Centre", href: "/facilities/aquatic-centre" },
        { label: "W.F. Mitchell Athletics Centre", href: "/facilities/mitchell" },
        { label: "Alumni Stadium", href: "/facilities/alumni-stadium" },
        { label: "Soccer Complex", href: "/facilities/soccer-complex" },
      ],
    },
    {
      label: "About",
      children: [
        { label: "About Us", href: "/about" },
        { label: "Valued Members & Staff", href: "/about/valued-members" },
        { label: "What's New", href: "/about/news" },
        { label: "Events", href: "/about/events" },
        { label: "FAQ", href: "/about/faq" },
        { label: "IEDI", href: "/about/iedi" },
        { label: "Job Opportunities", href: "/about/jobs" },
        { label: "Hours", href: "/hours" },
        { label: "Contact", href: "/contact" },
        { label: "Policies", href: "/about/policies" },
      ],
    },
  ],
} as const;
