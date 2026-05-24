"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarClock } from "lucide-react";
import { cn, HCP_BOOK_URL } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-area", label: "Service Area" },
  { href: "/blog", label: "Blog" },
  { href: "/tools/calculator", label: "Calculator" },
  { href: "/about", label: "About · Team" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border" data-testid="site-header">
      <div className="container mx-auto container-px h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group focus-ring rounded-md" data-testid="logo-link" aria-label="Accutek Solar — home">
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
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-4 py-2.5 text-sm font-bold hover:border-primary transition focus-ring" data-testid="header-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </a>
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
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 font-bold" data-testid="mobile-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </a>
          <Link href="/quote" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-wider" data-testid="mobile-cta">
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
