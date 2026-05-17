import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Wrench, MessageCircle } from "lucide-react";
import BulbLogo from "@/components/site/BulbLogo";
import { COMPANY } from "@/lib/site-data";
import useSEO from "@/lib/use-seo";

export default function NotFoundPage() {
  const { pathname } = useLocation();

  useSEO({
    title: "Page not found",
    description: "The page you were looking for has moved or doesn't exist. Find your way back to Accutek Solar.",
    path: pathname,
  });

  return (
    <main
      data-testid="not-found-page"
      className="relative bg-forest text-bone min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative grid + grain */}
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 items-center w-full">
        <div className="col-span-12 lg:col-span-7">
          <p className="label-tag text-amber mb-4">— Error 404</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            That page is
            <br />
            off the grid.
          </h1>
          <p
            data-testid="not-found-path"
            className="mt-6 font-mono text-sm text-amber/90 break-all"
          >
            <span className="text-bone/50">requested:</span> {pathname}
          </p>
          <p className="mt-4 max-w-xl text-bone/80 leading-relaxed">
            We couldn't find what you were looking for. The link may be old, or
            we may have rewired things. Head back home or jump to one of the
            spots below — or just give us a call at{" "}
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="text-amber underline underline-offset-4 hover:text-bone transition-colors"
            >
              {COMPANY.phone}
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              data-testid="not-found-home"
              className="group inline-flex items-center gap-2 bg-amber text-ink px-6 py-3 rounded-sm hover:bg-bone transition-colors text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
            <Link
              to="/tools"
              data-testid="not-found-tools"
              className="group inline-flex items-center gap-2 bg-bone/10 text-bone border border-bone/20 px-6 py-3 rounded-sm hover:bg-bone hover:text-ink transition-colors text-sm font-medium"
            >
              <Wrench className="h-4 w-4" />
              Try our calculators
            </Link>
            <Link
              to="/contact"
              data-testid="not-found-contact"
              className="group inline-flex items-center gap-2 bg-bone/10 text-bone border border-bone/20 px-6 py-3 rounded-sm hover:bg-bone hover:text-ink transition-colors text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              Contact us
              <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-bone/15">
            <p className="label-tag text-bone/40 mb-2">— Quick links</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm font-mono text-bone/80">
              <li><Link to="/services" className="hover:text-amber transition-colors" data-testid="nf-link-services">Services</Link></li>
              <li><Link to="/commercial" className="hover:text-amber transition-colors" data-testid="nf-link-commercial">Commercial</Link></li>
              <li><Link to="/service-area" className="hover:text-amber transition-colors" data-testid="nf-link-area">Service area</Link></li>
              <li><Link to="/reviews" className="hover:text-amber transition-colors" data-testid="nf-link-reviews">Reviews</Link></li>
              <li><Link to="/about" className="hover:text-amber transition-colors" data-testid="nf-link-about">About</Link></li>
              <li><Link to="/tools" className="hover:text-amber transition-colors" data-testid="nf-link-tools">Tools</Link></li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:flex col-span-5 items-center justify-center">
          <div className="relative">
            <BulbLogo className="h-72 w-72" variant="color" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-bone/40 whitespace-nowrap tracking-widest uppercase">
              keep the leaves on, keep going
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
