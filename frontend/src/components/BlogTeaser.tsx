import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog-data";

export default function BlogTeaser() {
  const allPosts = getAllBlogPosts();
  const posts = allPosts.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-border" data-testid="blog-teaser-section">
      <div className="container mx-auto container-px max-w-6xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-balance">
              <Link href="/blog/" className="hover:text-primary transition-colors">
                The Solar Dispatch
              </Link>
            </h2>
            <p className="mt-2 text-foreground/70 max-w-lg">
              Solar tips, energy policy updates, and honest advice — new articles weekly.
            </p>
          </div>
          <Link
            href="/blog/"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
            data-testid="blog-teaser-view-all-top"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-ambient transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-base font-heading font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/80 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 rounded-md border border-primary/60 px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid="blog-teaser-view-all"
          >
            View all {allPosts.length} articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
