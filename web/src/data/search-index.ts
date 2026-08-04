// Search index for the Guelph Fit & Rec site. Every entry is one searchable item —
// a page, a program, a person, or a facility. Real content only, sourced from fitandrec.gryphons.ca.

import { STAFF } from "./staff";

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  category: "page" | "program" | "staff" | "class" | "facility" | "policy";
  keywords: string[]; // extra search terms beyond title+description
};

// Every route on the site, with its human-facing title and a description-worthy summary
const PAGES: SearchEntry[] = [
  {
    title: "Home",
    description:
      "Fitness, recreation, and community programs for U of G students, staff, and Guelph residents at the W.F. Mitchell Athletics Centre. Live gym occupancy counter.",
    url: "/",
    category: "page",
    keywords: ["homepage", "welcome", "live counter", "gym occupancy", "mitchell"],
  },
  {
    title: "About the Department of Athletics",
    description:
      "Nurture, Recreate, Gear up. Fitness Centre capacity 450, 40+ weekly NRG classes, 14 intramural sports, 8 certified trainers.",
    url: "/about",
    category: "page",
    keywords: [
      "about",
      "department of athletics",
      "mission",
      "history",
      "edi",
      "fair play",
      "code of conduct",
      "land acknowledgement",
    ],
  },
  {
    title: "Policies",
    description:
      "Gym floor rules, membership terms, code of conduct, refund and withdrawal policies, accessibility, guest policies.",
    url: "/about/policies",
    category: "policy",
    keywords: [
      "policies",
      "rules",
      "refund",
      "withdrawal",
      "code of conduct",
      "accessibility",
    ],
  },
  {
    title: "Valued Members and Staff",
    description:
      "Hear directly from Fit & Rec student staff and members about their experience working and training at the W.F. Mitchell Athletics Centre.",
    url: "/about/valued-members",
    category: "page",
    keywords: ["valued members", "staff", "testimonials", "profiles", "team"],
  },
  {
    title: "Hours of Operation",
    description:
      "Full facility hours for the Fitness Centre, aquatics, field house, and studios — weekdays, weekends, holidays, and semester breaks.",
    url: "/hours",
    category: "page",
    keywords: [
      "hours",
      "schedule",
      "open",
      "close",
      "weekend hours",
      "holiday hours",
      "closed",
    ],
  },
  {
    title: "Contact Us",
    description:
      "Phone directory, staff contacts, and department extensions. Main line 519-824-4120. Registration help reghelp@uoguelph.ca.",
    url: "/contact",
    category: "page",
    keywords: [
      "contact",
      "phone",
      "email",
      "extension",
      "client services",
      "reghelp",
      "519-824-4120",
    ],
  },
  {
    title: "Memberships",
    description:
      "Four core plans: Student NRG Plus $55/sem, Student NRG Mid-Term $30, Community NRG $71.90/mo, Youth $53.94/mo (ages 12–17). All plans include Fitness Centre access.",
    url: "/membership",
    category: "page",
    keywords: [
      "membership",
      "join",
      "pricing",
      "plans",
      "student",
      "community",
      "youth",
      "nrg plus",
    ],
  },
  {
    title: "How to Register for a Membership",
    description:
      "Four-step in-person registration at Client Services in the Larry Pearson lobby. Photo ID required, HST included where applicable, no card sharing.",
    url: "/membership/register",
    category: "page",
    keywords: [
      "register",
      "sign up",
      "how to join",
      "enroll",
      "membership registration",
    ],
  },
  {
    title: "Day and Week Passes",
    description:
      "Single-day passes from $14.16, 10-visit punch passes, and climbing add-ons. Ideal for irregular visits or drop-in NRG classes.",
    url: "/membership/passes",
    category: "page",
    keywords: [
      "day pass",
      "week pass",
      "punch pass",
      "10-visit",
      "drop-in",
      "climbing pass",
    ],
  },
  {
    title: "Personal Training Packages",
    description:
      "One-on-one and 2-person packages with certified personal trainers. Every package begins with a Health History and FMS assessment.",
    url: "/membership/pt-packages",
    category: "page",
    keywords: [
      "personal training",
      "pt",
      "packages",
      "pricing",
      "1:1",
      "buddy training",
      "trainer",
    ],
  },
  {
    title: "NRG Group Fitness",
    description:
      "40+ weekly classes across strength, cardio, flexibility, and mind-body. Included with NRG Plus or Community NRG memberships.",
    url: "/nrg",
    category: "page",
    keywords: [
      "nrg",
      "group fitness",
      "classes",
      "schedule",
      "drop in",
      "workout classes",
    ],
  },
  {
    title: "Personal Training",
    description:
      "Eight certified personal trainers offering 1:1 coaching, small-group PT, and NRG Plus training. Includes movement screens, goal-setting, and program design.",
    url: "/fitness/personal-training",
    category: "program",
    keywords: [
      "personal training",
      "one on one",
      "coaching",
      "trainer",
      "fitness assessment",
      "fms",
    ],
  },
  {
    title: "Group Fitness Classes",
    description:
      "The full NRG group-fitness landing with class categories, how to attend, and how memberships include unlimited group classes.",
    url: "/fitness/group-classes",
    category: "program",
    keywords: [
      "group classes",
      "group fitness",
      "workout classes",
      "fitness classes",
    ],
  },
  {
    title: "Wellness — Pilates, Yoga, and Group PT",
    description:
      "Pilates, Yoga, mobility, mindfulness, and small-group personal training. Studios in W.F. Mitchell, delivered by certified instructors.",
    url: "/fitness/wellness",
    category: "program",
    keywords: [
      "wellness",
      "pilates",
      "yoga",
      "mobility",
      "mindfulness",
      "meditation",
      "group pt",
    ],
  },
  {
    title: "Aquatic Programs",
    description:
      "Two full-sized pools — 25m Gold Pool and 25yd Red Pool with diving board — plus Lifesaving Society swim lessons for all ages, Aqua Fit, and scuba certification.",
    url: "/skills/aquatics",
    category: "program",
    keywords: [
      "aquatics",
      "swim",
      "swimming",
      "pool",
      "aqua fit",
      "lifesaving",
      "scuba",
      "gold pool",
      "red pool",
    ],
  },
  {
    title: "Dance Classes",
    description:
      "Fall 2026 dance program: 16 sections across ballet, jazz, hip-hop, contemporary, and Latin styles with 14 instructors.",
    url: "/skills/dance",
    category: "program",
    keywords: [
      "dance",
      "ballet",
      "jazz",
      "hip hop",
      "contemporary",
      "latin dance",
      "salsa",
    ],
  },
  {
    title: "Certifications",
    description:
      "CPR, First Aid, National Lifeguard Service (NLS), and swim instructor certifications through 2027 via the Lifesaving Society.",
    url: "/skills/certifications",
    category: "program",
    keywords: [
      "cpr",
      "first aid",
      "nls",
      "national lifeguard",
      "certification",
      "lifesaving society",
      "instructor",
    ],
  },
  {
    title: "Martial Arts",
    description:
      "Brazilian Jiu-Jitsu, Karate, Muay Thai, Self-Defence, and Tae Kwon Do — instructor-led classes in the Combatives Room.",
    url: "/skills/martial-arts",
    category: "program",
    keywords: [
      "martial arts",
      "bjj",
      "brazilian jiu jitsu",
      "karate",
      "muay thai",
      "self defence",
      "tae kwon do",
      "taekwondo",
    ],
  },
  {
    title: "Drop-in Recreation",
    description:
      "Weekly rec calendar: swimming, basketball, badminton, hockey, volleyball, soccer — free with your Recreation Membership.",
    url: "/sports/drop-in",
    category: "program",
    keywords: [
      "drop in",
      "rec",
      "recreation",
      "basketball",
      "badminton",
      "hockey",
      "volleyball",
      "soccer",
      "pickup",
    ],
  },
  {
    title: "Intramural Sports",
    description:
      "14 intramural sports across Competitive, Recreational, and Fun divisions. Team Bond entry $100/$300 depending on sport.",
    url: "/sports/intramurals",
    category: "program",
    keywords: [
      "intramurals",
      "intramural",
      "team sports",
      "leagues",
      "team bond",
      "hockey",
      "basketball",
    ],
  },
  {
    title: "Student Clubs",
    description:
      "Level I/II/III sport clubs — a bridge between drop-in rec and varsity. Includes Fencing, Ultimate Frisbee, and more.",
    url: "/sports/clubs",
    category: "program",
    keywords: [
      "clubs",
      "sport clubs",
      "student clubs",
      "fencing",
      "ultimate frisbee",
    ],
  },
  {
    title: "Indoor Climbing Wall",
    description:
      "Bouldering, top-rope, and auto-belays. Free equipment. Orientation required. Punch passes, day passes, and NRG Plus climbing add-ons available.",
    url: "/sports/climbing",
    category: "program",
    keywords: [
      "climbing",
      "rock climbing",
      "bouldering",
      "top rope",
      "belay",
      "climbing wall",
      "ggac",
    ],
  },
  {
    title: "Kids Swim Lessons",
    description:
      "Parent & Tot, Preschool, and Patrol/Bronze swim levels with certified instructors. Small class sizes and Lifesaving Society curriculum.",
    url: "/kids/swim",
    category: "program",
    keywords: [
      "kids swim",
      "swim lessons",
      "parent and tot",
      "preschool swim",
      "bronze",
      "children swimming",
    ],
  },
  {
    title: "Kids Camps",
    description:
      "SUN AWARE-certified summer camps ages 5–14 (Junior Activity Camp) and Sport Camps with Learn-to-Swim for babies. Registration opens Feb 9, 2026.",
    url: "/kids/camps",
    category: "program",
    keywords: [
      "camps",
      "kids camps",
      "summer camp",
      "junior activity",
      "sport camp",
      "march break",
      "girls at bat",
    ],
  },
];

// NRG class catalogue — each class becomes searchable so "yoga" or "spin" or "hiit" surfaces them
const CLASSES: SearchEntry[] = [
  { title: "Yoga Flow", description: "60-min Vinyasa-style flow linking breath and movement. Low intensity, all levels welcome.", url: "/nrg#yoga-flow", category: "class", keywords: ["yoga", "vinyasa", "flow", "beginner yoga"] },
  { title: "Power Yoga", description: "60-min heat-building sequences focused on strength and flexibility. Medium intensity.", url: "/nrg#power-yoga", category: "class", keywords: ["yoga", "power yoga", "hot yoga", "strength yoga"] },
  { title: "Pilates Mat", description: "50-min core-centred mat work drawing on the classical Pilates repertoire. Medium intensity.", url: "/nrg#pilates-mat", category: "class", keywords: ["pilates", "mat pilates", "core"] },
  { title: "HIIT / Bootcamp", description: "45-min high-intensity intervals mixing bodyweight, dumbbells, and cardio bursts. High intensity.", url: "/nrg#hiit-bootcamp", category: "class", keywords: ["hiit", "bootcamp", "high intensity", "interval training"] },
  { title: "Cycle Studio", description: "45-min indoor cycling with intervals, sprints, and climbs. Studio Room 3216. High intensity.", url: "/nrg#cycle-studio", category: "class", keywords: ["cycle", "cycling", "spin", "spinning", "indoor cycling"] },
  { title: "Strength & Sculpt", description: "55-min barbell and dumbbell circuit built around compound lifts. Medium intensity.", url: "/nrg#strength-sculpt", category: "class", keywords: ["strength", "sculpt", "weight training", "barbell", "dumbbell"] },
  { title: "Barre Fusion", description: "50-min ballet-inspired isometrics combined with Pilates and light cardio. Medium intensity.", url: "/nrg#barre-fusion", category: "class", keywords: ["barre", "ballet", "fusion"] },
  { title: "Zumba", description: "55-min dance-based cardio to Latin and world rhythms — no experience needed. Medium intensity.", url: "/nrg#zumba", category: "class", keywords: ["zumba", "dance cardio", "latin dance"] },
  { title: "Aqua Fit", description: "50-min water-based conditioning at the Gryphon Aquatic Centre. Low intensity.", url: "/nrg#aqua-fit", category: "class", keywords: ["aqua fit", "water fitness", "pool fitness", "aquatic exercise"] },
  { title: "Mobility & Mind", description: "45-min guided mobility, myofascial release, and mindfulness. Post-training recovery focus.", url: "/nrg#mobility-mind", category: "class", keywords: ["mobility", "stretching", "recovery", "mindfulness"] },
  { title: "Kettlebell Basics", description: "50-min foundational kettlebell training — swings, cleans, presses, and Turkish get-ups. Medium intensity.", url: "/nrg#kettlebell-basics", category: "class", keywords: ["kettlebell", "kb", "swings"] },
  { title: "Boxing Conditioning", description: "50-min non-contact boxing footwork, bag work, and conditioning circuits. High intensity.", url: "/nrg#boxing-conditioning", category: "class", keywords: ["boxing", "kickboxing", "combat conditioning"] },
];

// Physical facilities — searchable so "pool" or "climbing wall" surfaces the right page
const FACILITIES: SearchEntry[] = [
  { title: "Fitness Centre", description: "Newly renovated in 2016. 450-person capacity, cardio, free weights, machines, and functional training areas.", url: "/hours#fitness-centre", category: "facility", keywords: ["fitness centre", "gym", "weight room", "cardio"] },
  { title: "Gold Pool", description: "25-metre lap pool with 8 lanes. Lane swim, learn-to-swim, and Aqua Fit programming.", url: "/skills/aquatics#gold-pool", category: "facility", keywords: ["gold pool", "lap pool", "25m pool", "swimming"] },
  { title: "Red Pool", description: "25-yard recreation pool with diving board and 4 lanes. Rec swim, kids lessons, and dive programming.", url: "/skills/aquatics#red-pool", category: "facility", keywords: ["red pool", "recreation pool", "diving", "25yd"] },
  { title: "Indoor Climbing Wall", description: "Bouldering, top-rope, and auto-belay walls at the Guelph Gryphons Athletics Centre.", url: "/sports/climbing", category: "facility", keywords: ["climbing wall", "climbing gym", "bouldering wall"] },
  { title: "W.F. Mitchell Athletics Centre", description: "Home of Gryphon Fit & Rec — 50 East Ring Road, Guelph, ON N1G 2W1.", url: "/about#mitchell", category: "facility", keywords: ["mitchell", "wf mitchell", "athletics centre", "location", "address"] },
];

// Turn the staff roster into searchable entries
const STAFF_ENTRIES: SearchEntry[] = STAFF.map((s) => ({
  title: s.name,
  description: `${s.role} — ${s.program}. ${
    s.bio.experience?.slice(0, 140) ?? "Valued Fit & Rec team member."
  }${s.bio.experience && s.bio.experience.length > 140 ? "…" : ""}`,
  url: `/about/valued-members#${s.slug}`,
  category: "staff",
  keywords: [s.name.toLowerCase(), s.role.toLowerCase(), s.program.toLowerCase(), "staff", "team", "member"],
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...PAGES,
  ...CLASSES,
  ...FACILITIES,
  ...STAFF_ENTRIES,
];

/**
 * Simple ranked search over the index.
 * Matches tokens against title (weight 5), keywords (3), and description (1).
 * Returns entries with a positive score, sorted by relevance.
 */
export function searchIndex(rawQuery: string, limit = 12): SearchEntry[] {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const tokens = query.split(/\s+/).filter((t) => t.length >= 2);
  if (tokens.length === 0) return [];

  const scored = SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const desc = entry.description.toLowerCase();
    const keys = entry.keywords.join(" ").toLowerCase();

    let score = 0;
    for (const tok of tokens) {
      // Exact whole-phrase match in title is highest signal
      if (title === query) score += 100;
      if (title.startsWith(query)) score += 40;

      // Per-token contribution
      if (title.includes(tok)) score += 10;
      if (keys.includes(tok)) score += 6;
      if (desc.includes(tok)) score += 2;

      // Word-boundary bonus (whole-word match, not substring)
      const wb = new RegExp(`\\b${tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (wb.test(title)) score += 8;
      if (wb.test(keys)) score += 4;
      if (wb.test(desc)) score += 1;
    }

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
