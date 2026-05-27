import Link from "next/link";
import { Heart, Phone, Mail, MapPin, ArrowRight, Sun, CheckCircle2, CalendarClock } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";

export const metadata = { title: "Thank You | Accutek Solar" };

export default function ThankYouPage() {
  return (
    <section className="py-16 md:py-28" data-testid="thank-you-page">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto container-px max-w-3xl text-center">
        {/* Animated sun icon */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 grid place-items-center animate-fade-up">
          <Sun className="w-10 h-10 text-primary" />
        </div>

        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4 animate-fade-up">
          // REQUEST RECEIVED | WE&apos;RE ON IT
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance animate-fade-up">
          Thank you <span className="text-primary">so much.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-foreground/75 max-w-xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
          We truly appreciate you taking the time to reach out to us. Your interest in going solar means the world to our family-owned team, and we can&apos;t wait to help you make it happen.
        </p>

        {/* What happens next card */}
        <div className="mt-12 bg-card rounded-xl border border-border shadow-ambient-lg text-left animate-fade-up" style={{ animationDelay: "0.15s" }} data-testid="next-steps-card">
          <header className="px-6 md:px-10 pt-6 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary">
              <CalendarClock className="w-3 h-3" /> // WHAT HAPPENS NEXT
            </div>
          </header>

          <div className="px-6 md:px-10 py-8 space-y-6">
            <Step number="01" title="We review your request">
              Seth and the team will look over your details within one business day&nbsp;&mdash; usually much sooner.
            </Step>
            <Step number="02" title="We reach out to you">
              We&apos;ll call or email to introduce ourselves, answer any questions, and find a time that works for your schedule.
            </Step>
            <Step number="03" title="Free site visit &amp; custom quote">
              We&apos;ll come to your property, assess your roof or land, and put together a no-obligation quote tailored to your home, your bill, and your goals.
            </Step>
          </div>
        </div>

        {/* Gratitude note */}
        <div className="mt-8 inline-flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-lg px-6 py-4 text-sm text-foreground/80 text-left max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span>
            As a family business serving Indiana and Illinois since 1994, every customer matters deeply to us. We promise to treat your home like our own and earn your trust at every step.
          </span>
        </div>

        {/* Contact strip */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <a href="tel:+18128787343" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition">
            <Phone className="w-4 h-4" /> (812) 878-7343
          </a>
          <a href="mailto:solarseth7@yahoo.com" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition">
            <Mail className="w-4 h-4" /> solarseth7@yahoo.com
          </a>
          <span className="inline-flex items-center gap-2 text-foreground/50">
            <MapPin className="w-4 h-4" /> Clinton, IN 47842
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow hover:-translate-y-0.5 transition focus-ring"
            data-testid="back-home-cta"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition focus-ring"
            data-testid="explore-services-cta"
          >
            Explore Our Services
          </Link>
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground animate-fade-up" style={{ animationDelay: "0.35s" }}>
          // ACCUTEK SOLAR | THE FUTURE OF ENERGY | THANK YOU FOR CHOOSING LOCAL
        </p>
      </div>
    </section>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 grid place-items-center">
        <span className="text-[10px] font-mono font-bold text-primary">{number}</span>
      </div>
      <div>
        <div className="font-heading font-bold text-base">{title}</div>
        <p className="mt-1 text-sm text-foreground/65 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
