const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function daysFromNow(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

const members = [
  ["47:07:12:5E", "Burak", "Aksoy", "STUDENT_ANNUAL", 180, true],
  ["60:11:9D:5C", "Fatih", "Aksoy", "STUDENT_ANNUAL", 180, true],
  ["6C:BD:1C:42", "Aylin", "Demir", "STUDENT_ANNUAL", 180, true],
  ["4C:AA:21:42", "Selin", "Arslan", "STUDENT_ANNUAL", 180, true],
  ["1C:DB:26:42", "Mert", "Aydin", "STUDENT_ANNUAL", 180, true],
  ["CC:3D:2D:42", "Kerem", "Celik", "STUDENT_ANNUAL", 180, true],
  ["26:8C:75:E7", "Eylul", "Hepoglu", "STUDENT_ANNUAL", 6, true],
  ["3C:A2:42:42", "Can", "Yildirim", "STUDENT_ANNUAL", 3, true],
  ["0C:28:13:42", "Elif", "Sahin", "STUDENT_ANNUAL", -30, true],
  ["BC:7C:1E:42", "Emre", "Yilmaz", "STUDENT_ANNUAL", 180, false],
  ["8C:2B:20:42", "Onur", "Kaplan", "STUDENT_ANNUAL", 180, false],
];

async function main() {
  for (const [cardUid, firstName, lastName, membershipTier, endDays, isActive] of members) {
    await prisma.member.upsert({
      where: { cardUid },
      create: {
        cardUid,
        firstName,
        lastName,
        membershipTier,
        membershipStart: daysFromNow(-30),
        membershipEnd: daysFromNow(endDays),
        isActive,
        isInside: false,
        currentVisitStartedAt: null,
      },
      update: {
        firstName,
        lastName,
        membershipTier,
        membershipEnd: daysFromNow(endDays),
        isActive,
        isInside: false,
        currentVisitStartedAt: null,
      },
    });
  }
  console.log(`Seeded ${members.length} demo members. Unknown demo cards are intentionally not registered.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
