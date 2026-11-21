import type { Role } from "@/generated/prisma/client";

// Each role has its own dashboard page.
export function getDashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "TRAINER") return "/trainer";
  return "/member";
}
