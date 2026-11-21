import Link from "next/link";
import { Logo } from "@/components/home/logo";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
  { label: "Login", href: "/login" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-white/70">
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
                    className="text-white/70 transition-colors hover:text-brand-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/70">
          © {currentYear} Infinity Fitness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
