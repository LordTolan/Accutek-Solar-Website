import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import {
  getSortedPosts,
  CATEGORY_META,
  type BlogCategory,
} from "@/lib/blog-data";
import { Rss, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar Blog — Watts New",
  description:
    "Weekly solar insights, Indiana & Illinois energy news, and practical tips from the Accutek Solar team. Fact-checked. Witty. Always current.",
  openGraph: {
    title: "Solar Blog — Watts New | Accutek Solar",
    description:
      "Weekly solar insights, local energy news, and practical tips from a 30-year solar installer.",
  },
};

export default function BlogPage() {
  const posts = getSortedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = Object.entries(CATEGORY_META) as [
    BlogCategory,
    (typeof CATEGORY_META)[BlogCategory]
  ][];

  return (
    <>
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" />
        <div className="container mx-auto container-px relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 grid place-items-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary">
              // WATTS NEW
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight">
            Solar Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Weekly solar insights, Indiana &amp; Illinois energy news, and
            practical tips from a team with 30+ years in the field. Every
            article fact-checked. Zero fluff.
          </p>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map(([key, meta]) => (
              <span
                key={key}
                className="text-[11px] uppercase tracking-[0.15em] font-mono px-3 py-1.5 rounded-full border border-border bg-card/80 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {meta.emoji} {meta.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="container mx-auto container-px -mt-2 mb-16">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-secondary/70 mb-4">
            // LATEST
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="lg:col-span-2">
              <BlogCard post={featured} />
            </div>
          </div>
        </section>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <section className="container mx-auto container-px mb-24">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-secondary/70 mb-6">
            // MORE ARTICLES
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-16 md:py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto container-px text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">
            <Rss className="w-4 h-4" /> New posts every week
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold">
            Ready to harness the sun?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you&apos;re exploring solar for the first time or ready to
            pull the trigger, we&apos;ll run the numbers for your property — free,
            no pressure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/tools/calculator"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background/60 text-foreground px-6 py-3 text-sm font-bold hover:border-primary transition focus-ring"
            >
              Try the Savings Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
