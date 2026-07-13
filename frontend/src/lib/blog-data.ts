/**
 * Blog post data — embedded for static export.
 *
 * New posts are added here via automated PRs (weekly AI-generated content).
 * Each post is fact-checked before merge.
 */

/**
 * Rotating pen names for blog authorship.
 * Each week's post gets the next name in the list (index by week number % length).
 */
export const PEN_NAMES = [
  "Ray Watts",
  "Sol Brightman",
  "Watt Kilowatt",
  "Ray D. Ation",
  "Sunny McVoltface",
  "Phil O'Watt",
  "Art Kilowatt",
  "Al B. Sunny",
  "Watt Burns",
  "Sol R. Panel",
  "Rick O'Shay Solar",
  "Lumen Clearsky",
  "Amp Voltsworth",
  "Max Insolation",
  "Barry Cade",
  "Sonny Watt",
  "Hugh Jouleson",
  "Bill Kilowatt",
  "Dirk Photon",
  "Duke Electra",
] as const;

/** Pick a pen name for a given ISO date string (rotates weekly). */
export function getPenName(isoDate: string): string {
  const d = new Date(isoDate);
  // Week number within year (0-based)
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const week = Math.floor((d.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return PEN_NAMES[week % PEN_NAMES.length];
}

/** AI editorial disclaimer — shown at the bottom of every blog post. */
export const AI_DISCLAIMER =
  "This article has been editorially enhanced with AI assistance. Information is believed to be accurate but readers should perform their own due diligence before making any energy-related decisions.";

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  date: string;            // ISO date string (YYYY-MM-DD)
  readTime: string;        // e.g. "5 min read"
  category: string;
  tags: string[];
  heroImage: string;
  heroAlt: string;
  content: string;         // HTML content
  sources?: string[];      // fact-check sources
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "the-rate-hike-nobody-voted-for-why-indiana-is-fighting-back-2026-07-13",
    "title": "The Rate Hike Nobody Voted For: Why Indiana is Fighting Back",
    "subtitle": "Stop paying for their grid and start building your legacy.",
    "excerpt": "Viktor would have called it like it is: Big Utility is winning because you're letting them. Here is the Accutek plan for 2026-07-13.",
    "author": "Al B. Sunny",
    "date": "2026-07-13",
    "readTime": "7 min read",
    "category": "Big Utility Wars",
    "tags": [
      "freedom",
      "ROI",
      "Accutek",
      "energy independence"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Solar array harvesting freedom",
    "content": "\u003ch2>The Rate Hike Nobody Voted For: Why Indiana is Fighting Back\u003c/h2>\u003cp>For 32 years, Accutek Solar has been on the front lines in Indiana and Illinois. We don't just install panels; we build energy independence. Big Utility wants you to keep paying their rising rates, but on 2026-07-13, we are saying 'enough'...\u003c/p>",
    "sources": [
      "Accutek Internal Field Data"
    ]
  },
  {
    "slug": "how-to-pay-off-your-solar-loan-in-under-10-years-2026-07-06",
    "title": "How to Pay Off Your Solar Loan in Under 10 Years",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-07-06. We focus on durability and long-term ROI.",
    "author": "Art Kilowatt",
    "date": "2026-07-06",
    "readTime": "5 min read",
    "category": "Energy ROI",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>How to Pay Off Your Solar Loan in Under 10 Years\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-07-06, our focus is on how to pay off your solar loan in under 10 years...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "why-large-properties-prefer-field-arrays-2026-06-29",
    "title": "Why Large Properties Prefer Field Arrays",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-06-29. We focus on durability and long-term ROI.",
    "author": "Phil O'Watt",
    "date": "2026-06-29",
    "readTime": "5 min read",
    "category": "Ground Mounts",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>Why Large Properties Prefer Field Arrays\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-29, our focus is on why large properties prefer field arrays...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "managing-system-temperature-during-peak-sun-2026-06-22",
    "title": "Managing System Temperature During Peak Sun",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-06-22. We focus on durability and long-term ROI.",
    "author": "Sunny McVoltface",
    "date": "2026-06-22",
    "readTime": "5 min read",
    "category": "Summer Heat",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>Managing System Temperature During Peak Sun\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-22, our focus is on managing system temperature during peak sun...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "understanding-the-net-metering-shift-2026-06-15",
    "title": "Understanding the Net Metering Shift",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-06-15. We focus on durability and long-term ROI.",
    "author": "Ray D. Ation",
    "date": "2026-06-15",
    "readTime": "5 min read",
    "category": "Policy Update",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>Understanding the Net Metering Shift\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-15, our focus is on understanding the net metering shift...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "the-future-of-lfp-batteries-in-indiana-2026-06-08",
    "title": "The Future of LFP Batteries in Indiana",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-06-08. We focus on durability and long-term ROI.",
    "author": "Watt Kilowatt",
    "date": "2026-06-08",
    "readTime": "5 min read",
    "category": "Battery Tech",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>The Future of LFP Batteries in Indiana\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-08, our focus is on the future of lfp batteries in indiana...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "spring-cleaning-for-solar-panels-2026-06-01",
    "title": "Spring Cleaning for Solar Panels",
    "subtitle": "Professional solar insights from the Accutek team.",
    "excerpt": "Our latest field observations for 2026-06-01. We focus on durability and long-term ROI.",
    "author": "Sol Brightman",
    "date": "2026-06-01",
    "readTime": "5 min read",
    "category": "Maintenance 101",
    "tags": [
      "solar",
      "ROI",
      "Accutek"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Accutek Solar Site",
    "content": "\u003ch2>Spring Cleaning for Solar Panels\u003c/h2>\u003cp>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-01, our focus is on spring cleaning for solar panels...\u003c/p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    slug: "homegrown-watts-inside-americas-solar-manufacturing-boom",
    title: "Homegrown Watts: Inside America's Solar Manufacturing Boom",
    subtitle: "From 8 gigawatts to 60 — and why your next panels might have a shorter commute",
    excerpt:
      "U.S. solar manufacturing capacity has exploded 700% since the IRA passed. Meanwhile, tariffs on Southeast Asian imports are hitting triple digits. Here's what the reshuffled supply chain means for Indiana and Illinois homeowners shopping for panels in 2026.",
    author: "Ray Watts",
    date: "2026-05-25",
    readTime: "6 min read",
    category: "Industry News",
    tags: ["manufacturing", "tariffs", "trade policy", "supply chain", "pricing", "Made in USA"],
    heroImage:
      "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Solar panels being manufactured in a modern factory setting",
    content: `
\u003cp\u003eSomething remarkable has happened to American solar manufacturing, and most homeowners have no idea. Three years ago, the U.S. could barely produce enough solar panels to cover a midsized utility project. Today, domestic factories can churn out over 60 gigawatts of modules per year — a 700% increase since the Inflation Reduction Act landed in 2022. If your last set of panels came from a factory in Southeast Asia, your next ones might come from Georgia, Ohio, or Alabama. Here's what's driving the shift and what it means for your wallet.\u003c/p\u003e

\u003ch2\u003eThe Factory Floor Scoreboard\u003c/h2\u003e
\u003cp\u003eThe numbers are staggering. U.S. solar module production capacity jumped from roughly \u003cstrong\u003e8 GW per year\u003c/strong\u003e before the IRA to over \u003cstrong\u003e60 GW by late 2025\u003c/strong\u003e, according to the Solar Energy Industries Association. Solar cell production — the heart of each panel — saw a \u003cstrong\u003e300% increase\u003c/strong\u003e over the same period. For context, the entire U.S. installed about 40 GW of solar in 2025. Domestic factories can now theoretically supply more panels than the country installs.\u003c/p\u003e
\u003cp\u003eThe headliners tell the story:\u003c/p\u003e
\u003cul\u003e
  \u003cli\u003e\u003cstrong\u003eFirst Solar\u003c/strong\u003e opened a $1.1 billion factory in Alabama in late 2024, adding 3.5 GW of annual thin-film capacity. Combined with its Ohio and Louisiana plants, First Solar's U.S. output is on track to hit \u003cstrong\u003e14 GW by end of 2026\u003c/strong\u003e — making it the largest domestic solar manufacturer by a wide margin.\u003c/li\u003e
  \u003cli\u003e\u003cstrong\u003eQcells (Hanwha)\u003c/strong\u003e ramped its Dalton, Georgia plant past 3 GW annually and broke ground on a \u003cstrong\u003e$2.5 billion complex in Cartersville, GA\u003c/strong\u003e that will integrate the entire supply chain — ingots, wafers, cells, and finished modules — under one roof. That's nearly unheard of outside China.\u003c/li\u003e
  \u003cli\u003e\u003cstrong\u003eCorning\u003c/strong\u003e entered the game with a solar manufacturing hub in Michigan, targeting up to 15% of the U.S. wafer market.\u003c/li\u003e
\u003c/ul\u003e
\u003cp\u003eThese aren't press releases and renderings. These are real factories, hiring real workers, shipping real panels.\u003c/p\u003e

\u003ch2\u003eWhy Now? The Tariff Wall Is Real\u003c/h2\u003e
\u003cp\u003eThe manufacturing boom didn't happen in a vacuum. It's riding a wave of trade policy that has made importing cheap panels from Southeast Asia — the industry's go-to supply chain for a decade — dramatically more expensive.\u003c/p\u003e
\u003cp\u003eIn April 2025, the U.S. Commerce Department finalized anti-dumping and countervailing duty rates on crystalline solar cells and modules from Vietnam, Malaysia, Thailand, and Cambodia. The numbers are eye-watering:\u003c/p\u003e
\u003cul\u003e
  \u003cli\u003e\u003cstrong\u003eCambodia:\u003c/strong\u003e countervailing duties up to 534%, anti-dumping duties of 117%\u003c/li\n  \u003cli\u003e\u003cstrong\u003eVietnam:\u003c/strong\u003e anti-dumping duties of 271%, countervailing duties of 125%\u003c/li\n  \u003cli\u003e\u003cstrong\u003eThailand:\u003c/strong\u003e anti-dumping duties of 111%, countervailing duties of 264%\u003c/li\n  \u003cli\u003e\u003cstrong\u003eMalaysia:\u003c/strong\u003e countervailing duties of 32%, anti-dumping duties of about 2%\u003c/li\n\u003c/ul\u003e
\u003cp\u003eThese stack on top of existing Section 201 safeguard tariffs and reciprocal tariffs ranging from 24% to 49% depending on the country. The practical effect? Panels that used to arrive from a Vietnamese factory at rock-bottom prices now carry duty loads that can double or triple the landed cost. The era of 15-cent imported modules is over for the U.S. market.\u003c/p\u003e

\u003ch2\u003eWhat This Means for Panel Prices\u003c/h2\u003e
\u003cp\u003eHere's the part that actually affects your quote. As of Q1 2026, U.S. solar module pricing looks like this:\u003c/p\u003e
\u003cul\u003e
  \u003cli\u003e\u003cstrong\u003eImported modules\u003c/strong\u003e (not subject to the harshest penalties): ~$0.265 per watt\u003c/li\n  \u003cli\u003e\u003cstrong\u003eU.S.-assembled modules with imported cells:\u003c/strong\u003e ~$0.36 per watt\u003c/li\n  \u003cli\u003e\u003cstrong\u003eFully U.S.-made modules (domestic cells):\u003c/strong\u003e ~$0.46 per watt\u003c/li\n\u003c/ul\u003e
\u003cp\u003eThat's a meaningful spread. On an 8 kW residential system, the module cost difference between imported and fully domestic panels is roughly \u003cstrong\u003e$1,500–$1,600\u003c/strong\u003e. The median installed system price nationally sits at about \u003cstrong\u003e$2.58 per watt\u003c/strong\u003e before incentives, per EnergySage — which translates to around $20,600 for an 8 kW system. Modules are one piece of that cost (the rest is inverters, racking, labor, permitting, and overhead), but they're the piece most affected by trade policy.\u003c/p\u003e
\u003cp\u003eThe good news: as domestic production scales up and factories hit full capacity through 2026 and 2027, competition among U.S. manufacturers should put downward pressure on that $0.46 premium. More supply, same demand — economics still works even when trade policy gets weird.\u003c/p\u003e



\u003ch2\u003eWhat Indiana and Illinois Homeowners Should Know\u003c/h2\u003e
\u003cp\u003eFor folks in our service area, here's the practical takeaway:\u003c/p\u003e
\u003cul\u003e
  \u003cli\u003e\u003cstrong\u003ePanel selection matters more than it used to.\u003c/strong\u003e Ask your installer where the panels are made and what certifications they carry. U.S.-manufactured panels from First Solar, Qcells, and others come with domestic warranty support and shorter supply chains — that means faster replacements if something ever goes wrong.\u003c/li\n  \u003cli\u003e\u003cstrong\u003eDon't chase the cheapest module.\u003c/strong\u003e A panel with questionable tariff status or fly-by-night warranty isn't a deal — it's a liability on your roof for 25 years. We've always used established, bankable manufacturers, and the domestic boom gives us more options, not fewer.\u003c/li\n  \u003cli\u003e\u003cstrong\u003ePricing has stabilized, not skyrocketed.\u003c/strong\u003e Despite all the tariff drama, installed residential solar costs in the Midwest remain in the \u003cstrong\u003e$2.50–$3.80 per watt\u003c/strong\u003e range. The tariff costs are mostly absorbed at the utility scale; residential installers have been pivoting to domestic and tariff-exempt supply lines.\u003c/li\n  \u003cli\u003e\u003cstrong\u003eTiming still favors action.\u003c/strong\u003e State-level incentives (Illinois Shines, Indiana's sales tax exemption) remain in effect, and equipment pricing has stabilized. Panels installed today lock in today's economics for 25–30 years.\u003c/li\n\u003c/ul\u003e

\u003ch2\u003eThe Bottom Line\u003c/h2\u003e
\u003cp\u003eAmerican solar manufacturing has gone from afterthought to powerhouse in three years. Billions of dollars in factories are producing panels right here in the U.S., and the trade barriers that once protected cheap imports now redirect demand toward domestic products. For Indiana and Illinois homeowners, the shift means better warranty coverage, more reliable supply, and a domestic industry that's finally competing on capacity — not just policy. The panels may cost a touch more than the rock-bottom imports of 2023, but they'll be made by companies with U.S. addresses, U.S. service teams, and a vested interest in keeping your system running for decades. That's a trade we're happy to make.\u003c/p\u003e
`,
    sources: [
      "Solar Energy Industries Association — U.S. Solar Manufacturing Capacity Report 2025 (seia.org)",
      "U.S. Commerce Department — Final AD/CVD Rates on Solar Cells and Modules from SE Asia, April 2025 (commerce.gov)",
      "pv magazine USA — U.S. Solar Module Prices Face Upward Pressure, Q1 2026 (pv-magazine-usa.com)",
      "First Solar — Q3 2025 Earnings Report and Manufacturing Expansion (firstsolar.com)",
      "Hanwha Qcells — Cartersville, GA Solar Manufacturing Complex Announcement (qcells.com)",
      "EnergySage — Solar Panel Cost Guide 2026 (energysage.com)",
      "Sidley Austin — The One Big Beautiful Bill Act: Navigating the New Energy Landscape (sidley.com)",
    ],
  },
  // ... (rest of older posts)
];

/** Helper: get a single post by slug */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Helper: get all posts sorted by date (newest first) */
export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Helper: get unique categories */
export function getBlogCategories(): string[] {
  return [...new Set(BLOG_POSTS.map((p) => p.category))];
}
