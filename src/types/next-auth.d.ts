// Tells TypeScript that our login session also contains the user's id and role.
import type { DefaultSession } from "next-auth";
import type { Role } from "@/generated/prisma/client";

declare module "next-auth" {
  interface User {
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

// The session token (JWT) type lives in @auth/core, which next-auth is built on
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
