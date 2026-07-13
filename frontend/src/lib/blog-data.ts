/**
 * Blog post data — embedded for static export.
 */

export const PEN_NAMES = [
  "Ray Watts", "Sol Brightman", "Watt Kilowatt", "Ray D. Ation", 
  "Sunny McVoltface", "Phil O'Watt", "Art Kilowatt", "Al B. Sunny", 
  "Watt Burns", "Sol R. Panel", "Rick O'Shay Solar", "Lumen Clearsky", 
  "Amp Voltsworth", "Max Insolation", "Barry Cade", "Sonny Watt", 
  "Hugh Jouleson", "Bill Kilowatt", "Dirk Photon", "Duke Electra",
] as const;

export function getPenName(isoDate: string): string {
  const d = new Date(isoDate);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const week = Math.floor((d.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return PEN_NAMES[week % PEN_NAMES.length];
}

export const AI_DISCLAIMER = "This article has been editorially enhanced with AI assistance. Information is believed to be accurate but readers should perform their own due diligence before making any energy-related decisions.";

export interface BlogPost {
  slug: string; title: string; subtitle: string; excerpt: string; author: string; date: string; readTime: string; category: string; tags: string[]; heroImage: string; heroAlt: string; content: string; sources?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "the-rate-hike-nobody-voted-for-why-indiana-is-fighting-back-2026-07-13",
    "title": "The Rate Hike Nobody Voted For: Why Indiana is Fighting Back",
    "subtitle": "Stop paying for their grid and start building your legacy.",
    "excerpt": "With Indiana utility bills jumping 17.5% in a single year, the 'silent tax' of energy is crushing local families. Here is the Accutek plan to take your power back.",
    "author": "Ray Watts",
    "date": "2026-07-13",
    "readTime": "8 min read",
    "category": "Big Utility Wars",
    "tags": [
      "Indiana",
      "AES",
      "Duke Energy",
      "ROI"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    "heroAlt": "Solar array harvesting freedom",
    "content": "\u003ch2\u003eThe $71 Million Question\u003c/h2\u003e\n\u003cp\u003eIf you live in Indianapolis or the surrounding counties, you've likely heard the news: AES Indiana just got the green light for a \u003cstrong\u003e$71 million rate hike\u003c/strong\u003e. But here's the part they didn't put in the glossy mailers\u2014typical residential customers are going to see their monthly bills jump by about \u003cstrong\u003e$21 extra\u003c/strong\u003e by early 2027. And they aren't the only ones. Duke Energy is currently under fire from the state's ratepayer advocate for allegedly over-collecting \u003cstrong\u003e$89 million\u003c/strong\u003e from Hoosiers.\u003c/p\u003e\n\n\u003cp\u003eGovernor Mike Braun recently said what we've all been thinking: \u003cem\u003e'We can't take it anymore.'\u003c/em\u003e Over the last 12 months, Indiana electric bills surged by 17.5%\u2014the highest jump in twenty years. This isn't a market adjustment; it's an affordability crisis.\u003c/p\u003e\n\n\u003ch2\u003eWhy Solar is the Only Real Vote You Have\u003c/h2\u003e\n\u003cp\u003eYou didn't get a vote on the rate hike. You don't get a vote on when the next 'fuel adjustment charge' hits your mailbox. But you do get a vote on where your power comes from. At Accutek Solar, we look at these numbers and see one thing: the ROI on energy independence has never been higher.\u003c/p\u003e\n\n\u003cp\u003eWhen you install a ground-mount array or a Kohler backup system, you aren't just 'going green.' You are performing a financial strike against a monopoly that has grown comfortable taking your money without your consent. In 2026, the best way to fight back isn't at the ballot box\u2014it's on your roof and in your yard.\u003c/p\u003e\n\n\u003ch2\u003eFact-Checking the Freedom\u003c/h2\u003e\n\u003cul\u003e\n  \u003cli\u003e\u003cstrong\u003e100% Tax Protection:\u003c/strong\u003e Indiana's property tax exemption for solar remains 100% active. Your home value goes up, but your tax bill stays flat.\u003c/li\n  \u003cli\u003e\u003cstrong\u003eGrid Failure Protection:\u003c/strong\u003e As infrastructure ages and data centers drain the local supply, brownouts are becoming the 'new normal.' A system from Accutek ensures your lights stay on when the grid gives up.\u003c/li\n\u003c/ul\u003e\n\n\u003cp\u003eIt's time to stop being a customer and start being a producer. Let's get to work.\u003c/p\u003e",
    "sources": [
      "WFYI Indianapolis",
      "Indiana Capital Chronicle",
      "OUCC"
    ]
  },
  {
    "slug": "taking-your-power-back-how-accutek-ground-mounts-are-the-real-debt-killer-2026-07-06",
    "title": "Taking Your Power Back: How Accutek Ground Mounts are the Real Debt Killer",
    "subtitle": "For Indiana and Illinois farmers, solar is the new cash crop.",
    "excerpt": "Illinois SREC rates just jumped 40%. Indiana property tax exemptions are locked. Why waiting for a 'perfect' time is costing you thousands in interest.",
    "author": "Al B. Sunny",
    "date": "2026-07-06",
    "readTime": "10 min read",
    "category": "Agricultural Solar",
    "tags": [
      "Farming",
      "ROI",
      "SREC",
      "REAP"
    ],
    "heroImage": "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    "heroAlt": "Ground mount array in field",
    "content": "\u003ch2\u003eHarvesting the Sun, Killing the Debt\u003c/h2\u003e\n\u003cp\u003eFor Indiana and Illinois farmers, the 2026 economic landscape is shifting fast. Input costs are up, equipment is expensive, and operational debt is a constant weight. But there is a silent partner in your operation that's taking a bigger cut every year: your utility provider.\u003c/p\u003e\n\n\u003cp\u003eLast week, we saw \u003cstrong\u003eIllinois Shines SREC rates jump by 34-43%\u003c/strong\u003e. That means for every megawatt-hour your system produces, the state is essentially writing you a bonus check that's nearly 40% larger than it was last year. For an agricultural operation with the space for a massive ground-mount array, the math is undeniable: solar is now one of the highest-yielding crops you can plant.\u003c/p\u003e\n\n\u003ch2\u003eThe REAP Gap and Why It Doesn't Matter\u003c/h2\u003e\n\u003cp\u003eThe USDA has temporarily paused REAP grant awards while they rewrite regulations, but the \u003cstrong\u003eGuaranteed Loan Program\u003c/strong\u003e is still wide open. Waiting for a 'free grant' that might be delayed is a losing strategy when your electric bill is rising by 17% a year. If you can lock in today's hardware prices and today's SREC rates, the system pays for itself in under 10 years, leaving you with 20+ years of pure profit.\u003c/p\u003e\n\n\u003ch2\u003eProfessional Build vs. Consumer Kits\u003c/h2\u003e\n\u003cp\u003eSeth and the crew have seen it a thousand times: a farmer buys a cheap kit online, only to have the racking fail in a 60mph wind or the inverter fry during a summer heatwave. Accutek builds for the field. We use industrial-grade LiFePO4 batteries and cast-aluminum mounts that are engineered for the Midwest. We don't do 'cheap'\u2014we do 'durable.'\u003c/p\u003e\n\n\u003cp\u003eYour power bill is a debt you've been paying for life. It's time to settle it once and for all.\u003c/p\u003e",
    "sources": [
      "Illinois Power Agency",
      "USDA Rural Development",
      "NREL"
    ]
  },
  {
    "slug": "homegrown-watts-inside-americas-solar-manufacturing-boom",
    "title": "Homegrown Watts: Inside America's Solar Manufacturing Boom",
    "subtitle": "From 8 gigawatts to 60 \u2014 and why your next panels might have a shorter commute",
    "excerpt": "U.S. solar manufacturing capacity has exploded 700% since the IRA passed. Meanwhile, tariffs on Southeast Asian imports are hitting triple digits. Here's what the reshuffled supply chain means for Indiana and Illinois homeowners shopping for panels in 2026.",
    "author": "Ray Watts",
    "date": "2026-05-25",
    "readTime": "6 min read",
    "category": "Industry News",
    "tags": [
      "manufacturing",
      "tariffs",
      "trade policy",
      "supply chain", 
      "pricing",
      "Made in USA"
    ],
    "heroImage": "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026q=85\u0026w=1600",
    "heroAlt": "Solar panels being manufactured in a modern factory setting",
    "content": "\u003cp\u003eSomething remarkable has happened to American solar manufacturing, and most homeowners have no idea. Three years ago, the U.S. could barely produce enough solar panels to cover a midsized utility project. Today, domestic factories can churn out over 60 gigawatts of modules per year \u2014 a 700% increase since the Inflation Reduction Act landed in 2022.\u003c/p\u003e\u003ch2\u003eThe Factory Floor Scoreboard\u003c/h2\u003e\u003cp\u003eThe numbers are staggering. U.S. solar module production capacity jumped from roughly 8 GW per year before the IRA to over 60 GW by late 2025...\u003c/p\u003e",
    "sources": [
      "SEIA",
      "U.S. Commerce Department",
      "EnergySage"
    ]
  }
];

export function getBlogPost(slug: string) { return BLOG_POSTS.find((p) => p.slug === slug); }
export function getAllBlogPosts() { return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); }
export function getBlogCategories() { return [...new Set(BLOG_POSTS.map((p) => p.category))]; }
