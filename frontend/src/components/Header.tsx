"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Zap, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/service-area", label: "Service Area" },
  { href: "/tools/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border" data-testid="site-header">
      <div className="container mx-auto container-px h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="logo-link">
          <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-green-glow">
            <Zap className="w-5 h-5" strokeWidth={2.5} fill="currentColor" />
          </span>
          <div className="leading-tight">
            <div className="font-heading text-lg md:text-xl font-extrabold tracking-tight">Accutek Solar</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] font-mono text-primary">SINCE 1994 · IN &amp; IL</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7" data-testid="primary-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-foreground/75 hover:text-primary transition focus-ring" data-testid={`nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+18128787343" className="text-sm font-medium text-foreground/80 flex items-center gap-2 hover:text-primary focus-ring" data-testid="header-phone">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-4 py-2.5 text-sm font-bold hover:border-primary transition focus-ring" data-testid="header-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </Link>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring" data-testid="header-cta">
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden p-2 rounded-md focus-ring" data-testid="mobile-menu-toggle">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-border", open ? "max-h-[28rem]" : "max-h-0")}>
        <div className="container mx-auto container-px py-4 flex flex-col gap-2.5" data-testid="mobile-menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium" data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 font-bold" data-testid="mobile-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </Link>
          <Link href="/quote" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-wider" data-testid="mobile-cta">
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
