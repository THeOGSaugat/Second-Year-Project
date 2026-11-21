import Link from "next/link";
import { Logo } from "@/components/logo";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { Role } from "@/generated/prisma/client";

type NavLink = { label: string; href: string };

type DashboardShellProps = {
  userName: string;
  role: Role;
  links: NavLink[];
  activeHref: string; // the link to underline (the current page)
  title: string;
  description?: string;
  children: React.ReactNode;
};

// The frame shared by all dashboard pages: top bar + page title + page content.
export function DashboardShell({
  userName,
  role,
  links,
  activeHref,
  title,
  description,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-blue">
      <header className="border-b border-white/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Logo />
            <nav className="flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold text-white underline-offset-8 hover:underline ${link.href === activeHref ? "underline decoration-2" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-white sm:inline">{userName}</span>
            <span className="rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">
              {role}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold text-white">{title}</h1>
        {description && <p className="mt-2 text-lg font-medium text-white">{description}</p>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
