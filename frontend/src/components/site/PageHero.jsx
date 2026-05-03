import React from "react";
import { Link } from "react-router-dom";

/**
 * Slim, professional inner-page hero used by all pages except Home.
 * Renders below the fixed nav (pt-24 to clear it).
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  testid,
  breadcrumb,
  align = "left",
}) {
  return (
    <section
      data-testid={testid || "page-hero"}
      className="relative bg-forest text-bone pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
    >
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,165,0,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,165,0,0.2) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className={`relative max-w-7xl mx-auto px-6 lg:px-10 ${align === "center" ? "text-center" : ""}`}>
        {breadcrumb && (
          <nav
            data-testid="page-breadcrumb"
            className="mb-6 flex items-center gap-2 label-tag text-bone/60"
          >
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {b.to ? (
                  <Link to={b.to} className="hover:text-amber transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-amber">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="text-bone/30">/</span>}
              </React.Fragment>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="label-tag text-amber mb-4">{eyebrow}</p>
        )}

        <h1
          data-testid="page-hero-title"
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[0.95] tracking-tighter max-w-5xl"
        >
          {title}
        </h1>

        {subtitle && (
          <p
            data-testid="page-hero-subtitle"
            className="mt-6 max-w-3xl text-base lg:text-lg text-bone/80 leading-relaxed"
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
