import type { Metadata } from "next";
import { BLOG_POSTS, type BlogPost, getBlogPost } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

/**
 * Generate static params for all blog posts — required for `output: "export"`.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/**
 * Dynamic metadata per post for SEO.
 */
export const SITE_URL = "https://www.accuteksolar.com";

/** Dynamic metadata + JSON-LD per blog post. */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Post Not Found", robots: { index: false, follow: false } };
  }

  const published = post.date ? `T00:00:00-05:00` : undefined;
  const modified = post.date ? `T00:00:00-05:00` : undefined;
  const tags = post.tags ?? ["solar", "Indiana solar", "Illinois solar"];
  const category = cleanCategory(post.category);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.title, post.category, "Accutek Solar", "solar Indiana", "solar Illinois", ...tags],
    authors: [{ name: post.author }],
    robots: { index: false, follow: false },
    openGraph: {
      title: `${post.title} | Accutek Solar`,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: modified,
      authors: [post.author],
      tags,
      images: [
        {
          url: post.heroImage,
          width: 1600,
          height: 900,
          alt: post.heroAlt,
        },
      ],
      siteName: "Accutek Solar",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.heroImage, alt: post.heroAlt }],
    },
  };
}

export function buildBlogPostJsonLd(post: BlogPost, categoryLabel?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      worksFor: {
        "@type": "Organization",
        name: "Accutek Solar",
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Accutek Solar",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    articleSection: categoryLabel ?? "Solar",
    keywords: (post.tags ?? []).join(", "),
    image: post.heroImage,
  };
}

function cleanCategory(raw?: string) {
  if (!raw) return "Solar";
  return raw
    .replace(/([A-Z])/g, " $1")
    .replace(/^.+/, (s) => s.trim())
    .replace(/^./, (s) => s.toUpperCase());
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
