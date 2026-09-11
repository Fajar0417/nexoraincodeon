import { Hero } from "@/components/sections/hero";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TechStack } from "@/components/sections/tech-stack";
import { Benefits } from "@/components/sections/benefits";
import { ServicesContent } from "@/components/sections/services-content";
import { ProcessContent } from "@/components/sections/process-content";
import { PricingContent } from "@/components/sections/pricing-content";
import { BlogContent } from "@/components/sections/blog-content";
import { ContactContent } from "@/components/sections/contact-content";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesContent />
      <Benefits />
      <TechStack />
      <ProcessContent />
      <PricingContent />
      <BlogContent />
      <ContactContent />
    </>
  );
}
