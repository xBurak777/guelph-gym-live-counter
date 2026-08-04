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
  {
    title: "Facilities",
    description: "All Gryphon Fit & Rec facilities — Arena, Fieldhouse, Aquatic Centre, W.F. Mitchell Athletics Centre, Alumni Stadium, Soccer Complex.",
    url: "/facilities",
    category: "facility",
    keywords: ["facilities", "venues", "buildings", "rentals"],
  },
  {
    title: "Gryphon Centre Arena",
    description: "Two ice surfaces — Gold Rink and Red Rink — for varsity hockey, learn-to-skate, GOHL and rec skate. Supervisor Jordan Grau.",
    url: "/facilities/arena",
    category: "facility",
    keywords: ["arena", "ice", "hockey", "rink", "gold rink", "red rink", "jordan grau"],
  },
  {
    title: "Gryphon Fieldhouse",
    description: "Indoor turf field and 4-lane 200m track. Fieldhouse supervisor Cameron Lawrie.",
    url: "/facilities/fieldhouse",
    category: "facility",
    keywords: ["fieldhouse", "turf", "track", "indoor track", "cameron lawrie"],
  },
  {
    title: "Gryphon Aquatic Centre",
    description: "25m Gold Pool and 25yd Red Pool with hot tub. Supervisor Beth Fisher.",
    url: "/facilities/aquatic-centre",
    category: "facility",
    keywords: ["aquatic", "pool", "swimming", "gold pool", "red pool", "hot tub", "beth fisher"],
  },
  {
    title: "W.F. Mitchell Athletics Centre",
    description: "Home of Fit & Rec — Fitness Centre, NRG Zone, gyms, studios, climbing wall. Supervisor Andrew Godard.",
    url: "/facilities/mitchell",
    category: "facility",
    keywords: ["mitchell", "athletics centre", "fitness centre", "nrg", "andrew godard"],
  },
  {
    title: "Alumni Stadium",
    description: "CFL-sized field turf and 8-lane IAAF track with permanent lighting. Home of Gryphon Football.",
    url: "/facilities/alumni-stadium",
    category: "facility",
    keywords: ["alumni stadium", "football", "field", "track", "outdoor"],
  },
  {
    title: "Gryphon Soccer Complex",
    description: "Outdoor soccer fields and beach volleyball courts adjacent to the ball diamonds.",
    url: "/facilities/soccer-complex",
    category: "facility",
    keywords: ["soccer", "soccer complex", "beach volleyball", "outdoor fields"],
  },
  {
    title: "Locker & Towel Service",
    description: "Semester and annual locker rentals + optional towel service. Full pricing schedule.",
    url: "/membership/locker-towel",
    category: "program",
    keywords: ["locker", "towel", "lockers", "day locker", "annual locker"],
  },
  {
    title: "Equipment Lending",
    description: "21 free-to-borrow equipment items for members — basketballs, hockey sticks, pickleball paddles, yoga mats and more.",
    url: "/membership/equipment-lending",
    category: "program",
    keywords: ["equipment", "lending", "borrow", "free equipment", "pickleball paddle"],
  },
  {
    title: "Martial Arts",
    description: "Karate, Judo, Aikido, Brazilian Jiu-Jitsu and Mixed Martial Arts in Combatives Room 242.",
    url: "/skills/martial-arts",
    category: "program",
    keywords: ["martial arts", "karate", "judo", "aikido", "bjj", "jiu-jitsu", "mma"],
  },
  {
    title: "Aquatic & Safety Certifications",
    description: "Full LSS certification pathway — Bronze Star through National Lifeguard, Standard First Aid + CPR C, LSS Instructor.",
    url: "/skills/aquatic-safety-certifications",
    category: "program",
    keywords: ["lifeguard", "lss", "national lifeguard", "bronze star", "bronze medallion", "bronze cross", "first aid", "cpr"],
  },
  {
    title: "Team Building",
    description: "Custom team-building programs led by Kevin Lindner — climbing wall, escape-room style challenges, group problem solving.",
    url: "/skills/team-building",
    category: "program",
    keywords: ["team building", "corporate", "group bonding", "kevin lindner"],
  },
  {
    title: "Fitness Certifications",
    description: "canfitpro Personal Training Specialist and Fitness Instructor Specialist pathways with Lynne Skilton-Hayes mentorship.",
    url: "/fitness/fitness-certifications",
    category: "program",
    keywords: ["canfitpro", "personal trainer", "pts", "fis", "lynne skilton-hayes", "certification"],
  },
  {
    title: "NRG Zone",
    description: "Identity-inclusive fitness studio — Women's-Only and LGBTQ2IA+ dedicated hours in a smaller, sensory-reduced room.",
    url: "/fitness/nrg-zone",
    category: "facility",
    keywords: ["nrg zone", "women's only", "lgbtq", "lgbtq2ia", "identity inclusive"],
  },
  {
    title: "Group Personal Training",
    description: "Learn to Lift and Pilates Reformer group PT — small-group coaching for the price of a class.",
    url: "/fitness/group-personal-training",
    category: "program",
    keywords: ["group pt", "learn to lift", "pilates reformer", "small group training"],
  },
  {
    title: "Gryphons Performance Academy",
    description: "Sport-specific strength and conditioning for high-school athletes led by Gryphon varsity coaches.",
    url: "/fitness/gpa",
    category: "program",
    keywords: ["gpa", "performance academy", "strength conditioning", "youth athletes"],
  },
  {
    title: "Community Leagues",
    description: "Adult community leagues — 3-Pitch softball, Beach Volleyball, Pickleball and the Gryphon Old Timer Hockey League.",
    url: "/sports/community-leagues",
    category: "program",
    keywords: ["community league", "3-pitch", "softball", "beach volleyball", "pickleball", "gohl", "adult hockey"],
  },
  {
    title: "3-Pitch Summer League",
    description: "Coed 3-pitch softball league, May–August at the U of G Ball Diamonds.",
    url: "/sports/community-leagues/3-pitch",
    category: "program",
    keywords: ["3-pitch", "softball", "summer league"],
  },
  {
    title: "Beach Volleyball League",
    description: "Coed 4-on-4 beach volleyball, Wednesdays 6:30–8:30pm.",
    url: "/sports/community-leagues/beach-volleyball",
    category: "program",
    keywords: ["beach volleyball", "volleyball", "outdoor"],
  },
  {
    title: "Pickleball League",
    description: "Indoor pickleball league — Fall and Winter semesters at Mitchell/West Gym.",
    url: "/sports/community-leagues/pickleball",
    category: "program",
    keywords: ["pickleball", "pickleball league"],
  },
  {
    title: "Gryphon Old Timer Hockey League (GOHL)",
    description: "Adult 35+ non-contact hockey league at the Gryphon Centre Arena.",
    url: "/sports/community-leagues/gohl",
    category: "program",
    keywords: ["gohl", "old timer hockey", "adult hockey", "35 plus"],
  },
  {
    title: "Intramural Tournaments",
    description: "Hockey, Beach Volleyball, Roundnet, Pickleball and 3v3 Basketball intramural tournaments.",
    url: "/sports/intramurals/tournaments",
    category: "program",
    keywords: ["intramural tournament", "roundnet", "spikeball", "3v3 basketball"],
  },
  {
    title: "Intramural Policies",
    description: "Bonds, fines, cancellation policy, defaults and eligibility for intramural play.",
    url: "/sports/intramurals/policies",
    category: "policy",
    keywords: ["intramural policy", "bond", "fine", "default", "cancellation", "eligibility"],
  },
  {
    title: "What's New",
    description: "Recent updates from Gryphon Fit & Rec — Gryphon Greatness recognitions, facility updates, programming announcements.",
    url: "/about/news",
    category: "page",
    keywords: ["news", "what's new", "gryphon greatness", "updates", "announcements"],
  },
  {
    title: "Events",
    description: "Upcoming events at Fit & Rec — Dance Recital, Halloween Fitness, Exam Stress Relief, Athletics Job Fair, Club Fair.",
    url: "/about/events",
    category: "page",
    keywords: ["events", "calendar", "dance recital", "club fair", "job fair"],
  },
  {
    title: "FAQ",
    description: "Frequently asked questions — memberships, bookings, safety, refunds, day-use policies.",
    url: "/about/faq",
    category: "page",
    keywords: ["faq", "help", "frequently asked", "questions"],
  },
  {
    title: "IEDI Purpose & Objectives",
    description: "Department of Athletics Indigenization, Equity, Diversity, Inclusion and Accessibility commitments and initiatives.",
    url: "/about/iedi",
    category: "page",
    keywords: ["iedi", "ediia", "iediaequity", "diversity", "inclusion", "accessibility", "anti-racism"],
  },
  {
    title: "Job Opportunities",
    description: "On-campus student jobs — intramural referees, event staff, lifeguards, instructors, camp counsellors, Client Services.",
    url: "/about/jobs",
    category: "page",
    keywords: ["jobs", "hiring", "student jobs", "referee", "lifeguard", "employment", "experience guelph"],
  },
  {
    title: "Kids & Camps Home",
    description: "Overview of all Gryphon Kids & Camps programming.",
    url: "/kids",
    category: "page",
    keywords: ["kids", "camps", "children", "youth programming"],
  },
  {
    title: "Activity Camps",
    description: "30+ activity camps — Junior, Intermediate, Senior, Adventures, Robotics, Voices on Air, Toonflix, and more.",
    url: "/kids/activity-camps",
    category: "program",
    keywords: ["activity camp", "summer camp", "junior camp", "cit", "robotics", "leadership"],
  },
  {
    title: "Sport Camps",
    description: "Sport-specific summer camps led by Gryphon Coaches — Rugby, Basketball, Volleyball, Triathlon, Ninja Ready and more.",
    url: "/kids/sport-camps",
    category: "program",
    keywords: ["sport camp", "rugby camp", "basketball camp", "volleyball camp", "triathlon camp", "ninja"],
  },
  {
    title: "Kids Skill Development",
    description: "Weekly kids programs — Rock Climbing, Learn to Skate, Wrestling, Dance, Junior Lifeguard, Water Polo.",
    url: "/kids/skill-development",
    category: "program",
    keywords: ["kids climbing", "learn to skate", "kids dance", "junior lifeguard", "water polo"],
  },
  {
    title: "Birthdays & Group Bonding",
    description: "Climbing, camp-style and NERF Action birthday parties for ages 5+, plus corporate and residence group bonding.",
    url: "/kids/birthdays",
    category: "program",
    keywords: ["birthday", "nerf", "climbing party", "group bonding"],
  },
  {
    title: "School Year Programs",
    description: "Winter Break Camp, March Break Camp, High Five PHCD training, Home Alone Workshop.",
    url: "/kids/school-year",
    category: "program",
    keywords: ["winter break camp", "march break camp", "high five", "phcd", "home alone"],
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
