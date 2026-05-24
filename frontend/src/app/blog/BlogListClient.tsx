"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, Tag, Search, Newspaper } from "lucide-react";
import { getAllBlogPosts, getBlogCategories, type BlogPost } from "@/lib/blog-data";
import { HCP_BOOK_URL } from "@/lib/utils";

export default function BlogListClient() {
  const allPosts = getAllBlogPosts();
  const categories = getBlogCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = !activeCategory || post.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = allPosts[0]; // newest post is featured

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border"
        data-testid="blog-hero"
      >
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40"
          aria-hidden="true"
        />
        <div className="relative container mx-auto container-px py-16 md:py-24 max-w-6xl">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
            // THE SOLAR DISPATCH
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-balance leading-[1.05]"
            data-testid="blog-title"
          >
            Solar Blog
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
            Weekly insights on solar technology, energy policy, savings strategies, and industry
            news — researched, fact-checked, and written for real homeowners.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="container mx-auto container-px py-12 max-w-6xl">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-ambient-lg transition-all duration-300"
            data-testid="featured-post"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-mono bg-primary text-primary-foreground px-3 py-1.5 rounded-md">
                    <Newspaper className="w-3 h-3" /> Latest
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />{" "}
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-black leading-tight group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-2 text-sm text-foreground/60 italic">{featured.subtitle}</p>
                <p className="mt-4 text-foreground/70 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Filters + Search */}
      <section className="container mx-auto container-px max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-8 border-b border-border">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                !activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All Posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="container mx-auto container-px py-12 max-w-6xl">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles match your search. Try a different term or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto container-px py-16 md:py-20 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black">
            Ready to Put the Sun to Work?
          </h2>
          <p className="mt-4 text-foreground/70 max-w-xl mx-auto">
            Reading about solar is smart. Getting a free, no-pressure quote for your specific
            property is smarter. We'll run the real numbers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition"
            >
              Get my free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={HCP_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary transition"
            >
              Book a site visit
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-ambient transition-all duration-300"
      data-testid={`post-card-${post.slug}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
          <span className="inline-flex items-center gap-1">
            <Tag className="w-3 h-3" /> {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-heading font-bold leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-foreground/60 line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
