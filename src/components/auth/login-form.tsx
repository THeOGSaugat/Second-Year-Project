"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { login, type LoginState } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {};

export function LoginForm() {
  // useActionState runs the `login` server action and gives back its result (e.g. an error)
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {/* Shown only after a failed login */}
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-900">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.email}
          required
          className="h-11 bg-white text-slate-900"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-900">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 bg-white text-slate-900"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full text-base font-semibold hover:bg-brand-red-dark"
      >
        <LogIn className="size-5" />
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
