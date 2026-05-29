import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin, Wrench, ShieldCheck, Heart } from "lucide-react";
import TeamMemberCard from "@/components/TeamMemberCard";
import { HCP_BOOK_URL } from "@/lib/utils";

const STORY_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";
const TEAM_BG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

const TEAM = [
  {
    name: "Keith Davis",
    role: "Founder",
    slug: "keith-davis",
    bio: "Founded Accutek in 1994. Three decades of electrical and solar work across Indiana and Illinois — the name on the building.",
  },
  {
    name: "Seth Davis",
    role: "Owner / Operator",
    slug: "seth-davis",
    bio: "Carries the 30+ years of Davis-family solar know-how. Designs every system from monthly bill to mounting plan.",
  },
  {
    name: "Quill Davis",
    role: "Owner / Operator",
    slug: "quill",
    bio: "Manages field operations and keeps the crews running. Handles logistics, service calls, and the hands-on side of every project.",
  },
  {
    name: "Clint Lenover",
    role: "Solar Technician",
    slug: "clint-lenover",
    bio: "On roofs, on racks, pulling wire — Clint's in the field getting systems installed and running right.",
  },
  {
    name: "Colt",
    role: "Lead Solar Technician",
    slug: "colt",
    bio: "Leads field crews on roof, ground-mount and pole-mount installs across Indiana and Illinois.",
  },
  {
    name: "AJ (\"Scruff\")",
    role: "Solar Technician",
    slug: "aj",
    bio: "On the truck, on the roof, in the field - wherever the work is. Goes by Scruff around the shop.",
  },
];

const VALUES = [
  { icon: Heart, title: "Family-owned", body: "Founded by Keith Davis in 1994. Same name on the truck, same hands on the wrench, three decades later." },
  { icon: ShieldCheck, title: "Lifetime support", body: "Every install gets lifetime support from the team that built it. Not a 1-800 number, not a chatbot." },
  { icon: Wrench, title: "Built local", body: "Roof, ground or pole - we engineer for your specific site, your climate, your budget. No cookie-cutter kits." },
  { icon: MapPin, title: "Real coverage", body: "17 counties across Indiana and Illinois. Headquartered in Clinton, IN. Trucks rolling daily." },
];

export const metadata = {
  title: "About Accutek Solar - Family-Owned Since 1994",
  description: "Meet the Accutek Solar team. Family-owned solar and electrical contractor serving Indiana and Illinois for over 32 years.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border" data-testid="about-hero">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" aria-hidden="true" />
        <div className="relative container mx-auto container-px py-20 md:py-28 max-w-6xl grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// ABOUT ACCUTEK</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-balance leading-[1.05]" data-testid="about-title">
              32 years of pulling wire - and tilting it <span className="text-primary">toward the sun.</span>
            </h1>
            <div className="mt-6 space-y-5 text-foreground/80 text-lg leading-relaxed">
              <p>Accutek Solar was founded in 1994 by Keith Davis in Clinton, Indiana. What started as a small electrical-installation shop is today a full-service solar, ground-mount, generator and electrical contractor serving 17 counties across Indiana and Illinois.</p>
              <p>We're family-owned, environmentally conscious, and proud of both. Our mission is simple: deliver the most cost-effective energy solutions for our customers - from a single PV panel for a cabin to a fully off-grid farmstead with Kohler standby power.</p>
              <p>Every install is performed by our own team. Every system is supported for life. That's how we've kept neighbors as customers for three decades.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="about-cta-quote">
                Work with us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring" data-testid="about-cta-book">
                <CalendarClock className="w-4 h-4" /> Book a site visit
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-ambient-lg">
              <Image src={STORY_IMG} alt="Accutek Solar technician installing panels" fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background/95 via-background/70 to-transparent">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary">// EST. 1994</div>
                <div className="mt-1 font-heading text-2xl font-extrabold">A family business with a family of customers.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24" data-testid="about-values">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// HOW WE WORK</div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-balance">
            Four things we never compromise on.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-6 hover:border-primary hover:shadow-green-glow transition" data-testid={`value-card-${i}`}>
                <div className="w-11 h-11 rounded-md bg-primary/10 text-primary grid place-items-center mb-4">
                  <v.icon className="w-5 h-5" />
                </div>
                <div className="font-heading text-lg font-bold">{v.title}</div>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 relative overflow-hidden" data-testid="about-team">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <Image src={TEAM_BG} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// THE TEAM</div>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-balance">
                Real people on the truck. <span className="text-primary">Real people on the phone.</span>
              </h2>
            </div>
            <p className="max-w-md text-foreground/70 leading-relaxed">
              You won't be passed around. You'll get the same names, same crew, same shop - every call, every install, every service visit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-5" data-testid="team-grid">
            {TEAM.map((m, i) => (
              <TeamMemberCard key={m.slug} index={i} {...m} />
            ))}
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground text-center">
            // THE CREW THAT SHOWS UP TO YOUR JOB SITE
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden" data-testid="about-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">// READY TO TALK?</div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-balance">
            Let's design a system <span className="text-primary">that fits your site.</span>
          </h2>
          <p className="mt-4 text-foreground/70 text-lg">Free estimate, no pressure, roof or ground - your call.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="about-final-cta-quote">
              Get free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring" data-testid="about-final-cta-book">
              <CalendarClock className="w-4 h-4" /> Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
