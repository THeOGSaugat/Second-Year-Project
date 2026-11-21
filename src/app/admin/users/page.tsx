import type { Metadata } from "next";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_LINKS } from "@/components/admin/admin-links";
import { CreateUserForm } from "@/components/admin/create-user-form";
import { UsersTable } from "@/components/admin/users-table";

export const metadata: Metadata = { title: "User Accounts | Infinity Fitness" };

export default async function AdminUsersPage() {
  // Server-side check: only Admins can see this page
  const admin = await requireRole("ADMIN");

  // Newest accounts first. `select` makes sure the password hash is never loaded here.
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  });

  return (
    <DashboardShell
      userName={admin.name ?? ""}
      role={admin.role}
      links={ADMIN_LINKS}
      activeHref="/admin/users"
      title="User Accounts"
      description="Create Trainer and Member accounts. There is no public registration."
    >
      <div className="grid items-start gap-6 lg:grid-cols-[400px_1fr]">
        <Card className="bg-brand-white py-6 shadow-lg">
          <CardHeader className="px-6">
            <CardTitle className="text-lg font-bold">Create New Account</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <CreateUserForm />
          </CardContent>
        </Card>

        <Card className="bg-brand-white py-6 shadow-lg">
          <CardHeader className="px-6">
            <CardTitle className="text-lg font-bold">
              Existing Accounts ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <UsersTable users={users} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
