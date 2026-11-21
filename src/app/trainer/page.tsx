import type { Metadata } from "next";
import { requireRole } from "@/lib/auth-helpers";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AccountOverview } from "@/components/dashboard/account-overview";

export const metadata: Metadata = { title: "Trainer Dashboard | Infinity Fitness" };

export default async function TrainerDashboardPage() {
  // Server-side check: only Trainers can see this page
  const user = await requireRole("TRAINER");

  return (
    <DashboardShell
      userName={user.name ?? ""}
      role={user.role}
      links={[{ label: "Dashboard", href: "/trainer" }]}
      activeHref="/trainer"
      title="Trainer Dashboard"
      description="Signed in successfully."
    >
      <AccountOverview name={user.name ?? ""} email={user.email ?? ""} role={user.role} />
    </DashboardShell>
  );
}
