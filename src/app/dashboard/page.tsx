import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDashboardPath } from "@/lib/roles";

// After logging in, every user is sent here first.
// This page simply forwards each user to the dashboard for their role.
export default async function DashboardRedirectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  redirect(getDashboardPath(session.user.role));
}
