// Centralized site content — sourced from accuteksolar.com scrape
export const COMPANY = {
  name: "AccuTek Solar",
  tagline: "Solar, batteries, generators & electrical — built right since 1994.",
  founded: 1994,
  founder: "Keith Davis",
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
  hours: "Mon–Fri 8:00 AM – 5:00 PM EST",
};

export const SERVICE_AREAS = {
  Indiana: [
    "Vermillion", "Parke", "Fountain", "Montgomery",
    "Putnam", "Clay", "Sullivan", "Vigo", "Hendricks", "Warren",
  ],
  Illinois: [
    "Edgar", "Vermilion", "Clark", "Crawford",
    "Coles", "Douglas", "Champaign",
  ],
};

export const SERVICES = [
  {
    id: "solar",
    code: "01",
    title: "Solar PV Systems",
    summary: "Grid-tied, hybrid, and off-grid photovoltaic installations engineered for your roof or yard.",
    bullets: [
      "Roof mount & ground mount arrays",
      "Grid-tie, hybrid, off-grid configurations",
      "Premium panels & micro-inverters",
      "Net-metering setup & utility coordination",
    ],
  },
  {
    id: "battery",
    code: "02",
    title: "Custom Battery Backup",
    summary: "Custom-built battery banks that keep your essentials — or your whole home — running through any outage.",
    bullets: [
      "Custom-built battery banks",
      "Whole-home & partial-home backup",
      "Hybrid inverter integration",
      "Smart load management",
    ],
  },
  {
    id: "generator",
    code: "03",
    title: "Kohler Generators",
    summary: "Authorized Kohler installer for whole-home standby generators with proven reliability.",
    bullets: [
      "Whole-home & partial-home standby",
      "Automatic transfer switches",
      "Natural gas & LP propane",
      "Annual maintenance plans",
    ],
  },
  {
    id: "electrical",
    code: "04",
    title: "Electrical Services",
    summary: "Licensed electrical work — panel upgrades, energy monitoring, LED lighting, and full installation/repair.",
    bullets: [
      "Electrical panel replacement",
      "Energy monitoring equipment",
      "Energy-efficient LED lighting",
      "Service calls & repairs",
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
    location: "Program Chair, Energy Technology — Ivy Tech Community College, Lafayette, IN",
  },
];

export const FAQS = [
  {
    q: "Do we have enough sun in Indiana / Illinois for solar to make sense?",
    a: "Yes — and it isn't even close. Our region receives more usable solar energy per year than Germany, which produces more solar power per capita than any other country. The math works here.",
  },
  {
    q: "What's the difference between solar thermal and PV?",
    a: "Solar thermal uses the sun's heat to warm an antifreeze solution, which is pumped through a heat exchanger to heat water. Photovoltaic (PV) systems use the sun's radiation to generate DC electricity in the panels, which is either stored in batteries or converted to AC power by an inverter.",
  },
  {
    q: "What types of PV systems are there?",
    a: "Three main types. (1) Grid-tied — no batteries, panels feed the grid to offset your bill. (2) Hybrid — grid-connected with a battery bank, supports loads during outages. (3) Off-grid — fully independent, batteries plus a backup generator for low-sun stretches.",
  },
  {
    q: "What is net metering?",
    a: "Net metering tracks the difference between energy you produce and energy you consume. In Indiana, the utility won't pay cash for excess production, but they credit your account — letting you bank summer surplus and use it through the winter.",
  },
  {
    q: "How long has AccuTek been in business?",
    a: "AccuTek Solar was founded by Keith Davis in 1994 — over 31 years of electrical installation and solar expertise based in Clinton, Indiana. Family-owned and operated.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every estimate is free. We'll review your bills, walk your property, and design a system that's actually right for your usage and budget — not a one-size-fits-all package.",
  },
];

export const IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/ecec3ab58dbaa69a3a9ca7b2822fd0cdea49b8c3d8e62b52ea771837f2ca31db.png",
  battery: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/e2a807d9f1323522467b330572f73010026cedad87d3c3c841a9dd9c2fbaec55.png",
  energyMap: "https://static.prod-images.emergentagent.com/jobs/39c7357a-42d6-4cca-9deb-dcdef3c85a2c/images/a04f211dcc851f46c3b4ace30f10bace49a70af73e7e60006103d63b1d86f0ce.png",
  roofPanels: "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzV8MHwxfHNlYXJjaHwzfHxzb2xhciUyMHBhbmVscyUyMGhvbWUlMjByb29mJTIwaW5zdGFsbGF0aW9ufGVufDB8fHx8MTc3NzcyNjQ0NHww&ixlib=rb-4.1.0&q=85",
};

// Real install photos from accuteksolar.com
export const GALLERY = [
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20170626_174551225-3.jpg?resize=750%2C422&ssl=1", alt: "Roof solar array — residential install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20191213_171847326-1.jpg?resize=750%2C422&ssl=1", alt: "Battery backup interior install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20190704_142623874-3.jpg?resize=750%2C422&ssl=1", alt: "Ground mount array" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20170411_100922472-2.jpg?resize=750%2C422&ssl=1", alt: "Pole-mounted PV system" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/img_20190830_120908432.jpg?resize=750%2C422&ssl=1", alt: "Commercial install" },
  { src: "https://i0.wp.com/accuteksolar.com/wp-content/uploads/2020/03/arial-array.jpg?resize=750%2C422&ssl=1", alt: "Aerial view of finished array" },
];
