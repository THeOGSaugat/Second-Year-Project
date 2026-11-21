import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/home/logo";

// Links to sections on the same page. Each href matches the id of a <section>.
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-brand-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop navigation – hidden on small screens */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-blue-dark"
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="h-10 px-5 font-semibold hover:bg-brand-red-dark">
            <Link href="/login">Login</Link>
          </Button>
        </nav>

        {/* Mobile navigation – a menu button that opens a slide-out panel */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-brand-white">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Go to a section of the homepage or log in.
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col px-4">
              {NAV_LINKS.map((link) => (
                // SheetClose closes the panel after a link is tapped
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="border-b border-slate-200 py-3 text-base font-medium text-slate-800 hover:text-brand-blue-dark"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
              <Button
                asChild
                className="mt-6 h-11 text-base font-semibold hover:bg-brand-red-dark"
              >
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
