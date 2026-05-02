import React, { useState, useEffect } from "react";
import { COMPANY } from "@/lib/site-data";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { id: "services", label: "Services" },
  { id: "calculators", label: "Calculators" },
  { id: "gallery", label: "Work" },
  { id: "service-area", label: "Service Area" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Quote" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bone/95 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-2 text-ink hover:opacity-80 transition-opacity"
        >
          <img
            src={COMPANY.logos.icon}
            alt="AccuTek Solar"
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-lg font-extrabold tracking-tight">
            AccuTek <span className="font-light text-forest">Solar</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={`nav-link-${l.id}`}
              className="text-sm text-ink2 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            data-testid="nav-phone"
            className="font-mono text-xs text-ink2 hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <a
            href="#contact"
            data-testid="nav-cta-quote"
            className="px-4 py-2 text-sm font-medium bg-ink text-bone hover:bg-amber hover:text-ink rounded-sm transition-colors"
          >
            Free Estimate
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
          className="lg:hidden text-ink"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-bone border-t border-line">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.id}`}
                className="py-2 text-sm text-ink hover:text-amberDark transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              data-testid="nav-mobile-phone"
              className="py-2 font-mono text-xs text-ink2"
            >
              {COMPANY.phone}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-cta-quote"
              className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium bg-ink text-bone rounded-sm"
            >
              Free Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
