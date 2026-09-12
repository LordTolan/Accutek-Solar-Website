"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, CalendarClock, LogIn } from "lucide-react";
import { cn, HCP_BOOK_URL, HCP_PORTAL_URL } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/service-area", label: "Service Area" },
  { href: "/tools/calculator", label: "Calculator" },
  { href: "/about", label: "About | Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07110d]/95 text-white backdrop-blur-xl" data-testid="site-header">
      <div className="container mx-auto container-px h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group focus-ring rounded-md" data-testid="logo-link" aria-label="Accutek Solar - home">
          <Image
            src="/logo.png"
            alt="Accutek Solar"
            width={458}
            height={192}
            priority
            sizes="(max-width: 768px) 130px, 180px"
            className="h-9 md:h-11 w-auto object-contain brightness-0 invert"
            data-testid="site-logo"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7" data-testid="primary-nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-white/75 hover:text-primary transition focus-ring" data-testid={`nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+18128787343" className="text-sm font-medium text-white/80 flex items-center gap-2 hover:text-primary focus-ring" data-testid="header-phone">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <a href={HCP_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/60 flex items-center gap-2 hover:text-primary focus-ring border-l border-white/15 pl-3 ml-1" data-testid="header-portal">
            <LogIn className="w-3.5 h-3.5" /> Login
          </a>
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 text-white px-4 py-2.5 text-sm font-bold hover:border-primary hover:bg-white/10 transition focus-ring" data-testid="header-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </a>
          <Link href="/quote" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring" data-testid="header-cta">
            Get Quote
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="md:hidden grid h-10 w-10 place-items-center rounded-md focus-ring" data-testid="mobile-menu-toggle">
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span className={cn("absolute left-0 top-1 block h-0.5 w-6 bg-white transition-transform duration-200", open && "translate-y-1.5 rotate-45")} />
            <span className={cn("absolute bottom-1 left-0 block h-0.5 w-6 bg-white transition-transform duration-200", open && "-translate-y-1.5 -rotate-45")} />
          </span>
        </button>
      </div>

      <div className={cn("md:hidden overflow-hidden border-t border-white/10 bg-[#07110d] transition-[max-height] duration-300", open ? "max-h-[28rem]" : "max-h-0")}>
        <div className="container mx-auto container-px py-4 flex flex-col gap-2.5" data-testid="mobile-menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium text-white/80 hover:text-primary" data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g,'-')}`}>
              {n.label}
            </Link>
          ))}
          <a href={HCP_PORTAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2 text-base font-medium text-white/80 flex items-center gap-2 hover:text-primary" data-testid="mobile-portal">
            <LogIn className="w-4 h-4" /> Customer Login
          </a>
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 font-bold text-white" data-testid="mobile-book">
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
