import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Solar Blog — Tips, News & Insights",
  description:
    "Expert solar energy insights from Accutek Solar. Weekly articles on solar technology, Indiana & Illinois incentives, energy savings tips, and industry news — fact-checked by our 32-year veteran team.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Solar Blog — Accutek Solar",
    description:
      "Weekly solar energy insights, policy updates, and practical tips for Indiana & Illinois homeowners.",
  },
};

const BLOG_LISTING_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Accutek Solar Blog",
  description: "Solar energy insights, policy updates, and project notes from the Accutek Solar team.",
  url: "https://www.accuteksolar.com/blog",
  itemListElement: [
    { "@type": "ListItem", position: 1, url: "https://www.accuteksolar.com/blog/homegrown-watts-inside-americas-solar-manufacturing-boom", name: "Homegrown Watts: Inside America's Solar Manufacturing Boom" },
    { "@type": "ListItem", position: 2, url: "https://www.accuteksolar.com/blog/illinois-solar-incentives-2026-the-prairie-state-is-a-solar-goldmine", name: "Illinois Solar Incentives in 2026: The Prairie State Is a Solar Goldmine" },
    { "@type": "ListItem", position: 3, url: "https://www.accuteksolar.com/blog/indiana-net-metering-2026-what-homeowners-need-to-know", name: "Indiana Net Metering in 2026: What Homeowners Need to Know" },
    { "@type": "ListItem", position: 4, url: "https://www.accuteksolar.com/blog/ground-mount-vs-roof-mount-solar-which-is-right-for-your-property", name: "Ground-Mount vs. Roof-Mount Solar" },
    { "@type": "ListItem", position: 5, url: "https://www.accuteksolar.com/blog/how-to-pay-off-your-solar-loan-in-under-10-years-2026-07-06", name: "How to Pay Off Your Solar Loan in Under 10 Years" },
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={BLOG_LISTING_LD} />
      <BlogListClient />
    </>
  );
}
