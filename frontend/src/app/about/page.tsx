import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ABOUT_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export const metadata = { title: "About Accutek Solar" };

export default function AboutPage() {
  return (
    <section className="py-16 md:py-24" data-testid="about-page">
      <div className="container mx-auto container-px max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Family-owned since 1994</div>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">32 years of pulling wire — and tilting it toward the sun.</h1>
          <div className="mt-6 space-y-5 text-foreground/80 text-lg leading-relaxed">
            <p>Accutek Solar was founded in 1994 by Keith Davis in Clinton, Indiana. What started as a small electrical-installation shop is today a full-service solar, generator and electrical contractor serving 17 counties across Indiana and Illinois.</p>
            <p>We are environmentally conscious and proud of it. Our mission is simple: provide the most cost-effective solutions to our customers' energy needs — from a single PV panel for a cabin to a fully off-grid farmstead with Kohler standby power.</p>
            <p>Every install is performed by our own team. Every system is supported for life. That's how we've kept neighbors as customers for three decades.</p>
          </div>
          <Link href="/quote" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold focus-ring" data-testid="about-cta">
            Work with us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-ambient-lg">
          <Image src={ABOUT_IMG} alt="Accutek Solar technician at work" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
