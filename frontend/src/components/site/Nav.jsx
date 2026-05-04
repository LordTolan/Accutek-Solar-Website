import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY, NAV_LINKS, CUSTOMER_PORTAL } from "@/lib/site-data";
import { Phone, Menu, X, LogIn } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light text over hero only on home and only while at top
  const overHero = isHome && !scrolled;

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || !isHome
          ? "bg-bone/95 backdrop-blur-md border-b border-line"
          : "bg-gradient-to-b from-forest/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className={`flex items-center gap-2 transition-colors ${
            overHero ? "text-bone" : "text-ink"
          } hover:opacity-80`}
        >
          <img
            src={COMPANY.logos.icon}
            alt="Accutek Solar"
            className={`h-10 w-10 object-contain ${
              overHero ? "bg-bone rounded-sm p-0.5" : ""
            }`}
          />
          <span className="font-display text-lg font-extrabold tracking-tight">
            Accutek{" "}
            <span className={`font-light ${overHero ? "text-amber" : "text-forest"}`}>
              Solar
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.to.replace(/\//g, "") || "home"}`}
              className={({ isActive }) => {
                const base = "text-sm transition-colors";
                if (overHero) {
                  return `${base} ${isActive ? "text-amber" : "text-bone/85 hover:text-amber"}`;
                }
                return `${base} ${isActive ? "text-amberDark font-semibold" : "text-ink2 hover:text-ink"}`;
              }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            data-testid="nav-phone"
            className={`font-mono text-xs transition-colors flex items-center gap-1.5 pr-2 ${
              overHero ? "text-bone/80 hover:text-amber" : "text-ink2 hover:text-ink"
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <a
            href={CUSTOMER_PORTAL.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-portal-link"
            data-token={CUSTOMER_PORTAL.token}
            data-orgname="Accutek-Solar"
            title="Existing customers: view jobs, invoices & estimates"
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors ${
              overHero
                ? "border-amber text-amber hover:bg-amber hover:text-ink"
                : "border-forest text-forest hover:bg-forest hover:text-bone"
            }`}
          >
            <LogIn className="h-3 w-3" />
            Portal
          </a>
          <Link
            to="/contact"
            data-testid="nav-cta-quote"
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
              overHero
                ? "bg-amber text-ink hover:bg-bone"
                : "bg-forest text-bone hover:bg-amber hover:text-ink"
            }`}
          >
            Schedule Service
          </Link>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
          className={`lg:hidden ${overHero ? "text-bone" : "text-ink"}`}
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-bone border-t border-line">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`nav-mobile-link-${l.to.replace(/\//g, "") || "home"}`}
                className={({ isActive }) =>
                  `py-2 text-sm transition-colors ${
                    isActive ? "text-amberDark font-semibold" : "text-ink hover:text-amberDark"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              data-testid="nav-mobile-phone"
              className="py-2 font-mono text-xs text-ink2"
            >
              {COMPANY.phone}
            </a>
            <a
              href={CUSTOMER_PORTAL.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-portal"
              data-token={CUSTOMER_PORTAL.token}
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-forest text-forest rounded-full hover:bg-forest hover:text-bone transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Log in to Portal
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-cta-quote"
              className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium bg-forest text-bone rounded-sm"
            >
              Schedule Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
