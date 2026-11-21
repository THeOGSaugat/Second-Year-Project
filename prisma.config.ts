import { defineConfig, env } from "prisma/config";

// Prisma's command-line tools do not read .env automatically, so load it here
// (built into Node.js – no extra package needed).
process.loadEnvFile(".env");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.mts", // creates the first Admin account
  },
  datasource: {
    // Migrations need a DIRECT (unpooled) connection to Neon
    url: env("DATABASE_URL_UNPOOLING"),
  },
});
