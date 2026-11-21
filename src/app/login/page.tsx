import type { Metadata } from "next";
import Link from "next/link";
import { InfinityIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Infinity Fitness",
};

// One login page for Admins, Trainers and Members.
// (Logged-in users are redirected away from this page by src/proxy.ts.)
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-blue">
      <header className="border-b border-white/20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link href="/" className="text-sm font-semibold text-white hover:underline">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-brand-white p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-brand-red text-white">
              <InfinityIcon className="size-7" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
              Sign in to Infinity Fitness
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Use the account provided by your gym Admin.
            </p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>

          {/* No sign-up link: accounts are created only by the Admin */}
          <p className="mt-6 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
            No account? Please contact the gym reception.
          </p>
        </div>
      </main>
    </div>
  );
}
