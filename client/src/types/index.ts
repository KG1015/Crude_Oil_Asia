export interface CrudeAssay {
  code: string;
  name: string;
  origin: string;
  api: number;
  sulfur: number;
  desulfurizationCostPerBbl: number;
  ospDifferential: number;
  yieldBreakdown: {
    lpgNaphtha: number;
    gasoline: number;
    jetKero: number;
    diesel: number;
    residue: number;
  };
}

export interface AsianBuyer {
  key: 'china' | 'india' | 'japan' | 'southKorea';
  name: string;
  flag: string;
  totalImportsMbd: number;
  refiningCapacityMbd: number;
  strategicFocus: string;
  buyerStructure: string;
  crudeSourceSplit: Array<{
    source: string;
    share: number;
    volume: number;
    color: string;
  }>;
  primaryTerminals: Array<{
    name: string;
    lat: number;
    lng: number;
    type: string;
  }>;
}

export interface TankerRoute {
  id: string;
  name: string;
  originName: string;
  originCoord: [number, number];
  destName: string;
  destCoord: [number, number];
  vesselClass: string;
  distanceNm: number;
  transitDays: number;
  speedKnots: number;
  chokepoints: string[];
  freightCostPerBbl: number;
  waypoints: Array<[number, number]>;
}

export interface Chokepoint {
  name: string;
  location: [number, number];
  dailyVolumeMbd: number;
  percentGlobalLiquids: number;
  widthNm: number;
  navigableLanes: string;
  keyRisk: string;
  netUnbypassableVolumeMbd: number;
}

export interface JourneyStep {
  step: number;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  volumeOrFact: string;
  icon: string;
}

export interface CrudeChoiceResult {
  crudeCode: string;
  crudeName: string;
  origin: string;
  api: number;
  sulfur: number;
  fobPrice: number;
  freightCost: number;
  ospImpact: number;
  qualityAdjustment: number;
  yieldAdvantage: number;
  deliveredCost: number;
  netRefineryValue: number;
  isRecommended: boolean;
  recommendationReason: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  durationMin: number;
  keyPoints: string[];
  speakerNotes: string;
}

export interface CitationItem {
  id: string;
  source: string;
  document: string;
  url: string;
  category: string;
  verificationNote: string;
}
