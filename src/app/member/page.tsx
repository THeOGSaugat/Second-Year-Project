import type { Metadata } from "next";
import { requireRole } from "@/lib/auth-helpers";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AccountOverview } from "@/components/dashboard/account-overview";

export const metadata: Metadata = { title: "Member Dashboard | Infinity Fitness" };

export default async function MemberDashboardPage() {
  // Server-side check: only Members can see this page
  const user = await requireRole("MEMBER");

  return (
    <DashboardShell
      userName={user.name ?? ""}
      role={user.role}
      links={[{ label: "Dashboard", href: "/member" }]}
      activeHref="/member"
      title="Member Dashboard"
      description="Signed in successfully."
    >
      <AccountOverview name={user.name ?? ""} email={user.email ?? ""} role={user.role} />
    </DashboardShell>
  );
}
