import Link from "next/link";
import { InfinityIcon } from "lucide-react";

type LogoProps = {
  // true = white text, for dark backgrounds such as the footer
  light?: boolean;
};

// The Infinity Fitness logo. Clicking it always goes back to the homepage.
export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-red text-white">
        <InfinityIcon className="size-5" />
      </span>
      <span
        className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-slate-900"}`}
      >
        INFINITY{" "}
        <span className={light ? "text-white" : "text-brand-blue"}>FITNESS</span>
      </span>
    </Link>
  );
}
