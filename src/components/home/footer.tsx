import Link from "next/link";
import { Logo } from "@/components/logo";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/20 bg-brand-blue text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 font-medium">
              Gym management system for Admins, Trainers and Members.
            </p>
          </div>

          <div>
            <p className="font-bold">Quick Links</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-12 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm font-medium">
          © {currentYear} Infinity Fitness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
