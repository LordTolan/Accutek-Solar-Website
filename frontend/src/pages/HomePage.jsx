import React from "react";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import About from "@/components/site/About";
import ServiceArea from "@/components/site/ServiceArea";
import Testimonials from "@/components/site/Testimonials";
import HousecallReviews from "@/components/site/HousecallReviews";
import CTASection from "@/components/site/CTASection";
import useSEO from "@/lib/use-seo";

export default function HomePage() {
  useSEO({
    title: "Accutek Solar | Family-Owned Solar & Backup Power · Indiana & Illinois",
    description:
      "Family-owned solar, battery backup, Kohler generators & electrical work across 17 counties in Indiana & Illinois. 30 years in business. Free residential estimates.",
    path: "/",
  });
  return (
    <main data-testid="home-page" className="bg-bone">
      <Hero />
      <Services compact />
      <About compact />
      <ServiceArea />
      <Testimonials />
      <HousecallReviews />
      <CTASection
        title="Ready to schedule a service call?"
        subtitle="Free residential estimates. Commercial site visits by appointment. We respond within one business day across Indiana and Illinois."
      />
    </main>
  );
}
