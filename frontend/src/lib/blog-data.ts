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

export const CATEGORY_META: Record<string, { label: string; emoji: string }> = {
  "Big Utility Wars": { label: "Big Utility Wars", emoji: "⚡" },
  "Agricultural Solar": { label: "Agricultural Solar", emoji: "🌾" },
  "Industry News": { label: "Industry News", emoji: "📰" },
  "Solar Policy": { label: "Solar Policy", emoji: "📜" },
  "Maintenance 101": { label: "Maintenance 101", emoji: "🔧" },
  "Solar 101": { label: "Solar 101", emoji: "☀️" },
  "Technology": { label: "Technology", emoji: "⚙️" },
  "Energy ROI": { label: "Energy ROI", emoji: "💵" },
  "Ground Mounts": { label: "Ground Mounts", emoji: "🌱" },
  "Summer Heat": { label: "Summer Heat", emoji: "🔥" },
  "Policy Update": { label: "Policy Update", emoji: "📋" },
  "Battery Tech": { label: "Battery Tech", emoji: "🔋" },
  "Solar": { label: "Solar", emoji: "☀️" },
  "Incentives": { label: "Incentives", emoji: "💰" },
};

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  heroImage: string;
  heroAlt: string;
  content: string;
  sources?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "before-the-next-big-snow-a-winter-checklist-for-your-solar-battery-and-generator-2026-10-05",
    "title": "Before the Next Big Snow: A Winter Checklist for Your Solar, Battery and Generator",
    "subtitle": "Last January buried the Wabash Valley. Here's how to make sure your backup power is ready for the next one.",
    "excerpt": "Vigo County got up to 10.5 inches of snow last January. Here's a plain checklist to get your solar, battery and Kohler generator ready for the next storm.",
    "author": "Duke Electra",
    "date": "2026-10-05",
    "readTime": "6 min read",
    "category": "Maintenance 101",
    "tags": [
      "Indiana",
      "winter",
      "backup power",
      "Kohler",
      "LiFePO4",
      "ground mount"
    ],
    "heroImage": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Ground-mounted solar array on green grass under a clear blue sky",
    "content": "<p>Remember the last weekend of January? The <a href=\"https://www.weather.gov/ind/jan252026snow\">National Weather Service in Indianapolis</a> recorded 9.1 inches at Indianapolis on January 25, 2026, the city's biggest one-day snowfall since 2018, and observers in Vigo County reported 8 to 10.5 inches. The <a href=\"https://www.tribstar.com/news/local_news/plowing-through-digging-out-wabash-valley-rallying-after-snowstorm/article_0a72f4b6-8e7e-4ce5-90f9-0691d766298d.html\">Tribune-Star</a> reported that Vigo County issued local emergency declarations and travel warnings, and the Weather Service followed the snow with an extreme cold warning for wind chills that could reach 20 to 25 below.</p>\n\n<p>It's October now. The next big one is out there somewhere. Accutek Solar has been pulling wire across west-central Indiana and east-central Illinois for 32 years, since 1994, and here's what we'd tell a neighbor: right now, while it's still sweater weather, is the easy time to get your backup power ready. The night the lines come down is not.</p>\n\n<h2>\"Will My Solar Keep My Power On in an Outage?\"</h2>\n\n<p>That's the question Accutek Solar hears most. Straight answer: solar panels alone, no. Solar with battery storage, yes.</p>\n\n<p>The <a href=\"https://www.energy.gov/cmei/systems/solar-and-resilience-basics\">U.S. Department of Energy</a> (page checked Oct. 4, 2026) explains that solar systems are designed to switch off when grid power cuts out, for safety reasons, and that solar with a properly configured inverter and battery storage can detect the outage and switch to \"islanded\" mode to keep the power on. A <a href=\"https://www.cleanegroup.org/wp-content/uploads/Energy-Storage-101.pdf\">Clean Energy Group guide</a> (March 2015) spells out the safety part: a system that kept feeding the grid could send power back onto lines crews are repairing, and the UL 1741 inverter standard requires grid-connected inverters to turn off shortly after an outage is detected.</p>\n\n<p>That shutoff protects the lineman working your road. The battery keeps your house running while he works. If you already have storage, know which circuits are on your backed-up panel. If you don't, that's the piece that turns your array into backup power, and Seth and the crew can walk you through it.</p>\n\n<h2>Battery Gear: Know Your LiFePO4 Specs</h2>\n\n<p>Accutek Solar installs lithium iron phosphate (LiFePO4) storage, and every battery publishes a spec sheet. Here's what to read on yours, using two EG4 models as examples only, not a recommendation (specs checked Oct. 4, 2026):</p>\n\n<ul><li><strong>Capacity and usable capacity.</strong> The <a href=\"https://eg4electronics.com/wp-content/uploads/2025/12/EG4-LifePower4-48V-V2-Auto-ID-BMS-Protocol-SR-48-100-LP4-IN-03-Spec-Sheet.pdf\">EG4 LifePower4 48V V2</a> rack battery is rated 5.12 kWh. The <a href=\"https://eg4electronics.com/wp-content/uploads/2025/09/EG4-WallMount-All-Weather-Battery-Spec-Sheet.pdf\">EG4 WallMount All Weather</a> is rated 14.3 kWh. For both, EG4 recommends a state-of-charge floor no lower than 20% to keep to an 80% depth of discharge, so plan on using about 80% of the nameplate.</li><li><strong>Cycle life.</strong> EG4 lists more than 6,000 cycles at 80% depth of discharge for the LifePower4 V2, and more than 8,000 cycles at 0.5C and 80% depth of discharge for the WallMount All Weather.</li><li><strong>Charging and discharging range.</strong> Both list charging from 32°F to about 122°F and discharging from -4°F to about 131°F. In other words, they can deliver power below freezing but only charge above it.</li><li><strong>Built-in protection.</strong> The battery management system on the LifePower4 V2 cuts off charging below 23°F as a safeguard.</li><li><strong>Self-heating.</strong> The WallMount All Weather has a built-in 224-watt heater that turns on when the battery's internal temperature hits 32°F and off at 41°F.</li><li><strong>Indoor vs. outdoor.</strong> The LifePower4 V2 is rated IP20. The WallMount All Weather is rated IP65, and EG4 describes it for residential outdoor energy storage.</li></ul>\n\n<p>Where your battery can go (garage, basement or outside wall) comes down to its manual and local code. Getting that right is part of the install.</p>\n\n<h2>Your Generator: Exercise, Service, Cold Weather Kit</h2>\n\n<p>A standby generator that sits all year still needs attention. Kohler's <a href=\"https://library-mypointnow.s3.amazonaws.com/392-27276.pdf\">operation manual for its 14/20RESA and 20RESC home generators</a> says to run the generator without load once a week for 20 minutes, and that exercising it weekly or every two weeks is required to keep the engine and alternator in good condition. The controller can do it on a schedule. Kohler's <a href=\"https://www.kohlerhomeenergy.rehlko.com/resource-center/generator-maintenance-schedule\">maintenance guidance</a> (as of Oct. 4, 2026) says most standby generators should get professional service at least once a year, even if they never ran during an outage. A typical visit covers oil and filter, air filter, spark plug inspection, battery testing and a load test.</p>\n\n<p>Kohler also recommends its <a href=\"https://www.kohlerhomeenergy.rehlko.com/products/parts-accessories/gm110948-kp2-qs\">Cold Weather Kit</a> for generators installed where the temperature regularly falls below 32°F. As of Oct. 4, 2026, the kit is offered for 14- to 20-kW air-cooled units and includes breather tube, oil and fuel regulator heaters. Kohler's <a href=\"https://resources.kohler.com/power/kohler/residential/pdf/g6130.pdf\">battery heater kit</a> wraps the starting battery and runs on a thermostat that turns the heater on below 60°F and off at 80°F. Not sure what your unit has? Ask before the first hard freeze.</p>\n\n<p>Running a portable generator? The <a href=\"https://www.cdc.gov/carbon-monoxide/media/pdfs/Generators_1.pdf\">CDC</a> is blunt: never use one inside your home or garage, even with the doors and windows open. Run it outside, more than 20 feet from your home, doors and windows, and install battery-operated or battery back-up carbon monoxide detectors near every sleeping area.</p>\n\n<h2>Snow on the Panels: Hands Off the Glass</h2>\n\n<p>Panels are built for this. <a href=\"https://inergion.com/wp-content/uploads/2022/10/LONGi-PV-Modules-Cleaning-Work-Instruction.pdf\">LONGi's module cleaning instructions</a> say its modules are designed to withstand high snow pressure. If you do want to clear them, the same instructions say to brush the snow off gently, not to try to remove frozen ice from the panel surface, and not to use hard or sharp tools that could scratch or crack the tempered glass. Stay off the roof. This is one more place a ground mount earns its keep: it can put the array where you can reach it from the ground with a soft brush.</p>\n\n<h2>Your October Checklist</h2>\n\n<ul><li>Confirm which circuits your battery backs up.</li><li>Pull up your battery's spec sheet and check where it's installed against its ratings.</li><li>Make sure your generator's weekly or every-other-week exercise is actually running.</li><li>Book annual generator service if it's been more than a year, and ask about a cold weather kit.</li><li>Test the CO detectors near every sleeping area.</li><li>Build the basic kit. The <a href=\"https://www.in.gov/dhs/get-prepared/files/power-outages.pdf\">Indiana Department of Homeland Security</a> recommends water, non-perishable food, flashlights, batteries, a radio and first-aid supplies, plus a plan for medical needs like powered devices and refrigerated medicine.</li><li>Buy a soft snow brush. Leave the shovel in the garage.</li></ul>\n\n<p>Want a second set of eyes before the first big snow? Seth and the local Accutek Solar crew serve west-central Indiana and east-central Illinois. <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>\n\n<p>The next storm won't send a calendar invite. Get ready while it's still sweater weather.</p>",
    "sources": [
      "National Weather Service Indianapolis, \"January 25, 2026 Heavy Snowfall\": https://www.weather.gov/ind/jan252026snow",
      "Tribune-Star, \"Plowing through & digging out: Wabash Valley rallying after snowstorm\" (Jan. 26, 2026): https://www.tribstar.com/news/local_news/plowing-through-digging-out-wabash-valley-rallying-after-snowstorm/article_0a72f4b6-8e7e-4ce5-90f9-0691d766298d.html",
      "U.S. Department of Energy, \"Solar and Resilience Basics\": https://www.energy.gov/cmei/systems/solar-and-resilience-basics",
      "Clean Energy Group, \"Solar+Storage 101: An Introductory Guide to Resilient Power Systems\" (March 2015): https://www.cleanegroup.org/wp-content/uploads/Energy-Storage-101.pdf",
      "Kohler, Operation Manual TP-6804, 14/20RESA, 14/20RESAL, 20RESC, 20RESCL: https://library-mypointnow.s3.amazonaws.com/392-27276.pdf",
      "Kohler Home Energy (Rehlko), \"How Often Should You Service a Home Generator?\": https://www.kohlerhomeenergy.rehlko.com/resource-center/generator-maintenance-schedule",
      "Kohler Home Energy (Rehlko), Cold Weather Package, 120V, 20kW (GM110948-KP2-QS): https://www.kohlerhomeenergy.rehlko.com/products/parts-accessories/gm110948-kp2-qs",
      "EG4 Electronics, LifePower4 48V V2 spec sheet (model SR-48-100-LP4-IN-03, v1.0, 2025): https://eg4electronics.com/wp-content/uploads/2025/12/EG4-LifePower4-48V-V2-Auto-ID-BMS-Protocol-SR-48-100-LP4-IN-03-Spec-Sheet.pdf",
      "EG4 Electronics, WallMount All Weather 280Ah spec sheet (v1.2.1): https://eg4electronics.com/wp-content/uploads/2025/09/EG4-WallMount-All-Weather-Battery-Spec-Sheet.pdf",
      "Kohler, Battery Heater Kits spec sheet G6-130: https://resources.kohler.com/power/kohler/residential/pdf/g6130.pdf",
      "CDC, \"When the Power Goes Out, Keep Your Generator Outside\": https://www.cdc.gov/carbon-monoxide/media/pdfs/Generators_1.pdf",
      "LONGi, PV Modules Cleaning Work Instruction: https://inergion.com/wp-content/uploads/2022/10/LONGi-PV-Modules-Cleaning-Work-Instruction.pdf",
      "Indiana Department of Homeland Security, \"Power Outages\": https://www.in.gov/dhs/get-prepared/files/power-outages.pdf"
    ]
  },
  {
    "slug": "level-2-ev-charging-at-home-how-it-fits-with-solar-2026-09-28",
    "title": "Level 2 EV Charging at Home: How It Fits With Solar",
    "subtitle": "What a home charger takes from your panel, how much energy an EV adds, and how to line charging up with the sun.",
    "excerpt": "Thinking about a home EV charger and solar? What Level 2 takes from your panel, how much energy an EV adds, and how to time charging with the sun.",
    "author": "Dirk Photon",
    "date": "2026-09-28",
    "readTime": "4 min read",
    "category": "Technology",
    "tags": [
      "EV charging",
      "Level 2",
      "electrical panel",
      "solar planning",
      "Emporia"
    ],
    "heroImage": "https://images.unsplash.com/photo-1621431735623-95fcba6b89ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Sun setting low over a dark, open field with a glowing horizon",
    "content": "<p>Got an electric car or truck in the garage, or one on your wish list? Then it's fair to wonder whether solar and home charging work well together here in the Wabash Valley. They can. But it helps to understand how charging works, what it adds to your usage, and how the timing lines up with the sun.</p>\n\n<h2>Level 1 vs. Level 2 at Home</h2>\n\n<p>According to the U.S. Department of Energy's <a href=\"https://web.archive.org/web/20260715204209/https://afdc.energy.gov/fuels/electricity-charging-home\">Alternative Fuels Data Center</a>, most EV drivers charge overnight at home with either Level 1 or Level 2 equipment:</p>\n\n<ul><li><strong>Level 1</strong> is the cordset that comes with the vehicle and plugs into a regular outlet. DOE says many drivers can meet their daily needs this way, as long as there's an outlet on a dedicated branch circuit near where they park.</li><li><strong>Level 2</strong> runs on 240 volts for faster charging. DOE suggests it for drivers with less regular schedules, longer commutes, or large batteries that need more than overnight to fill.</li></ul>\n\n<p>DOE also notes that outdoor installation is safe with outdoor-rated equipment, even when charging in the rain. That's handy if your parking spot is a driveway or pole barn instead of an attached garage.</p>\n\n<h2>What Level 2 Takes From Your Panel</h2>\n\n<p>A Level 2 charger is a big, steady load. DOE points out that the National Electrical Code treats EV charging as a <strong>continuous load</strong>, and that NEC Article 625 covers most of the rules for charging equipment. Installations have to meet state and local codes, and permits may be required.</p>\n\n<p>Here's what that looks like on a real spec sheet. Emporia's <a href=\"https://cdn.emporiaenergy.com/products/c2/pro-ev-charger-sell-sheet.pdf\">Pro EV charger sell sheet</a> (revised January 2026) lists:</p>\n\n<ul><li><strong>Up to 48 amps</strong> hardwired (11.5 kW at 240 V) on a dedicated 60-amp or larger two-pole breaker.</li><li><strong>Up to 40 amps</strong> on a NEMA 14-50 outlet (9.6 kW at 240 V) on a dedicated 50-amp or larger two-pole breaker.</li><li>An internal GFCI, with a recommendation to use a non-GFCI panel breaker to avoid nuisance tripping.</li><li>A Type 4 watertight enclosure for indoor or outdoor use, UL 2594 safety listing and ENERGY STAR certification.</li></ul>\n\n<p>Notice the pattern: a 48-amp charger needs a 60-amp circuit. That lines up with the code treating charging as a continuous load, since a circuit carrying a continuous load is sized with headroom above the load. DOE adds that some homes don't have enough electrical capacity for Level 2, and that an electrician can tell you whether yours does. Emporia's Pro also uses data from a panel-mounted energy monitor to adjust its charge rate based on total home use and your panel's rating.</p>\n\n<h2>How Much Energy an EV Adds</h2>\n\n<p>DOE's example vehicle uses 27 kWh to travel 100 miles. Using that as an example only, driving 40 miles a day works out to about 10.8 kWh a day, or roughly 324 kWh over a 30-day month.</p>\n\n<p>For scale, <a href=\"https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf\">EIA's 2024 data</a> puts the average Indiana household at 901 kWh a month. Your vehicle's efficiency and your miles will differ, but an EV can be a big chunk of new usage. If you're sizing solar, it should be part of the conversation from the start, not an afterthought.</p>\n\n<h2>Lining Up Charging With the Sun</h2>\n\n<p>Solar makes power during the day. Most charging happens overnight. If your vehicle charges after dark, that energy comes from the grid or from a home battery.</p>\n\n<p>If your vehicle is home during daylight, say on a farm, with a home office, or on weekends, smart chargers can help soak up midday production. Emporia's <a href=\"https://help.emporiaenergy.com/en/articles/9084304-excess-solar\">Excess Solar feature</a> (as of August 2026) uses its energy monitor to spot when solar production exceeds household use. It then starts the charger at a minimum setting, increases the charge rate as surplus allows, and backs off when household use climbs. Users can also set the breaker size in the app to cap the charger's draw.</p>\n\n<p>Whatever setup you choose, plan the charger and the solar together: panel capacity, circuit size, where the car parks and when it's home.</p>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994. Want to plan home charging and solar as one project? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "U.S. Department of Energy, Alternative Fuels Data Center, \"Charging Electric Vehicles at Home\" (archived July 15, 2026): https://web.archive.org/web/20260715204209/https://afdc.energy.gov/fuels/electricity-charging-home",
      "Emporia Energy, Emporia Pro Smart EV Charger sell sheet (rev. Jan. 2026): https://cdn.emporiaenergy.com/products/c2/pro-ev-charger-sell-sheet.pdf",
      "U.S. Energy Information Administration, Electric Sales, Revenue, and Average Price, Table 5A \"2024 Average Monthly Bill - Residential\" (released Oct. 7, 2025): https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf",
      "Emporia Energy Help Center, \"Excess Solar\" (updated Aug. 20, 2026): https://help.emporiaenergy.com/en/articles/9084304-excess-solar"
    ]
  },
  {
    "slug": "illinois-first-big-grid-battery-auction-600-mw-approved-including-a-project-near-casey-2026-09-21",
    "title": "Illinois' First Big Grid Battery Auction: 600 MW Approved, Including a Project Near Casey",
    "subtitle": "What the first storage procurement under Illinois' new grid law bought, how the contracts work and what comes next.",
    "excerpt": "Illinois approved 600 MW of new grid batteries in its first auction under a new state law, including a project near Casey. What it bought and what's next.",
    "author": "Bill Kilowatt",
    "date": "2026-09-21",
    "readTime": "4 min read",
    "category": "Industry News",
    "tags": [
      "Illinois",
      "energy storage",
      "Ameren Illinois",
      "grid",
      "policy"
    ],
    "heroImage": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Wide farm field of golden grain glowing in late-day sun with a tree line in the distance",
    "content": "<p>Illinois just finished its first big auction for grid batteries under a new state law. Most of what it bought is downstate, including a project near Casey, not far from our Illinois service area. Here's what was bought, how the contracts work, what's next, and what it does and doesn't mean for your home.</p>\n\n<p>All figures are as of the Illinois Commerce Commission's Sept. 1, 2026 approval.</p>\n\n<h2>The Law Behind It</h2>\n\n<p>The Clean and Reliable Grid Affordability Act, or CRGA, was <a href=\"https://web.archive.org/web/20260821214402/https://ipa.illinois.gov/renewable-resources/energy-storage.html\">signed into law on Jan. 8, 2026</a>. It directs the Illinois Power Agency (IPA) to run competitive procurements for new utility-scale energy storage. The initial target is 3,000 megawatts (MW) of storage committed to reaching commercial operation by Dec. 31, 2030.</p>\n\n<p>According to the <a href=\"https://icc.illinois.gov/api/web-management/documents/downloads/public/Public%20Notice%20of%20August%202026%20Energy%20Storage%20Procurement%20Results%202026-09-01.pdf\">ICC's public notice</a>, the General Assembly passed CRGA on Oct. 30, 2025, and it took effect June 1, 2026. The IPA's storage page notes the first procurement had to be held on or before Aug. 26, 2026.</p>\n\n<h2>What Was Bought</h2>\n\n<p>Bids came in on Aug. 26. The request targeted 1,038 MW, split between the two big grid regions in Illinois: 450 MW in MISO Zone 4, the Ameren Illinois procurement, and 588 MW in the PJM ComEd area. On Sept. 1, the ICC approved the winning bids. <a href=\"https://ipa.illinois.gov/announcements/illinois-commerce-commission-approves-600-mw-of-energy-storage-p.html\">Per the IPA</a>, the results were:</p>\n\n<ul><li><strong>600 MW total</strong>, all from projects in Illinois.</li><li><strong>520 MW in Ameren / MISO territory</strong>, above the 450 MW target. The ICC notice explains the rules allow going over a target, within limits, when the last project pushes the total past it.</li><li><strong>80 MW in ComEd / PJM territory</strong>, well short of the 588 MW target.</li><li><strong>438 MW short</strong> of the overall 1,038 MW goal.</li></ul>\n\n<p>The ICC notice lists five winning projects. The four in Ameren's area are 185 MW near Du Bois, 100 MW near Flora, 100 MW near Herrick and <strong>135 MW near Casey</strong>. The ComEd-area project is 80 MW in Calumet City. The average winning bid price for the Ameren projects was $110.52 per MWh.</p>\n\n<h2>How the Contracts Work</h2>\n\n<p>First, a quick word on what these batteries do. Every project has to be able to discharge for at least four hours. The ICC notice describes the market benchmark for these contracts in terms of the price spread between the four highest-priced and four lowest-priced hours of the day. In plain terms, grid batteries charge when power is cheap and plentiful, and give it back when demand peaks.</p><p>These aren't simple purchase contracts. Winning projects sign 20-year Indexed Storage Credit contracts with Ameren Illinois or ComEd. The developer bids a \"strike price.\" Each day, that price is compared to an index of what a four-hour battery could earn in the wholesale energy and capacity markets.</p>\n\n<p>If market revenue comes in below the strike price, the utility pays the difference. If it comes in above, the developer pays the utility. The idea, per the ICC, is to take revenue uncertainty out of the bids.</p>\n\n<p>The notice also spells out the project rules: each project must be at least 20 MW, standalone, newly energized on or after June 1, 2026, and online by Dec. 31, 2029, with a possible extension to the end of 2030.</p>\n\n<h2>What's Next, and What It Means at Home</h2>\n\n<p>Per the IPA, more procurements are planned in 2027 and potentially 2028 to reach the 3,000 MW goal. The agency also plans to ask stakeholders this fall what got in the way of hitting the target. A draft storage procurement plan is due June 1, 2027.</p>\n\n<p>To be clear, this program is for large, grid-connected batteries, not home systems. It doesn't change anything about putting solar or a battery at your house. Batteries on the grid help utilities cover peak demand. A battery at home is about keeping <strong>your</strong> lights on during an outage and using more of your own solar. Both have a role, and in Illinois the rules for home batteries are a separate track.</p>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994. Curious what a home battery could look like on your property? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Illinois Power Agency, \"Energy Storage - Procurements and Programs\" (archived Aug. 21, 2026): https://web.archive.org/web/20260821214402/https://ipa.illinois.gov/renewable-resources/energy-storage.html",
      "Illinois Commerce Commission, Public Notice of Successful Bidders and Average Prices, August 2026 Energy Storage Procurement (Sept. 1, 2026): https://icc.illinois.gov/api/web-management/documents/downloads/public/Public%20Notice%20of%20August%202026%20Energy%20Storage%20Procurement%20Results%202026-09-01.pdf",
      "Illinois Power Agency, \"Illinois Commerce Commission Approves 600 MW of Energy Storage Projects\" (Sept. 2026; archived Sept. 15, 2026): https://ipa.illinois.gov/announcements/illinois-commerce-commission-approves-600-mw-of-energy-storage-p.html"
    ]
  },
  {
    "slug": "rapid-shutdown-explained-what-it-is-and-where-indianas-code-stands-2026-09-14",
    "title": "Rapid Shutdown, Explained: What It Is and Where Indiana's Code Stands",
    "subtitle": "Why the code wants rooftop solar to power down fast, how ground mounts are treated, and Indiana's pending move to the 2023 NEC.",
    "excerpt": "Rapid shutdown protects firefighters on roofs with solar. What the electrical code requires, how ground mounts are treated, and where Indiana stands.",
    "author": "Hugh Jouleson",
    "date": "2026-09-14",
    "readTime": "4 min read",
    "category": "Solar 101",
    "tags": [
      "rapid shutdown",
      "NEC",
      "electrical code",
      "ground mount",
      "Indiana"
    ],
    "heroImage": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Long rows of tilted solar panels in an open field under a blue sky with wispy clouds",
    "content": "<p>If you've looked at a solar quote or a spec sheet lately, you've probably seen the words \"rapid shutdown.\" It sounds like an emergency feature, and it is one, though it's not for you. It's for firefighters.</p>\n\n<p>Here's what rapid shutdown does, what the National Electrical Code (NEC) says about it, how it applies to ground mounts, and where Indiana's code stands as of September 2026.</p>\n\n<h2>What Rapid Shutdown Is For</h2>\n\n<p>Solar panels make electricity whenever the sun is on them. Flipping off the main breaker stops your house from using utility power, but it doesn't stop panels on the roof from producing voltage. That's a hazard for a firefighter working on or cutting into a roof.</p>\n\n<p>The NEC first addressed this in the 2014 edition with a new section, 690.12, \"Rapid Shutdown of PV Systems on Buildings.\" According to <a href=\"https://iaeimagazine.org/2015/januaryfebruary-2015/rapid-shutdown-of-pv-systems/\">IAEI Magazine</a>, it came out of a firefighter-safety task group at NFPA. The 2014 rule required controlled conductors to drop to 30 volts within <strong>10 seconds</strong>. Later editions changed that time limit, so the 10-second figure is superseded.</p>\n\n<h2>What the Current Code Requires</h2>\n\n<p>The newest edition is the 2026 NEC, which NFPA <a href=\"https://www.nfpa.org/news-blogs-and-articles/blogs/2026/01/29/2026-nec-key-changes\">says has been out since late 2025</a>. A <a href=\"https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1984\">summary of its 690.12 changes</a> says the 2026 edition mostly reorganized the section and kept the same performance targets. The rules break down around an \"array boundary,\" defined as 1 foot from the array in all directions:</p>\n\n<ul><li><strong>Outside the array boundary:</strong> controlled conductors must drop to no more than 30 volts within 30 seconds of initiating rapid shutdown.</li><li><strong>Inside the array boundary:</strong> the system must either use a listed PV hazard control system, or limit voltage to no more than 80 volts within 30 seconds.</li><li><strong>The initiation device:</strong> for one- and two-family homes, the device that triggers rapid shutdown has to be outdoors. Allowed devices include the service disconnect, the PV system disconnect or a listed switch.</li></ul>\n\n<p>Equipment that performs the rapid shutdown function must be listed for it. Since the 2023 edition, buildings with rapid shutdown also need <a href=\"https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1552\">a permanent label</a> at the service equipment, or another approved visible spot, showing first responders where the initiation device is.</p>\n\n<h2>What About Ground Mounts?</h2>\n\n<p>This is where a lot of rural installs come out ahead. Section 690.12 is written for PV systems on or in buildings, and a ground-mounted array sits out in the yard.</p>\n\n<p>The 2023 NEC made that clearer with <a href=\"https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1550\">a new exception</a>: PV circuits that come from arrays not attached to buildings and terminate on the exterior of a building are not \"controlled conductors\" for rapid shutdown purposes. The code <a href=\"https://www.mikeholt.com/files/PDF/20SOLAR_690.12.pdf\">also exempts</a> ground-mounted PV circuits that enter a building whose only purpose is to house PV equipment.</p>\n\n<p>The details depend on how the circuits are routed and where the equipment sits, so the design matters. But if a roof hazard is the reason for rapid shutdown, an array with no roof involved changes the picture.</p>\n\n<h2>Where Indiana Stands, as of September 2026</h2>\n\n<p>Here's the part most people don't expect. Indiana's statewide electrical code is the Indiana Electrical Code, 2009 Edition, which <a href=\"https://www.law.cornell.edu/regulations/indiana/675-IAC-17-1.8-1\">adopts the 2008 NEC</a> with state amendments. The 2008 edition came before rapid shutdown was written into the code.</p>\n\n<p>That's changing. According to the state <a href=\"https://www.in.gov/dhs/files/Rulemaking%20Docket%20-%20Electrical%20Code_updated.pdf\">rulemaking docket</a>, the Fire Prevention and Building Safety Commission adopted a final rule on Aug. 4, 2026 for an Indiana Electrical Code, 2026 Edition, based on the 2023 NEC. As of the docket's Aug. 18 update, approval by the Attorney General and Governor, filing and the effective date were all still listed as \"TBD.\" The <a href=\"https://www.in.gov/dhs/files/Electrical-Code-LSA-Document-IDHS-and-AGs-Office-Final-Version-Reading-Draft.pdf\">rule draft</a> says it takes effect 180 days after filing.</p>\n\n<p>So as of September 2026, the new code isn't in effect yet, but it's on the way. If you're planning a rooftop system, it's worth asking how your design handles rapid shutdown, both for safety and so you're not caught off guard when the new code takes effect. On the Illinois side, ask your local building department which NEC edition it enforces.</p>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994. Want to talk through rapid shutdown, rooftop versus ground mount, or code questions for your property? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Bill Brooks and Jim Rogers, \"Rapid Shutdown of PV Systems,\" IAEI Magazine (Jan. 22, 2015): https://iaeimagazine.org/2015/januaryfebruary-2015/rapid-shutdown-of-pv-systems/",
      "NFPA, \"Key Changes in the 2026 NEC\" (Jan. 29, 2026): https://www.nfpa.org/news-blogs-and-articles/blogs/2026/01/29/2026-nec-key-changes",
      "ElectricalLicenseRenewal.com, \"690.12 Rapid Shutdown of PV Systems on Buildings\" (2026 NEC change summary; archived Apr. 15, 2026): https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1984",
      "ElectricalLicenseRenewal.com, \"690.12(D) Buildings with Rapid Shutdown\" (2023 NEC change summary): https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1552",
      "ElectricalLicenseRenewal.com, \"690.12(A) Controlled Conductors and Rapid Shutdown\" (2023 NEC change summary): https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1550",
      "Mike Holt Enterprises, \"Understanding 2020 NEC Requirements for Solar PV and Energy Storage Systems,\" 690.12 excerpt: https://www.mikeholt.com/files/PDF/20SOLAR_690.12.pdf",
      "675 IAC 17-1.8-1, Indiana Electrical Code (2009 Edition), adoption by reference of NEC 2008: https://www.law.cornell.edu/regulations/indiana/675-IAC-17-1.8-1",
      "Indiana Fire Prevention and Building Safety Commission, Rulemaking Docket, LSA Document #26-62, Indiana Electrical Code, 2026 Edition (updated Aug. 18, 2026): https://www.in.gov/dhs/files/Rulemaking%20Docket%20-%20Electrical%20Code_updated.pdf",
      "Indiana Fire Prevention and Building Safety Commission, proposed 675 IAC 17-1.9 rule draft (Indiana Electrical Code, 2026 Edition): https://www.in.gov/dhs/files/Electrical-Code-LSA-Document-IDHS-and-AGs-Office-Final-Version-Reading-Draft.pdf"
    ]
  },
  {
    "slug": "from-quote-to-power-on-how-a-solar-project-gets-approved-in-indiana-2026-09-07",
    "title": "From Quote to Power-On: How a Solar Project Gets Approved in Indiana",
    "subtitle": "Utility interconnection, local permits and inspections, in order. Including the 2026 change to Indiana's Level 1 review.",
    "excerpt": "What happens between signing a solar quote and turning the system on in Indiana: utility interconnection, permits, inspections, and the 2026 rule update.",
    "author": "Sonny Watt",
    "date": "2026-09-07",
    "readTime": "4 min read",
    "category": "Solar 101",
    "tags": [
      "interconnection",
      "permits",
      "inspection",
      "Indiana",
      "IURC"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Rows of ground-mounted solar panels on green grass under a blue sky with puffy white clouds",
    "content": "<p>Signing a solar quote is the start, not the finish. Between that signature and the day your system starts producing, there's paperwork with your utility, a permit and inspection with local code officials, and the install itself. None of it is complicated, but it helps to know the order and who's waiting on whom.</p>\n\n<p>Here's how the process works in Indiana as of September 2026, whether you're in Terre Haute, out in Parke County or anywhere in between.</p>\n\n<h2>Step 1: Design and the Quote</h2>\n\n<p>It starts with a site visit: your roof or yard, your electrical panel, your service size and your usage history. From that comes a design, with panel layout, inverter, and how and where the system ties into your electrical service. That design also becomes the backbone of the utility application and the permit set, so getting it right up front saves time later.</p>\n\n<h2>Step 2: The Utility Interconnection Application</h2>\n\n<p>Any system that connects to the grid needs your utility's approval first. In Indiana, the rules for investor-owned utilities are set by the Indiana Utility Regulatory Commission in 170 IAC 4-4.3, the customer-generator interconnection standards. The IURC <a href=\"https://www.in.gov/iurc/files/ord_RM24-01_093025.pdf\">updated those rules</a>, and the changes <a href=\"https://web.archive.org/web/20260614073942/https://www.in.gov/iurc/rulemakings/rulemakings-pending-and-effective/\">took effect Feb. 15, 2026</a>.</p>\n\n<p>The rules set up three review levels. The one most homeowners will see is Level 1, which covers systems that are:</p>\n\n<ul><li><strong>Inverter-based,</strong> like a typical home solar system.</li><li><strong>25 kW or smaller</strong> in nameplate capacity. The 2026 update raised this from 10 kW.</li><li><strong>Certified</strong> to IEEE 1547-2018 and UL 1741, the national interconnection and inverter safety standards.</li></ul>\n\n<p>Under the updated rule, a utility may not charge an application fee for a Level 1 review. It also has to work on a clock:</p>\n\n<ul><li>Within <strong>10 business days</strong> of receiving the application, the utility tells you whether it's complete. If not, it has to list what's missing.</li><li>Within <strong>15 business days</strong> after confirming it's complete, the utility approves or denies the application based on technical screens, like how much generation is already on your circuit and your service transformer.</li><li>Within <strong>10 business days</strong> after approval, it sends an interconnection agreement and says whether it will inspect the system before operation.</li></ul>\n\n<p>You sign and return that agreement at least 10 business days before the system starts operating. Larger systems, up to 2 MW, go through Level 2, and anything else goes to Level 3, with more study and potentially fees.</p>\n\n<p><strong>Duke Energy Indiana or a rural co-op?</strong> The IURC rule is written for investor-owned utilities like Duke Energy Indiana. If your power comes from a rural electric membership cooperative (REMC), it has its own interconnection process, so ask your co-op for its application and requirements early.</p>\n\n<h2>Step 3: Permits and Local Inspection</h2>\n\n<p>While the utility reviews the application, the permit side moves along. Your county or city building department handles permits and electrical inspections, and the requirements vary from one jurisdiction to the next. Expect to submit the site plan, the electrical diagram and equipment spec sheets.</p>\n\n<p>The two tracks are tied together. Under the IURC rule, once the utility has your signed agreement and any required inspection is done, it approves the interconnection <strong>conditioned on approval by the electric code officials</strong> who have jurisdiction. In other words, the local inspection has to pass too.</p>\n\n<h2>Step 4: Install, Inspect, Power On</h2>\n\n<p>With approvals lined up, the install itself is just one piece of the timeline. After that come the inspections: the local electrical inspection and, if your utility said it would require one, the utility's inspection. If the utility requires an inspection, the rule says you can't start operating the system until it's done.</p>\n\n<p>Once everything's signed off, the system can be turned on. A few things keep the process moving:</p>\n\n<ul><li>Have recent electric bills and your account number handy.</li><li>Check HOA rules before design is finalized, if you have an HOA.</li><li>Answer utility or permit questions quickly. A missing document can stall an application.</li><li>Don't flip anything on early. Wait for the go-ahead.</li></ul>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994, and we handle the applications, permits and inspections as part of the job. <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Indiana Utility Regulatory Commission, Final Rulemaking LSA #25-368 / IURC RM #24-01, amending 170 IAC 4-4.3, Customer-Generator Interconnection Standards (approved Sept. 30, 2025): https://www.in.gov/iurc/files/ord_RM24-01_093025.pdf",
      "Indiana Utility Regulatory Commission, \"Rulemakings - Pending & Effective\" (LSA #25-368 effective Feb. 15, 2026; archived June 14, 2026): https://web.archive.org/web/20260614073942/https://www.in.gov/iurc/rulemakings/rulemakings-pending-and-effective/"
    ]
  },
  {
    "slug": "see-where-your-power-goes-a-plain-guide-to-home-energy-monitors-2026-08-31",
    "title": "See Where Your Power Goes: A Plain Guide to Home Energy Monitors",
    "subtitle": "Your bill shows the total. A panel-mounted monitor shows which circuits used it, and what your solar is doing.",
    "excerpt": "Your electric bill shows the total, not where it went. Here's how a circuit-level energy monitor works, what it shows, and why it helps with solar.",
    "author": "Barry Cade",
    "date": "2026-08-31",
    "readTime": "4 min read",
    "category": "Technology",
    "tags": [
      "energy monitoring",
      "Emporia",
      "electrical panel",
      "solar planning",
      "Indiana"
    ],
    "heroImage": "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Rows of solar panels in front of a modern glass building under a pink sunset sky",
    "content": "<p>Your electric bill tells you how much power you used last month. It doesn't tell you which things used it. Out here in the Wabash Valley, plenty of homes have a well pump, a shop or pole barn, a second fridge in the garage and an AC that works hard in July. Which of those is driving the bill? That's the gap a home energy monitor fills.</p>\n\n<p>Here's how these monitors work, what they show, and why the data is useful whether you already have solar or you're just starting to think about it.</p>\n\n<h2>Start With What Your Utility Already Shows You</h2>\n\n<p>If you have a smart meter, you may already have more data than you think. Duke Energy says its <a href=\"https://web.archive.org/web/20260203083258/https://www.duke-energy.com/home/billing/track-energy-use\">online account</a> lets you track usage by month, week, day, hour and even down to the half hour, and compare it to the same period last year. The current day's numbers show up the following day.</p>\n\n<p>On Ameren Illinois or a rural electric co-op? Check your own utility's online account to see what interval data it offers. Either way, it's a good first look, and it's free. Log in and look at a few summer and winter days. You'll see when your house peaks. What utility data can't show is <strong>which circuit</strong> caused the peak, or what's happening right now.</p>\n\n<h2>How a Circuit-Level Monitor Works</h2>\n\n<p>A monitor like the Emporia Vue 3 mounts inside your main electrical panel. It uses current transformers, or CTs: small clamp-on sensors that snap around a wire and measure the current flowing through it without cutting into anything.</p>\n\n<p>According to <a href=\"https://cdn.emporiaenergy.com/products/vue3/Vue3-Installation-Guide-EN-032026.pdf\">Emporia's March 2026 installation guide</a>, the Vue 3 has:</p>\n\n<ul><li><strong>Main sensors:</strong> 200-amp CTs that clamp around the incoming service conductors to measure the whole house.</li><li><strong>Branch sensors:</strong> up to 16 50-amp CTs for individual circuits, like the dryer, water heater or well pump.</li><li><strong>Accuracy:</strong> ±2% listed for both sensor types.</li><li><strong>Connection:</strong> 2.4 GHz Wi-Fi or wired Ethernet, and it draws less than 3 watts.</li></ul>\n\n<p>Emporia's <a href=\"https://web.archive.org/web/20260809232352/https://shop.emporiaenergy.com/products/emporia-vue-3\">product page</a> (as of August 2026) says the Vue tracks usage every second, and that it needs an active internet connection. It doesn't store data locally, so data storage and real-time monitoring run through Emporia's cloud and app. If your panel is out in a barn or a pole building, plan for a solid Wi-Fi signal or an Ethernet run.</p>\n\n<h2>Why It Matters If You Have Solar or Are Planning It</h2>\n\n<p><strong>Already have solar?</strong> Emporia's guide explains that the main CTs, clamped on the service conductors between the utility meter and the point where solar ties in, show net usage out of the box: what the house used minus what the panels produced. To see production and consumption separately, extra branch CTs go on the incoming leads from the inverter and get labeled \"Solar/Generation\" in the app. Where those sensors go depends on whether your solar is breaker-fed or a line-side tap, so it needs to match how your system was wired.</p>\n\n<p><strong>Still planning?</strong> A few months of circuit data makes for a better conversation about system size. You can see what your shop, pump or HVAC really draws instead of guessing. It also helps if you're thinking about a backup battery. Knowing which circuits matter most, and what they draw, shapes which loads go on a backup panel.</p>\n\n<p>One more practical use: the app can send alerts for unusual activity, like a sump pump that won't shut off or an oven left on.</p>\n\n<h2>Who Should Install It</h2>\n\n<p>This is where we'll be direct. The sensors clamp onto conductors inside your main panel, and Emporia's own guide warns that the work means dealing with dangerous voltage. It says installation should be done by a skilled person such as a licensed electrician, following local electrical code. It also notes that even with the main breaker off, the service conductors coming into the panel stay energized.</p>\n\n<p>That's not a job to learn on. Since an electrician will be in the panel anyway, it's a good time to make sure the sensors land on the right conductors for your solar setup, and that everything is labeled so the app's data makes sense.</p>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994. Want an energy monitor installed, or want to put your usage data to work on a solar plan? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Duke Energy, \"Monitor Your Energy Use\" (archived Feb. 3, 2026): https://web.archive.org/web/20260203083258/https://www.duke-energy.com/home/billing/track-energy-use",
      "Emporia Energy, Vue 3 Energy Monitor Installation Guide (EN, March 2026): https://cdn.emporiaenergy.com/products/vue3/Vue3-Installation-Guide-EN-032026.pdf",
      "Emporia Energy, Emporia Vue 3 Home Energy Monitor product page (archived Aug. 9, 2026): https://web.archive.org/web/20260809232352/https://shop.emporiaenergy.com/products/emporia-vue-3"
    ]
  },
  {
    "slug": "hoa-solar-rules-in-indiana-and-illinois-what-your-association-can-and-cant-do-2026-08-24",
    "title": "HOA Solar Rules in Indiana and Illinois: What Your Association Can and Can't Do",
    "subtitle": "Two states, two very different laws. What to check before you put panels on a subdivision home.",
    "excerpt": "Indiana and Illinois treat HOA solar rules very differently. Here's what each state's law allows, what it doesn't, and what to check before you apply.",
    "author": "Max Insolation",
    "date": "2026-08-24",
    "readTime": "5 min read",
    "category": "Solar Policy",
    "tags": [
      "HOA",
      "Indiana law",
      "Illinois law",
      "ground mount",
      "permits"
    ],
    "heroImage": "https://images.unsplash.com/photo-1621431735623-95fcba6b89ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Low sun glowing over a dark, open field at dusk",
    "content": "<p>Out in the country, the only approval most folks need for solar is a building permit and a utility sign-off. But if your house sits in a subdivision with a homeowners association, there's one more set of rules to check before anything gets bolted down.</p>\n\n<p>Indiana and Illinois handle HOA solar rules very differently. Since we work on both sides of the state line, here's a plain-English rundown of each, current as of August 2026. It's general information, not legal advice. Your HOA's documents and an attorney have the final word.</p>\n\n<h2>Indiana: First, Find Out When Your HOA Was Formed</h2>\n\n<p>Indiana's HOA solar rules sit in a chapter of the state's homeowners association law. Under the <a href=\"https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-1/section-32-25-5-1-1/\">law's applicability section</a>, that law covers HOAs established after June 30, 2009 that can charge mandatory dues. It covers older HOAs only if their members have voted to be governed by it.</p>\n\n<p>That detail decided a case this year. In February 2026, the Indiana Court of Appeals <a href=\"https://public.courts.in.gov/Decisions/api/Document/Opinion?Id=QbIYFaNZT64qCxcksd3o7Gjw-ohpbmY3moBRoh2rlStKsqV5s5AhMeuM9H8SvoE20\">affirmed the dismissal</a> of a Fishers homeowner's lawsuit over a denied yard solar project. His HOA was formed before 2009 and hadn't opted in, so the court held the solar chapter didn't apply. It's a memorandum decision, so it isn't binding precedent, but the reasoning was simple: the solar chapter isn't on the list of provisions that apply to every HOA.</p>\n\n<p>So step one in Indiana is to find out when your HOA was formed and whether it ever opted in. If the solar chapter doesn't apply, your covenants control.</p>\n\n<h2>Indiana: What a Covered HOA Can and Can't Do</h2>\n\n<p>If the chapter does apply, <a href=\"https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-3-5/section-32-25-5-3-5-5/\">Indiana Code 32-25.5-3.5-5</a> limits when an HOA can block a system or make you take one down. Some of the allowed reasons:</p>\n\n<ul><li>A court has found the system threatens public health or safety, or violates a law.</li><li>It's on HOA-owned, HOA-maintained or commonly owned property.</li><li>It's somewhere other than your roof, another structure the HOA approved, or a fenced yard or patio you own and maintain.</li><li>A roof system sticks up more than 6 inches, doesn't follow the roof slope with its top edge parallel to the roof line, or has frames, brackets or visible wiring that aren't silver, bronze or black.</li><li>A yard or patio system is taller than the fence line.</li><li>It's installed in a way that voids material warranties, or differs significantly from what you showed the HOA.</li></ul>\n\n<p>That fence-line rule matters if you're picturing a yard array. In a covered Indiana HOA, a ground mount has to sit in a fenced yard or patio and stay below the fence.</p>\n\n<p>There's also a second path. Under <a href=\"https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-3-5/section-32-25-5-3-5-4/\">section 4</a>, if your HOA's documents restrict solar or the board denies you for a reason not on that list, you can petition your neighbors. You give them the site plan, the system color, any screening for a non-roof install, and who's selling and installing it. You need signatures from 65% of members, or the number needed to amend the covenants if that's lower. Once you have them, the board can't deny the request if you followed the steps.</p>\n\n<h2>Illinois: An Outright Ban Isn't Allowed</h2>\n\n<p>Illinois goes further. Under the Homeowners' Energy Policy Statement Act, an HOA, common interest community or condo association <a href=\"https://ilga.gov/documents/legislation/ilcs/documents/076501650K15.htm\">can't adopt a rule or use its power</a> in a way that prohibits, or has the effect of prohibiting, solar.</p>\n\n<p>Associations still get a say on design. <a href=\"https://ilga.gov/documents/legislation/ilcs/documents/076501650K20.htm\">Section 20</a> requires an association to adopt a written energy policy statement within 90 days of a member's request or application. That statement can set location, design and architectural standards. The association can choose how panels are laid out on a given roof face, as long as it doesn't bar any roof face or cut estimated annual production by more than 10%. It can't require your neighbors' approval, require a specific technology like solar shingles, or deny you based on whether you buy, lease or finance.</p>\n\n<p>Timing is spelled out too. Under <a href=\"https://ilga.gov/documents/legislation/ilcs/documents/076501650K30.htm\">Section 30</a>, the association must process a solar application within 30 days, or within 120 days if it hasn't adopted a policy statement yet. It can't charge a higher application fee than it does for other property changes. If it misses those deadlines, you can give written notice and 10 business days to fix it, then go ahead with the install.</p>\n\n<p>One note for yard arrays: much of the Illinois law's design language is written around roofs and buildings, so ask for your association's energy policy statement early to see how it handles ground mounts.</p>\n\n<h2>Before You Sign Anything</h2>\n\n<ul><li>Get a copy of your covenants, any architectural guidelines and, in Illinois, the energy policy statement.</li><li>In Indiana, confirm the date your HOA was formed and whether it opted in to the state HOA law.</li><li>Put the plan in writing: site plan, colors, mounting and screening.</li><li>Build to what you submitted. Both states give associations leverage over installs that stray from the approved plan.</li></ul>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994, and we can put together the site plan and specs your HOA will ask for. <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Indiana Code § 32-25.5-1-1 (applicability of the homeowners association article): https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-1/section-32-25-5-1-1/",
      "Court of Appeals of Indiana, McCusker v. Kingsmill Homeowner's Association, Inc., No. 25A-PL-1604, memorandum decision (Feb. 20, 2026): https://public.courts.in.gov/Decisions/api/Document/Opinion?Id=QbIYFaNZT64qCxcksd3o7Gjw-ohpbmY3moBRoh2rlStKsqV5s5AhMeuM9H8SvoE20",
      "Indiana Code § 32-25.5-3.5-5 (permitted reasons for an HOA to prohibit or require removal of a solar energy system): https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-3-5/section-32-25-5-3-5-5/",
      "Indiana Code § 32-25.5-3.5-4 (homeowner petition for approval to install a solar energy system): https://law.justia.com/codes/indiana/title-32/article-25-5/chapter-3-5/section-32-25-5-3-5-4/",
      "Illinois Homeowners' Energy Policy Statement Act, 765 ILCS 165/15: https://ilga.gov/documents/legislation/ilcs/documents/076501650K15.htm",
      "Illinois Homeowners' Energy Policy Statement Act, 765 ILCS 165/20: https://ilga.gov/documents/legislation/ilcs/documents/076501650K20.htm",
      "Illinois Homeowners' Energy Policy Statement Act, 765 ILCS 165/30: https://ilga.gov/documents/legislation/ilcs/documents/076501650K30.htm"
    ]
  },
  {
    "slug": "hail-wind-and-your-solar-panels-how-theyre-tested-and-what-to-look-for-2026-08-17",
    "title": "Hail, Wind and Your Solar Panels: How They're Tested and What to Look For",
    "subtitle": "Ice balls at 51 mph, load ratings in pascals, and why tilt matters. A plain guide to storm-ready solar.",
    "excerpt": "Hail-certified solar panels must survive 1-inch ice balls at 51 mph. Here's what the tests mean and how tilt and good racking add storm margin.",
    "author": "Amp Voltsworth",
    "date": "2026-08-17",
    "readTime": "4 min read",
    "category": "Solar 101",
    "tags": [
      "hail",
      "severe weather",
      "panel specs",
      "ground mount",
      "Indiana"
    ],
    "heroImage": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Long row of tilted ground-mounted solar panels on green grass under a clear blue sky",
    "content": "<p>Anybody who's lived through a few summers in the Wabash Valley has heard hail on the roof. So it's a fair question when you're thinking about solar: what happens to the panels when a storm rolls through?</p>\n\n<p>Short answer: certified panels are tested for it. Here's what those tests are, what the ratings on a spec sheet mean, and how a good install adds margin.</p>\n\n<h2>The Track Record</h2>\n\n<p>The <a href=\"https://www.energy.gov/cmei/femp/hail-damage-mitigation-pv-systems\">U.S. Department of Energy's Federal Energy Management Program</a> puts it plainly: historically, solar modules have survived the majority of hail events they've experienced. DOE says the real trouble has come in areas that have seen very large hail, bigger than 1¾ inches (44 mm) across. That's why the testing and the design choices below matter.</p>\n\n<h2>How Panels Are Hail-Tested</h2>\n\n<p>The baseline is the hail test in IEC 61215, the international design-qualification standard for solar modules. According to DOE, to be \"hail certified\" a module has to come through 11 strikes from 25 mm (1-inch) ice balls fired at 23 meters per second, about 51 mph, with no visible damage and less than 5% loss of power.</p>\n\n<p>That's the minimum. IEC also lists optional, tougher tests with bigger ice balls at higher speeds:</p>\n\n<ul><li>35 mm at 27.2 m/s</li><li>45 mm at 30.7 m/s</li><li>55 mm at 33.9 m/s</li><li>65 mm at 36.7 m/s</li><li>76 mm at 39.5 m/s</li></ul>\n\n<p>DOE notes that manufacturers rarely publish those higher results, so you may have to ask. It also points to advanced programs such as RETC's Hail Durability Test, PVEL's Hail Stress Sequence and FM Global Standard 4478, plus ASTM E1038 testing for hail from 25 to 85 mm.</p>\n\n<h2>Reading the Strength Ratings on a Spec Sheet</h2>\n\n<p>Hail isn't the only load a panel has to carry. Snow pushes down. Wind pushes and pulls. Spec sheets list those as mechanical loads in pascals (Pa) or pounds per square foot. As an example only, not a recommendation, here's what the <a href=\"https://media.qcells.com/v/1FhTENgd/\">Qcells Q.TRON BLK M-G2+ datasheet</a> (April 2026) lists:</p>\n\n<ul><li><strong>Front glass:</strong> 3.2 mm thermally pre-stressed glass.</li><li><strong>Max. design load:</strong> 5,400 Pa push (113 lb/ft²) and 2,400 Pa pull (50 lb/ft²).</li><li><strong>Max. test load:</strong> 8,100 Pa push (169 lb/ft²) and 3,600 Pa pull (75 lb/ft²).</li><li><strong>Certifications:</strong> UL 61730, IEC 61215:2021 and IEC 61730:2023.</li></ul>\n\n<p>That 3.2 mm glass number is worth checking on any panel. DOE recommends modules with at least 3.2 mm front glass for hail resilience, and says glass thinner than that is typically heat-treated rather than tempered, which isn't as strong. DOE also suggests choosing framed modules with a stronger frame, and notes that smaller-format modules may be at lower risk than large-format ones.</p>\n\n<h2>Where the Install Makes a Difference</h2>\n\n<p>Here's a detail most folks never hear. DOE says the most damaging hail falls closer to straight down, so <strong>steeper tilt angles reduce the chance of a direct, perpendicular hit</strong>. The trade-off, DOE adds, is that a steeper tilt sees higher wind loads, so the racking has to be built for it.</p>\n\n<p>That's one more reason we like ground mounts on rural properties. On a ground mount, the tilt is a design choice instead of whatever pitch your roof happens to be. The structure underneath matters just as much. Racking makers publish their own guidance. IronRidge, named here as an example only, not a recommendation, publishes <a href=\"https://www.ironridge.com/ground-based-mounting/resources\">foundation guidance</a> that depends on soil class, and says to consult an engineer for anything outside their certification letters. Matching the footings to your soil is part of doing the job right.</p>\n\n<p>DOE also suggests looking up your own hail risk with NOAA's Storm Prediction Center reports and FEMA's National Risk Index, and checking neighboring counties too, since hail history can look very different one county over.</p>\n\n<h2>After a Big Storm</h2>\n\n<p>If a big storm does leave a mark, DOE's advice is straightforward: if the system shows visible damage, shut it down until it gets a visual and electrical inspection, and test for electrical faults before turning it back on. Look from the ground. Don't climb on the roof to check. DOE also recommends knowing ahead of time what your insurance covers for hail, and whether there's a cap on claims.</p>\n\n<p>Accutek Solar has been pulling wire in west-central Indiana and east-central Illinois since 1994. Want to talk panel specs, tilt and racking for your property? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "U.S. Department of Energy, Federal Energy Management Program, \"Hail Damage Mitigation for PV Systems\" (archived Aug. 3, 2026): https://www.energy.gov/cmei/femp/hail-damage-mitigation-pv-systems",
      "Qcells, Q.TRON BLK M-G2+ Series datasheet (420–440 Wp), Rev02, April 2026: https://media.qcells.com/v/1FhTENgd/",
      "IronRidge, \"Ground-based Documents & Resources\" (Ground Mount FAQ): https://www.ironridge.com/ground-based-mounting/resources"
    ]
  },
  {
    "slug": "ameren-illinois-solar-and-battery-rebates-in-2026-what-changed-this-summer-2026-08-10",
    "title": "Ameren Illinois Solar and Battery Rebates in 2026: What Changed This Summer",
    "subtitle": "$300 a kilowatt for solar, $300 a kilowatt-hour for storage, and a new five-summer string attached to the battery check.",
    "excerpt": "Ameren Illinois pays $300/kW for solar and $300/kWh for batteries. Since June 1, the battery rebate comes with a virtual power plant commitment.",
    "author": "Lumen Clearsky",
    "date": "2026-08-10",
    "readTime": "4 min read",
    "category": "Solar Policy",
    "tags": [
      "Illinois",
      "Ameren Illinois",
      "rebates",
      "battery storage",
      "CRGA"
    ],
    "heroImage": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Golden field of ripening grain under a low setting sun with trees on the horizon",
    "content": "<p>If you live on the Illinois side of our service area, in Edgar, Vermilion, Coles or Champaign County, and Ameren Illinois sends your electric bill, there's real money on the table for solar and batteries. It's not a tax break and it's not a loan. It's a check from the utility, set by state law.</p>\n\n<p>The rules changed this summer, though, especially for batteries. Here's where things stand as of August 2026.</p>\n\n<h2>The Two Rebates, in Plain Numbers</h2>\n\n<p>Illinois law, <a href=\"https://ilga.gov/documents/legislation/ilcs/documents/022000050K16-107.6.htm\">220 ILCS 5/16-107.6</a>, requires large utilities to offer a one-time rebate for customer-sited solar and storage. For a typical home system, the statute sets:</p>\n\n<ul><li><strong>Solar:</strong> $300 per kilowatt of nameplate generating capacity through December 31, 2029, dropping to $250 per kilowatt on January 1, 2030.</li><li><strong>Battery storage:</strong> $300 per kilowatt-hour of battery nameplate capacity through December 31, 2029.</li></ul>\n\n<p>The <a href=\"https://www.citizensutilityboard.org/wp-content/uploads/2026/03/Solar_Storage_Rebates_Final.pdf\">Citizens Utility Board's March 2026 fact sheet</a> confirms Ameren Illinois offers both: a DG Smart Inverter Rebate for the solar and an Energy Storage System (ESS) Rebate for the battery. CUB's own examples: an 8 kW system at $300 a kilowatt is a $2,400 rebate, and an 8 kWh battery at $300 a kilowatt-hour is another $2,400.</p>\n\n<p>CUB explains that the rebates came out of a 2025 change in how Illinois credits solar customers. Systems installed in 2025 or later get their excess-generation credits on the supply section of the bill only, and the one-time rebate was added as part of that change.</p>\n\n<h2>The Fine Print That Matters</h2>\n\n<ul><li><strong>You need a smart inverter.</strong> The law requires a smart inverter installed and operating. It defines that as an inverter meeting the IEEE 1547-2018 standard.</li><li><strong>Timing.</strong> Under the statute, you apply when you sign your interconnection agreement and get the rebate value in effect on that date. The utility has to pay within 60 days after the system is energized, once the application is complete.</li><li><strong>Already have solar from before 2025?</strong> CUB warns that legacy customers who take the generation rebate lose their full crediting on the delivery and tax sections of the bill. Taking only the storage rebate does not cost you that status.</li><li><strong>Big utilities only.</strong> The law applies to electric utilities serving more than 200,000 Illinois customers. In practice that's Ameren Illinois and ComEd, the two utilities CUB's fact sheet covers. If an electric co-op or a city utility sends your bill, this program doesn't apply.</li><li><strong>Battery caps.</strong> For most new projects, the law limits the storage rebate to 25,000 kWh of battery capacity, far beyond any home battery.</li></ul>\n\n<h2>The New Part: Batteries Now Come With a Summer Job</h2>\n\n<p>Illinois' Clean and Reliable Grid Affordability Act (CRGA), which took effect June 1, 2026, tied the battery rebate to a new \"virtual power plant\" program. Ameren's <a href=\"https://www.ameren.com/-/media/files/account/service-options/renewables/illinois/bulletins/2026-04.ashx\">DER Bulletin 2026-04</a> spells it out: as of June 1, 2026, to be eligible for the storage rebate, customers must enroll in Ameren's Scheduled Dispatch Virtual Power Plant (SD VPP).</p>\n\n<p>Here's what that means, per Ameren's <a href=\"https://www.ameren.com/-/media/rates/illinois/residential/electric-rates/other-charges/aiel68rdsdvpp.ashx\">Rider SD VPP tariff</a>, effective July 16, 2026:</p>\n\n<ul><li><strong>The commitment:</strong> at least five summer program periods.</li><li><strong>The schedule:</strong> each weekday from June 1 through September 30, with dispatch from 4 p.m. to 6 p.m. Central for home (behind-the-meter) systems. Ameren's bulletin says these parameters are expected to apply beginning in 2027.</li><li><strong>The pay:</strong> $10.00 per kilowatt of average performance during those dispatch hours, paid by the end of each program year.</li><li><strong>The access:</strong> you agree to set your battery to deliver a specified level of power during those hours, and to give Ameren and its program administrator access to the battery's data and communication system.</li></ul>\n\n<p>Ameren's bulletin also says enrolling doesn't switch your electric supplier or change your supply rate by itself, and you may still qualify for other demand response programs.</p>\n\n<h2>What We'd Tell a Neighbor</h2>\n\n<p>For a lot of east-central Illinois homes, the solar rebate is simple: size the system right, use a qualifying smart inverter, and apply when you sign your interconnection agreement. The battery rebate is still a strong incentive, but it's now a five-summer commitment, so go in with eyes open. If you want your battery reserved for outages on summer afternoons, talk that through before you sign.</p>\n\n<p>Got acreage? A ground mount lets you size the array for the whole farm, and the rebate is figured per kilowatt either way. Accutek Solar has been pulling wire across the state line since 1994, and Seth and the crew can walk you through the paperwork. <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "Illinois General Assembly, 220 ILCS 5/16-107.6, \"Distributed generation and storage rebate\" (as amended by P.A. 104-458, eff. June 1, 2026, and P.A. 104-477, eff. June 26, 2026): https://ilga.gov/documents/legislation/ilcs/documents/022000050K16-107.6.htm",
      "Citizens Utility Board, \"Solar and Storage Rebates in Illinois\" fact sheet (March 2026): https://www.citizensutilityboard.org/wp-content/uploads/2026/03/Solar_Storage_Rebates_Final.pdf",
      "Ameren Illinois, DER Bulletin 2026-04, \"Implications of the Clean and Reliable Grid Affordability Act (CRGA) on ESS Rebate Applications and SD VPP Participation\" (June 2026): https://www.ameren.com/-/media/files/account/service-options/renewables/illinois/bulletins/2026-04.ashx",
      "Ameren Illinois, Rider SD VPP – Scheduled Dispatch Virtual Power Plant, Ill. C. C. No. 1, Sheet No. 68 (filed June 1, 2026; effective July 16, 2026): https://www.ameren.com/-/media/rates/illinois/residential/electric-rates/other-charges/aiel68rdsdvpp.ashx"
    ]
  },
  {
    "slug": "the-box-that-runs-the-show-what-a-hybrid-inverter-actually-does-2026-08-03",
    "title": "The Box That Runs the Show: What a Hybrid Inverter Actually Does",
    "subtitle": "Panels make the power. The inverter decides where it goes. Here's how to read the spec sheet.",
    "excerpt": "Panels get the attention, but the inverter runs the show. Here's what a hybrid inverter does and how to read a real Sol-Ark spec sheet, line by line.",
    "author": "Rick O'Shay Solar",
    "date": "2026-08-03",
    "readTime": "4 min read",
    "category": "Technology",
    "tags": [
      "inverters",
      "Sol-Ark",
      "battery storage",
      "backup power",
      "Solar 101"
    ],
    "heroImage": "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Solar panel array in front of a modern glass building under a pink sunset sky",
    "content": "<p>Panels get all the attention. They're the part you see from the road. But the box on the wall is the one making the decisions: where the power goes, when the battery charges, and what happens the second the grid drops out. That box is the inverter, and on a solar-plus-storage system it's usually a <strong>hybrid inverter</strong>.</p>\n\n<p>Here's what it does, and how to read the spec sheet without a decoder ring.</p>\n\n<h2>Inverter 101: DC In, AC Out</h2>\n\n<p>The <a href=\"https://www.energy.gov/eere/solar/solar-integration-inverters-and-grid-services-basics\">U.S. Department of Energy</a> calls the inverter one of the most important pieces of equipment in a solar energy system. Solar panels make direct current (DC). Your house and the grid run on alternating current (AC). The inverter converts one to the other by switching the DC input back and forth very rapidly, then cleaning it up into a smooth sine wave.</p>\n\n<p>DOE also notes that a household inverter usually does more than convert power. It can monitor the system and talk to the internet, and solar-plus-battery systems rely on advanced inverters to run without support from the grid during an outage, if they're designed to do so.</p>\n\n<p>That last part is the \"hybrid\" job. A hybrid inverter manages three things at once: the solar array, a battery bank, and the grid (plus, often, a generator).</p>\n\n<h2>Reading a Real Spec Sheet: The Sol-Ark 15K</h2>\n\n<p>Sol-Ark is one of the inverter brands Accutek Solar works with, so let's use its 15K whole-home hybrid inverter as the example. These numbers are from Sol-Ark's <a href=\"https://sol-ark.com/wp-content/uploads/2024/06/SK150-0001_Rev5_15K-Datasheet_EN-18June2025.pdf\">June 2025 datasheet (Rev. 5)</a>:</p>\n\n<ul><li><strong>15,000 W nominal real power</strong> at 240V when running on solar and batteries together.</li><li><strong>12,000 W continuous off-grid from batteries alone,</strong> with 13,000 W for up to 30 minutes and 24,000 W for 10 seconds. That short-term surge matters because, as <a href=\"https://resources.kohler.com/power/kohler/industrial/pdf/Sizing_Generators_for_Motor_Starting_WP.pdf\">Kohler explains</a>, a motor's starting current is typically six times its rated full-load current.</li><li><strong>5 ms backup transfer time.</strong> That's 5 thousandths of a second to switch to backup when the grid goes down.</li><li><strong>200 A grid pass-through.</strong> Grid power can flow through the inverter to your loads at up to 200 amps.</li><li><strong>Three MPPTs with two strings each,</strong> and up to 19,500 W of usable PV power.</li><li><strong>48V battery input</strong> with up to 275 A charge and discharge current.</li><li><strong>Built-in automatic generator start</strong> (2-wire) and a dedicated generator port.</li><li><strong>IP65 / NEMA 3R enclosure</strong> and a 10-year standard warranty.</li></ul>\n\n<p><strong>Editor's note, Oct. 2026:</strong> Sol-Ark issued a <a href=\"https://sol-ark.com/wp-content/uploads/2026/09/15KDatasheet_PS-00001_Rev_8_10Sept2026.pdf\">revised datasheet (Rev. 8)</a> on Sept. 10, 2026. Every number in the list above is unchanged on it. A few other specs did change between versions, including the rated MPPT operating voltage range, the battery operating voltage range, the listed height and the grid-to-battery charge efficiency, so we left those out. Always design from the manufacturer's current sheet.</p>\n\n<h2>What Those Numbers Mean at Your House</h2>\n\n<p><strong>MPPT</strong> stands for maximum power point tracking. The <a href=\"https://www.pvsyst.com/help/project-design/grid-connected-system-definition/multi-mppt-inverters/index.html\">PVsyst design software documentation</a> notes that multiple MPPT inputs can work as semi-independent inverters. In practice, that's what lets one inverter take panel groups that don't match, like a south roof and a ground mount out back.</p>\n\n<p><strong>Continuous vs. surge</strong> is the difference between what the inverter can run all day and what it can deliver for a moment. Both matter when you're planning backup for a farmhouse with a well, a freezer and a shop compressor.</p>\n\n<p><strong>Pass-through current</strong> matters because the inverter sits between the grid and your loads. A high pass-through rating lets it handle a full household's grid power when the sun's down and the battery is resting.</p>\n\n<p><strong>Generator start</strong> means the inverter can signal a standby generator to kick on, for example during a long outage, so solar, battery and generator work as one system. If you already own a Kohler, that's a conversation worth having.</p>\n\n<h2>One Inverter Doesn't Fit Every Home</h2>\n\n<p>The 15K is built for whole-home backup. Plenty of homes need less, and some need two units in parallel. Sol-Ark lists the 15K as stackable up to 12 units. The right pick depends on your loads, your battery plans and how much of the house you want running in an outage. Accutek Solar also installs Victron Energy, OutBack Power, Solis, Fronius and other brands, and the right one depends on the job.</p>\n\n<p>We've been pulling wire around Clinton since 1994, and the inverter is where a system's design either comes together or doesn't. Want to talk through what your place needs? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>",
    "sources": [
      "U.S. Department of Energy, Solar Energy Technologies Office, \"Solar Integration: Inverters and Grid Services Basics\": https://www.energy.gov/eere/solar/solar-integration-inverters-and-grid-services-basics",
      "Sol-Ark, 15K-2P-N Residential Hybrid Inverter Datasheet, SK150-0001 Rev. 5 (June 18, 2025): https://sol-ark.com/wp-content/uploads/2024/06/SK150-0001_Rev5_15K-Datasheet_EN-18June2025.pdf",
      "Kohler Power Systems, \"Sizing Generators for Motor Starting\" (Power Systems Topics 103): https://resources.kohler.com/power/kohler/industrial/pdf/Sizing_Generators_for_Motor_Starting_WP.pdf",
      "Sol-Ark, Limitless 15K (15K-2P-LV) Datasheet, PS-00001 Rev. 8 (Sept. 10, 2026; checked for changes): https://sol-ark.com/wp-content/uploads/2026/09/15KDatasheet_PS-00001_Rev_8_10Sept2026.pdf",
      "PVsyst documentation, \"Multi-MPPT inverters\": https://www.pvsyst.com/help/project-design/grid-connected-system-definition/multi-mppt-inverters/index.html"
    ]
  },
  {
    "slug": "whats-going-up-at-cayuga-dukes-new-gas-plant-in-vermillion-county-explained-2026-07-27",
    "title": "What's Going Up at Cayuga: Duke's New Gas Plant in Vermillion County, Explained",
    "subtitle": "Two big turbines, a court case and a 2030 finish line. Here's the public record, in plain English.",
    "excerpt": "Duke broke ground at Cayuga in May on two gas units due in 2029 and 2030. Here's what the IURC approved, the court fight, and what it means for you.",
    "author": "Sol R. Panel",
    "date": "2026-07-27",
    "readTime": "4 min read",
    "category": "Industry News",
    "tags": [
      "Indiana",
      "Vermillion County",
      "Duke Energy",
      "IURC",
      "local news"
    ],
    "heroImage": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Rows of tilted solar panels in a field under a bright blue sky with wispy clouds",
    "content": "<p>Drive north from our shop in Clinton and you'll pass one of the biggest construction jobs in the Wabash Valley. On May 14, 2026, <a href=\"https://news.duke-energy.com/releases/duke-energy-breaks-ground-on-cayuga-energy-complex-project-in-vermillion-county\">Duke Energy ceremonially broke ground</a> on the Cayuga Energy Complex, two new natural gas units at the Cayuga Generating Station here in Vermillion County. Crews had already started grading the site and laying underground piping.</p>\n\n<p>If you've wondered what's going on up there, here's what the public record says as of late July 2026, and what it does and doesn't mean for your own power.</p>\n\n<h2>What's Being Built at Cayuga</h2>\n\n<p>The <a href=\"https://iurc.portal.in.gov/_entity/sharepointdocumentlocation/85d75efb-dbb4-f011-bbd3-001dd8084fd9/bb9c6bba-fd52-45ad-8e64-a444aef13c39?file=ord_46193_102925.pdf\">Indiana Utility Regulatory Commission approved the project</a> on October 29, 2025, in Cause No. 46193. The order covers two combined-cycle natural gas units, each rated at about 738 megawatts in winter, for roughly 1,476 megawatts combined. Combined cycle means the plant captures heat from the gas turbines' exhaust to make steam for a second set of turbines, squeezing more electricity out of the same fuel.</p>\n\n<p>A few numbers from the record:</p>\n\n<ul><li><strong>Cost:</strong> the IURC approved an estimated construction cost of about $3.32 billion, plus financing costs during construction.</li><li><strong>Timeline:</strong> Duke testified it plans to put the first unit in service by September 1, 2029 and the second by May 29, 2030.</li><li><strong>Capacity:</strong> Duke says the new units will raise Cayuga's generating capacity by 470 megawatts, to 1,476 megawatts in total.</li><li><strong>Age of the old plant:</strong> Duke calls Cayuga the oldest coal-fired power plant on its Indiana system, with nearly six decades of service.</li></ul>\n\n<p>Duke Energy Indiana, which serves about 930,000 customers, argued the plant is needed as the state grows. WFYI reported that the IURC found the proposal satisfied Indiana's five pillars of energy policy: reliability, resilience, stability, affordability and environmental sustainability.</p>\n\n<p>The <a href=\"https://www.in.gov/oucc/electric/key-cases-by-utility/duke-energy-rates/cayuga-generating-station-cpcn/\">Indiana Office of Utility Consumer Counselor</a>, the state's ratepayer advocate, recommended denying the request as proposed. The IURC held public field hearings on the case in Bloomington and Terre Haute on April 17, 2025.</p>\n\n<h2>What Happens to the Coal Units</h2>\n\n<p>This part changed along the way. Duke's original plan pointed toward retiring the Cayuga coal units. Then, as <a href=\"https://www.wfyi.org/public-affairs/2025-10-31/duke-gets-approval-for-two-new-gas-units-but-does-not-have-to-shutter-aging-coal-plants\">WFYI reported</a>, a June 2025 settlement with the coal trade group Reliable Energy, Inc. led Duke to study whether the existing coal units could stay online and be sold to a third party. Duke's May 2026 groundbreaking release says that feasibility study is underway. As of late July 2026, no sale had been announced in those sources.</p>\n\n<h2>The Court Fight Over How It's Paid For</h2>\n\n<p>The IURC also approved \"construction work in progress\" ratemaking for the project. WFYI explained that this lets Duke charge customers for the project while the plant is being built, which reduces the utility's financing costs. Duke said the approach will save customers money over the life of the plant. Citizens Action Coalition and Vote Solar disagreed and appealed.</p>\n\n<p>On April 16, 2026, the <a href=\"https://www.in.gov/courts/files/order-other-2026-25A-EX-2999.pdf\">Indiana Supreme Court took the appeal</a> directly from the Court of Appeals at Duke's request. The order set briefing deadlines running through August 21, 2026, and scheduled oral argument for September 17, 2026. The appeal does not stop proceedings at the IURC. As of this writing, there's no ruling.</p>\n\n<h2>What It Means for Your Own Power</h2>\n\n<p>Here's the practical takeaway for a homeowner or farmer in Vermillion, Parke or Vigo County. Decisions about Cayuga are made by Duke, the IURC and the courts, on a timeline that runs to 2030. You don't get a vote on the turbines.</p>\n\n<p>You do get a say in what happens at your own meter. A solar array on your roof, or a ground mount out by the pole barn, makes power right where you use it. Pair it with LiFePO4 battery storage or a Kohler standby generator and you've got your own backup plan, whatever the grid is doing. Accutek Solar has been pulling wire in this county since 1994, and that kind of local, right-sized power is what we build.</p>\n\n<p>None of that is a knock on the folks building Cayuga. The new plant is a big deal for Vermillion County, and Duke says the project will support more than 3,700 jobs. It's simply a reminder that the biggest decisions about the grid get made far from your kitchen table. The ones about your own home don't have to be.</p>\n\n<p>Want to see what your property could do? <a href=\"/quote\">Request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>. Seth and the crew are just down the road.</p>",
    "sources": [
      "Duke Energy News Center, \"Duke Energy breaks ground on Cayuga Energy Complex project in Vermillion County\" (May 14, 2026): https://news.duke-energy.com/releases/duke-energy-breaks-ground-on-cayuga-energy-complex-project-in-vermillion-county",
      "Indiana Utility Regulatory Commission, Order in Cause No. 46193 (Oct. 29, 2025): https://iurc.portal.in.gov/_entity/sharepointdocumentlocation/85d75efb-dbb4-f011-bbd3-001dd8084fd9/bb9c6bba-fd52-45ad-8e64-a444aef13c39?file=ord_46193_102925.pdf",
      "Indiana Office of Utility Consumer Counselor, \"Cayuga Generating Station CPCN\": https://www.in.gov/oucc/electric/key-cases-by-utility/duke-energy-rates/cayuga-generating-station-cpcn/",
      "WFYI, \"Duke gets approval for two new gas units but does not have to shutter aging coal plants\" (Oct. 31, 2025): https://www.wfyi.org/public-affairs/2025-10-31/duke-gets-approval-for-two-new-gas-units-but-does-not-have-to-shutter-aging-coal-plants",
      "Indiana Supreme Court, Published Order, Citizens Action Coalition of Indiana and Vote Solar v. Duke Energy Indiana, LLC and IURC, Court of Appeals Case No. 25A-EX-2999 (filed Apr. 16, 2026): https://www.in.gov/courts/files/order-other-2026-25A-EX-2999.pdf"
    ]
  },
  {
    "slug": "how-big-a-solar-system-do-you-need-start-with-your-electric-bill-2026-07-20",
    "title": "How Big a Solar System Do You Need? Start With Your Electric Bill",
    "subtitle": "Kilowatts, kilowatt-hours and a little honest arithmetic for Wabash Valley homeowners.",
    "excerpt": "The average Indiana home used 901 kWh a month in 2024. Here's how to read your own bill and estimate the solar system size your home actually needs.",
    "author": "Watt Burns",
    "date": "2026-07-20",
    "readTime": "4 min read",
    "category": "Solar 101",
    "tags": [
      "Indiana",
      "Illinois",
      "system sizing",
      "kWh",
      "ground mount"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Rows of ground-mounted solar panels on grass under a blue sky with white clouds",
    "content": "<p>A good solar conversation starts in one place: your electric bill. Not the dollar amount at the bottom. The number of kilowatt-hours you used. That one figure tells you more about the system your home needs than any sales brochure ever will.</p>\n\n<p>Accutek Solar has been pulling wire across west-central Indiana and east-central Illinois since 1994. Here's the plain-English version of how sizing works, using public data you can check yourself.</p>\n\n<h2>Kilowatts vs. Kilowatt-Hours: The Two Numbers That Matter</h2>\n\n<p>These two get mixed up all the time, so let's settle it. The <a href=\"https://www.eia.gov/energyexplained/electricity/measuring-electricity.php\">U.S. Energy Information Administration</a> explains that a watt measures power at a specific moment, and a watt-hour measures how much electricity is used over time. One kilowatt (kW) is 1,000 watts. One kilowatt-hour (kWh) is one kilowatt used for one hour. EIA's example: a 40-watt bulb left on for five hours uses 0.2 kWh.</p>\n\n<p>Here's how that maps to solar:</p>\n\n<ul><li><strong>kW is the size of the system.</strong> An \"8 kW array\" is 8 kilowatts of panels at their rated output.</li><li><strong>kWh is what you use and what the panels make.</strong> Your utility charges you in kilowatt-hours, and a solar production estimate is stated in kilowatt-hours per month or per year.</li></ul>\n\n<p>Sizing is simply matching the second number, your kWh use, with the right amount of the first.</p>\n\n<h2>What the Average Hoosier Home Uses</h2>\n\n<p>According to <a href=\"https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf\">EIA's 2024 residential data</a> (released October 7, 2025, the latest annual figures as of July 2026), the average Indiana household used <strong>901 kWh per month</strong>. That's above the U.S. average of 863 kWh. Across the line in Illinois, the average was 693 kWh per month.</p>\n\n<p>Multiply Indiana's number by 12 and you get about 10,800 kWh a year. That's a useful benchmark, but it's an average across about 3 million Indiana residential customers. A farmhouse in Parke County with a well pump, a shop and electric heat is not the same as a ranch home in Terre Haute on natural gas. Your number is the one that counts.</p>\n\n<p>The fastest way to find it: pull your last 12 months of bills, or log into your utility account and look up your usage history. Add up the kWh. Twelve months matters, because summer air conditioning and winter heating can swing the monthly totals a lot. Jot down your highest and lowest months, too. The gap between them shows how seasonal your use is, and that's worth knowing if storage is on your list.</p>\n\n<h2>What One Kilowatt of Panels Makes in the Wabash Valley</h2>\n\n<p>The free <a href=\"https://pvwatts.nlr.gov/\">PVWatts Calculator</a> from the <a href=\"https://www.nlr.gov/news/detail/press/2025/news-release-energy-department-renames-nrel-national-laboratory-of-the-rockies\">National Laboratory of the Rockies</a> (the federal lab formerly known as NREL, renamed in December 2025) estimates solar production for any address using typical-year weather data. We ran Version 8 for Terre Haute, which uses 2020 typical-year weather data, with PVWatts' standard module setting, a fixed open-rack array facing due south at a 30-degree tilt, and 14% system losses. The estimate: about <strong>1,380 kWh per year for every 1 kW of panels</strong>, with the biggest months in July and August at roughly 140 to 147 kWh each.</p>\n\n<p>Now do the division. To produce the equivalent of the average Indiana home's 10,800 kWh in a year, you'd need around 10,800 ÷ 1,380, or about <strong>8 kW of panels</strong> under those assumptions. That's a starting point for a conversation, not a quote. Your roof angle, shading, orientation and goals all change the answer.</p>\n\n<h2>Where Ground Mounts Change the Math</h2>\n\n<p>A roof decides a lot for you: which way the panels face, how steep they sit, and how many fit before you run out of room. A ground mount takes those limits off the table. On a rural lot, we can aim the array south, set the tilt, and size it for what your home actually uses, not what your roof can hold.</p>\n\n<p>A few other things worth thinking through before you settle on a size:</p>\n\n<ul><li><strong>Planned changes.</strong> Adding a shop, a heat pump or an electric vehicle? Size for the home you'll have, not just the one you have today.</li><li><strong>Daytime vs. nighttime use.</strong> Panels make power when the sun is up. If you want to keep running after dark or through an outage, battery storage enters the conversation.</li><li><strong>Room to grow.</strong> Leaving space on the racking or the property for more panels later can make a future expansion simpler.</li></ul>\n\n<h2>Bring Your Bill, We'll Do the Math</h2>\n\n<p>You don't need to be an engineer to size a solar system. You need 12 months of kWh and a local crew that will run the numbers honestly. Grab your bills and <a href=\"/quote\">request a free quote</a>, call <strong>(812) 878-7343</strong>, or stop by <strong>9797 S Rangeline Rd, Clinton, IN 47842</strong>.</p>\n\n<p>Start with your kWh. The rest is arithmetic.</p>",
    "sources": [
      "U.S. Energy Information Administration, \"Electricity explained: Measuring electricity\": https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      "U.S. Energy Information Administration, Electric Sales, Revenue, and Average Price, Table 5A \"2024 Average Monthly Bill - Residential\" (released Oct. 7, 2025): https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf",
      "National Laboratory of the Rockies (formerly NREL), PVWatts Calculator (Version 8): https://pvwatts.nlr.gov/",
      "National Laboratory of the Rockies, \"Energy Department Renames NREL 'National Laboratory of the Rockies'\" (Dec. 1, 2025): https://www.nlr.gov/news/detail/press/2025/news-release-energy-department-renames-nrel-national-laboratory-of-the-rockies"
    ]
  },
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
    "content": "<h2>The $71 Million Question</h2>\n<p>If you live in Indianapolis or the surrounding counties, you've likely heard the news: AES Indiana just got the green light for a <strong>$71 million rate hike</strong>. But here's the part they didn't put in the glossy mailers—typical residential customers are going to see their monthly bills jump by about <strong>$21 extra</strong> by early 2027. And they aren't the only ones. Duke Energy is currently under fire from the state's ratepayer advocate for allegedly over-collecting <strong>$89 million</strong> from Hoosiers.</p>\n\n<p>Governor Mike Braun recently said what we've all been thinking: <em>'We can't take it anymore.'</em> Over the last 12 months, Indiana electric bills surged by 17.5%—the highest jump in twenty years. This isn't a market adjustment; it's an affordability crisis.</p>\n\n<h2>Why Solar is the Only Real Vote You Have</h2>\n<p>You didn't get a vote on the rate hike. You don't get a vote on when the next 'fuel adjustment charge' hits your mailbox. But you do get a vote on where your power comes from. At Accutek Solar, we look at these numbers and see one thing: the ROI on energy independence has never been higher.</p>\n\n<p>When you install a ground-mount array or a Kohler backup system, you aren't just 'going green.' You are performing a financial strike against a monopoly that has grown comfortable taking your money without your consent. In 2026, the best way to fight back isn't at the ballot box—it's on your roof and in your yard.</p>\n\n<h2>Fact-Checking the Freedom</h2>\n<ul>\n  <li><strong>100% Tax Protection:</strong> Indiana's property tax exemption for solar remains 100% active. Your home value goes up, but your tax bill stays flat.</li\n  <li><strong>Grid Failure Protection:</strong> As infrastructure ages and data centers drain the local supply, brownouts are becoming the 'new normal.' A system from Accutek ensures your lights stay on when the grid gives up.</li\n</ul>\n\n<p>It's time to stop being a customer and start being a producer. Let's get to work.</p>",
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
    "content": "<h2>Harvesting the Sun, Killing the Debt</h2>\n<p>For Indiana and Illinois farmers, the 2026 economic landscape is shifting fast. Input costs are up, equipment is expensive, and operational debt is a constant weight. But there is a silent partner in your operation that's taking a bigger cut every year: your utility provider.</p>\n\n<p>Last week, we saw <strong>Illinois Shines SREC rates jump by 34-43%</strong>. That means for every megawatt-hour your system produces, the state is essentially writing you a bonus check that's nearly 40% larger than it was last year. For an agricultural operation with the space for a massive ground-mount array, the math is undeniable: solar is now one of the highest-yielding crops you can plant.</p>\n\n<h2>The REAP Gap and Why It Doesn't Matter</h2>\n<p>The USDA has temporarily paused REAP grant awards while they rewrite regulations, but the <strong>Guaranteed Loan Program</strong> is still wide open. Waiting for a 'free grant' that might be delayed is a losing strategy when your electric bill is rising by 17% a year. If you can lock in today's hardware prices and today's SREC rates, the system pays for itself in under 10 years, leaving you with 20+ years of pure profit.</p>\n\n<h2>Professional Build vs. Consumer Kits</h2>\n<p>Seth and the crew have seen it a thousand times: a farmer buys a cheap kit online, only to have the racking fail in a 60mph wind or the inverter fry during a summer heatwave. Accutek builds for the field. We use industrial-grade LiFePO4 batteries and cast-aluminum mounts that are engineered for the Midwest. We don't do 'cheap'—we do 'durable.'</p>\n\n<p>Your power bill is a debt you've been paying for life. It's time to settle it once and for all.</p>",
    "sources": [
      "Illinois Power Agency",
      "USDA Rural Development",
      "NREL"
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
    "content": "<h2>How to Pay Off Your Solar Loan in Under 10 Years</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-07-06, our focus is on how to pay off your solar loan in under 10 years...</p>",
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
    "content": "<h2>Why Large Properties Prefer Field Arrays</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-29, our focus is on why large properties prefer field arrays...</p>",
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
    "content": "<h2>Managing System Temperature During Peak Sun</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-22, our focus is on managing system temperature during peak sun...</p>",
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
    "content": "<h2>Understanding the Net Metering Shift</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-15, our focus is on understanding the net metering shift...</p>",
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
    "content": "<h2>The Future of LFP Batteries in Indiana</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-08, our focus is on the future of lfp batteries in indiana...</p>",
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
    "content": "<h2>Spring Cleaning for Solar Panels</h2><p>Accutek Solar is leading the way in professional installations across Indiana and Illinois. For 2026-06-01, our focus is on spring cleaning for solar panels...</p>",
    "sources": [
      "Accutek Internal Data"
    ]
  },
  {
    "slug": "the-summer-solar-paradox-more-sun-less-efficiency",
    "title": "The Summer Solar Paradox: More Sun, Less Efficiency — and What to Do About It",
    "subtitle": "June through August is peak production season, but heat is quietly stealing your watts",
    "excerpt": "Summer means longer days and more sunlight, but it also means hotter panels — and hotter panels produce less power per ray. Here's how the temperature coefficient works, what it costs you, and six practical ways to keep your Indiana or Illinois system running at full throttle all season.",
    "author": "Accutek Solar",
    "date": "2026-06-01",
    "readTime": "6 min read",
    "category": "Solar 101",
    "tags": [
      "summer",
      "efficiency",
      "temperature",
      "maintenance",
      "monitoring",
      "tips"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Solar panels glistening under a bright summer sun",
    "content": "\n<p>Here's a fun bit of solar irony to kick off your summer: the season that delivers the most sunlight to your panels is also the season that makes them the least efficient at converting it. Indiana and Illinois homeowners with solar get roughly <strong>5 peak sun hours per day</strong> in June and July — compared to about 2.5 in December — so summer is still your highest-production season by a wide margin. But the heat that comes with all that sunshine quietly chips away at your panels' output. The good news? The losses are manageable, predictable, and partly preventable. Let's break it down.</p>\n\n<h2>Why Hot Panels Make Less Power</h2>\n<p>Every solar panel has a spec called the <strong>temperature coefficient of power</strong>, usually expressed as a negative percentage per degree Celsius (e.g., -0.35%/°C). It tells you exactly how much output you lose for every degree your panel's temperature rises above <strong>25°C (77°F)</strong> — the standard test condition (STC) that manufacturers use to rate their panels.</p>\n<p>Most residential monocrystalline panels sold today have a temperature coefficient between <strong>-0.30%/°C and -0.40%/°C</strong>. Premium panels from manufacturers like REC and Maxeon push as low as -0.24%/°C. Older polycrystalline panels can be -0.45%/°C or worse.</p>\n<p>Here's the math that matters: on a 90°F (32°C) Indiana afternoon, your roof surface can easily hit <strong>140–150°F (60–65°C)</strong>. The panel itself typically runs about <strong>20–35°C above ambient air temperature</strong>, depending on airflow. So on a 90°F day, your panel might be operating at 55–60°C — that's 30–35 degrees above the 25°C baseline.</p>\n<p>With a typical -0.35%/°C coefficient, that's a <strong>10–12% efficiency loss</strong> compared to the panel's rated output. On a 400-watt panel, that's 40–48 watts quietly evaporating into the atmosphere. Scale that across an 8 kW system (20 panels) and you're losing <strong>800–960 watts</strong> during the hottest hours of the day. That's real money left on the roof.</p>\n\n<h2>But Summer Still Wins — By a Lot</h2>\n<p>Before you panic, let's zoom out. Despite the heat penalty, summer absolutely crushes winter for total production. Here's why:</p>\n<ul>\n  <li><strong>Daylight hours:</strong> Central Indiana gets about <strong>15 hours of daylight</strong> at the June solstice, compared to roughly 9.5 hours in late December. That's nearly 60% more time collecting photons.</li>\n  <li><strong>Sun angle:</strong> The sun is higher in the sky, meaning more direct light hits your panels and less is lost to atmosphere. Solar irradiance peaks around <strong>1,000 W/m²</strong> on clear summer days.</li>\n  <li><strong>Peak sun hours:</strong> Indianapolis averages about <strong>5.0 peak sun hours</strong> in summer versus 2.5 in winter. A \"peak sun hour\" equals one hour of 1,000 W/m² irradiance — it's the standard unit for solar energy availability.</li>\n</ul>\n<p>The net result? Even with 10–12% heat losses during peak hours, a typical 8 kW system in Indiana produces <strong>35–45 kWh per day</strong> in June and July, compared to 15–20 kWh in December. Summer production is roughly <strong>double</strong> winter production. The temperature penalty reduces your theoretical maximum, but the sheer volume of sunlight more than compensates.</p>\n\n<h2>Six Ways to Fight the Heat (Without Climbing on Your Roof)</h2>\n\n<h3>1. Check Your Monitoring App — Seriously, This Week</h3>\n<p>If you have a solar monitoring system (Enphase Enlighten, SolarEdge, Tesla app, etc.), summer is the time to start watching it like a hawk. Specifically, look for your <strong>daily production curve</strong> — it should be a smooth bell shape peaking around midday. If you see sudden dips on clear days, flat spots, or individual panels underperforming, something's off. Common culprits: new tree growth casting afternoon shade, a tripped breaker, a failing microinverter, or a critter-chewed wire. Catching these issues in June means you fix them before losing peak-production weeks.</p>\n\n<h3>2. Keep Your Panels Clean</h3>\n<p>Spring pollen, bird droppings, and wind-blown dust build up over time. A dirty panel can lose <strong>5–25% of its output</strong> depending on how much gunk is blocking the glass. You don't need to hire a crew — a garden hose from ground level, early in the morning before the panels heat up, handles most residential jobs. <strong>Never spray cold water on hot panels</strong> — the thermal shock can crack the glass. And skip the soap unless you have very stubborn residue; detergent leaves a film that attracts more dust. A soft brush on an extension pole works for anything the hose can't handle.</p>\n\n<h3>3. Trim That Tree You've Been Meaning to Trim</h3>\n<p>Trees grow. Every year. That maple that was \"barely in the way\" two summers ago might be throwing an hour of afternoon shade across three panels now. In a string inverter system, one shaded panel can drag down the entire string — so even partial shade on one panel can reduce output from 6–10 panels. If you have microinverters or DC optimizers, the impact is limited to the shaded panel, but it still adds up. A few hours of afternoon shade during June and July can cost you <strong>10–15% of your monthly production</strong>. A $200 tree trim pays for itself in recovered energy within a single season.</p>\n\n<h3>4. Ensure Adequate Airflow</h3>\n<p>Panels need breathing room. The gap between your panels and the roof surface matters — it allows air to circulate underneath, carrying away heat. Standard residential racking creates a <strong>3–6 inch gap</strong>, which is usually sufficient. But if debris (leaves, nests, trash) has accumulated under your array, it blocks airflow and traps heat. Ground-mount systems generally have better airflow than roof mounts, which is one reason they run cooler and produce slightly more per panel in summer. If you have a roof-mount system and notice your panels running especially hot, ask your installer about critter guards — the mesh barriers that keep animals out also keep the underside clear of debris.</p>\n\n<h3>5. Time Your Heavy Usage Right</h3>\n<p>If you're on a net metering plan, this one's less critical — the grid acts as your battery. But if you have a home battery or you're on a time-of-use rate, align your heaviest electricity usage (EV charging, pool pump, laundry, dishwasher) with your production peak — <strong>roughly 10 AM to 3 PM</strong>. Using your own solar power directly avoids round-trip efficiency losses from battery storage and maximizes the financial value of every kilowatt-hour you produce.</p>\n\n<h3>6. Schedule a Professional Mid-Year Checkup</h3>\n<p>Think of it like a car oil change. A professional inspection catches things you can't see from the ground: micro-cracks in cells, hot spots from failing solder joints, loose wiring connections, or degraded weatherproofing. Research from the National Renewable Energy Laboratory (NREL) shows that professionally maintained systems maintain <strong>up to 95% of their original output</strong> after 10 years, compared to 88–90% for neglected systems. At Accutek Solar, we inspect the electrical connections, racking hardware, inverter performance, and panel surfaces. If something's underperforming, we find it before it becomes an expensive repair.</p>\n\n<h2>What About the Rest of 2026?</h2>\n<p>Summer is your system's peak earning season, but it's not the only story. Fall brings cooler temps (better efficiency per ray) with still-decent daylight hours — many systems have a sweet spot in September and October where moderate temperatures and 12-hour days combine for surprisingly strong output. Winter drops off, but a properly sized system with net metering banks summer credits that cover winter shortfalls. The annual cycle is exactly what your installer accounted for when designing your system.</p>\n\n<h2>The Bottom Line</h2>\n<p>Summer is a net positive for your solar system — by a lot. Yes, heat steals 10–12% of your panels' rated efficiency on the hottest days. But the longer days, higher sun angle, and stronger irradiance mean June and July are still your highest-production months by far. The smart play isn't to worry about the physics you can't change — it's to handle the maintenance you can. Clean your panels, trim your trees, watch your monitoring app, and keep that airflow clear. Do those four things, and your system will reward you with the biggest electricity credits of the year. Now go enjoy the sunshine — your panels already are.</p>\n",
    "sources": [
      "NREL — Best Practices for Operation and Maintenance of Photovoltaic Systems (nrel.gov/docs/fy17osti/67553.pdf)",
      "SolarTech — Best Solar Panels for Hot Climates: Temperature Coefficient Guide 2025 (solartechonline.com)",
      "NREL — Solar Resource Data for Indianapolis, IN (nsrdb.nrel.gov)",
      "Illinois State Water Survey — Measured Solar Radiation Over Illinois (isws.illinois.edu)",
      "Fire Mountain Solar — Peak Sun Hours by State, NREL Data (firemountainsolar.com)",
      "EnergySage — How Does Heat Affect Solar Panel Efficiency? (energysage.com)"
    ]
  },
  {
    "slug": "homegrown-watts-inside-americas-solar-manufacturing-boom",
    "title": "Homegrown Watts: Inside America's Solar Manufacturing Boom",
    "subtitle": "From 8 gigawatts to 60 — and why your next panels might have a shorter commute",
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
    "heroImage": "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Solar panels being manufactured in a modern factory setting",
    "content": "<p>Something remarkable has happened to American solar manufacturing, and most homeowners have no idea. Three years ago, the U.S. could barely produce enough solar panels to cover a midsized utility project. Today, domestic factories can churn out over 60 gigawatts of modules per year — a 700% increase since the Inflation Reduction Act landed in 2022.</p><h2>The Factory Floor Scoreboard</h2><p>The numbers are staggering. U.S. solar module production capacity jumped from roughly 8 GW per year before the IRA to over 60 GW by late 2025...</p>",
    "sources": [
      "SEIA",
      "U.S. Commerce Department",
      "EnergySage"
    ]
  },
  {
    "slug": "illinois-solar-incentives-2026-the-prairie-state-is-a-solar-goldmine",
    "title": "Illinois Solar Incentives in 2026: The Prairie State Is a Solar Goldmine",
    "subtitle": "SRECs, net metering, tax breaks — Illinois basically pays you to go solar",
    "excerpt": "Illinois has one of the most generous solar incentive stacks in the Midwest. From the Illinois Shines program to full-retail net metering and property tax exemptions, here's everything homeowners in eastern Illinois need to know.",
    "author": "Ray Watts",
    "date": "2026-05-25",
    "readTime": "7 min read",
    "category": "Solar Policy",
    "tags": [
      "Illinois",
      "incentives",
      "Illinois Shines",
      "net metering",
      "SREC",
      "policy"
    ],
    "heroImage": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Golden sunlight over Illinois farmland",
    "content": "\n<p>If Indiana's solar incentives are a solid handshake, Illinois's are a bear hug with a gift card tucked inside. The Prairie State has quietly built one of the most aggressive solar incentive programs in the country — and if you're a homeowner in Vermilion, Edgar, Champaign, Clark, Crawford, Coles, or Douglas County, you're sitting in the sweet spot. Here's the full breakdown for 2026.</p>\n\n<h2>Illinois Shines: Getting Paid for the Sun You Harvest</h2>\n<p>The crown jewel of Illinois solar incentives is the <strong>Illinois Shines</strong> program, formally known as the Adjustable Block Program (ABP). Here's the short version: when you install solar, your system earns <strong>Solar Renewable Energy Credits (SRECs)</strong> based on how much electricity it's expected to produce over 15 years. Illinois Shines buys those credits upfront or in annual payments — effectively paying you a bonus on top of your electricity savings.</p>\n<p>For a typical 8 kW residential system in 2026, the Illinois Shines incentive works out to roughly <strong>$3,000–$5,000</strong> depending on your utility territory and whether you take the lump sum or annual payments. That's money in your pocket just for generating clean energy. Indiana doesn't have anything like this.</p>\n<p>The program was created by the Future Energy Jobs Act (FEJA) in 2016 and then supercharged by the <strong>Climate and Equitable Jobs Act (CEJA)</strong> in 2021, which dramatically expanded funding. As of 2026, blocks are still open for residential systems — but they fill up, and incentive rates step down as each block closes. Translation: earlier is better.</p>\n\n<h2>Net Metering: Illinois Does It Right</h2>\n<p>Illinois offers <strong>full 1:1 retail-rate net metering</strong> for residential systems up to 25 kW. That means every kilowatt-hour your panels send to the grid earns you a credit at the same rate you'd pay to buy that electricity. No discounts, no wholesale rate haircut — full retail.</p>\n<p>Credits roll over month to month, and at the end of your annual billing cycle, any remaining credits are paid out (at a slightly lower rate, but the monthly rollover is where the real value lives). For a household that sizes their system to match annual usage, net metering alone can reduce your electric bill to the minimum monthly charge — typically $10–$15.</p>\n<p>Compare that to Indiana, where post-2022 systems get credits at roughly 125% of wholesale (significantly less than retail), and you start to see why Illinois homeowners have a structural advantage.</p>\n\n<h2>Property Tax Exemption: Your Home Value Goes Up, Your Taxes Don't</h2>\n<p>Here's a detail that often gets overlooked: Illinois law exempts solar energy systems from property tax assessments for the first 30 years. Solar panels reliably increase home value — studies show an average bump of 3–4% — but in Illinois, that added value <strong>won't increase your property tax bill</strong>.</p>\n<p>In practical terms: you get a more valuable home that costs less to power, and the county assessor doesn't touch it. That's a triple win — equity, savings, and tax protection.</p>\n\n<h2>CEJA and the 100% Clean Energy Mandate</h2>\n<p>The Climate and Equitable Jobs Act didn't just expand Illinois Shines — it committed the state to <strong>50% renewable energy by 2040</strong> and <strong>100% clean energy by 2045</strong>. That's not aspirational language in a press release. It's codified in state law with funding mechanisms and compliance requirements.</p>\n<p>What does this mean for homeowners? It means the state is structurally invested in keeping solar incentives alive and expanding them. Illinois <em>needs</em> distributed solar to hit its targets, and that need translates into sustained policy support. You're not betting on a program that might disappear — you're riding a wave that the state legally has to keep building.</p>\n\n<h2>Stacking the Incentives: What the Math Actually Looks Like</h2>\n<p>Let's run a real-world scenario for an eastern Illinois homeowner installing an 8 kW ground-mount system:</p>\n<ul>\n  <li><strong>System cost:</strong> ~$26,000 (installed, before incentives)</li>\n  <li><strong>Illinois Shines SREC payment:</strong> ~$4,000 (upfront, varies by block)</li>\n  <li><strong>Net cost after SRECs:</strong> ~$22,000</li>\n  <li><strong>Annual electricity savings:</strong> ~$1,800–$2,200 (via net metering)</li>\n  <li><strong>Payback period:</strong> ~10–12 years</li>\n  <li><strong>Panel lifespan:</strong> 25–30+ years</li>\n  <li><strong>Property tax impact:</strong> $0 (exempt for 30 years)</li>\n</ul>\n<p>After payback, you're looking at 15–20 years of near-free electricity. And because Illinois net metering credits at full retail, the annual savings are meaningful — not just symbolic.</p>\n\n<h2>Why Eastern Illinois Is the Sweet Spot</h2>\n<p>Accutek Solar serves seven Illinois counties: Vermilion, Edgar, Clark, Crawford, Coles, Douglas, and Champaign. This part of the state has a few things working in its favor:</p>\n<ul>\n  <li><strong>Rural acreage:</strong> Plenty of unshaded, south-facing land for ground-mount systems — our specialty.</li>\n  <li><strong>Ameren Illinois territory:</strong> Ameren has been a cooperative utility for net metering and Illinois Shines interconnection. The process is well-established.</li>\n  <li><strong>Agricultural properties:</strong> Farms and rural properties may also qualify for <strong>USDA REAP grants</strong> (Rural Energy for America Program), which can cover up to 50% of project costs for eligible agricultural producers and rural small businesses.</li>\n  <li><strong>Lower cost of living:</strong> System installation costs in central/eastern Illinois tend to run lower than the Chicago metro, so your incentive dollars stretch further.</li>\n</ul>\n\n<h2>Illinois vs. Indiana: The Honest Comparison</h2>\n<p>We install on both sides of the state line, and we'll be straight with you: Illinois has the better incentive package right now. Between Illinois Shines, full-retail net metering, and the property tax exemption, an identical system installed in Vermilion County, IL will have a shorter payback period than the same system in Vermillion County, IN. (Yes, they spell it differently. No, we don't know why.)</p>\n<p>That doesn't mean Indiana is bad for solar — it's still a strong investment. But if you're an Illinois homeowner who's been assuming the incentives are the same as your Indiana neighbors', you're leaving money on the table.</p>\n\n<h2>The Bottom Line</h2>\n<p>Illinois has built one of the best solar incentive stacks in the Midwest — arguably the best between the coasts. SRECs pay you upfront. Net metering credits at full retail. Property taxes stay flat. And the state's clean energy law ensures these programs have legs. If you're in our eastern Illinois service area and you've been thinking about solar, 2026 is the year to stop thinking and start harvesting. The sun's already doing its part — let the incentives do theirs.</p>\n",
    "sources": [
      "Illinois Power Agency — Illinois Shines / Adjustable Block Program (illinoisabp.com)",
      "Climate and Equitable Jobs Act (CEJA), Public Act 102-0662 — Illinois General Assembly",
      "Illinois Compiled Statutes 35 ILCS 200/10-720 — Solar energy property tax exemption",
      "DSIRE — Illinois Net Metering (dsireusa.org)",
      "USDA — Rural Energy for America Program (rd.usda.gov)",
      "Illinois Commerce Commission — Net metering rules and tariffs"
    ]
  },
  {
    "slug": "indiana-net-metering-2026-what-homeowners-need-to-know",
    "title": "Indiana Net Metering in 2026: What Homeowners Need to Know",
    "subtitle": "Your meter can spin backward — here's how to make the most of it",
    "excerpt": "Indiana's net metering policy lets solar homeowners bank excess energy as credits. Here's exactly how it works, what the current rules are, and why acting sooner is smarter than later.",
    "author": "Ray Watts",
    "date": "2026-05-24",
    "readTime": "6 min read",
    "category": "Solar Policy",
    "tags": [
      "net metering",
      "Indiana",
      "policy",
      "savings"
    ],
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Solar panels on a sunny Indiana field",
    "content": "\n<p>If you've ever watched your electric meter and wished it could run backward, solar net metering is basically that dream — with paperwork. Indiana's net metering rules allow residential solar owners to send excess electricity back to the grid and receive bill credits in return. It's one of the strongest financial reasons to go solar in the Hoosier State, and in 2026, the rules are still on your side — for now.</p>\n\n<h2>How Net Metering Actually Works</h2>\n<p>When your solar panels produce more electricity than your home uses — say, on a bright July afternoon when you're at work — that surplus flows into the utility grid. Your meter literally tracks the energy going out, and your utility credits you for it. Those credits offset the electricity you pull from the grid at night or on cloudy days.</p>\n<p>Think of it like a savings account for sunshine. You deposit kilowatt-hours during the day and withdraw them when the sun's off the clock.</p>\n\n<h2>Indiana's Current Net Metering Rules</h2>\n<p>Under Indiana's SEA 309 (signed into law in 2017), the state's net metering landscape has been transitioning. Here's where things stand in 2026:</p>\n<ul>\n  <li><strong>Existing systems installed before July 1, 2022</strong> are grandfathered into full 1:1 retail-rate net metering for 30 years from their interconnection date.</li>\n  <li><strong>Systems installed after July 1, 2022</strong> receive credits at approximately 125% of the average wholesale rate — still a meaningful credit, but less than full retail.</li>\n  <li><strong>System size cap:</strong> Net metering is available for systems up to 1 MW for residential and commercial customers.</li>\n  <li><strong>Monthly excess:</strong> Credits roll over month to month, which is great for banking summer overproduction against winter usage.</li>\n</ul>\n\n<h2>Why \"Sooner\" Beats \"Later\"</h2>\n<p>Indiana's net metering compensation structure could change again. Utilities continue to lobby for lower credit rates, arguing that solar customers shift grid maintenance costs to non-solar neighbors. Whether you agree with that framing or not, the trend nationwide has been toward reduced net metering compensation over time.</p>\n<p>The takeaway? If you're considering solar, locking in today's rate structure is a hedge against future policy changes. Every year you wait is a year of credits you don't earn.</p>\n\n<h2>Pair Net Metering With the Right System Design</h2>\n<p>Net metering works best when your system is sized to roughly match your annual electricity consumption. Oversizing means you produce credits you might not fully use (Indiana utilities don't write you a check for annual excess). Undersizing means you're still buying more grid power than necessary.</p>\n<p>At Accutek Solar, we pull your last 12 months of utility data and design a system that hits the sweet spot — maximum offset, minimum waste. Ground-mount, roof-mount, or pole-mount — we engineer the layout for your site and your usage pattern.</p>\n\n<h2>The Bottom Line</h2>\n<p>Indiana net metering remains one of the best financial tools for solar homeowners in 2026. The credits are real, the math works, and the policy — while evolving — still rewards early adopters. If you've been on the fence, this is the year your electric bill starts working for you instead of against you.</p>\n",
    "sources": [
      "Indiana SEA 309 (2017) — Indiana General Assembly",
      "Indiana Utility Regulatory Commission (IURC) net metering orders",
      "DSIRE — Database of State Incentives for Renewables & Efficiency (dsireusa.org)"
    ]
  },
  {
    "slug": "watts-new-solar-panels-hit-25-percent-efficiency",
    "title": "Watts New: Commercial Solar Panels Crack 25% Efficiency",
    "subtitle": "Why the efficiency race matters for your roof — and your wallet",
    "date": "2026-05-24",
    "category": "Technology",
    "author": "Accutek Solar",
    "readTime": "6 min read",
    "excerpt": "The solar industry just hit a milestone: mainstream commercial panels now exceed 25% efficiency. Here's what that means for Indiana and Illinois homeowners considering a system in 2026.",
    "heroImage": "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Close-up of modern high-efficiency solar panels in sunlight",
    "tags": [
      "solar panels",
      "efficiency",
      "technology",
      "2026"
    ],
    "sources": [
      "NREL Best Research-Cell Efficiency Chart (https://www.nrel.gov/pv/cell-efficiency.html)",
      "LONGi Green Energy — HJT Record (https://www.longi.com/en/news/record-breaking/)",
      "EnergySage Solar Panel Efficiency Guide (https://www.energysage.com/solar/solar-panel-efficiency/)"
    ],
    "content": "\n      <p>If you've been watching the solar world, you might've heard the buzz: commercial solar panels — the kind we install on your roof or in your field — have officially crossed the <strong>25% efficiency threshold</strong>. That's not a lab curiosity. That's panels you can buy today.</p>\n\n      <h2>What Does \"25% Efficiency\" Actually Mean?</h2>\n      <p>Solar panel efficiency measures how much of the sunlight hitting a panel gets converted into usable electricity. At 25%, a standard 400-watt panel produces roughly <strong>20% more power</strong> than a typical 20%-efficient panel of the same physical size.</p>\n      <p>For a real-world Indiana home with a 6 kW system, that efficiency bump can translate to <strong>1,200–1,500 additional kilowatt-hours per year</strong> — enough to run your central A/C for most of the summer.</p>\n\n      <h2>The Technology Behind the Jump</h2>\n      <p>Two key technologies are driving this leap:</p>\n      <ul>\n        <li><strong>N-type TOPCon cells</strong> — These use a tunneling oxide layer to reduce electron recombination at the surface. Translation: less energy lost as heat, more converted to electricity. Manufacturers like LONGi, JinkoSolar, and Trina have scaled production of TOPCon panels to the point where pricing is competitive with older PERC technology.</li>\n        <li><strong>Heterojunction (HJT) cells</strong> — HJT layers amorphous silicon on crystalline silicon, creating a cell that performs exceptionally well in <em>low light and high temperatures</em>. LONGi set a world record of 27.30% for an HJT cell in late 2024, and commercial HJT panels are now shipping above 23%.</li>\n      </ul>\n\n      <h2>Why This Matters in Indiana &amp; Illinois</h2>\n      <p>We don't live in Arizona. Our peak sun hours average <strong>4.2–4.7 hours per day annually</strong> (per NREL data for the Wabash Valley region). Higher-efficiency panels squeeze more energy from every hour of sunlight — which is especially valuable during our shorter winter days and overcast stretches.</p>\n      <p>Practically speaking:</p>\n      <ul>\n        <li><strong>Smaller system footprint</strong> — Fewer panels needed to hit your target production, which helps if your roof space is limited or your ground-mount area is constrained.</li>\n        <li><strong>Better return on investment</strong> — More kilowatt-hours per dollar spent means a faster payback period. At current Indiana electricity rates (~$0.14/kWh), a 25%-efficient 8 kW system can save roughly <strong>$1,600–$1,900 per year</strong>.</li>\n        <li><strong>Future-proofing</strong> — Higher-efficiency panels degrade more slowly. NREL data shows N-type panels typically degrade at 0.3–0.4% per year vs. 0.5–0.7% for older PERC panels.</li>\n      </ul>\n\n      <h2>The Bottom Line</h2>\n      <p>The efficiency race isn't just a spec-sheet bragging contest. For a family in Terre Haute or a farm operation in Edgar County, it means <strong>more power, less space, and better long-term economics</strong>. If you got a quote two or three years ago, it's worth getting a fresh one — the panels available today are meaningfully better.</p>\n      <p>Want to see what a modern high-efficiency system looks like for your property? <strong>We'll run the numbers for free.</strong></p>\n    "
  },
  {
    "slug": "ground-mount-vs-roof-mount-solar-which-is-right-for-your-property",
    "title": "Ground-Mount vs. Roof-Mount Solar: Which Is Right for Your Property?",
    "subtitle": "Spoiler: it depends on your yard, your roof, and your tolerance for ladders",
    "excerpt": "Choosing between ground-mount and roof-mount solar isn't just about aesthetics — it's about energy output, maintenance access, and long-term ROI. Here's a no-nonsense comparison.",
    "author": "Duke Electra",
    "date": "2026-05-17",
    "readTime": "7 min read",
    "category": "Solar 101",
    "tags": [
      "ground mount",
      "roof mount",
      "installation",
      "comparison"
    ],
    "heroImage": "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Roof-mounted solar panel array on a residential home",
    "content": "\n<p>When folks call us about going solar, one of the first questions is: \"Does it go on the roof or in the yard?\" The honest answer is \"yes\" — and which one's right for you depends on a few key factors. After 32 years of installing both, here's our no-spin breakdown.</p>\n\n<h2>Roof-Mount: The Classic Choice</h2>\n<p>Roof-mounted solar is what most people picture when they think \"solar panels.\" Panels go on your existing roof structure, using racking systems that attach to your rafters. It's the most common residential installation type in the U.S.</p>\n<h3>Pros</h3>\n<ul>\n  <li><strong>Lower installation cost:</strong> No foundation work — your roof is the structure. Typically 10–20% cheaper than ground-mount for the same system size.</li>\n  <li><strong>No yard space needed:</strong> Perfect for suburban lots where every square foot of lawn counts.</li>\n  <li><strong>Out of the way:</strong> Panels are up high and unobtrusive (your HOA may still have opinions, though Indiana law limits HOA solar restrictions).</li>\n</ul>\n<h3>Cons</h3>\n<ul>\n  <li><strong>Roof condition matters:</strong> If your roof needs replacing in the next 10 years, you'll want to do that first — or plan to remove and reinstall panels later.</li>\n  <li><strong>Orientation is fixed:</strong> You're stuck with whatever direction your roof faces. South-facing is ideal; east/west is workable; north-facing is a dealbreaker.</li>\n  <li><strong>Maintenance access:</strong> Cleaning panels or troubleshooting means getting on the roof. It's not dangerous with proper equipment, but it's less convenient.</li>\n  <li><strong>Shading:</strong> Trees, chimneys, and neighboring structures can reduce output on specific roof sections.</li>\n</ul>\n\n<h2>Ground-Mount: The Premium Play</h2>\n<p>Ground-mount arrays sit on steel or aluminum racks anchored into the ground — either with concrete piers, driven posts, or helical piles. They're common on rural properties, farms, and larger lots.</p>\n<h3>Pros</h3>\n<ul>\n  <li><strong>Optimal orientation and tilt:</strong> We set the exact angle and direction for maximum energy harvest. No compromising with roof geometry.</li>\n  <li><strong>Easy maintenance:</strong> Everything is at waist-to-shoulder height. Cleaning, inspections, and repairs are straightforward.</li>\n  <li><strong>No roof dependency:</strong> Your roof age, condition, and material don't matter.</li>\n  <li><strong>Scalability:</strong> Easier to expand if your energy needs grow — just extend the racking.</li>\n</ul>\n<h3>Cons</h3>\n<ul>\n  <li><strong>Higher upfront cost:</strong> Foundation, racking, and trenching for buried conduit add 10–20% compared to roof-mount.</li>\n  <li><strong>Uses yard space:</strong> A typical 8 kW residential system needs roughly 400–500 sq ft of ground area.</li>\n  <li><strong>Permitting:</strong> Some counties require setback compliance and additional permits for ground structures.</li>\n</ul>\n\n<h2>The Third Option: Pole-Mount</h2>\n<p>Pole-mount systems sit on a single steel pole with a top-of-pole rack. Some include single-axis or dual-axis sun trackers that follow the sun across the sky, boosting output by 15–25% compared to fixed arrays. They're ideal for rural properties with open acreage.</p>\n\n<h2>How We Help You Decide</h2>\n<p>At Accutek Solar, roughly half of our residential installs are ground-mount — which is unusually high for the industry and reflects our rural Indiana and Illinois service area. We don't push one type over another. During your free site visit, we evaluate your roof condition, yard space, shading, soil type, and electrical panel location. Then we design whichever option delivers the best long-term ROI for your specific property.</p>\n\n<h2>The Verdict</h2>\n<p>There's no universal \"better\" — there's only what's better for <em>your</em> site. Tight suburban lot with a south-facing roof in good shape? Roof-mount. Rural property with open acreage and a 30-year-old roof? Ground-mount all day. Either way, the sun doesn't care where the panels are — it just keeps showing up.</p>\n",
    "sources": [
      "EnergySage — Ground-Mounted Solar Panels: Costs, Pros & Cons (energysage.com)",
      "SEIA — Solar Installation Types (seia.org)",
      "Indiana Code IC 32-21-14 — Solar easements and HOA restrictions"
    ]
  },
  {
    "slug": "solar-battery-backup-vs-generator-which-keeps-the-lights-on",
    "title": "Solar Battery vs. Generator: Which Keeps the Lights On?",
    "subtitle": "The backup power cage match — with a surprise winner",
    "date": "2026-05-12",
    "category": "Solar 101",
    "author": "Accutek Solar",
    "readTime": "6 min read",
    "excerpt": "When the grid goes down, you need a plan. We compare solar battery backup systems with standby generators — cost, reliability, run time, and when it makes sense to have both.",
    "heroImage": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Home battery storage system mounted on a garage wall",
    "tags": [
      "battery storage",
      "generators",
      "backup power",
      "Kohler",
      "comparison"
    ],
    "sources": [
      "EIA — Average U.S. Electricity Outage Duration (https://www.eia.gov/electricity/data/eia861/)",
      "EnergySage — Solar Battery Cost Guide (https://www.energysage.com/solar/solar-energy-storage/what-do-solar-batteries-cost/)",
      "Kohler — Home Generators (https://www.kohlerpower.com/en/residential/generators)"
    ],
    "content": "\n      <p>Indiana isn't exactly Tornado Alley, but between summer storms, ice events, and the occasional grid hiccup, the average Hoosier experiences <strong>2–4 power outages per year</strong> (EIA data). If you're tired of resetting clocks and losing a freezer full of venison, you've got two main options: <strong>battery backup</strong> or a <strong>standby generator</strong>.</p>\n      <p>We install both. Here's the honest comparison.</p>\n\n      <h2>Solar Battery Backup</h2>\n      <p><strong>What it is:</strong> A lithium battery (usually lithium iron phosphate / LFP) paired with your solar array that stores excess energy and powers your home during an outage.</p>\n      <p><strong>Popular options:</strong> Enphase IQ Battery 5P, Tesla Powerwall 3, Sol-Ark + battery rack.</p>\n      <table>\n        <thead><tr><th>Pro</th><th>Con</th></tr></thead>\n        <tbody>\n          <tr><td>Silent operation — no exhaust, no noise</td><td>Limited capacity: a single 10 kWh battery runs essential loads for 8–12 hours</td></tr>\n          <tr><td>Recharges from solar daily (unlimited fuel if sun shines)</td><td>Higher upfront cost: $10,000–$15,000 installed for a single battery</td></tr>\n          <tr><td>Zero maintenance</td><td>Can't power whole-house heavy loads (A/C, well pump, dryer) for long</td></tr>\n          <tr><td>Daily value: time-of-use shifting, self-consumption optimization</td><td>Performance drops in extreme cold without thermal management</td></tr>\n        </tbody>\n      </table>\n\n      <h2>Standby Generator</h2>\n      <p><strong>What it is:</strong> A permanently installed natural gas or propane generator with an automatic transfer switch (ATS) that kicks on seconds after the grid drops.</p>\n      <p><strong>Our go-to:</strong> Kohler home generators — we're an authorized dealer and installer.</p>\n      <table>\n        <thead><tr><th>Pro</th><th>Con</th></tr></thead>\n        <tbody>\n          <tr><td>Powers your ENTIRE home — A/C, well pump, everything</td><td>Requires fuel (natural gas or LP tank)</td></tr>\n          <tr><td>Runs indefinitely as long as fuel supply lasts</td><td>Noise: 65–70 dB during operation</td></tr>\n          <tr><td>Lower upfront cost: $6,000–$12,000 installed for 14–24 kW</td><td>Annual maintenance required (oil, filters, exercise runs)</td></tr>\n          <tr><td>Proven reliability in extended multi-day outages</td><td>No daily energy savings — only valuable during outages</td></tr>\n        </tbody>\n      </table>\n\n      <h2>The Hybrid Play: Best of Both Worlds</h2>\n      <p>Here's what we're seeing more and more: <strong>solar + battery + generator</strong>. The battery handles the short outages (a few hours to a day), recharges from your solar panels, and provides daily energy value. The generator is your insurance policy for the multi-day ice storm or extended grid failure.</p>\n      <p>In this setup, the battery and solar dramatically <strong>reduce how often the generator runs</strong>, which means less fuel, less noise, and less wear. The generator is there for the worst-case scenario.</p>\n\n      <h2>Which Is Right for You?</h2>\n      <ul>\n        <li><strong>Urban/suburban home with natural gas</strong> → A Kohler standby generator is hard to beat on cost and whole-home coverage.</li>\n        <li><strong>Rural property already going solar</strong> → Battery backup makes sense as an add-on. If you're off-grid or want energy independence, battery + solar is the foundation.</li>\n        <li><strong>Anyone who wants the belt-and-suspenders approach</strong> → Solar + battery + generator is the gold standard for resilience.</li>\n      </ul>\n\n      <p><strong>We install and service all three options.</strong> Let us assess your property, loads, and goals — we'll recommend the setup that actually makes sense for your situation.</p>\n    "
  },
  {
    "slug": "battery-storage-101-is-a-home-battery-worth-it-in-2026",
    "title": "Battery Storage 101: Is a Home Battery Worth It in 2026?",
    "subtitle": "Blackout insurance, bill optimizer, or expensive paperweight? Let's do the math.",
    "excerpt": "Home batteries are getting cheaper and smarter, but are they worth the investment for Indiana and Illinois homeowners? We break down the costs, use cases, and when they actually make sense.",
    "author": "Dirk Photon",
    "date": "2026-05-10",
    "readTime": "8 min read",
    "category": "Technology",
    "tags": [
      "battery storage",
      "backup power",
      "technology",
      "ROI"
    ],
    "heroImage": "https://images.unsplash.com/photo-1558449028-b53a39d100fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Modern home battery storage system mounted on a garage wall",
    "content": "\n<p>Home batteries have gone from Silicon Valley novelty to mainstream conversation in about five years. Tesla Powerwalls, Enphase IQ Batteries, Franklin WH — the options are multiplying and the prices are dropping. But the question we get most from Indiana and Illinois homeowners isn't \"which battery?\" It's \"do I even need one?\" Fair question. Let's dig in.</p>\n\n<h2>What a Home Battery Actually Does</h2>\n<p>A home battery stores electricity — either from your solar panels or from the grid — and releases it when you need it. That's it. The magic is in <em>when</em> it stores and releases, which creates three main use cases:</p>\n<ol>\n  <li><strong>Backup power during outages:</strong> When the grid goes down, your battery kicks in to keep critical loads running — lights, fridge, internet, medical equipment. Most batteries can power essential circuits for 8–12 hours.</li>\n  <li><strong>Solar self-consumption:</strong> Instead of sending excess solar to the grid for net metering credits, you store it and use it yourself at night. This is most valuable in states where net metering credits are less than retail rate.</li>\n  <li><strong>Time-of-use arbitrage:</strong> In areas with time-of-use (TOU) electricity pricing, you charge the battery when rates are cheap and discharge when rates are expensive. Indiana doesn't widely use TOU rates yet, so this is more relevant in Illinois.</li>\n</ol>\n\n<h2>The Real Costs in 2026</h2>\n<p>Battery prices have dropped significantly, but they're still a meaningful investment:</p>\n<ul>\n  <li><strong>Installed cost:</strong> A typical 10–13.5 kWh battery system runs $8,000–$14,000 installed, depending on the brand and complexity of the installation.</li>\n  <li><strong>Lifespan:</strong> Most lithium-iron-phosphate (LFP) batteries are warrantied for 10–15 years or a set number of cycles (typically 4,000–6,000 full cycles).</li>\n  <li><strong>Maintenance:</strong> Essentially zero. Batteries are solid-state with no moving parts.</li>\n</ul>\n\n<h2>When a Battery Makes Sense in Indiana/Illinois</h2>\n<p>Here's our honest take on who benefits most:</p>\n<ul>\n  <li><strong>Frequent outage areas:</strong> If you're in a rural area where ice storms or wind events knock out power multiple times per year, backup power has real value — both for comfort and for protecting a freezer full of food.</li>\n  <li><strong>Medical equipment needs:</strong> If someone in the household depends on powered medical devices, battery backup isn't a luxury — it's a safety measure.</li>\n  <li><strong>Off-grid systems:</strong> If you're fully off-grid, batteries aren't optional — they're the whole deal. Combined with a generator for extended cloudy periods, batteries are your primary power storage.</li>\n  <li><strong>Illinois TOU customers:</strong> If your Illinois utility offers time-of-use rates with significant peak/off-peak spread, arbitrage can shorten your payback period.</li>\n</ul>\n\n<h2>When a Battery Might Not Be Worth It (Yet)</h2>\n<p>For grid-tied Indiana homes with net metering and reliable power, the pure financial math on a battery is often tight. Net metering effectively uses the grid as a free battery — you export during the day and import at night. Adding a physical battery to this equation can double your solar investment without doubling your savings.</p>\n<p>That said, battery economics are improving every year. Prices dropped roughly 20% between 2024 and 2026, and that trend is expected to continue as manufacturing scales up globally.</p>\n\n<h2>Batteries vs. Generators</h2>\n<p>We install both Kohler generators and battery systems, so we don't have a horse in this race. Here's the quick comparison:</p>\n<ul>\n  <li><strong>Generators</strong> provide unlimited runtime (as long as you have fuel), whole-home coverage, and lower upfront cost ($5,000–$12,000 installed for a Kohler standby unit). They do require fuel, maintenance, and produce noise and emissions.</li>\n  <li><strong>Batteries</strong> are silent, maintenance-free, and work seamlessly with solar. But they have limited capacity and higher cost per kWh of backup.</li>\n  <li><strong>Hybrid approach:</strong> Many of our customers pair a smaller battery for instant switchover with a generator for extended outages. Belt and suspenders — works great.</li>\n</ul>\n\n<h2>The Bottom Line</h2>\n<p>A home battery is worth it in 2026 if you have a specific need it solves — outage protection, medical power, off-grid living, or TOU optimization. If you're grid-tied with solid net metering and reliable power, you might want to wait a year or two for prices to drop further. Either way, we'll run the numbers for your specific situation during a free consultation — no sales pressure, just math.</p>\n",
    "sources": [
      "NREL — Cost Projections for Utility-Scale Battery Storage (nrel.gov)",
      "EnergySage — Home Battery Cost Guide 2025-2026 (energysage.com)",
      "Kohler Power — Standby Generator Sizing Guide (kohlerpower.com)",
      "BloombergNEF — Battery Pack Prices (about.bnef.com)"
    ]
  },
  {
    "slug": "solar-panel-myths-busted-5-things-your-neighbor-got-wrong",
    "title": "Solar Panel Myths Busted: 5 Things Your Neighbor Got Wrong",
    "subtitle": "No, solar panels don't work only in Arizona. Yes, we checked.",
    "excerpt": "From 'solar doesn't work here' to 'panels destroy your roof,' we're tackling the top five solar myths that keep popping up at Indiana barbecues. Spoiler: the sun works in the Midwest too.",
    "author": "Bill Kilowatt",
    "date": "2026-05-03",
    "readTime": "5 min read",
    "category": "Solar 101",
    "tags": [
      "myths",
      "education",
      "solar basics",
      "FAQ"
    ],
    "heroImage": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    "heroAlt": "Bright sunlight breaking through clouds over a green field",
    "content": "\n<p>We love our neighbors. But after 32 years in the solar business, we've heard some doozies at cookouts, church potlucks, and hardware store checkout lines. Here are five solar myths that refuse to die — and the facts that should finally put them to rest.</p>\n\n<h2>Myth #1: \"We Don't Get Enough Sun Here for Solar to Work\"</h2>\n<p><strong>The truth:</strong> Indiana and Illinois receive about 4.2–4.7 peak sun hours per day on an annual average basis. That's more solar resource than Germany — which was the world's top solar producer for over a decade and still generates about 10% of its electricity from solar.</p>\n<p>Solar panels don't need blazing desert heat. They need <em>light</em>, and they actually perform slightly better in cooler temperatures. A crisp, clear Indiana spring day is peak solar production weather.</p>\n\n<h2>Myth #2: \"Solar Panels Will Destroy My Roof\"</h2>\n<p><strong>The truth:</strong> Properly installed solar panels actually <em>protect</em> the section of roof they cover from UV degradation, rain, and hail. The mounting hardware uses lag bolts sealed with flashing — the same waterproofing methods used for any roof penetration (think plumbing vents or satellite dishes).</p>\n<p>The key phrase is \"properly installed.\" This is where hiring experienced, licensed installers matters. In 32 years, we've never had a roof leak from a solar installation. Not once.</p>\n\n<h2>Myth #3: \"Solar Panels Require Constant Maintenance\"</h2>\n<p><strong>The truth:</strong> Modern solar panels have no moving parts and require almost zero maintenance. Rain handles most cleaning naturally. The inverter (the box that converts DC to AC power) might need attention once every 10–15 years. That's about it.</p>\n<p>We recommend a visual inspection once a year — check for debris, animal nests, or shading from new tree growth. Total time: five minutes with a cup of coffee. It's the lowest-maintenance major home investment you'll ever make.</p>\n\n<h2>Myth #4: \"Solar Is Only for Rich People\"</h2>\n<p><strong>The truth:</strong> The cost of residential solar has dropped over 70% in the last decade. A typical 8 kW residential system in Indiana costs roughly $22,000–$30,000 before incentives. With state programs, USDA REAP grants (for rural/ag properties), and financing options, the effective cost is often significantly lower.</p>\n<p>More importantly, solar is an investment that pays you back. In Indiana, a properly sized system typically pays for itself in 8–12 years through electricity savings — and the panels keep producing for 25–30+ years. That's 15–20 years of essentially free electricity after payback.</p>\n\n<h2>Myth #5: \"I Should Wait Because Solar Technology Is About to Get Way Better\"</h2>\n<p><strong>The truth:</strong> This one has been \"true\" for 20 years, and people who waited 20 years ago missed out on 20 years of savings. Solar panel efficiency has improved steadily — from about 15% to 22–24% for standard residential panels — but the gains are incremental, not revolutionary.</p>\n<p>Meanwhile, every month you wait is a month of electricity you're buying instead of generating. The best time to plant a tree was 20 years ago. The second best time is now. Same goes for solar panels (which are arguably better than trees at generating electricity, though worse at providing shade for hammocks).</p>\n\n<h2>The Real \"Myth\" to Watch Out For</h2>\n<p>The biggest misconception isn't about the technology — it's that you need to figure everything out yourself before calling an installer. A good solar company (hi, that's us) will evaluate your property, pull your utility data, model your savings, and give you real numbers — all for free. You don't need to become a solar engineer. You just need to make the call.</p>\n",
    "sources": [
      "NREL — Solar Resource Data for the United States (nrel.gov/gis)",
      "Fraunhofer ISE — Photovoltaics Report (ise.fraunhofer.de)",
      "SEIA/Wood Mackenzie — U.S. Solar Market Insight Q1 2026 (seia.org)",
      "EnergySage — Solar Panel Cost Guide (energysage.com)"
    ]
  }
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPosts() {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogCategories() {
  return [...new Set(BLOG_POSTS.map((p) => p.category))];
}
