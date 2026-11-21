import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// One shared database client for the whole app.
// In development Next.js reloads files often, so the client is kept on globalThis
// to avoid opening a new set of database connections on every reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  // The app uses Neon's POOLED connection (good for many short queries)
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_POOLING });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
