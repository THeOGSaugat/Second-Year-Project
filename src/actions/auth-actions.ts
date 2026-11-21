"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export type LoginState = {
  error?: string;
  email?: string; // keeps the typed email in the form after a failed attempt
};

// Called by the login form
export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // /dashboard forwards each user to their own role's page
    });
  } catch (error) {
    // Wrong email or password (or inactive account): one general message
    if (error instanceof AuthError) {
      return { error: "Invalid email or password.", email };
    }
    // A successful signIn() works by throwing a redirect – let Next.js handle it
    throw error;
  }

  return {};
}

// Called by the Logout button: deletes the session cookie and goes to the homepage
export async function logout() {
  await signOut({ redirectTo: "/" });
}
