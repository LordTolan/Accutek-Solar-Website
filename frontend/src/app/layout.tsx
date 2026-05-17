import type { Metadata } from "next";
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
      <head>
        {/*
          Housecall Pro 'Book Online' widget mount hook.
          Paste the <script> snippet from HCP (Settings → Online Booking → Embed) below
          to enable the live widget on /book. The widget mounts inside #hcp-book-widget.
        */}
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  );
}
