import { Navbar } from "@/components/home/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ContactSection } from "@/components/home/contact-section";
import { Footer } from "@/components/home/footer";

// Public homepage. Each section is a small component in src/components/home/.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
