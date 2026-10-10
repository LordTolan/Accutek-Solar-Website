/**
 * Centralized Services Data for Accutek Solar
 * 
 * Brand: Accutek Solar
 * Terms §9 Compliance:
 * - Only photos that do NOT identify the property (no house exteriors with facades/addresses, no street signs, no customer faces, no nameplates).
 * - Curated equipment close-ups, BOS inverters, battery banks, generators, disconnects, transfer switches, and array hardware.
 * - Captions: city + work type only, NEVER customer names.
 */

export interface ServicePhoto {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  rundown: string[];
  keyPoints: string[];
  equipmentBrands: string[];
  photos: ServicePhoto[];
  iconName: "Sun" | "Mountain" | "Building2" | "BatteryCharging" | "Wrench" | "Lightbulb" | "BatteryMedium" | "Flame" | "Zap" | "Activity";
  badge?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "residential-solar",
    title: "Residential Solar PV",
    shortDesc: "Grid-tied, hybrid, and off-grid rooftop systems custom engineered for Midwestern homes.",
    tagline: "Turn your rooftop into a private power station with 25-year reliability.",
    iconName: "Sun",
    badge: "Core Service",
    equipmentBrands: ["Sol-Ark", "Solis", "Fronius", "Enphase", "SolarEdge"],
    rundown: [
      "Residential solar PV from Accutek Solar is engineered around your family's actual kilowatt-hour consumption, electrical service panel capacity, and roof geometry. Whether you are looking for simple grid-tied net-billing offsets or complete whole-home battery backup, we build systems designed to withstand Midwest ice, wind, and summer heatwaves.",
      "Since 1994, our licensed electricians and solar technicians have installed residential solar systems across 17 counties in West Central Indiana and East Central Illinois. Every residential installation includes custom structural engineering, utility interconnection management, permit coordination, and ongoing monitoring setup."
    ],
    keyPoints: [
      "Custom system sizing based on 12-month historical utility load data",
      "Tier-1 monocrystalline panels with 25-year manufacturer warranties",
      "Roof-friendly racking with heavy-duty flashing to prevent leaks",
      "Full utility net-metering / net-billing interconnection management",
      "Real-time mobile app monitoring for production and consumption",
      "Hybrid-ready inverter options for seamless battery addition later"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/subpanels-and-inverter.jpg",
        alt: "Residential solar inverter and subpanels installation",
        caption: "BOS Inverter & Sub-Panel Installation",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/exterior-disconnects.jpg",
        alt: "Exterior AC disconnect and solar utility metering",
        caption: "Exterior AC Disconnects & Utility Metering",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/exterior-panels.jpg",
        alt: "Exterior utility paneling and conduit runs",
        caption: "Exterior Electrical Disconnects & Metering",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "ground-mount-solar",
    title: "Ground-Mount Arrays",
    shortDesc: "Field & yard installs sized for higher-output sites — ideal for ag, rural, and larger lots.",
    tagline: "Maximized solar harvest with optimal tilt, zero roof penetrations, and easy maintenance.",
    iconName: "Mountain",
    badge: "Specialty",
    equipmentBrands: ["IronRidge", "Unirac", "Sol-Ark", "Solis", "Fronius"],
    rundown: [
      "Approximately half of Accutek Solar's installations are ground-mounted arrays. For rural homeowners, homesteads, and agricultural properties with open acreage, ground mounts provide clear advantages: optimal south-facing orientation, ideal winter and summer tilt angles, and zero physical wear on your roof shingles.",
      "Our field crews build ag-grade structural foundations with heavy-wall steel posts driven deep below the local frost line. Ground mounts run cooler than rooftop systems, resulting in up to 10–15% greater annual energy harvest, and provide simple ground-level access for visual inspection and seasonal cleaning."
    ],
    keyPoints: [
      "Zero roof penetrations — preserve shingle and metal roof warranties",
      "Optimized tilt and true-south azimuth for maximum Midwestern solar harvest",
      "Sub-surface trenching below frost lines for clean, protected wire runs",
      "Engineered ground posts built to handle 100+ mph wind and snow loads",
      "Ground-level maintenance, inspection, and seasonal snow clearing",
      "Expandable racking configurations for future EV or shop expansion"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/ground-mount-array.jpg",
        alt: "Ground-mount solar array hardware",
        caption: "Ag-Grade Ground-Mount Solar Array",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/array-closeup-front.jpg",
        alt: "Close-up front view of ground mount solar array modules",
        caption: "Ground-Mount Array Module Field Detail",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/array-closeup-rear.jpg",
        alt: "Rear structural racking and conduit on ground mount solar array",
        caption: "Heavy-Duty Racking & Rear Structural Framework",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "commercial-ag-solar",
    title: "Commercial & Ag Solar",
    shortDesc: "Custom systems for businesses, farms, grain facilities, and shops — USDA REAP eligible.",
    tagline: "Turn fixed operational overhead into long-term profit and tax equity.",
    iconName: "Building2",
    badge: "Commercial",
    equipmentBrands: ["Sol-Ark", "Solis", "Fronius", "Schneider Electric", "Victron Energy"],
    rundown: [
      "Accutek Solar specializes in three-phase and split-phase commercial and agricultural installations across Indiana and Illinois. From grain drying operations and livestock barns to manufacturing shops, commercial solar provides dramatic operational expense reductions and strong hedge protection against escalating demand charges.",
      "We assist agricultural producers and rural small businesses with technical documentation for the USDA REAP (Rural Energy for America Program) loan and grant opportunities, Section 179 / MACRS accelerated depreciation schedules, and Illinois Shines SREC (Solar Renewable Energy Certificate) registrations."
    ],
    keyPoints: [
      "Three-phase 208V / 480V and 240V high-amp service integration",
      "USDA REAP grant documentation support and energy audit coordination",
      "Illinois Shines SREC incentive monetization and REC tracking",
      "Heavy-duty utility interconnection and transformer coordination",
      "Demand charge peak-shaving and backup operational protection",
      "Turnkey project management from structural engineering to utility sign-off"
    ],
    photos: [
      {
        src: "/gallery/west-terre-haute-in/equipment-room-inverters.jpg",
        alt: "Commercial inverter power room with conduit and safety disconnects",
        caption: "Commercial Equipment Room & Inverter Lineup",
        location: "West Terre Haute, IN"
      },
      {
        src: "/gallery/clinton-in/three-sol-ark-inverters.jpg",
        alt: "Three hybrid inverters wall mounted in commercial equipment space",
        caption: "High-Capacity Multi-Inverter Power Wall",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/equipment-room-panoramic.jpg",
        alt: "Full commercial equipment room balance of system install",
        caption: "Turnkey BOS Balance of System Installation",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "battery-storage",
    title: "Battery Storage & Hybrid Systems",
    shortDesc: "Lithium iron phosphate (LFP) energy storage for true grid independence and night-time power.",
    tagline: "Keep your critical loads, refrigerators, well pumps, and medical devices running 24/7.",
    iconName: "BatteryMedium",
    badge: "High Demand",
    equipmentBrands: ["Sol-Ark", "Victron Energy", "Generac PWRcell", "Fortress Power", "HomeGrid"],
    rundown: [
      "Solar panels alone turn off during a grid blackout unless paired with a hybrid battery storage system. Accutek Solar designs and commissions premium Lithium Iron Phosphate (LiFePO4 / LFP) battery banks that switch over in milliseconds when utility power drops.",
      "Unlike legacy lead-acid batteries, our modern LFP storage systems offer 6,000+ deep-discharge cycles, 10–15 year warranties, and zero toxic off-gassing. Whether you want to back up essential household circuits (well pump, refrigeration, furnace blower, lights) or disconnect completely off-grid, we size battery capacity to match your real-world reserve requirements."
    ],
    keyPoints: [
      "Safe, non-flammable Lithium Iron Phosphate (LiFePO4) battery chemistry",
      "Seamless sub-20ms automatic transfer during utility blackouts",
      "Whole-home backup or dedicated critical load sub-panel configurations",
      "Time-of-use (TOU) load shifting to minimize peak utility electric rates",
      "Full closed-loop communications between battery BMS and hybrid inverters",
      "Indoor wall-mount or floor-standing rack installations"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/lithium-battery-closeup.jpg",
        alt: "Lithium battery modules and BMS rack installation close-up",
        caption: "Lithium Iron Phosphate (LFP) Battery Rack Close-up",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/battery-rack-detail.jpg",
        alt: "Battery storage cabinet and cabling details",
        caption: "High-Voltage Battery Cabling & Safety Disconnects",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/battery-bank-and-inverter.jpg",
        alt: "Integrated battery storage bank and hybrid inverter system",
        caption: "Hybrid Inverter & Battery Bank Balance-of-System",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "standby-generators",
    title: "Standby Generators",
    shortDesc: "Authorized Kohler installer — turn-key automatic backup power for Kohler, Generac, and Cummins.",
    tagline: "Automatic power restoration in seconds when extreme weather knocks out the grid.",
    iconName: "BatteryCharging",
    badge: "Authorized Installer",
    equipmentBrands: ["Kohler", "Generac", "Cummins"],
    rundown: [
      "Accutek Solar is an authorized Kohler generator installer, bringing over 30 years of electrical contractor expertise to automatic standby power. We install, commission, service, and maintain standby generators across residential, agricultural, and commercial properties.",
      "While Kohler is our flagship brand, our certified electricians also install and service Generac and Cummins standby systems. Every generator installation includes a precision-matched Automatic Transfer Switch (ATS), fuel line coordination (natural gas or liquid propane), full load-bank testing, and scheduled annual maintenance programs."
    ],
    keyPoints: [
      "Authorized Kohler generator sales, installation, warranty, and maintenance",
      "Turnkey Generac and Cummins standby installation and service",
      "Whole-house and critical-circuit Automatic Transfer Switches (ATS)",
      "Natural Gas (NG) and Liquid Propane (LP) fuel integration",
      "Weekly automated self-diagnostic exercise cycles with quiet mode",
      "Preventive maintenance contracts: oil, filter, spark plug, and valve service"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/kohler-standby-generator.jpg",
        alt: "Kohler residential standby generator on concrete pad",
        caption: "Kohler Automatic Standby Generator Installation",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/west-terre-haute-in/cummins-transfer-switch.jpg",
        alt: "Cummins automatic transfer switch installation on utility wall",
        caption: "Cummins Automatic Transfer Switch (ATS)",
        location: "West Terre Haute, IN"
      },
      {
        src: "/gallery/west-terre-haute-in/horizon-standby-generator.jpg",
        alt: "Commercial standby generator unit installed on gravel pad",
        caption: "Heavy-Duty Standby Generator Unit",
        location: "West Terre Haute, IN"
      }
    ]
  },
  {
    slug: "mini-split-hvac",
    title: "Mini-Split HVAC Systems",
    shortDesc: "High-efficiency ductless heating & cooling — Fujitsu heat pumps paired with solar.",
    tagline: "Zone-controlled year-round comfort designed for maximum seasonal energy efficiency.",
    iconName: "Flame",
    badge: "HVAC & Heat Pumps",
    equipmentBrands: ["Fujitsu", "Mitsubishi", "Daikin"],
    rundown: [
      "Heating and cooling accounts for more than half of the typical Midwestern home's energy consumption. Ductless mini-split heat pumps offer industry-leading SEER2 efficiency ratings, providing targeted room-by-room heating and air conditioning without bulky ductwork or thermal loss.",
      "Accutek Solar installs and services high-efficiency inverter heat pump systems, including Fujitsu mini-splits. Paired with on-site solar PV and battery storage, mini-split heat pumps allow homeowners to heat and cool their living spaces directly from the sun, eliminating fossil fuel reliance and slashing propane or baseboard heating bills."
    ],
    keyPoints: [
      "Ultra-high efficiency inverter heat pump technology (up to 30+ SEER2)",
      "Multi-zone temperature control for bedrooms, additions, workshops, and basements",
      "Low-ambient cold-climate heating operation down to sub-zero temperatures",
      "Whisper-quiet indoor wall-mount and floor-mount air handlers",
      "Ideal companion for solar PV systems to eliminate propane and heating oil costs",
      "Professional refrigerant line vacuuming, pressure testing, and electrical wiring"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/sol-ark-inverters-front.jpg",
        alt: "Clean electrical balance of system wiring and disconnects",
        caption: "High-Efficiency Inverter & Electrical Control Infrastructure",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/subpanels-and-inverter.jpg",
        alt: "Dedicated HVAC subpanels and electrical distribution",
        caption: "Dedicated Sub-Panel Distribution for HVAC Loads",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "ev-chargers",
    title: "EV Chargers & Smart Charging",
    shortDesc: "Level 2 home and commercial EV charging stations powered by clean, homegrown solar energy.",
    tagline: "Drive on sunshine with high-speed Level 2 charging installed right in your garage or fleet yard.",
    iconName: "Zap",
    badge: "Smart Mobility",
    equipmentBrands: ["Emporia Energy", "Tesla", "ChargePoint", "Enphase"],
    rundown: [
      "Powering your vehicle with homegrown solar energy is one of the fastest ways to maximize return on your clean energy investment. Level 2 EV charging stations deliver 240V high-speed charging — replenishing 25–40+ miles of driving range per hour compared to just 3–4 miles from a standard wall outlet.",
      "Accutek Solar installs dedicated residential EV chargers, commercial fleet charging points, and smart energy monitors. We manage panel capacity assessments, 240V dedicated circuit runs, NEMA outlets or hardwired wall connectors, and load-balancing controllers that prioritize excess solar production directly into your vehicle."
    ],
    keyPoints: [
      "High-speed Level 2 (240V, 32A–50A) residential and commercial charging",
      "Dedicated 240V circuit breakers, heavy-gauge copper wiring, and surge protection",
      "Smart chargers with Wi-Fi scheduling to charge during peak solar or off-peak utility hours",
      "Fleet and commercial workplace dual-port charging configurations",
      "Panel load calculations and service upgrades when extra capacity is required",
      "Compatible with all EV makes: Tesla, Ford, Rivian, GM, Hyundai, and universal J1772/NACS"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/exterior-disconnects.jpg",
        alt: "Exterior high-amp disconnects and electrical metering infrastructure",
        caption: "Dedicated High-Amperage Disconnect & Service Infrastructure",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/clinton-in/exterior-panels.jpg",
        alt: "Heavy gauge conduit runs and utility disconnect enclosures",
        caption: "Clean Exterior Conduit & Dedicated Charging Line Runs",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "solar-service-repair",
    title: "Solar / Inverter Service & Repair",
    shortDesc: "Multi-brand troubleshooting, inverter replacements, string faults, and orphan system restoration.",
    tagline: "We service, troubleshoot, and restore systems — even if we didn't originally install them.",
    iconName: "Wrench",
    badge: "Service & Diagnostics",
    equipmentBrands: ["Enphase", "SolarEdge", "SMA", "Outback", "Sol-Ark", "Fronius", "Solis"],
    rundown: [
      "When a solar array underperforms, an inverter faults, or your original installer went out of business, Accutek Solar is the trusted local team to call. With 32 years of hands-on electrical troubleshooting, we diagnose and repair solar PV and battery systems across Indiana and Illinois.",
      "Our field diagnostic capabilities include thermal imaging for hotspot detection, micro-inverter and string inverter replacements, ground fault and arc fault isolation, monitoring gateway reconnections, and complete system recertification."
    ],
    keyPoints: [
      "Multi-brand diagnostics: Enphase, SolarEdge, SMA, Outback, Sol-Ark, Fronius",
      "Inverter warranty replacements, firmware upgrades, and modern retrofits",
      "String fault, ground fault, and open circuit troubleshooting",
      "Monitoring gateway reconnections and cellular modem upgrades",
      "Storm damage assessments, hail inspections, and insurance documentation",
      "De-install and re-install (R&R) panel services for roof replacements"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/three-sol-ark-inverters.jpg",
        alt: "Multi-inverter system undergoing diagnostic commissioning",
        caption: "Inverter Replacement & Multi-Unit Diagnostic Commissioning",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/west-terre-haute-in/victron-cerbo-gx-monitor.jpg",
        alt: "System diagnostic monitoring and communication hub",
        caption: "Communication Gateway & Monitoring Diagnostic Interface",
        location: "West Terre Haute, IN"
      },
      {
        src: "/gallery/clinton-in/sol-ark-inverters-front.jpg",
        alt: "Front view of inverter installation and DC/AC conduit wiring",
        caption: "BOS System Rewire & Diagnostic Inspection",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "electrical-install-repair",
    title: "Electrical Install & Repair",
    shortDesc: "Licensed electricians with 32 years of full-service residential and commercial experience.",
    tagline: "Master-level electrical craftsmanship for panels, services, rewires, and facility infrastructure.",
    iconName: "Wrench",
    badge: "Master Electrician",
    equipmentBrands: ["Square D", "Siemens", "Eaton", "Schneider Electric"],
    rundown: [
      "Accutek began as a licensed electrical contractor in 1994. Behind every clean solar installation and generator hookup is three decades of master-level wiring, panel building, trenching, and utility service coordination.",
      "We provide full-service electrical contracting across West Central Indiana and East Central Illinois: 200A and 400A panel upgrades, overhead and underground service entrance rewires, whole-home surge protection, sub-panel installations, and commercial facility electrical maintenance."
    ],
    keyPoints: [
      "200-Amp and 400-Amp residential and agricultural service entrance upgrades",
      "Overhead-to-underground utility conversion and meter base replacements",
      "Sub-panel additions for garages, workshops, barns, and outbuildings",
      "Whole-home and facility transient voltage surge suppression (TVSS)",
      "Dedicated circuits for heavy machinery, welders, pumps, and HVAC",
      "Code compliance corrections and electrical safety inspections"
    ],
    photos: [
      {
        src: "/gallery/clinton-in/subpanels-and-inverter.jpg",
        alt: "Master electrician sub-panel and distribution wiring",
        caption: "Electrical Distribution & Sub-Panel Installation",
        location: "Clinton, IN"
      },
      {
        src: "/gallery/west-terre-haute-in/cummins-transfer-switch.jpg",
        alt: "High-voltage automatic transfer switch and conduit connections",
        caption: "Commercial Transfer Switch & Service Disconnect",
        location: "West Terre Haute, IN"
      },
      {
        src: "/gallery/clinton-in/exterior-disconnects.jpg",
        alt: "Utility metering and heavy duty safety disconnect switches",
        caption: "Outdoor Utility Meter Base & Heavy-Duty Disconnects",
        location: "Clinton, IN"
      }
    ]
  },
  {
    slug: "led-energy-monitoring",
    title: "LED & Energy Monitoring",
    shortDesc: "Smart lighting and live circuit-level energy monitoring to track usage and slash wasted power.",
    tagline: "Know exactly where every watt goes with circuit-by-circuit real-time intelligence.",
    iconName: "Lightbulb",
    badge: "Smart Energy",
    equipmentBrands: ["Emporia Energy", "Victron Energy", "Schneider Electric"],
    rundown: [
      "The cleanest, cheapest kilowatt-hour is the one you never have to generate. Accutek Solar installs advanced circuit-level energy monitoring systems that break down your real-time consumption appliance by appliance, sub-panel by sub-panel.",
      "Combined with high-efficiency commercial and residential LED lighting retrofits, our energy monitoring solutions pinpoint phantom loads, faulty compressors, and excessive baseline usage — helping you optimize your solar sizing and reduce total energy expenses."
    ],
    keyPoints: [
      "Circuit-level real-time wattage tracking via smartphone and desktop dashboards",
      "Automated alerts for unusual baseline spikes, failed sump pumps, or compressor issues",
      "Historical energy consumption analytics for accurate solar and battery sizing",
      "Commercial warehouse, ag barn, and retail LED lighting retrofits",
      "Automated occupancy sensors and smart scheduling integration",
      "Verification of solar self-consumption and battery round-trip efficiency"
    ],
    photos: [
      {
        src: "/gallery/west-terre-haute-in/victron-cerbo-gx-monitor.jpg",
        alt: "Victron Cerbo GX live energy monitoring and communication hub",
        caption: "Live Facility Energy Monitoring & Digital Hub",
        location: "West Terre Haute, IN"
      },
      {
        src: "/gallery/clinton-in/equipment-room-panoramic.jpg",
        alt: "Equipment room overview with smart monitoring conduits and sensors",
        caption: "Comprehensive Energy Management Equipment Room",
        location: "Clinton, IN"
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug);
}
