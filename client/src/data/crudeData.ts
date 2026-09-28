import { CrudeAssay, AsianBuyer, TankerRoute, Chokepoint, JourneyStep, CitationItem } from '../types';

export const CRUDE_ASSAYS: Record<string, CrudeAssay> = {
  ARAB_LIGHT: {
    code: 'ARAB_LIGHT',
    name: 'Arab Light',
    origin: 'Saudi Arabia (Ghawar / Ras Tanura)',
    api: 32.8,
    sulfur: 1.97,
    desulfurizationCostPerBbl: 2.10,
    ospDifferential: +1.80,
    yieldBreakdown: { lpgNaphtha: 18.5, gasoline: 21.0, jetKero: 14.5, diesel: 28.0, residue: 18.0 }
  },
  ARAB_MEDIUM: {
    code: 'ARAB_MEDIUM',
    name: 'Arab Medium',
    origin: 'Saudi Arabia (Zuluf / Ras Tanura)',
    api: 31.0,
    sulfur: 2.50,
    desulfurizationCostPerBbl: 2.60,
    ospDifferential: +0.65,
    yieldBreakdown: { lpgNaphtha: 16.0, gasoline: 19.0, jetKero: 13.0, diesel: 27.5, residue: 24.5 }
  },
  MURBAN: {
    code: 'MURBAN',
    name: 'Murban',
    origin: 'UAE (Abu Dhabi onshore / Fujairah)',
    api: 40.5,
    sulfur: 0.70,
    desulfurizationCostPerBbl: 0.80,
    ospDifferential: +1.60,
    yieldBreakdown: { lpgNaphtha: 25.0, gasoline: 26.0, jetKero: 17.0, diesel: 24.0, residue: 8.0 }
  },
  OMAN: {
    code: 'OMAN',
    name: 'Oman Blend',
    origin: 'Sultanate of Oman (Mina al Fahal)',
    api: 31.3,
    sulfur: 1.40,
    desulfurizationCostPerBbl: 1.50,
    ospDifferential: 0.00,
    yieldBreakdown: { lpgNaphtha: 17.5, gasoline: 20.0, jetKero: 14.0, diesel: 29.0, residue: 19.5 }
  },
  BASRAH_MEDIUM: {
    code: 'BASRAH_MEDIUM',
    name: 'Basrah Medium',
    origin: 'Iraq (Rumaila / Basrah Oil Terminal)',
    api: 27.9,
    sulfur: 3.00,
    desulfurizationCostPerBbl: 3.10,
    ospDifferential: -0.40,
    yieldBreakdown: { lpgNaphtha: 13.5, gasoline: 17.0, jetKero: 11.5, diesel: 26.0, residue: 32.0 }
  },
  URALS: {
    code: 'URALS',
    name: 'Russian Urals',
    origin: 'Russia (Primorsk / Novorossiysk)',
    api: 31.0,
    sulfur: 1.48,
    desulfurizationCostPerBbl: 1.80,
    ospDifferential: -12.50, // Discount to Brent
    yieldBreakdown: { lpgNaphtha: 17.0, gasoline: 20.5, jetKero: 13.5, diesel: 29.5, residue: 19.5 }
  },
  WTI_MIDLAND: {
    code: 'WTI_MIDLAND',
    name: 'US WTI Midland',
    origin: 'United States (Permian / Corpus Christi)',
    api: 44.3,
    sulfur: 0.15,
    desulfurizationCostPerBbl: 0.25,
    ospDifferential: -3.70, // Discount to Brent in Atlantic
    yieldBreakdown: { lpgNaphtha: 29.5, gasoline: 28.0, jetKero: 17.5, diesel: 22.0, residue: 3.0 }
  }
};

export const ASIAN_BUYERS: Record<string, AsianBuyer> = {
  china: {
    key: 'china',
    name: 'China',
    flag: '🇨🇳',
    totalImportsMbd: 11.45,
    refiningCapacityMbd: 18.8,
    strategicFocus: 'Energy security, petrochemical integration, and buying discounted barrels when available.',
    buyerStructure: 'Three main groups: State oil companies (Sinopec, PetroChina), private mega-refineries (ZPC Rongsheng), and independent "teapot" refiners in Shandong.',
    crudeSourceSplit: [
      { source: 'Middle East', share: 44, volume: 5.04, color: '#D97706' },
      { source: 'Russia', share: 21, volume: 2.40, color: '#DC2626' },
      { source: 'United States', share: 12, volume: 1.37, color: '#0284C7' },
      { source: 'Latin America', share: 11, volume: 1.26, color: '#059669' },
      { source: 'West Africa', share: 8, volume: 0.92, color: '#7C3AED' },
      { source: 'Others', share: 4, volume: 0.46, color: '#6B7280' }
    ],
    primaryTerminals: [
      { name: 'Zhoushan / Ningbo (Zhejiang)', lat: 29.8683, lng: 121.544, type: 'VLCC Supertanker Port / ZPC Mega-Refinery' },
      { name: 'Qingdao / Dongjiakou (Shandong)', lat: 36.0671, lng: 120.3826, type: 'Independent Teapot Gateway' },
      { name: 'Huizhou / Daya Bay (Guangdong)', lat: 22.756, lng: 114.62, type: 'CNOOC Petrochemical Complex' },
      { name: 'Dalian / Changxing Island (Liaoning)', lat: 38.914, lng: 121.6147, type: 'Hengli Mega-Refining Hub' }
    ]
  },
  india: {
    key: 'india',
    name: 'India',
    flag: '🇮🇳',
    totalImportsMbd: 4.85,
    refiningCapacityMbd: 5.2,
    strategicFocus: 'Lowest delivered cost, high diesel export margins, and taking maximum advantage of discounted crudes.',
    buyerStructure: 'Led by Reliance Industries (Jamnagar complex, world\'s largest), Nayara Energy, and state refiners (IOCL, BPCL, HPCL).',
    crudeSourceSplit: [
      { source: 'Russia', share: 39, volume: 1.89, color: '#DC2626' },
      { source: 'Middle East', share: 44, volume: 2.13, color: '#D97706' },
      { source: 'West Africa', share: 7, volume: 0.34, color: '#7C3AED' },
      { source: 'United States', share: 6, volume: 0.29, color: '#0284C7' },
      { source: 'Others', share: 4, volume: 0.20, color: '#6B7280' }
    ],
    primaryTerminals: [
      { name: 'Sikka / Vadinar (Gujarat)', lat: 22.433, lng: 69.833, type: 'Reliance Jamnagar & Nayara Deepwater SPMs' },
      { name: 'Paradip (Odisha)', lat: 20.2644, lng: 86.6667, type: 'IOCL Deepwater Refinery Port' },
      { name: 'Cochin / Kochi (Kerala)', lat: 9.9312, lng: 76.2673, type: 'BPCL Southern Hub' }
    ]
  },
  japan: {
    key: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    totalImportsMbd: 2.45,
    refiningCapacityMbd: 3.3,
    strategicFocus: 'Guaranteed supply security, strict G7 sanctions compliance, and ultra-clean domestic fuels.',
    buyerStructure: 'Dominated by major commercial refiners: ENEOS Corporation (~50% share), Idemitsu Kosan, and Cosmo Oil.',
    crudeSourceSplit: [
      { source: 'Middle East', share: 95.2, volume: 2.33, color: '#D97706' },
      { source: 'United States', share: 2.8, volume: 0.07, color: '#0284C7' },
      { source: 'Others', share: 2.0, volume: 0.05, color: '#059669' },
      { source: 'Russia', share: 0.0, volume: 0.00, color: '#DC2626' }
    ],
    primaryTerminals: [
      { name: 'Chiba / Tokyo Bay', lat: 35.6074, lng: 140.1065, type: 'ENEOS / Idemitsu Petrochemical Cluster' },
      { name: 'Yokohama / Negishi', lat: 35.4167, lng: 139.65, type: 'ENEOS Flagship Coastal Refinery' },
      { name: 'Kiire Terminal (Kagoshima)', lat: 31.3667, lng: 130.55, type: 'National Strategic Crude Depot (CTS)' }
    ]
  },
  southKorea: {
    key: 'southKorea',
    name: 'South Korea',
    flag: '🇰🇷',
    totalImportsMbd: 2.95,
    refiningCapacityMbd: 3.4,
    strategicFocus: 'Refining margin maximization, exporting diesel and jet fuel globally, and agile crude slate optimization.',
    buyerStructure: 'Four world-scale refiners: SK Innovation (Ulsan), GS Caltex (Yeosu), S-Oil (Onsan), and HD Hyundai Oilbank.',
    crudeSourceSplit: [
      { source: 'Middle East', share: 67, volume: 1.98, color: '#D97706' },
      { source: 'United States', share: 18, volume: 0.53, color: '#0284C7' },
      { source: 'Latin America', share: 8, volume: 0.24, color: '#059669' },
      { source: 'West Africa', share: 7, volume: 0.20, color: '#7C3AED' },
      { source: 'Russia', share: 0.0, volume: 0.00, color: '#DC2626' }
    ],
    primaryTerminals: [
      { name: 'Ulsan / Onsan Port', lat: 35.5033, lng: 129.3783, type: 'SK Innovation & S-Oil Mega-Refining Hub' },
      { name: 'Yeosu / Gwangyang Bay', lat: 34.7604, lng: 127.6622, type: 'GS Caltex Deepwater Marine Terminal' },
      { name: 'Daesan Port', lat: 37.01, lng: 126.4167, type: 'HD Hyundai Oilbank Complex' }
    ]
  }
};

export const JOURNEY_OF_ONE_BARREL: JourneyStep[] = [
  {
    step: 1,
    title: 'The Desert Wellhead',
    subtitle: 'Where the Oil Begins',
    location: 'Ghawar Oil Field, Eastern Province, Saudi Arabia',
    description: 'Crude oil is pumped from deep limestone reservoirs 2,000 meters below the Arabian desert. Ghawar produces over 3.8 million barrels every day.',
    volumeOrFact: '1 Barrel = 42 Gallons (159 Liters)',
    icon: '🏜️'
  },
  {
    step: 2,
    title: 'The Gathering Pipeline',
    subtitle: 'Moving Crude to the Coast',
    location: 'Abqaiq Stabilization Plant & Petroline Pipeline Network',
    description: 'Raw crude flows through pressurized steel pipelines to Abqaiq, the world’s largest oil processing facility, where toxic hydrogen sulfide gas is removed.',
    volumeOrFact: 'Pipeline Speed: ~5 km/hour',
    icon: '🚰'
  },
  {
    step: 3,
    title: 'The Mega-Terminal',
    subtitle: 'Loading onto Giant Tankers',
    location: 'Ras Tanura Terminal, Persian Gulf',
    description: 'The crude arrives at Ras Tanura, the largest offshore oil loading port in the world. Enormous loading arms pump crude into supertankers at 50,000 barrels an hour.',
    volumeOrFact: 'Storage Capacity: 33 Million Barrels',
    icon: '⚓'
  },
  {
    step: 4,
    title: 'The Supertanker (VLCC)',
    subtitle: 'The Workhorse of the Ocean',
    location: 'Aboard a Very Large Crude Carrier (VLCC)',
    description: 'Our barrel joins 2 million other barrels aboard a 330-meter-long ship (the size of three football fields) drawing 20 meters of water.',
    volumeOrFact: 'Supertanker Cargo: 2,000,000 Barrels',
    icon: '🚢'
  },
  {
    step: 5,
    title: 'Pinch Point 1: Hormuz',
    subtitle: 'The 21-Mile Security Gateway',
    location: 'Strait of Hormuz, Persian Gulf Entrance',
    description: 'The tanker navigates the narrow Strait of Hormuz. One-fifth of the world’s petroleum liquids passes through this single waterway every single day.',
    volumeOrFact: 'Daily Traffic: 20.8 Million Barrels/Day',
    icon: '🛡️'
  },
  {
    step: 6,
    title: 'Pinch Point 2: Malacca',
    subtitle: 'The Gateway to East Asia',
    location: 'Strait of Malacca & Singapore Strait (Philips Channel)',
    description: 'After 14 days crossing the Indian Ocean, the ship threads the Philips Channel near Singapore—only 1.7 miles wide—before turning north into the South China Sea.',
    volumeOrFact: 'Bottleneck Width: 1.7 Nautical Miles',
    icon: '🧭'
  },
  {
    step: 7,
    title: 'The Coastal Mega-Refinery',
    subtitle: 'Cracking the Molecule',
    location: 'ZPC Mega-Refinery, Zhoushan Island, China',
    description: 'The crude is pumped into an 80-meter-tall distillation column heated to 370°C. Heavy sour molecules are cracked, boiled, and separated into fuel cuts.',
    volumeOrFact: 'Refinery Intake: 800,000 Barrels/Day',
    icon: '🏭'
  },
  {
    step: 8,
    title: 'The Clean Fuel Outputs',
    subtitle: 'What Our Barrel Became',
    location: 'Finished Product Storage & Petrochemical Plants',
    description: 'Our single 42-gallon barrel produces roughly 19 gallons of gasoline, 12 gallons of ultra-low sulfur diesel, 4 gallons of jet fuel, and petrochemicals.',
    volumeOrFact: 'Euro-VI Standards: <10 ppm Sulfur',
    icon: '⛽'
  },
  {
    step: 9,
    title: 'The End Consumer',
    subtitle: 'Powering Everyday Life in Asia',
    location: 'Asian Highways, Airports & Factory Floors',
    description: 'The gasoline powers cars in Shanghai; the jet fuel powers flights from Tokyo to Singapore; the diesel transports food across India; and the plastics make smartphones.',
    volumeOrFact: 'Fuels Over 4.5 Billion People',
    icon: '🚗'
  }
];

export const SEVEN_SELECTION_PILLARS = [
  {
    id: 1,
    title: '1. Quality & Chemistry',
    plainQuestion: 'How light and clean is the oil?',
    explanation: 'Light crude gives more gasoline and jet fuel. Sour crude has lots of sulfur that costs millions of dollars to clean out.',
    ruleOfThumb: 'A 0.5% drop in sulfur saves ~$0.75 per barrel in refinery cleaning costs.'
  },
  {
    id: 2,
    title: '2. The Monthly Price Tag (OSP)',
    plainQuestion: 'What discount or premium is the seller asking?',
    explanation: 'Saudi Aramco and other Gulf producers send a price sheet on the 5th of every month setting the price for Asian refiners.',
    ruleOfThumb: 'If Saudi raises prices too much, refiners immediately look for US or African alternatives.'
  },
  {
    id: 3,
    title: '3. Freight & Shipping Distance',
    plainQuestion: 'How much does it cost to sail the oil home?',
    explanation: 'Sailing from Saudi Arabia to India takes only 5 days. Sailing from Texas around Africa to South Korea takes 46 days.',
    ruleOfThumb: 'A short voyage protects Middle East oil with an automatic $2.50 to $3.50/bbl shipping advantage.'
  },
  {
    id: 4,
    title: '4. Refinery Equipment',
    plainQuestion: 'What kind of machinery does the refinery own?',
    explanation: 'Mega-refineries built multi-billion-dollar "cookers" (cokers) to digest cheap, dirty sour crude. Feeding them pure light crude wastes money.',
    ruleOfThumb: 'Complex refineries make the biggest profits by cracking cheap, high-sulfur barrels.'
  },
  {
    id: 5,
    title: '5. Sanctions & Legal Rules',
    plainQuestion: 'Is the oil legal to buy?',
    explanation: 'Japan and South Korea follow Western G7 rules and buy zero Russian crude. India and China buy Russian oil at steep discounts.',
    ruleOfThumb: 'Sanctions created two separate oil markets: the full-price Western market and the discounted Eastern market.'
  },
  {
    id: 6,
    title: '6. Guaranteed Supply Contracts',
    plainQuestion: 'Can the refinery count on the oil arriving every month?',
    explanation: 'National oil companies sign 10-year term contracts guaranteeing oil every week. Spot oil bought on the open market can suddenly run dry.',
    ruleOfThumb: 'Refineries buy 70% of their crude on long-term contracts for safety and 30% on the open market for profit.'
  },
  {
    id: 7,
    title: '7. Market Pricing Signals (EFS)',
    plainQuestion: 'Are Atlantic barrels cheaper right now than Middle East barrels?',
    explanation: 'The Brent-Dubai EFS spread tells traders whether US or African crude can beat Middle Eastern prices this month.',
    ruleOfThumb: 'When EFS is under $1.00, US WTI Midland floods into South Korea and China.'
  }
];

export const PLAIN_ENGLISH_CHAPTERS = [
  {
    id: 1,
    route: '/chapter/1',
    title: 'The Dubai & Oman Ecosystem',
    subtitle: 'Fields, Export Terminals, Animated Flows & The 9 Middle Eastern Grades',
    summary: 'Discover where Dubai and Oman crude are produced, which fields and ports supply them, how barrels move from wellhead to Asia, and compare all 9 flagship Middle Eastern grades.'
  },
  {
    id: 2,
    route: '/chapter/2',
    title: 'Asian Crude Demand & Refineries',
    subtitle: 'China, India, Japan & South Korea: Mega-Refineries, Sources & Import Flows',
    summary: 'Explore the 4 giant Asian buyers importing 22.4 million barrels every day, their coastal mega-refineries plotted on maps, and which crudes each country consumes.'
  },
  {
    id: 3,
    route: '/chapter/3',
    title: 'Official Selling Prices (OSP) & Shipping',
    subtitle: 'How Monthly OSP Works + VLCC, Suezmax & Aframax Tanker Guide',
    summary: 'Understand Official Selling Prices (OSP) in simple English with an interactive price visualizer, and compare VLCC, Suezmax, and Aframax vessels.'
  },
  {
    id: 4,
    route: '/chapter/4',
    title: 'Why Refineries Choose Different Crudes',
    subtitle: 'Interactive Refinery Simulator: API, Sulfur, Freight, Buyer & Product Yield',
    summary: 'Test API gravity, sulfur %, freight cost, crude grade, and destination country to match the ideal Asian refinery, likely buyer, and refined product yield.'
  },
  {
    id: 5,
    route: '/chapter/5',
    title: 'When Atlantic Crude Becomes Competitive',
    subtitle: 'WTI Midland, Brent, West Africa & North Sea vs Russian Urals, ESPO & Sokol',
    summary: 'See when long-haul oil from Texas, the North Sea, and West Africa beats Middle East oil into Asia, and trace Russian Urals, ESPO, and Sokol flows.'
  },
  {
    id: 6,
    route: '/chapter/6',
    title: 'How Dubai/Oman Pricing Works',
    subtitle: 'Inside the 30-Minute 16:30 Singapore Trading Window',
    summary: 'How 25,000-barrel partial trades in the Singapore window converge into real 500,000-barrel physical cargoes.'
  },
  {
    id: 7,
    route: '/chapter/7',
    title: 'Ocean Chokepoints: Hormuz & Malacca',
    subtitle: 'Why Two Narrow Waterways Control 20 Million Barrels a Day',
    summary: 'Explore the 21-mile Strait of Hormuz and the 1.7-mile Strait of Malacca, plus the desert bypass pipelines built to avoid them.'
  },
  {
    id: 8,
    route: '/chapter/8',
    title: '7-Crude Delivered Cost Calculator',
    subtitle: 'Compare Landed Costs & Margins Across All 4 Asian Buyers',
    summary: 'Compare FOB prices, ocean freight, sulfur cleaning costs, and netback margins for 7 major crudes side-by-side.'
  },
  {
    id: 9,
    route: '/chapter/9',
    title: 'The Journey of One Barrel',
    subtitle: 'Final Chapter: 9 Illustrated Stages from Desert Wellhead to Your Fuel Tank',
    summary: 'Follow one 42-gallon barrel of crude step-by-step from 2,000 meters underground in Saudi Arabia all the way to an Asian highway.'
  }
];

export const NINE_MIDDLE_EAST_GRADES = [
  { name: 'Oman Blend', country: 'Oman', flag: '🇴🇲', location: 'Block 6 (Fahud, Yibal, Mukhaizna)', terminal: 'Mina al Fahal (Muscat — Outside Hormuz)', api: 31.3, sulfur: 1.40, weight: 'Medium', sweetSour: 'Sour', buyers: 'China (80%+ of exports), Japan, India' },
  { name: 'Murban', country: 'UAE (ADNOC)', flag: '🇦🇪', location: 'Onshore Abu Dhabi (Bab, Bu Hasa, Asab)', terminal: 'Fujairah Terminal (Outside Hormuz)', api: 40.5, sulfur: 0.70, weight: 'Light', sweetSour: 'Low-Sulfur Sour', buyers: 'Japan, South Korea, Thailand, India' },
  { name: 'Arab Light', country: 'Saudi Arabia', flag: '🇸🇦', location: 'Ghawar Field, Abqaiq & Khurais', terminal: 'Ras Tanura & Yanbu', api: 32.8, sulfur: 1.97, weight: 'Light / Medium', sweetSour: 'Sour', buyers: 'China, Japan, South Korea, India' },
  { name: 'Arab Medium', country: 'Saudi Arabia', flag: '🇸🇦', location: 'Zuluf, Marjan, Qatif & Khursaniyah', terminal: 'Ras Tanura & Ju’aymah', api: 30.2, sulfur: 2.55, weight: 'Medium', sweetSour: 'Sour', buyers: 'China, South Korea, India, Taiwan' },
  { name: 'Arab Heavy', country: 'Saudi Arabia', flag: '🇸🇦', location: 'Safaniya Offshore Field & Manifa', terminal: 'Ras Tanura Terminal', api: 27.4, sulfur: 2.85, weight: 'Heavy', sweetSour: 'Sour', buyers: 'India (Jamnagar), China (ZPC), South Korea' },
  { name: 'Basrah Medium', country: 'Iraq (SOMO)', flag: '🇮🇶', location: 'Rumaila, West Qurna-1 & Zubair', terminal: 'Al Basrah Oil Terminal (ABOT)', api: 27.9, sulfur: 3.00, weight: 'Medium / Heavy', sweetSour: 'Sour', buyers: 'India, China, South Korea' },
  { name: 'Basrah Heavy', country: 'Iraq (SOMO)', flag: '🇮🇶', location: 'West Qurna-2, Majnoon & Halfaya', terminal: 'Al Basrah Offshore SPMs', api: 23.5, sulfur: 4.10, weight: 'Heavy', sweetSour: 'High-Sulfur Sour', buyers: 'India (Reliance, Nayara), China (ZPC, Hengli)' },
  { name: 'Upper Zakum', country: 'UAE (ADNOC)', flag: '🇦🇪', location: 'Upper Zakum Offshore Field', terminal: 'Zirku Island Terminal', api: 34.0, sulfur: 1.80, weight: 'Medium', sweetSour: 'Sour', buyers: 'Japan, China, South Korea, India' },
  { name: 'Das Blend', country: 'UAE (ADNOC)', flag: '🇦🇪', location: 'Umm Shaif & Lower Zakum Offshore', terminal: 'Das Island Terminal', api: 39.0, sulfur: 1.15, weight: 'Light', sweetSour: 'Light Sour', buyers: 'Japan, South Korea, Singapore, Thailand' }
];


export const CITATIONS: CitationItem[] = [
  {
    id: 'cme_dme_oman',
    source: 'CME Group / Dubai Mercantile Exchange',
    document: 'DME Oman Crude Oil Futures (OQD) Contract Specifications & Physical Settlement Rules',
    url: 'https://www.cmegroup.com/markets/energy/crude-oil/dme-oman-crude-oil-futures.html',
    category: 'Exchange Benchmarks',
    verificationNote: 'Official contract specifications for 1,000-barrel physical delivery contract at Mina al Fahal.'
  },
  {
    id: 'sp_platts_dubai',
    source: 'S&P Global Commodity Insights',
    document: 'Platts Dubai Crude Assessment Methodology & Market-on-Close (MOC) Partial Delivery Guidelines',
    url: 'https://www.spglobal.com/commodityinsights/en/our-methodology/methodology-specifications/oil/crude-oil-methodology',
    category: 'Price Reporting Agency (PRA)',
    verificationNote: 'Governs the 25k partials mechanism, physical convergence, and Upper Zakum/Al Shaheen/Murban basket.'
  },
  {
    id: 'ice_brent_efs',
    source: 'Intercontinental Exchange (ICE)',
    document: 'Brent/Dubai Cash-Futures & Exchange of Futures for Swaps (EFS) Contract Reference',
    url: 'https://www.theice.com/products/219/Brent-Crude-Futures',
    category: 'Derivative Exchanges',
    verificationNote: 'Underlying derivative contract governing Atlantic-to-Pacific crude arbitrage pricing.'
  },
  {
    id: 'opec_momr',
    source: 'OPEC Secretariat',
    document: 'OPEC Monthly Oil Market Report (MOMR) - World Oil Supply & Demand Matrix',
    url: 'https://www.opec.org/opec_web/en/publications/338.htm',
    category: 'Sovereign Oil Organization',
    verificationNote: 'Official production quotas, member country output, and secondary source production tables.'
  },
  {
    id: 'iea_omr',
    source: 'International Energy Agency (IEA)',
    document: 'IEA Oil Market Report - Asian Refinery Intake & Global Chokepoint Risk Studies',
    url: 'https://www.iea.org/reports/oil-market-report',
    category: 'Multilateral Energy Body',
    verificationNote: 'Data on Asian refinery runs, product stocks, and Middle Eastern import dependencies.'
  },
  {
    id: 'eia_petroleum_monthly',
    source: 'U.S. Energy Information Administration (EIA)',
    document: 'U.S. Crude Oil Exports by Destination & World Oil Transit Chokepoints Analysis',
    url: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints',
    category: 'Government Statistical Agency',
    verificationNote: 'Comprehensive throughput volumes for Strait of Hormuz, Malacca, Bab el-Mandeb, and Cape of Good Hope.'
  },
  {
    id: 'saudi_aramco_osp',
    source: 'Saudi Arabian Oil Company (Saudi Aramco)',
    document: 'Saudi Aramco Monthly Official Selling Price (OSP) Notices to Asian Customers',
    url: 'https://www.aramco.com',
    category: 'National Oil Company',
    verificationNote: 'Primary source for Arab Light, Medium, Heavy, and Extra Light monthly differentials to Dubai/Oman.'
  },
  {
    id: 'adnoc_murban',
    source: 'Abu Dhabi National Oil Company (ADNOC)',
    document: 'ADNOC Trading & ICE Futures Abu Dhabi (IFAD) Murban Delivery Rules',
    url: 'https://www.adnoc.ae',
    category: 'National Oil Company',
    verificationNote: 'Specifications for Murban deliverability and Quality Differential Price (QDP) against Platts Dubai.'
  },
  {
    id: 'india_ppac',
    source: 'Petroleum Planning & Analysis Cell (PPAC), Ministry of Petroleum, India',
    document: 'Monthly Import Analysis & Country-wise Crude Import Data into India',
    url: 'https://www.ppac.gov.in',
    category: 'Government Agency',
    verificationNote: 'Official tracking of India\'s shift toward Russian Urals and Middle East import balances.'
  },
  {
    id: 'china_customs',
    source: 'General Administration of Customs of the People\'s Republic of China (GACC)',
    document: 'China Commodity Trade Statistics: HS Code 270900 (Crude Petroleum)',
    url: 'http://english.customs.gov.cn',
    category: 'Government Customs Agency',
    verificationNote: 'Monthly import volumes by country of origin into Chinese maritime terminals.'
  },
  {
    id: 'baltic_exchange_tanker',
    source: 'The Baltic Exchange',
    document: 'Baltic Dirty Tanker Index (BDTI) & TD3C / TD22 Route Benchmark Assessments',
    url: 'https://www.balticexchange.com',
    category: 'Maritime Logistics',
    verificationNote: 'Worldscale flat rates, TCE daily earnings, and VLCC route benchmarks.'
  },
  {
    id: 'imo_maritime_safety',
    source: 'International Maritime Organization (IMO)',
    document: 'Traffic Separation Schemes (TSS) in Straits Used for International Navigation',
    url: 'https://www.imo.org',
    category: 'International Maritime Body',
    verificationNote: 'Official nautical coordinates and lane widths for Hormuz, Singapore, and Malacca Straits.'
  }
];
