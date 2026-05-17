"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Sun } from "lucide-react";
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-border/60" data-testid="site-header">
      <div className="container mx-auto container-px h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shadow-ambient">
            <Sun className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <div className="font-heading text-lg md:text-xl font-extrabold tracking-tight">Accutek Solar</div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-muted-foreground">Since 1994 · IN & IL</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8" data-testid="primary-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition focus-ring" data-testid={`nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+18128787343" className="text-sm font-medium text-secondary flex items-center gap-2 focus-ring" data-testid="header-phone">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold shadow-ambient hover:-translate-y-0.5 hover:shadow-ambient-lg transition focus-ring" data-testid="header-cta">
            Get Free Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden p-2 rounded-md focus-ring" data-testid="mobile-menu-toggle">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={cn("md:hidden overflow-hidden transition-[max-height] duration-300 border-t border-border/60", open ? "max-h-96" : "max-h-0")}>
        <div className="container mx-auto container-px py-4 flex flex-col gap-3" data-testid="mobile-menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium" data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/quote" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 font-bold" data-testid="mobile-cta">
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
