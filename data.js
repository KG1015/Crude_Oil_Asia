/**
 * DUBAI/OMAN AND THE ASIAN CRUDE OIL MARKET
 * COMMERCIAL TRADING DATA MODEL & GEOGRAPHIC ENGINE
 * Middle East vs Russia vs Atlantic Basin competing for China, India, Japan, South Korea
 */

const OIL_DATA = {
  metadata: {
    title: "Dubai/Oman & The Asian Crude Battleground",
    subtitle: "A Commercial Crude-Trading & Refinery Sourcing Study for China, India, Japan & South Korea",
    benchmarkFocus: "Dubai / DME Oman Physical Pricing & Paper Swaps Complex",
    targetAudience: "Executive & Trading Desk / 45-Minute Internship Presentation",
    version: "3.0.0",
    lastUpdated: "2026-09-23"
  },

  // 1. THE 4 ASIAN BUYER PROFILES
  asianBuyers: {
    china: {
      name: "China",
      flag: "🇨🇳",
      totalImportsMbd: 11.45,
      refiningCapacityMbd: 18.8,
      strategicFocus: "Energy security, crude-to-chemicals (COTC), and opportunistic discounted purchasing.",
      buyerStructure: "Tripartite: State Titans (Sinopec, PetroChina, CNOOC), Private Mega-Refiners (ZPC Rongsheng 800k b/d, Hengli 400k b/d), and Independent Teapots (Shandong ~3.5 mb/d).",
      crudeSourceSplit: [
        { source: "Middle East", share: 44, volume: 5.04, color: "#F59E0B" },
        { source: "Russia", share: 21, volume: 2.40, color: "#EF4444" },
        { source: "Atlantic Basin / US", share: 12, volume: 1.37, color: "#06B6D4" },
        { source: "LatAm / Brazil", share: 11, volume: 1.26, color: "#10B981" },
        { source: "West Africa", share: 8, volume: 0.92, color: "#8B5CF6" },
        { source: "Others", share: 4, volume: 0.46, color: "#64748B" }
      ],
      primaryTerminals: [
        { name: "Zhoushan / Ningbo (Zhejiang)", lat: 29.8683, lng: 121.544, type: "VLCC Supertanker Port / ZPC Mega-refinery" },
        { name: "Qingdao / Dongjiakou (Shandong)", lat: 36.0671, lng: 120.3826, type: "Independent Teapot Gateway / Storage Hub" },
        { name: "Huizhou / Daya Bay (Guangdong)", lat: 22.756, lng: 114.62, type: "CNOOC / Petrochemical Cluster" },
        { name: "Dalian / Changxing Island (Liaoning)", lat: 38.914, lng: 121.6147, type: "Hengli Petrochemical / Strategic Storage" }
      ],
      tradingBehavior: "Aggressive arbitrage optimizer. Exploits Russian ESPO via short pipeline/tanker hops from Kozmino (2.5 days) and takes discounted Urals. Balances baseload with Saudi Aramco term contracts linked to monthly Dubai/Oman OSPs."
    },

    india: {
      name: "India",
      flag: "🇮🇳",
      totalImportsMbd: 4.85,
      refiningCapacityMbd: 5.2,
      strategicFocus: "Maximum economic netback, diesel export margins, high-complexity conversion of deeply discounted sour crudes.",
      buyerStructure: "Dominated by Reliance Industries (Jamnagar complex 1.4 mb/d - world's largest), Nayara Energy (Vadinar 400k b/d), and State PSUs (IOCL, BPCL, HPCL).",
      crudeSourceSplit: [
        { source: "Russia", share: 39, volume: 1.89, color: "#EF4444" },
        { source: "Middle East", share: 44, volume: 2.13, color: "#F59E0B" },
        { source: "West Africa", share: 7, volume: 0.34, color: "#8B5CF6" },
        { source: "US / Atlantic Basin", share: 6, volume: 0.29, color: "#06B6D4" },
        { source: "Others", share: 4, volume: 0.20, color: "#64748B" }
      ],
      primaryTerminals: [
        { name: "Sikka / Vadinar (Gujarat)", lat: 22.433, lng: 69.833, type: "Reliance Jamnagar & Nayara SPM Terminals" },
        { name: "Paradip (Odisha)", lat: 20.2644, lng: 86.6667, type: "IOCL Deepwater Refinery Terminal" },
        { name: "Cochin / Kochi (Kerala)", lat: 9.9312, lng: 76.2673, type: "BPCL Southern Gateway Terminal" },
        { name: "Mumbai / Jawahar Dweep", lat: 18.95, lng: 72.88, type: "BPCL / HPCL Urban Coastal Hub" }
      ],
      tradingBehavior: "The post-2022 market disruptor. Shifted from <2% Russian crude to ~40% by absorbing Urals at $15–$25/bbl discounts against Dubai, using non-Western tankers and alternative payment rails, forcing Middle Eastern producers to defend market share."
    },

    japan: {
      name: "Japan",
      flag: "🇯🇵",
      totalImportsMbd: 2.45,
      refiningCapacityMbd: 3.3,
      strategicFocus: "Absolute supply reliability, strict compliance with G7 sanctions, high-specification domestic fuels, zero tolerance for tanker disruptions.",
      buyerStructure: "Consolidated commercial majors: ENEOS Corporation (~50% market share), Idemitsu Kosan, Cosmo Oil, Taiyo Oil.",
      crudeSourceSplit: [
        { source: "Middle East (Saudi, UAE, Kuwait, Qatar)", share: 95.2, volume: 2.33, color: "#F59E0B" },
        { source: "US (WTI Midland)", share: 2.8, volume: 0.07, color: "#06B6D4" },
        { source: "South East Asia / Others", share: 2.0, volume: 0.05, color: "#10B981" },
        { source: "Russia (Sanctioned / Phase-out)", share: 0.0, volume: 0.00, color: "#EF4444" }
      ],
      primaryTerminals: [
        { name: "Chiba / Tokyo Bay", lat: 35.6074, lng: 140.1065, type: "ENEOS / Idemitsu Petrochemical Cluster" },
        { name: "Yokohama / Negishi", lat: 35.4167, lng: 139.65, type: "ENEOS Flagship Coastal Refinery" },
        { name: "Yokkaichi (Ise Bay)", lat: 34.9667, lng: 136.6333, type: "Cosmo Oil / Showa Yokkaichi" },
        { name: "Kiire Terminal (Kagoshima)", lat: 31.3667, lng: 130.55, type: "National Crude Oil Storage Depot (CTS)" }
      ],
      tradingBehavior: "Hyper-dependent on Persian Gulf term contracts (~95% Middle East). Reliant on Dubai/Oman pricing with Aramco/ADNOC OSPs. Willing to pay quality premiums for light sweet Murban and Arab Extra Light to minimize sulfur emissions and meet clean product standards."
    },

    southKorea: {
      name: "South Korea",
      flag: "🇰🇷",
      totalImportsMbd: 2.95,
      refiningCapacityMbd: 3.4,
      strategicFocus: "Commercial margin optimization, global product export arbitrage (diesel, jet fuel, paraxylene), agile crude slate flexibility.",
      buyerStructure: "Four world-scale refiners: SK Innovation (Ulsan 840k b/d), GS Caltex (Yeosu 800k b/d), S-Oil (Onsan 670k b/d, Aramco subsidiary), HD Hyundai Oilbank (Daesan 520k b/d).",
      crudeSourceSplit: [
        { source: "Middle East", share: 67, volume: 1.98, color: "#F59E0B" },
        { source: "US (WTI Midland via VLCC)", share: 18, volume: 0.53, color: "#06B6D4" },
        { source: "LatAm / Brazil / Mexico", share: 8, volume: 0.24, color: "#10B981" },
        { source: "West Africa / Others", share: 7, volume: 0.20, color: "#8B5CF6" },
        { source: "Russia (Direct Seaborne Ceased)", share: 0, volume: 0.00, color: "#EF4444" }
      ],
      primaryTerminals: [
        { name: "Ulsan / Onsan Port", lat: 35.5033, lng: 129.3783, type: "SK Innovation & S-Oil Mega-Refining Hub" },
        { name: "Yeosu / Gwangyang Bay", lat: 34.7604, lng: 127.6622, type: "GS Caltex Single-Point Mooring Terminal" },
        { name: "Daesan Port", lat: 37.01, lng: 126.4167, type: "HD Hyundai Oilbank / Hanwha Total Complex" }
      ],
      tradingBehavior: "The Asian swing buyer. Uses the Korea-US Free Trade Agreement (zero crude import tariff) and government freight subsidies to aggressively import US WTI Midland via reverse-lightered VLCCs whenever the Brent-Dubai EFS tightens, forcing Middle Eastern producers to keep OSPs competitive."
    }
  },

  // 2. THE THREE SUPPLY BLOCS
  supplyBlocs: {
    middleEast: {
      name: "Middle East Basins",
      tagline: "The Structural Backbone of Asian Refining",
      benchmark: "Dubai / DME Oman Physical & Platts MOC Assessment",
      keyProducers: ["Saudi Arabia", "United Arab Emirates", "Iraq", "Kuwait", "Qatar", "Oman"],
      totalExportToAsiaMbd: 14.5,
      strengths: [
        "Unmatched logistics scale: Dedicated VLCC loading ports (Ras Tanura, Basrah, Fujairah).",
        "Refinery design lock-in: Asian heavy conversion units engineered for high sulfur.",
        "Sovereign supply reliability: Multi-year term contracts guarantee crude availability.",
        "Geographic proximity: 4.5 to 21 days transit vs 40-45 days from Atlantic Basin."
      ],
      vulnerabilities: [
        "Strait of Hormuz chokepoint: ~20.8 mb/d exposed to geopolitical interdiction.",
        "Rigid term contracts: Destination restrictions and Aramco monthly OSP formulas.",
        "OPEC+ voluntary production quotas restricting sour crude availability."
      ],
      crudeGrades: [
        { name: "Arab Medium", origin: "Saudi Arabia", api: 31.0, sulfur: 2.50, type: "Medium Sour", pricingBasis: "Dubai/Oman + OSP", yieldValue: "High diesel/gasoil & heavy residue" },
        { name: "Murban", origin: "UAE (Abu Dhabi)", api: 40.5, sulfur: 0.70, type: "Light Sour", pricingBasis: "IFAD Murban Futures", yieldValue: "High-grade kerosene/naphtha export grade" },
        { name: "Basrah Medium", origin: "Iraq (SOMO)", api: 27.9, sulfur: 3.00, type: "Heavy/Medium Sour", pricingBasis: "Dubai/Oman + SOMO OSP", yieldValue: "Massive volume staple for China & India" },
        { name: "Arab Light", origin: "Saudi Arabia", api: 32.8, sulfur: 1.97, type: "Medium Sour", pricingBasis: "Dubai/Oman + OSP", yieldValue: "High middle distillate & gasoline" },
        { name: "DME Oman", origin: "Oman (Mina al Fahal)", api: 31.3, sulfur: 1.40, type: "Medium Sour", pricingBasis: "DME Futures Settlement", yieldValue: "Unconstrained production, Hormuz bypass" }
      ]
    },

    russia: {
      name: "Russian Federation",
      tagline: "The Post-2022 Sanctioned Discount Disruptor",
      benchmark: "Argus Urals FOB / ESPO Blend Kozmino / Sokol Sakhalin",
      keyProducers: ["Rosneft", "Lukoil", "Surgutneftegas", "Gazprom Neft"],
      totalExportToAsiaMbd: 4.3,
      strengths: [
        "Unbeatable price discounts: $10 to $25/bbl below Brent/Dubai netback post-2022 sanctions.",
        "Pacific shuttle speed: ESPO blend reaches Northern China (Qingdao) in just 2.8 days from Kozmino.",
        "Sovereign de-dollarization: Settlement in UAE Dirhams, Chinese Yuan, and Indian Rupees.",
        "Flexible spot sales without rigid destination restrictions."
      ],
      vulnerabilities: [
        "Long maritime voyage from Baltic/Black Sea ports to India/China (27 to 39 days).",
        "Western sanction risks: G7 price cap ($60/bbl limit), OFAC vessel designations.",
        "Reliance on the 'Shadow/Dark Fleet': Aging tankers, non-standard P&I maritime insurance.",
        "Complete exit of Japan and South Korea due to strict G7 alignment."
      ],
      crudeGrades: [
        { name: "Urals (Baltic/Black)", origin: "Russia (Primorsk / Novorossiysk)", api: 31.0, sulfur: 1.48, type: "Medium Sour", pricingBasis: "Discount to Dated Brent / Dubai delivered", yieldValue: "Direct substitute for Arab Medium/Light" },
        { name: "ESPO Blend", origin: "Russia (Kozmino Pacific)", api: 34.8, sulfur: 0.55, type: "Medium Sweet", pricingBasis: "Dubai benchmark +/- spot premium", yieldValue: "Ideal teapot grade, high diesel/gasoil" },
        { name: "Sokol", origin: "Russia (Sakhalin-I)", api: 37.7, sulfur: 0.23, type: "Light Sweet", pricingBasis: "Dubai +/- differential", yieldValue: "Ultra-clean high distillate yield" }
      ]
    },

    atlanticBasin: {
      name: "Atlantic Basin & Americas",
      tagline: "The Commercial Arbitrage & Quality Optimizer",
      benchmark: "WTI (NYMEX/ICE) / Brent (ICE) / Dated Brent",
      keyProducers: ["United States (Permian Basin)", "North Sea (UK/Norway)", "West Africa (Angola/Nigeria)", "Brazil (Tupi/Búzios)"],
      totalExportToAsiaMbd: 3.6,
      strengths: [
        "Superior quality: High API (40-45°), ultra-low sulfur (<0.2%), maximizing clean light products.",
        "US shale volume flexibility: Free market export without OPEC+ quotas or destination clauses.",
        "Zero-tariff advantage in South Korea under US-Korea Free Trade Agreement (KORUS).",
        "Deep financial hedging liquidity via NYMEX WTI and ICE Brent contracts."
      ],
      vulnerabilities: [
        "Punishing shipping distance: US Gulf Coast to Asia is 15,300 nm (46 days transit).",
        "Complex logistics: Requires reverse lightering via Aframax tankers to fill VLCCs offshore.",
        "High freight and EFS volatility: Arbitrage slams shut whenever Brent-Dubai EFS widens.",
        "Refinery mismatch: Too light/sweet for complex Asian coking refineries needing heavy bottoms."
      ],
      crudeGrades: [
        { name: "WTI Midland (USGC)", origin: "United States (Permian / Corpus Christi)", api: 44.3, sulfur: 0.15, type: "Light Sweet", pricingBasis: "WTI Houston + Brent-Dubai EFS + Freight", yieldValue: "Massive gasoline, jet, and petrochemical naphtha yield" },
        { name: "Brent Blend (BFOET)", origin: "North Sea (UK / Norway)", api: 38.3, sulfur: 0.40, type: "Light Sweet", pricingBasis: "ICE Brent Futures / Dated Brent", yieldValue: "Global benchmark quality standard" },
        { name: "Dalia", origin: "Angola (Block 17 offshore)", api: 23.6, sulfur: 0.51, type: "Heavy Sweet", pricingBasis: "Dated Brent +/- differential", yieldValue: "Exceptional low-sulfur marine bunker blending value" },
        { name: "Bonny Light", origin: "Nigeria (Niger Delta)", api: 35.3, sulfur: 0.15, type: "Light Sweet", pricingBasis: "Dated Brent +/- differential", yieldValue: "High-octane gasoline yield, low residue" }
      ]
    }
  },

  // 3. EFS (BRENT-DUBAI EXCHANGE OF FUTURES FOR SWAPS) DEEP DIVE
  efsDeepDive: {
    definition: "The Brent-Dubai Exchange of Futures for Swaps (EFS) represents the price spread between light sweet ICE Brent futures and medium sour Dubai cash swaps. In financial crude trading, EFS = ICE Brent 1st Line Futures minus Platts Dubai 1st Line Cash Swaps ($/bbl).",
    whyTradersWatch: "EFS is the global pricing compass that dictates inter-basin arbitrage. Because Brent prices Atlantic Basin crudes (North Sea, West Africa, US WTI Midland) and Dubai prices Middle Eastern crudes into Asia, the EFS spread determines whether Atlantic sweet barrels can economically travel across oceans to compete in Asian refineries.",
    wideEfs: {
      range: "> $2.50 to $4.00+ / bbl",
      mechanism: "Brent trades at a substantial premium to Dubai. Atlantic Basin crudes become prohibitively expensive relative to Middle Eastern sour barrels.",
      impactWti: "Arbitrage window slams shut. US WTI Midland exports to Asia collapse as delivered landed costs exceed Dubai-linked alternatives.",
      impactWaf: "West African crudes (Angolan Dalia, Nigerian Bonny Light) cannot overcome the freight and EFS hurdle; cargoes remain trapped in Europe and the Atlantic Basin.",
      impactMe: "Middle Eastern crude competitiveness peaks. Asian refiners maximize intake of Arab Light, Upper Zakum, and Basrah. National Oil Companies (Saudi Aramco, ADNOC) gain maximum pricing power to raise Official Selling Prices (OSPs)."
    },
    narrowEfs: {
      range: "< $0.80 to $1.20 / bbl (or Negative EFS)",
      mechanism: "Dubai cash prices trade unusually close to, or above, Brent futures (often caused by OPEC+ sour crude production cuts tightening Middle East supply).",
      impactWti: "The Atlantic-to-Pacific arbitrage floodgates open. US WTI Midland floods South Korea, China, and Taiwan aboard reverse-lightered VLCCs.",
      impactWaf: "West African grades become highly competitive in Asia, drawing Angolan and Nigerian barrels away from European refiners.",
      impactMe: "Middle Eastern sour crudes face severe demand destruction. Asian refiners substitute prompt Middle East term barrels with spot Atlantic sweet cargoes. Saudi Aramco is forced to aggressively cut monthly OSPs to defend Asian market share."
    }
  },

  // 4. CHAPTER 11: TRADING DESK FORWARD CURVES, SPREADS & FLIES
  tradingDesk: {
    forwardCurves: {
      backwardation: {
        type: "Backwardation (Current Default Market)",
        promptSpreadM1M2: +0.85,
        boxSpreadM1M3: +1.65,
        flySpread: +0.05, // 2*M2 - (M1+M3)
        rationale: "Prompt demand exceeds immediate supply. Refiners draw down inventories. Prompt physical barrels command a premium over forward paper.",
        contracts: [
          { month: "M1 (Nov 26)", price: 74.50 },
          { month: "M2 (Dec 26)", price: 73.65 },
          { month: "M3 (Jan 27)", price: 72.85 },
          { month: "M4 (Feb 27)", price: 72.15 },
          { month: "M5 (Mar 27)", price: 71.55 },
          { month: "M6 (Apr 27)", price: 71.05 }
        ]
      },
      contango: {
        type: "Contango (Surplus Market / Supertanker Floating Storage)",
        promptSpreadM1M2: -0.90,
        boxSpreadM1M3: -1.80,
        flySpread: -0.10,
        rationale: "Immediate market oversupply. Forward prices are higher than prompt to compensate for storage and financing costs. Triggers floating storage arbitrage aboard VLCCs.",
        contracts: [
          { month: "M1 (Nov 26)", price: 70.00 },
          { month: "M2 (Dec 26)", price: 70.90 },
          { month: "M3 (Jan 27)", price: 71.80 },
          { month: "M4 (Feb 27)", price: 72.60 },
          { month: "M5 (Mar 27)", price: 73.30 },
          { month: "M6 (Apr 27)", price: 73.90 }
        ]
      }
    },

    ospTracker: [
      {
        noc: "Saudi Aramco",
        target: "Asia-Pacific",
        anchor: "Platts Dubai / DME Oman average",
        differentials: [
          { grade: "Arab Super Light", diff: "+$3.25 / bbl", chg: "+0.20", trend: "up" },
          { grade: "Arab Extra Light", diff: "+$2.10 / bbl", chg: "+0.15", trend: "up" },
          { grade: "Arab Light", diff: "+$1.80 / bbl", chg: "0.00", trend: "flat" },
          { grade: "Arab Medium", diff: "+$0.65 / bbl", chg: "-0.10", trend: "down" },
          { grade: "Arab Heavy", diff: "-$0.85 / bbl", chg: "-0.20", trend: "down" }
        ]
      },
      {
        noc: "ADNOC (Abu Dhabi)",
        target: "Asia-Pacific",
        anchor: "IFAD Murban / Platts Dubai Assessment",
        differentials: [
          { grade: "Murban (Futures)", diff: "Market Settlement", chg: "IFAD", trend: "flat" },
          { grade: "Upper Zakum", diff: "Platts Basket Delivery", chg: "MOC", trend: "flat" },
          { grade: "Das Blend", diff: "+$0.65 / bbl", chg: "+0.05", trend: "up" }
        ]
      },
      {
        noc: "Iraq SOMO",
        target: "Asia-Pacific",
        anchor: "Platts Dubai / DME Oman average",
        differentials: [
          { grade: "Basrah Medium", diff: "-$0.40 / bbl", chg: "-0.15", trend: "down" },
          { grade: "Basrah Heavy", diff: "-$3.20 / bbl", chg: "-0.30", trend: "down" }
        ]
      }
    ],

    // 5 Crudes x 4 Buyers Head-to-Head Comparison
    crudeMatrix5x4: {
      crudes: [
        { code: "ARAB_MEDIUM", name: "Arab Medium", origin: "Saudi Arabia", api: 31.0, sulfur: 2.50, desulfCost: 2.60 },
        { code: "MURBAN", name: "Murban", origin: "UAE (ADNOC)", api: 40.5, sulfur: 0.70, desulfCost: 0.80 },
        { code: "BASRAH_MEDIUM", name: "Basrah Medium", origin: "Iraq (SOMO)", api: 27.9, sulfur: 3.00, desulfCost: 3.10 },
        { code: "URALS", name: "Russian Urals", origin: "Russia", api: 31.0, sulfur: 1.48, desulfCost: 1.80 },
        { code: "WTI_MIDLAND", name: "WTI Midland", origin: "United States", api: 44.3, sulfur: 0.15, desulfCost: 0.25 }
      ],
      buyers: ["CHINA", "INDIA", "JAPAN", "SOUTH_KOREA"]
    }
  },

  // 5. CHAPTER 12: EXECUTIVE SUMMARY & THE 7 SELECTION PILLARS
  sevenPillars: [
    {
      id: 1,
      name: "1. Quality (API & Sulfur Assay)",
      icon: "🧪",
      desc: "API Gravity determines light vs heavy product cuts. Sulfur percentage determines desulfurization costs and hydrotreater hydrogen consumption. Acid number (TAN) governs metallurgy corrosion.",
      commercialImpact: "A 0.5% drop in sulfur saves ~$0.75/bbl in chemical treating costs, directly expanding refinery netback."
    },
    {
      id: 2,
      name: "2. Official Selling Prices (OSP)",
      icon: "📜",
      desc: "National Oil Companies (Aramco, ADNOC, SOMO) issue monthly differential notices around the 5th of each month against the Oman/Dubai average, pricing the baseload supply of Asia.",
      commercialImpact: "OSPs are adjusted dynamically to match refinery gross margins and fend off non-OPEC crude arbitrage."
    },
    {
      id: 3,
      name: "3. Freight & Voyage Logistics",
      icon: "🚢",
      desc: "Worldscale (WS) chartering rates, bunker fuel consumption (VLSFO), demurrage, and canal tolls determine delivered CIF costs across variable distances (1,650 nm to 15,300 nm).",
      commercialImpact: "Freight acts as a protective tariff for Middle Eastern barrels; high tanker rates eliminate long-distance Atlantic imports."
    },
    {
      id: 4,
      name: "4. Refinery Configuration & Complexity",
      icon: "⚙️",
      desc: "Nelson Complexity Index (NCI), delayed coker capacity, vacuum distillation units, and petrochemical steam cracker integration dictate the optimal crude diet.",
      commercialImpact: "High-complexity coking units (Jamnagar NCI 21.1) maximize profits by digesting heavy sour crude rather than expensive light sweet barrels."
    },
    {
      id: 5,
      name: "5. Sanctions & Legal Compliance",
      icon: "⚖️",
      desc: "G7 price cap ($60/bbl limit), OFAC vessel designations, EU maritime bans, and Western P&I club insurance restrictions divide global buyers into compliant vs opportunistic blocs.",
      commercialImpact: "Compliant buyers (Japan, Korea) pay full market prices; non-Western buyers (India, China) capture massive $15–$25/bbl discounts."
    },
    {
      id: 6,
      name: "6. Term Availability vs Spot Liquidity",
      icon: "📦",
      desc: "Sovereign multi-year term contracts guarantee crude availability, but enforce strict destination clauses. Spot cargoes provide agile swing volume but carry volume and loading risk.",
      commercialImpact: "Asian refiners maintain 60–80% term contracts for energy security, playing the remaining 20–40% on spot arbitrage."
    },
    {
      id: 7,
      name: "7. Benchmark & Term Structure (EFS / Backwardation)",
      icon: "📈",
      desc: "The shape of the forward curve (Backwardation vs Contango) and the Brent-Dubai EFS spread determine financing carry costs and whether cross-basin arbitrage is open or shut.",
      commercialImpact: "A narrow EFS (<$1.00/bbl) combined with steep backwardation incentivizes refiners to source prompt sweet barrels from the Atlantic."
    }
  ],

  // 6. REAL GEOGRAPHIC SHIPPING ROUTES (WITH VERIFIED WAYPOINTS)
  tankerRoutes: [
    {
      id: "saudi_to_china",
      name: "Saudi Arabia (Ras Tanura) → China (Ningbo-Zhoushan)",
      originName: "Ras Tanura, Saudi Arabia",
      originCoord: [26.6394, 50.1636],
      destName: "Ningbo-Zhoushan, China",
      destCoord: [29.8683, 121.544],
      vesselClass: "VLCC (2,000,000 bbls)",
      distanceNm: 5910,
      transitDays: 19.5,
      speedKnots: 13.0,
      chokepoints: ["Strait of Hormuz", "Malacca Strait", "Singapore Strait"],
      freightCostPerBbl: 2.15,
      description: "The primary vascular lifeline of modern civilization. Transits Hormuz, traverses the Indian Ocean, threads the narrow Malacca bottleneck into the East China Sea.",
      waypoints: [
        [26.6394, 50.1636], [26.2, 53.0], [26.56, 56.45], [24.5, 58.5],
        [18.0, 64.0], [8.5, 75.0], [5.8, 80.5], [5.9, 95.0],
        [4.2, 98.8], [2.2, 102.1], [1.25, 103.85], [3.0, 105.5],
        [10.0, 112.0], [20.0, 117.5], [25.0, 121.0], [29.8683, 121.544]
      ]
    },
    {
      id: "saudi_to_india",
      name: "Saudi Arabia (Ras Tanura) → India (Sikka / Jamnagar)",
      originName: "Ras Tanura, Saudi Arabia",
      originCoord: [26.6394, 50.1636],
      destName: "Sikka / Jamnagar, India",
      destCoord: [22.433, 69.833],
      vesselClass: "VLCC / Suezmax",
      distanceNm: 1650,
      transitDays: 5.4,
      speedKnots: 13.0,
      chokepoints: ["Strait of Hormuz"],
      freightCostPerBbl: 0.85,
      description: "Ultra-short voyage connecting Persian Gulf giant oilfields to Reliance Jamnagar, the world's most complex refining hub.",
      waypoints: [
        [26.6394, 50.1636], [26.2, 53.0], [26.56, 56.45], [24.5, 58.5],
        [23.0, 64.0], [22.433, 69.833]
      ]
    },
    {
      id: "russia_to_china_pacific",
      name: "Russia (Kozmino Pacific) → China (Qingdao / Shandong)",
      originName: "Kozmino, Russia",
      originCoord: [42.73, 133.02],
      destName: "Qingdao / Dongjiakou, China",
      destCoord: [36.0671, 120.3826],
      vesselClass: "Aframax (700,000 bbls)",
      distanceNm: 850,
      transitDays: 2.8,
      speedKnots: 13.0,
      chokepoints: ["Korea Strait / Tsushima Strait"],
      freightCostPerBbl: 1.10,
      description: "The fast-turnaround ESPO pipeline outlet. Shuttle tankers cross the Sea of Japan directly into Chinese Shandong teapot refiners in under 3 days.",
      waypoints: [
        [42.73, 133.02], [39.0, 131.0], [35.0, 130.0], [34.0, 127.0],
        [35.0, 123.5], [36.0671, 120.3826]
      ]
    },
    {
      id: "russia_to_india_baltic",
      name: "Russia (Primorsk Baltic) → India (Sikka / Jamnagar)",
      originName: "Primorsk, Russia (Gulf of Finland)",
      originCoord: [60.36, 28.62],
      destName: "Sikka / Jamnagar, India",
      destCoord: [22.433, 69.833],
      vesselClass: "Suezmax / Aframax (Dark Fleet)",
      distanceNm: 8400,
      transitDays: 27.5,
      speedKnots: 13.0,
      chokepoints: ["Danish Straits", "English Channel", "Strait of Gibraltar", "Suez Canal / Red Sea"],
      freightCostPerBbl: 6.80,
      description: "The historic post-2022 trade diversion. Seaborne Urals crude sailing from the Baltic through Europe and Suez into Gujarat, sustained by steep discounts.",
      waypoints: [
        [60.36, 28.62], [59.5, 24.0], [57.0, 19.0], [55.3, 12.8],
        [57.5, 10.5], [56.0, 3.0], [50.5, -1.0], [44.0, -9.0],
        [36.0, -6.0], [37.0, 11.0], [32.0, 30.0], [30.0, 32.5],
        [27.0, 34.5], [15.0, 42.0], [12.6, 43.3], [12.0, 48.0],
        [15.0, 60.0], [22.433, 69.833]
      ]
    },
    {
      id: "us_to_south_korea",
      name: "United States (Corpus Christi USGC) → South Korea (Ulsan)",
      originName: "Corpus Christi, Texas (US Gulf Coast)",
      originCoord: [27.81, -97.39],
      destName: "Ulsan, South Korea",
      destCoord: [35.5033, 129.3783],
      vesselClass: "VLCC (Reverse-lightered offshore)",
      distanceNm: 15300,
      transitDays: 46.5,
      speedKnots: 13.5,
      chokepoints: ["Cape of Good Hope", "Malacca Strait", "Singapore Strait", "Taiwan Strait"],
      freightCostPerBbl: 4.90,
      description: "The global commercial arbitrage route. US Permian shale crude loaded via reverse lightering onto VLCCs, sailing around Africa to reach South Korean export refiners.",
      waypoints: [
        [27.81, -97.39], [25.0, -88.0], [23.0, -84.0], [20.0, -65.0],
        [0.0, -30.0], [-20.0, -10.0], [-34.5, 18.5], [-30.0, 40.0],
        [-10.0, 75.0], [5.9, 95.0], [1.25, 103.85], [15.0, 115.0],
        [24.0, 120.0], [32.0, 126.0], [35.5033, 129.3783]
      ]
    },
    {
      id: "uae_to_japan",
      name: "UAE (Fujairah / Das Island) → Japan (Chiba / Tokyo Bay)",
      originName: "Fujairah, UAE (Outside Hormuz)",
      originCoord: [25.18, 56.36],
      destName: "Chiba / Tokyo Bay, Japan",
      destCoord: [35.6074, 140.1065],
      vesselClass: "VLCC (2,000,000 bbls)",
      distanceNm: 6550,
      transitDays: 21.0,
      speedKnots: 13.0,
      chokepoints: ["Malacca Strait", "Singapore Strait"],
      freightCostPerBbl: 2.30,
      description: "Bypasses the Strait of Hormuz directly from Fujairah oil storage terminal, delivering Abu Dhabi Murban and Upper Zakum to Japanese utilities and refiners.",
      waypoints: [
        [25.18, 56.36], [23.0, 60.0], [15.0, 66.0], [5.8, 80.5],
        [5.9, 95.0], [1.25, 103.85], [12.0, 112.0], [22.0, 121.0],
        [28.0, 130.0], [33.5, 137.0], [35.6074, 140.1065]
      ]
    }
  ],

  // 7. CRITICAL CHOKEPOINTS
  chokepoints: [
    {
      name: "Strait of Hormuz",
      location: [26.56, 56.45],
      dailyVolumeMbd: 20.8,
      percentGlobalLiquids: 20.5,
      widthNm: 21,
      navigableLanes: "Two 2-mile-wide traffic lanes separated by a 2-mile buffer zone",
      keyRisk: "Iranian naval interdiction, drone/missile strikes, limpet mines, war risk insurance spikes.",
      bypassPipelines: [
        { name: "Saudi Petroline (East-West to Yanbu)", capacityMbd: 5.0, currentUseMbd: 2.2 },
        { name: "UAE Habshan-Fujairah Pipeline", capacityMbd: 1.8, currentUseMbd: 1.1 },
        { name: "Iran Goreh-Jask Pipeline", capacityMbd: 0.35, currentUseMbd: 0.1 }
      ],
      netUnbypassableVolumeMbd: 13.7
    },
    {
      name: "Malacca & Singapore Straits",
      location: [1.25, 103.85],
      dailyVolumeMbd: 16.2,
      percentGlobalLiquids: 16.0,
      widthNm: 1.5,
      navigableLanes: "Philips Channel bottleneck in Singapore Strait is only 1.7 nautical miles wide with 25-meter depth draft limit.",
      keyRisk: "Navigation collisions, piracy, grounding of fully laden VLCCs (Malaccamax draft constraint).",
      bypassPipelines: [
        { name: "Myanmar-China Oil Pipeline (Kyaukpyu to Kunming)", capacityMbd: 0.44, currentUseMbd: 0.22 }
      ],
      netUnbypassableVolumeMbd: 15.7
    },
    {
      name: "Bab el-Mandeb / Southern Red Sea",
      location: [12.6, 43.3],
      dailyVolumeMbd: 8.8,
      percentGlobalLiquids: 8.5,
      widthNm: 18,
      navigableLanes: "Perim Island separates channel into 2-mile and 16-mile corridors.",
      keyRisk: "Houthi anti-ship ballistic missiles and maritime drones forcing rerouting around Cape of Good Hope (+10 to 14 days, +$1.2M bunker fuel cost per VLCC).",
      bypassPipelines: [
        { name: "Saudi Petroline Yanbu export terminal bypasses Bab el-Mandeb for northbound flows only" }
      ],
      netUnbypassableVolumeMbd: 7.5
    },
    {
      name: "Cape of Good Hope (Alternative Reroute)",
      location: [-34.5, 18.5],
      dailyVolumeMbd: "Surges from 5.5 to >9.0 during Red Sea crises",
      percentGlobalLiquids: 9.0,
      widthNm: "Unconstrained open ocean",
      navigableLanes: "Open sea, heavy weather and rogue waves",
      keyRisk: "Transit time penalty (+12 to 16 days), higher bunker fuel consumption, tighter global tanker fleet utilization.",
      bypassPipelines: [],
      netUnbypassableVolumeMbd: 0
    }
  ],

  // 8. BENCHMARKS & PRICING
  benchmarks: {
    dubai: {
      name: "Platts Dubai Assessment",
      type: "Physical & Derivative Price Assessment",
      operator: "S&P Global Commodity Insights (Platts)",
      windowTime: "16:00 to 16:30 Singapore Time (Market on Close - MOC)",
      unitSize: "25,000-barrel partial contracts",
      convergenceRule: "20 partials traded with the same counterparty (500,000 barrels) triggers mandatory physical declaration.",
      deliverableBasket: [
        { grade: "Dubai (Fateh)", operator: "Dubai Petroleum", physicalVolKbpd: 12, qualityPrem: "Flat" },
        { grade: "Oman Blend", operator: "Petroleum Development Oman (PDO)", physicalVolKbpd: 850, qualityPrem: "Flat" },
        { grade: "Upper Zakum", operator: "ADNOC", physicalVolKbpd: 950, qualityPrem: "Flat" },
        { grade: "Al Shaheen", operator: "QatarEnergy", physicalVolKbpd: 300, qualityPrem: "Flat" },
        { grade: "Murban", operator: "ADNOC", physicalVolKbpd: 1600, qualityPrem: "ADNOC Quality Differential Price (QDP)" }
      ]
    },
    dmeOman: {
      name: "DME Oman Crude Oil Futures (OQD)",
      type: "Physically Delivered Exchange Futures",
      exchange: "Dubai Mercantile Exchange / CME Group",
      deliveryPoint: "Mina al Fahal Terminal, Sultanate of Oman (Outside Strait of Hormuz)",
      lotSize: "1,000 barrels (Delivery in 200,000 or 1,000,000 barrel tanker parcels)",
      openInterestLots: 45000
    }
  },

  // 9. 45-MINUTE PRESENTATION DECK (12 SLIDES)
  presentationSlides: [
    {
      id: 1,
      title: "Executive Thesis: The Battle for Asian Refinery Demand",
      subtitle: "How 22 Million Barrels/Day of Asian Demand Shapes Global Crude Geopolitics",
      durationMin: 3,
      keyPoints: [
        "Asia-Pacific is the world's structural crude deficit epicenter, importing over 22 million b/d.",
        "Four mega-buyers dictate global pricing power: China, India, Japan, and South Korea.",
        "The market is a tripartite commercial battlefield: Middle East (incumbent scale) vs Russia (sanctioned discounts) vs Atlantic Basin (quality & arbitrage)."
      ],
      speakerNotes: "Welcome everyone. Today we are walking you through a commercial trading desk analysis of how Asia sources its crude oil and how Middle Eastern, Russian, and Atlantic Basin barrels actively compete for every dollar of Asian refinery margin."
    },
    {
      id: 2,
      title: "The Four Mega-Buyers: Divergent Commercial Strategies",
      subtitle: "Contrasting Sourcing Architectures Across Beijing, New Delhi, Tokyo, and Seoul",
      durationMin: 4,
      keyPoints: [
        "China: Balanced tripartite strategy using state quotas, private COTC giants, and teapot opportunism.",
        "India: Aggressive post-2022 pivot to Russian Urals (from 2% to ~40% market share) to maximize refining margins at Jamnagar.",
        "Japan: Extreme conservative reliance on Persian Gulf term supply (>95% Middle East), strictly adhering to G7 sanctions.",
        "South Korea: The commercial swing buyer, balancing Middle East base with tariff-free US WTI Midland arbitrage cargoes."
      ],
      speakerNotes: "Notice the profound divergence between Tokyo and New Delhi. While Japan maintains a 95% Middle East reliance due to strict risk aversion and G7 sanctions compliance, India transformed its entire procurement strategy overnight, replacing Middle Eastern baseload with deeply discounted Russian Urals."
    },
    {
      id: 3,
      title: "Crude Quality & Refining Chemistry: Sweet vs Sour",
      subtitle: "Why Asian Refineries Were Built for Middle Eastern Barrels",
      durationMin: 4,
      keyPoints: [
        "Gravity (API) determines yields: Light WTI yields gasoline/naphtha; Medium Dubai yields diesel/gasoil; Heavy Arab Heavy yields fuel oil/asphalt.",
        "Sulfur penalty: Middle East sour crudes (1.5-3.0% S) require multi-billion-dollar hydrocrackers and desulfurization units.",
        "Refinery design lock-in: Asian refiners built deep conversion units specifically for sour crudes; running light sweet WTI underutilizes bottom-upgrading cokers."
      ],
      speakerNotes: "Asian mega-refineries like Reliance Jamnagar and ZPC Rongsheng invested tens of billions in deep-conversion delayed cokers specifically designed to crack high-sulfur Middle Eastern crude. Running too much light sweet WTI actually leaves their bottom-of-the-barrel upgrading units idle."
    },
    {
      id: 4,
      title: "The Pricing Architecture: Dubai, DME Oman & Platts MOC",
      subtitle: "The Mechanism That Prices 20 Million Barrels Per Day",
      durationMin: 5,
      keyPoints: [
        "Dwindling Dubai physical output (<15 kb/d) forced Platts to create an alternative physical delivery basket.",
        "The 16:30 Singapore Window: Traded in 25,000-barrel partials. 20 partials (500k bbl) triggers physical delivery.",
        "Deliverable basket: Dubai, Oman, Upper Zakum, Al Shaheen, and Murban (with QDP adjustment).",
        "Official Selling Prices (OSPs): Saudi Aramco and ADNOC issue monthly differentials against the Platts Dubai/Oman average."
      ],
      speakerNotes: "This is the single most misunderstood pricing mechanism in global commodities. Physical Dubai crude production is virtually dead—less than 15,000 barrels a day. Yet Platts Dubai prices 20 million barrels daily through the Singapore MOC window."
    },
    {
      id: 5,
      title: "Maritime Vascular Network: The Great Tanker Arteries",
      subtitle: "Transit Economics, VLCC Dominance, and Speed Optimization",
      durationMin: 4,
      keyPoints: [
        "The VLCC workhorse: 2 million barrels per voyage, 300,000 DWT, driving freight costs down to $1.50–$2.50/bbl on ME-Asia routes.",
        "Transit duration realities: Ras Tanura to Ningbo takes 19.5 days; USGC to Ningbo takes 46 days; Baltic Russia to India takes 27–39 days.",
        "Worldscale (WS) pricing dynamics: Bunker fuel costs (VLSFO) and demurrage dictate delivered landed cost."
      ],
      speakerNotes: "Moving a VLCC from Ras Tanura to Ningbo costs roughly $2.15 per barrel and takes under 20 days. Moving that same volume from Corpus Christi costs nearly $5.00 a barrel and takes 46 days. That $2.85/bbl freight disadvantage is the hurdle Atlantic Basin crude must overcome."
    },
    {
      id: 6,
      title: "Chokepoint Geopolitics: The Hormuz & Malacca Dual Dilemma",
      subtitle: "Assessing Vulnerability, Bypass Pipelines, and War Risk Premiums",
      durationMin: 4,
      keyPoints: [
        "Strait of Hormuz: 20.8 mb/d throughput (~20% of global liquids). 13.7 mb/d is completely unbypassable.",
        "Saudi East-West Petroline and UAE Habshan-Fujairah pipelines provide limited diversion capacity.",
        "Malacca Strait bottleneck: 16.2 mb/d funnels through the 1.5-mile-wide Philips Channel into Singapore.",
        "War risk insurance premiums can spike tanker freight by $0.50 to $1.50/bbl during active military tensions."
      ],
      speakerNotes: "Asia's entire economic miracle hinges on two geographic pinches: the 21-mile Strait of Hormuz and the 1.5-mile Philips Channel in the Singapore Strait. Over 13.7 million barrels per day have no physical alternative route if Hormuz is closed."
    },
    {
      id: 7,
      title: "The Brent-Dubai EFS: The Gatekeeper of Inter-Basin Flows",
      subtitle: "How a Single Swap Spread Controls Trans-Oceanic Arbitrage",
      durationMin: 4,
      keyPoints: [
        "EFS Definition: ICE Brent 1st Line Futures minus Platts Dubai 1st Line Cash Swaps ($/bbl).",
        "Wide EFS (> $2.50/bbl): Shuts the Atlantic arbitrage; WTI and West African crudes are barred from Asia; Middle East dominance solidifies.",
        "Narrow EFS (< $1.00/bbl): Slams the arbitrage door open; WTI Midland floods South Korea and China; Saudi Aramco is forced to cut OSPs."
      ],
      speakerNotes: "EFS is the master lever of global crude flows. When EFS widens above $2.50, Atlantic barrels cannot cross the Indian Ocean. When it narrows below a dollar, supertankers loaded with Permian WTI Midland stream into Asian ports."
    },
    {
      id: 8,
      title: "Contender 1: The Middle East Hegemony",
      subtitle: "Scale, Reliability, and the Defense of Market Share",
      durationMin: 3,
      keyPoints: [
        "Supplies ~14.5 mb/d to Asia (over 64% of regional imports).",
        "Key advantage: Lowest lifting costs in the world ($3–$6/bbl) and sovereign government-to-government stability.",
        "Aramco OSP strategy: Dynamically adjusting monthly differentials to defend Asian market share against Russian discounts."
      ],
      speakerNotes: "The Middle East remains the undisputed heavyweight champion. With extraction costs under $6 a barrel, Aramco and ADNOC use their monthly OSPs as surgical weapons to keep Asian refiners locked into term contracts."
    },
    {
      id: 9,
      title: "Contender 2: The Russian Shadow Pivot",
      subtitle: "How Sanctions, Discounts, and the Dark Fleet Re-Engineered Asian Trade",
      durationMin: 4,
      keyPoints: [
        "Post-2022 shift: Europe banned Russian seaborne crude; flows redirected east to India (1.9 mb/d) and China (2.4 mb/d).",
        "The Shadow Fleet: Hundreds of aging tankers operating without Western P&I maritime insurance or G7 price cap restrictions.",
        "ESPO Kozmino arbitrage: 2.8-day transit to China provides lightning-fast logistical response to regional demand spikes."
      ],
      speakerNotes: "Russia's trade redirection is the greatest supply-chain restructuring in modern oil history. When Western sanctions hit, that volume was rerouted 8,400 miles around Europe into India, generating windfall refining profits for Indian refiners."
    },
    {
      id: 10,
      title: "Contender 3: The Atlantic Basin Arbitrage Wave",
      subtitle: "US Shale Export Surge, Zero Tariffs, and West African Sweet Crudes",
      durationMin: 4,
      keyPoints: [
        "US crude export revolution: Permian WTI Midland exports exceeding 4.0 mb/d, with over 1.5 mb/d heading to Asia.",
        "The Brent-Dubai EFS trigger: When EFS narrows, Atlantic Basin barrels become economically viable in Asia.",
        "South Korea's structural advantage: 0% import duty under the KORUS FTA makes US WTI Midland a staple baseload grade."
      ],
      speakerNotes: "How does US crude compete over a 15,000-nautical-mile voyage? Through quality, the KORUS FTA zero tariff, and the Brent-Dubai EFS spread. WTI Midland yields massive amounts of petrochemical naphtha with negligible sulfur."
    },
    {
      id: 11,
      title: "Chapter 11: The Trading Desk Simulator",
      subtitle: "Forward Curves, Contango vs Backwardation, Flies & 5x4 Crude Parity",
      durationMin: 5,
      keyPoints: [
        "Term structure: Backwardation incentivizes de-stocking; Contango creates floating storage arbitrage.",
        "Butterfly spreads (Flies): 2*M2 - (M1+M3) monitors term structure curvature and sudden macro momentum shifts.",
        "5 Crudes x 4 Buyers parity: Arab Medium, Murban, Basrah Medium, Urals, and WTI Midland competing head-to-head."
      ],
      speakerNotes: "On the physical trading desk, crude traders monitor forward curve backwardation, butterfly spreads, and delivered landed netbacks. We can dynamically calculate the exact economic winner for Ningbo, Jamnagar, Chiba, and Ulsan."
    },
    {
      id: 12,
      title: "Chapter 12: Executive Summary & The 7 Selection Pillars",
      subtitle: "The Complete Commercial Decision Framework for Asian Crude Procurement",
      durationMin: 3,
      keyPoints: [
        "How Asia chooses: 1. Quality, 2. OSP, 3. Freight, 4. Refinery Configuration, 5. Sanctions, 6. Availability, 7. Benchmark Structure.",
        "Middle East remains the structural base; Russia provides discounted margin; Atlantic Basin provides the pricing ceiling.",
        "Mastering the nexus of Dubai, DME Oman, Brent, and WTI is what determines refinery profitability."
      ],
      speakerNotes: "To conclude: Asia's crude selection is governed by the 7 Pillars. Middle Eastern crude provides the structural foundation; Russian barrels provide opportunistic discount margin; and US Atlantic barrels cap Middle Eastern pricing power."
    }
  ],

  // 10. VERIFIED CITATIONS
  citations: [
    {
      id: "cme_dme_oman",
      source: "CME Group / Dubai Mercantile Exchange",
      document: "DME Oman Crude Oil Futures (OQD) Contract Specifications & Physical Settlement Rules",
      url: "https://www.cmegroup.com/markets/energy/crude-oil/dme-oman-crude-oil-futures.html",
      category: "Exchange Benchmarks",
      verificationNote: "Official contract specifications for 1,000-barrel physical delivery contract at Mina al Fahal."
    },
    {
      id: "sp_platts_dubai",
      source: "S&P Global Commodity Insights",
      document: "Platts Dubai Crude Assessment Methodology & Market-on-Close (MOC) Partial Delivery Guidelines",
      url: "https://www.spglobal.com/commodityinsights/en/our-methodology/methodology-specifications/oil/crude-oil-methodology",
      category: "Price Reporting Agency (PRA)",
      verificationNote: "Governs the 25k partials mechanism, physical convergence, and Upper Zakum/Al Shaheen/Murban basket."
    },
    {
      id: "ice_brent_efs",
      source: "Intercontinental Exchange (ICE)",
      document: "Brent/Dubai Cash-Futures & Exchange of Futures for Swaps (EFS) Contract Reference",
      url: "https://www.theice.com/products/219/Brent-Crude-Futures",
      category: "Derivative Exchanges",
      verificationNote: "Underlying derivative contract governing Atlantic-to-Pacific crude arbitrage pricing."
    },
    {
      id: "opec_momr",
      source: "OPEC Secretariat",
      document: "OPEC Monthly Oil Market Report (MOMR) - World Oil Supply & Demand Matrix",
      url: "https://www.opec.org/opec_web/en/publications/338.htm",
      category: "Sovereign Oil Organization",
      verificationNote: "Official production quotas, member country output, and secondary source production tables."
    },
    {
      id: "iea_omr",
      source: "International Energy Agency (IEA)",
      document: "IEA Oil Market Report - Asian Refinery Intake & Global Chokepoint Risk Studies",
      url: "https://www.iea.org/reports/oil-market-report",
      category: "Multilateral Energy Body",
      verificationNote: "Data on Asian refinery runs, product stocks, and Middle Eastern import dependencies."
    },
    {
      id: "eia_petroleum_monthly",
      source: "U.S. Energy Information Administration (EIA)",
      document: "U.S. Crude Oil Exports by Destination & World Oil Transit Chokepoints Analysis",
      url: "https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints",
      category: "Government Statistical Agency",
      verificationNote: "Comprehensive throughput volumes for Strait of Hormuz, Malacca, Bab el-Mandeb, and Cape of Good Hope."
    },
    {
      id: "saudi_aramco_osp",
      source: "Saudi Arabian Oil Company (Saudi Aramco)",
      document: "Saudi Aramco Monthly Official Selling Price (OSP) Notices to Asian Customers",
      url: "https://www.aramco.com",
      category: "National Oil Company",
      verificationNote: "Primary source for Arab Light, Medium, Heavy, and Extra Light monthly differentials to Dubai/Oman."
    },
    {
      id: "adnoc_murban",
      source: "Abu Dhabi National Oil Company (ADNOC)",
      document: "ADNOC Trading & ICE Futures Abu Dhabi (IFAD) Murban Delivery Rules",
      url: "https://www.adnoc.ae",
      category: "National Oil Company",
      verificationNote: "Specifications for Murban deliverability and Quality Differential Price (QDP) against Platts Dubai."
    },
    {
      id: "india_ppac",
      source: "Petroleum Planning & Analysis Cell (PPAC), Ministry of Petroleum, India",
      document: "Monthly Import Analysis & Country-wise Crude Import Data into India",
      url: "https://www.ppac.gov.in",
      category: "Government Agency",
      verificationNote: "Official tracking of India's shift toward Russian Urals and Middle East import balances."
    },
    {
      id: "china_customs",
      source: "General Administration of Customs of the People's Republic of China (GACC)",
      document: "China Commodity Trade Statistics: HS Code 270900 (Crude Petroleum)",
      url: "http://english.customs.gov.cn",
      category: "Government Customs Agency",
      verificationNote: "Monthly import volumes by country of origin into Chinese maritime terminals."
    },
    {
      id: "baltic_exchange_tanker",
      source: "The Baltic Exchange",
      document: "Baltic Dirty Tanker Index (BDTI) & TD3C / TD22 Route Benchmark Assessments",
      url: "https://www.balticexchange.com",
      category: "Maritime Logistics",
      verificationNote: "Worldscale flat rates, TCE daily earnings, and VLCC route benchmarks."
    },
    {
      id: "imo_maritime_safety",
      source: "International Maritime Organization (IMO)",
      document: "Traffic Separation Schemes (TSS) in Straits Used for International Navigation",
      url: "https://www.imo.org",
      category: "International Maritime Body",
      verificationNote: "Official nautical coordinates and lane widths for Hormuz, Singapore, and Malacca Straits."
    }
  ],

  // 10. THE JOURNEY OF ONE BARREL (9-STEP INTERACTIVE STORYTELLING SEQUENCE)
  journeyOfOneBarrel: [
    {
      step: 1,
      title: "The Desert Wellhead",
      subtitle: "Where the Oil Begins",
      location: "Ghawar Oil Field, Eastern Province, Saudi Arabia",
      description: "Crude oil is lifted from porous Arab-D limestone reservoirs 2,000 meters below the Arabian desert. Ghawar produces over 3.8 million barrels every day at an extraction cost under $3.50/bbl.",
      volumeOrFact: "1 Barrel = 42 US Gallons (158.98 Liters)",
      pricingImpact: "Lifting Cost: $3.20 - $3.80 / bbl (Lowest worldwide)",
      riskFactor: "Reservoir pressure maintenance via seawater injection",
      icon: "🏜️"
    },
    {
      step: 2,
      title: "The Gathering Pipeline & Plant",
      subtitle: "Stabilization & Degassing",
      location: "Abqaiq Processing Complex, Saudi Arabia",
      description: "Raw wet sour crude is pumped through gathering pipelines to Abqaiq—the world's largest crude stabilization plant—to strip lethal hydrogen sulfide (H2S) gas and adjust Reid Vapor Pressure.",
      volumeOrFact: "Flow Velocity: ~5.2 km/hour in 36-48 inch steel pipelines",
      pricingImpact: "Stabilization & Desalting Tariff: ~$0.45 / bbl",
      riskFactor: "Single-point critical infrastructure vulnerability",
      icon: "🚰"
    },
    {
      step: 3,
      title: "The Super-Terminal",
      subtitle: "Offshore Loading onto Tankers",
      location: "Ras Tanura Marine Terminal, Persian Gulf",
      description: "Stabilized Arab Light arrives at Ras Tanura's sea islands. Heavy loading arms pump crude into a moored supertanker at 50,000 barrels per hour. The cargo inspector certifies quantity and water content.",
      volumeOrFact: "Terminal Storage: 33 Million Barrels capacity",
      pricingImpact: "Port Charges, Demurrage & Cargo Inspection: ~$0.15 / bbl",
      riskFactor: "Port congestion and weather demurrage ($35k - $65k / day)",
      icon: "⚓"
    },
    {
      step: 4,
      title: "The Supertanker (VLCC)",
      subtitle: "The Workhorse of Global Seaborne Trade",
      location: "Aboard a Very Large Crude Carrier (VLCC)",
      description: "Our barrel joins 2,000,000 other barrels inside a 333-meter double-hull tanker drawing 20.5 meters of water. The vessel burns Low-Sulfur Fuel Oil (VLSFO) steaming at 13 knots.",
      volumeOrFact: "Supertanker Cargo: 2.0 Million Barrels ($150M cargo value)",
      pricingImpact: "Baltic TD3C Freight Rate: $2.15 / bbl (WS 58.5)",
      riskFactor: "Bunker price volatility & carbon emissions compliance",
      icon: "🚢"
    },
    {
      step: 5,
      title: "Chokepoint 1: Strait of Hormuz",
      subtitle: "The 21-Mile Sovereign Gateway",
      location: "Strait of Hormuz, Persian Gulf",
      description: "The tanker enters the two-mile-wide outbound Traffic Separation Scheme (TSS) lane. 20.8 million barrels pass here every day—one-fifth of all global petroleum liquids.",
      volumeOrFact: "Daily Flow: 20.8 Mb/d (Only 6.8 Mb/d pipeline bypass capacity)",
      pricingImpact: "Lloyd's War Risk Insurance Premium: +0.20% to +0.50% cargo value",
      riskFactor: "Naval interdiction, mine warfare, and geopolitical blockade",
      icon: "🛡️"
    },
    {
      step: 6,
      title: "Chokepoint 2: Strait of Malacca",
      subtitle: "The Gateway to East Asia",
      location: "Strait of Malacca & Singapore Strait (Philips Channel)",
      description: "After 14 days crossing the Indian Ocean, the vessel navigates the Philips Channel near Singapore—narrowing to only 1.7 nautical miles with a 25-meter maximum draft (Malaccamax limit).",
      volumeOrFact: "Throughput: 16.2 Mb/d bound for China, Japan & South Korea",
      pricingImpact: "Malacca Pilotage & Electronic Navigational Tolls: ~$0.08 / bbl",
      riskFactor: "Severe maritime traffic congestion, grounding risks, and piracy",
      icon: "🧭"
    },
    {
      step: 7,
      title: "The Coastal Mega-Refinery",
      subtitle: "Fractionation & Molecular Cracking",
      location: "ZPC Mega-Refinery (Zhoushan, China) or Jamnagar (India)",
      description: "Unloaded into coastal tanks, the crude enters an 80-meter atmospheric distillation tower heated to 370°C. Heavy molecules fall to the vacuum tower and delayed coker; light vapors rise.",
      volumeOrFact: "Refining Intake: 800,000 b/d complex configuration",
      pricingImpact: "Refining Cash Cost: $3.80 / bbl | Hydrogen Desulfurization: $2.10 / bbl",
      riskFactor: "Catalyst poisoning from heavy metals (Nickel, Vanadium) and high sulfur",
      icon: "🏭"
    },
    {
      step: 8,
      title: "The Clean Product Yields",
      subtitle: "Finished Euro-VI / China-VI Fuels",
      location: "Secondary Hydrocrackers & Finished Fuel Tanks",
      description: "Our single 42-gallon barrel of Arab Light yields approximately 19 gallons of gasoline, 12 gallons of ultra-low sulfur diesel (<10 ppm S), 4 gallons of Jet A-1, and petrochemical naphtha.",
      volumeOrFact: "Product Slate: 45% Light Distillates, 35% Middle, 20% Fuel Oil/Coke",
      pricingImpact: "Refining Gross Margin (GRM): +$6.50 to +$9.20 / bbl spread",
      riskFactor: "Refining crack spread collapses and environmental carbon compliance",
      icon: "⛽"
    },
    {
      step: 9,
      title: "The Consumer End-Use",
      subtitle: "Powering Asia's Industrial Economy",
      location: "Asian Highways, Aviation Hubs, and Petrochemical Plants",
      description: "The gasoline powers passenger vehicles across Shanghai; the diesel powers inter-state trucking in India; the jet fuel refuels flights from Tokyo Haneda; and the naphtha becomes medical polymers.",
      volumeOrFact: "Energy Service: Delivers 5.8 Million BTUs of primary energy",
      pricingImpact: "Retail Value: $85 - $110 / bbl equivalent (with national excise taxes)",
      riskFactor: "EV substitution, energy transition, and macroeconomic recession",
      icon: "🚗"
    }
  ],

  // 11. COMPLETE 7-CRUDE ASSAY PORTFOLIO (FOR ARBITRAGE SIMULATOR)
  crudeAssays: {
    ARAB_LIGHT: {
      code: "ARAB_LIGHT",
      name: "Arab Light",
      origin: "Saudi Arabia (Ras Tanura)",
      api: 32.8,
      sulfur: 1.97,
      desulfCost: 2.10,
      ospDiff: +1.80,
      yields: { gasoline: 21.0, diesel: 28.0, jet: 14.5, naphtha: 18.5, residue: 18.0 }
    },
    ARAB_MEDIUM: {
      code: "ARAB_MEDIUM",
      name: "Arab Medium",
      origin: "Saudi Arabia (Ras Tanura)",
      api: 31.0,
      sulfur: 2.50,
      desulfCost: 2.60,
      ospDiff: +0.65,
      yields: { gasoline: 19.0, diesel: 27.5, jet: 13.0, naphtha: 16.0, residue: 24.5 }
    },
    MURBAN: {
      code: "MURBAN",
      name: "Murban",
      origin: "UAE (Fujairah / Jebel Dhanna)",
      api: 40.5,
      sulfur: 0.70,
      desulfCost: 0.80,
      ospDiff: +1.60,
      yields: { gasoline: 26.0, diesel: 24.0, jet: 17.0, naphtha: 25.0, residue: 8.0 }
    },
    OMAN: {
      code: "OMAN",
      name: "Oman Blend",
      origin: "Oman (Mina al Fahal)",
      api: 31.3,
      sulfur: 1.40,
      desulfCost: 1.50,
      ospDiff: 0.00,
      yields: { gasoline: 20.0, diesel: 29.0, jet: 14.0, naphtha: 17.5, residue: 19.5 }
    },
    BASRAH_MEDIUM: {
      code: "BASRAH_MEDIUM",
      name: "Basrah Medium",
      origin: "Iraq (Basrah Oil Terminal)",
      api: 27.9,
      sulfur: 3.00,
      desulfCost: 3.10,
      ospDiff: -0.40,
      yields: { gasoline: 17.0, diesel: 26.0, jet: 11.5, naphtha: 13.5, residue: 32.0 }
    },
    URALS: {
      code: "URALS",
      name: "Russian Urals",
      origin: "Russia (Primorsk / Novorossiysk)",
      api: 31.0,
      sulfur: 1.48,
      desulfCost: 1.80,
      ospDiff: -12.50,
      yields: { gasoline: 20.5, diesel: 29.5, jet: 13.5, naphtha: 17.0, residue: 19.5 }
    },
    WTI_MIDLAND: {
      code: "WTI_MIDLAND",
      name: "US WTI Midland",
      origin: "United States (Corpus Christi)",
      api: 44.3,
      sulfur: 0.15,
      desulfCost: 0.25,
      ospDiff: -3.70,
      yields: { gasoline: 28.0, diesel: 22.0, jet: 17.5, naphtha: 29.5, residue: 3.0 }
    }
  },

  // 12. THE 12 PLAIN-ENGLISH CHAPTERS (CHAPTERS 1-5 EXACTLY MATCHING CORE CURRICULUM)
  chapters: [
    {
      id: 1,
      number: "01",
      title: "The Dubai & Oman Ecosystem",
      subtitle: "Fields, Export Terminals, Animated Flows & The 9 Major Middle Eastern Grades",
      sectionTag: "CHAPTER 01 // DUBAI & OMAN ECOSYSTEM",
      summary: "Discover where Dubai and Oman crude oil are pumped, which fields and ports supply them, how barrels move from wellhead to Asian tankers, and compare all 9 flagship Middle Eastern crude grades.",
      whatIsThis: "Dubai and Oman are the pricing heart of the Asian oil market. Even though Dubai's offshore wells (Fateh, Southwest Fateh) now produce around 50,000 barrels a day, Oman's onshore fields (Block 6: Fahud, Yibal, Mukhaizna) pump 1,000,000 barrels a day through the Mina al Fahal terminal near Muscat. Together with Abu Dhabi's Murban, Upper Zakum, and Das Blend, Saudi Arabia's Arab Light/Medium/Heavy, and Iraq's Basrah grades, they form the physical supply engine for Asia.",
      whyItMatters: "Over 14.5 million barrels of Middle Eastern oil sail to Asia every single day. Because Oman's Mina al Fahal terminal and Abu Dhabi's Fujairah terminal sit outside the narrow Strait of Hormuz, Asian buyers treat them as lifeline supply points that never face Persian Gulf bottlenecks.",
      tradingImpact: "Every barrel exported from Saudi Arabia, Iraq, Kuwait, and the UAE to Asia is priced using the Dubai/Oman benchmark. Refiners in China, India, Japan, and South Korea choose between the 9 Middle Eastern grades based on API gravity (light vs heavy) and sulfur content (sweet vs sour).",
      mapId: "dubai_oman_eco"
    },
    {
      id: 2,
      number: "02",
      title: "Asian Crude Demand & Refineries",
      subtitle: "China, India, Japan & South Korea: Mega-Refineries, Import Flows & What They Consume",
      sectionTag: "CHAPTER 02 // ASIAN DEMAND & REFINERIES",
      summary: "Explore the 4 giant Asian oil buyers importing 22.4 million barrels every day. See their biggest coastal refineries plotted on interactive maps, where they buy their oil, and which grades each refinery consumes.",
      whatIsThis: "Four Asian countries control the global crude market: China (11.45 Mb/d imports), India (4.85 Mb/d), South Korea (2.95 Mb/d), and Japan (2.45 Mb/d). Along their coastlines sit the largest refineries on Earth—including Reliance Jamnagar in India (1.4 Mb/d), ZPC Zhoushan in China (800k b/d), SK Ulsan in Korea (840k b/d), and ENEOS Chiba in Japan.",
      whyItMatters: "Each buyer has a completely different shopping strategy. Japan buys 95% Middle Eastern crude for energy security. India buys ~39% discounted Russian Urals and heavy Iraqi Basrah to feed high-complexity cokers. China buys Oman, Russian ESPO pipeline crude, and Saudi Arab Light. South Korea mixes Middle East oil with tax-free US WTI Midland.",
      tradingImpact: "When China's independent 'teapot' refineries in Shandong increase runs or India's Reliance switches from Saudi Arab Heavy to Russian Urals, global tanker flows and crude diffs shift within hours.",
      mapId: "china_sourcing"
    },
    {
      id: 3,
      number: "03",
      title: "Official Selling Prices (OSP) & Shipping",
      subtitle: "How Monthly OSP Pricing Works & How VLCC, Suezmax, and Aframax Tankers Carry Oil",
      sectionTag: "CHAPTER 03 // OSP & MARITIME FREIGHT",
      summary: "Understand Official Selling Prices (OSP) in plain English with an interactive price builder, then compare the three supertanker classes—VLCC, Suezmax, and Aframax—with visual vessel diagrams.",
      whatIsThis: "Middle Eastern oil companies like Saudi Aramco and ADNOC do not haggle over every ship. Instead, around the 5th of each month, they release an Official Selling Price (OSP)—a simple dollar premium or discount added to the monthly average of Dubai/Oman (for example: Dubai/Oman + $1.80/bbl). Once bought, the oil sails on three main tanker sizes: VLCC (2 million barrels), Suezmax (1 million barrels), or Aframax (700,000 barrels).",
      whyItMatters: "The delivered cost of oil at an Asian refinery is the FOB cargo price (Benchmark + OSP) plus the ocean freight cost. A giant VLCC cuts the shipping cost from Saudi Arabia to China to ~$2.15/bbl, whereas smaller ships cost more per barrel but can fit into shallower ports or through the Suez Canal.",
      tradingImpact: "If Saudi Aramco sets its monthly OSP too high (+$3.50/bbl), Asian refiners reduce their Saudi orders and book VLCCs loaded with US or West African crude instead.",
      mapId: "saudi_to_china"
    },
    {
      id: 4,
      number: "04",
      title: "Why Refineries Choose Different Crudes",
      subtitle: "Interactive Refinery Matchmaker, Product Yields & Animated Tanker Route Simulator",
      sectionTag: "CHAPTER 04 // REFINERY PREFERENCES",
      summary: "Why do some refineries pay extra for light sweet Murban while others buy thick, high-sulfur Basrah Heavy? Test any crude grade, API gravity, sulfur level, and freight cost in the live Refinery Simulator.",
      whatIsThis: "Not all refineries are built the same. Simple refineries can only boil light, low-sulfur ('sweet') crude oil like Murban or WTI Midland. Complex refineries in India, China, and Korea have spent billions on 'Cokers' and 'Hydrotreaters'—giant chemical units that crack thick, high-sulfur ('sour') bottom-of-the-barrel oil like Basrah Heavy or Arab Heavy into clean diesel, jet fuel, and petrochemical feedstock.",
      whyItMatters: "Heavy sour crude sells at a $3 to $8 per barrel discount compared to light sweet crude. A complex refinery that can digest cheap, dirty crude and sell expensive clean diesel pockets an extra $4 to $7 per barrel in refining profit.",
      tradingImpact: "Use the interactive simulator below to adjust API gravity, sulfur %, freight cost, crude grade, and destination country—and watch the best refinery match, buyer, product yield, and animated sea route update live!",
      mapId: "india_refineries"
    },
    {
      id: 5,
      number: "05",
      title: "When Atlantic Crude Becomes Competitive",
      subtitle: "WTI Midland, Brent, West Africa & North Sea vs Russian Urals, ESPO & Sokol",
      sectionTag: "CHAPTER 05 // ATLANTIC BASIN & RUSSIA",
      summary: "See when long-haul oil from Texas, the North Sea, and West Africa beats Middle Eastern oil into Asia, and map how Russian Urals, ESPO, and Sokol flow east.",
      whatIsThis: "Asia doesn't just buy from the Persian Gulf. Two rival regions compete aggressively for Asian refineries: 1) The Atlantic Basin—pumping US WTI Midland (Texas), North Sea Brent/Forties/Johan Sverdrup (UK/Norway), and West African Bonny Light/Cabinda (Nigeria/Angola); and 2) Russia—exporting Urals from Baltic/Black Sea ports and ESPO & Sokol from Pacific ports (Kozmino and De-Kastri).",
      whyItMatters: "Atlantic oil has to sail 10,000 to 15,000 miles (30 to 46 days) to reach Asia. It becomes competitive in Asia when European Brent prices drop close to Dubai prices (a narrow Brent-Dubai spread under $1.50/bbl) and VLCC freight is cheap. Meanwhile, Russian ESPO reaches China in just 3 days from Kozmino!",
      tradingImpact: "Atlantic and Russian barrels act as a permanent ceiling on Middle Eastern pricing power. Whenever Gulf producers raise prices, Asian buyers pivot to WTI Midland, West African sweet grades, or discounted Russian Urals and ESPO.",
      mapId: "corridor_atlantic"
    },
    {
      id: 6,
      number: "06",
      title: "How Dubai/Oman Pricing Works",
      subtitle: "Inside the 30-Minute 16:30 Singapore Trading Window",
      sectionTag: "CHAPTER 06 // PRICING MECHANICS",
      summary: "Step inside the Platts Singapore window between 16:00 and 16:30 to see how 25,000-barrel partial trades set the daily price of Asian oil.",
      whatIsThis: "Every day from 16:00 to 16:30 Singapore time, oil traders trade 25,000-barrel electronic clips ('partials') of Dubai crude. Once a buyer collects 20 partials (500,000 barrels) from the same seller, it converts into a real physical supertanker cargo of Dubai, Oman, Upper Zakum, Murban, or Al-Shaheen.",
      whyItMatters: "This 20-partial rule connects paper trading directly to real ships. Nobody can artificially push the price up without having to buy millions of barrels of real crude oil.",
      tradingImpact: "The closing price at 16:30 sharp sets the official daily benchmark used by governments and refineries across the entire Middle East and Asia.",
      mapId: "dubai_oman_eco"
    },
    {
      id: 7,
      number: "07",
      title: "Ocean Chokepoints: Hormuz & Malacca",
      subtitle: "Why Two Narrow Waterways Control 20 Million Barrels a Day",
      sectionTag: "CHAPTER 07 // MARITIME CHOKEPOINTS",
      summary: "Explore the 21-mile Strait of Hormuz and the 1.7-mile Strait of Malacca, plus the desert bypass pipelines built to avoid them.",
      whatIsThis: "Tankers sailing from the Persian Gulf to Asia must squeeze through two maritime bottlenecks: the Strait of Hormuz (20.8 Mb/d) exiting the Gulf, and the Strait of Malacca (16.0 Mb/d) entering the South China Sea.",
      whyItMatters: "Only Saudi Arabia (East-West Pipeline to Yanbu) and the UAE (Habshan-Fujairah Pipeline) have pipelines that bypass Hormuz, leaving over 13 million barrels a day completely dependent on open sea lanes.",
      tradingImpact: "Any geopolitical flare-up in Hormuz or the Red Sea spikes tanker insurance costs and makes Hormuz-free grades like Oman (loaded at Muscat) and Murban (loaded at Fujairah) jump in price.",
      mapId: "hormuz_tactical"
    },
    {
      id: 8,
      number: "08",
      title: "7-Crude Delivered Cost Calculator",
      subtitle: "Compare Landed Costs & Margins Across All 4 Asian Buyers",
      sectionTag: "CHAPTER 08 // DELIVERED COST ENGINE",
      summary: "Compare FOB prices, ocean freight, sulfur cleaning costs, and netback margins for 7 major crudes side-by-side.",
      whatIsThis: "A side-by-side cost breakdown table and interactive slider engine comparing Arab Light, Arab Medium, Murban, Oman, Basrah Medium, Russian Urals, and US WTI Midland delivered into China, India, Japan, and South Korea.",
      whyItMatters: "Shows the exact dollar-and-cent math behind delivered parity—proving why a cheap FOB barrel can become expensive after freight, or why a distant barrel can win with zero tariffs.",
      tradingImpact: "Ranks all 7 crudes from #1 Most Profitable to #7 Least Profitable in real time as you move global price and freight sliders.",
      mapId: "korea_sourcing"
    },
    {
      id: 9,
      number: "09",
      title: "The Journey of One Barrel",
      subtitle: "Final Chapter: 9 Illustrated Stages from Desert Wellhead to Your Fuel Tank",
      sectionTag: "FINAL CHAPTER // BARREL WALKTHROUGH",
      summary: "Follow a single 42-gallon barrel step-by-step from 2,000 meters underground in Saudi Arabia all the way to an Asian highway.",
      whatIsThis: "An interactive 9-stage walkthrough tracking one barrel of crude oil: 1. Desert Wellhead, 2. Gas Separation Plant, 3. Coastal Export Terminal, 4. VLCC Supertanker, 5. Strait of Hormuz, 6. Strait of Malacca, 7. Asian Mega-Refinery, 8. Clean Fuel Products, and 9. Consumer Cars & Planes.",
      whyItMatters: "Seeing how value and cost build up at each physical checkpoint shows why oil trading is a game of pipelines, storage tanks, ship drafts, and distillation chemistry.",
      tradingImpact: "Every barrel accumulates lifting costs ($3.50), pipeline fees ($0.45), tanker freight ($2.15), and refining/desulfurization costs ($5.90) before turning into $88+ worth of gasoline, diesel, and jet fuel.",
      mapId: "saudi_to_china"
    }
  ],

  // 13. CHAPTER 1 DATA: DUBAI / OMAN ECOSYSTEM & ALL 9 MIDDLE EASTERN GRADES
  dubaiOmanEcosystem: {
    dubaiProfile: {
      name: "Dubai Crude (Fateh Blend)",
      country: "United Arab Emirates (Emirate of Dubai)",
      productionLocation: "Offshore Persian Gulf (~60 miles off Dubai coast)",
      supplyingFields: ["Fateh Field (discovered 1966)", "Southwest Fateh Field (1970)", "Falah Field (1972)", "Rashid Field (1973)"],
      exportTerminal: "Fateh Marine Terminal (Offshore Single Point Mooring buoys & storage tankers)",
      coordinates: [25.60, 54.42],
      api: 31.0,
      sulfur: 2.04,
      densityClass: "Medium",
      sulfurClass: "Sour",
      dailyOutput: "~55,000 b/d (Physical anchor boosted by deliverable Oman, Upper Zakum, Murban & Al-Shaheen)",
      shippingRoute: "Fateh Offshore Terminal → Strait of Hormuz → Arabian Sea → Strait of Malacca → China / Japan / Korea / Singapore",
      mainBuyers: ["China (Sinopec, PetroChina)", "Japan (ENEOS, Cosmo)", "South Korea (SK, GS Caltex)", "Singapore Refining Hub"]
    },
    omanProfile: {
      name: "Oman Export Blend",
      country: "Sultanate of Oman (PDO & Occidental)",
      productionLocation: "Onshore Interior Oman (Block 6 Northern & Southern Clusters, Block 53)",
      supplyingFields: ["Fahud & Yibal (North Oman)", "Lekhwair & Natih", "Mukhaizna & Marmul (South Oman)", "Qarn Alam (Steam-recovery field)"],
      exportTerminal: "Mina al Fahal Terminal (Muscat coast — sits OUTSIDE the Strait of Hormuz)",
      coordinates: [23.63, 58.52],
      fieldCoordinates: [22.18, 56.45],
      api: 31.3,
      sulfur: 1.40,
      densityClass: "Medium",
      sulfurClass: "Sour",
      dailyOutput: "~1,000,000 b/d (Freely traded on Dubai Mercantile Exchange / DME with zero resale restrictions)",
      shippingRoute: "Interior Block 6 Fields → 450km Main Oil Line Pipeline → Mina al Fahal (Muscat) → Indian Ocean (No Hormuz transit!) → Ningbo / Qingdao / Jamnagar / Chiba",
      mainBuyers: ["China (~80% of Oman's crude exports go to Chinese state & Shandong independent refineries)", "Japan", "India", "South Korea"]
    },
    animatedFlowStages: [
      {
        step: 1,
        title: "1. Oil Field",
        subtitle: "Underground Limestone Reservoirs",
        icon: "🏜️",
        location: "Fahud & Yibal (Oman) / Fateh (Dubai) / Ghawar (Saudi) / Bab (Abu Dhabi)",
        metric: "2,000m – 3,500m Deep",
        plainDesc: "Wells drilled deep into porous limestone rock pump hot, pressurized crude oil mixed with natural gas and salt water up to surface wellheads."
      },
      {
        step: 2,
        title: "2. Gathering System",
        subtitle: "Field Pipelines & Gas-Oil Separation (GOSP)",
        icon: "🔧",
        location: "Abqaiq (Saudi) / Habshan (UAE) / Nahada Central Hub (Oman)",
        metric: "Removes H2S Gas & Salt Water",
        plainDesc: "Network of steel gathering pipes feeds raw oil into separation plants that strip out toxic hydrogen sulfide gas, sand, and water so the oil is safe to ship."
      },
      {
        step: 3,
        title: "3. Export Terminal",
        subtitle: "Coastal Tank Farms & Offshore Buoys",
        icon: "⚓",
        location: "Mina al Fahal (Muscat) / Fujairah (UAE) / Ras Tanura (Saudi) / Al Basrah (Iraq)",
        metric: "50,000 – 85,000 bbl/hr Loading",
        plainDesc: "Giant coastal storage tanks hold millions of barrels. Booster pumps push the oil through underwater pipelines to floating buoys 3 miles offshore where supertankers moor."
      },
      {
        step: 4,
        title: "4. Supertanker (VLCC)",
        subtitle: "2-Million-Barrel Ocean Voyage",
        icon: "🚢",
        location: "Arabian Sea → Indian Ocean → Strait of Malacca → South China Sea",
        metric: "2,000,000 Barrels | 13.5 Knots",
        plainDesc: "A 333-meter VLCC supertanker loads for 36 hours and sails 5,500 to 6,500 nautical miles across the Indian Ocean and through the Strait of Malacca toward Asia."
      },
      {
        step: 5,
        title: "5. Asian Buyers",
        subtitle: "Deepwater Receiving Ports & Mega-Refineries",
        icon: "🏭",
        location: "Ningbo & Qingdao (China) / Jamnagar (India) / Ulsan (Korea) / Chiba (Japan)",
        metric: "14.5 Million Barrels / Day",
        plainDesc: "After 5 to 21 days at sea, the tanker pumps its crude into coastal refinery tanks in China, India, Japan, and South Korea to be refined into diesel, jet fuel, and gasoline."
      }
    ],
    nineMiddleEastGrades: [
      {
        id: "oman",
        name: "Oman Blend",
        country: "Oman",
        flag: "🇴🇲",
        productionLocation: "Block 6 Interior Fields (Fahud, Yibal, Lekhwair, Mukhaizna)",
        terminal: "Mina al Fahal (Muscat — Outside Hormuz)",
        coords: [23.63, 58.52],
        api: 31.3,
        sulfur: 1.40,
        weightCategory: "Medium",
        sweetSour: "Sour",
        typicalBuyers: "China (Sinopec, PetroChina, Shandong Independent Refiners), Japan, India",
        plainSummary: "The most liquid freely-traded physical crude in the Middle East. Loads outside the Strait of Hormuz and serves as the backbone of Chinese refining and the DME Oman futures contract."
      },
      {
        id: "murban",
        name: "Murban",
        country: "United Arab Emirates (Abu Dhabi / ADNOC)",
        flag: "🇦🇪",
        productionLocation: "Onshore Abu Dhabi Fields (Bab, Bu Hasa, Asab, Sahil)",
        terminal: "Fujairah Terminal (Outside Hormuz via ADCOP Pipeline)",
        coords: [25.12, 56.36],
        api: 40.5,
        sulfur: 0.70,
        weightCategory: "Light",
        sweetSour: "Low-Sulfur Sour (Near-Sweet)",
        typicalBuyers: "Japan (ENEOS, Idemitsu), South Korea (SK, GS Caltex), Thailand, India",
        plainSummary: "Abu Dhabi's crown-jewel light oil (~1.7 Mb/d). Rich in jet fuel and naphtha, piped across the mountains to Fujairah so tankers never have to enter the Strait of Hormuz."
      },
      {
        id: "arab_light",
        name: "Arab Light",
        country: "Saudi Arabia (Saudi Aramco)",
        flag: "🇸🇦",
        productionLocation: "Ghawar Field (World's largest onshore oil field), Abqaiq & Khurais",
        terminal: "Ras Tanura (Persian Gulf) & Yanbu (Red Sea)",
        coords: [26.64, 50.16],
        api: 32.8,
        sulfur: 1.97,
        weightCategory: "Light / Medium",
        sweetSour: "Sour",
        typicalBuyers: "China (ZPC, Sinopec), Japan (ENEOS), South Korea (S-Oil), India (Reliance, IOC)",
        plainSummary: "The flagship crude of Saudi Aramco and the historical workhorse of Asian refining. Reliable, consistent quality with balanced yields of diesel, gasoline, and petrochemical naphtha."
      },
      {
        id: "arab_medium",
        name: "Arab Medium",
        country: "Saudi Arabia (Saudi Aramco)",
        flag: "🇸🇦",
        productionLocation: "Zuluf, Marjan, Qatif & Khursaniyah Fields (Offshore & Coastal)",
        terminal: "Ras Tanura & Ju'aymah Terminal",
        coords: [26.85, 50.05],
        api: 30.2,
        sulfur: 2.55,
        weightCategory: "Medium",
        sweetSour: "Sour",
        typicalBuyers: "China (Hengli, ZPC), South Korea (S-Oil, Hyundai Oilbank), India, Taiwan",
        plainSummary: "Heavier and higher in sulfur than Arab Light, sold at a discount ($0.80–$1.40/bbl cheaper) to reward Asian refineries equipped with hydrotreaters and conversion units."
      },
      {
        id: "arab_heavy",
        name: "Arab Heavy",
        country: "Saudi Arabia (Saudi Aramco)",
        flag: "🇸🇦",
        productionLocation: "Safaniya Field (World's largest offshore oil field) & Manifa",
        terminal: "Ras Tanura Terminal",
        coords: [27.98, 48.78],
        api: 27.4,
        sulfur: 2.85,
        weightCategory: "Heavy",
        sweetSour: "Sour",
        typicalBuyers: "India (Reliance Jamnagar), China (ZPC Zhoushan, Sinopec), South Korea (S-Oil)",
        plainSummary: "Thick, dark offshore crude sold at a steep discount. High-complexity coking refineries crack its heavy residue into high-value diesel and petrochemical feedstocks."
      },
      {
        id: "basrah_medium",
        name: "Basrah Medium",
        country: "Iraq (SOMO)",
        flag: "🇮🇶",
        productionLocation: "Southern Iraq Super-Fields (Rumaila, West Qurna-1, Zubair)",
        terminal: "Al Basrah Oil Terminal (ABOT) & Khor al-Amaya",
        coords: [29.68, 48.81],
        api: 27.9,
        sulfur: 3.00,
        weightCategory: "Medium / Heavy",
        sweetSour: "Sour",
        typicalBuyers: "India (IOC, BPCL, Reliance), China (PetroChina, Sinopec), South Korea",
        plainSummary: "Iraq's primary export blend. Competitively priced to capture huge market share in India and China, competing head-to-head with Saudi Arab Medium and Russian Urals."
      },
      {
        id: "basrah_heavy",
        name: "Basrah Heavy",
        country: "Iraq (SOMO)",
        flag: "🇮🇶",
        productionLocation: "West Qurna-2, Majnoon, Halfaya & Garraf Fields (Southern Iraq)",
        terminal: "Al Basrah Offshore Single Point Moorings (SPMs)",
        coords: [29.55, 48.88],
        api: 23.5,
        sulfur: 4.10,
        weightCategory: "Heavy",
        sweetSour: "High-Sulfur Sour",
        typicalBuyers: "India (Reliance Jamnagar, Nayara Vadinar), China (ZPC, Hengli, Shenghong)",
        plainSummary: "One of the heaviest, highest-sulfur crudes in the Middle East (4.1% sulfur). Only ultra-complex refineries with massive delayed cokers can process it—and they earn huge margins doing so."
      },
      {
        id: "upper_zakum",
        name: "Upper Zakum",
        country: "United Arab Emirates (ADNOC / Exxon / Inpex)",
        flag: "🇦🇪",
        productionLocation: "Upper Zakum Offshore Field (50 miles NW of Abu Dhabi — 2nd largest offshore field)",
        terminal: "Zirku Island Terminal (Persian Gulf)",
        coords: [24.88, 53.07],
        api: 34.0,
        sulfur: 1.80,
        weightCategory: "Medium",
        sweetSour: "Sour",
        typicalBuyers: "Japan (Inpex, ENEOS), China (Sinopec, CNOOC), South Korea, India",
        plainSummary: "Pumping over 1.0 Mb/d from artificial offshore islands. Directly deliverable into the Platts Dubai trading window, making it a critical physical pillar of the Dubai benchmark."
      },
      {
        id: "das_blend",
        name: "Das Blend",
        country: "United Arab Emirates (ADNOC)",
        flag: "🇦🇪",
        productionLocation: "Umm Shaif & Lower Zakum Offshore Fields (Persian Gulf)",
        terminal: "Das Island Terminal",
        coords: [25.15, 52.87],
        api: 39.0,
        sulfur: 1.15,
        weightCategory: "Light",
        sweetSour: "Light Sour",
        typicalBuyers: "Japan (Cosmo, Idemitsu), South Korea, Singapore, Thailand",
        plainSummary: "A high-quality light offshore crude loaded at Das Island. Popular with Japanese and Southeast Asian refiners looking for high middle-distillate (jet fuel and diesel) yields."
      }
    ]
  },

  // 14. CHAPTER 2 & 4 DATA: DETAILED ASIAN REFINERIES FOR MAP PLOTTING & SIMULATOR
  asianRefineriesList: [
    {
      id: "jamnagar",
      name: "Reliance Jamnagar Complex",
      country: "India",
      flag: "🇮🇳",
      city: "Jamnagar, Gujarat",
      coords: [22.36, 69.85],
      capacityKbd: 1400,
      nelsonComplexity: 21.1,
      type: "Ultra-Deep Conversion Coking & Petrochemical Mega-Refinery (World's #1 Largest)",
      crudeSources: "Russia (40%), Iraq (25%), Saudi Arabia (20%), UAE & Americas (15%)",
      consumedGrades: ["Russian Urals", "Basrah Heavy", "Arab Heavy", "Basrah Medium", "Merey"],
      preferredApiRange: [21, 33],
      maxSulfurTolerance: 4.5
    },
    {
      id: "vadinar",
      name: "Nayara Energy Vadinar",
      country: "India",
      flag: "🇮🇳",
      city: "Vadinar, Gujarat",
      coords: [22.39, 69.70],
      capacityKbd: 405,
      nelsonComplexity: 11.8,
      type: "High-Complexity Coastal Coking Refinery",
      crudeSources: "Russia (55%), Iraq & Saudi Arabia (35%), Others (10%)",
      consumedGrades: ["Russian Urals", "Basrah Heavy", "Arab Medium"],
      preferredApiRange: [24, 34],
      maxSulfurTolerance: 3.8
    },
    {
      id: "paradip",
      name: "Indian Oil (IOCL) Paradip",
      country: "India",
      flag: "🇮🇳",
      city: "Paradip, Odisha",
      coords: [20.26, 86.65],
      capacityKbd: 300,
      nelsonComplexity: 12.2,
      type: "East Coast Deep-Conversion Hydrocracking & Coking Hub",
      crudeSources: "Iraq (35%), Russia (30%), Saudi Arabia & UAE (25%), West Africa (10%)",
      consumedGrades: ["Basrah Medium", "Russian Urals", "Arab Heavy", "Bonny Light"],
      preferredApiRange: [24, 36],
      maxSulfurTolerance: 3.8
    },
    {
      id: "zhoushan_zpc",
      name: "ZPC Zhoushan (Rongsheng)",
      country: "China",
      flag: "🇨🇳",
      city: "Zhoushan Island, Zhejiang",
      coords: [30.05, 122.10],
      capacityKbd: 800,
      nelsonComplexity: 14.2,
      type: "Integrated Crude-to-Chemicals (COTC) Mega-Complex (Saudi Aramco Equity Partner)",
      crudeSources: "Saudi Arabia (45%), UAE & Oman (25%), Iraq (15%), Russia & Brazil (15%)",
      consumedGrades: ["Arab Light", "Arab Heavy", "Oman Blend", "Upper Zakum", "Basrah Heavy"],
      preferredApiRange: [24, 36],
      maxSulfurTolerance: 4.0
    },
    {
      id: "zhenhai",
      name: "Sinopec Zhenhai Refining & Chemical",
      country: "China",
      flag: "🇨🇳",
      city: "Ningbo, Zhejiang",
      coords: [29.95, 121.72],
      capacityKbd: 540,
      nelsonComplexity: 12.5,
      type: "Flagship State Coastal Refining & Ethylene Hub",
      crudeSources: "Middle East (55%), Russia (20%), West Africa & Brazil (25%)",
      consumedGrades: ["Arab Light", "Oman Blend", "Upper Zakum", "Russian Urals", "Cabinda"],
      preferredApiRange: [28, 38],
      maxSulfurTolerance: 3.0
    },
    {
      id: "qingdao_shandong",
      name: "Shandong Independent ('Teapot') Cluster",
      country: "China",
      flag: "🇨🇳",
      city: "Qingdao / Dongying / Rizhao",
      coords: [36.06, 120.38],
      capacityKbd: 2100,
      nelsonComplexity: 9.8,
      type: "Independent Commercial Refiners Focused on Short-Haul & Discounted Crudes",
      crudeSources: "Russia ESPO & Urals (45%), Oman (25%), Brazil & Heavy Sour (30%)",
      consumedGrades: ["Russian ESPO", "Oman Blend", "Russian Urals", "Sokol", "Tupi"],
      preferredApiRange: [28, 38],
      maxSulfurTolerance: 2.5
    },
    {
      id: "hengli_dalian",
      name: "Hengli Petrochemical Dalian",
      country: "China",
      flag: "🇨🇳",
      city: "Changxing Island, Dalian",
      coords: [39.52, 121.95],
      capacityKbd: 400,
      nelsonComplexity: 13.8,
      type: "High-Conversion Aromatics & Paraxylene Mega-Refinery",
      crudeSources: "Saudi Arabia (50%), Iraq & Oman (30%), Russia (20%)",
      consumedGrades: ["Arab Medium", "Arab Heavy", "Oman Blend", "Basrah Medium"],
      preferredApiRange: [26, 35],
      maxSulfurTolerance: 3.5
    },
    {
      id: "ulsan_sk",
      name: "SK Energy Ulsan Complex",
      country: "South Korea",
      flag: "🇰🇷",
      city: "Ulsan",
      coords: [35.50, 129.38],
      capacityKbd: 840,
      nelsonComplexity: 12.6,
      type: "Asia's 2nd Largest Single-Site Export Refinery",
      crudeSources: "Middle East (65%), US WTI Midland (20%), North Sea & WAF (15%)",
      consumedGrades: ["Arab Light", "WTI Midland", "Murban", "Upper Zakum", "Basrah Medium"],
      preferredApiRange: [28, 44],
      maxSulfurTolerance: 3.2
    },
    {
      id: "yeosu_gs",
      name: "GS Caltex Yeosu Refinery",
      country: "South Korea",
      flag: "🇰🇷",
      city: "Yeosu, Jeollanam-do",
      coords: [34.82, 127.75],
      capacityKbd: 800,
      nelsonComplexity: 12.4,
      type: "Deep-Conversion Residue Hydrocracking & Export Hub",
      crudeSources: "Middle East (62%), US WTI Midland (22%), Americas/North Sea (16%)",
      consumedGrades: ["Murban", "WTI Midland", "Oman Blend", "Arab Medium", "Forties"],
      preferredApiRange: [29, 44],
      maxSulfurTolerance: 3.0
    },
    {
      id: "onsan_soil",
      name: "S-Oil Onsan (Aramco Subsidiary)",
      country: "South Korea",
      flag: "🇰🇷",
      city: "Onsan / Ulsan",
      coords: [35.43, 129.35],
      capacityKbd: 669,
      nelsonComplexity: 13.1,
      type: "Dedicated Saudi Aramco Sour-Crude Upgrading & Petrochemical Hub",
      crudeSources: "Saudi Arabia (90%+ term supply), UAE & Kuwait (10%)",
      consumedGrades: ["Arab Light", "Arab Medium", "Arab Heavy"],
      preferredApiRange: [27, 34],
      maxSulfurTolerance: 3.5
    },
    {
      id: "chiba_eneos",
      name: "ENEOS Chiba & Tokyo Bay Hub",
      country: "Japan",
      flag: "🇯🇵",
      city: "Chiba / Kawasaki / Negishi",
      coords: [35.53, 140.08],
      capacityKbd: 549,
      nelsonComplexity: 10.8,
      type: "High-Reliability Desulfurization & Clean Domestic Fuel Complex",
      crudeSources: "UAE & Saudi Arabia (80%), Qatar & Kuwait (15%), US WTI (5%)",
      consumedGrades: ["Murban", "Arab Light", "Das Blend", "Upper Zakum", "WTI Midland"],
      preferredApiRange: [32, 43],
      maxSulfurTolerance: 2.2
    },
    {
      id: "mizushima_eneos",
      name: "ENEOS Mizushima Refinery",
      country: "Japan",
      flag: "🇯🇵",
      city: "Kurashiki, Okayama",
      coords: [34.50, 133.74],
      capacityKbd: 345,
      nelsonComplexity: 11.2,
      type: "Western Japan Integrated Refining & Chemical Complex",
      crudeSources: "Saudi Arabia (45%), UAE (40%), Oman & Kuwait (15%)",
      consumedGrades: ["Arab Light", "Murban", "Upper Zakum", "Oman Blend"],
      preferredApiRange: [30, 41],
      maxSulfurTolerance: 2.5
    }
  ],

  // 15. CHAPTER 3 DATA: VESSEL CLASSES (VLCC, SUEZMAX, AFRAMAX)
  vesselClasses: [
    {
      id: "vlcc",
      name: "VLCC (Very Large Crude Carrier)",
      tagline: "The 2-Million-Barrel Ocean Highway Giant",
      barrels: "2,000,000 bbls",
      deadweight: "300,000 – 320,000 DWT",
      length: "333 meters",
      beam: "60 meters",
      draft: "21.5 meters",
      typicalSpeed: "13.0 – 14.5 knots",
      freightCostPerBbl: "$1.80 – $2.50 / bbl (Middle East → Asia) | $4.50 / bbl (US Gulf → Asia)",
      dailyCharterRate: "$42,000 – $65,000 / day",
      keyRoutes: "Persian Gulf (Ras Tanura / Fujairah / Basrah) → China, Japan, South Korea, India; US Gulf → Asia around Cape of Good Hope",
      canalLimit: "Too deep for the Suez Canal when fully loaded; cannot fit through the Panama Canal. Fits through the Strait of Malacca (Malaccamax limit: 25m).",
      plainExplanation: "A VLCC is longer than three football fields and taller than a 20-story building. Because it carries 2 million barrels on a single trip with a crew of just 25 sailors, it drops the shipping cost from Saudi Arabia to China to just ~5 cents per gallon."
    },
    {
      id: "suezmax",
      name: "Suezmax Tanker",
      tagline: "The 1-Million-Barrel Suez Canal & Russian Urals Workhorse",
      barrels: "1,000,000 bbls",
      deadweight: "150,000 – 165,000 DWT",
      length: "274 meters",
      beam: "48 meters",
      draft: "17.0 meters",
      typicalSpeed: "14.0 knots",
      freightCostPerBbl: "$3.20 – $5.50 / bbl (Russia Black Sea / Baltic → India via Suez)",
      dailyCharterRate: "$35,000 – $52,000 / day",
      keyRoutes: "Russian Black Sea (Novorossiysk) & Baltic (Primorsk) → Suez Canal → India; West Africa → Europe & India",
      canalLimit: "Specifically engineered to be the largest ship that can sail through Egypt's Suez Canal fully loaded.",
      plainExplanation: "Carrying 1 million barrels (half a VLCC), the Suezmax is the king of the Red Sea and Mediterranean. Since 2022, fleets of Suezmax tankers carry Russian Urals crude through the Suez Canal straight to Indian refineries in Gujarat."
    },
    {
      id: "aframax",
      name: "Aframax Tanker",
      tagline: "The Agile 700,000-Barrel Regional Shuttle",
      barrels: "700,000 bbls",
      deadweight: "80,000 – 115,000 DWT",
      length: "245 meters",
      beam: "42 meters",
      draft: "14.8 meters",
      typicalSpeed: "14.5 knots",
      freightCostPerBbl: "$1.10 – $1.60 / bbl (Kozmino Russia → China 3-day shuttle)",
      dailyCharterRate: "$28,000 – $44,000 / day",
      keyRoutes: "Kozmino Port (Russia Pacific) → Shandong China ('Teapot' ports); Sakhalin (De-Kastri) → China/India; US Gulf ship-to-ship lightering",
      canalLimit: "Shallow 14.8m draft allows it to dock at smaller shallow-water ports where giant VLCCs would run aground.",
      plainExplanation: "Aframax tankers are the delivery trucks of short-distance oil trade. They run non-stop 3-day shuttles from Russia's Pacific port of Kozmino into Chinese ports in Shandong, and ferry Texas oil out to deep water to fill up waiting VLCCs."
    }
  ],

  // 16. CHAPTER 5 DATA: ATLANTIC BASIN & RUSSIAN GRADES
  atlanticAndRussianGrades: {
    atlanticGrades: [
      {
        id: "wti_midland",
        name: "WTI Midland",
        region: "US Gulf Coast (Permian Basin, Texas & New Mexico)",
        country: "United States",
        flag: "🇺🇸",
        exportPorts: "Corpus Christi & Houston, Texas",
        coords: [27.80, -97.39],
        api: 42.5,
        sulfur: 0.18,
        type: "Light Sweet",
        voyageToAsia: "44 – 48 days around the Cape of Good Hope (15,300 nm)",
        mainBuyers: "South Korea (SK, GS Caltex — 0% Free Trade Agreement tariff), China, Taiwan, Japan",
        whyBuyersWantIt: "Ultra-clean, low-sulfur shale oil that produces massive amounts of gasoline, jet fuel, and petrochemical naphtha with almost no heavy waste."
      },
      {
        id: "brent_forties",
        name: "Brent / Forties Blend",
        region: "North Sea (UK Offshore)",
        country: "United Kingdom",
        flag: "🇬🇧",
        exportPorts: "Hound Point Terminal (Scotland) & Sullom Voe",
        coords: [56.00, -3.37],
        api: 38.7,
        sulfur: 0.55,
        type: "Light / Medium Sweet",
        voyageToAsia: "35 – 42 days to North Asia",
        mainBuyers: "South Korea (benefits from UK-Korea FTA duty waiver), China (Unipec)",
        whyBuyersWantIt: "The physical backbone of the Dated Brent benchmark. When European refinery demand is weak, Forties cargoes sail east to South Korea and China."
      },
      {
        id: "johan_sverdrup",
        name: "Johan Sverdrup",
        region: "North Sea (Norwegian Continental Shelf)",
        country: "Norway",
        flag: "🇳🇴",
        exportPorts: "Mongstad Terminal, Norway",
        coords: [60.81, 5.03],
        api: 28.0,
        sulfur: 0.80,
        type: "Medium Low-Sulfur",
        voyageToAsia: "36 – 43 days to China / India",
        mainBuyers: "China (Sinopec, independent refiners), India, European refiners",
        whyBuyersWantIt: "Norway's giant field (~750,000 b/d). Unlike light North Sea oil, Sverdrup is a medium-density oil rich in diesel that competes directly with Oman and Russian Urals."
      },
      {
        id: "waf_nigeria_angola",
        name: "West African Grades (Bonny Light, Forcados, Cabinda, Girassol)",
        region: "West Africa (Niger Delta & Offshore Angola)",
        country: "Nigeria & Angola",
        flag: "🇳🇬 🇦🇴",
        exportPorts: "Bonny & Forcados (Nigeria) / Malongo & Offshore FPSOs (Angola)",
        coords: [-5.55, 12.19],
        api: 33.5,
        sulfur: 0.16,
        type: "Light / Medium Sweet",
        voyageToAsia: "26 – 31 days across South Atlantic & Indian Ocean (9,200 nm)",
        mainBuyers: "China (takes 60%+ of Angolan exports), India (IOC, HPCL, BPCL buy Nigerian diesel-rich grades), Indonesia",
        whyBuyersWantIt: "Naturally low in sulfur (0.15%) and exceptionally rich in middle distillates (diesel and aviation jet fuel), making it a favorite for Indian state refiners."
      }
    ],
    russianGrades: [
      {
        id: "urals",
        name: "Urals Blend",
        region: "Western Siberia & Volga-Urals Basin",
        country: "Russia",
        flag: "🇷🇺",
        exportPorts: "Primorsk & Ust-Luga (Baltic Sea) / Novorossiysk (Black Sea)",
        coords: [60.35, 28.62],
        api: 31.0,
        sulfur: 1.48,
        type: "Medium Sour",
        voyageToAsia: "26 – 30 days via Suez Canal to Jamnagar, India (8,400 nm) | 38 days to China",
        mainBuyers: "India (~1.8 Mb/d — Reliance, Nayara, IOC, BPCL) & China (~0.6 Mb/d)",
        whyBuyersWantIt: "Chemically almost identical to Oman and Arab Light (31° API, 1.48% sulfur), but sold at a $10 to $18/bbl discount due to Western sanctions—making it the #1 profit engine for Indian refiners."
      },
      {
        id: "espo",
        name: "ESPO Blend (East Siberia-Pacific Ocean)",
        region: "Eastern Siberia Fields (Vankor, Talakan, Verkhnechonsk)",
        country: "Russia",
        flag: "🇷🇺",
        exportPorts: "Kozmino Port (Pacific Ocean near Vladivostok) + Direct Pipeline to Daqing",
        coords: [42.73, 133.00],
        api: 34.8,
        sulfur: 0.55,
        type: "Light-Medium Low-Sulfur",
        voyageToAsia: "Only 2.5 to 3.5 days by Aframax tanker from Kozmino to Shandong, China (850 nm)!",
        mainBuyers: "China (Shandong independent 'teapot' refineries & state refiners buy ~90%+ of all ESPO), India",
        whyBuyersWantIt: "High-diesel yield, low sulfur, and the shortest ocean voyage in Asia. A Chinese refinery in Qingdao can order ESPO on Monday and have it in its tanks by Thursday."
      },
      {
        id: "sokol",
        name: "Sokol (Sakhalin-1)",
        region: "Offshore Sakhalin Island (Chayvo, Odoptu, Arkutun-Dagi fields in Sea of Okhotsk)",
        country: "Russia (Far East)",
        flag: "🇷🇺",
        exportPorts: "De-Kastri Terminal (Tatar Strait) & Offshore Shuttle Tankers",
        coords: [51.46, 140.78],
        api: 37.9,
        sulfur: 0.23,
        type: "Light Sweet",
        voyageToAsia: "4 – 5 days to North China | 16 – 19 days to India",
        mainBuyers: "China (Sinopec, PetroChina, independent refiners) & India (IOC, Reliance)",
        whyBuyersWantIt: "A premium, ultra-clean Far East crude that yields huge amounts of jet kerosene and diesel with minimal sulfur removal needed."
      }
    ]
  },

  // 17. MASTER 26-MAP CATALOG
  mapsCatalog: [
    // A. Dedicated Sourcing Maps (5)
    { id: "china_sourcing", title: "1. China Crude Sourcing Map", category: "sourcing", center: [32.0, 115.0], zoom: 4, desc: "China imports 11.45 Mb/d: 44% Middle East, 21% Russia (ESPO pipeline + Urals), 12% US, 11% LatAm, 8% West Africa." },
    { id: "india_sourcing", title: "2. India Crude Sourcing Map", category: "sourcing", center: [21.0, 78.0], zoom: 4, desc: "India imports 4.85 Mb/d: 39% Russia (deep discount Urals feast), 44% Middle East, 7% West Africa, 6% US." },
    { id: "japan_sourcing", title: "3. Japan Crude Sourcing Map", category: "sourcing", center: [36.0, 138.0], zoom: 5, desc: "Japan imports 2.45 Mb/d: 95.2% Middle East sovereign security, 2.8% US WTI, 0% Russian seaborne (strict G7 compliance)." },
    { id: "korea_sourcing", title: "4. South Korea Sourcing Map", category: "sourcing", center: [36.0, 128.0], zoom: 5, desc: "South Korea imports 2.95 Mb/d: 67% Middle East, 18% US WTI Midland (0% tariff under KORUS FTA), 8% LatAm, 7% WAF." },
    { id: "dubai_oman_eco", title: "5. Dubai/Oman/Murban Pricing Geography", category: "sourcing", center: [24.5, 56.5], zoom: 6, desc: "The physical basket anchors: Fateh (Dubai), Mina al Fahal (Oman), Das Island, Zirku, Halul, Fujairah, and Ras Tanura." },

    // B. Supertanker Maritime Routes (8)
    { id: "saudi_to_china", title: "6. Saudi Arabia → China Route (5,910 nm)", category: "routes", center: [18.0, 85.0], zoom: 3, desc: "Ras Tanura to Ningbo aboard VLCC: 19.5 days via Hormuz and Malacca Strait ($2.15/bbl freight)." },
    { id: "saudi_to_india", title: "7. Saudi Arabia → India Route (1,650 nm)", category: "routes", center: [24.0, 62.0], zoom: 5, desc: "Ras Tanura to Sikka/Jamnagar: 5.4 days ultra-short sprint ($0.95/bbl freight)." },
    { id: "russia_to_china", title: "8. Russia (Kozmino) → China Route (850 nm)", category: "routes", center: [39.0, 128.0], zoom: 6, desc: "ESPO Pacific shuttle: 2.8 days from Kozmino pipeline terminus into Shandong teapots ($1.10/bbl)." },
    { id: "russia_to_india", title: "9. Russia (Primorsk) → India Route (8,400 nm)", category: "routes", center: [30.0, 40.0], zoom: 3, desc: "Baltic to Gujarat redirection: 27.5 days via Gibraltar, Suez, and Arabian Sea ($5.80/bbl shadow freight)." },
    { id: "us_to_korea", title: "10. US (Corpus Christi) → Korea (15,300 nm)", category: "routes", center: [-5.0, 60.0], zoom: 2, desc: "Permian export around Cape of Good Hope: 46.5 days aboard reverse-lightered VLCC into Ulsan ($4.80/bbl)." },
    { id: "uae_to_japan", title: "11. UAE (Fujairah) → Japan Route (6,550 nm)", category: "routes", center: [20.0, 95.0], zoom: 3, desc: "Fujairah to Tokyo Bay: 21.0 days completely bypassing the Strait of Hormuz ($2.30/bbl)." },
    { id: "waf_to_china", title: "12. West Africa (Angola) → China (9,200 nm)", category: "routes", center: [-5.0, 70.0], zoom: 3, desc: "Cabinda to Ningbo: 29.5 days across South Atlantic and Indian Ocean ($3.95/bbl)." },
    { id: "iraq_to_china", title: "13. Iraq (Basrah) → China Route (6,200 nm)", category: "routes", center: [18.0, 85.0], zoom: 3, desc: "Basrah Oil Terminal to Zhoushan: 20.5 days via Hormuz and Singapore ($2.25/bbl)." },

    // C. Chokepoints & Vulnerabilities (5)
    { id: "hormuz_tactical", title: "14. Strait of Hormuz Tactical TSS Lanes", category: "chokepoints", center: [26.56, 56.45], zoom: 9, desc: "21 nautical miles wide with two 2-mile traffic separation lanes carrying 20.8 Mb/d of oil." },
    { id: "hormuz_bypasses", title: "15. Hormuz Bypass Pipeline Network", category: "chokepoints", center: [24.0, 48.0], zoom: 6, desc: "Saudi East-West Petroline (5.0 Mb/d to Yanbu) & UAE Habshan-Fujairah pipeline (1.8 Mb/d) = 6.8 Mb/d bypass." },
    { id: "malacca_bottleneck", title: "16. Strait of Malacca & Singapore Strait", category: "chokepoints", center: [1.25, 103.85], zoom: 9, desc: "Philips Channel is only 1.7 nm wide; maximum vessel draft restricted to 25m Malaccamax." },
    { id: "red_sea_conflict", title: "17. Bab el-Mandeb Conflict Zone", category: "chokepoints", center: [12.6, 43.3], zoom: 6, desc: "Southern Red Sea chokepoint (8.8 Mb/d); military drone attacks forced tankers onto the Cape route." },
    { id: "cape_reroute_map", title: "18. Cape of Good Hope Bypass Route", category: "chokepoints", center: [-34.5, 18.5], zoom: 4, desc: "Circumnavigating Africa adds 10 to 14 days and $1.1M to $1.5M in bunker fuel per voyage." },

    // D. Asian Mega-Refineries & Hubs (5)
    { id: "china_refineries", title: "19. China Coastal Mega-Refining Hubs", category: "refineries", center: [30.5, 122.0], zoom: 6, desc: "ZPC Zhoushan (800k b/d), Sinopec Zhenhai (460k b/d), and Hengli Dalian (400k b/d)." },
    { id: "india_refineries", title: "20. India Gujarat Refining Epicenter", category: "refineries", center: [22.4, 70.0], zoom: 7, desc: "Reliance Jamnagar (1.4 Mb/d - world's largest) and Nayara Vadinar (400k b/d) deepwater SPMs." },
    { id: "japan_refineries", title: "21. Japan Tokyo Bay & Coastal Hubs", category: "refineries", center: [35.5, 140.0], zoom: 8, desc: "ENEOS Chiba, Idemitsu Chiba, and Negishi coastal refineries serving metropolitan Kanto." },
    { id: "korea_refineries", title: "22. South Korea Petrochemical Mega-Hubs", category: "refineries", center: [35.5, 129.3], zoom: 7, desc: "SK Innovation Ulsan (840k b/d) and GS Caltex Yeosu (800k b/d) complex conversion units." },
    { id: "singapore_refining", title: "23. Singapore Trading & Blending Hub", category: "refineries", center: [1.28, 103.75], zoom: 10, desc: "Jurong Island chemical cluster (1.5 Mb/d refining) and offshore floating storage anchorages." },

    // E. Global Trans-Oceanic Corridors (3)
    { id: "corridor_me", title: "24. Trans-Oceanic Corridor: Gulf → Asia", category: "corridors", center: [15.0, 80.0], zoom: 3, desc: "14.5 Mb/d baseload arterial flow connecting Persian Gulf loading buoys with Asian mega-ports." },
    { id: "corridor_russia", title: "25. Trans-Oceanic Corridor: Russia Redirection", category: "corridors", center: [45.0, 60.0], zoom: 3, desc: "4.3 Mb/d seaborne pivot: Arctic/Baltic voyages to India and Kozmino pipeline shuttle to China." },
    { id: "corridor_atlantic", title: "26. Trans-Oceanic Corridor: Atlantic Basin Arbs", category: "corridors", center: [10.0, -10.0], zoom: 2, desc: "3.6 Mb/d swing supply: US Gulf WTI Midland and West African sweet crudes sailing to Asia." }
  ]
};

if (typeof window !== "undefined") {
  window.OIL_DATA = OIL_DATA;
}
