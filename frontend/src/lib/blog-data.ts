/**
 * Blog post data — embedded for static export.
 *
 * New posts are added here via automated PRs (weekly AI-generated content).
 * Each post is fact-checked before merge.
 */

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
    slug: "indiana-net-metering-2026-what-homeowners-need-to-know",
    title: "Indiana Net Metering in 2026: What Homeowners Need to Know",
    subtitle: "Your meter can spin backward — here's how to make the most of it",
    excerpt:
      "Indiana's net metering policy lets solar homeowners bank excess energy as credits. Here's exactly how it works, what the current rules are, and why acting sooner is smarter than later.",
    author: "Accutek Solar",
    date: "2026-05-24",
    readTime: "6 min read",
    category: "Solar Policy",
    tags: ["net metering", "Indiana", "policy", "savings"],
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Solar panels on a sunny Indiana field",
    content: `
<p>If you've ever watched your electric meter and wished it could run backward, solar net metering is basically that dream — with paperwork. Indiana's net metering rules allow residential solar owners to send excess electricity back to the grid and receive bill credits in return. It's one of the strongest financial reasons to go solar in the Hoosier State, and in 2026, the rules are still on your side — for now.</p>

<h2>How Net Metering Actually Works</h2>
<p>When your solar panels produce more electricity than your home uses — say, on a bright July afternoon when you're at work — that surplus flows into the utility grid. Your meter literally tracks the energy going out, and your utility credits you for it. Those credits offset the electricity you pull from the grid at night or on cloudy days.</p>
<p>Think of it like a savings account for sunshine. You deposit kilowatt-hours during the day and withdraw them when the sun's off the clock.</p>

<h2>Indiana's Current Net Metering Rules</h2>
<p>Under Indiana's SEA 309 (signed into law in 2017), the state's net metering landscape has been transitioning. Here's where things stand in 2026:</p>
<ul>
  <li><strong>Existing systems installed before July 1, 2022</strong> are grandfathered into full 1:1 retail-rate net metering for 30 years from their interconnection date.</li>
  <li><strong>Systems installed after July 1, 2022</strong> receive credits at approximately 125% of the average wholesale rate — still a meaningful credit, but less than full retail.</li>
  <li><strong>System size cap:</strong> Net metering is available for systems up to 1 MW for residential and commercial customers.</li>
  <li><strong>Monthly excess:</strong> Credits roll over month to month, which is great for banking summer overproduction against winter usage.</li>
</ul>

<h2>Why "Sooner" Beats "Later"</h2>
<p>Indiana's net metering compensation structure could change again. Utilities continue to lobby for lower credit rates, arguing that solar customers shift grid maintenance costs to non-solar neighbors. Whether you agree with that framing or not, the trend nationwide has been toward reduced net metering compensation over time.</p>
<p>The takeaway? If you're considering solar, locking in today's rate structure is a hedge against future policy changes. Every year you wait is a year of credits you don't earn.</p>

<h2>Pair Net Metering With the Right System Design</h2>
<p>Net metering works best when your system is sized to roughly match your annual electricity consumption. Oversizing means you produce credits you might not fully use (Indiana utilities don't write you a check for annual excess). Undersizing means you're still buying more grid power than necessary.</p>
<p>At Accutek Solar, we pull your last 12 months of utility data and design a system that hits the sweet spot — maximum offset, minimum waste. Ground-mount, roof-mount, or pole-mount — we engineer the layout for your site and your usage pattern.</p>

<h2>The Bottom Line</h2>
<p>Indiana net metering remains one of the best financial tools for solar homeowners in 2026. The credits are real, the math works, and the policy — while evolving — still rewards early adopters. If you've been on the fence, this is the year your electric bill starts working for you instead of against you.</p>
`,
    sources: [
      "Indiana SEA 309 (2017) — Indiana General Assembly",
      "Indiana Utility Regulatory Commission (IURC) net metering orders",
      "DSIRE — Database of State Incentives for Renewables & Efficiency (dsireusa.org)",
    ],
  },
  {
    slug: "ground-mount-vs-roof-mount-solar-which-is-right-for-your-property",
    title: "Ground-Mount vs. Roof-Mount Solar: Which Is Right for Your Property?",
    subtitle: "Spoiler: it depends on your yard, your roof, and your tolerance for ladders",
    excerpt:
      "Choosing between ground-mount and roof-mount solar isn't just about aesthetics — it's about energy output, maintenance access, and long-term ROI. Here's a no-nonsense comparison.",
    author: "Accutek Solar",
    date: "2026-05-17",
    readTime: "7 min read",
    category: "Solar 101",
    tags: ["ground mount", "roof mount", "installation", "comparison"],
    heroImage:
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Roof-mounted solar panel array on a residential home",
    content: `
<p>When folks call us about going solar, one of the first questions is: "Does it go on the roof or in the yard?" The honest answer is "yes" — and which one's right for you depends on a few key factors. After 32 years of installing both, here's our no-spin breakdown.</p>

<h2>Roof-Mount: The Classic Choice</h2>
<p>Roof-mounted solar is what most people picture when they think "solar panels." Panels go on your existing roof structure, using racking systems that attach to your rafters. It's the most common residential installation type in the U.S.</p>
<h3>Pros</h3>
<ul>
  <li><strong>Lower installation cost:</strong> No foundation work — your roof is the structure. Typically 10–20% cheaper than ground-mount for the same system size.</li>
  <li><strong>No yard space needed:</strong> Perfect for suburban lots where every square foot of lawn counts.</li>
  <li><strong>Out of the way:</strong> Panels are up high and unobtrusive (your HOA may still have opinions, though Indiana law limits HOA solar restrictions).</li>
</ul>
<h3>Cons</h3>
<ul>
  <li><strong>Roof condition matters:</strong> If your roof needs replacing in the next 10 years, you'll want to do that first — or plan to remove and reinstall panels later.</li>
  <li><strong>Orientation is fixed:</strong> You're stuck with whatever direction your roof faces. South-facing is ideal; east/west is workable; north-facing is a dealbreaker.</li>
  <li><strong>Maintenance access:</strong> Cleaning panels or troubleshooting means getting on the roof. It's not dangerous with proper equipment, but it's less convenient.</li>
  <li><strong>Shading:</strong> Trees, chimneys, and neighboring structures can reduce output on specific roof sections.</li>
</ul>

<h2>Ground-Mount: The Premium Play</h2>
<p>Ground-mount arrays sit on steel or aluminum racks anchored into the ground — either with concrete piers, driven posts, or helical piles. They're common on rural properties, farms, and larger lots.</p>
<h3>Pros</h3>
<ul>
  <li><strong>Optimal orientation and tilt:</strong> We set the exact angle and direction for maximum energy harvest. No compromising with roof geometry.</li>
  <li><strong>Easy maintenance:</strong> Everything is at waist-to-shoulder height. Cleaning, inspections, and repairs are straightforward.</li>
  <li><strong>No roof dependency:</strong> Your roof age, condition, and material don't matter.</li>
  <li><strong>Scalability:</strong> Easier to expand if your energy needs grow — just extend the racking.</li>
</ul>
<h3>Cons</h3>
<ul>
  <li><strong>Higher upfront cost:</strong> Foundation, racking, and trenching for buried conduit add 10–20% compared to roof-mount.</li>
  <li><strong>Uses yard space:</strong> A typical 8 kW residential system needs roughly 400–500 sq ft of ground area.</li>
  <li><strong>Permitting:</strong> Some counties require setback compliance and additional permits for ground structures.</li>
</ul>

<h2>The Third Option: Pole-Mount</h2>
<p>Pole-mount systems sit on a single steel pole with a top-of-pole rack. Some include single-axis or dual-axis sun trackers that follow the sun across the sky, boosting output by 15–25% compared to fixed arrays. They're ideal for rural properties with open acreage.</p>

<h2>How We Help You Decide</h2>
<p>At Accutek Solar, roughly half of our residential installs are ground-mount — which is unusually high for the industry and reflects our rural Indiana and Illinois service area. We don't push one type over another. During your free site visit, we evaluate your roof condition, yard space, shading, soil type, and electrical panel location. Then we design whichever option delivers the best long-term ROI for your specific property.</p>

<h2>The Verdict</h2>
<p>There's no universal "better" — there's only what's better for <em>your</em> site. Tight suburban lot with a south-facing roof in good shape? Roof-mount. Rural property with open acreage and a 30-year-old roof? Ground-mount all day. Either way, the sun doesn't care where the panels are — it just keeps showing up.</p>
`,
    sources: [
      "EnergySage — Ground-Mounted Solar Panels: Costs, Pros & Cons (energysage.com)",
      "SEIA — Solar Installation Types (seia.org)",
      "Indiana Code IC 32-21-14 — Solar easements and HOA restrictions",
    ],
  },
  {
    slug: "battery-storage-101-is-a-home-battery-worth-it-in-2026",
    title: "Battery Storage 101: Is a Home Battery Worth It in 2026?",
    subtitle: "Blackout insurance, bill optimizer, or expensive paperweight? Let's do the math.",
    excerpt:
      "Home batteries are getting cheaper and smarter, but are they worth the investment for Indiana and Illinois homeowners? We break down the costs, use cases, and when they actually make sense.",
    author: "Accutek Solar",
    date: "2026-05-10",
    readTime: "8 min read",
    category: "Technology",
    tags: ["battery storage", "backup power", "technology", "ROI"],
    heroImage:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Modern home battery storage system mounted on a garage wall",
    content: `
<p>Home batteries have gone from Silicon Valley novelty to mainstream conversation in about five years. Tesla Powerwalls, Enphase IQ Batteries, Franklin WH — the options are multiplying and the prices are dropping. But the question we get most from Indiana and Illinois homeowners isn't "which battery?" It's "do I even need one?" Fair question. Let's dig in.</p>

<h2>What a Home Battery Actually Does</h2>
<p>A home battery stores electricity — either from your solar panels or from the grid — and releases it when you need it. That's it. The magic is in <em>when</em> it stores and releases, which creates three main use cases:</p>
<ol>
  <li><strong>Backup power during outages:</strong> When the grid goes down, your battery kicks in to keep critical loads running — lights, fridge, internet, medical equipment. Most batteries can power essential circuits for 8–12 hours.</li>
  <li><strong>Solar self-consumption:</strong> Instead of sending excess solar to the grid for net metering credits, you store it and use it yourself at night. This is most valuable in states where net metering credits are less than retail rate.</li>
  <li><strong>Time-of-use arbitrage:</strong> In areas with time-of-use (TOU) electricity pricing, you charge the battery when rates are cheap and discharge when rates are expensive. Indiana doesn't widely use TOU rates yet, so this is more relevant in Illinois.</li>
</ol>

<h2>The Real Costs in 2026</h2>
<p>Battery prices have dropped significantly, but they're still a meaningful investment:</p>
<ul>
  <li><strong>Installed cost:</strong> A typical 10–13.5 kWh battery system runs $8,000–$14,000 installed, depending on the brand and complexity of the installation.</li>
  <li><strong>Lifespan:</strong> Most lithium-iron-phosphate (LFP) batteries are warrantied for 10–15 years or a set number of cycles (typically 4,000–6,000 full cycles).</li>
  <li><strong>Maintenance:</strong> Essentially zero. Batteries are solid-state with no moving parts.</li>
</ul>

<h2>When a Battery Makes Sense in Indiana/Illinois</h2>
<p>Here's our honest take on who benefits most:</p>
<ul>
  <li><strong>Frequent outage areas:</strong> If you're in a rural area where ice storms or wind events knock out power multiple times per year, backup power has real value — both for comfort and for protecting a freezer full of food.</li>
  <li><strong>Medical equipment needs:</strong> If someone in the household depends on powered medical devices, battery backup isn't a luxury — it's a safety measure.</li>
  <li><strong>Off-grid systems:</strong> If you're fully off-grid, batteries aren't optional — they're the whole deal. Combined with a generator for extended cloudy periods, batteries are your primary power storage.</li>
  <li><strong>Illinois TOU customers:</strong> If your Illinois utility offers time-of-use rates with significant peak/off-peak spread, arbitrage can shorten your payback period.</li>
</ul>

<h2>When a Battery Might Not Be Worth It (Yet)</h2>
<p>For grid-tied Indiana homes with net metering and reliable power, the pure financial math on a battery is often tight. Net metering effectively uses the grid as a free battery — you export during the day and import at night. Adding a physical battery to this equation can double your solar investment without doubling your savings.</p>
<p>That said, battery economics are improving every year. Prices dropped roughly 20% between 2024 and 2026, and that trend is expected to continue as manufacturing scales up globally.</p>

<h2>Batteries vs. Generators</h2>
<p>We install both Kohler generators and battery systems, so we don't have a horse in this race. Here's the quick comparison:</p>
<ul>
  <li><strong>Generators</strong> provide unlimited runtime (as long as you have fuel), whole-home coverage, and lower upfront cost ($5,000–$12,000 installed for a Kohler standby unit). They do require fuel, maintenance, and produce noise and emissions.</li>
  <li><strong>Batteries</strong> are silent, maintenance-free, and work seamlessly with solar. But they have limited capacity and higher cost per kWh of backup.</li>
  <li><strong>Hybrid approach:</strong> Many of our customers pair a smaller battery for instant switchover with a generator for extended outages. Belt and suspenders — works great.</li>
</ul>

<h2>The Bottom Line</h2>
<p>A home battery is worth it in 2026 if you have a specific need it solves — outage protection, medical power, off-grid living, or TOU optimization. If you're grid-tied with solid net metering and reliable power, you might want to wait a year or two for prices to drop further. Either way, we'll run the numbers for your specific situation during a free consultation — no sales pressure, just math.</p>
`,
    sources: [
      "NREL — Cost Projections for Utility-Scale Battery Storage (nrel.gov)",
      "EnergySage — Home Battery Cost Guide 2025-2026 (energysage.com)",
      "Kohler Power — Standby Generator Sizing Guide (kohlerpower.com)",
      "BloombergNEF — Battery Pack Prices (about.bnef.com)",
    ],
  },
  {
    slug: "solar-panel-myths-busted-5-things-your-neighbor-got-wrong",
    title: "Solar Panel Myths Busted: 5 Things Your Neighbor Got Wrong",
    subtitle: "No, solar panels don't work only in Arizona. Yes, we checked.",
    excerpt:
      "From 'solar doesn't work here' to 'panels destroy your roof,' we're tackling the top five solar myths that keep popping up at Indiana barbecues. Spoiler: the sun works in the Midwest too.",
    author: "Accutek Solar",
    date: "2026-05-03",
    readTime: "5 min read",
    category: "Solar 101",
    tags: ["myths", "education", "solar basics", "FAQ"],
    heroImage:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Bright sunlight breaking through clouds over a green field",
    content: `
<p>We love our neighbors. But after 32 years in the solar business, we've heard some doozies at cookouts, church potlucks, and hardware store checkout lines. Here are five solar myths that refuse to die — and the facts that should finally put them to rest.</p>

<h2>Myth #1: "We Don't Get Enough Sun Here for Solar to Work"</h2>
<p><strong>The truth:</strong> Indiana and Illinois receive about 4.2–4.7 peak sun hours per day on an annual average basis. That's more solar resource than Germany — which was the world's top solar producer for over a decade and still generates about 10% of its electricity from solar.</p>
<p>Solar panels don't need blazing desert heat. They need <em>light</em>, and they actually perform slightly better in cooler temperatures. A crisp, clear Indiana spring day is peak solar production weather.</p>

<h2>Myth #2: "Solar Panels Will Destroy My Roof"</h2>
<p><strong>The truth:</strong> Properly installed solar panels actually <em>protect</em> the section of roof they cover from UV degradation, rain, and hail. The mounting hardware uses lag bolts sealed with flashing — the same waterproofing methods used for any roof penetration (think plumbing vents or satellite dishes).</p>
<p>The key phrase is "properly installed." This is where hiring experienced, licensed installers matters. In 32 years, we've never had a roof leak from a solar installation. Not once.</p>

<h2>Myth #3: "Solar Panels Require Constant Maintenance"</h2>
<p><strong>The truth:</strong> Modern solar panels have no moving parts and require almost zero maintenance. Rain handles most cleaning naturally. The inverter (the box that converts DC to AC power) might need attention once every 10–15 years. That's about it.</p>
<p>We recommend a visual inspection once a year — check for debris, animal nests, or shading from new tree growth. Total time: five minutes with a cup of coffee. It's the lowest-maintenance major home investment you'll ever make.</p>

<h2>Myth #4: "Solar Is Only for Rich People"</h2>
<p><strong>The truth:</strong> The cost of residential solar has dropped over 70% in the last decade. A typical 8 kW residential system in Indiana costs roughly $22,000–$30,000 before incentives. With state programs, USDA REAP grants (for rural/ag properties), and financing options, the effective cost is often significantly lower.</p>
<p>More importantly, solar is an investment that pays you back. In Indiana, a properly sized system typically pays for itself in 8–12 years through electricity savings — and the panels keep producing for 25–30+ years. That's 15–20 years of essentially free electricity after payback.</p>

<h2>Myth #5: "I Should Wait Because Solar Technology Is About to Get Way Better"</h2>
<p><strong>The truth:</strong> This one has been "true" for 20 years, and people who waited 20 years ago missed out on 20 years of savings. Solar panel efficiency has improved steadily — from about 15% to 22–24% for standard residential panels — but the gains are incremental, not revolutionary.</p>
<p>Meanwhile, every month you wait is a month of electricity you're buying instead of generating. The best time to plant a tree was 20 years ago. The second best time is now. Same goes for solar panels (which are arguably better than trees at generating electricity, though worse at providing shade for hammocks).</p>

<h2>The Real "Myth" to Watch Out For</h2>
<p>The biggest misconception isn't about the technology — it's that you need to figure everything out yourself before calling an installer. A good solar company (hi, that's us) will evaluate your property, pull your utility data, model your savings, and give you real numbers — all for free. You don't need to become a solar engineer. You just need to make the call.</p>
`,
    sources: [
      "NREL — Solar Resource Data for the United States (nrel.gov/gis)",
      "Fraunhofer ISE — Photovoltaics Report (ise.fraunhofer.de)",
      "SEIA/Wood Mackenzie — U.S. Solar Market Insight Q1 2026 (seia.org)",
      "EnergySage — Solar Panel Cost Guide (energysage.com)",
    ],
  },
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
