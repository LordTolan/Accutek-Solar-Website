import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"),
  title: { default: "Accutek Solar — The future of energy | Solar Installer Indiana & Illinois", template: "%s | Accutek Solar" },
  description: "Family-owned solar installer serving Indiana & Illinois since 1994. Solar PV, Kohler generators, electrical. Free estimates — (812) 878-7343.",
  keywords: ["solar installer Indiana", "solar Illinois", "Kohler generator installer", "Clinton IN solar", "Terre Haute solar", "Accutek Solar"],
  openGraph: {
    type: "website",
    title: "Accutek Solar — The future of energy",
    description: "Family-owned solar installer, 32 years. Indiana & Illinois.",
    siteName: "Accutek Solar",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
