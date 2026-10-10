// Centralized site content
import {
  Sun,
  Zap,
  Cpu,
  Activity,
} from "lucide-react";

export const COMPANY = {
  name: "Accutek Solar",
  tagline: "30 years of electrical expertise. Solar, storage, backup power & facility automation across West Central Indiana & East Central Illinois.",
  founded: 1994,
  yearsInBusiness: 30,
  founder: "Keith Davis",
  president: "Keith Davis",
  owners: ["Seth Davis"],
  ownership: "Founded by Keith Davis in 1994 - still President today. His son Seth Davis runs day-to-day operations.",
  phone: "(812) 878-7343",
  phoneRaw: "+18128787343",
  email: "solarseth7@yahoo.com",
  address: {
    street: "9797 S Rangeline Rd.",
    city: "Clinton",
    state: "IN",
    zip: "47842",
    full: "9797 S Rangeline Rd. Clinton, IN 47842",
  },
  hours: "Mon-Fri 8:00 AM - 5:00 PM EST",
  website: "www.AccutekSolar.com",
  websiteUrl: "https://www.accuteksolar.com",
  logos: {
    horizontal: "/brand/logo_horizontal.png",
    icon: "/brand/logo_icon_only.png",
    primary: "/brand/logo_primary.png",
    onGreen: "/brand/logo_on_green.png",
    stacked: "/brand/logo_stacked.png",
  },
  housecallWidgetUrl: "https://client.housecallpro.com/reviews/widget/097cf23f-be1a-41ea-981b-8e6b9c7514eb",
  aboutShort: "Family-owned and serving West Central Indiana and East Central Illinois since 1994. With 30 years of electrical expertise, Accutek Solar provides technically precise energy solutions for residential and commercial clients.",
};

// Service area broken into 4 operational quadrants
export const SERVICE_QUADRANTS = [
  {
    id: "in-west",
    label: "West Central Indiana - West",
    state: "Indiana",
    counties: ["Warren", "Fountain", "Vermillion", "Parke", "Vigo"],
    description: "Western corridor of Indiana along the IL state line.",
  },
  {
    id: "in-east",
    label: "West Central Indiana - East",
    state: "Indiana",
    counties: ["Montgomery", "Hendricks", "Putnam", "Clay", "Sullivan"],
    description: "Inland Indiana counties east of our home base in Clinton.",
  },
  {
    id: "il-east",
    label: "East Central Illinois - East",
    state: "Illinois",
    counties: ["Vermilion", "Edgar", "Clark", "Crawford"],
    description: "Eastern Illinois counties bordering Indiana.",
  },
  {
    id: "il-west",
    label: "East Central Illinois - West",
    state: "Illinois",
    counties: ["Champaign", "Douglas", "Coles"],
    description: "Inland central Illinois counties.",
  },
];

// Flattened helper for legacy uses
export const SERVICE_AREAS = {
  Indiana: ["Vermillion", "Parke", "Fountain", "Montgomery", "Putnam", "Clay", "Sullivan", "Vigo", "Hendricks", "Warren"],
  Illinois: ["Edgar", "Vermilion", "Clark", "Crawford", "Coles", "Douglas", "Champaign"],
};

export const SERVICES = [
  {
    id: "solar-storage",
    code: "01",
    title: "Solar & Storage",
    icon: Sun,
    summary:
      "Custom photovoltaic system design, professional installation, and multi-brand repair - including legacy systems we didn't originally install.",
    detail:
      "From a 5 kW residential rooftop to multi-hundred-kW commercial arrays, we engineer every system around your property, electrical service, and load profile. Our crews install, commission, and maintain solar PV with integrated battery storage - and we routinely service systems built on Enphase, SolarEdge, SMA, Outback, Sol-Ark, Schneider, and others.",
    bullets: [
      "Custom residential & commercial PV design",
      "Roof-mount, ground-mount & pole-mount arrays",
      "Battery storage (lithium & lead-acid) integration",
      "Multi-brand inverter repair & retrofit",
      "Net-metering and utility coordination",
      "Long-term performance warranties",
    ],
  },
  {
    id: "backup-power",
    code: "02",
    title: "Backup Power",
    icon: Zap,
    summary:
      "Authorized installer for whole-house and commercial standby generators. Turnkey installation, scheduled maintenance, and emergency service.",
    detail:
      "When the grid fails, your operation can't. We design, install, and maintain residential and commercial standby generators - natural gas, LP, and diesel - with automatic transfer switches sized to your facility's critical loads. Maintenance contracts keep your equipment ready before storm season.",
    bullets: [
      "Whole-house & partial-house standby generators",
      "Commercial standby up to 150kW+",
      "Automatic transfer switch installation",
      "Annual maintenance & load-bank testing",
      "Fuel system design (NG / LP / diesel)",
      "Emergency service for failed gensets",
    ],
  },
  {
    id: "facility-automation",
    code: "03",
    title: "Facility Automation",
    icon: Cpu,
    summary:
      "Specialized commercial services for facility management, decommissioning, and technical restoration of complex electrical environments.",
    detail:
      "Industrial sites, data closets, and aging commercial facilities require an electrical contractor that thinks beyond a single panel. We support facility managers with scheduled maintenance, controlled decommissioning of legacy systems, and technical restoration of equipment that other contractors won't touch.",
    bullets: [
      "Commercial facility management support",
      "Equipment & site decommissioning",
      "Technical restoration of legacy systems",
      "Panel upgrades & service entrance rework",
      "Lighting & energy efficiency retrofits",
      "Documentation & as-built drawings",
    ],
  },
  {
    id: "diagnostics",
    code: "04",
    title: "Diagnostics",
    icon: Activity,
    summary:
      "Advanced troubleshooting for system monitoring failures, communication faults, and intermittent issues other contractors give up on.",
    detail:
      "When a solar array under-produces, a generator won't auto-start, or a monitoring portal goes dark - the root cause is rarely obvious. We bring 30 years of field expertise plus modern diagnostic equipment to find the actual fault, document it, and restore the system to full operation.",
    bullets: [
      "Solar PV system performance audits",
      "Inverter & monitoring fault diagnosis",
      "Communication & data-logging failures",
      "Generator no-start root-cause analysis",
      "Thermal imaging & insulation testing",
      "Intermittent fault investigations",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote: "Superior knowledge of his products along with great service and reliability!",
    author: "A.F.",
    location: "Dana, IN",
  },
  {
    quote:
      "Accutek Solar designed a customized system for us based upon our location, lifestyle, and budget. We are extremely satisfied with our PV panels and solar thermal tubes. Clean solar energy has enabled us to lower our carbon footprint and eliminated our monthly electric bill while maintaining a very comfortable lifestyle.",
    author: "E.D.",
    location: "Clinton, IN",
  },
  {
    quote:
      "I am really glad I decided to buy a system from Accutek Systems Inc. There is no better feeling than seeing your electric meter spin backwards! System was installed in a timely manner with professionalism and has been working flawlessly since.",
    author: "J.V.",
    location: "Terre Haute, IN",
  },
  {
    quote:
      "Accutek has been key in the design, integration, and custom installation of new and existing systems at the Craig Porter Energy Center. Their expertise and installation quality is one to admire.",
    author: "J.R.",
    location: "Program Chair, Energy Technology - Ivy Tech Community College, Lafayette, IN",
  },
];

export const FAQS = [
  {
    q: "Do we have enough sun in Indiana / Illinois for solar to make sense?",
    a: "Yes — and it isn't even close. Our region receives more usable solar energy per year than Germany, which produces more solar power per capita than any other country. The math works here.",
  },
  {
    q: "What is the difference between roof-mount and ground-mount solar?",
    a: "Roof-mount arrays use your existing roof structure for a streamlined installation with zero additional yard footprint. Ground-mount arrays sit in your yard or field on ag-grade steel posts, allowing optimal tilt and south-facing azimuth, easier ground-level servicing, and no roof penetrations. Roughly half of our installations are ground mounts. Pole mounts with tracking are also available for maximum rural harvest.",
  },
  {
    q: "What's the difference between solar thermal and PV?",
    a: "Solar thermal uses the sun's heat to warm an antifreeze solution pumped through a heat exchanger to heat water. Photovoltaic (PV) systems convert sunlight directly into DC electricity in the panels, which is either stored in batteries or converted to AC power by an inverter.",
  },
  {
    q: "What types of PV systems are there?",
    a: "Three main types: (1) Grid-tied — no batteries; panels feed the grid to reduce or eliminate your electric bill. (2) Hybrid — grid-connected with a lithium battery bank to keep critical circuits powered during outages. (3) Off-grid — fully independent with battery storage and an integrated backup generator for low-sun stretches.",
  },
  {
    q: "How much does a solar or backup power system cost?",
    a: "Because every property has unique energy usage, service panel capacity, and mounting requirements, every system is custom designed. Quotes are tailored to your specific site, budget, and power goals. Seth personally reviews your historical utility bills and property layout to provide a comprehensive, transparent quote.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes, every solar and generator quote is 100% free with no high-pressure sales. You can use our online calculator for a fast 25-year savings projection, request a quote online, or book a free physical site visit.",
  },
  {
    q: "What areas do you serve?",
    a: "Accutek Solar is headquartered in Clinton, IN (9797 S Rangeline Rd) and serves 17 counties across West Central Indiana and East Central Illinois. If you are located in or near our regional footprint, contact us with your ZIP code or county and we will gladly confirm service availability.",
  },
  {
    q: "What services does Accutek offer?",
    a: "We provide turnkey residential, commercial, and agricultural solar PV installations (roof, ground, and pole mounts), lithium battery storage (LFP), authorized Kohler standby generators (plus Generac and Cummins service), high-efficiency mini-split heat pumps, Level 2 EV charging stations, and full master-level electrical service and panel upgrades.",
  },
  {
    q: "Do you service systems you didn't install?",
    a: "Yes. We work on a wide range of inverter and battery brands (including Enphase, SolarEdge, Sol-Ark, SMA, Outback, Fronius, and Schneider Electric) and routinely take on troubleshooting, warranty repairs, and orphaned system restoration for systems installed by contractors who are no longer in business.",
  },
  {
    q: "What should I expect for appointment scheduling and service windows?",
    a: "Our typical field work and site assessment windows run during daytime operational hours (approximately 10 AM to 5 PM local time, Monday through Friday). Because we travel across our multi-county footprint and dedicate thorough attention to each site, we schedule planned appointments carefully and do not overpromise same-day field arrivals.",
  },
  {
    q: "What happens during a site assessment and on installation day?",
    a: "During the initial site assessment, we inspect your main electrical panel, roof condition or ground site, verify utility meter access, and review your 12-month electric usage. On installation day, our licensed field crew arrives with equipment, manages all structural mounting and balance-of-system wiring, conducts initial safety testing, and cleans up the work area before walking you through system operation.",
  },
  {
    q: "How long does the entire installation process take?",
    a: "While physical on-site installation typically takes only a few days depending on system size and weather, the complete project timeline spans a few weeks to accommodate site engineering, municipal permitting, utility interconnection review, and final utility bi-directional meter swapping.",
  },
  {
    q: "Do you handle permits, utility interconnection, and HOA approvals?",
    a: "Yes. Accutek manages the entire permitting and utility interconnection process from start to finish. We submit one-line electrical diagrams, structural plans, and net-metering / net-billing paperwork to your electric cooperative or investor-owned utility, as well as necessary documentation for local building departments and HOAs.",
  },
  {
    q: "What is net metering and how does billing work in Indiana and Illinois?",
    a: "Net metering / net billing tracks the difference between energy your panels send to the grid and energy you consume. In Indiana, utilities credit your account for excess kilowatt-hours, helping offset winter bills with summer production. In Illinois, customers may also participate in the Illinois Shines incentive program. Utility credit rules vary by provider, and we model your specific utility tariff during system design.",
  },
  {
    q: "How does billing, deposits, and payment work for installations and service?",
    a: "For turnkey solar, battery, and generator installations, project milestones and deposit terms are clearly itemized in your written agreement prior to ordering equipment and commencing work. For service calls, diagnostics, and electrical repairs, invoices are provided upon completion. Existing customers can also review project details and invoices directly through our Housecall Pro customer portal.",
  },
  {
    q: "What warranties and craftsmanship guarantees do you provide?",
    a: "We install Tier-1 solar panels backed by 25-year manufacturer power production warranties, lithium battery storage systems with 10- to 15-year manufacturer warranties, and authorized standby generators with full factory warranty backing. Beyond manufacturer hardware warranties, Accutek stands behind our installation craftsmanship with direct, lifetime local service — backed by over 32 years of continuous electrical contracting in Indiana and Illinois.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, flexible solar financing options and loan programs are available to help spread system costs into predictable monthly payments that replace or lower your utility bill. We can also assist rural small businesses and agricultural operations with technical documentation for USDA REAP grants.",
  },
  {
    q: "Should I choose battery storage, a standby generator, or both?",
    a: "It depends on your backup priorities. Lithium batteries provide instant, silent, sub-20-millisecond power transfer during outages and cycle daily with your solar array. Standby generators provide long-duration continuous runtime fueled by natural gas or propane during extended winter storms. Pairing solar, hybrid batteries, and an automatic generator provides complete, indefinite energy resilience.",
  },
  {
    q: "What ongoing maintenance is required for solar and generators?",
    a: "Solar PV systems are solid-state with no moving parts, requiring minimal maintenance beyond periodic visual checks and keeping ground-mount arrays clear of heavy snow or overgrown vegetation. Standby generators require regular oil, filter, and spark plug maintenance, which we provide through scheduled annual preventive service checkups.",
  },
  {
    q: "Do you handle commercial and agricultural installations?",
    a: "Yes. A significant portion of our work includes 3-phase and split-phase commercial and agricultural projects — including grain drying systems, livestock barns, manufacturing shops, facility automation support, decommissioning, and high-capacity standby power across Indiana and Illinois.",
  },
  {
    q: "How long has Accutek Solar been in business?",
    a: "Accutek Solar was founded by Keith Davis in 1994 in Clinton, Indiana — bringing over 32 years of electrical and solar contracting experience. Keith remains President, while his son Seth Davis manages day-to-day operations and custom system designs.",
  },
];

export const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/ecec3ab58dbaa69a3a9ca7b2822fd0cdea49b8c3d8e62b52ea771837f2ca31db.png",
  battery: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/e2a807d9f1323522467b330572f73010026cedad87d3c3c841a9dd9c2fbaec55.png",
  energyMap: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/a04f211dcc851f46c3b4ace30f10bace49a70af73e7e60006103d63b1d86f0ce.png",
  roofPanels: "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxzb2xhciUyMHBhbmVscyUyMGhvbWUlMjByb29mJTIwaW5zdGFsbGF0aW9ufGVufDB8fHx8MTc3NzcyNjQ0NHww&ixlib=rb-4.1.0&q=85",
};

export const GALLERY = [
  // --- Clinton, IN - Ground-mount solar + battery storage (2026) ---
  { src: "/gallery/clinton-in/ground-mount-array.jpg", alt: "Ground-mount solar array", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/three-sol-ark-inverters.jpg", alt: "Triple Sol-Ark hybrid inverters", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/exterior-panels.jpg", alt: "Exterior disconnects & metering", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/lithium-battery-closeup.jpg", alt: "Lithium battery bank detail", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/battery-bank-and-inverter.jpg", alt: "Battery bank & Sol-Ark inverter", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/sol-ark-inverters-front.jpg", alt: "Sol-Ark inverter wall - front view", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/subpanels-and-inverter.jpg", alt: "Sub-panels & inverter install", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/battery-rack-detail.jpg", alt: "Battery rack close-up", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/equipment-room-panoramic.jpg", alt: "Full equipment room - BOS installation", location: "Clinton, IN", wide: true },
  { src: "/gallery/clinton-in/exterior-disconnects.jpg", alt: "Exterior disconnects & utility metering", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/array-closeup-front.jpg", alt: "Ground-mount array - front view", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/array-closeup-rear.jpg", alt: "Ground-mount array - rear view", location: "Clinton, IN" },
  { src: "/gallery/clinton-in/kohler-standby-generator.jpg", alt: "Kohler standby generator", location: "Clinton, IN" },
  // --- West Terre Haute, IN - Commercial battery & generator install ---
  { src: "/gallery/west-terre-haute-in/equipment-room-inverters.jpg", alt: "Commercial inverter equipment room", location: "West Terre Haute, IN" },
  { src: "/gallery/west-terre-haute-in/cummins-transfer-switch.jpg", alt: "Cummins automatic transfer switch", location: "West Terre Haute, IN" },
  { src: "/gallery/west-terre-haute-in/horizon-standby-generator.jpg", alt: "Standby generator installation", location: "West Terre Haute, IN" },
  { src: "/gallery/west-terre-haute-in/victron-cerbo-gx-monitor.jpg", alt: "Victron Cerbo GX monitoring system", location: "West Terre Haute, IN" },
];

export const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/commercial", label: "Commercial" },
  { to: "/tools", label: "Tools" },
  { to: "/service-area", label: "Service Area" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// Housecall Pro customer portal (for existing customers to view jobs, invoices, etc)
export const CUSTOMER_PORTAL = {
  label: "Log in to Portal",
  token: "d2cca52d5dc74361b2c484f1306b70df",
  url: "https://client.housecallpro.com/customer_portal/request-link?token=d2cca52d5dc74361b2c484f1306b70df",
};
