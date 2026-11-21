import { UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Role } from "@/generated/prisma/client";

type AccountOverviewProps = {
  name: string;
  email: string;
  role: Role;
  children?: React.ReactNode; // extra cards (e.g. the Admin's "User Accounts" card)
};

// Welcome card + "Your Account" card. The details come from the login session.
export function AccountOverview({ name, email, role, children }: AccountOverviewProps) {
  const roleName = role.charAt(0) + role.slice(1).toLowerCase(); // "TRAINER" -> "Trainer"

  return (
    <div className="space-y-6">
      <Card className="bg-brand-white py-6 shadow-lg">
        <CardContent className="flex items-center gap-4 px-6">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
            <UserRound className="size-7" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">Welcome, {name}</p>
            <p className="mt-1 text-slate-600">You are signed in as {roleName}.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-brand-white py-6 shadow-lg">
          <CardHeader className="px-6">
            <CardTitle className="text-lg font-bold">Your Account</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <dl className="grid grid-cols-[80px_1fr] gap-y-3 text-sm">
              <dt className="font-semibold text-slate-500">Name</dt>
              <dd className="text-slate-900">{name}</dd>
              <dt className="font-semibold text-slate-500">Email</dt>
              <dd className="break-all text-slate-900">{email}</dd>
              <dt className="font-semibold text-slate-500">Role</dt>
              <dd className="text-slate-900">{role}</dd>
            </dl>
          </CardContent>
        </Card>

        {children}
      </div>
    </div>
  );
}
