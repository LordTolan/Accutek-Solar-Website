import type { Metadata } from "next";
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

export default function BlogPage() {
  return <BlogListClient />;
}
