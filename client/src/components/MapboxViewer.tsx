import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ASIAN_BUYERS } from '../data/crudeData';

export interface MapViewConfig {
  id: string;
  title: string;
  category: 'sourcing' | 'routes' | 'chokepoints' | 'refineries';
  center: [number, number];
  zoom: number;
  description: string;
}

export const MAP_CATALOG: MapViewConfig[] = [
  // 1. Sourcing Maps
  { id: 'china_sourcing', title: 'China Sourcing Map', category: 'sourcing', center: [32.0, 115.0], zoom: 4, description: '44% Middle East, 21% Russia (ESPO+Urals), 12% US, 11% LatAm, 8% West Africa' },
  { id: 'india_sourcing', title: 'India Sourcing Map', category: 'sourcing', center: [21.0, 78.0], zoom: 4, description: '39% Russia (Urals discount feast), 44% Middle East, 7% West Africa, 6% US' },
  { id: 'japan_sourcing', title: 'Japan Sourcing Map', category: 'sourcing', center: [36.0, 138.0], zoom: 5, description: '95.2% Middle East sovereign security, 2.8% US WTI, 0% Russian seaborne' },
  { id: 'korea_sourcing', title: 'South Korea Sourcing Map', category: 'sourcing', center: [36.0, 128.0], zoom: 5, description: '67% Middle East, 18% US WTI Midland (KORUS 0% tariff benefit), 8% LatAm' },
  { id: 'dubai_oman_eco', title: 'Dubai / Oman Benchmark Ecosystem', category: 'sourcing', center: [24.5, 56.5], zoom: 6, description: 'Fateh, Mina al Fahal, Das Island, Zirku, Halul, Fujairah delivery basket' },

  // 2. Tanker Routes
  { id: 'saudi_china', title: 'Saudi Arabia → China (5,910 nm)', category: 'routes', center: [18.0, 85.0], zoom: 3, description: 'Ras Tanura to Ningbo-Zhoushan aboard VLCC: 19.5 days via Hormuz and Malacca' },
  { id: 'saudi_india', title: 'Saudi Arabia → India (1,650 nm)', category: 'routes', center: [24.0, 62.0], zoom: 5, description: 'Ras Tanura to Sikka / Jamnagar: 5.4 days ultra-short coastal transit' },
  { id: 'russia_china', title: 'Russia (Kozmino) → China (850 nm)', category: 'routes', center: [39.0, 128.0], zoom: 6, description: '2.8-day Pacific shuttle tanker connecting ESPO pipeline to Shandong teapots' },
  { id: 'russia_india', title: 'Russia (Primorsk) → India (8,400 nm)', category: 'routes', center: [30.0, 40.0], zoom: 3, description: '27.5-day redirection route from Baltic Sea through Gibraltar and Suez into Gujarat' },
  { id: 'us_korea', title: 'US (Corpus Christi) → Korea (15,300 nm)', category: 'routes', center: [-5.0, 60.0], zoom: 2, description: '46.5 days around Cape of Good Hope into Ulsan aboard reverse-lightered VLCC' },
  { id: 'uae_japan', title: 'UAE (Fujairah) → Japan (6,550 nm)', category: 'routes', center: [20.0, 95.0], zoom: 3, description: '21.0 days from Gulf of Oman bypassing the Strait of Hormuz to Tokyo Bay' },

  // 3. Chokepoints
  { id: 'hormuz_tactical', title: 'Strait of Hormuz Tactical Map', category: 'chokepoints', center: [26.56, 56.45], zoom: 8, description: '21 nautical miles wide; two 2-mile traffic separation lanes carrying 20.8 Mb/d' },
  { id: 'hormuz_bypasses', title: 'Hormuz Pipeline Bypasses', category: 'chokepoints', center: [24.0, 48.0], zoom: 6, description: 'Saudi East-West Petroline (5.0 Mb/d) and UAE Habshan-Fujairah pipeline (1.8 Mb/d)' },
  { id: 'malacca_bottleneck', title: 'Strait of Malacca & Singapore', category: 'chokepoints', center: [1.25, 103.85], zoom: 8, description: 'Philips Channel is only 1.7 nm wide; draft limited to 25m Malaccamax supertankers' },
  { id: 'red_sea_reroute', title: 'Red Sea Attacks vs Cape Reroute', category: 'chokepoints', center: [5.0, 45.0], zoom: 3, description: 'Bab el-Mandeb conflict zone vs 12-day, +$1.2M bunker penalty around Africa' }
];

const BASEMAPS: Record<string, { label: string; url: string; refUrl?: string }> = {
  kpler_dark: {
    label: '🌑 Kpler Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  },
  bathymetry: {
    label: '🌊 Bathymetry',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
    refUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}'
  },
  ft_editorial: {
    label: '📰 FT Vector',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
  },
  satellite: {
    label: '🛰️ Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }
};

export const MapboxViewer: React.FC<{ initialMapId?: string }> = ({ initialMapId = 'china_sourcing' }) => {
  const [selectedMapId, setSelectedMapId] = useState(initialMapId);
  const [activeCategory, setActiveCategory] = useState<'all' | 'sourcing' | 'routes' | 'chokepoints'>('all');
  const [basemapKey, setBasemapKey] = useState<'satellite' | 'bathymetry' | 'kpler_dark' | 'ft_editorial'>('satellite');
  const [showTerminals, setShowTerminals] = useState(true);
  const [showChokepoints, setShowChokepoints] = useState(true);
  const [showSeamarks, setShowSeamarks] = useState(true);
  const [showAisFleet, setShowAisFleet] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const baseTileRef = useRef<L.TileLayer | null>(null);
  const seamarkTileRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);

  const currentConfig = MAP_CATALOG.find(m => m.id === selectedMapId) || MAP_CATALOG[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentConfig.center,
        zoom: currentConfig.zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);
      markerGroupRef.current = L.layerGroup().addTo(map);
      leafletMapRef.current = map;
    } else {
      leafletMapRef.current.flyTo(currentConfig.center, currentConfig.zoom, { duration: 1.4 });
    }

    // Apply basemap + OpenSeaMap seamark layer
    if (leafletMapRef.current) {
      if (baseTileRef.current) leafletMapRef.current.removeLayer(baseTileRef.current);
      if (seamarkTileRef.current) leafletMapRef.current.removeLayer(seamarkTileRef.current);

      const bm = BASEMAPS[basemapKey] || BASEMAPS.kpler_dark;
      baseTileRef.current = L.tileLayer(bm.url, { maxZoom: 19 }).addTo(leafletMapRef.current);

      if (showSeamarks) {
        seamarkTileRef.current = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
          maxZoom: 18,
          opacity: 0.85
        }).addTo(leafletMapRef.current);
      }
    }

    renderMapLayers();
  }, [selectedMapId, basemapKey, showTerminals, showChokepoints, showSeamarks, showAisFleet]);

  const renderMapLayers = () => {
    if (!leafletMapRef.current || !markerGroupRef.current) return;
    markerGroupRef.current.clearLayers();

    if (showChokepoints) {
      const chokepoints = [
        { name: 'Strait of Hormuz', coords: [26.56, 56.45] as [number, number], vol: '20.8 Mb/d', risk: '21nm wide; 14.3 Mb/d un-bypassable' },
        { name: 'Strait of Malacca', coords: [1.25, 103.85] as [number, number], vol: '16.0 Mb/d', risk: '1.7nm Phillips Channel; 0% pipeline bypass' },
        { name: 'Bab el-Mandeb', coords: [12.58, 43.33] as [number, number], vol: '8.2 Mb/d', risk: 'Red Sea conflict zone forcing Cape diversions' },
        { name: 'Suez Canal & SUMED', coords: [30.58, 32.34] as [number, number], vol: '7.5 Mb/d', risk: 'Single-lane convoy bottleneck for Russian Urals' }
      ];

      chokepoints.forEach(cp => {
        L.circleMarker(cp.coords, {
          radius: 8,
          fillColor: '#ef4444',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 0.9
        })
          .addTo(markerGroupRef.current!)
          .bindPopup(`<strong>📡 ${cp.name}</strong><br/>Flow: ${cp.vol}<br/>${cp.risk}`);
      });
    }

    if (showTerminals) {
      Object.values(ASIAN_BUYERS).forEach(b => {
        b.primaryTerminals.forEach(t => {
          L.circleMarker([t.lat, t.lng], {
            radius: 6,
            fillColor: '#38bdf8',
            color: '#ffffff',
            weight: 1.5,
            fillOpacity: 0.95
          })
            .addTo(markerGroupRef.current!)
            .bindPopup(`<strong>⚓ ${t.name}</strong><br/>${b.name} (${t.type})`);
        });
      });
    }

    // Deep-Water Shipping Corridors + AIS Tanker Positions
    const routeWaypoints: Record<string, { pts: [number, number][]; color: string; vessel: string }> = {
      saudi_china: {
        pts: [[26.64, 50.16], [26.56, 56.45], [14.2, 69.8], [5.8, 80.6], [1.25, 103.85], [16.5, 115.5], [29.9, 121.8]],
        color: '#f59e0b',
        vessel: 'MT COSWILL LAKE (VLCC • 2.04M bbls Arab Light • 13.4 kn)'
      },
      saudi_india: {
        pts: [[26.64, 50.16], [26.56, 56.45], [23.63, 58.52], [22.4, 69.8]],
        color: '#fbbf24',
        vessel: 'MT OMAN PRIDE (VLCC • 1.98M bbls Oman Blend • 13.8 kn)'
      },
      russia_china: {
        pts: [[42.73, 133.00], [38.5, 130.5], [34.5, 127.0], [36.06, 120.38]],
        color: '#ef4444',
        vessel: 'MT KRYMSK SHUTTLE (Aframax • 730k bbls ESPO • 14.5 kn)'
      },
      russia_india: {
        pts: [[60.35, 28.62], [55.0, 5.0], [36.0, -5.5], [31.26, 32.31], [12.62, 43.33], [22.4, 69.8]],
        color: '#ef4444',
        vessel: 'MT NS CENTURY (Suezmax • 1.02M bbls Russian Urals • 12.6 kn)'
      },
      us_korea: {
        pts: [[27.80, -97.39], [12.0, -57.5], [-34.8, 18.8], [-9.0, 76.0], [1.25, 103.85], [35.50, 129.38]],
        color: '#38bdf8',
        vessel: 'MT EAGLE VERACRUZ (VLCC • 2.02M bbls WTI Midland • 13.9 kn)'
      },
      uae_japan: {
        pts: [[25.12, 56.36], [14.2, 69.8], [5.8, 80.6], [1.25, 103.85], [22.0, 121.5], [35.4, 139.7]],
        color: '#10b981',
        vessel: 'MT AL DANAH (VLCC • 2.05M bbls Murban Crude • 14.1 kn)'
      }
    };

    Object.entries(routeWaypoints).forEach(([key, r]) => {
      const isSelected = key === selectedMapId;
      // Outer Halo Glow
      L.polyline(r.pts, {
        color: r.color,
        weight: isSelected ? 10 : 5,
        opacity: isSelected ? 0.28 : 0.14
      }).addTo(markerGroupRef.current!);

      // Core Deep-Water Lane
      L.polyline(r.pts, {
        color: r.color,
        weight: isSelected ? 3.8 : 2.2,
        opacity: isSelected ? 1.0 : 0.65,
        dashArray: isSelected ? undefined : '4, 6'
      }).addTo(markerGroupRef.current!);

      if (showAisFleet) {
        const mid = r.pts[Math.floor(r.pts.length / 2)];
        L.circleMarker(mid, {
          radius: isSelected ? 8 : 5,
          fillColor: r.color,
          color: '#0f172a',
          weight: 2,
          fillOpacity: 1
        })
          .addTo(markerGroupRef.current!)
          .bindPopup(`<strong>🚢 LIVE AIS: ${r.vessel}</strong>`);
      }
    });
  };

  const filteredMaps = activeCategory === 'all' ? MAP_CATALOG : MAP_CATALOG.filter(m => m.category === activeCategory);

  return (
    <div className="bg-white border border-[#0f172a] rounded-xl shadow-lg overflow-hidden my-8">
      {/* Kpler / Vortexa Maritime Intelligence Header */}
      <div className="bg-[#0f172a] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] block">
            KPLER / VORTEXA MARITIME INTELLIGENCE ENGINE • AIS + OPENSEAMAP + BATHYMETRY
          </span>
          <h3 className="font-serif text-xl font-bold text-white">
            {currentConfig.title}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">{currentConfig.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(BASEMAPS) as Array<'kpler_dark' | 'bathymetry' | 'ft_editorial' | 'satellite'>).map((k) => (
            <button
              key={k}
              onClick={() => setBasemapKey(k)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition ${
                basemapKey === k ? 'bg-[#0284c7] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {BASEMAPS[k].label}
            </button>
          ))}
          <button
            onClick={() => setShowAisFleet(!showAisFleet)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
              showAisFleet ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            🚢 AIS Fleet
          </button>
          <button
            onClick={() => setShowSeamarks(!showSeamarks)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
              showSeamarks ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            ⚓ OpenSeaMap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-r border-slate-200 bg-[#FAF6F0] p-4 max-h-[480px] overflow-y-auto space-y-1.5">
          {filteredMaps.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMapId(m.id)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                selectedMapId === m.id
                  ? 'bg-white border-[#990000] shadow-sm'
                  : 'bg-transparent border-transparent hover:bg-white/70'
              }`}
            >
              <div className="font-serif font-bold text-sm text-[#0f172a]">{m.title}</div>
              <p className="text-xs text-[#1e293b] line-clamp-2 mt-0.5">{m.description}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 relative min-h-[480px] bg-[#06101e]">
          <div ref={mapContainerRef} className="w-full h-[480px]" />
        </div>
      </div>
    </div>
  );
};
