import React from "react";
import PageHero from "@/components/site/PageHero";
import HousecallReviews from "@/components/site/HousecallReviews";
import Testimonials from "@/components/site/Testimonials";
import CTASection from "@/components/site/CTASection";
import useSEO from "@/lib/use-seo";

export default function ReviewsPage() {
  useSEO({
    title: "Customer Reviews — Verified by Housecall Pro",
    description:
      "Read live, verified reviews from Indiana and Illinois homeowners and businesses we've served. Unfiltered customer feedback collected after every job.",
    path: "/reviews",
  });
  return (
    <main data-testid="reviews-page" className="bg-bone">
      <PageHero
        eyebrow="— Verified customer reviews"
        title="What our customers actually say."
        subtitle="Live reviews collected through Housecall Pro after every job — unfiltered, verified, and posted directly by the homeowners and businesses we've served."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
        testid="reviews-hero"
      />
      <HousecallReviews />
      <Testimonials />
      <CTASection
        title="Be our next 5-star review."
        subtitle="Schedule a consultation and find out why our customers keep recommending us to their neighbors."
      />
    </main>
  );
}
