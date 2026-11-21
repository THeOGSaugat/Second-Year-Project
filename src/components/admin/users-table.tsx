import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Role, UserStatus } from "@/generated/prisma/client";

// Only the fields the table needs (the password hash is never sent to the page)
type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
};

// Colour of the small role label in each row
const ROLE_BADGE_STYLES: Record<Role, string> = {
  ADMIN: "bg-brand-red text-white",
  TRAINER: "bg-brand-blue text-white",
  MEMBER: "bg-slate-200 text-slate-800",
};

export function UsersTable({ users }: { users: UserRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-slate-700">Name</TableHead>
          <TableHead className="text-slate-700">Email</TableHead>
          <TableHead className="text-slate-700">Role</TableHead>
          <TableHead className="text-slate-700">Status</TableHead>
          <TableHead className="text-slate-700">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
            <TableCell className="text-slate-600">{user.email}</TableCell>
            <TableCell>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${ROLE_BADGE_STYLES[user.role]}`}
              >
                {user.role}
              </span>
            </TableCell>
            <TableCell className="text-slate-600">{user.status}</TableCell>
            <TableCell className="text-slate-600">
              {user.createdAt.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
