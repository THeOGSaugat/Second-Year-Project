import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";

// A small form that calls the `logout` server action when submitted.
export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="outline"
        className="h-9 border-white bg-transparent px-4 font-semibold text-white hover:bg-white hover:text-brand-blue"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </form>
  );
}
