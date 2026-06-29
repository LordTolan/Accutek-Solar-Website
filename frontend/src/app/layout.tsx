import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.accuteksolar.com"),
  title: {
    default: "Accutek Solar - The Future of Energy | Solar Installer Indiana & Illinois",
    template: "%s | Accutek Solar",
  },
  description: "Family-owned solar installer serving Indiana & Illinois since 1994. Solar PV, ground-mount arrays, Kohler generators, electrical. Free estimates - (812) 878-7343.",
  keywords: ["Accutek Solar", "solar installer Indiana", "solar Illinois", "ground-mount solar", "Kohler generator installer", "Clinton IN solar", "Terre Haute solar"],
  authors: [{ name: "Accutek Solar" }],
  openGraph: {
    type: "website",
    title: "Accutek Solar - The Future of Energy",
    description: "Family-owned solar & electrical contractor, 32 years strong. Indiana & Illinois.",
    siteName: "Accutek Solar",
    url: "https://www.accuteksolar.com",
    images: [{ url: "/logo.png", width: 1852, height: 776, alt: "Accutek Solar" }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Toaster position="top-right" theme="dark" richColors />

        {/* ---------------------------------------------------------------------
            HOUSECALL PRO - Book Online widget script
            --------------------------------------------------------------------- */}
        <Script
          id="hcp-book-online"
          src="https://online-booking.housecallpro.com/script.js?token=a610e2efa0494a03ae59009369f2a058&orgName=Accutek-Solar"
          strategy="afterInteractive"
        />

        {/* ---------------------------------------------------------------------
            HOUSECALL PRO - Reviews widget + Chat bubble (optional)
            --------------------------------------------------------------------- */}
      </body>
    </html>
  );
}
