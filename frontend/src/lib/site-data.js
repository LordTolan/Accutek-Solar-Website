// Centralized site content
import {
  Sun,
  Zap,
  Cpu,
  Activity,
} from "lucide-react";

export const COMPANY = {
  name: "Accutek Solar",
  tagline: "30 years of electrical expertise. Solar, storage, backup power & facility automation across Indiana & Illinois.",
  founded: 1994,
  yearsInBusiness: 30,
  founder: "Keith Davis",
  president: "Keith Davis",
  owners: ["Seth Davis", "Quill Davis"],
  ownership: "Founded by Keith Davis in 1994 - still President today. His sons Seth Davis and Quill Davis run day-to-day operations.",
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
  aboutShort: "Family-owned and serving Indiana and Illinois since 1994. With 30 years of electrical expertise, Accutek Solar provides technically precise energy solutions for residential and commercial clients.",
};

// Service area broken into 4 operational quadrants
export const SERVICE_QUADRANTS = [
  {
    id: "in-west",
    label: "Central Indiana - West",
    state: "Indiana",
    counties: ["Warren", "Fountain", "Vermillion", "Parke", "Vigo"],
    description: "Western corridor of Indiana along the IL state line.",
  },
  {
    id: "in-east",
    label: "Central Indiana - East",
    state: "Indiana",
    counties: ["Montgomery", "Hendricks", "Putnam", "Clay", "Sullivan"],
    description: "Inland Indiana counties east of our home base in Clinton.",
  },
  {
    id: "il-east",
    label: "Central Illinois - East",
    state: "Illinois",
    counties: ["Vermilion", "Edgar", "Clark", "Crawford"],
    description: "Eastern Illinois counties bordering Indiana.",
  },
  {
    id: "il-west",
    label: "Central Illinois - West",
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
    a: "Yes - and it isn't even close. Our region receives more usable solar energy per year than Germany, which produces more solar power per capita than any other country. The math works here.",
  },
  {
    q: "What's the difference between solar thermal and PV?",
    a: "Solar thermal uses the sun's heat to warm an antifreeze solution, which is pumped through a heat exchanger to heat water. Photovoltaic (PV) systems use the sun's radiation to generate DC electricity in the panels, which is either stored in batteries or converted to AC power by an inverter.",
  },
  {
    q: "What types of PV systems are there?",
    a: "Three main types. (1) Grid-tied - no batteries, panels feed the grid to offset your bill. (2) Hybrid - grid-connected with a battery bank, supports loads during outages. (3) Off-grid - fully independent, batteries plus a backup generator for low-sun stretches.",
  },
  {
    q: "Do you service systems you didn't install?",
    a: "Yes. We work on a wide range of inverter and battery brands and routinely take on repair and diagnostic work for systems originally installed by other contractors who are no longer available or unwilling to service their work.",
  },
  {
    q: "What is net metering?",
    a: "Net metering tracks the difference between energy you produce and energy you consume. In Indiana, the utility won't pay cash for excess production, but they credit your account - letting you bank summer surplus and use it through the winter.",
  },
  {
    q: "How long has Accutek been in business?",
    a: "Accutek Solar was founded by Keith Davis in 1994 - over 30 years of electrical and solar expertise based in Clinton, Indiana. Keith remains President. His sons Seth Davis and Quill Davis run day-to-day operations. Family-owned, second-generation operated.",
  },
  {
    q: "Do you handle commercial work?",
    a: "Absolutely. A meaningful portion of our work is commercial - including facility automation support, decommissioning, technical restoration projects, and standby power for businesses across Indiana and Illinois.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every estimate is free. We'll review your bills, walk your property or facility, and design a system that's actually right for your usage and budget.",
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
  // --- Legacy installs ---
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20170626_174551225-3.jpg?resize=750%2C422&ssl=1", alt: "Roof solar array - residential install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20191213_171847326-1.jpg?resize=750%2C422&ssl=1", alt: "Battery backup interior install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20190704_142623874-3.jpg?resize=750%2C422&ssl=1", alt: "Ground mount array" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20170411_100922472-2.jpg?resize=750%2C422&ssl=1", alt: "Pole-mounted PV system" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20190830_120908432.jpg?resize=750%2C422&ssl=1", alt: "Commercial install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/arial-array.jpg?resize=750%2C422&ssl=1", alt: "Aerial view of finished array" },
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
