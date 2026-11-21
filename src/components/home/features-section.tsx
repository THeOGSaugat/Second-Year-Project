import {
  Bell,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

// The system modules from the project proposal / ERD.
const FEATURES = [
  {
    title: "Membership Plans",
    description: "Clear plans with set durations and prices, managed by the Admin.",
    icon: CreditCard,
  },
  {
    title: "Payment Records",
    description: "Every membership payment is recorded and easy to review.",
    icon: Wallet,
  },
  {
    title: "Trainer Assignment",
    description: "Members are assigned to trainers for personal guidance.",
    icon: UserCheck,
  },
  {
    title: "Attendance Tracking",
    description: "Check-in and check-out times are recorded for each visit.",
    icon: CalendarCheck,
  },
  {
    title: "Workout Plans",
    description: "Trainers build day-by-day plans with exercises, sets and reps.",
    icon: Dumbbell,
  },
  {
    title: "Progress Tracking",
    description: "Weight and body measurements are tracked over time.",
    icon: TrendingUp,
  },
  {
    title: "Notifications",
    description: "Important updates reach members and staff in one place.",
    icon: Bell,
  },
  {
    title: "Secure Role-Based Login",
    description: "Admins, Trainers and Members each see only what they need.",
    icon: ShieldCheck,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-16 border-t border-white/20 bg-brand-blue py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Features"
          title="Features Overview"
          description="Everything the gym needs to manage members, trainers and daily activity."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="bg-brand-white py-6 shadow-lg">
              <CardHeader className="px-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-red text-white">
                  <feature.icon className="size-6" />
                </div>
                <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
