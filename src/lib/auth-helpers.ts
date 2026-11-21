import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDashboardPath } from "@/lib/roles";
import type { Role } from "@/generated/prisma/client";

// Server-side role check, called at the top of every protected page.
// - Not logged in   -> sent to the login page
// - Wrong role      -> sent to their own dashboard
// - Correct role    -> returns the logged-in user
export async function requireRole(role: Role) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== role) {
    redirect(getDashboardPath(session.user.role));
  }

  return session.user;
}
