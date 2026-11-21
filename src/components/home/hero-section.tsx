import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Dumbbell,
  LogIn,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Labels shown on the decorative card on the right side of the hero.
const HERO_HIGHLIGHTS = [
  { label: "Memberships", icon: Users },
  { label: "Workout Plans", icon: Dumbbell },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Progress", icon: TrendingUp },
];

export function HeroSection() {
  return (
    // The gradient starts with the darker blue behind the text so the white text stays readable.
    <section className="relative overflow-hidden bg-linear-to-br from-brand-blue-dark to-brand-blue text-white">
      {/* Soft decorative circles in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-80 rounded-full bg-white/5"
      />

      {/* On large screens: 5-column grid – text takes 3 columns, the card takes 2 */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:py-28">
        {/* Left side: text and buttons */}
        <div className="lg:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="size-2 rounded-full bg-brand-red" />
            Welcome to Infinity Fitness
          </p>

          <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            Train Without Limits.
            <span className="block">Manage Fitness Smarter.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg">
            Infinity Fitness is a gym management system that brings Admins,
            Trainers and Members together, with memberships, workouts,
            attendance and progress in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 px-6 text-base font-semibold hover:bg-brand-red-dark"
            >
              <Link href="/login">
                <LogIn className="size-5" />
                Member Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 border-white bg-transparent px-6 text-base font-semibold text-white hover:bg-white hover:text-brand-blue-dark"
            >
              <a href="#contact">
                Contact Us
                <ArrowRight className="size-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right side: decorative card built with icons (no external images) */}
        <div aria-hidden className="mx-auto w-full max-w-md lg:col-span-2">
          <div className="rounded-3xl border border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-red shadow-lg">
                <Dumbbell className="size-8" />
              </div>
              <div>
                <p className="text-xl font-bold">Infinity Fitness</p>
                <p className="font-medium">Gym Management System</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {HERO_HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white p-4 text-slate-800 shadow-md"
                >
                  <item.icon className="size-6 text-brand-blue" />
                  <p className="mt-3 text-sm font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
