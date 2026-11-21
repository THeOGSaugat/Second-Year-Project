import { ShieldCheck, UserCog, Users } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

// The three user roles of the system.
const ROLES = [
  {
    title: "Admin",
    description:
      "Creates Trainer and Member accounts, manages membership plans and payments, and oversees the gym.",
    icon: ShieldCheck,
  },
  {
    title: "Trainer",
    description:
      "Builds workout plans for assigned members and records their progress over time.",
    icon: UserCog,
  },
  {
    title: "Member",
    description:
      "Follows workout plans and views membership details, attendance and progress.",
    icon: Users,
  },
];

export function AboutSection() {
  return (
    // scroll-mt-16 stops the sticky navbar from covering the heading after clicking "About"
    <section id="about" className="scroll-mt-16 bg-brand-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="About Us"
          title="About Infinity Fitness"
          description="Infinity Fitness is a web-based gym management system. Every user has a role, and each role sees only the tools it needs."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ROLES.map((role) => (
            <Card
              key={role.title}
              className="border-t-4 border-brand-blue bg-white py-6 shadow-sm"
            >
              <CardHeader className="px-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-red text-white">
                  <role.icon className="size-6" />
                </div>
                <CardTitle className="text-xl font-bold">{role.title}</CardTitle>
                <CardDescription className="text-base text-slate-600">
                  {role.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
