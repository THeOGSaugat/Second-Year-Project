"use client";

import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import { createUser, type CreateUserState } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: CreateUserState = {};

// Form used by the Admin to create Trainer and Member accounts.
export function CreateUserForm() {
  // useActionState runs the `createUser` server action and gives back its result
  const [state, formAction, isPending] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-900">
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={state.fields?.name}
          required
          className="h-11 bg-white text-slate-900"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-900">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          defaultValue={state.fields?.email}
          required
          className="h-11 bg-white text-slate-900"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-900">
          Temporary Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Minimum 8 characters"
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          required
          className="h-11 bg-white text-slate-900"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-slate-900">
          Role
        </Label>
        {/* No default role: the Admin must choose one */}
        <select
          id="role"
          name="role"
          defaultValue={state.fields?.role ?? ""}
          required
          className="h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="TRAINER">Trainer</option>
          <option value="MEMBER">Member</option>
        </select>
      </div>

      {/* Result message from the server */}
      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {state.error}
        </p>
      )}
      {state.success && (
        <p
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800"
        >
          {state.success}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full text-base font-semibold hover:bg-brand-red-dark"
      >
        <UserPlus className="size-5" />
        {isPending ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
