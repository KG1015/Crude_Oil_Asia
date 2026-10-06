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
      strategicFocus: "Energy security, crude-to-chemicals (COTC), and discounted barrel optimization.",
      buyerStructure: "State refiners (Sinopec, PetroChina), private mega-refiners (ZPC, Hengli), and Shandong teapots.",
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
      tradingBehavior: "Arbitrage optimizer. Balances Russian ESPO/Urals discounts with term Saudi/Oman contracts."
    },

    india: {
      name: "India",
      flag: "🇮🇳",
      totalImportsMbd: 4.85,
      refiningCapacityMbd: 5.2,
      strategicFocus: "Maximum refining netback, diesel exports, and high-conversion coking of sour crude.",
      buyerStructure: "Reliance Jamnagar (1.4 Mb/d), Nayara Energy, and State PSUs (IOCL, BPCL, HPCL).",
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
      tradingBehavior: "High-discount buyer. Absorbs ~40% Russian Urals while maintaining Middle Eastern baseline volumes."
    },

    japan: {
      name: "Japan",
      flag: "🇯🇵",
      totalImportsMbd: 2.45,
      refiningCapacityMbd: 3.3,
      strategicFocus: "Strict supply security, G7 sanctions compliance, and high-spec clean domestic fuels.",
      buyerStructure: "Commercial majors led by ENEOS (~50%), Idemitsu Kosan, Cosmo Oil, and Taiyo Oil.",
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
      tradingBehavior: "Over 95% dependent on Persian Gulf term contracts tied to monthly Dubai/Oman OSPs."
    },

    southKorea: {
      name: "South Korea",
      flag: "🇰🇷",
      totalImportsMbd: 2.95,
      refiningCapacityMbd: 3.4,
      strategicFocus: "Export-driven margin optimization across clean fuels and petrochemical aromatics.",
      buyerStructure: "Four merchant giants: SK Innovation, GS Caltex, S-Oil (Aramco), and HD Hyundai Oilbank.",
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
      tradingBehavior: "Blends Middle East sour term barrels with duty-free US WTI Midland via VLCC."
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
        { name: "Saudi Petroline (East-West to Yanbu)", originCountry: "Saudi Arabia 🇸🇦", destCountry: "Saudi Arabia 🇸🇦 (Yanbu / Red Sea)", capacityMbd: 5.0, currentUseMbd: 2.2 },
        { name: "UAE Habshan-Fujairah Pipeline", originCountry: "UAE 🇦🇪 (Abu Dhabi)", destCountry: "UAE 🇦🇪 (Fujairah / Gulf of Oman)", capacityMbd: 1.8, currentUseMbd: 1.1 },
        { name: "Iran Goreh-Jask Pipeline", originCountry: "Iran 🇮🇷 (Bushehr)", destCountry: "Iran 🇮🇷 (Jask / Gulf of Oman)", capacityMbd: 0.35, currentUseMbd: 0.1 }
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
        { name: "Myanmar-China Oil Pipeline (Kyaukpyu to Kunming)", originCountry: "Myanmar 🇲🇲", destCountry: "China 🇨🇳 (Yunnan)", capacityMbd: 0.44, currentUseMbd: 0.22 }
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
        { name: "Saudi Petroline Yanbu Export Terminal", originCountry: "Saudi Arabia 🇸🇦", destCountry: "Saudi Arabia 🇸🇦 (Yanbu)", capacityMbd: 5.0, currentUseMbd: 2.2 }
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
      location: "Ghawar Field, Saudi Arabia",
      description: "Lifted 2,000m underground from Arab-D limestone. Ghawar pumps 3.8+ Mb/d at an extraction cost under $3.50/bbl.",
      volumeOrFact: "1 Barrel = 42 US Gallons (159 Liters)",
      pricingImpact: "Lifting Cost: $3.20 - $3.80 / bbl",
      riskFactor: "Reservoir pressure maintenance via water injection",
      icon: "🏜️"
    },
    {
      step: 2,
      title: "The Gathering Pipeline & Plant",
      subtitle: "Stabilization & Degassing",
      location: "Abqaiq Processing Complex, Saudi Arabia",
      description: "Wet sour crude flows to Abqaiq to strip toxic hydrogen sulfide (H2S) gas and adjust vapor pressure.",
      volumeOrFact: "Flow Velocity: ~5.2 km/h in 36-48 inch steel pipelines",
      pricingImpact: "Stabilization & Desalting Tariff: ~$0.45 / bbl",
      riskFactor: "Single-point critical infrastructure vulnerability",
      icon: "🚰"
    },
    {
      step: 3,
      title: "The Super-Terminal",
      subtitle: "Offshore Loading onto Tankers",
      location: "Ras Tanura Marine Terminal, Persian Gulf",
      description: "Stabilized crude loads onto moored supertankers at 50,000 bbl/h with certified volume and density inspection.",
      volumeOrFact: "Terminal Storage: 33 Million Barrels capacity",
      pricingImpact: "Port Charges, Demurrage & Inspection: ~$0.15 / bbl",
      riskFactor: "Port congestion and weather demurrage",
      icon: "⚓"
    },
    {
      step: 4,
      title: "The Supertanker (VLCC)",
      subtitle: "The Workhorse of Global Seaborne Trade",
      location: "Aboard a Very Large Crude Carrier (VLCC)",
      description: "Carries 2,000,000 barrels in a 333-meter double-hull tanker cruising at 13 knots toward Asia.",
      volumeOrFact: "Supertanker Cargo: 2.0M Barrels ($150M cargo value)",
      pricingImpact: "Baltic TD3C Freight Rate: $2.15 / bbl (WS 58.5)",
      riskFactor: "Bunker price volatility & emissions compliance",
      icon: "🚢"
    },
    {
      step: 5,
      title: "Chokepoint 1: Strait of Hormuz",
      subtitle: "The 21-Mile Sovereign Gateway",
      location: "Strait of Hormuz, Persian Gulf",
      description: "Vessels navigate the 2-mile outward lane where 20.8 Mb/d—20% of global petroleum liquids—exits the Gulf.",
      volumeOrFact: "Daily Flow: 20.8 Mb/d (Only 6.8 Mb/d pipeline bypass)",
      pricingImpact: "War Risk Insurance: +0.20% to +0.50% cargo value",
      riskFactor: "Naval interdiction, mine threats, and blockades",
      icon: "🛡️"
    },
    {
      step: 6,
      title: "Chokepoint 2: Strait of Malacca",
      subtitle: "The Gateway to East Asia",
      location: "Strait of Malacca & Singapore Strait",
      description: "After 14 days crossing the Indian Ocean, ships traverse the Philips Channel (1.7 nm wide) with a 25m draft ceiling.",
      volumeOrFact: "Throughput: 16.2 Mb/d bound for China, Japan & Korea",
      pricingImpact: "Malacca Pilotage & Electronic Tolls: ~$0.08 / bbl",
      riskFactor: "Heavy traffic congestion, grounding risks, and piracy",
      icon: "🧭"
    },
    {
      step: 7,
      title: "The Coastal Mega-Refinery",
      subtitle: "Fractionation & Molecular Cracking",
      location: "ZPC Zhoushan (China) or Jamnagar (India)",
      description: "Crude is heated to 370°C in atmospheric distillation; heavy bottoms feed vacuum towers and delayed cokers.",
      volumeOrFact: "Refining Intake: 800,000 b/d complex configuration",
      pricingImpact: "Refining Cost: $3.80 / bbl | Desulfurization: $2.10 / bbl",
      riskFactor: "Catalyst poisoning from sulfur and heavy metals",
      icon: "🏭"
    },
    {
      step: 8,
      title: "The Clean Product Yields",
      subtitle: "Finished Euro-VI / China-VI Fuels",
      location: "Secondary Hydrocrackers & Fuel Storage",
      description: "One 42-gallon barrel produces ~19 gal gasoline, ~12 gal ultra-low-sulfur diesel, ~4 gal jet fuel, and chemical naphtha.",
      volumeOrFact: "Yield: 45% Light Ends, 35% Distillates, 20% Residue/Coke",
      pricingImpact: "Gross Refining Margin: +$6.50 to +$9.20 / bbl",
      riskFactor: "Crack spread volatility and carbon compliance",
      icon: "⛽"
    },
    {
      step: 9,
      title: "The Consumer End-Use",
      subtitle: "Powering Asia's Industrial Economy",
      location: "Asian Transportation, Aviation & Chemicals",
      description: "Fuel powers Shanghai commuter vehicles, Indian heavy transport, Tokyo air routes, and medical polymers.",
      volumeOrFact: "Energy Content: Delivers ~5.8 Million BTUs",
      pricingImpact: "Retail Finished Value: $85 - $110 / bbl equivalent",
      riskFactor: "EV substitution and macroeconomic demand shifts",
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
      subtitle: "Fields, Export Terminals & The 9 Major Middle Eastern Grades",
      sectionTag: "CHAPTER 01 // DUBAI & OMAN ECOSYSTEM",
      summary: "Overview of Dubai/Oman production, export hubs, and the 9 Middle Eastern grades supplying Asia.",
      whatIsThis: "Dubai and Oman anchor Asian crude pricing. Dubai (~50k b/d) and Oman (~1 Mb/d) anchor the physical basket alongside Saudi, UAE, and Iraqi grades.",
      whyItMatters: "Over 14.5 Mb/d flows from the Gulf to Asia. Ports outside Hormuz (Oman's Mina al Fahal, UAE's Fujairah) offer bypass loading routes.",
      tradingImpact: "Gulf barrels price against Dubai/Oman differentials. Refiners select grades by API gravity and sulfur to balance yields and margins.",
      mapId: "dubai_oman_eco"
    },
    {
      id: 2,
      number: "02",
      title: "Asian Crude Demand & Refineries",
      subtitle: "China, India, Japan & South Korea: Mega-Refineries & Import Slates",
      sectionTag: "CHAPTER 02 // ASIAN DEMAND & REFINERIES",
      summary: "Profiling Asia's top 4 buyers importing 22.4 Mb/d and their coastal refining assets.",
      whatIsThis: "China (11.5 Mb/d), India (4.9 Mb/d), South Korea (3.0 Mb/d), and Japan (2.5 Mb/d) dominate world seaborne crude trade.",
      whyItMatters: "Distinct buyer profiles: Japan prioritizes supply security, India seeks deep discounts, China optimizes scale, and Korea targets product exports.",
      tradingImpact: "Run-rate changes at Chinese teapots or Indian cokers directly shift regional crude premiums and VLCC tanker rates.",
      mapId: "china_sourcing"
    },
    {
      id: 3,
      number: "03",
      title: "Official Selling Prices (OSP) & Shipping",
      subtitle: "Monthly Pricing Formulas & Supertanker Logistics",
      sectionTag: "CHAPTER 03 // OSP & MARITIME FREIGHT",
      summary: "How NOCs set monthly formula pricing and how supertankers deliver oil across the ocean.",
      whatIsThis: "Producers set monthly OSPs as differentials to Dubai/Oman. Crude sails on VLCC (2M bbl), Suezmax (1M bbl), or Aframax (700k bbl) tankers.",
      whyItMatters: "Delivered cost equals FOB benchmark + OSP + freight. VLCC freight economies scale Gulf-to-Asia transit to ~$2.15/bbl.",
      tradingImpact: "Higher Middle Eastern OSPs prompt Asian refiners to trim Gulf nominations and charter Atlantic Basin or spot barrels.",
      mapId: "saudi_to_china"
    },
    {
      id: 4,
      number: "04",
      title: "Why Refineries Choose Different Crudes",
      subtitle: "Refinery Configurations, API/Sulfur Economics & Yield Simulator",
      sectionTag: "CHAPTER 04 // REFINERY PREFERENCES",
      summary: "How refinery complexity dictates crude selection between light sweet and heavy sour grades.",
      whatIsThis: "Simple hydroskimmers require light sweet crude. Complex refiners with cokers digest heavy sour crudes to yield high-value diesel and jet fuel.",
      whyItMatters: "Heavy sour grades trade at $3–$8/bbl discounts. Complex refiners capture this spread to maximize net refining margins.",
      tradingImpact: "Adjust API gravity, sulfur %, freight cost, and destination below to view matched refineries, product yields, and net margin outcomes.",
      mapId: "india_refineries"
    },
    {
      id: 5,
      number: "05",
      title: "When Atlantic Crude Becomes Competitive",
      subtitle: "WTI Midland, Brent, West Africa vs Russian Urals & ESPO",
      sectionTag: "CHAPTER 05 // ATLANTIC BASIN & RUSSIA",
      summary: "Analyzing when Atlantic Basin and Russian crudes outcompete Persian Gulf barrels into Asia.",
      whatIsThis: "US WTI Midland, North Sea Brent, West African grades, and Russian Urals/ESPO compete directly against Persian Gulf crudes.",
      whyItMatters: "Atlantic crudes face 30–45 day voyages. A narrow Brent-Dubai EFS (<$1.50) and low tanker freight open the arbitrage window.",
      tradingImpact: "Atlantic and Russian flows cap Middle Eastern OSP pricing power by giving Asian buyers alternative baseload options.",
      mapId: "corridor_atlantic"
    },
    {
      id: 6,
      number: "06",
      title: "How Dubai/Oman Pricing Works",
      subtitle: "The 30-Minute Platts 16:30 Singapore Window",
      sectionTag: "CHAPTER 06 // PRICING MECHANICS",
      summary: "How 25,000-barrel partial trades in Singapore establish daily physical crude benchmarks.",
      whatIsThis: "Between 16:00 and 16:30 SGT, traders exchange 25k bbl partials. Amassing 20 partials converts into a 500k bbl physical cargo.",
      whyItMatters: "The 20-partial physical delivery convergence anchors paper derivatives to actual tanker deliveries.",
      tradingImpact: "The 16:30 Singapore assessment establishes the daily benchmark used in Middle Eastern term contracts.",
      mapId: "dubai_oman_eco"
    },
    {
      id: 7,
      number: "07",
      title: "Ocean Chokepoints: Hormuz & Malacca",
      subtitle: "The Two Critical Straits Controlling 20 Million Barrels Daily",
      sectionTag: "CHAPTER 07 // MARITIME CHOKEPOINTS",
      summary: "Navigational bottlenecks at the Strait of Hormuz (20.8 Mb/d) and Strait of Malacca (16.0 Mb/d).",
      whatIsThis: "Persian Gulf crude must pass Hormuz upon exit and Malacca to enter East Asia.",
      whyItMatters: "Only Saudi Arabia and the UAE have Hormuz bypass pipelines; over 13 Mb/d remains sea-dependent.",
      tradingImpact: "Regional disruptions surge tanker insurance and boost demand for grades loading outside Hormuz (Oman, Murban).",
      mapId: "hormuz_tactical"
    },
    {
      id: 8,
      number: "08",
      title: "7-Crude Delivered Cost Calculator",
      subtitle: "Landed Parity & Netback Margins Across 4 Asian Markets",
      sectionTag: "CHAPTER 08 // DELIVERED COST ENGINE",
      summary: "Interactive landed cost calculator comparing FOB, freight, insurance, and desulfurization for 7 crudes.",
      whatIsThis: "Delivered parity model comparing Arab Light, Arab Medium, Murban, Oman, Basrah Medium, Russian Urals, and WTI Midland into Asia.",
      whyItMatters: "Shows real landed economics—revealing how freight spikes or quality penalties alter crude competitiveness.",
      tradingImpact: "Ranks crudes by delivered netback in real time as benchmark spreads, freight rates, and discounts change.",
      mapId: "korea_sourcing"
    },
    {
      id: 9,
      number: "09",
      title: "The Journey of One Barrel",
      subtitle: "9 Key Stages from Desert Wellhead to Fuel Tank",
      sectionTag: "CHAPTER 09 // PHYSICAL JOURNEY",
      summary: "Tracking a 42-gallon crude barrel through production, marine logistics, and refining.",
      whatIsThis: "Nine physical stages: wellhead, gas separation, export terminal, VLCC transit, chokepoints, refining, and final consumer delivery.",
      whyItMatters: "Details value and cost accumulation across extraction, shipping, and chemical conversion.",
      tradingImpact: "Lifting ($3.50), transit ($2.60), and refining ($5.90) transform a $74 crude barrel into $88+ of high-value refined fuels.",
      mapId: "saudi_to_china"
    },
    {
      id: 10,
      number: "10",
      title: "What Happens If A Major Supplier Disappears?",
      subtitle: "Interactive Supply Shock Simulator, Live Flow Diverter & Future Pipeline Corridors",
      sectionTag: "STRATEGY WAR GAME // CHAPTER 10",
      summary: "Interactive crisis scenarios (Russia, UAE, Saudi Arabia, Hormuz, Atlantic Arbitrage) and 10 future bypass pipeline routes.",
      whatIsThis: "A real-time strategic war game simulating the disappearance of top crude suppliers (Russia, UAE, Saudi Arabia) and maritime chokepoint closures.",
      whyItMatters: "Asia imports 22.4 million barrels every single day with near-zero domestic backup. A single outage forces billions of dollars in emergency crude rerouting.",
      tradingImpact: "Shows immediate price shocks on Brent, WTI, and Dubai OSPs, identifying who wins the cash windfalls and which refiners face feedstock starvation.",
      mapId: "corridor_me"
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
        subtitle: "Underground Reservoirs",
        icon: "🏜️",
        location: "Fahud, Yibal, Ghawar & Bab",
        metric: "2,000m – 3,500m Deep",
        plainDesc: "Wells pump crude, gas, and water from deep porous rock to surface wellheads."
      },
      {
        step: 2,
        title: "2. Gathering System",
        subtitle: "GOSP Separation Plants",
        icon: "🔧",
        location: "Abqaiq, Habshan & Nahada",
        metric: "Strips H2S Gas & Water",
        plainDesc: "Pipelines feed separation plants that remove toxic H2S gas and salt water for safe export."
      },
      {
        step: 3,
        title: "3. Export Terminal",
        subtitle: "Tank Farms & Offshore Buoys",
        icon: "⚓",
        location: "Mina al Fahal, Fujairah & Ras Tanura",
        metric: "50,000 – 85,000 bbl/hr",
        plainDesc: "Coastal tank farms pump crude through subsea lines to load tankers at offshore SPM buoys."
      },
      {
        step: 4,
        title: "4. Supertanker (VLCC)",
        subtitle: "Ocean Transit",
        icon: "🚢",
        location: "Arabian Sea → Malacca Strait",
        metric: "2M Barrels | 13.5 Knots",
        plainDesc: "VLCC carries 2M barrels across the Indian Ocean to Asia (18–21 days)."
      },
      {
        step: 5,
        title: "5. Asian Refineries",
        subtitle: "Mega-Refining Hubs",
        icon: "🏭",
        location: "Ningbo, Jamnagar, Ulsan & Chiba",
        metric: "14.5 Mb/d Total Demand",
        plainDesc: "Coastal refineries discharge cargo to crack into gasoline, jet fuel, and diesel."
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
  ],

  // 18. CHAPTER 10 DATA: SUPPLY SHOCK SCENARIOS & FUTURE BYPASS ROUTES
  shockScenarios: {
    russia: {
      id: "russia",
      title: "Scenario 1: Russia Disappears (~4.1 Mb/d)",
      shortTitle: "1. Russia Disappears",
      icon: "🇷🇺",
      badgeColor: "#dc2626",
      headlineMetric: "-4.1 Mb/d Cut Off",
      brentShift: "+$5 to +$15 / bbl",
      brentPct: "▲ +6% to +19%",
      wtiShift: "+$4 to +$10 / bbl",
      wtiPct: "▲ +5% to +14% (Spread: +80% to +160%)",
      dubaiShift: "+$1 to +$4 / bbl OSP",
      dubaiPct: "▲ +40% to +160% OSP",
      brentGaugePct: 65,
      wtiGaugePct: 58,
      dubaiGaugePct: 78,
      question: "India buys 36% of its crude from Russia at steep discounts. If Russian tankers vanish tomorrow, who pays the bill and who replaces the oil first?",
      lostBarrels: "4.1 Mb/d (Urals ~1.7M to India/China, ESPO ~1.7M, Sokol ~0.2M)",
      affectedBuyers: "India (-36% crude diet; Reliance/Nayara hit) & Chinese Teapots",
      replacementBarrels: "Saudi Arab Light/Med (+1.2M), US Midland (+0.6M), Brazil (+0.4M), Iraq (+0.3M)",
      replacementCountries: "Saudi Arabia, United States, Brazil, Iraq, UAE",
      currentRoutes: "Baltic to India (28 days) & Kozmino to China (3-day shuttle)",
      alternativeRoutes: "US Gulf & Brazil VLCCs via Cape of Good Hope; Persian Gulf shuttles to India",
      brentImpact: "+$5 to +$15 / bbl spike (~+6% to +19% price surge on ~$78 base; mitigated by Saudi Aramco spare capacity taps).",
      wtiImpact: "WTI Midland rallies +$4 to +$10 / bbl (+5% to +14% flat price effect); Brent-WTI arb spread widens by +80% to +160% (from $4 to $8–$12/bbl) as US export docks run at 100%.",
      dubaiImpact: "Surges; Middle East NOCs hike Asian monthly OSPs by +$1.00 to +$4.00/bbl (+40% to +160% premium hike over baseline).",
      winner: "Saudi Aramco, US Shale Exporters, Brazil Pre-Salt, VLCC Owners",
      loser: "Indian Private Refiners (lose cheap feed), Chinese Teapots (run cuts)",
      verdict: "Manageable shock. Saudi spare capacity is the backstop; India and China pay higher bills while US and Saudi cash the checks.",
      mapSevered: [
        { name: "Kozmino → China Aframax Shuttle", coords: [[42.73, 133.02], [36.06, 120.38]] },
        { name: "Baltic Primorsk → India Suezmax", coords: [[60.36, 28.62], [36.0, -6.0], [31.2, 32.3], [12.6, 43.3], [22.43, 69.83]] }
      ],
      mapReplacement: [
        { name: "Ras Tanura → Gujarat VLCC (+1.2M)", coords: [[26.64, 50.16], [24.5, 58.5], [22.43, 69.83]], color: "#059669" },
        { name: "US Gulf (Corpus Christi) → China VLCC (+0.6M)", coords: [[27.81, -97.39], [-34.5, 18.5], [1.25, 103.85], [29.87, 121.54]], color: "#0284c7" },
        { name: "Santos (Brazil) → India VLCC (+0.4M)", coords: [[-24.0, -46.3], [-34.5, 18.5], [22.43, 69.83]], color: "#10b981" }
      ]
    },
    uae: {
      id: "uae",
      title: "Scenario 2: UAE Disappears (~2.3 Mb/d)",
      shortTitle: "2. UAE Disappears",
      icon: "🇦🇪",
      badgeColor: "#d97706",
      headlineMetric: "-2.3 Mb/d Cut Off",
      brentShift: "+$3 to +$10 / bbl",
      brentPct: "▲ +4% to +13%",
      wtiShift: "+$6 to +$12 / bbl",
      wtiPct: "▲ +8% to +16% (Spread: +120% to +200%)",
      dubaiShift: "Benchmark Dislocation",
      dubaiPct: "⚡ +150% to +250% Prem.",
      brentGaugePct: 55,
      wtiGaugePct: 75,
      dubaiGaugePct: 92,
      question: "Japan relies on the UAE for nearly 40% of its crude. If Murban and Upper Zakum disappear, how does Tokyo keep its lights on and factories running?",
      lostBarrels: "2.3 Mb/d (Murban ~1.5M light sweet, Upper Zakum ~0.6M sour, Das ~0.2M)",
      affectedBuyers: "Japan (loses #1 supplier / 40% of imports; ENEOS, Idemitsu) & South Korea",
      replacementBarrels: "Saudi Arab Extra Light (+0.8M), US WTI Midland (+0.5M), Oman (+0.2M), Qatar (+0.1M)",
      replacementCountries: "Saudi Arabia (Arab Extra Light), United States (WTI Midland), Oman, Qatar",
      currentRoutes: "Fujairah/Das Island to Tokyo Bay (21 days) & Ulsan (19 days)",
      alternativeRoutes: "Transpacific US VLCCs; Saudi Ras Tanura shuttles; National Strategic Reserves",
      brentImpact: "+$3 to +$10 / bbl (~+4% to +13% price impact on ~$78 base; acutely concentrated in premium light-sweet grades).",
      wtiImpact: "WTI Midland surges +$6 to +$12 / bbl (+8% to +16%); light-sweet arb spread spikes +120% to +200% as Japan/Korea replace Murban under 0% US FTA.",
      dubaiImpact: "Benchmark dislocation; IFAD Murban futures suspended; physical cash differentials surge +150% to +250% over Dubai index.",
      winner: "US WTI Midland Exporters, Saudi Aramco (AXL grade), Oman (DME relevance)",
      loser: "Japanese Refiners (95% Middle East dependent), ADNOC, IFAD paper hedgers",
      verdict: "Benchmark crisis. Tokyo faces supply panic; US WTI Midland steps in as Asia's everyday light sweet crude.",
      mapSevered: [
        { name: "Fujairah / Das Island → Tokyo Bay VLCC", coords: [[25.18, 56.36], [5.8, 80.5], [1.25, 103.85], [35.6, 140.1]] }
      ],
      mapReplacement: [
        { name: "US Gulf → Tokyo Bay VLCC (+0.5M)", coords: [[27.81, -97.39], [15.0, -140.0], [35.6, 140.1]], color: "#0284c7" },
        { name: "Ras Tanura → Tokyo Bay (Arab Extra Light +0.8M)", coords: [[26.64, 50.16], [5.8, 80.5], [1.25, 103.85], [35.6, 140.1]], color: "#d97706" }
      ]
    },
    saudi: {
      id: "saudi",
      title: "Scenario 3: Saudi Arabia Disappears (~4.5 Mb/d — The Stress Case)",
      shortTitle: "3. Saudi Disappears (Stress Case)",
      icon: "🇸🇦",
      badgeColor: "#990000",
      headlineMetric: "-4.5 Mb/d + NO SPARE CUSHION",
      brentShift: "+$15 to +$40+ / bbl",
      brentPct: "▲ +20% to +55%+ ($120–$150)",
      wtiShift: "+$15 to +$35 / bbl",
      wtiPct: "▲ +20% to +47% (Spread: +250% to +500%)",
      dubaiShift: "Market Collapse / Rationing",
      dubaiPct: "🛑 System Breakdown",
      brentGaugePct: 98,
      wtiGaugePct: 95,
      dubaiGaugePct: 99,
      question: "Saudi Arabia holds the entire world’s spare cushion. If Saudi exports stop, who has the spare oil to save Asia? (Answer: NOBODY).",
      lostBarrels: "4.5 Mb/d (Arab Light/Med) + ALL 3.5 Mb/d Global Spare Cushion Gone!",
      affectedBuyers: "ALL OF ASIA: Japan (1.0M), Korea (0.9M), China (1.6M JVs starve), India (0.8M)",
      replacementBarrels: "NOBODY CAN REPLACE SAUDI. Unfilled void of 1.5–3.0 Mb/d triggers forced cuts",
      replacementCountries: "Fragments from US (+0.8M), Brazil (+0.8M), UAE/Iraq (+0.6M maxed out)",
      currentRoutes: "Ras Tanura & Juaymah VLCC lanes to China, Japan, Korea, India",
      alternativeRoutes: "Emergency SPR stock draws across China, US, Japan, Korea; Atlantic Basin pull",
      brentImpact: "+$15 to +$40+ / bbl explosion (~+20% to +55%+ price shock, rocketing Brent to $120–$150/bbl; historic shock as global spare capacity hits zero).",
      wtiImpact: "Historic surge of +$15 to +$35 / bbl (+20% to +47%); transpacific arb spread explodes +250% to +500%; severe political pressure in Washington to ban crude exports.",
      dubaiImpact: "Complete benchmark breakdown; OSP formula system disintegrates; physical premiums surpass +$20–$30/bbl before trading halts.",
      winner: "All non-Saudi producers (US shale, Brazil, Norway, Guyana)",
      loser: "Entire Asian economy: industrial power rationing, factory cuts, fuel crisis",
      verdict: "System failure. Saudi Arabia is the central bank of energy; losing it triggers a global economic recession.",
      mapSevered: [
        { name: "Ras Tanura → Ningbo / Zhoushan", coords: [[26.64, 50.16], [5.8, 80.5], [1.25, 103.85], [29.87, 121.54]] },
        { name: "Ras Tanura → Gujarat (Jamnagar)", coords: [[26.64, 50.16], [22.43, 69.83]] }
      ],
      mapReplacement: [
        { name: "US Corpus Christi → Asia Pacific Max (+1.0M)", coords: [[27.81, -97.39], [-34.5, 18.5], [1.25, 103.85], [29.87, 121.54]], color: "#0284c7" },
        { name: "Brazil Santos → Asia Max (+0.8M)", coords: [[-24.0, -46.3], [-34.5, 18.5], [29.87, 121.54]], color: "#10b981" }
      ]
    },
    hormuz: {
      id: "hormuz",
      title: "Scenario 4: Strait of Hormuz Closes (~20.8 Mb/d)",
      shortTitle: "4. Hormuz Closes (Blockade)",
      icon: "🌊",
      badgeColor: "#0284c7",
      headlineMetric: "13.7 Mb/d Trapped in Gulf",
      brentShift: "+$30 to +$60 / bbl",
      brentPct: "▲ +38% to +77% ($130–$160)",
      wtiShift: "+$25 to +$50 / bbl",
      wtiPct: "▲ +34% to +68% (Spread: +300% to +600%)",
      dubaiShift: "Gulf Trading Halted",
      dubaiPct: "🔥 +400% War Premium",
      brentGaugePct: 99,
      wtiGaugePct: 96,
      dubaiGaugePct: 100,
      question: "20.8 million barrels pass through the 21-mile Strait of Hormuz daily. If naval conflict shuts the channel, which bypass routes survive?",
      lostBarrels: "13.7 Mb/d trapped in Gulf! (Only 6.8 Mb/d diverted via Saudi & UAE pipelines)",
      affectedBuyers: "All Asian nations: 65% of all Asian crude imports blocked behind the Strait",
      replacementBarrels: "Fujairah (ADCOP) 1.8 Mb/d, Yanbu (Petroline) 5.0 Mb/d, US Gulf, Atlantic Basin",
      replacementCountries: "UAE (Fujairah terminal), Saudi Arabia (Yanbu Red Sea), United States, Brazil",
      currentRoutes: "21-mile TSS transit through Strait of Hormuz (20.8 Mb/d) completely severed",
      alternativeRoutes: "Red Sea loading via Yanbu; Gulf of Oman loading via Fujairah; Atlantic corridors",
      brentImpact: "+$30 to +$60 / bbl wartime explosion (~+38% to +77% surge, rocket-launching Brent to $130–$160/bbl; only 6.8 Mb/d pipeline bypasses operable).",
      wtiImpact: "Extreme rally of +$25 to +$50 / bbl (+34% to +68%); US Gulf SPM docks max out at 100%; Atlantic supertanker freight rates surge +400%.",
      dubaiImpact: "Persian Gulf trading suspended; Fujairah outside Hormuz commands unprecedented +$35 to +$55/bbl wartime loading premiums.",
      winner: "Fujairah Port, Saudi Yanbu Terminal, Atlantic Basin producers",
      loser: "Kuwait, Qatar, Iraq, Bahrain (100% landlocked behind the blockade)",
      verdict: "Geographic warfare. Only oil loaded outside Hormuz can sail. Fujairah and Yanbu become gold dust.",
      mapSevered: [
        { name: "Hormuz Strait Chokepoint Transit (Severed)", coords: [[26.0, 55.0], [26.56, 56.45], [25.0, 58.0]] }
      ],
      mapReplacement: [
        { name: "Yanbu (Red Sea) → Asia VLCCs (5.0M)", coords: [[24.1, 38.0], [12.6, 43.3], [5.8, 80.5], [1.25, 103.85], [29.87, 121.54]], color: "#059669" },
        { name: "Fujairah (Outside Hormuz) → Asia VLCCs (1.8M)", coords: [[25.18, 56.36], [5.8, 80.5], [1.25, 103.85], [35.6, 140.1]], color: "#d97706" }
      ]
    },
    atlantic_cheap: {
      id: "atlantic_cheap",
      title: "Scenario 5: Atlantic Crude Becomes Cheap (Arbitrage Flood)",
      shortTitle: "5. Atlantic Crude Cheap",
      icon: "📉",
      badgeColor: "#059669",
      headlineMetric: "EFS < $0.80 / bbl (Arb Open)",
      brentShift: "-$2 to -$5 / bbl vs Dubai",
      brentPct: "▼ -2.5% to -6.5%",
      wtiShift: "+$2 / bbl at Dock",
      wtiPct: "▲ +2.7% (Dock Prem: +100% to +150%)",
      dubaiShift: "Saudi OSP Cuts (-$2.00)",
      dubaiPct: "▼ -50% to -75% OSP",
      brentGaugePct: 35,
      wtiGaugePct: 62,
      dubaiGaugePct: 30,
      question: "When the Brent-Dubai EFS spread collapses below a dollar, why do Asian refiners cancel Middle East term barrels and book Texas supertankers?",
      lostBarrels: "0 barrels lost (US & Brazil undercut Gulf crudes on landed economics)",
      affectedBuyers: "South Korea, China, and Taiwan gain cheap Atlantic feed",
      replacementBarrels: "US WTI Midland (+1.5 Mb/d), Brazilian Pre-Salt (+0.8 Mb/d), West Africa (+0.5M)",
      replacementCountries: "United States, Brazil, Guyana, Angola, Nigeria",
      currentRoutes: "Standard Persian Gulf to Asia 19-day shuttle lines",
      alternativeRoutes: "15,300 nm mega-voyages around Cape of Good Hope from Texas to Asian ports",
      brentImpact: "Brent weakens -$2 to -$5 / bbl relative to Dubai (~ -2.5% to -6.5% discount); Brent-Dubai EFS spread collapses by -70% to -85% below $0.80/bbl.",
      wtiImpact: "WTI Midland FOB Corpus Christi dock premium strengthens +$2.00/bbl (+100% to +150% rise in loading fee; +2.7% flat crude effect) as Asian bookings surge.",
      dubaiImpact: "Saudi Aramco and ADNOC forced to cut monthly Asian OSPs by -$1.50 to -$3.00/bbl (-50% to -75% cut in official margins) to defend Asian market share.",
      winner: "Asian Refiners (feedstock cost plunges) & US Shale Exporters",
      loser: "Middle Eastern NOCs (forced to discount barrels to defend market share)",
      verdict: "Commercial victory for Asia. Cheap Atlantic oil breaks the Middle East monopoly and caps OPEC pricing power.",
      mapSevered: [],
      mapReplacement: [
        { name: "US Corpus Christi → South Korea (WTI Midland +1.5M)", coords: [[27.81, -97.39], [-34.5, 18.5], [1.25, 103.85], [35.5, 129.38]], color: "#0284c7" },
        { name: "Brazil Santos → China (Pre-Salt Búzios +0.8M)", coords: [[-24.0, -46.3], [-34.5, 18.5], [1.25, 103.85], [29.87, 121.54]], color: "#10b981" }
      ]
    }
  },

  futureRoutesData: [
    {
      id: "east_west",
      name: "East-West Petroline (Saudi Arabia)",
      category: "existing",
      originCountry: "Saudi Arabia 🇸🇦",
      destinationCountry: "Saudi Arabia 🇸🇦",
      transitCountries: "Domestic (Red Sea bypass across Saudi Arabia)",
      status: "Active (5.0–7.0 Mb/d)",
      probability: "High (Operational)",
      impact: "High",
      probBadge: "🟢 High",
      impactBadge: "🔥 High",
      geography: "Abqaiq / Ghawar Fields → Yanbu Red Sea Port, Saudi Arabia (1,200 km)",
      problemSolved: "Completely bypasses the Strait of Hormuz for up to 5.0 Mb/d of Saudi crude.",
      whoBenefits: "Saudi Aramco, Mediterranean & European buyers, Red Sea tanker operators",
      waypoints: [[26.0, 49.8], [24.5, 45.0], [24.1, 38.0]],
      color: "#059669"
    },
    {
      id: "adcop",
      name: "ADCOP Habshan-Fujairah (UAE)",
      category: "existing",
      originCountry: "United Arab Emirates 🇦🇪",
      destinationCountry: "United Arab Emirates 🇦🇪",
      transitCountries: "Domestic (Abu Dhabi across Hajar Mountains to Gulf of Oman)",
      status: "Active (1.5–1.8 Mb/d)",
      probability: "High (Operational)",
      impact: "High",
      probBadge: "🟢 High",
      impactBadge: "🔥 High",
      geography: "Habshan Fields (Abu Dhabi) → Fujairah Terminal (Gulf of Oman), UAE (360 km)",
      problemSolved: "Delivers Abu Dhabi Murban directly into the Indian Ocean outside Hormuz.",
      whoBenefits: "ADNOC, Japan, South Korea, Fujairah bunkering hub",
      waypoints: [[23.7, 53.7], [24.2, 55.0], [25.18, 56.36]],
      color: "#059669"
    },
    {
      id: "goreh_jask",
      name: "Goreh-Jask Pipeline (Iran)",
      category: "existing",
      originCountry: "Iran 🇮🇷",
      destinationCountry: "Iran 🇮🇷",
      transitCountries: "Domestic (Bushehr to Jask outside Hormuz)",
      status: "Partially Active (0.35–1.0 Mb/d)",
      probability: "Medium",
      impact: "High",
      probBadge: "🟡 Medium",
      impactBadge: "🔥 High",
      geography: "Goreh (Bushehr) → Jask Port (Gulf of Oman), Iran (1,000 km)",
      problemSolved: "Allows Iran to export crude even if it shuts the Strait of Hormuz during war.",
      whoBenefits: "Iran, Chinese independent teapot refiners",
      waypoints: [[29.8, 50.4], [27.0, 54.0], [25.6, 57.8]],
      color: "#d97706"
    },
    {
      id: "espo_pipe",
      name: "ESPO Pipeline (Russia → China / Pacific)",
      category: "existing",
      originCountry: "Russia 🇷🇺",
      destinationCountry: "China 🇨🇳 (Branch) & Russia 🇷🇺 (Kozmino Pacific Port)",
      transitCountries: "Direct cross-border spur to Daqing, China",
      status: "Active (1.6 Mb/d)",
      probability: "High (Operational)",
      impact: "High",
      probBadge: "🟢 High",
      impactBadge: "🔥 High",
      geography: "Eastern Siberia (Russia) → Daqing (China Spur) + Kozmino Pacific Port (4,188 km)",
      problemSolved: "Bypasses all maritime chokepoints (Hormuz, Malacca, Suez) directly into China.",
      whoBenefits: "Rosneft, Transneft, PetroChina, Shandong teapots",
      waypoints: [[56.0, 115.0], [53.5, 124.0], [42.73, 133.02]],
      color: "#059669"
    },
    {
      id: "basra_aqaba",
      name: "Basra-Aqaba Pipeline (Iraq → Jordan)",
      category: "planned",
      originCountry: "Iraq 🇮🇶",
      destinationCountry: "Jordan 🇯🇴 (with extension to Egypt 🇪🇬)",
      transitCountries: "Overland corridor from Southern Iraq into Jordan",
      status: "Proposed / Delayed (~1.0 Mb/d)",
      probability: "Medium",
      impact: "High",
      probBadge: "🟡 Medium",
      impactBadge: "🔥 High",
      geography: "Basra Oil Fields (Iraq) → Port of Aqaba (Jordan / Red Sea) (1,700 km)",
      problemSolved: "Gives landlocked southern Iraqi crude an outlet to the Red Sea avoiding Hormuz.",
      whoBenefits: "Iraq (SOMO), Jordan, Egypt, Mediterranean refiners",
      waypoints: [[30.5, 47.8], [31.5, 42.0], [29.5, 35.0]],
      color: "#3b82f6"
    },
    {
      id: "saudi_oman",
      name: "Saudi-Oman Direct Link (Saudi Arabia → Oman)",
      category: "planned",
      originCountry: "Saudi Arabia 🇸🇦",
      destinationCountry: "Oman 🇴🇲",
      transitCountries: "Empty Quarter border corridor",
      status: "Under Bilateral Study (~1.5–2.0 Mb/d)",
      probability: "Medium",
      impact: "Very High",
      probBadge: "🟡 Medium",
      impactBadge: "⚡ Very High",
      geography: "Shaybah / Eastern Province (Saudi Arabia) → Duqm SEZ (Oman / Arabian Sea)",
      problemSolved: "Bypasses BOTH the Strait of Hormuz and the Bab el-Mandeb conflict zone.",
      whoBenefits: "Saudi Aramco, Oman (Duqm Refinery), all Asian crude buyers",
      waypoints: [[22.5, 54.0], [21.0, 56.5], [19.7, 57.7]],
      color: "#8b5cf6"
    },
    {
      id: "iraq_oman",
      name: "Iraq-Oman Pipeline (Iraq → Oman via GCC)",
      category: "planned",
      originCountry: "Iraq 🇮🇶",
      destinationCountry: "Oman 🇴🇲",
      transitCountries: "Saudi Arabia 🇸🇦 & GCC overland corridor",
      status: "Conceptual (~1.0 Mb/d)",
      probability: "Low",
      impact: "High",
      probBadge: "🔴 Low",
      impactBadge: "🔥 High",
      geography: "Southern Iraq across GCC territory → Duqm Port (Oman / Arabian Sea)",
      problemSolved: "Eliminates Iraq's total dependence on vulnerable Persian Gulf offshore terminals.",
      whoBenefits: "Iraq, Oman",
      waypoints: [[30.0, 47.5], [25.0, 50.0], [20.0, 57.5]],
      color: "#94a3b8"
    },
    {
      id: "myanmar_china",
      name: "Myanmar-China Pipeline (Myanmar → China)",
      category: "asia_bypass",
      originCountry: "Myanmar 🇲🇲 (Offloading Port for Middle East/African Crude)",
      destinationCountry: "China 🇨🇳",
      transitCountries: "Myanmar overland corridor into Yunnan Province",
      status: "Active (~0.44 Mb/d)",
      probability: "High (Operational)",
      impact: "High",
      probBadge: "🟢 High",
      impactBadge: "🔥 High",
      geography: "Kyaukpyu Port / Made Island (Myanmar) → Kunming, Yunnan Province (China) (770 km)",
      problemSolved: "Bypasses the Malacca Strait entirely. Middle East crude unloads in Myanmar.",
      whoBenefits: "China (CNPC, inland Yunnan/Sichuan refiners)",
      waypoints: [[19.4, 93.6], [21.5, 98.0], [25.0, 102.7]],
      color: "#059669"
    },
    {
      id: "thai_landbridge",
      name: "Thailand Land Bridge (Kra Isthmus, Thailand)",
      category: "asia_bypass",
      originCountry: "Thailand 🇹🇭 (West Coast / Andaman Sea)",
      destinationCountry: "Thailand 🇹🇭 (East Coast / Gulf of Thailand)",
      transitCountries: "Domestic Kra Isthmus intermodal corridor",
      status: "Under Feasibility Study",
      probability: "Medium",
      impact: "High",
      probBadge: "🟡 Medium",
      impactBadge: "🔥 High",
      geography: "Ranong Port (Andaman Sea) ↔ Chumphon Port (Gulf of Thailand), Thailand (100 km corridor)",
      problemSolved: "Cuts 2–3 days of sailing time and bypasses the congested Malacca bottleneck.",
      whoBenefits: "China, Japan, Thailand, regional shippers",
      waypoints: [[9.96, 98.63], [10.49, 99.18]],
      color: "#f59e0b"
    },
    {
      id: "arctic_nsr",
      name: "Northern Sea Route (Russia → China Arctic NSR)",
      category: "arctic_wildcard",
      originCountry: "Russia 🇷🇺 (Arctic Ocean Ports)",
      destinationCountry: "China 🇨🇳 (& East Asian Refiners)",
      transitCountries: "Arctic Ocean / Bering Strait international waters",
      status: "Seasonal Expanding (Ice-class tankers)",
      probability: "High (Summer) / Medium (Winter)",
      impact: "Very High",
      probBadge: "🟢 High",
      impactBadge: "⚡ Very High",
      geography: "Murmansk / Arctic Russia → Bering Strait → Northern Chinese Ports, China (6,000 nm)",
      problemSolved: "Cuts voyage time from 40+ days to 18–22 days. Zero Western chokepoint exposure.",
      whoBenefits: "Russia, China (bypasses Suez, Malacca, and Western sanctions)",
      waypoints: [[69.0, 33.0], [75.0, 60.0], [77.0, 105.0], [70.0, 175.0], [66.0, -169.0], [40.0, 130.0]],
      color: "#06b6d4"
    },
    {
      id: "instc",
      name: "INSTC Corridor (Russia → Iran → India)",
      category: "arctic_wildcard",
      originCountry: "Russia 🇷🇺",
      destinationCountry: "India 🇮🇳",
      transitCountries: "Azerbaijan 🇦🇿 / Caspian Sea & Iran 🇮🇷 (Bandar Abbas)",
      status: "Multimodal Active (Rail/Ship/Road)",
      probability: "Medium",
      impact: "Medium",
      probBadge: "🟡 Medium",
      impactBadge: "📊 Medium",
      geography: "St. Petersburg (Russia) → Caspian Sea → Bandar Abbas (Iran) → Mumbai (India)",
      problemSolved: "Overland, unsanctionable trade corridor linking Russia directly to India.",
      whoBenefits: "Russia, Iran, India",
      waypoints: [[59.9, 30.3], [46.3, 48.0], [36.0, 51.5], [27.2, 56.3], [18.9, 72.8]],
      color: "#ec4899"
    }
  ]
};

if (typeof window !== "undefined") {
  window.OIL_DATA = OIL_DATA;
}
