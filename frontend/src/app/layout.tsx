import type { Metadata } from "next";
// import Script from "next/script"; // uncomment when HCP <Script /> snippet is pasted below
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.accuteksolar.com"),
  title: {
    default: "Accutek Solar — The Future of Energy | Solar Installer Indiana & Illinois",
    template: "%s | Accutek Solar",
  },
  description: "Family-owned solar installer serving Indiana & Illinois since 1994. Solar PV, Kohler generators, electrical. Free estimates — (812) 878-7343.",
  keywords: ["Accutek Solar", "solar installer Indiana", "solar Illinois", "Kohler generator installer", "Clinton IN solar", "Terre Haute solar"],
  authors: [{ name: "Accutek Solar" }],
  openGraph: {
    type: "website",
    title: "Accutek Solar — The Future of Energy",
    description: "Family-owned solar & electrical contractor, 32 years strong. Indiana & Illinois.",
    siteName: "Accutek Solar",
    url: "https://www.accuteksolar.com",
  },
  robots: { index: true, follow: true },
  themeColor: "#1A1A1A",
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

        {/* ─────────────────────────────────────────────────────────────────────
            HOUSECALL PRO — Book Online widget script
            ─────────────────────────────────────────────────────────────────────
            HCP gives you a snippet that looks like:
              <script src="https://book.housecallpro.com/book/Accutek-Solar/XXXXX"
                      async></script>
            1. Get the snippet:  HCP → Settings → Online Booking → Embed code
            2. Paste it BELOW this comment (uncomment + replace YOUR_HCP_BOOK_URL).
            3. The widget will auto-mount inside <div id="hcp-book-widget"> on /book.

            <Script
              id="hcp-book-online"
              src="YOUR_HCP_BOOK_URL"
              strategy="afterInteractive"
            />
        */}

        {/* ─────────────────────────────────────────────────────────────────────
            HOUSECALL PRO — Reviews widget + Chat bubble (optional)
            ─────────────────────────────────────────────────────────────────────
            Add these <Script /> tags here when you have the snippets.

            <Script id="hcp-reviews" src="YOUR_HCP_REVIEWS_URL" strategy="afterInteractive" />
            <Script id="hcp-chat"    src="YOUR_HCP_CHAT_URL"    strategy="afterInteractive" />
        */}
      </body>
    </html>
  );
}
