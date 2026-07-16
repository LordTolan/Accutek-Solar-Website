import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageSquare, Calendar } from "lucide-react";

export default function ThankYouPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto container-px max-w-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary grid place-items-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-balance">Estimate Request Received.</h1>
        <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
          Thanks for reaching out, Clint. We&#39;ve received your details and our team is already reviewing your site profile.
        </p>

        <div className="mt-12 grid gap-4 text-left">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">What happens next?</div>
                <p className="mt-1 text-sm text-foreground/60 leading-relaxed">
                  Seth or one of our lead techs will call you within 24 business hours to discuss your goals and schedule a physical site assessment.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">Want to skip the wait?</div>
                <p className="mt-1 text-sm text-foreground/60 leading-relaxed">
                  You can use our online booking tool to put a site visit directly on our calendar right now.
                </p>
                <a href="#" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  Go to Online Booking ->
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-foreground/50 italic">
            As a family business serving West Central Indiana and East Central Illinois since 1994, every customer matters deeply to us. We promise to treat your home like our own and earn your trust at every step.
          </p>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-foreground/70 hover:text-primary transition">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
