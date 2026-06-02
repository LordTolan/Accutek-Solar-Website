"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Tag,
  User,
  BookOpen,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { getBlogPost, getAllBlogPosts, AI_DISCLAIMER } from "@/lib/blog-data";
import { HCP_BOOK_URL } from "@/lib/utils";

export default function BlogPostClient() {
  const pathname = usePathname();
  const slug = pathname?.split("/blog/")[1]?.replace(/\/$/, "") ?? "";
  const post = getBlogPost(slug);
  const allPosts = getAllBlogPosts();

  if (!post) {
    return (
      <section className="container mx-auto container-px py-32 text-center max-w-2xl">
        <h1 className="text-4xl font-heading font-black">Post Not Found</h1>
        <p className="mt-4 text-foreground/70">
          This article doesn't exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </section>
    );
  }

  // Find next/prev posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related posts (same category, excluding current)
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40"
          aria-hidden="true"
        />
        <div className="relative container mx-auto container-px py-12 md:py-20 max-w-4xl">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-mono bg-primary/10 text-primary px-3 py-1.5 rounded-md border border-primary/20">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black leading-[1.08] text-balance">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-foreground/60 italic">{post.subtitle}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="container mx-auto container-px max-w-4xl -mt-1">
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden border border-border shadow-ambient">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto container-px py-12 md:py-16 max-w-3xl">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-heading prose-headings:font-black prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-li:text-foreground/80
            prose-strong:text-foreground prose-strong:font-bold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Sources / Fact-check */}
        {post.sources && post.sources.length > 0 && (
          <div className="mt-12 p-6 rounded-xl border border-border bg-muted/30">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Fact-Check Sources
            </div>
            <ul className="space-y-1.5">
              {post.sources.map((src, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  {src}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs font-mono bg-muted text-muted-foreground px-3 py-1.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* AI Disclaimer */}
        <p className="mt-8 text-xs text-muted-foreground italic border-t border-border pt-4">
          {AI_DISCLAIMER}
        </p>
      </article>

      {/* Prev / Next Navigation */}
      <section className="border-t border-border">
        <div className="container mx-auto container-px max-w-4xl py-8">
          <div className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col p-4 rounded-lg border border-border hover:border-primary/40 transition"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-bold group-hover:text-primary transition line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col items-end text-right p-4 rounded-lg border border-border hover:border-primary/40 transition"
              >
                <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-bold group-hover:text-primary transition line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/20">
          <div className="container mx-auto container-px py-12 max-w-4xl">
            <h2 className="text-2xl font-heading font-black mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-ambient transition-all"
                >
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={r.heroImage}
                      alt={r.heroAlt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-primary">
                      {r.category}
                    </span>
                    <h3 className="text-sm font-bold leading-snug group-hover:text-primary transition line-clamp-2">
                      {r.title}
                    </h3>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {new Date(r.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container mx-auto container-px py-16 max-w-3xl text-center">
          <h2 className="text-3xl font-heading font-black">Liked This Article?</h2>
          <p className="mt-3 text-foreground/70">
            Turn solar knowledge into solar savings. Get a free, no-pressure quote for your
            property — we'll show you the real numbers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition"
            >
              Get my free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary transition"
            >
              More articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
