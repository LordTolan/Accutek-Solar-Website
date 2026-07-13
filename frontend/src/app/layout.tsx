import type { Metadata, Viewport } from "next";
import type React from "react";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.accuteksolar.com"),
  title: {
    default: "Accutek Solar - Solar Installer Indiana & Illinois",
    template: "%s | Accutek Solar",
  },
  description:
    "Family-owned solar installer serving Indiana & Illinois since 1994. Solar PV, ground-mount arrays, Kohler generators, electrical, and energy monitoring. Free estimates - (812) 878-7343.",
  keywords: [
    "Accutek Solar",
    "solar installer Indiana",
    "solar Illinois",
    "ground-mount solar",
    "Kohler generator installer",
    "Clinton IN solar",
    "Terre Haute solar",
    "solar energy monitoring",
    "LED lighting Indiana",
    "solar quotes Indiana",
  ],
  category: "Renewable Energy",
  classification: "Solar & Electrical Contractor",
  authors: [{ name: "Accutek Solar" }],
  creator: "Accutek Solar",
  publisher: "Accutek Solar",
  openGraph: {
    type: "website",
    title: "Accutek Solar - Solar Installer Indiana & Illinois",
    description:
      "Family-owned solar & electrical contractor, 32 years strong. Indiana & Illinois.",
    siteName: "Accutek Solar",
    url: "https://www.accuteksolar.com",
    images: [
      { url: "/logo.png", width: 1852, height: 776, alt: "Accutek Solar" },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F4F6F8",
};

function buildLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": "https://www.accuteksolar.com/#organization",
    name: "Accutek Solar",
    url: "https://www.accuteksolar.com",
    telephone: "+18128787343",
    email: "solarseth7@yahoo.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9797 S Rangeline Rd.",
      addressLocality: "Clinton",
      addressRegion: "IN",
      postalCode: "47842",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.6556,
      longitude: -87.4061,
    },
    areaServed: [
      { "@type": "State", name: "Indiana" },
      { "@type": "State", name: "Illinois" },
    ],
    priceRange: "$$",
    image: "/logo.png",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={buildLocalBusinessJsonLd()} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Toaster position="top-right" theme="dark" richColors />

        <Script
          id="hcp-book-online"
          src="https://online-booking.housecallpro.com/script.js?token=a610e2efa0494a03ae59009369f2a058&orgName=Accutek-Solar"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
