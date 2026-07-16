import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import BlogListClient from "./BlogListClient";
import { getAllBlogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Solar Blog — Tips, News – Insights",
  description:
    "Expert solar energy insights from Accutek Solar. Weekly articles on solar technology, West Central Indiana & East Central Illinois incentives, energy savings tips, and industry news — fact-checked by our 32-year veteran team.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Solar Blog — Accutek Solar",
    description:
      "Weekly solar energy insights, policy updates, and practical tips for West Central Indiana & East Central Illinois homeowners.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Accutek Solar Blog",
    "description": "Solar energy insights, policy updates, and project notes from the Accutek Solar team.",
    "url": "https://www.accuteksolar.com/blog",
    "itemListElement": posts.map((post, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://www.accuteksolar.com/blog/${post.slug}`,
      "name": post.title,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogListClient />
    </>
  );
}
