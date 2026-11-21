import Link from "next/link";
import { InfinityIcon } from "lucide-react";

// The Infinity Fitness logo. Clicking it always goes back to the homepage.
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-mint text-brand-black">
        <InfinityIcon className="size-5" />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-white">
        INFINITY <span className="text-brand-mint">FITNESS</span>
      </span>
    </Link>
  );
}
