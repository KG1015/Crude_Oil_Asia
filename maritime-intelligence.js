/* ==========================================================================
   KPLER / VORTEXA / BLOOMBERG MARITIME INTELLIGENCE ENGINE
   - Default High-Resolution Satellite Basemap (Esri World Imagery + Labels)
   - True 3D Spherical Satellite Earth Globe on Landing Page (Three.js WebGL)
   - Live Moving 🚢 Ship Emoji AIS Tankers & Deep-Water Maritime Sea Lanes
   ========================================================================== */

(function () {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. TRUE DEEP-WATER MARITIME SHIPPING CORRIDORS (NEVER CROSSES LAND)
  // --------------------------------------------------------------------------
  const DEEP_WATER_CORRIDORS = {
    me_to_china: {
      id: "me_to_china",
      name: "AG–Far East VLCC Highway (TD3C: Ras Tanura & Fujairah → Ningbo/Zhoushan)",
      color: "#f59e0b",
      volume: "5.2 Mb/d",
      vesselClass: "VLCC (2.05M bbls)",
      waypoints: [
        [26.64, 50.16], [26.20, 52.30], [26.05, 55.10], [26.56, 56.45],
        [25.12, 56.85], [23.63, 58.95], [20.50, 63.50], [14.20, 69.80],
        [7.50, 76.80], [5.50, 80.60], [5.80, 88.50], [5.90, 95.30],
        [3.10, 100.40], [1.22, 103.60], [1.28, 104.35], [4.50, 107.20],
        [10.50, 111.80], [16.50, 115.50], [22.00, 118.50], [25.80, 120.60],
        [30.05, 122.10]
      ]
    },
    me_to_india: {
      id: "me_to_india",
      name: "Arabian Sea Short-Haul Shuttle (Mina al Fahal & Basrah → Jamnagar/Vadinar)",
      color: "#fbbf24",
      volume: "2.4 Mb/d",
      vesselClass: "VLCC / Suezmax",
      waypoints: [
        [29.68, 48.81], [27.50, 50.40], [26.20, 53.20], [26.56, 56.45],
        [25.12, 56.85], [23.63, 58.52], [23.10, 62.80], [22.65, 66.90],
        [22.36, 69.85]
      ]
    },
    me_to_korea_japan: {
      id: "me_to_korea_japan",
      name: "Northeast Asia Sovereign Lifeline (AG & Murban → Ulsan Korea & Tokyo Bay Japan)",
      color: "#f97316",
      volume: "4.6 Mb/d",
      vesselClass: "VLCC (318k DWT)",
      waypoints: [
        [25.12, 56.36], [23.63, 58.95], [14.20, 69.80], [5.50, 80.60],
        [5.90, 95.30], [1.25, 103.85], [6.50, 108.50], [14.50, 115.00],
        [21.80, 121.20], [28.50, 125.50], [33.50, 128.20], [35.50, 129.38],
        [33.20, 134.50], [34.50, 138.80], [35.53, 140.08]
      ]
    },
    urals_suez_india: {
      id: "urals_suez_india",
      name: "Russian Urals Suez Pivot (Baltic Primorsk & Black Sea → Suez Canal → Jamnagar India)",
      color: "#ef4444",
      volume: "1.85 Mb/d",
      vesselClass: "Suezmax / Aframax (1.0M bbls)",
      waypoints: [
        [60.35, 28.62], [58.50, 20.50], [55.40, 14.50], [57.60, 9.50],
        [53.50, 3.20], [50.10, -2.50], [43.50, -9.80], [36.00, -5.60],
        [37.20, 4.50], [36.50, 15.20], [33.50, 26.50], [31.26, 32.31],
        [29.95, 32.55], [27.20, 34.30], [20.50, 38.80], [12.62, 43.33],
        [12.20, 46.80], [14.50, 54.50], [18.50, 63.50], [22.36, 69.85]
      ]
    },
    espo_pacific_china: {
      id: "espo_pacific_china",
      name: "Russian ESPO & Sokol Express Shuttle (Kozmino Pacific Port → Qingdao Shandong)",
      color: "#f43f5e",
      volume: "1.45 Mb/d",
      vesselClass: "Aframax (750k bbls • 3.2 Days)",
      waypoints: [
        [42.73, 133.00], [39.50, 131.20], [35.20, 129.80], [33.60, 127.20],
        [34.20, 124.20], [35.50, 121.80], [36.06, 120.38]
      ]
    },
    wti_cape_asia: {
      id: "wti_cape_asia",
      name: "US Gulf WTI Midland Long-Haul Arbitrage (Corpus Christi TX → Cape of Good Hope → Ulsan/Ningbo)",
      color: "#38bdf8",
      volume: "1.65 Mb/d",
      vesselClass: "VLCC (2.0M bbls • 15,200 nm)",
      waypoints: [
        [27.80, -97.39], [24.50, -85.50], [20.20, -73.50], [12.50, -58.00],
        [2.00, -38.00], [-14.00, -24.00], [-28.00, -5.00], [-35.20, 18.80],
        [-34.80, 26.50], [-26.00, 48.00], [-12.00, 72.00], [-2.00, 92.00],
        [1.25, 103.85], [12.00, 113.50], [24.00, 120.50], [35.50, 129.38]
      ]
    },
    waf_cape_asia: {
      id: "waf_cape_asia",
      name: "West Africa Sweet Corridor (Nigeria Bonny & Angola → Cape of Good Hope → China/India)",
      color: "#a855f7",
      volume: "1.40 Mb/d",
      vesselClass: "VLCC (2.0M bbls)",
      waypoints: [
        [4.42, 7.15], [-5.55, 12.19], [-18.50, 10.50], [-34.80, 18.50],
        [-34.50, 27.00], [-22.00, 55.00], [-6.00, 82.00], [1.25, 103.85],
        [15.00, 114.50], [30.05, 122.10]
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. LIVE AIS TANKER FLEET TELEMETRY REGISTRY
  // --------------------------------------------------------------------------
  const AIS_LIVE_FLEET = [
    {
      mmsi: "412883910",
      imo: "IMO 9834125",
      name: "MT COSWILL LAKE",
      flag: "🇨🇳",
      vesselClass: "VLCC (319,000 DWT)",
      cargo: "2,040,000 bbls • Arab Light (32.8° API, 1.97% S)",
      corridorId: "me_to_china",
      progress: 0.14,
      speedKnots: 13.4,
      draught: "21.1m (Laden)",
      origin: "Ras Tanura Terminal, Saudi Arabia",
      destination: "Ningbo-Zhoushan (ZPC), China",
      eta: "ETA: 11d 06h",
      charterer: "Unipec (Sinopec)"
    },
    {
      mmsi: "403591022",
      imo: "IMO 9792345",
      name: "MT BAHRI YANBU",
      flag: "🇸🇦",
      vesselClass: "VLCC (300,000 DWT)",
      cargo: "2,000,000 bbls • Arab Heavy (27.4° API, 2.85% S)",
      corridorId: "me_to_china",
      progress: 0.58,
      speedKnots: 12.9,
      draught: "20.8m (Laden)",
      origin: "Ras Tanura SPM-4, Saudi Arabia",
      destination: "Rongsheng Zhoushan, China",
      eta: "ETA: 4d 18h",
      charterer: "Saudi Aramco Trading"
    },
    {
      mmsi: "470892104",
      imo: "IMO 9887102",
      name: "MT AL DANAH",
      flag: "🇦🇪",
      vesselClass: "VLCC (318,500 DWT)",
      cargo: "2,050,000 bbls • Murban Crude (40.2° API, 0.78% S)",
      corridorId: "me_to_korea_japan",
      progress: 0.34,
      speedKnots: 14.1,
      draught: "20.4m (Laden)",
      origin: "Fujairah Oil Terminal (Hormuz-Free), UAE",
      destination: "Chiba / Tokyo Bay (ENEOS), Japan",
      eta: "ETA: 9d 12h",
      charterer: "ADNOC Logistics & Services"
    },
    {
      mmsi: "461000819",
      imo: "IMO 9741180",
      name: "MT OMAN PRIDE",
      flag: "🇴🇲",
      vesselClass: "VLCC (308,000 DWT)",
      cargo: "1,980,000 bbls • Oman Export Blend (30.5° API, 1.38% S)",
      corridorId: "me_to_india",
      progress: 0.62,
      speedKnots: 13.8,
      draught: "20.6m (Laden)",
      origin: "Mina al Fahal (Muscat), Oman",
      destination: "Jamnagar SEZ (Reliance), India",
      eta: "ETA: 1d 09h",
      charterer: "Reliance Industries"
    },
    {
      mmsi: "538009120",
      imo: "IMO 9811402",
      name: "MT FRONT ALTAIR",
      flag: "🇲🇭",
      vesselClass: "VLCC (300,200 DWT)",
      cargo: "2,010,000 bbls • Basrah Heavy (23.8° API, 4.12% S)",
      corridorId: "me_to_korea_japan",
      progress: 0.78,
      speedKnots: 13.2,
      draught: "21.3m (Laden)",
      origin: "Al Basrah Oil Terminal (ABOT), Iraq",
      destination: "SK Energy Ulsan, South Korea",
      eta: "ETA: 2d 22h",
      charterer: "SK Innovation"
    },
    {
      mmsi: "636019822",
      imo: "IMO 9610294",
      name: "MT NS CENTURY",
      flag: "🇱🇷",
      vesselClass: "Suezmax (158,000 DWT)",
      cargo: "1,020,000 bbls • Russian Urals (31.2° API, 1.48% S)",
      corridorId: "urals_suez_india",
      progress: 0.68,
      speedKnots: 12.6,
      draught: "16.8m (Suez Max Laden)",
      origin: "Primorsk Baltic Port, Russia",
      destination: "Vadinar Port (Nayara), India",
      eta: "ETA: 4d 11h",
      charterer: "Litasco / Rosneft Trading"
    },
    {
      mmsi: "352981104",
      imo: "IMO 9582310",
      name: "MT KRYMSK SHUTTLE",
      flag: "🇵🇦",
      vesselClass: "Aframax (114,000 DWT)",
      cargo: "730,000 bbls • ESPO Blend (35.6° API, 0.55% S)",
      corridorId: "espo_pacific_china",
      progress: 0.45,
      speedKnots: 14.5,
      draught: "14.4m (Laden)",
      origin: "Kozmino Pacific Terminal, Russia",
      destination: "Qingdao Port (Shandong), China",
      eta: "ETA: 1d 14h",
      charterer: "Shandong Independent Refiners"
    },
    {
      mmsi: "563109480",
      imo: "IMO 9865091",
      name: "MT EAGLE VERACRUZ",
      flag: "🇸🇬",
      vesselClass: "VLCC (300,000 DWT)",
      cargo: "2,020,000 bbls • WTI Midland (41.5° API, 0.24% S)",
      corridorId: "wti_cape_asia",
      progress: 0.54,
      speedKnots: 13.9,
      draught: "20.2m (Laden)",
      origin: "Ingleside / Corpus Christi, Texas USA",
      destination: "GS Caltex Yeosu, South Korea",
      eta: "ETA: 14d 08h",
      charterer: "Trafigura / GS Caltex"
    },
    {
      mmsi: "241820190",
      imo: "IMO 9778120",
      name: "MT MARAN CANOPUS",
      flag: "🇬🇷",
      vesselClass: "VLCC (319,500 DWT)",
      cargo: "2,000,000 bbls • Bonny Light & Forcados (35.4° API, 0.16% S)",
      corridorId: "waf_cape_asia",
      progress: 0.42,
      speedKnots: 13.1,
      draught: "20.5m (Laden)",
      origin: "Bonny Offshore Terminal, Nigeria",
      destination: "Sinopec Zhenhai, China",
      eta: "ETA: 13d 04h",
      charterer: "Vitol Asia"
    }
  ];

  const STRATEGIC_CHOKEPOINTS = [
    { name: "Strait of Hormuz", coords: [26.56, 56.25], flow: "20.9 Mb/d", width: "21 nm (2nm TSS lanes)", risk: "CRITICAL PERSIAN GULF EXIT" },
    { name: "Strait of Malacca & Singapore", coords: [1.25, 103.82], flow: "16.0 Mb/d", width: "1.5 nm Phillips Channel", risk: "EAST ASIA MARITIME FUNNEL" },
    { name: "Bab el-Mandeb Strait", coords: [12.62, 43.33], flow: "8.2 Mb/d", width: "18 nm Red Sea Gate", risk: "RED SEA / SUEZ CHOKEPOINT" },
    { name: "Suez Canal & SUMED", coords: [30.58, 32.34], flow: "7.5 Mb/d", width: "Single-lane convoy", risk: "MEDITERRANEAN-ASIA CANAL" },
    { name: "Cape of Good Hope", coords: [-34.85, 18.80], flow: "6.8 Mb/d", width: "Open Southern Ocean", risk: "LONG-HAUL ATLANTIC BYPASS" }
  ];

  // --------------------------------------------------------------------------
  // 3. HELPER GEOMETRY & CLEAN 🚢 SHIP EMOJI RENDERER
  // --------------------------------------------------------------------------
  function getPointAndBearingAtProgress(waypoints, progress) {
    if (!waypoints || waypoints.length < 2) {
      return { lat: 25.0, lng: 56.0, bearing: 90 };
    }
    const clamped = ((progress % 1) + 1) % 1;
    const totalSegs = waypoints.length - 1;
    const exactSeg = clamped * totalSegs;
    const segIdx = Math.min(Math.floor(exactSeg), totalSegs - 1);
    const segFrac = exactSeg - segIdx;

    const p1 = waypoints[segIdx];
    const p2 = waypoints[segIdx + 1];

    const lat = p1[0] + (p2[0] - p1[0]) * segFrac;
    const lng = p1[1] + (p2[1] - p1[1]) * segFrac;

    const dLat = p2[0] - p1[0];
    const dLng = p2[1] - p1[1];
    let angleRad = Math.atan2(dLng, dLat);
    let angleDeg = (angleRad * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;

    return { lat, lng, bearing: angleDeg };
  }

  function formatNauticalCoord(lat, lng) {
    const latDir = lat >= 0 ? "N" : "S";
    const lngDir = lng >= 0 ? "E" : "W";
    const absLat = Math.abs(lat);
    const absLng = Math.abs(lng);
    const latDeg = Math.floor(absLat);
    const latMin = ((absLat - latDeg) * 60).toFixed(1);
    const lngDeg = Math.floor(absLng);
    const lngMin = ((absLng - lngDeg) * 60).toFixed(1);
    return `${String(latDeg).padStart(2, "0")}°${latMin}'${latDir}  ${String(lngDeg).padStart(3, "0")}°${lngMin}'${lngDir}`;
  }

  function detectMaritimeBasin(lat, lng) {
    if (lat > 23 && lat < 30.5 && lng > 47 && lng < 57) return "PERSIAN GULF / STRAIT OF HORMUZ";
    if (lat > 20 && lat < 26 && lng >= 57 && lng < 63) return "GULF OF OMAN (HORMUZ-FREE)";
    if (lat > 5 && lat < 24 && lng >= 58 && lng < 77) return "ARABIAN SEA";
    if (lat > -2 && lat < 8 && lng >= 94 && lng < 105.5) return "STRAIT OF MALACCA & SINGAPORE";
    if (lat >= 8 && lat < 24 && lng >= 105 && lng < 121) return "SOUTH CHINA SEA";
    if (lat >= 24 && lat < 41 && lng >= 118 && lng < 142) return "EAST CHINA SEA / KOREA & JAPAN";
    if (lat > 11 && lat < 31 && lng > 31 && lng < 45) return "RED SEA & SUEZ CANAL";
    return "GLOBAL MARITIME TRADE CORRIDOR";
  }

  // Clean 🚢 Ship Emoji Marker with Call-Sign Badge & Smooth Rotation
  function createAisTankerEmojiHtml(color, vesselName, bearing = 0) {
    return `
      <div class="ais-vessel-marker-wrap" title="${vesselName}">
        <div class="ais-vessel-callsign" style="border-color:${color};">${vesselName.replace("MT ", "")}</div>
        <div class="ais-ship-emoji-pin" style="transform: rotate(${bearing}deg); transition: transform 0.2s linear;">🚢</div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 4. AUTOMATIC SEA-LANE UPGRADER FOR ANY ROUTE POLYLINE
  // --------------------------------------------------------------------------
  function matchSmartSeaWaypoints(coords) {
    if (!coords || coords.length < 2) return coords;
    const start = coords[0];
    const end = coords[coords.length - 1];
    const sLat = Array.isArray(start) ? start[0] : start.lat;
    const sLng = Array.isArray(start) ? start[1] : start.lng;
    const eLat = Array.isArray(end) ? end[0] : end.lat;
    const eLng = Array.isArray(end) ? end[1] : end.lng;

    if (coords.length >= 10) return coords;

    if (sLng < -75 && eLng > 65) {
      return [
        [sLat, sLng], [24.5, -85.5], [19.8, -73.0], [12.0, -57.5],
        [1.5, -37.0], [-15.0, -22.0], [-35.2, 18.8], [-34.6, 26.5],
        [-24.0, 50.0], [-9.0, 76.0],
        ...(eLng > 100 ? [[1.25, 103.85], [14.0, 114.5], [eLat, eLng]] : [[eLat, eLng]])
      ];
    }
    if (sLat > 50 && sLng > -10 && sLng < 35 && eLng > 65) {
      return [
        [sLat, sLng], [56.5, 8.0], [50.2, -2.0], [43.5, -9.8],
        [36.0, -5.5], [36.8, 15.0], [31.26, 32.31], [27.2, 34.3],
        [12.62, 43.33], [14.5, 54.5],
        ...(eLng > 100 ? [[5.8, 80.6], [1.25, 103.85], [15.0, 115.0], [eLat, eLng]] : [[eLat, eLng]])
      ];
    }
    if (sLat > 41 && sLat < 48 && sLng > 27 && sLng < 42 && eLng > 65) {
      return [
        [sLat, sLng], [41.1, 29.0], [36.5, 26.0], [31.26, 32.31],
        [27.2, 34.3], [12.62, 43.33], [15.0, 55.0], [eLat, eLng]
      ];
    }
    if (sLat < 10 && sLat > -20 && sLng > -5 && sLng < 20 && eLng > 65) {
      return [
        [sLat, sLng], [-18.5, 10.5], [-34.8, 18.8], [-34.5, 27.0],
        [-21.0, 56.0], [-5.0, 83.0],
        ...(eLng > 100 ? [[1.25, 103.85], [14.0, 114.5], [eLat, eLng]] : [[eLat, eLng]])
      ];
    }
    if (sLat >= 21 && sLat <= 31 && sLng >= 47 && sLng <= 60 && eLng > 100) {
      const preHormuz = sLng < 56.1 ? [[sLat, sLng], [26.2, 53.5], [26.56, 56.45], [24.2, 57.8]] : [[sLat, sLng], [23.5, 59.2]];
      return [
        ...preHormuz,
        [15.5, 68.0], [5.8, 80.6], [5.9, 95.3], [1.25, 103.85],
        [7.5, 109.0], [16.5, 115.5],
        ...(eLat > 32 ? [[25.5, 121.0], [31.5, 125.5], [eLat, eLng]] : [[eLat, eLng]])
      ];
    }
    if (sLat >= 21 && sLat <= 31 && sLng >= 47 && sLng <= 60 && eLng >= 68 && eLng <= 78) {
      const preHormuz = sLng < 56.1 ? [[sLat, sLng], [26.2, 53.5], [26.56, 56.45], [24.5, 57.5]] : [[sLat, sLng]];
      return [...preHormuz, [23.1, 63.0], [22.6, 67.0], [eLat, eLng]];
    }
    if (sLat > 40 && sLng > 130 && eLng > 117) {
      return [[sLat, sLng], [38.8, 130.8], [34.8, 129.2], [33.6, 126.5], [35.0, 123.0], [eLat, eLng]];
    }

    return coords;
  }

  // --------------------------------------------------------------------------
  // 5. LEAFLET MARITIME INTELLIGENCE UPGRADER (DEFAULT = SATELLITE VIEW!)
  // --------------------------------------------------------------------------
  const activeMaritimeMaps = new Map();

  const BASEMAP_PROVIDERS = {
    satellite: {
      name: "🛰️ Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      subdomains: [],
      overlayUrl: "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      oceanOverlayUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
      cartoLabelsUrl: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
      bg: "#040d1a"
    },
    bathymetry: {
      name: "🌊 Bathymetry",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
      subdomains: [],
      overlayUrl: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
      bg: "#0a2540"
    },
    kpler_dark: {
      name: "🌑 Kpler Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      subdomains: "abcd",
      overlayUrl: null,
      bg: "#06101e"
    },
    ft_editorial: {
      name: "📰 FT Vector",
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      subdomains: "abcd",
      overlayUrl: null,
      bg: "#d4e6f1"
    }
  };

  function enhanceLeafletMapInstance(map, containerEl) {
    if (!map || !containerEl || containerEl.dataset.maritimeUpgraded === "true") return;
    containerEl.dataset.maritimeUpgraded = "true";
    containerEl.classList.add("kpler-maritime-map-shell");

    const mapId = containerEl.id || ("maritime_map_" + Math.random().toString(36).slice(2, 8));
    const state = {
      map,
      containerEl,
      theme: "satellite", // DEFAULT TO SATELLITE VIEW
      baseLayer: null,
      refLayer: null,
      seamarkLayer: null,
      seamarksEnabled: true,
      aisEnabled: true,
      chokepointsEnabled: true,
      pitch3DEnabled: false,
      aisLayerGroup: L.layerGroup(),
      chokepointLayerGroup: L.layerGroup(),
      corridorHaloGroup: L.layerGroup(),
      aisMarkers: [],
      animFrameId: null
    };

    // Apply High-Resolution Satellite Imagery + Labels by default
    setTimeout(() => {
      map.eachLayer(layer => {
        if (layer instanceof L.TileLayer && !layer._isMaritimeManaged) {
          map.removeLayer(layer);
        }
      });
      applyBasemapTheme(state, "satellite");
      state.corridorHaloGroup.addTo(map);
      state.chokepointLayerGroup.addTo(map);
      state.aisLayerGroup.addTo(map);

      renderChokepointRadars(state);
      spawnAisTankerFleetOnMap(state);
    }, 20);

    // Build Top HUD Toolbar with 🛰️ Satellite active by default
    const hudBar = document.createElement("div");
    hudBar.className = "maritime-intel-hud-top";
    hudBar.innerHTML = `
      <div class="maritime-hud-brand">
        <span class="maritime-live-dot"></span>
        <span class="maritime-hud-title">MARITIME TERMINAL</span>
        <span class="maritime-hud-badge">SATELLITE + AIS + OPENSEAMAP</span>
      </div>
      <div class="maritime-hud-controls">
        <div class="maritime-btn-group" role="group" aria-label="Basemap Switcher">
          <button type="button" class="maritime-hud-btn active" data-theme="satellite" title="High-Res Port & Terminal Satellite Imagery">🛰️ Satellite</button>
          <button type="button" class="maritime-hud-btn" data-theme="bathymetry" title="Esri Hydrographic Ocean Bathymetry">🌊 Bathymetry</button>
          <button type="button" class="maritime-hud-btn" data-theme="kpler_dark" title="Kpler / Vortexa Dark Maritime Intelligence">🌑 Kpler Dark</button>
          <button type="button" class="maritime-hud-btn" data-theme="ft_editorial" title="Reuters / FT Editorial Vector Chart">📰 FT Vector</button>
        </div>
        <div class="maritime-btn-group" role="group" aria-label="Maritime Overlays">
          <button type="button" class="maritime-hud-btn active" data-toggle="ais" title="Toggle Live AIS Supertankers">🚢 Ships (9)</button>
          <button type="button" class="maritime-hud-btn active" data-toggle="seamarks" title="Toggle OpenSeaMap Nautical Seamarks">⚓ Seamarks</button>
          <button type="button" class="maritime-hud-btn active" data-toggle="chokepoints" title="Toggle Chokepoint Radar Rings">📡 Radar</button>
          <button type="button" class="maritime-hud-btn" data-toggle="pitch3d" title="Toggle 3D Perspective Tilt View">📐 3D Tilt</button>
        </div>
      </div>
    `;

    containerEl.appendChild(hudBar);
    containerEl.appendChild(bottomHud);

    // Only disable click/scroll propagation on actual controls, so clicking/dragging elsewhere pans map
    hudBar.querySelectorAll(".maritime-hud-controls, .maritime-btn-group, button").forEach(el => {
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);
    });
    bottomHud.querySelectorAll("button, a").forEach(el => {
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);
    });

    if (map.dragging) {
      map.dragging.enable();
    }
    containerEl.style.cursor = "grab";
    map.on("dragstart", () => {
      containerEl.classList.add("grabbing");
      containerEl.style.cursor = "grabbing";
    });
    map.on("dragend", () => {
      containerEl.classList.remove("grabbing");
      containerEl.style.cursor = "grab";
    });

    hudBar.querySelectorAll("[data-theme]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const themeKey = btn.getAttribute("data-theme");
        hudBar.querySelectorAll("[data-theme]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyBasemapTheme(state, themeKey);
      });
    });

    hudBar.querySelectorAll("[data-toggle]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const toggleType = btn.getAttribute("data-toggle");
        btn.classList.toggle("active");
        const isActive = btn.classList.contains("active");

        if (toggleType === "ais") {
          state.aisEnabled = isActive;
          if (isActive) state.aisLayerGroup.addTo(map);
          else map.removeLayer(state.aisLayerGroup);
        } else if (toggleType === "seamarks") {
          state.seamarksEnabled = isActive;
          if (state.seamarkLayer) {
            if (isActive) state.seamarkLayer.addTo(map);
            else map.removeLayer(state.seamarkLayer);
          }
        } else if (toggleType === "chokepoints") {
          state.chokepointsEnabled = isActive;
          if (isActive) state.chokepointLayerGroup.addTo(map);
          else map.removeLayer(state.chokepointLayerGroup);
        } else if (toggleType === "pitch3d") {
          state.pitch3DEnabled = isActive;
          containerEl.classList.toggle("maritime-3d-perspective", isActive);
          setTimeout(() => map.invalidateSize(), 320);
        }
      });
    });

    map.on("mousemove", (ev) => {
      const coordEl = document.getElementById(`${mapId}_coords`);
      if (coordEl && ev.latlng) {
        const basin = detectMaritimeBasin(ev.latlng.lat, ev.latlng.lng);
        coordEl.innerHTML = `🧭 ${formatNauticalCoord(ev.latlng.lat, ev.latlng.lng)} &bull; <span style="color:#38bdf8;">${basin}</span>`;
      }
    });

    activeMaritimeMaps.set(mapId, state);
  }

  function applyBasemapTheme(state, themeKey) {
    const cfg = BASEMAP_PROVIDERS[themeKey] || BASEMAP_PROVIDERS.satellite;
    state.theme = themeKey;
    state.containerEl.style.backgroundColor = cfg.bg;

    if (state.baseLayer) state.map.removeLayer(state.baseLayer);
    if (state.refLayer) state.map.removeLayer(state.refLayer);
    if (state.oceanLayer) state.map.removeLayer(state.oceanLayer);
    if (state.cartoLabelsLayer) state.map.removeLayer(state.cartoLabelsLayer);
    if (state.seamarkLayer) state.map.removeLayer(state.seamarkLayer);

    const opts = {
      maxZoom: 19,
      attribution: "&copy; Esri, Maxar &copy; OpenStreetMap &copy; CARTO &copy; OpenSeaMap"
    };
    if (cfg.subdomains && cfg.subdomains.length) opts.subdomains = cfg.subdomains;

    state.baseLayer = L.tileLayer(cfg.url, opts);
    state.baseLayer._isMaritimeManaged = true;
    state.baseLayer.addTo(state.map);
    state.baseLayer.bringToBack();

    if (cfg.overlayUrl) {
      state.refLayer = L.tileLayer(cfg.overlayUrl, { maxZoom: 19, opacity: 0.95 });
      state.refLayer._isMaritimeManaged = true;
      state.refLayer.addTo(state.map);
    }

    if (cfg.oceanOverlayUrl) {
      state.oceanLayer = L.tileLayer(cfg.oceanOverlayUrl, { maxZoom: 19, opacity: 0.95 });
      state.oceanLayer._isMaritimeManaged = true;
      state.oceanLayer.addTo(state.map);
    }

    if (cfg.cartoLabelsUrl) {
      state.cartoLabelsLayer = L.tileLayer(cfg.cartoLabelsUrl, { subdomains: "abcd", maxZoom: 19, opacity: 0.95 });
      state.cartoLabelsLayer._isMaritimeManaged = true;
      state.cartoLabelsLayer.addTo(state.map);
    }

    state.seamarkLayer = L.tileLayer("https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
      maxZoom: 18,
      opacity: 0.85
    });
    state.seamarkLayer._isMaritimeManaged = true;
    if (state.seamarksEnabled) {
      state.seamarkLayer.addTo(state.map);
    }
  }

  function renderChokepointRadars(state) {
    state.chokepointLayerGroup.clearLayers();
    STRATEGIC_CHOKEPOINTS.forEach(cp => {
      const radarIcon = L.divIcon({
        className: "chokepoint-radar-pin",
        html: `
          <div class="cp-radar-wrap">
            <div class="cp-radar-ring"></div>
            <div class="cp-radar-ring delay"></div>
            <div class="cp-radar-core"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const m = L.marker(cp.coords, { icon: radarIcon }).addTo(state.chokepointLayerGroup);
      m.bindPopup(`
        <div class="kpler-ais-popup">
          <div class="kpler-popup-header" style="background:#991b1b;">
            <span>📡 MARITIME CHOKEPOINT RADAR</span>
            <span>${cp.flow}</span>
          </div>
          <div class="kpler-popup-body">
            <div style="font-size:15px; font-weight:800; color:#f8fafc; margin-bottom:4px;">${cp.name}</div>
            <div style="font-size:11.5px; color:#fca5a5; font-weight:700; margin-bottom:6px;">${cp.risk}</div>
            <div class="kpler-popup-grid">
              <div><span>Channel Width:</span> <strong>${cp.width}</strong></div>
              <div><span>Daily Crude Transit:</span> <strong>${cp.flow}</strong></div>
            </div>
          </div>
        </div>
      `);
    });
  }

  function spawnAisTankerFleetOnMap(state) {
    if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
    state.aisLayerGroup.clearLayers();
    state.aisMarkers = [];

    Object.values(DEEP_WATER_CORRIDORS).forEach(corridor => {
      const bgLane = L.polyline(corridor.waypoints, {
        color: corridor.color,
        weight: 2.2,
        opacity: 0.45,
        dashArray: "4, 8",
        interactive: false
      });
      bgLane.addTo(state.aisLayerGroup);
    });

    // Spawn each AIS vessel with the clean 🚢 Ship Emoji
    AIS_LIVE_FLEET.forEach((vessel) => {
      const corridor = DEEP_WATER_CORRIDORS[vessel.corridorId];
      if (!corridor) return;

      const pos = getPointAndBearingAtProgress(corridor.waypoints, vessel.progress);
      const icon = L.divIcon({
        className: "ais-custom-div-icon",
        html: createAisTankerEmojiHtml(corridor.color, vessel.name),
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([pos.lat, pos.lng], { icon, zIndexOffset: 900 }).addTo(state.aisLayerGroup);
      marker.bindPopup(`
        <div class="kpler-ais-popup">
          <div class="kpler-popup-header" style="background:#0f172a; border-bottom:2px solid ${corridor.color};">
            <span>🚢 ${vessel.flag} ${vessel.name}</span>
            <span style="color:${corridor.color};">${vessel.imo}</span>
          </div>
          <div class="kpler-popup-body">
            <div style="font-size:12px; font-weight:800; color:#38bdf8; margin-bottom:6px;">
              ${vessel.vesselClass} &bull; Speed: ${vessel.speedKnots} kn &bull; ${vessel.draught}
            </div>
            <div style="background:#1e293b; padding:7px 9px; border-radius:6px; font-size:11.5px; color:#f8fafc; margin-bottom:6px; border-left:3px solid ${corridor.color};">
              <strong>🛢️ Cargo:</strong> ${vessel.cargo}
            </div>
            <div class="kpler-popup-grid">
              <div><span>⚓ Loading Port:</span> <strong>${vessel.origin}</strong></div>
              <div><span>🏭 Discharge Port:</span> <strong>${vessel.destination}</strong></div>
              <div><span>⏱️ Live Status:</span> <strong style="color:#4ade80;">Underway Using Engine (${vessel.eta})</strong></div>
              <div><span>📋 Charterer:</span> <strong>${vessel.charterer}</strong></div>
            </div>
          </div>
        </div>
      `);

      state.aisMarkers.push({
        marker,
        vessel,
        corridor,
        progress: vessel.progress
      });
    });

    let tick = 0;
    function animateAisFleet() {
      if (!document.body.contains(state.containerEl)) {
        return;
      }
      tick++;
      if (tick % 2 === 0 && state.aisEnabled) {
        state.aisMarkers.forEach(item => {
          item.progress = (item.progress + 0.00055) % 1;
          const pos = getPointAndBearingAtProgress(item.corridor.waypoints, item.progress);
          item.marker.setLatLng([pos.lat, pos.lng]);
          const el = item.marker.getElement();
          if (el) {
            const pin = el.querySelector(".ais-ship-emoji-pin");
            if (pin) pin.style.transform = `rotate(${pos.bearing}deg)`;
          }
        });
      }
      state.animFrameId = requestAnimationFrame(animateAisFleet);
    }
    state.animFrameId = requestAnimationFrame(animateAisFleet);
  }

  // --------------------------------------------------------------------------
  // 6. HOOK LEAFLET L.map & L.polyline TO AUTOMATICALLY APPLY SEA-LANE ROUTING
  // --------------------------------------------------------------------------
  if (typeof L !== "undefined") {
    const origMapFactory = L.map;
    L.map = function (idOrEl, options) {
      const containerEl = typeof idOrEl === "string" ? document.getElementById(idOrEl) : idOrEl;
      const opts = Object.assign({
        worldCopyJump: true,
        zoomSnap: 0.5,
        dragging: true,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        tap: false
      }, options || {});

      const mapInstance = origMapFactory.call(this, idOrEl, opts);

      const skipMaritime = (options && (options.noMaritime === true || options.maritime === false)) ||
        (containerEl && (
          containerEl.dataset.noMaritime === "true" ||
          containerEl.id === "chapter10FutureMap" ||
          containerEl.id === "chapter10ShockMap"
        ));

      if (containerEl && !skipMaritime) {
        enhanceLeafletMapInstance(mapInstance, containerEl);
      }
      return mapInstance;
    };

    const origPolylineFactory = L.polyline;
    L.polyline = function (latlngs, options) {
      const opts = Object.assign({}, options || {});
      const isPipeline = opts.isPipeline || opts.rawWaypoints || opts.className === "pulse-pipeline";
      const rawSeaWaypoints = (opts.dashArray === "6, 6" || isPipeline) ? latlngs : matchSmartSeaWaypoints(latlngs);
      
      let finalSplineWaypoints = rawSeaWaypoints;
      if (typeof window !== "undefined" && window.generateSmoothMaritimeSpline && Array.isArray(rawSeaWaypoints) && rawSeaWaypoints.length >= 2 && rawSeaWaypoints.length < 50) {
        finalSplineWaypoints = window.generateSmoothMaritimeSpline(rawSeaWaypoints, 18);
      }

      const primaryLine = origPolylineFactory.call(this, finalSplineWaypoints, Object.assign({}, opts, {
        weight: (opts.weight || 4) + 0.5,
        opacity: 0.95
      }));

      const origAddTo = primaryLine.addTo;
      primaryLine.addTo = function (target) {
        if (target && !opts._isHaloLayer && opts.dashArray !== "6, 6" && !isPipeline) {
          try {
            const haloLine = origPolylineFactory.call(L, finalSplineWaypoints, {
              color: opts.color || "#38bdf8",
              weight: (opts.weight || 4) * 2.8,
              opacity: 0.25,
              interactive: false,
              _isHaloLayer: true
            });
            haloLine.addTo(target);
          } catch (e) {}
        }
        return origAddTo.call(this, target);
      };

      return primaryLine;
    };
  }

  // --------------------------------------------------------------------------
  // 7. TRUE 3D SPHERICAL SATELLITE EARTH GLOBE FOR LANDING PAGE (#threeGlobeContainer)
  //    Renders an interactive 3D WebGL Sphere with NASA Satellite Blue Marble
  //    imagery, glowing 3D trade corridors, and live moving 🚢 ship emojis!
  // --------------------------------------------------------------------------
  let globeScene = null;
  let globeCamera = null;
  let globeRenderer = null;
  let globeEarthGroup = null;
  let globeAnimId = null;
  let globeInitialized = false;
  let globeTargetRotY = -1.42; // Centered on Persian Gulf / Indian Ocean / Asia
  let globeTargetRotX = 0.36;
  let globeTargetZoomZ = 215;

  function handleGlobeResize() {
    const container = document.getElementById("threeGlobeContainer");
    if (!container || !globeRenderer || !globeCamera) return;
    const w = container.clientWidth || 580;
    const h = container.clientHeight || 470;
    if (w > 0 && h > 0) {
      globeCamera.aspect = w / h;
      globeCamera.updateProjectionMatrix();
      globeRenderer.setSize(w, h);
    }
  }
  window.addEventListener("resize", handleGlobeResize);

  function latLngToVector3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  // Fallback high-res procedural satellite earth texture if CDN image is still loading
  function createFallbackSatelliteCanvasTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    // Deep satellite ocean gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, "#04142b");
    grad.addColorStop(0.5, "#06254c");
    grad.addColorStop(1, "#04142b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);
    return new THREE.CanvasTexture(canvas);
  }

  function initMapLibreHeroGlobe() {
    const container = document.getElementById("threeGlobeContainer");
    if (!container || typeof THREE === "undefined") return false;

    // If already mounted and rendered, simply resize and keep loop running
    if (globeInitialized && globeRenderer && globeRenderer.domElement && container.contains(globeRenderer.domElement)) {
      handleGlobeResize();
      if (!isGlobeOrbiting) {
        setGlobeRotating(true);
      }
      return true;
    }

    try {
      if (globeAnimId) cancelAnimationFrame(globeAnimId);
      container.innerHTML = "";
      container.style.background = "radial-gradient(circle at 50% 50%, #0b2240 0%, #030914 78%, #010409 100%)";

      const width = container.clientWidth || 580;
      const height = container.clientHeight || 470;

      globeScene = new THREE.Scene();
      globeCamera = new THREE.PerspectiveCamera(42, width / height, 1, 1200);
      globeCamera.position.set(0, 0, globeTargetZoomZ);

      globeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      globeRenderer.setSize(width, height);
      globeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(globeRenderer.domElement);

      // HTML Overlay Layer for 3D Projected 🚢 Ship Emojis & Hub Labels
      const overlayDiv = document.createElement("div");
      overlayDiv.style.cssText = "position:absolute; inset:0; pointer-events:none; overflow:hidden;";
      container.appendChild(overlayDiv);

      // Top HUD Badge confirming 3D SATELLITE GLOBE
      const heroHud = document.createElement("div");
      heroHud.className = "maritime-intel-hud-top";
      heroHud.style.left = "10px";
      heroHud.innerHTML = `
        <div class="maritime-hud-brand">
          <span class="maritime-live-dot"></span>
          <span class="maritime-hud-title">3D SATELLITE EARTH GLOBE</span>
          <span class="maritime-hud-badge">DRAG TO ROTATE 3D SPHERE • 🚢 LIVE SHIPS</span>
        </div>
        <div class="maritime-hud-controls">
          <button type="button" class="maritime-hud-btn active" onclick="window.MARITIME_ENGINE.flyHeroGlobe('overview')">🌐 Full 3D Globe</button>
          <button type="button" class="maritime-hud-btn" onclick="window.MARITIME_ENGINE.flyHeroGlobe('hormuz')">⚓ Hormuz</button>
          <button type="button" class="maritime-hud-btn" onclick="window.MARITIME_ENGINE.flyHeroGlobe('malacca')">🚢 Malacca</button>
          <button type="button" class="maritime-hud-btn" onclick="window.MARITIME_ENGINE.flyHeroGlobe('east_asia')">🏭 East Asia</button>
        </div>
      `;
      container.appendChild(heroHud);

      // Lighting for 3D Satellite Sphere
      const ambient = new THREE.AmbientLight(0xdbeafe, 2.1);
      globeScene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight.position.set(180, 110, 160);
      globeScene.add(dirLight);

      globeEarthGroup = new THREE.Group();
      globeScene.add(globeEarthGroup);

      const RADIUS = 76;
      const sphereGeo = new THREE.SphereGeometry(RADIUS, 72, 72);

      // Load Real NASA Blue Marble High-Resolution Satellite Texture
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");

      const earthMat = new THREE.MeshPhongMaterial({
        map: createFallbackSatelliteCanvasTexture(),
        specular: new THREE.Color(0x1e3a8a),
        shininess: 18
      });

      loader.load(
        "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg",
        (tex) => {
          earthMat.map = tex;
          earthMat.color = new THREE.Color(0xffffff);
          earthMat.needsUpdate = true;
        }
      );

      loader.load(
        "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png",
        (bumpTex) => {
          earthMat.bumpMap = bumpTex;
          earthMat.bumpScale = 1.8;
          earthMat.needsUpdate = true;
        }
      );

      const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
      globeEarthGroup.add(earthMesh);

      // Atmospheric Blue Halo Sphere around the 3D Earth
      const atmosGeo = new THREE.SphereGeometry(RADIUS * 1.035, 64, 64);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide
      });
      globeEarthGroup.add(new THREE.Mesh(atmosGeo, atmosMat));

      // Subtle Latitude / Longitude Graticule on the 3D Sphere
      const gratGeo = new THREE.SphereGeometry(RADIUS * 1.003, 36, 18);
      const gratMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });
      globeEarthGroup.add(new THREE.Mesh(gratGeo, gratMat));

      // Draw 3D Raised Sea Corridors along the Spherical Surface
      Object.values(DEEP_WATER_CORRIDORS).forEach(corridor => {
        const pts3D = corridor.waypoints.map(wp => latLngToVector3(wp[0], wp[1], RADIUS * 1.012));
        const curve = new THREE.CatmullRomCurve3(pts3D);
        const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.55, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(corridor.color),
          transparent: true,
          opacity: 0.92
        });
        globeEarthGroup.add(new THREE.Mesh(tubeGeo, tubeMat));
      });

      // Plot Key Port Pins on the 3D Globe
      const keyHubs = [
        { name: "Ras Tanura (Saudi)", lat: 26.64, lng: 50.16, color: "#f59e0b" },
        { name: "Mina al Fahal (Oman)", lat: 23.63, lng: 58.52, color: "#10b981" },
        { name: "Fujairah (UAE)", lat: 25.12, lng: 56.36, color: "#38bdf8" },
        { name: "Jamnagar (India)", lat: 22.36, lng: 69.85, color: "#fbbf24" },
        { name: "Singapore / Malacca", lat: 1.25, lng: 103.85, color: "#f97316" },
        { name: "Ningbo-Zhoushan (China)", lat: 30.05, lng: 122.10, color: "#ef4444" },
        { name: "Ulsan (Korea)", lat: 35.50, lng: 129.38, color: "#38bdf8" },
        { name: "Tokyo Bay (Japan)", lat: 35.53, lng: 140.08, color: "#f97316" },
        { name: "Kozmino (Russia ESPO)", lat: 42.73, lng: 133.00, color: "#ef4444" }
      ];

      const hubPins = keyHubs.map(h => {
        const v = latLngToVector3(h.lat, h.lng, RADIUS * 1.018);
        const pinMesh = new THREE.Mesh(
          new THREE.SphereGeometry(1.4, 14, 14),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(h.color) })
        );
        pinMesh.position.copy(v);
        globeEarthGroup.add(pinMesh);

        const labelEl = document.createElement("div");
        labelEl.style.cssText = `
          position:absolute; transform:translate(-50%, -130%);
          background:rgba(15,23,42,0.88); color:#f8fafc;
          border:1px solid ${h.color}; border-radius:4px;
          padding:1px 5px; font-family:var(--font-mono); font-size:9px; font-weight:800;
          white-space:nowrap; pointer-events:none;
        `;
        labelEl.textContent = h.name;
        overlayDiv.appendChild(labelEl);
        return { mesh: pinMesh, labelEl };
      });

      // Spawn Live Moving 🚢 Ship Emojis Projected onto the 3D Sphere
      const globeShipMarkers = AIS_LIVE_FLEET.map(vessel => {
        const corridor = DEEP_WATER_CORRIDORS[vessel.corridorId];
        const shipEl = document.createElement("div");
        shipEl.style.cssText = `
          position:absolute; transform:translate(-50%, -50%);
          display:flex; flex-direction:column; align-items:center;
          pointer-events:auto; cursor:pointer;
        `;
        shipEl.innerHTML = `
          <span style="background:rgba(15,23,42,0.9); color:#fff; border:1px solid ${corridor.color}; font-family:var(--font-mono); font-size:8px; font-weight:800; padding:0 4px; border-radius:3px; margin-bottom:1px;">
            ${vessel.name.replace("MT ", "")}
          </span>
          <span style="font-size:18px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.85));">🚢</span>
        `;
        shipEl.title = `${vessel.name} (${vessel.cargo})`;
        overlayDiv.appendChild(shipEl);
        return { el: shipEl, corridor, progress: vessel.progress };
      });

      // Set Initial 3D Orientation to Asia / Indian Ocean / Persian Gulf
      globeEarthGroup.rotation.y = globeTargetRotY;
      globeEarthGroup.rotation.x = globeTargetRotX;

      // Interactive Mouse Drag to Rotate the 3D Sphere
      let isDragging = false;
      let prevX = 0;
      let prevY = 0;
      globeRenderer.domElement.style.cursor = "grab";

      globeRenderer.domElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        globeRenderer.domElement.style.cursor = "grabbing";
        setGlobeRotating(false);
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        globeTargetRotY += dx * 0.006;
        globeTargetRotX = Math.max(-0.8, Math.min(0.8, globeTargetRotX + dy * 0.006));
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
        if (globeRenderer && globeRenderer.domElement) {
          globeRenderer.domElement.style.cursor = "grab";
        }
      });

      // Project 3D world coordinates onto 2D HTML overlay (hiding back-hemisphere markers)
      const tempVec = new THREE.Vector3();
      function update3DOverlayPositions(w, h) {
        globeEarthGroup.updateMatrixWorld();

        hubPins.forEach(item => {
          tempVec.copy(item.mesh.position).applyMatrix4(globeEarthGroup.matrixWorld);
          if (tempVec.z < 15) {
            item.labelEl.style.display = "none";
          } else {
            tempVec.project(globeCamera);
            const x = (tempVec.x * 0.5 + 0.5) * w;
            const y = (-(tempVec.y * 0.5) + 0.5) * h;
            item.labelEl.style.display = "block";
            item.labelEl.style.left = `${x}px`;
            item.labelEl.style.top = `${y}px`;
          }
        });

        globeShipMarkers.forEach(ship => {
          if (isGlobeOrbiting && !isDragging) {
            ship.progress = (ship.progress + 0.0006) % 1;
          }
          const pos = getPointAndBearingAtProgress(ship.corridor.waypoints, ship.progress);
          const localVec = latLngToVector3(pos.lat, pos.lng, RADIUS * 1.022);
          tempVec.copy(localVec).applyMatrix4(globeEarthGroup.matrixWorld);
          if (tempVec.z < 10) {
            ship.el.style.display = "none";
          } else {
            tempVec.project(globeCamera);
            const x = (tempVec.x * 0.5 + 0.5) * w;
            const y = (-(tempVec.y * 0.5) + 0.5) * h;
            ship.el.style.display = "flex";
            ship.el.style.left = `${x}px`;
            ship.el.style.top = `${y}px`;
          }
        });
      }

      function animate3DGlobe() {
        if (!document.getElementById("threeGlobeContainer")) return;
        if (!isDragging && isGlobeOrbiting) {
          globeTargetRotY += 0.0022;
        }
        globeEarthGroup.rotation.y += (globeTargetRotY - globeEarthGroup.rotation.y) * 0.12;
        globeEarthGroup.rotation.x += (globeTargetRotX - globeEarthGroup.rotation.x) * 0.12;
        globeCamera.position.z += (globeTargetZoomZ - globeCamera.position.z) * 0.10;

        const curW = container.clientWidth || width;
        const curH = container.clientHeight || height;
        update3DOverlayPositions(curW, curH);

        globeRenderer.render(globeScene, globeCamera);
        globeAnimId = requestAnimationFrame(animate3DGlobe);
      }

      syncGlobeOrbitUi();
      globeInitialized = true;
      globeAnimId = requestAnimationFrame(animate3DGlobe);
      return true;
    } catch (err) {
      console.warn("3D Globe init error:", err);
      return false;
    }
  }

  let isGlobeOrbiting = true;

  function syncGlobeOrbitUi() {
    const btn = document.getElementById("btnToggleGlobeRotate");
    if (btn) {
      btn.innerHTML = isGlobeOrbiting
        ? `<span>⏸️</span> Pause Globe Orbit`
        : `<span>▶️</span> Resume Globe Orbit`;
    }
    const dot = document.querySelector("#threeGlobeContainer .maritime-live-dot");
    if (dot) {
      dot.style.background = isGlobeOrbiting ? "#10b981" : "#f59e0b";
      dot.style.boxShadow = isGlobeOrbiting ? "0 0 10px #10b981" : "0 0 10px #f59e0b";
      dot.style.animationPlayState = isGlobeOrbiting ? "running" : "paused";
    }
  }

  function setGlobeRotating(shouldRotate) {
    isGlobeOrbiting = Boolean(shouldRotate);
    if (window.STATE) window.STATE.globeRotating = isGlobeOrbiting;
    if (!isGlobeOrbiting && globeEarthGroup) {
      // Lock target rotation immediately to current rotation so globe halts instantly without drift
      globeTargetRotY = globeEarthGroup.rotation.y;
      globeTargetRotX = globeEarthGroup.rotation.x;
    }
    syncGlobeOrbitUi();
  }

  function flyHeroGlobe(preset) {
    const targets = {
      overview: { rotY: -1.42, rotX: 0.34, zoomZ: 215 },
      hormuz: { rotY: -1.02, rotX: 0.42, zoomZ: 155 },
      malacca: { rotY: -1.82, rotX: 0.08, zoomZ: 158 },
      east_asia: { rotY: -2.18, rotX: 0.52, zoomZ: 162 },
      india: { rotY: -1.28, rotX: 0.36, zoomZ: 162 }
    };
    const t = targets[preset] || targets.overview;
    globeTargetRotY = t.rotY;
    globeTargetRotX = t.rotX;
    globeTargetZoomZ = t.zoomZ;
    isGlobeOrbiting = (preset === "overview");
    if (window.STATE) window.STATE.globeRotating = isGlobeOrbiting;
    syncGlobeOrbitUi();

    // Toggle active state across hero pills & in-canvas HUD buttons
    document.querySelectorAll(".hero-action-pills .map-pill-btn, .maritime-hud-controls .maritime-hud-btn").forEach(btn => {
      const onclickAttr = btn.getAttribute("onclick") || "";
      if (onclickAttr.includes(`'${preset}'`)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  window.MARITIME_ENGINE = {
    DEEP_WATER_CORRIDORS,
    AIS_LIVE_FLEET,
    initMapLibreHeroGlobe,
    resizeHeroGlobe: handleGlobeResize,
    flyHeroGlobe,
    setGlobeRotating,
    enhanceLeafletMapInstance,
    matchSmartSeaWaypoints
  };
})();
