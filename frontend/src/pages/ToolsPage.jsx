import React from "react";
import PageHero from "@/components/site/PageHero";
import Calculators from "@/components/site/Calculators";
import FAQ from "@/components/site/FAQ";
import CTASection from "@/components/site/CTASection";

export default function ToolsPage() {
  return (
    <main data-testid="tools-page" className="bg-bone">
      <PageHero
        eyebrow="— Interactive tools"
        title="Run the numbers before we walk your property."
        subtitle="Five engineering-grade calculators for solar sizing, battery backup, mount type, generator load and lifetime ROI. Use them as a starting point — your free consultation is the real deal."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Tools" }]}
        testid="tools-hero"
      />
      <Calculators />
      <FAQ />
      <CTASection
        title="Numbers look good?"
        subtitle="Send us your calculator results — we'll sharpen them with your real bills, roof, and goals during a free site visit."
      />
    </main>
  );
}
