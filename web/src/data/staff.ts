// Real Valued Members and Staff roster from fitandrec.gryphons.ca/about-us/info/valued-members-staff
// All names, roles, programs, photos, and Q&A bios are sourced verbatim from the live Guelph Fit & Rec site.

export type StaffMember = {
  slug: string;
  name: string;
  role: string;
  program: string;
  photo: string;
  featured: boolean;
  bio: {
    experience?: string;
    favourite?: string;
    meaningful?: string;
  };
};

export const STAFF: StaffMember[] = [
  {
    slug: "alexandria-hendershot",
    name: "Alexandria Hendershot",
    role: "Fitness Centre Staff",
    program: "Commerce – Accounting",
    photo: "/images/staff/alexandria-hendershot.jpg",
    featured: false,
    bio: {
      experience:
        "This job had been an amazing experience. The gym is a positive environment that always brings me joy when I come to work. I love how all the staff come together to help others to do what we all love.",
      favourite:
        "My favourite part of the job is my coworkers and the patrons that come to the gym. I love how every part of the staff is always there for each other during the shifts and when needing a shift covered. The patrons make my job exciting — with their questions I am able to implement the knowledge I have learned through the courses I have taken and through the years working out.",
      meaningful:
        "I think this job is meaningful because the gym is a safe space for all. I love it when people ask me how to use equipment because I have been in their shoes before and it makes me feel that I am making a positive impact on their life.",
    },
  },
  {
    slug: "alexis-runstedler",
    name: "Alexis Runstedler",
    role: "Fitness Centre Lead",
    program: "English",
    photo: "/images/staff/alexis-runstedler.jpg",
    featured: false,
    bio: {
      experience:
        "Working at the Fitness Centre for nearly the entirety of my undergrad has without a doubt been the best part of my University experience. Over the past 5 years, the Fitness Centre has become a second home — it's because of the people and the relationships I've built along the way. If I had one piece of advice for any first year with an interest in fitness, I would tell them to get a job at the Fitness Centre immediately.",
      favourite:
        "The people I work with. There are so many coworkers I love chatting with — Lynne and Garrett especially always make my shifts fly by.",
      meaningful:
        "Finishing my personal training certification, becoming lead staff, joining the social media team, MC'ing the part-time staff appreciation banquet twice, and helping put on the She's Got Game event have all been highlights I'll carry with me long after graduation.",
    },
  },
  {
    slug: "anonymous-mascot",
    name: "Anonymous",
    role: "Mascot",
    program: "Computer Science",
    photo: "/images/staff/anonymous-mascot.jpg",
    featured: false,
    bio: {
      experience:
        "I've loved working here — everyone has been super friendly and each shift is a fun experience.",
      favourite:
        "Being able to socialize with such a wide array of people as a part of my job.",
      meaningful:
        "I love being able to connect with members of the community. It allows you to support the school while also getting paid.",
    },
  },
  {
    slug: "brooke-murphy",
    name: "Brooke Murphy",
    role: "GGAC Facility Operator",
    program: "Biological Sciences, Certificate in Business",
    photo: "/images/staff/brooke-murphy.jpg",
    featured: false,
    bio: {
      experience:
        "My experience working at the Guelph Gryphons Athletics Centre (GGAC) has been incredibly positive. Over the past two years, I've built strong connections with staff and coworkers. I also had the opportunity to join the IEDI Advisory Council for the Department of Athletics.",
    },
  },
  {
    slug: "ellen-manderville",
    name: "Ellen Manderville",
    role: "Intramural Sports Facilitator",
    program: "Psychology",
    photo: "/images/staff/ellen-manderville.jpg",
    featured: true,
    bio: {
      experience:
        "It has been a really rewarding experience working in athletics throughout my undergrad. I've grown so much both professionally and personally, and enjoyed many opportunities to step up as a student leader.",
      favourite: "Working alongside other UofG students.",
      meaningful: "The people make it the most meaningful.",
    },
  },
  {
    slug: "emilia-braam",
    name: "Emilia Braam",
    role: "Game Day Manager — Events",
    program: "Sociology, Minor in Marketing",
    photo: "/images/staff/emilia-braam.jpg",
    featured: true,
    bio: {
      experience:
        "My experience working with the University of Guelph Varsity Events team has been nothing but incredible — my good friends coming from this job have been one of the best parts.",
      meaningful:
        "I found a different type of love for sports, making me want to learn more about sport and event management for a future job.",
    },
  },
  {
    slug: "fawwaz-naseem",
    name: "Fawwaz Naseem",
    role: "Fitness Centre Staff",
    program: "Computer Science",
    photo: "/images/staff/fawwaz-naseem.jpg",
    featured: false,
    bio: {
      experience:
        "I have been working in the GGAC for the past 3 years and started off working with Client Services. This motivated me to be a part of the Fitness Centre Team that helps people with their fitness journeys at all levels.",
    },
  },
  {
    slug: "frank-boon",
    name: "Frank Boon",
    role: "Fitness Centre Staff",
    program: "Management",
    photo: "/images/staff/frank-boon.jpg",
    featured: false,
    bio: {
      experience:
        "Working at the Fitness Centre has been a very positive experience for me. It has helped me grow in confidence and leadership.",
      favourite: "Helping members.",
      meaningful: "Being part of a team.",
    },
  },
  {
    slug: "indigo-walker",
    name: "Indigo Walker",
    role: "Floor Staff / Personal Trainer / Instructor",
    program: "Nutritional and Nutraceutical Sciences",
    photo: "/images/staff/indigo-walker.jpg",
    featured: false,
    bio: {
      experience:
        "The Fitness Centre staff have been my best friends and family over these last few years.",
      meaningful:
        "My clients and students. I love teaching and empowering others to find their own journey in fitness, as I found mine.",
    },
  },
  {
    slug: "justine-babin",
    name: "Justine Babin",
    role: "Client Service Student Lead",
    program: "Sociology and Political Science",
    photo: "/images/staff/justine-babin.jpg",
    featured: false,
    bio: {
      experience:
        "Through my role in the Department of Athletics, I've gained invaluable experience in teamwork, leadership, and navigating complex situations.",
      favourite:
        "I discovered the job posting on Experience Guelph as a first-year and it changed the entire arc of my degree.",
      meaningful:
        "There is a special kind of solidarity here. Some of the most transformative conversations I've ever had have taken place right in this building.",
    },
  },
  {
    slug: "lauren-virapen",
    name: "Lauren Virapen",
    role: "Fitness Centre Staff",
    program: "Psychology",
    photo: "/images/staff/lauren-virapen.jpg",
    featured: true,
    bio: {
      experience:
        "Working at the Fitness Centre has truly changed my university experience in the best way possible. I am so lucky to be part of such a close-knit community that makes the Guelph campus feel like home.",
    },
  },
  {
    slug: "mariangela-del-monaco",
    name: "Mariangela Del Monaco",
    role: "Fitness Centre Staff",
    program: "Psychology",
    photo: "/images/staff/mariangela-del-monaco.jpg",
    featured: true,
    bio: {
      experience: "It's been welcoming, accommodating, great overall.",
      favourite:
        "Learning to become a cycling instructor. I have always wanted to learn to teach a fitness class.",
      meaningful:
        "Teaching, and trying to facilitate a safe environment where everyone can work out.",
    },
  },
  {
    slug: "marwan-al-zouabi",
    name: "Marwan Al Zouabi",
    role: "GGAC Facility Operator",
    program: "Human Kinetics",
    photo: "/images/staff/marwan-al-zouabi.jpg",
    featured: false,
    bio: {
      experience:
        "My experience working at the Athletic Centre has been extremely positive. The environment is fast-paced yet supportive.",
      favourite: "Working during basketball and volleyball game days.",
      meaningful:
        "It feels meaningful because the Athletic Centre is a space that impacts students' health, routines, and community.",
    },
  },
  {
    slug: "olivia-van-kessel",
    name: "Olivia Van Kessel",
    role: "Weightroom Supervisor",
    program: "Marine and Freshwater Biology",
    photo: "/images/staff/olivia-van-kessel.jpg",
    featured: false,
    bio: {
      experience:
        "Working at the Fitness Centre has been a generally positive experience. It's amazing getting the chance to interact with awesome staff and members daily.",
      meaningful:
        "My job becomes meaningful when I can see I've made a positive impact on new members.",
    },
  },
  {
    slug: "tess-medeiros",
    name: "Tess Medeiros",
    role: "Weightroom Supervisor / GEM Coordinator",
    program: "Human Kinetics — Alumni",
    photo: "/images/staff/tess-medeiros.jpg",
    featured: false,
    bio: {
      experience:
        "My overall experience has been phenomenal. Even post-graduation, I feel like a part of the UofG community.",
      meaningful:
        "Seeing the positive impact that movement has on people. Seeing them slowly come out of their shells and become regulars.",
    },
  },
  {
    slug: "yousif-khazkeil",
    name: "Yousif Khazkeil",
    role: "Facilities Operator",
    program: "Political Science",
    photo: "/images/staff/yousif-khazkeil.jpg",
    featured: false,
    bio: {
      experience: "Fantastic — I love working here.",
      favourite:
        "I love the socializing of the job because I'm an outgoing person and enjoy talking.",
      meaningful:
        "It helps me learn different skills that I can use in my daily life.",
    },
  },
];

export const FEATURED_STAFF = STAFF.filter((s) => s.featured);
