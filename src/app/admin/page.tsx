import type { Metadata } from "next";
import Link from "next/link";
import { UsersRound } from "lucide-react";
import { requireRole } from "@/lib/auth-helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AccountOverview } from "@/components/dashboard/account-overview";
import { ADMIN_LINKS } from "@/components/admin/admin-links";

export const metadata: Metadata = { title: "Admin Dashboard | Infinity Fitness" };

export default async function AdminDashboardPage() {
  // Server-side check: only Admins can see this page
  const user = await requireRole("ADMIN");

  return (
    <DashboardShell
      userName={user.name ?? ""}
      role={user.role}
      links={ADMIN_LINKS}
      activeHref="/admin"
      title="Admin Dashboard"
      description="Signed in successfully."
    >
      <AccountOverview name={user.name ?? ""} email={user.email ?? ""} role={user.role}>
        <Card className="bg-brand-white py-6 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3 px-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-red text-white">
              <UsersRound className="size-5" />
            </div>
            <CardTitle className="text-lg font-bold">User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <p className="text-sm text-slate-600">
              Create Trainer and Member accounts. There is no public registration.
            </p>
            <Button asChild className="mt-4 h-10 px-5 font-semibold hover:bg-brand-red-dark">
              <Link href="/admin/users">Manage User Accounts</Link>
            </Button>
          </CardContent>
        </Card>
      </AccountOverview>
    </DashboardShell>
  );
}
