import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-0">
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
