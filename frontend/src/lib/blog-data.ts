/**
 * Blog Data — Accutek Solar
 *
 * AI-generated, fact-checked solar blog content.
 * New posts are added weekly via automated content pipeline.
 *
 * Categories:
 *   solar-tips      — Homeowner and business tips
 *   industry-news   — Policy, market, and tech updates
 *   local-spotlight  — Indiana & Illinois specific content
 *   tech-deep-dive  — Technical explainers
 */

export type BlogCategory =
  | "solar-tips"
  | "industry-news"
  | "local-spotlight"
  | "tech-deep-dive";

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string; // ISO date string
  category: BlogCategory;
  author: string;
  authorRole?: string;
  readTime: number; // minutes
  excerpt: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
  content: string; // HTML content
  sources?: { label: string; url: string }[];
}

export const CATEGORY_META: Record<
  BlogCategory,
  { label: string; description: string; emoji: string }
> = {
  "solar-tips": {
    label: "Solar Tips",
    description: "Practical advice for homeowners and businesses going solar",
    emoji: "💡",
  },
  "industry-news": {
    label: "Industry News",
    description: "The latest in solar policy, markets, and technology",
    emoji: "📰",
  },
  "local-spotlight": {
    label: "Local Spotlight",
    description: "Solar stories from Indiana & Illinois",
    emoji: "📍",
  },
  "tech-deep-dive": {
    label: "Tech Deep Dive",
    description: "Under-the-hood looks at solar technology",
    emoji: "🔬",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "watts-new-solar-panels-hit-25-percent-efficiency",
    title: "Watts New: Commercial Solar Panels Crack 25% Efficiency",
    subtitle: "Why the efficiency race matters for your roof — and your wallet",
    date: "2026-05-24",
    category: "tech-deep-dive",
    author: "Accutek Solar",
    authorRole: "Engineering Team",
    readTime: 6,
    excerpt:
      "The solar industry just hit a milestone: mainstream commercial panels now exceed 25% efficiency. Here's what that means for Indiana and Illinois homeowners considering a system in 2026.",
    heroImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Close-up of modern high-efficiency solar panels in sunlight",
    tags: ["solar panels", "efficiency", "technology", "2026"],
    sources: [
      {
        label: "NREL Best Research-Cell Efficiency Chart",
        url: "https://www.nrel.gov/pv/cell-efficiency.html",
      },
      {
        label: "LONGi Green Energy — HJT Record",
        url: "https://www.longi.com/en/news/record-breaking/",
      },
      {
        label: "EnergySage Solar Panel Efficiency Guide",
        url: "https://www.energysage.com/solar/solar-panel-efficiency/",
      },
    ],
    content: `
      <p>If you've been watching the solar world, you might've heard the buzz: commercial solar panels — the kind we install on your roof or in your field — have officially crossed the <strong>25% efficiency threshold</strong>. That's not a lab curiosity. That's panels you can buy today.</p>

      <h2>What Does "25% Efficiency" Actually Mean?</h2>
      <p>Solar panel efficiency measures how much of the sunlight hitting a panel gets converted into usable electricity. At 25%, a standard 400-watt panel produces roughly <strong>20% more power</strong> than a typical 20%-efficient panel of the same physical size.</p>
      <p>For a real-world Indiana home with a 6 kW system, that efficiency bump can translate to <strong>1,200–1,500 additional kilowatt-hours per year</strong> — enough to run your central A/C for most of the summer.</p>

      <h2>The Technology Behind the Jump</h2>
      <p>Two key technologies are driving this leap:</p>
      <ul>
        <li><strong>N-type TOPCon cells</strong> — These use a tunneling oxide layer to reduce electron recombination at the surface. Translation: less energy lost as heat, more converted to electricity. Manufacturers like LONGi, JinkoSolar, and Trina have scaled production of TOPCon panels to the point where pricing is competitive with older PERC technology.</li>
        <li><strong>Heterojunction (HJT) cells</strong> — HJT layers amorphous silicon on crystalline silicon, creating a cell that performs exceptionally well in <em>low light and high temperatures</em>. LONGi set a world record of 27.30% for an HJT cell in late 2024, and commercial HJT panels are now shipping above 23%.</li>
      </ul>

      <h2>Why This Matters in Indiana &amp; Illinois</h2>
      <p>We don't live in Arizona. Our peak sun hours average <strong>4.2–4.7 hours per day annually</strong> (per NREL data for the Wabash Valley region). Higher-efficiency panels squeeze more energy from every hour of sunlight — which is especially valuable during our shorter winter days and overcast stretches.</p>
      <p>Practically speaking:</p>
      <ul>
        <li><strong>Smaller system footprint</strong> — Fewer panels needed to hit your target production, which helps if your roof space is limited or your ground-mount area is constrained.</li>
        <li><strong>Better return on investment</strong> — More kilowatt-hours per dollar spent means a faster payback period. At current Indiana electricity rates (~$0.14/kWh), a 25%-efficient 8 kW system can save roughly <strong>$1,600–$1,900 per year</strong>.</li>
        <li><strong>Future-proofing</strong> — Higher-efficiency panels degrade more slowly. NREL data shows N-type panels typically degrade at 0.3–0.4% per year vs. 0.5–0.7% for older PERC panels.</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>The efficiency race isn't just a spec-sheet bragging contest. For a family in Terre Haute or a farm operation in Edgar County, it means <strong>more power, less space, and better long-term economics</strong>. If you got a quote two or three years ago, it's worth getting a fresh one — the panels available today are meaningfully better.</p>
      <p>Want to see what a modern high-efficiency system looks like for your property? <strong>We'll run the numbers for free.</strong></p>
    `,
  },
  {
    slug: "indiana-net-metering-2026-what-homeowners-need-to-know",
    title: "Indiana Net Metering in 2026: What Homeowners Need to Know",
    subtitle:
      "The rules have changed — but solar still pencils out. Here's why.",
    date: "2026-05-20",
    category: "local-spotlight",
    author: "Accutek Solar",
    authorRole: "Policy & Incentives",
    readTime: 7,
    excerpt:
      "Indiana's net metering landscape has shifted since SEA 309. We break down the current rules, what credits you actually get, and why going solar in 2026 still makes financial sense.",
    heroImage:
      "https://images.unsplash.com/photo-1621431735623-95fcba6b89ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Rural Indiana farmland with clear sky — solar potential",
    tags: [
      "net metering",
      "indiana",
      "policy",
      "incentives",
      "SEA 309",
      "2026",
    ],
    sources: [
      {
        label: "Indiana SEA 309 — Net Metering Phase-Down",
        url: "https://iga.in.gov/legislative/2017/bills/senate/309",
      },
      {
        label: "Indiana Utility Regulatory Commission (IURC)",
        url: "https://www.in.gov/iurc/",
      },
      {
        label: "DSIRE — Indiana Solar Incentives",
        url: "https://www.dsireusa.org/",
      },
    ],
    content: `
      <p>If you've looked into solar in Indiana any time in the last few years, you've probably heard the phrase "net metering is going away." Let's set the record straight on where things <em>actually</em> stand in 2026.</p>

      <h2>A Quick History: SEA 309</h2>
      <p>In 2017, Indiana passed <strong>Senate Enrolled Act 309</strong>, which began phasing down the state's original 1:1 net metering policy. Under the old rules, every kilowatt-hour (kWh) you sent back to the grid earned you a full retail credit — the same rate you'd pay to buy it.</p>
      <p>SEA 309 set a timeline:</p>
      <ul>
        <li><strong>Systems installed before July 1, 2022</strong> — Grandfathered at 1:1 retail net metering until 2032.</li>
        <li><strong>Systems installed after July 1, 2022</strong> — Utilities were allowed to file new "distributed generation" rate structures with the Indiana Utility Regulatory Commission (IURC).</li>
      </ul>
      <p>As of 2026, most Indiana investor-owned utilities (Duke Energy Indiana, Indiana Michigan Power, Indianapolis Power & Light) now offer <strong>excess distributed generation (EDG) credits</strong> rather than full 1:1 net metering for new installations.</p>

      <h2>What Does That Mean for Your Bill?</h2>
      <p>Under EDG, the credit you receive for excess solar sent to the grid is typically set at or near the utility's <strong>avoided cost rate</strong> — which is lower than the full retail rate. Depending on your utility, you might see credits ranging from <strong>$0.03–$0.05 per kWh</strong> for excess generation, compared to a retail rate of $0.12–$0.16/kWh.</p>
      <p><strong>But here's the key nuance:</strong> you still offset your own consumption first at the full retail rate. Solar you use directly — powering your A/C, fridge, lights, EV charger — saves you the full retail cost. Only the <em>surplus</em> you export gets the lower credit.</p>

      <h2>Why Solar Still Makes Sense</h2>
      <p>A well-sized system — one that matches your household's actual consumption pattern — will <strong>self-consume 60–80%</strong> of the energy it produces. That energy is offsetting power you'd otherwise buy at full price. The math still works:</p>
      <ul>
        <li><strong>Self-consumption savings</strong> — At $0.14/kWh, a 7 kW system producing ~9,000 kWh/year with 70% self-consumption saves roughly <strong>$880/year</strong> on self-consumed energy alone.</li>
        <li><strong>Export credits</strong> — The remaining 30% (~2,700 kWh) exported at $0.04/kWh adds ~<strong>$108/year</strong>.</li>
        <li><strong>Total first-year savings</strong> — Approximately <strong>$990/year</strong>, with a typical payback period of 9–12 years before accounting for any remaining incentives.</li>
      </ul>

      <h2>Battery Storage Changes the Equation</h2>
      <p>Here's where it gets interesting. If the export rate is low, the smart move is to <strong>store your surplus and use it later</strong> rather than send it to the grid for pennies. Battery storage (lithium iron phosphate systems like the Enphase IQ Battery or Sol-Ark + battery combos) lets you:</p>
      <ul>
        <li>Shift solar production to evening peak hours when you use the most power</li>
        <li>Provide backup during outages (Indiana averages 2–3 significant outages per year per utility territory)</li>
        <li>Maximize self-consumption to 85–95%, dramatically improving ROI</li>
      </ul>

      <h2>Illinois Neighbors: You've Got It Better</h2>
      <p>If you're across the state line in Illinois, the picture is brighter. Illinois still offers <strong>full 1:1 net metering</strong> for systems up to 25 kW, and the <strong>Illinois Shines program</strong> provides Solar Renewable Energy Credits (SRECs) that can add $1,000–$3,000+ in value over the first 5 years of your system's life.</p>

      <h2>The Takeaway</h2>
      <p>Indiana's net metering rules have changed, but solar hasn't stopped making financial sense — especially when your system is properly sized for your consumption. <strong>The biggest mistake we see is oversizing a system for export rather than self-consumption.</strong> That's why we spend time analyzing your actual usage data before designing anything.</p>
      <p>Curious about the numbers for your specific utility and usage? <strong>Reach out for a free, no-pressure estimate.</strong></p>
    `,
  },
  {
    slug: "ground-mount-vs-roof-mount-solar-which-is-right-for-you",
    title: "Ground Mount vs. Roof Mount: The Great Solar Showdown",
    subtitle:
      "Spoiler: there's no wrong answer — but there IS a better one for your property",
    date: "2026-05-17",
    category: "solar-tips",
    author: "Accutek Solar",
    authorRole: "Installation Team",
    readTime: 5,
    excerpt:
      "About half of our installs are ground mounts. Here's a no-nonsense comparison of ground-mount vs. roof-mount solar to help you decide what fits your property, budget, and goals.",
    heroImage:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt:
      "Ground-mounted solar array in a green field with blue sky",
    tags: [
      "ground mount",
      "roof mount",
      "installation",
      "solar tips",
      "comparison",
    ],
    sources: [
      {
        label: "EnergySage — Ground-Mounted Solar Panels",
        url: "https://www.energysage.com/solar/ground-mounted-solar-panels/",
      },
      {
        label: "NREL — PV System Costs Benchmark",
        url: "https://www.nrel.gov/solar/market-research-analysis/solar-installed-system-cost.html",
      },
    ],
    content: `
      <p>One of the first questions we get from homeowners is: <em>"Should I put panels on my roof or in my yard?"</em> The honest answer is that it depends on your property — but here's a straightforward breakdown so you can make an informed call.</p>

      <h2>Roof Mount: The Space-Saver</h2>
      <p><strong>Best for:</strong> Homeowners with a newer roof (10 years old or less), good southern exposure, and limited yard space.</p>
      <ul>
        <li><strong>Lower upfront cost</strong> — No racking structure or concrete footings needed. Your roof IS the structure. A typical residential roof-mount system costs <strong>10–15% less</strong> than an equivalent ground-mount.</li>
        <li><strong>No yard impact</strong> — Your lawn, garden, and play areas stay untouched.</li>
        <li><strong>Faster installation</strong> — Most residential roof mounts take 1–2 days to install.</li>
      </ul>
      <p><strong>The trade-offs:</strong></p>
      <ul>
        <li><strong>You're locked to your roof's orientation and pitch</strong> — If your roof faces east-west, you'll produce less than an optimally angled south-facing system.</li>
        <li><strong>Shading from trees or chimneys</strong> can eat into production. Microinverters or optimizers help, but shade is shade.</li>
        <li><strong>Maintenance access</strong> — Climbing on a roof to clean panels or check connections is harder than walking up to a ground array.</li>
        <li><strong>Roof condition matters</strong> — If your shingles are 15+ years old, we'll recommend re-roofing first. Nobody wants to remove a solar array to replace a roof five years later.</li>
      </ul>

      <h2>Ground Mount: The Performance King</h2>
      <p><strong>Best for:</strong> Rural properties with acreage, older roofs, shaded roof areas, or homeowners who want maximum production and easy maintenance.</p>
      <ul>
        <li><strong>Optimal angle and orientation</strong> — We set the tilt and azimuth to the ideal for your latitude (roughly 38–40° in our service area). This alone can boost annual production <strong>10–25%</strong> compared to a suboptimal roof.</li>
        <li><strong>Easy maintenance</strong> — Walk up, wipe off, inspect. No ladders, no safety harnesses.</li>
        <li><strong>Scalability</strong> — Got 2 acres? You can build a much larger system than your roof could support.</li>
        <li><strong>No roof penetrations</strong> — Zero risk of leaks. Your roof stays untouched.</li>
      </ul>
      <p><strong>The trade-offs:</strong></p>
      <ul>
        <li><strong>Higher upfront cost</strong> — The steel racking, concrete piers, and trenching for wiring add cost. Budget roughly <strong>$0.20–$0.50 more per watt</strong> than roof mount.</li>
        <li><strong>Uses yard space</strong> — A 6 kW ground-mount system typically occupies a footprint of about 350–400 square feet.</li>
        <li><strong>Permitting</strong> — Some municipalities have setback requirements for ground-mounted structures. We handle the permit paperwork, but it can add 1–2 weeks to the timeline.</li>
      </ul>

      <h2>The Pole Mount Wild Card</h2>
      <p>There's a third option that many people overlook: the <strong>pole mount</strong> (also called a top-of-pole or tracker mount). A single steel pole supports an array that can even include single-axis tracking to follow the sun. Pole mounts are popular on rural Indiana and Illinois lots where you want ground-mount flexibility with a smaller footprint.</p>

      <h2>Our Recommendation</h2>
      <p>About <strong>half of our installations</strong> are ground mounts — that's how common they are in our service area. Rural properties with acreage almost always benefit from a ground array. In-town homes with newer south-facing roofs often do great with roof mount.</p>
      <p>The real answer is: <strong>let us look at your property.</strong> We use satellite imagery, site visits, and shade analysis to recommend the right approach. No guessing, no one-size-fits-all.</p>
      <p><strong>Ready to find out which option is right for your place?</strong> Get a free estimate — we'll show you both options side by side.</p>
    `,
  },
  {
    slug: "solar-battery-backup-vs-generator-which-keeps-the-lights-on",
    title:
      "Solar Battery vs. Generator: Which Keeps the Lights On?",
    subtitle: "The backup power cage match — with a surprise winner",
    date: "2026-05-12",
    category: "solar-tips",
    author: "Accutek Solar",
    authorRole: "Engineering Team",
    readTime: 6,
    excerpt:
      "When the grid goes down, you need a plan. We compare solar battery backup systems with standby generators — cost, reliability, run time, and when it makes sense to have both.",
    heroImage:
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Home battery storage system mounted on a garage wall",
    tags: [
      "battery storage",
      "generators",
      "backup power",
      "Kohler",
      "comparison",
    ],
    sources: [
      {
        label: "EIA — Average U.S. Electricity Outage Duration",
        url: "https://www.eia.gov/electricity/data/eia861/",
      },
      {
        label: "EnergySage — Solar Battery Cost Guide",
        url: "https://www.energysage.com/solar/solar-energy-storage/what-do-solar-batteries-cost/",
      },
      {
        label: "Kohler — Home Generators",
        url: "https://www.kohlerpower.com/en/residential/generators",
      },
    ],
    content: `
      <p>Indiana isn't exactly Tornado Alley, but between summer storms, ice events, and the occasional grid hiccup, the average Hoosier experiences <strong>2–4 power outages per year</strong> (EIA data). If you're tired of resetting clocks and losing a freezer full of venison, you've got two main options: <strong>battery backup</strong> or a <strong>standby generator</strong>.</p>
      <p>We install both. Here's the honest comparison.</p>

      <h2>Solar Battery Backup</h2>
      <p><strong>What it is:</strong> A lithium battery (usually lithium iron phosphate / LFP) paired with your solar array that stores excess energy and powers your home during an outage.</p>
      <p><strong>Popular options:</strong> Enphase IQ Battery 5P, Tesla Powerwall 3, Sol-Ark + battery rack.</p>
      <table>
        <thead><tr><th>Pro</th><th>Con</th></tr></thead>
        <tbody>
          <tr><td>Silent operation — no exhaust, no noise</td><td>Limited capacity: a single 10 kWh battery runs essential loads for 8–12 hours</td></tr>
          <tr><td>Recharges from solar daily (unlimited fuel if sun shines)</td><td>Higher upfront cost: $10,000–$15,000 installed for a single battery</td></tr>
          <tr><td>Zero maintenance</td><td>Can't power whole-house heavy loads (A/C, well pump, dryer) for long</td></tr>
          <tr><td>Daily value: time-of-use shifting, self-consumption optimization</td><td>Performance drops in extreme cold without thermal management</td></tr>
        </tbody>
      </table>

      <h2>Standby Generator</h2>
      <p><strong>What it is:</strong> A permanently installed natural gas or propane generator with an automatic transfer switch (ATS) that kicks on seconds after the grid drops.</p>
      <p><strong>Our go-to:</strong> Kohler home generators — we're an authorized dealer and installer.</p>
      <table>
        <thead><tr><th>Pro</th><th>Con</th></tr></thead>
        <tbody>
          <tr><td>Powers your ENTIRE home — A/C, well pump, everything</td><td>Requires fuel (natural gas or LP tank)</td></tr>
          <tr><td>Runs indefinitely as long as fuel supply lasts</td><td>Noise: 65–70 dB during operation</td></tr>
          <tr><td>Lower upfront cost: $6,000–$12,000 installed for 14–24 kW</td><td>Annual maintenance required (oil, filters, exercise runs)</td></tr>
          <tr><td>Proven reliability in extended multi-day outages</td><td>No daily energy savings — only valuable during outages</td></tr>
        </tbody>
      </table>

      <h2>The Hybrid Play: Best of Both Worlds</h2>
      <p>Here's what we're seeing more and more: <strong>solar + battery + generator</strong>. The battery handles the short outages (a few hours to a day), recharges from your solar panels, and provides daily energy value. The generator is your insurance policy for the multi-day ice storm or extended grid failure.</p>
      <p>In this setup, the battery and solar dramatically <strong>reduce how often the generator runs</strong>, which means less fuel, less noise, and less wear. The generator is there for the worst-case scenario.</p>

      <h2>Which Is Right for You?</h2>
      <ul>
        <li><strong>Urban/suburban home with natural gas</strong> → A Kohler standby generator is hard to beat on cost and whole-home coverage.</li>
        <li><strong>Rural property already going solar</strong> → Battery backup makes sense as an add-on. If you're off-grid or want energy independence, battery + solar is the foundation.</li>
        <li><strong>Anyone who wants the belt-and-suspenders approach</strong> → Solar + battery + generator is the gold standard for resilience.</li>
      </ul>

      <p><strong>We install and service all three options.</strong> Let us assess your property, loads, and goals — we'll recommend the setup that actually makes sense for your situation.</p>
    `,
  },
];

/** Helper to get posts sorted by date (newest first) */
export function getSortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Get posts by category */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getSortedPosts().filter((p) => p.category === category);
}

/** Get all unique tags */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
