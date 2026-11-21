"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type CreateUserState = {
  error?: string;
  success?: string;
  // the typed values, so the form keeps them when there is an error
  fields?: { name: string; email: string; role: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Called by the "Create New Account" form on /admin/users
export async function createUser(
  _previousState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  // 1. Authorization: only a logged-in Admin may create accounts.
  //    (Checked here on the server, so it cannot be bypassed from the browser.)
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "You are not allowed to create accounts." };
  }

  // 2. Read the form values
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "");
  const fields = { name, email, role };

  // 3. Validate the values
  if (!name) {
    return { error: "Please enter a full name.", fields };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address.", fields };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters.", fields };
  }
  if (password.length > 72) {
    // bcrypt only uses the first 72 characters of a password
    return { error: "Password must be 72 characters or fewer.", fields };
  }
  // The role must be chosen explicitly. Only Trainer and Member accounts can be created here.
  if (role !== "TRAINER" && role !== "MEMBER") {
    return { error: "Please select a role (Trainer or Member).", fields };
  }

  // 4. Every email must be unique
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already in use.", fields };
  }

  // 5. Hash the password and save the new account
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  // 6. Refresh the users table on the page
  revalidatePath("/admin/users");

  return { success: `Account created for ${name} (${role === "TRAINER" ? "Trainer" : "Member"}).` };
}
