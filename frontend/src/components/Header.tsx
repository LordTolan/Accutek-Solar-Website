"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarClock, LogIn, ChevronDown } from "lucide-react";
import { cn, HCP_BOOK_URL, HCP_PORTAL_URL } from "@/lib/utils";

const PRIMARY = [
  { href: "/services", label: "Services" },
  { href: "/tools/calculator", label: "Calculator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MORE = [
  { href: "/service-area", label: "Service Area" },
  { href: "/blog", label: "Blog" },
];

function slug(label: string) {
  return label.toLowerCase().replace(/\s/g, "-");
}

function isCurrent(href: string, pathname: string | null) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    if (!more) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMore(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMore(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [more]);

  if (pathname?.startsWith("/admin")) return null;

  const linkClass = (href: string) =>
    cn(
      "text-sm font-medium whitespace-nowrap transition focus-ring rounded-md",
      isCurrent(href, pathname) ? "text-primary" : "text-foreground/75 hover:text-primary"
    );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border" data-testid="site-header">
      <div className="container mx-auto container-px h-16 md:h-20 flex items-center gap-6">
        <Link href="/" className="flex items-center shrink-0 focus-ring rounded-md" data-testid="logo-link" aria-label="Accutek Solar - home">
          <Image
            src="/logo.png"
            alt="Accutek Solar"
            width={458}
            height={192}
            priority
            sizes="(max-width: 768px) 130px, 180px"
            className="h-9 md:h-11 w-auto object-contain"
            data-testid="site-logo"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 min-w-0" data-testid="primary-nav" aria-label="Primary">
          {PRIMARY.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)} data-testid={`nav-${slug(item.label)}`}>
              {item.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/75 hover:text-primary focus-ring rounded-md"
              aria-expanded={more}
              aria-controls="header-more-menu"
              data-testid="nav-more"
              onClick={() => setMore((value) => !value)}
            >
              More
              <ChevronDown className={cn("w-4 h-4 transition", more && "rotate-180")} />
            </button>
            {more ? (
              <div
                id="header-more-menu"
                role="menu"
                data-testid="header-more-menu"
                className="absolute left-0 top-full mt-3 w-56 rounded-lg border border-border bg-background py-1.5 shadow-ambient"
              >
                {MORE.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/60 focus-ring"
                    data-testid={`nav-${slug(item.label)}`}
                    onClick={() => setMore(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={HCP_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/60 focus-ring"
                  data-testid="header-book"
                  onClick={() => setMore(false)}
                >
                  <CalendarClock className="w-4 h-4" /> Book Online
                </a>
                <a
                  href={HCP_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/60 focus-ring"
                  data-testid="header-portal"
                  onClick={() => setMore(false)}
                >
                  <LogIn className="w-4 h-4" /> Customer Login
                </a>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto shrink-0">
          <a href="tel:+18128787343" className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-foreground/80 hover:text-primary focus-ring rounded-md" data-testid="header-phone">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring" data-testid="header-cta">
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="md:hidden ml-auto p-2 rounded-md focus-ring" data-testid="mobile-menu-toggle">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300", open ? "max-h-[40rem] border-t border-border" : "max-h-0")}>
        <div className="container mx-auto container-px py-3 flex flex-col" data-testid="mobile-menu">
          {PRIMARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn("py-2.5 text-base font-medium", isCurrent(item.href, pathname) && "text-primary")}
              data-testid={`mobile-nav-${slug(item.label)}`}
            >
              {item.label}
            </Link>
          ))}
          <p className="mt-3 mb-1 text-xs uppercase tracking-[0.14em] font-mono text-muted-foreground">More</p>
          {MORE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-foreground/70"
              data-testid={`mobile-nav-${slug(item.label)}`}
            >
              {item.label}
            </Link>
          ))}
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-foreground/70 inline-flex items-center gap-2" data-testid="mobile-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </a>
          <a href={HCP_PORTAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-foreground/70 inline-flex items-center gap-2" data-testid="mobile-portal">
            <LogIn className="w-4 h-4" /> Customer Login
          </a>
          <a href="tel:+18128787343" className="mt-2 py-2 text-sm font-medium inline-flex items-center gap-2" data-testid="mobile-phone">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <Link href="/quote" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-wider" data-testid="mobile-cta">
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
