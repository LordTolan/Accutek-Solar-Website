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
    slug: "homegrown-watts-inside-americas-solar-manufacturing-boom",
    title: "Homegrown Watts: Inside America's Solar Manufacturing Boom",
    subtitle: "From 8 gigawatts to 60 — and why your next panels might have a shorter commute",
    excerpt:
      "U.S. solar manufacturing capacity has exploded 700% since the IRA passed. Meanwhile, tariffs on Southeast Asian imports are hitting triple digits. Here's what the reshuffled supply chain means for Indiana and Illinois homeowners shopping for panels in 2026.",
    author: "Accutek Solar",
    date: "2026-05-25",
    readTime: "6 min read",
    category: "Industry News",
    tags: ["manufacturing", "tariffs", "trade policy", "supply chain", "pricing", "Made in USA"],
    heroImage:
      "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Solar panels being manufactured in a modern factory setting",
    content: `
<p>Something remarkable has happened to American solar manufacturing, and most homeowners have no idea. Three years ago, the U.S. could barely produce enough solar panels to cover a midsized utility project. Today, domestic factories can churn out over 60 gigawatts of modules per year — a 700% increase since the Inflation Reduction Act landed in 2022. If your last set of panels came from a factory in Southeast Asia, your next ones might come from Georgia, Ohio, or Alabama. Here's what's driving the shift and what it means for your wallet.</p>

<h2>The Factory Floor Scoreboard</h2>
<p>The numbers are staggering. U.S. solar module production capacity jumped from roughly <strong>8 GW per year</strong> before the IRA to over <strong>60 GW by late 2025</strong>, according to the Solar Energy Industries Association. Solar cell production — the heart of each panel — saw a <strong>300% increase</strong> over the same period. For context, the entire U.S. installed about 40 GW of solar in 2025. Domestic factories can now theoretically supply more panels than the country installs.</p>
<p>The headliners tell the story:</p>
<ul>
  <li><strong>First Solar</strong> opened a $1.1 billion factory in Alabama in late 2024, adding 3.5 GW of annual thin-film capacity. Combined with its Ohio and Louisiana plants, First Solar's U.S. output is on track to hit <strong>14 GW by end of 2026</strong> — making it the largest domestic solar manufacturer by a wide margin.</li>
  <li><strong>Qcells (Hanwha)</strong> ramped its Dalton, Georgia plant past 3 GW annually and broke ground on a <strong>$2.5 billion complex in Cartersville, GA</strong> that will integrate the entire supply chain — ingots, wafers, cells, and finished modules — under one roof. That's nearly unheard of outside China.</li>
  <li><strong>Corning</strong> entered the game with a solar manufacturing hub in Michigan, targeting up to 15% of the U.S. wafer market.</li>
</ul>
<p>These aren't press releases and renderings. These are real factories, hiring real workers, shipping real panels.</p>

<h2>Why Now? The Tariff Wall Is Real</h2>
<p>The manufacturing boom didn't happen in a vacuum. It's riding a wave of trade policy that has made importing cheap panels from Southeast Asia — the industry's go-to supply chain for a decade — dramatically more expensive.</p>
<p>In April 2025, the U.S. Commerce Department finalized anti-dumping and countervailing duty rates on crystalline solar cells and modules from Vietnam, Malaysia, Thailand, and Cambodia. The numbers are eye-watering:</p>
<ul>
  <li><strong>Cambodia:</strong> countervailing duties up to 534%, anti-dumping duties of 117%</li>
  <li><strong>Vietnam:</strong> anti-dumping duties of 271%, countervailing duties of 125%</li>
  <li><strong>Thailand:</strong> anti-dumping duties of 111%, countervailing duties of 264%</li>
  <li><strong>Malaysia:</strong> countervailing duties of 32%, anti-dumping duties of about 2%</li>
</ul>
<p>These stack on top of existing Section 201 safeguard tariffs and reciprocal tariffs ranging from 24% to 49% depending on the country. The practical effect? Panels that used to arrive from a Vietnamese factory at rock-bottom prices now carry duty loads that can double or triple the landed cost. The era of 15-cent imported modules is over for the U.S. market.</p>

<h2>What This Means for Panel Prices</h2>
<p>Here's the part that actually affects your quote. As of Q1 2026, U.S. solar module pricing looks like this:</p>
<ul>
  <li><strong>Imported modules</strong> (not subject to the harshest penalties): ~$0.265 per watt</li>
  <li><strong>U.S.-assembled modules with imported cells:</strong> ~$0.36 per watt</li>
  <li><strong>Fully U.S.-made modules (domestic cells):</strong> ~$0.46 per watt</li>
</ul>
<p>That's a meaningful spread. On an 8 kW residential system, the module cost difference between imported and fully domestic panels is roughly <strong>$1,500–$1,600</strong>. The median installed system price nationally sits at about <strong>$2.58 per watt</strong> before incentives, per EnergySage — which translates to around $20,600 for an 8 kW system. Modules are one piece of that cost (the rest is inverters, racking, labor, permitting, and overhead), but they're the piece most affected by trade policy.</p>
<p>The good news: as domestic production scales up and factories hit full capacity through 2026 and 2027, competition among U.S. manufacturers should put downward pressure on that $0.46 premium. More supply, same demand — economics still works even when trade policy gets weird.</p>



<h2>What Indiana and Illinois Homeowners Should Know</h2>
<p>For folks in our service area, here's the practical takeaway:</p>
<ul>
  <li><strong>Panel selection matters more than it used to.</strong> Ask your installer where the panels are made and what certifications they carry. U.S.-manufactured panels from First Solar, Qcells, and others come with domestic warranty support and shorter supply chains — that means faster replacements if something ever goes wrong.</li>
  <li><strong>Don't chase the cheapest module.</strong> A panel with questionable tariff status or fly-by-night warranty isn't a deal — it's a liability on your roof for 25 years. We've always used established, bankable manufacturers, and the domestic boom gives us more options, not fewer.</li>
  <li><strong>Pricing has stabilized, not skyrocketed.</strong> Despite all the tariff drama, installed residential solar costs in the Midwest remain in the <strong>$2.50–$3.80 per watt</strong> range. The tariff costs are mostly absorbed at the utility scale; residential installers have been pivoting to domestic and tariff-exempt supply lines.</li>
  <li><strong>Timing still favors action.</strong> State-level incentives (Illinois Shines, Indiana's sales tax exemption) remain in effect, and equipment pricing has stabilized. Panels installed today lock in today's economics for 25–30 years.</li>
</ul>

<h2>The Bottom Line</h2>
<p>American solar manufacturing has gone from afterthought to powerhouse in three years. Billions of dollars in factories are producing panels right here in the U.S., and the trade barriers that once protected cheap imports now redirect demand toward domestic products. For Indiana and Illinois homeowners, the shift means better warranty coverage, more reliable supply, and a domestic industry that's finally competing on capacity — not just policy. The panels may cost a touch more than the rock-bottom imports of 2023, but they'll be made by companies with U.S. addresses, U.S. service teams, and a vested interest in keeping your system running for decades. That's a trade we're happy to make.</p>
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
  {
    slug: "illinois-solar-incentives-2026-the-prairie-state-is-a-solar-goldmine",
    title: "Illinois Solar Incentives in 2026: The Prairie State Is a Solar Goldmine",
    subtitle: "SRECs, net metering, tax breaks — Illinois basically pays you to go solar",
    excerpt:
      "Illinois has one of the most generous solar incentive stacks in the Midwest. From the Illinois Shines program to full-retail net metering and property tax exemptions, here's everything homeowners in eastern Illinois need to know.",
    author: "Accutek Solar",
    date: "2026-05-25",
    readTime: "7 min read",
    category: "Solar Policy",
    tags: ["Illinois", "incentives", "Illinois Shines", "net metering", "SREC", "policy"],
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Golden sunlight over Illinois farmland",
    content: `
<p>If Indiana's solar incentives are a solid handshake, Illinois's are a bear hug with a gift card tucked inside. The Prairie State has quietly built one of the most aggressive solar incentive programs in the country — and if you're a homeowner in Vermilion, Edgar, Champaign, Clark, Crawford, Coles, or Douglas County, you're sitting in the sweet spot. Here's the full breakdown for 2026.</p>

<h2>Illinois Shines: Getting Paid for the Sun You Harvest</h2>
<p>The crown jewel of Illinois solar incentives is the <strong>Illinois Shines</strong> program, formally known as the Adjustable Block Program (ABP). Here's the short version: when you install solar, your system earns <strong>Solar Renewable Energy Credits (SRECs)</strong> based on how much electricity it's expected to produce over 15 years. Illinois Shines buys those credits upfront or in annual payments — effectively paying you a bonus on top of your electricity savings.</p>
<p>For a typical 8 kW residential system in 2026, the Illinois Shines incentive works out to roughly <strong>$3,000–$5,000</strong> depending on your utility territory and whether you take the lump sum or annual payments. That's money in your pocket just for generating clean energy. Indiana doesn't have anything like this.</p>
<p>The program was created by the Future Energy Jobs Act (FEJA) in 2016 and then supercharged by the <strong>Climate and Equitable Jobs Act (CEJA)</strong> in 2021, which dramatically expanded funding. As of 2026, blocks are still open for residential systems — but they fill up, and incentive rates step down as each block closes. Translation: earlier is better.</p>

<h2>Net Metering: Illinois Does It Right</h2>
<p>Illinois offers <strong>full 1:1 retail-rate net metering</strong> for residential systems up to 25 kW. That means every kilowatt-hour your panels send to the grid earns you a credit at the same rate you'd pay to buy that electricity. No discounts, no wholesale rate haircut — full retail.</p>
<p>Credits roll over month to month, and at the end of your annual billing cycle, any remaining credits are paid out (at a slightly lower rate, but the monthly rollover is where the real value lives). For a household that sizes their system to match annual usage, net metering alone can reduce your electric bill to the minimum monthly charge — typically $10–$15.</p>
<p>Compare that to Indiana, where post-2022 systems get credits at roughly 125% of wholesale (significantly less than retail), and you start to see why Illinois homeowners have a structural advantage.</p>

<h2>Property Tax Exemption: Your Home Value Goes Up, Your Taxes Don't</h2>
<p>Here's a detail that often gets overlooked: Illinois law exempts solar energy systems from property tax assessments for the first 30 years. Solar panels reliably increase home value — studies show an average bump of 3–4% — but in Illinois, that added value <strong>won't increase your property tax bill</strong>.</p>
<p>In practical terms: you get a more valuable home that costs less to power, and the county assessor doesn't touch it. That's a triple win — equity, savings, and tax protection.</p>

<h2>CEJA and the 100% Clean Energy Mandate</h2>
<p>The Climate and Equitable Jobs Act didn't just expand Illinois Shines — it committed the state to <strong>50% renewable energy by 2040</strong> and <strong>100% clean energy by 2045</strong>. That's not aspirational language in a press release. It's codified in state law with funding mechanisms and compliance requirements.</p>
<p>What does this mean for homeowners? It means the state is structurally invested in keeping solar incentives alive and expanding them. Illinois <em>needs</em> distributed solar to hit its targets, and that need translates into sustained policy support. You're not betting on a program that might disappear — you're riding a wave that the state legally has to keep building.</p>

<h2>Stacking the Incentives: What the Math Actually Looks Like</h2>
<p>Let's run a real-world scenario for an eastern Illinois homeowner installing an 8 kW ground-mount system:</p>
<ul>
  <li><strong>System cost:</strong> ~$26,000 (installed, before incentives)</li>
  <li><strong>Illinois Shines SREC payment:</strong> ~$4,000 (upfront, varies by block)</li>
  <li><strong>Net cost after SRECs:</strong> ~$22,000</li>
  <li><strong>Annual electricity savings:</strong> ~$1,800–$2,200 (via net metering)</li>
  <li><strong>Payback period:</strong> ~10–12 years</li>
  <li><strong>Panel lifespan:</strong> 25–30+ years</li>
  <li><strong>Property tax impact:</strong> $0 (exempt for 30 years)</li>
</ul>
<p>After payback, you're looking at 15–20 years of near-free electricity. And because Illinois net metering credits at full retail, the annual savings are meaningful — not just symbolic.</p>

<h2>Why Eastern Illinois Is the Sweet Spot</h2>
<p>Accutek Solar serves seven Illinois counties: Vermilion, Edgar, Clark, Crawford, Coles, Douglas, and Champaign. This part of the state has a few things working in its favor:</p>
<ul>
  <li><strong>Rural acreage:</strong> Plenty of unshaded, south-facing land for ground-mount systems — our specialty.</li>
  <li><strong>Ameren Illinois territory:</strong> Ameren has been a cooperative utility for net metering and Illinois Shines interconnection. The process is well-established.</li>
  <li><strong>Agricultural properties:</strong> Farms and rural properties may also qualify for <strong>USDA REAP grants</strong> (Rural Energy for America Program), which can cover up to 50% of project costs for eligible agricultural producers and rural small businesses.</li>
  <li><strong>Lower cost of living:</strong> System installation costs in central/eastern Illinois tend to run lower than the Chicago metro, so your incentive dollars stretch further.</li>
</ul>

<h2>Illinois vs. Indiana: The Honest Comparison</h2>
<p>We install on both sides of the state line, and we'll be straight with you: Illinois has the better incentive package right now. Between Illinois Shines, full-retail net metering, and the property tax exemption, an identical system installed in Vermilion County, IL will have a shorter payback period than the same system in Vermillion County, IN. (Yes, they spell it differently. No, we don't know why.)</p>
<p>That doesn't mean Indiana is bad for solar — it's still a strong investment. But if you're an Illinois homeowner who's been assuming the incentives are the same as your Indiana neighbors', you're leaving money on the table.</p>

<h2>The Bottom Line</h2>
<p>Illinois has built one of the best solar incentive stacks in the Midwest — arguably the best between the coasts. SRECs pay you upfront. Net metering credits at full retail. Property taxes stay flat. And the state's clean energy law ensures these programs have legs. If you're in our eastern Illinois service area and you've been thinking about solar, 2026 is the year to stop thinking and start harvesting. The sun's already doing its part — let the incentives do theirs.</p>
`,
    sources: [
      "Illinois Power Agency — Illinois Shines / Adjustable Block Program (illinoisabp.com)",
      "Climate and Equitable Jobs Act (CEJA), Public Act 102-0662 — Illinois General Assembly",
      "Illinois Compiled Statutes 35 ILCS 200/10-720 — Solar energy property tax exemption",
      "DSIRE — Illinois Net Metering (dsireusa.org)",
      "USDA — Rural Energy for America Program (rd.usda.gov)",
      "Illinois Commerce Commission — Net metering rules and tariffs",
    ],
  },
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
