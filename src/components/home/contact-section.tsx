import Link from "next/link";
import { Clock, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

// PLACEHOLDERS: replace these values with the gym's real details when they are available.
const CONTACT_DETAILS = [
  { label: "Address", value: "[Gym Address]", icon: MapPin },
  { label: "Phone", value: "[Phone Number]", icon: Phone },
  { label: "Email", value: "[Email Address]", icon: Mail },
  { label: "Opening Hours", value: "[Opening Hours]", icon: Clock },
];

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-16 bg-brand-black py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Contact"
          title="Contact Us"
          description="Visit the gym reception to become a member."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_DETAILS.map((item) => (
            <Card key={item.label} className="bg-white/5 py-6 shadow-sm">
              <CardContent className="flex items-start gap-4 px-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/25 text-brand-mint">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{item.label}</p>
                  <p className="mt-1 text-white/70">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Explains that there is no public sign-up */}
        <div className="mt-12 flex flex-col items-start gap-6 rounded-3xl bg-linear-to-r from-brand-indigo to-brand-indigo/60 p-8 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold">Already a member?</h3>
            <p className="mt-2 text-lg">
              Accounts are created by the gym Admin. There is no online sign-up.
            </p>
          </div>
          <Button asChild className="h-12 shrink-0 px-6 text-base font-semibold">
            <Link href="/login">
              <LogIn className="size-5" />
              Member Login
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
