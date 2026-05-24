"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { BlogPost, CATEGORY_META } from "@/lib/blog-data";

export default function BlogCard({ post }: { post: BlogPost }) {
  const cat = CATEGORY_META[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden shadow-ambient hover:shadow-ambient-lg hover:-translate-y-1 transition-all duration-300 focus-ring"
      data-testid={`blog-card-${post.slug}`}
    >
      {/* Hero image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm text-foreground border border-border/40">
          {cat.emoji} {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <h3 className="font-heading text-xl md:text-2xl font-extrabold leading-tight text-balance group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {post.subtitle}
          </p>
        )}

        <p className="mt-3 text-foreground/70 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta footer */}
        <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
