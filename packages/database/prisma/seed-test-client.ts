import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  // Create the client company
  const client = await prisma.client.upsert({
    where: { slug: "test-client" },
    update: {},
    create: {
      name: "Test Client",
      slug: "test-client",
      contractType: "retainer",
      retainerHours: 10,
      retainerFee: 850,
      hourlyRate: 95,
      language: "en",
    },
  });

  console.log(`✓ Client: ${client.name} (slug: ${client.slug})`);

  // Generate a magic-link portal token
  const portalToken = randomBytes(32).toString("hex");
  const passwordHash = await hash("test12345!", 12);

  const user = await prisma.clientUser.upsert({
    where: { email: "testclient@test.com" },
    update: { passwordHash, portalToken },
    create: {
      clientId: client.id,
      name: "Test User",
      email: "testclient@test.com",
      passwordHash,
      portalToken,
      role: "admin",
    },
  });

  console.log(`✓ Portal user: ${user.email} / test12345!`);
  console.log(`  Password login : http://localhost:3000/login`);
  console.log(`  Magic link     : http://localhost:3000/portal/test-client?portal_token=${portalToken}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
