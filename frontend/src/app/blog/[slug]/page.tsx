import type { Metadata } from "next";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-data";
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
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    robots: { index: false, follow: false },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.heroImage, alt: post.heroAlt }],
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
