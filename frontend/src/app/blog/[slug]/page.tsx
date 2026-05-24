import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPostBySlug,
  getSortedPosts,
  CATEGORY_META,
  BLOG_POSTS,
} from "@/lib/blog-data";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Tag,
} from "lucide-react";
import BlogCard from "@/components/BlogCard";

/* ---------- Static params for static export ---------- */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

/* ---------- Dynamic metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.heroImage, alt: post.heroAlt }],
    },
  };
}

/* ---------- Page component ---------- */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = CATEGORY_META[post.category];
  const allPosts = getSortedPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto container-px relative -mt-32 md:-mt-44 z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link
              href="/blog"
              className="hover:text-primary transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/60">{cat.label}</span>
          </div>

          {/* Category badge */}
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm text-foreground border border-border/40 mb-4">
            {cat.emoji} {cat.label}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight max-w-4xl text-balance">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <span className="text-foreground/60">
              By {post.author}
              {post.authorRole ? ` · ${post.authorRole}` : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="container mx-auto container-px max-w-3xl mt-12 mb-16">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-heading prose-headings:font-extrabold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-foreground/80 prose-ol:text-foreground/80
            prose-li:leading-relaxed
            prose-table:text-sm prose-table:border prose-table:border-border
            prose-th:bg-muted/60 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-heading prose-th:font-bold
            prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-border
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Tag className="w-3.5 h-3.5" /> Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase tracking-[0.12em] font-mono px-3 py-1 rounded-full border border-border bg-muted/40 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {post.sources && post.sources.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-secondary/70 mb-3">
              // SOURCES &amp; REFERENCES
            </div>
            <ul className="space-y-2">
              {post.sources.map((s, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0 text-primary" />
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-primary transition"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* CTA banner */}
      <section className="bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto container-px py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold">
              Got questions? We&apos;ve got answers (and free quotes).
            </h2>
            <p className="mt-2 text-muted-foreground">
              30+ years of solar experience, zero high-pressure sales.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+18128787343"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background/60 text-foreground px-6 py-3 text-sm font-bold hover:border-primary transition focus-ring"
            >
              Call (812) 878-7343
            </a>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="container mx-auto container-px py-16 md:py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-secondary/70 mb-4">
            // KEEP READING
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-8">
            More from Watts New
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
