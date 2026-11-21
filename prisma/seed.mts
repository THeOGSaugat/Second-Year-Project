// Creates the FIRST Admin account.
// Run once with:  npx prisma db seed
//
// There is no public registration, and only an Admin can create accounts,
// so the very first Admin has to be created by this script.
// It reads ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD from the .env file.

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

process.loadEnvFile(".env");

const name = process.env.ADMIN_NAME?.trim();
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";

if (!name || !email || password.length < 8) {
  console.error(
    "Please set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (at least 8 characters) in .env",
  );
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL_UNPOOLING }),
});

// Safe to run more than once: if the Admin already exists, nothing changes.
const existingUser = await prisma.user.findUnique({ where: { email } });

if (existingUser) {
  console.log(`An account with ${email} already exists. Nothing to do.`);
} else {
  // Store only the bcrypt hash of the password (12 = hashing cost / strength)
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });
  console.log(`Admin account created for ${email}`);
}

await prisma.$disconnect();
