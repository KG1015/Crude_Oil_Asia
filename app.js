/**
 * DUBAI/OMAN & THE ASIAN CRUDE MARKET
 * REUTERS & FT EDITORIAL INTERACTIVE EXPERIENCE
 * Clean Chapter-Based Router, High-Contrast Typography, Maps & Simulators
 */

// Application State
const STATE = {
  currentChapterId: 1,
  activeRouteId: "saudi_to_china",
  activeMocStep: 0,
  activeCaseStudyIdx: 0,
  activeJourneyStep: 0,
  selectedCrudeCode: "ARAB_LIGHT",
  selectedDest: "china",
  currentCurveState: "backwardation",
  activeDeskSubtab: "curves",
  activeDeskDestination: "CHINA",
  // Map and Animation references
  mapInstance: null,
  routePolyline: null,
  vesselMarker: null,
  vesselAnimationId: null,
  // Three.js Globe references
  globeScene: null,
  globeCamera: null,
  globeRenderer: null,
  globeMesh: null,
  globeRotating: true,
  globeAnimationId: null
};
window.STATE = STATE;

// INITIALIZATION ON DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
  initNavbarDropdown();
  initRouter();
  initThreeJsGlobe();
});

/* ==========================================================================
   1. CLIENT-SIDE CHAPTER ROUTER
   ========================================================================== */
function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash || "#/";

  if (hash.startsWith("#/chapter/")) {
    let chapterId = parseInt(hash.replace("#/chapter/", ""), 10);
    if (chapterId === 12) chapterId = 8;
    if (chapterId > 9) chapterId = 9;
    if (!isNaN(chapterId) && chapterId >= 1 && chapterId <= 9) {
      showChapterView(chapterId);
      return;
    }
  } else if (hash === "#/journey") {
    showChapterView(9); // Final Chapter 9: The Journey of One Barrel
    return;
  } else if (hash === "#/simulator") {
    showChapterView(8); // Chapter 8: The Crude Choice Simulator
    return;
  }

  // Default: Show Home Page
  showHomeView();
}

function showHomeView() {
  const homeView = document.getElementById("viewHome");
  const chapterView = document.getElementById("viewChapter");
  if (homeView) homeView.style.display = "block";
  if (chapterView) chapterView.style.display = "none";

  // Update Navbar Links
  updateNavActiveState("home");

  // Render Home Chapter Directory Grid & Citations
  renderHomeChapterGrid();
  renderHomeCitations();

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showChapterView(chapterId) {
  const homeView = document.getElementById("viewHome");
  const chapterView = document.getElementById("viewChapter");
  if (homeView) homeView.style.display = "none";
  if (chapterView) chapterView.style.display = "block";

  STATE.currentChapterId = chapterId;

  // Update Navbar Links
  updateNavActiveState(`chapter-${chapterId}`);

  // Render Chapter Content
  renderChapterContent(chapterId);

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateNavActiveState(activeKey) {
  const navHome = document.getElementById("navLinkHome");
  const navJourney = document.getElementById("navLinkJourney");
  const navSim = document.getElementById("navLinkSimulator");
  const navChapters = document.getElementById("navBtnChapters");

  [navHome, navJourney, navSim, navChapters].forEach(el => {
    if (el) el.classList.remove("active");
  });

  if (activeKey === "home" && navHome) {
    navHome.classList.add("active");
  } else if (activeKey === "chapter-9" && navJourney) {
    navJourney.classList.add("active");
  } else if (activeKey === "chapter-8" && navSim) {
    navSim.classList.add("active");
  } else if (navChapters) {
    navChapters.classList.add("active");
  }
}

function initNavbarDropdown() {
  const menu = document.getElementById("navDropdownMenu");
  if (!menu || !OIL_DATA.chapters) return;

  menu.innerHTML = OIL_DATA.chapters.map(c => `
    <a href="#/chapter/${c.id}" class="nav-dropdown-item" onclick="closeChapterMenu()">
      <span class="nav-dropdown-num">${c.number}</span>
      <div>
        <div style="font-weight:700; color:#111827;">${c.title}</div>
        <div style="font-size:11px; color:#6B7280;">${c.subtitle}</div>
      </div>
    </a>
  `).join("");
}

function toggleChapterMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById("navDropdownMenu");
  if (menu) menu.classList.toggle("show");
}

function closeChapterMenu() {
  const menu = document.getElementById("navDropdownMenu");
  if (menu) menu.classList.remove("show");
}

document.addEventListener("click", () => {
  closeChapterMenu();
});

/* ==========================================================================
   2. HOME PAGE BUILDER
   ========================================================================== */
function renderHomeChapterGrid() {
  const grid = document.getElementById("homeChapterGrid");
  if (!grid || !OIL_DATA.chapters) return;

  grid.innerHTML = OIL_DATA.chapters.map(c => `
    <a href="#/chapter/${c.id}" class="chapter-card">
      <div>
        <div class="chapter-card-num">${c.sectionTag}</div>
        <h3 class="chapter-card-title">${c.number}. ${c.title}</h3>
        <div style="font-size:12px; font-weight:600; color:#d97706; margin-bottom:8px;">${c.subtitle}</div>
        <p class="chapter-card-desc">${c.summary}</p>
      </div>
      <div class="chapter-card-link">
        Read Chapter ${c.number} &rarr;
      </div>
    </a>
  `).join("");
}

function renderHomeCitations() {
  const container = document.getElementById("homeCitationsContainer");
  if (!container || !OIL_DATA.citations) return;

  container.innerHTML = OIL_DATA.citations.map(c => `
    <div class="citation-card">
      <div class="citation-source">${c.source}</div>
      <div class="citation-doc">${c.document}</div>
      <div style="margin-top:6px; font-size:12px; color:#374151;">
        ${c.verificationNote}
      </div>
      <div style="margin-top:8px;">
        <a href="${c.url}" target="_blank" rel="noopener" style="font-family:var(--font-mono); font-size:11px; color:var(--color-atlantic-marine); text-decoration:none; font-weight:700;">
          Verify Primary Documentation &rarr;
        </a>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   3. DEDICATED CHAPTER CONTENT RENDERER
   ========================================================================== */
function renderChapterContent(chapterId) {
  const container = document.getElementById("viewChapter");
  if (!container || !OIL_DATA.chapters) return;

  const c = OIL_DATA.chapters.find(ch => ch.id === chapterId) || OIL_DATA.chapters[0];
  const totalChapters = OIL_DATA.chapters.length;

  const prevId = chapterId > 1 ? chapterId - 1 : null;
  const nextId = chapterId < totalChapters ? chapterId + 1 : null;
  const prevChapter = prevId ? OIL_DATA.chapters.find(ch => ch.id === prevId) : null;
  const nextChapter = nextId ? OIL_DATA.chapters.find(ch => ch.id === nextId) : null;

  // Chapter Hero & 3-Question Framework
  let html = `
    <!-- CHAPTER HERO HEADER -->
    <div class="chapter-hero">
      <span class="chapter-meta-tag">${c.sectionTag} &bull; CHAPTER ${c.number} OF ${totalChapters}</span>
      <h1 class="chapter-hero-title">${c.number}. ${c.title}</h1>
      <p class="chapter-hero-subtitle">${c.subtitle}</p>
    </div>

    <!-- MANDATORY 3-QUESTION FRAMEWORK (HIGH CONTRAST) -->
    <div class="triad-framework" style="border-radius:var(--radius-lg); margin-bottom:28px;">
      <div class="triad-box">
        <div class="triad-label">
          <span>🔍</span> What is this?
        </div>
        <div class="triad-text">${c.whatIsThis}</div>
      </div>
      <div class="triad-box why">
        <div class="triad-label">
          <span>⚖️</span> Why does it matter to Asia?
        </div>
        <div class="triad-text">${c.whyItMatters}</div>
      </div>
      <div class="triad-box impact">
        <div class="triad-label">
          <span>📈</span> Trading impact &amp; Who wins/loses
        </div>
        <div class="triad-text">${c.tradingImpact}</div>
      </div>
    </div>

    <!-- CHAPTER-SPECIFIC VISUAL CONTENT BLOCK -->
    <div class="chapter-visual-wrapper">
  `;

  // Inject Chapter-Specific Visual Blocks (Chapters 1 to 9)
  if (chapterId === 1) {
    html += renderChapter1Visual();
  } else if (chapterId === 2) {
    html += renderChapter2Visual();
  } else if (chapterId === 3) {
    html += renderChapter3Visual();
  } else if (chapterId === 4) {
    html += renderChapter4Visual();
  } else if (chapterId === 5) {
    html += renderChapter5Visual();
  } else if (chapterId === 6) {
    html += renderChapter6Visual();
  } else if (chapterId === 7) {
    html += renderChapter7Visual();
  } else if (chapterId === 8) {
    html += renderChapter12Visual(); // Chapter 08: 7-Crude Delivered Cost Calculator
  } else if (chapterId === 9) {
    html += renderChapter8Visual();  // Final Chapter 09: The Journey of One Barrel
  }

  // Inject Universal Maritime Intelligence Map for Chapter 9 only
  if (chapterId === 9) {
    html += `
      <div class="section-block" style="margin-top:24px;">
        <div class="section-header">
          <div>
            <div class="section-tag">KPLER / VORTEXA MARITIME INTELLIGENCE TERMINAL // FINAL CHAPTER</div>
            <h3 class="section-title">Live AIS Tanker Telemetry, Nautical Seamarks &amp; Deep-Water Corridors</h3>
            <div class="section-subtitle">Switch imagery or select vessels to inspect live AIS position and cargo manifest.</div>
          </div>
        </div>
        <div class="section-body">
          <div id="chapterUniversalMaritimeMap_${chapterId}" style="width:100%; height:460px; border-radius:10px; border:1.5px solid #0f172a;"></div>
        </div>
      </div>
    `;
  }

  // Bottom Chapter Navigation Bar (← Previous Chapter | Selector | Next Chapter →)
  html += `
    </div>

    <div class="chapter-nav-bar">
      ${prevChapter ? `
        <a href="#/chapter/${prevChapter.id}" class="chapter-nav-btn">
          <span class="chapter-nav-label">&larr; Previous Chapter</span>
          <span class="chapter-nav-title">${prevChapter.number}. ${prevChapter.title}</span>
        </a>
      ` : `
        <div class="chapter-nav-btn disabled">
          <span class="chapter-nav-label">&larr; First Chapter</span>
          <span class="chapter-nav-title">Overview Home</span>
        </div>
      `}

      <div class="chapter-nav-center">
        <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase;">
          Chapter ${c.number} of ${totalChapters}
        </span>
        <select class="chapter-quick-jump" onchange="window.location.hash = this.value">
          ${OIL_DATA.chapters.map(ch => `
            <option value="#/chapter/${ch.id}" ${ch.id === chapterId ? 'selected' : ''}>
              ${ch.number}. ${ch.title}
            </option>
          `).join("")}
        </select>
      </div>

      ${nextChapter ? `
        <a href="#/chapter/${nextChapter.id}" class="chapter-nav-btn" style="text-align:right;">
          <span class="chapter-nav-label">Next Chapter &rarr;</span>
          <span class="chapter-nav-title">${nextChapter.number}. ${nextChapter.title}</span>
        </a>
      ` : `
        <a href="#/" class="chapter-nav-btn" style="text-align:right;">
          <span class="chapter-nav-label">Finish Reading &rarr;</span>
          <span class="chapter-nav-title">Back to Overview Home</span>
        </a>
      `}
    </div>
  `;

  container.innerHTML = html;

  // Post-render lifecycle: initialize interactive map or tools for this chapter
  setTimeout(() => {
    if (chapterId === 1) {
      initChapter1EcosystemMap();
    } else if (chapterId === 2) {
      initChapter2DemandMap();
    } else if (chapterId === 3) {
      updateOspVisualizer();
      initChapter3FreightMap();
    } else if (chapterId === 4) {
      initChapter4Simulator();
    } else if (chapterId === 5) {
      initChapter5AtlanticRussiaMap();
      updateAtlanticCompSim();
    } else if (chapterId === 6) {
      setMocStep(0);
    } else if (chapterId === 7) {
      initTankerRouteMap();
    } else if (chapterId === 8) {
      initArbitrageCalculator(); // Chapter 08: 7-Crude Delivered Cost Calculator
    } else if (chapterId === 9) {
      initJourneyOfOneBarrel();  // Final Chapter 09: The Journey of One Barrel
    }

    if (chapterId === 9) {
      const uniMapId = `chapterUniversalMaritimeMap_${chapterId}`;
      const uniEl = document.getElementById(uniMapId);
      if (uniEl && typeof L !== "undefined") {
        L.map(uniMapId, { center: [20.0, 82.0], zoom: 4 });
      }
    }
  }, 60);
}

/* ==========================================================================
   4. CHAPTER VISUAL GENERATORS (CHAPTERS 1 TO 12)
   ========================================================================== */

// ============================================================================
// CHAPTER 1: DUBAI / OMAN ECOSYSTEM & THE 9 MIDDLE EASTERN GRADES
// ============================================================================
function renderChapter1Visual() {
  const eco = OIL_DATA.dubaiOmanEcosystem;
  const dubai = eco.dubaiProfile;
  const oman = eco.omanProfile;

  const flowNodesHtml = eco.animatedFlowStages.map((st, idx) => `
    <div class="eco-flow-node ${idx === 0 ? 'active' : ''}" id="ecoFlowNode_${idx}" onclick="selectEcoFlowStage(${idx})">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:28px;">${st.icon}</span>
        <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#990000; background:#fee2e2; padding:2px 8px; border-radius:99px;">
          STAGE ${st.step}
        </span>
      </div>
      <h4 style="font-family:var(--font-serif); font-size:17px; font-weight:800; color:#0f172a; margin-bottom:4px;">
        ${st.title}
      </h4>
      <div style="font-size:12px; font-weight:700; color:#b45309; margin-bottom:6px;">
        ${st.subtitle}
      </div>
      <div style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:#0f172a; background:#f1f5f9; padding:4px 8px; border-radius:4px; margin-bottom:8px;">
        ${st.metric}
      </div>
      <p style="font-size:12px; color:#1e293b; line-height:1.45;">
        ${st.plainDesc}
      </p>
    </div>
  `).join("");

  const nineGradesHtml = eco.nineMiddleEastGrades.map(g => {
    const weightBg = g.weightCategory.includes("Light") ? "#e0f2fe" : g.weightCategory.includes("Heavy") ? "#fef2f2" : "#fef3c7";
    const weightColor = g.weightCategory.includes("Light") ? "#0369a1" : g.weightCategory.includes("Heavy") ? "#b91c1c" : "#b45309";

    return `
      <div class="grade-card-pro">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div>
              <span style="font-size:18px; margin-right:6px;">${g.flag}</span>
              <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:#334155; text-transform:uppercase;">${g.country}</span>
              <h4 style="font-family:var(--font-serif); font-size:21px; font-weight:800; color:#0f172a; margin-top:2px;">${g.name}</h4>
            </div>
            <button class="action-btn" style="padding:4px 10px; font-size:11px; font-weight:700;" onclick="focusGradeOnChapter1Map('${g.id}')">
              📍 Map
            </button>
          </div>

          <!-- Badges: API, Sulfur, Light/Medium/Heavy, Sweet/Sour -->
          <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
            <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; background:#f1f5f9; color:#0f172a; padding:3px 8px; border-radius:4px; border:1px solid #cbd5e1;">
              API: ${g.api}°
            </span>
            <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; background:#fff1f2; color:#990000; padding:3px 8px; border-radius:4px; border:1px solid #fecdd3;">
              Sulfur: ${g.sulfur}%
            </span>
            <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; background:${weightBg}; color:${weightColor}; padding:3px 8px; border-radius:4px;">
              ${g.weightCategory}
            </span>
            <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:4px;">
              ${g.sweetSour}
            </span>
          </div>

          <div style="font-size:13px; color:#1e293b; line-height:1.5; margin-bottom:10px; background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
            <div style="margin-bottom:4px;"><strong>🛢️ Oil Fields:</strong> ${g.productionLocation}</div>
            <div style="margin-bottom:4px;"><strong>⚓ Export Terminal:</strong> ${g.terminal}</div>
            <div><strong>🌏 Typical Asian Buyers:</strong> ${g.typicalBuyers}</div>
          </div>

          <p style="font-size:12.5px; color:#1e293b; line-height:1.5;">
            ${g.plainSummary}
          </p>
        </div>
      </div>
    `;
  }).join("");

  return `
    <!-- 1. DUBAI VS OMAN PRODUCTION & SUPPLY COMPARISON -->
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:28px;">
      <!-- Dubai Card -->
      <div class="buyer-card" style="border-top:4px solid #d97706;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309; background:#fef3c7; padding:3px 10px; border-radius:4px;">
            🇦🇪 UNITED ARAB EMIRATES (DUBAI)
          </span>
          <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0f172a;">
            ${dubai.api}° API &bull; ${dubai.sulfur}% Sulfur (${dubai.densityClass} ${dubai.sulfurClass})
          </span>
        </div>
        <h3 style="font-family:var(--font-serif); font-size:24px; font-weight:800; color:#0f172a; margin-bottom:8px;">
          Where Dubai Crude Is Produced
        </h3>
        <div style="font-size:13.5px; color:#1e293b; line-height:1.6; space-y:6px;">
          <p style="margin-bottom:8px;"><strong>📍 Production Location:</strong> ${dubai.productionLocation}</p>
          <p style="margin-bottom:8px;"><strong>🛢️ Supplying Oil Fields:</strong> ${dubai.supplyingFields.join(" • ")}</p>
          <p style="margin-bottom:8px;"><strong>⚓ Export Terminal:</strong> ${dubai.exportTerminal}</p>
          <p style="margin-bottom:8px;"><strong>🚢 Shipping Route to Asia:</strong> ${dubai.shippingRoute}</p>
          <p style="margin-bottom:8px;"><strong>🏭 Main Buyers in Asia:</strong> ${dubai.mainBuyers.join(", ")}</p>
        </div>
      </div>

      <!-- Oman Card -->
      <div class="buyer-card" style="border-top:4px solid #059669;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#065f46; background:#d1fae5; padding:3px 10px; border-radius:4px;">
            🇴🇲 SULTANATE OF OMAN (HORMUZ-FREE!)
          </span>
          <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0f172a;">
            ${oman.api}° API &bull; ${oman.sulfur}% Sulfur (${oman.densityClass} ${oman.sulfurClass})
          </span>
        </div>
        <h3 style="font-family:var(--font-serif); font-size:24px; font-weight:800; color:#0f172a; margin-bottom:8px;">
          Where Oman Crude Is Produced
        </h3>
        <div style="font-size:13.5px; color:#1e293b; line-height:1.6;">
          <p style="margin-bottom:8px;"><strong>📍 Production Location:</strong> ${oman.productionLocation}</p>
          <p style="margin-bottom:8px;"><strong>🛢️ Supplying Oil Fields:</strong> ${oman.supplyingFields.join(" • ")}</p>
          <p style="margin-bottom:8px;"><strong>⚓ Export Terminal:</strong> ${oman.exportTerminal}</p>
          <p style="margin-bottom:8px;"><strong>🚢 Shipping Route to Asia:</strong> ${oman.shippingRoute}</p>
          <p style="margin-bottom:8px;"><strong>🏭 Main Buyers in Asia:</strong> ${oman.mainBuyers.join(", ")}</p>
        </div>
      </div>
    </div>

    <!-- 2. ANIMATED FLOW DIAGRAM: OIL FIELD -> GATHERING -> TERMINAL -> TANKER -> ASIA -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">ANIMATED SUPPLY CHAIN CONDUIT</div>
          <h3 class="section-title">How Middle Eastern Oil Moves from Underground Rock to Asian Refineries</h3>
          <div class="section-subtitle">Click any stage in the animated pipeline &amp; shipping flow below to inspect the infrastructure</div>
        </div>
        <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#d97706;">
          ⚡ LIVE ANIMATED FLOW: 14.5 MILLION BARRELS / DAY
        </span>
      </div>
      <div class="section-body">
        <!-- Animated Flowing Oil Pipeline Bar -->
        <div class="eco-pipe-connector" title="Animated Crude Flow"></div>

        <!-- 5 Stage Nodes -->
        <div class="eco-flow-track">
          ${flowNodesHtml}
        </div>

        <!-- Active Flow Stage Spotlight Banner -->
        <div id="ecoFlowSpotlight" style="background:#fffbeb; border:1.5px solid #f59e0b; border-radius:10px; padding:16px 20px; margin-top:12px;">
          <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309; text-transform:uppercase;">
            SELECTED FLOW STAGE DETAIL
          </div>
          <div id="ecoFlowSpotlightText" style="font-size:14px; font-weight:600; color:#0f172a; margin-top:4px;">
            Stage 1 (Oil Field): Deep limestone reservoirs in Oman (Fahud/Yibal), Dubai (Fateh), Abu Dhabi (Bab/Upper Zakum), Saudi Arabia (Ghawar/Safaniya), and Iraq (Rumaila) push crude oil to the surface under natural pressure.
          </div>
        </div>
      </div>
    </div>

    <!-- 3. INTERACTIVE ECOSYSTEM MAP (FIELDS, TERMINALS & ROUTES TO ASIA) -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">INTERACTIVE CARTOGRAPHY // PERSIAN GULF, OMAN &amp; ASIAN SEA LANES</div>
          <h3 class="section-title">Dubai, Oman &amp; Middle East Oil Fields, Export Terminals &amp; Tanker Routes</h3>
          <div class="section-subtitle">Click any marker or use the buttons below to zoom between Middle East production fields, Hormuz bypass ports, and Asian buyers</div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <button class="map-pill-btn active" onclick="zoomChapter1Map('gulf')">Persian Gulf &amp; Oman Fields</button>
          <button class="map-pill-btn" onclick="zoomChapter1Map('oman_fujairah')">Mina al Fahal &amp; Fujairah (Outside Hormuz)</button>
          <button class="map-pill-btn" onclick="zoomChapter1Map('full_route')">Full Tanker Routes to Asia</button>
        </div>
      </div>
      <div class="section-body">
        <div id="chapter1EcoMap" style="width:100%; height:490px; border-radius:10px; border:1.5px solid #cbd5e1;"></div>
      </div>
    </div>

    <!-- 4. ALL 9 MAJOR MIDDLE EASTERN GRADES DIRECTORY -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">COMPLETE GRADE ENCYCLOPEDIA</div>
          <h3 class="section-title">The 9 Major Middle Eastern Crude Grades Explained</h3>
          <div class="section-subtitle">Comparing Production Location, Country, API Gravity, Sulfur %, Weight Class, Sweet/Sour Profile, and Typical Asian Buyers</div>
        </div>
      </div>
      <div class="section-body">
        <div class="grades-grid-9">
          ${nineGradesHtml}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 2: ASIAN CRUDE DEMAND (CHINA, INDIA, JAPAN, SOUTH KOREA)
// ============================================================================
function renderChapter2Visual() {
  const buyers = OIL_DATA.asianBuyers;
  const buyerKeys = Object.keys(buyers);
  const refineries = OIL_DATA.asianRefineriesList;

  const consumedByCountry = {
    china: "Oman Blend (80% of Oman's output), Russian ESPO (pipeline & Kozmino shuttle), Saudi Arab Light & Arab Heavy, Iraqi Basrah Heavy, Russian Urals, West African Cabinda, Brazilian Tupi",
    india: "Russian Urals (#1 imported grade at ~1.8 Mb/d), Iraqi Basrah Heavy & Basrah Medium, Saudi Arab Light & Arab Medium, UAE Murban & Upper Zakum, Nigerian Bonny Light",
    japan: "UAE Murban & Das Blend, Saudi Arab Light & Arab Extra Light, Upper Zakum, Qatar Land/Marine, Kuwait Export Crude, Oman Blend (Zero Russian crude)",
    southKorea: "Saudi Arab Light & Arab Medium (S-Oil Onsan), US WTI Midland (18% share — 0% FTA tariff), UAE Murban & Upper Zakum, Iraqi Basrah Medium, North Sea Forties"
  };

  const countryCardsHtml = buyerKeys.map(k => {
    const b = buyers[k];
    const barsHtml = b.crudeSourceSplit.map(s => `
      <div style="margin-bottom:6px;">
        <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:#0f172a; margin-bottom:2px;">
          <span>${s.source}</span>
          <span>${s.share}% (${s.volume} Mb/d)</span>
        </div>
        <div style="width:100%; height:8px; background:#e2e8f0; border-radius:99px; overflow:hidden;">
          <div style="width:${s.share}%; height:100%; background:${s.color}; border-radius:99px;"></div>
        </div>
      </div>
    `).join("");

    return `
      <div class="buyer-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:28px;">${b.flag}</span>
            <div>
              <h3 style="font-family:var(--font-serif); font-size:22px; font-weight:800; color:#0f172a;">${b.name}</h3>
              <div style="font-family:var(--font-mono); font-size:11px; color:#334155;">Refining Capacity: ${b.refiningCapacityMbd} Mb/d</div>
            </div>
          </div>
          <span style="font-family:var(--font-mono); font-size:13px; font-weight:800; color:#990000; background:#fee2e2; padding:4px 10px; border-radius:6px;">
            Imports: ${b.totalImportsMbd} Mb/d
          </span>
        </div>

        <div style="background:#f8fafc; padding:12px; border-radius:8px; margin-bottom:12px; border:1px solid #cbd5e1;">
          <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0f172a; text-transform:uppercase; margin-bottom:8px;">
            📊 Where ${b.name} Buys Its Crude Oil:
          </div>
          ${barsHtml}
        </div>

        <div style="font-size:13px; color:#1e293b; line-height:1.5; margin-bottom:8px;">
          <strong>🛢️ Specific Crude Grades Consumed:</strong> ${consumedByCountry[k]}
        </div>
        <div style="font-size:12.5px; color:#1e293b; line-height:1.5;">
          <strong>🏭 Major Refiners:</strong> ${b.buyerStructure}
        </div>
      </div>
    `;
  }).join("");

  const refineryCardsHtml = refineries.map(r => `
    <div class="grade-card-pro" style="padding:14px;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#990000;">
            ${r.flag} ${r.country.toUpperCase()} &bull; ${r.capacityKbd.toLocaleString()} kb/d
          </span>
          <button class="action-btn" style="padding:3px 8px; font-size:11px; font-weight:700;" onclick="focusRefineryOnChapter2Map('${r.id}')">
            📍 View on Map
          </button>
        </div>
        <h4 style="font-family:var(--font-serif); font-size:17px; font-weight:800; color:#0f172a; margin-bottom:2px;">
          ${r.name}
        </h4>
        <div style="font-size:12px; font-weight:700; color:#b45309; margin-bottom:6px;">
          ${r.city} &bull; Nelson Complexity: ${r.nelsonComplexity}
        </div>
        <div style="font-size:12px; color:#1e293b; margin-bottom:4px;">
          <strong>Sources:</strong> ${r.crudeSources}
        </div>
        <div style="font-size:12px; color:#1e293b;">
          <strong>Grades Consumed:</strong> ${r.consumedGrades.join(", ")}
        </div>
      </div>
    </div>
  `).join("");

  return `
    <!-- 1. INTERACTIVE REFINERY & IMPORT FLOW MAP -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">INTERACTIVE REFINERY &amp; IMPORT FLOW ATLAS</div>
          <h3 class="section-title">Asian Mega-Refineries &amp; Animated Seaborne Import Corridors</h3>
          <div class="section-subtitle">Showing all 12 flagship coastal refineries and animated crude import routes from the Middle East, Russia, and Atlantic Basin</div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <button class="map-pill-btn active" onclick="filterChapter2Map('all')">All Asia + Import Routes</button>
          <button class="map-pill-btn" onclick="filterChapter2Map('China')">🇨🇳 China (11.5 Mb/d)</button>
          <button class="map-pill-btn" onclick="filterChapter2Map('India')">🇮🇳 India (4.9 Mb/d)</button>
          <button class="map-pill-btn" onclick="filterChapter2Map('Japan')">🇯🇵 Japan (2.5 Mb/d)</button>
          <button class="map-pill-btn" onclick="filterChapter2Map('South Korea')">🇰🇷 South Korea (3.0 Mb/d)</button>
        </div>
      </div>
      <div class="section-body">
        <div id="chapter2DemandMap" style="width:100%; height:500px; border-radius:10px; border:1.5px solid #cbd5e1;"></div>
      </div>
    </div>

    <!-- 2. THE 4 ASIAN BUYERS BREAKDOWN -->
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:28px;">
      ${countryCardsHtml}
    </div>

    <!-- 3. MAJOR ASIAN REFINERIES DIRECTORY -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">COASTAL REFINING INFRASTRUCTURE</div>
          <h3 class="section-title">12 Flagship Asian Refineries &amp; What Crude They Consume</h3>
          <div class="section-subtitle">Click 'View on Map' on any refinery card to fly directly to its port terminal</div>
        </div>
      </div>
      <div class="section-body">
        <div class="grades-grid-9">
          ${refineryCardsHtml}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 3: OFFICIAL SELLING PRICES (OSP) + SHIPPING & FREIGHT
// ============================================================================
function renderChapter3Visual() {
  const vessels = OIL_DATA.vesselClasses;

  const vesselSvgIllustrations = {
    vlcc: `
      <svg viewBox="0 0 500 120" width="100%" height="110" class="vessel-ship-anim">
        <!-- Hull -->
        <polygon points="20,65 450,65 480,45 480,85 440,95 35,95" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
        <!-- Red Waterline Anti-fouling Bottom -->
        <polygon points="32,82 465,82 440,95 35,95" fill="#990000"/>
        <!-- Bridge Superstructure (Aft) -->
        <rect x="45" y="25" width="32" height="40" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="50" y="15" width="18" height="10" fill="#d97706"/>
        <!-- Deck Manifold Pipes & 5 Cargo Tanks -->
        <rect x="95" y="57" width="60" height="8" rx="2" fill="#d97706"/>
        <rect x="165" y="57" width="60" height="8" rx="2" fill="#d97706"/>
        <rect x="235" y="57" width="60" height="8" rx="2" fill="#d97706"/>
        <rect x="305" y="57" width="60" height="8" rx="2" fill="#d97706"/>
        <rect x="375" y="57" width="60" height="8" rx="2" fill="#d97706"/>
        <!-- Dimension Callout -->
        <text x="250" y="42" text-anchor="middle" fill="#0f172a" font-family="JetBrains Mono" font-size="12" font-weight="800">VLCC SUPERTANKER — 333m LENGTH (2,000,000 BARRELS)</text>
        <text x="250" y="78" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="700">DRAFT: 21.5m | 300,000 DWT</text>
      </svg>
    `,
    suezmax: `
      <svg viewBox="0 0 500 120" width="100%" height="110" class="vessel-ship-anim">
        <!-- Scaled Hull (82% of VLCC length) -->
        <polygon points="55,67 415,67 440,48 440,83 405,92 68,92" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
        <polygon points="65,81 428,81 405,92 68,92" fill="#dc2626"/>
        <!-- Bridge -->
        <rect x="75" y="30" width="28" height="37" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="80" y="21" width="14" height="9" fill="#0284c7"/>
        <!-- Cargo Tanks -->
        <rect x="120" y="59" width="65" height="8" rx="2" fill="#0284c7"/>
        <rect x="195" y="59" width="65" height="8" rx="2" fill="#0284c7"/>
        <rect x="270" y="59" width="65" height="8" rx="2" fill="#0284c7"/>
        <rect x="345" y="59" width="55" height="8" rx="2" fill="#0284c7"/>
        <text x="250" y="42" text-anchor="middle" fill="#0f172a" font-family="JetBrains Mono" font-size="12" font-weight="800">SUEZMAX TANKER — 274m LENGTH (1,000,000 BARRELS)</text>
        <text x="250" y="78" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="700">DRAFT: 17.0m | SUEZ CANAL MAX</text>
      </svg>
    `,
    aframax: `
      <svg viewBox="0 0 500 120" width="100%" height="110" class="vessel-ship-anim">
        <!-- Scaled Hull (73% of VLCC length) -->
        <polygon points="90,69 385,69 408,52 408,82 378,90 100,90" fill="#334155" stroke="#ffffff" stroke-width="1.5"/>
        <polygon points="98,80 396,80 378,90 100,90" fill="#059669"/>
        <!-- Bridge -->
        <rect x="108" y="34" width="24" height="35" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="112" y="26" width="12" height="8" fill="#059669"/>
        <!-- Cargo Tanks -->
        <rect x="145" y="61" width="70" height="8" rx="2" fill="#059669"/>
        <rect x="225" y="61" width="70" height="8" rx="2" fill="#059669"/>
        <rect x="305" y="61" width="65" height="8" rx="2" fill="#059669"/>
        <text x="250" y="42" text-anchor="middle" fill="#0f172a" font-family="JetBrains Mono" font-size="12" font-weight="800">AFRAMAX TANKER — 245m LENGTH (700,000 BARRELS)</text>
        <text x="250" y="78" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono" font-size="10" font-weight="700">DRAFT: 14.8m | SHALLOW PORT SHUTTLE</text>
      </svg>
    `
  };

  const vesselsHtml = vessels.map(v => `
    <div class="vessel-blueprint-card">
      <div class="vessel-svg-stage">
        ${vesselSvgIllustrations[v.id]}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <h4 style="font-family:var(--font-serif); font-size:21px; font-weight:800; color:#0f172a;">${v.name}</h4>
        <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#990000; background:#fee2e2; padding:3px 10px; border-radius:4px;">
          ${v.barrels}
        </span>
      </div>
      <div style="font-size:12.5px; font-weight:700; color:#b45309; margin-bottom:10px;">${v.tagline}</div>
      <div style="background:#f8fafc; padding:10px 12px; border-radius:6px; border:1px solid #cbd5e1; font-size:12.5px; color:#1e293b; margin-bottom:10px;">
        <div style="margin-bottom:4px;"><strong>📏 Dimensions:</strong> ${v.length} long &times; ${v.beam} wide &times; ${v.draft} deep</div>
        <div style="margin-bottom:4px;"><strong>💰 Freight Cost:</strong> ${v.freightCostPerBbl}</div>
        <div style="margin-bottom:4px;"><strong>🧭 Main Routes:</strong> ${v.keyRoutes}</div>
        <div><strong>🚧 Canal / Port Limit:</strong> ${v.canalLimit}</div>
      </div>
      <p style="font-size:13px; color:#1e293b; line-height:1.5;">
        ${v.plainExplanation}
      </p>
    </div>
  `).join("");

  return `
    <!-- SECTION 1: EXPLAIN OSP SIMPLY + INTERACTIVE OSP VISUALIZER -->
    <div class="section-block" style="margin-bottom:32px;">
      <div class="section-header">
        <div>
          <div class="section-tag">SECTION 1 // OFFICIAL SELLING PRICES (OSP) EXPLAINED SIMPLY</div>
          <h3 class="section-title">What Is an OSP and How Does It Price Asian Oil?</h3>
          <div class="section-subtitle">Plain-English guide + interactive monthly OSP price builder</div>
        </div>
      </div>
      <div class="section-body">
        <!-- 3 Simple Explanations -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;">
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:16px;">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#990000; margin-bottom:6px;">1. WHAT IS OSP?</div>
            <h4 style="font-family:var(--font-serif); font-size:18px; font-weight:800; color:#0f172a; margin-bottom:6px;">The Monthly Price Adjustment</h4>
            <p style="font-size:13px; color:#1e293b; line-height:1.5;">
              <strong>OSP (Official Selling Price)</strong> is a monthly dollar premium (like <strong>+$1.80/bbl</strong>) or discount (like <strong>-$0.70/bbl</strong>) announced around the 5th of every month by state oil producers like Saudi Aramco, ADNOC, and SOMO.
            </p>
          </div>
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:16px;">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309; margin-bottom:6px;">2. HOW DOES IT WORK?</div>
            <h4 style="font-family:var(--font-serif); font-size:18px; font-weight:800; color:#0f172a; margin-bottom:6px;">Benchmark + OSP = Your Invoice</h4>
            <p style="font-size:13px; color:#1e293b; line-height:1.5;">
              Saudi Aramco does not set a flat price like $75. Instead, the formula is:<br>
              <strong style="color:#990000;">Final Price = Monthly Average of Dubai/Oman ± OSP</strong>.<br>
              If Dubai/Oman averages $74.00 and Arab Light OSP is +$1.80, the refiner pays <strong>$75.80/bbl</strong>.
            </p>
          </div>
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:16px;">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#059669; margin-bottom:6px;">3. WHY DOES IT MATTER?</div>
            <h4 style="font-family:var(--font-serif); font-size:18px; font-weight:800; color:#0f172a; margin-bottom:6px;">Triggers Global Crude Switching</h4>
            <p style="font-size:13px; color:#1e293b; line-height:1.5;">
              When Aramco raises OSP too high, Asian refiners reduce their Middle East cargo requests and buy <strong>US WTI Midland</strong> or <strong>Russian Urals</strong> instead. When Aramco cuts OSP, Asia rushes back to Saudi barrels.
            </p>
          </div>
        </div>

        <!-- INTERACTIVE OSP VISUALIZER -->
        <div style="background:#fffbeb; border:2px solid #f59e0b; border-radius:12px; padding:22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
            <div>
              <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309; text-transform:uppercase;">INTERACTIVE SIMULATOR</span>
              <h4 style="font-family:var(--font-serif); font-size:22px; font-weight:800; color:#0f172a;">Interactive Monthly OSP Price Visualizer</h4>
              <div style="font-size:13px; color:#334155; margin-top:2px;">Move the sliders or click a crude grade to see how the monthly price tag changes what Asian buyers do.</div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;" id="ospPresetBtnGroup">
              <button class="action-btn active" data-grade="Arab Light" onclick="setOspPreset('Arab Light', 74.0, 1.80, this)">🇸🇦 Arab Light (+$1.80 Normal)</button>
              <button class="action-btn" data-grade="Arab Heavy" onclick="setOspPreset('Arab Heavy', 74.0, -0.90, this)">🇸🇦 Arab Heavy (-$0.90 Discount)</button>
              <button class="action-btn" data-grade="Murban" onclick="setOspPreset('Murban', 74.0, 2.80, this)">🇦🇪 Murban (+$2.80 Expensive)</button>
              <button class="action-btn" data-grade="Basrah Heavy" onclick="setOspPreset('Basrah Heavy', 74.0, -3.20, this)">🇮🇶 Basrah Heavy (-$3.20 Big Sale)</button>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:stretch;">
            <!-- Sliders -->
            <div style="background:#ffffff; padding:18px; border-radius:10px; border:1.5px solid #cbd5e1; display:flex; flex-direction:column; justify-content:center;">
              <div style="margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; font-weight:800; margin-bottom:6px;">
                  <span>1. BASE MARKET OIL PRICE (DUBAI / OMAN AVERAGE):</span>
                  <span id="ospBaseDisplay" style="color:#0284c7;">$74.00 / barrel</span>
                </div>
                <input type="range" id="ospBaseSlider" min="55" max="95" step="0.50" value="74.00" oninput="updateOspVisualizer()" style="width:100%; accent-color:#0284c7; cursor:pointer;">
                <div style="font-size:11.5px; color:#475569; margin-top:4px;">The normal daily market price of Middle Eastern oil before any adjustment.</div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; font-weight:800; margin-bottom:6px;">
                  <span>2. SELLER'S MONTHLY OSP ADJUSTMENT (DISCOUNT OR MARKUP):</span>
                  <span id="ospDiffDisplay" style="color:#990000;">+$1.80 / barrel</span>
                </div>
                <input type="range" id="ospDiffSlider" min="-4.00" max="5.00" step="0.10" value="1.80" oninput="updateOspVisualizer()" style="width:100%; accent-color:#990000; cursor:pointer;">
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:10.5px; font-weight:700; color:#334155; margin-top:6px;">
                  <span style="color:#059669;">-$4.00 (Big Sale / Discount)</span>
                  <span>$0.00 (No Extra Fee)</span>
                  <span style="color:#dc2626;">+$5.00 (Very Expensive Markup)</span>
                </div>
              </div>
            </div>

            <!-- Live Invoice & Easy-to-Understand Reaction Output -->
            <div style="background:#ffffff; padding:18px; border-radius:10px; border:1.5px solid #cbd5e1;">
              <!-- Live Formula Equation Pill -->
              <div id="ospFormulaBar" style="background:#f8fafc; border:1px dashed #94a3b8; border-radius:6px; padding:7px 10px; font-family:var(--font-mono); font-size:11.5px; font-weight:700; color:#0f172a; margin-bottom:12px; text-align:center;">
                $74.00 (Base Price) + $1.80 (Monthly OSP) = <strong>$75.80 / barrel</strong>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">
                <div>
                  <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#334155;" id="ospGradeLabel">SELECTED GRADE: ARAB LIGHT</div>
                  <div style="font-size:28px; font-weight:800; font-family:var(--font-mono); color:#0f172a;" id="ospFinalInvoice">$75.80 / bbl</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#334155;">COST OF 1 SUPERTANKER (2M BARRELS)</div>
                  <div style="font-size:20px; font-weight:800; font-family:var(--font-mono); color:#990000;" id="ospCargoCost">$151,600,000</div>
                </div>
              </div>
              <div id="ospMarketReactionBox" style="padding:12px 14px; border-radius:8px; background:#fffbeb; border:1.5px solid #f59e0b; font-size:13.5px; line-height:1.55; color:#0f172a;">
                <!-- Dynamically populated in plain English by updateOspVisualizer() -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2: SHIPPING & FREIGHT (VLCC, SUEZMAX, AFRAMAX) -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">SECTION 2 // OIL TANKER CLASSES &amp; OCEAN FREIGHT</div>
          <h3 class="section-title">How Oil Tankers Work: VLCC vs Suezmax vs Aframax</h3>
          <div class="section-subtitle">Visual vessel scale profiles, barrel capacities, draft limits, and animated shipping corridors</div>
        </div>
      </div>
      <div class="section-body">
        <!-- 3 Vessel Blueprint Cards -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-bottom:24px;">
          ${vesselsHtml}
        </div>

        <!-- Interactive Vessel Class Route Map -->
        <div style="border-top:1px solid #cbd5e1; padding-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div>
              <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a;">Interactive Tanker Class Route Map</h4>
              <p style="font-size:13px; color:#1e293b;">Click a vessel class to see where VLCCs, Suezmaxes, and Aframaxes sail in the Asian crude trade</p>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="map-pill-btn active" onclick="switchChapter3VesselRoute('vlcc')">🚢 VLCC Route (Ras Tanura → China 2M bbls)</button>
              <button class="map-pill-btn" onclick="switchChapter3VesselRoute('suezmax')">⚓ Suezmax Route (Russia → Suez → India 1M bbls)</button>
              <button class="map-pill-btn" onclick="switchChapter3VesselRoute('aframax')">🚤 Aframax Shuttle (Kozmino → China 700k bbls)</button>
            </div>
          </div>
          <div id="chapter3FreightMap" style="width:100%; height:420px; border-radius:10px; border:1.5px solid #cbd5e1;"></div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 4: REFINERY PREFERENCES & INTERACTIVE MATCHMAKER SIMULATOR
// ============================================================================
function renderChapter4Visual() {
  return `
    <!-- 1. PLAIN-ENGLISH GUIDE: WHY REFINERIES CHOOSE DIFFERENT CRUDES -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:18px; margin-bottom:28px;">
      <div class="buyer-card" style="border-top:4px solid #0284c7;">
        <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0284c7;">TYPE 1 // SIMPLE HYDROSKIMMING</div>
        <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a; margin:4px 0 8px 0;">Light Sweet Buyers</h4>
        <p style="font-size:13px; color:#1e293b; line-height:1.5;">
          Simple distillation towers require low-sulfur light sweet crude (Murban, WTI Midland &lt;0.5% S) to meet clean fuel specs without advanced desulfurization.
        </p>
      </div>
      <div class="buyer-card" style="border-top:4px solid #d97706;">
        <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309;">TYPE 2 // MEDIUM HYDROCRACKING</div>
        <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a; margin:4px 0 8px 0;">Medium Sour Workhorses</h4>
        <p style="font-size:13px; color:#1e293b; line-height:1.5;">
          Refineries with hydrocrackers and hydrotreaters. Engineered to process Middle East baseloads (Arab Light, Oman, Upper Zakum) at 30°–34° API and 1.4%–2.0% S.
        </p>
      </div>
      <div class="buyer-card" style="border-top:4px solid #990000;">
        <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#990000;">TYPE 3 // ULTRA-DEEP COKING</div>
        <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a; margin:4px 0 8px 0;">Heavy Sour Bargain Hunters</h4>
        <p style="font-size:13px; color:#1e293b; line-height:1.5;">
          Mega-refineries (Jamnagar, Zhoushan) with delayed cokers crack deeply discounted heavy sour barrels (Basrah Heavy, Arab Heavy) into high-margin diesel.
        </p>
      </div>
    </div>

    <!-- 2. INTERACTIVE REFINERY PREFERENCE SIMULATOR -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">INTERACTIVE REFINERY MATCHMAKER</div>
          <h3 class="section-title">Refinery Crude Preference &amp; Product Yield Simulator</h3>
          <div class="section-subtitle">Adjust crude grade, API gravity, sulfur %, freight rate, and destination to simulate matched refinery, product yield, and net margin.</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:1.05fr 1.25fr; gap:24px;">
          
          <!-- LEFT COLUMN: 5 INPUT CONTROLS -->
          <div style="background:#f8fafc; padding:20px; border-radius:12px; border:1.5px solid #cbd5e1;">
            <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#990000; text-transform:uppercase; margin-bottom:14px;">
              🎛️ SIMULATOR INPUT PARAMETERS
            </div>

            <!-- Input 1: Crude Grade -->
            <div style="margin-bottom:14px;">
              <label style="display:block; font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0f172a; margin-bottom:6px;">
                1. SELECT CRUDE GRADE PRESET:
              </label>
              <select id="sim4GradeSelect" onchange="onSim4GradeChange()" style="width:100%; padding:9px 12px; border-radius:6px; border:1.5px solid #94a3b8; font-weight:700; color:#0f172a; background:#ffffff;">
                <option value="arab_light">🇸🇦 Arab Light (32.8° API | 1.97% Sulfur — Medium Sour)</option>
                <option value="arab_heavy">🇸🇦 Arab Heavy (27.4° API | 2.85% Sulfur — Heavy Sour)</option>
                <option value="basrah_heavy">🇮🇶 Basrah Heavy (23.5° API | 4.10% Sulfur — Ultra-Heavy Sour)</option>
                <option value="oman">🇴🇲 Oman Blend (31.3° API | 1.40% Sulfur — Medium Sour)</option>
                <option value="murban">🇦🇪 Murban (40.5° API | 0.70% Sulfur — Light Low-Sulfur)</option>
                <option value="urals">🇷🇺 Russian Urals (31.0° API | 1.48% Sulfur — Discounted Sour)</option>
                <option value="espo">🇷🇺 Russian ESPO (34.8° API | 0.55% Sulfur — Pacific Shuttle)</option>
                <option value="wti_midland">🇺🇸 US WTI Midland (42.5° API | 0.18% Sulfur — Light Sweet)</option>
              </select>
            </div>

            <!-- Input 2: Destination Country -->
            <div style="margin-bottom:14px;">
              <label style="display:block; font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0f172a; margin-bottom:6px;">
                2. DESTINATION COUNTRY IN ASIA:
              </label>
              <select id="sim4CountrySelect" onchange="runRefineryPreferenceSimulator()" style="width:100%; padding:9px 12px; border-radius:6px; border:1.5px solid #94a3b8; font-weight:700; color:#0f172a; background:#ffffff;">
                <option value="China">🇨🇳 China (Ningbo / Zhoushan / Qingdao)</option>
                <option value="India">🇮🇳 India (Jamnagar / Vadinar / Paradip)</option>
                <option value="Japan">🇯🇵 Japan (Chiba / Tokyo Bay / Mizushima)</option>
                <option value="South Korea">🇰🇷 South Korea (Ulsan / Yeosu / Onsan)</option>
              </select>
            </div>

            <!-- Input 3: API Gravity Slider -->
            <div style="margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; font-weight:800; margin-bottom:4px;">
                <span>3. API GRAVITY (HEAVY 22° &rarr; LIGHT 45°):</span>
                <span id="sim4ApiVal" style="color:#0284c7;">32.8° API</span>
              </div>
              <input type="range" id="sim4ApiSlider" min="22.0" max="45.0" step="0.5" value="32.8" oninput="runRefineryPreferenceSimulator()" style="width:100%; accent-color:#0284c7; cursor:pointer;">
            </div>

            <!-- Input 4: Sulfur % Slider -->
            <div style="margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; font-weight:800; margin-bottom:4px;">
                <span>4. SULFUR CONTENT (SWEET 0.1% &rarr; SOUR 4.2%):</span>
                <span id="sim4SulfurVal" style="color:#990000;">1.97% S</span>
              </div>
              <input type="range" id="sim4SulfurSlider" min="0.10" max="4.20" step="0.05" value="1.97" oninput="runRefineryPreferenceSimulator()" style="width:100%; accent-color:#990000; cursor:pointer;">
            </div>

            <!-- Input 5: Freight Cost Slider -->
            <div style="margin-bottom:6px; background:#f0fdf4; padding:10px 12px; border-radius:8px; border:1.5px solid #86efac;" id="sim4FreightBox">
              <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:11px; font-weight:800; margin-bottom:4px;">
                <span style="color:#0f172a;">5. TANKER FREIGHT COST ($/BBL):</span>
                <span id="sim4FreightVal" style="color:#059669; font-size:12.5px; background:#ffffff; padding:2px 8px; border-radius:4px; border:1px solid #86efac;">$2.15 / bbl ($4.30M / VLCC)</span>
              </div>
              <input type="range" id="sim4FreightSlider" min="0.90" max="6.00" step="0.05" value="2.15" oninput="runRefineryPreferenceSimulator()" style="width:100%; accent-color:#059669; cursor:pointer;">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:9.5px; color:#475569; font-weight:700; margin-top:3px;">
                <span>$0.90 (Short-Haul)</span>
                <span>$2.15 (Base Gulf VLCC)</span>
                <span>$6.00 (Spike Rate)</span>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: 4 LIVE OUTPUTS + FREIGHT VERDICT + STACKED PRODUCT YIELD -->
          <div style="background:#ffffff; padding:20px; border-radius:12px; border:1.5px solid #cbd5e1; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:6px;">
                <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#059669; text-transform:uppercase;">
                  ✅ LIVE SIMULATOR OUTPUTS &amp; REFINERY MATCH
                </div>
                <div id="sim4FreightBadge" style="font-family:var(--font-mono); font-size:10.5px; font-weight:800; padding:3px 9px; border-radius:999px; background:#dcfce7; color:#166534; border:1px solid #86efac;">
                  🚢 FREIGHT STATUS: PROFITABLE VOYAGE ($4.30M / VLCC)
                </div>
              </div>

              <!-- Live Plain-English Freight & Arbitrage Impact Banner -->
              <div id="sim4FreightImpactBanner" style="background:#ecfdf5; border:1.5px solid #6ee7b7; border-left:5px solid #059669; padding:8px 12px; border-radius:8px; margin-bottom:12px; font-size:12px; color:#065f46; line-height:1.4; font-weight:600;">
                🟢 <strong>LOW FREIGHT ($2.15/bbl · $4.30M/VLCC):</strong> Healthy net margin (+7.65/bbl). Books full 2M-bbl VLCC.
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
                <div style="background:#f8fafc; padding:12px; border-radius:8px; border-left:4px solid #990000;">
                  <div style="font-family:var(--font-mono); font-size:10px; font-weight:800; color:#334155;">SUITABLE REFINERY</div>
                  <div id="sim4OutRefinery" style="font-family:var(--font-serif); font-size:17px; font-weight:800; color:#0f172a; margin-top:2px;">ZPC Zhoushan Mega-Refinery</div>
                  <div id="sim4OutRefinerySub" style="font-size:11.5px; color:#1e293b; margin-top:2px;">High-Complexity Hydrocracking &amp; Coking (800k b/d)</div>
                </div>
                <div style="background:#f8fafc; padding:12px; border-radius:8px; border-left:4px solid #d97706;">
                  <div style="font-family:var(--font-mono); font-size:10px; font-weight:800; color:#334155;">LIKELY BUYER</div>
                  <div id="sim4OutBuyer" style="font-family:var(--font-serif); font-size:17px; font-weight:800; color:#0f172a; margin-top:2px;">Rongsheng Petrochemical / Sinopec</div>
                  <div id="sim4OutBuyerSub" style="font-size:11.5px; color:#1e293b; margin-top:2px;">Books Full 2M-bbl VLCC Supertanker</div>
                </div>
                <div style="background:#f8fafc; padding:12px; border-radius:8px; border-left:4px solid #0284c7;">
                  <div style="font-family:var(--font-mono); font-size:10px; font-weight:800; color:#334155;">DESTINATION PORT</div>
                  <div id="sim4OutDest" style="font-family:var(--font-serif); font-size:17px; font-weight:800; color:#0f172a; margin-top:2px;">Ningbo / Zhoushan Port, China</div>
                  <div id="sim4OutDestSub" style="font-size:11.5px; color:#1e293b; margin-top:2px;">18-Day Voyage • $4.30M Total Freight</div>
                </div>
                <div id="sim4OutMarginCard" style="background:#ecfdf5; padding:12px; border-radius:8px; border-left:4px solid #059669; transition:all 0.2s ease;">
                  <div id="sim4OutMarginTitle" style="font-family:var(--font-mono); font-size:10px; font-weight:800; color:#065f46;">NET MARGIN (AFTER FREIGHT)</div>
                  <div id="sim4OutMargin" style="font-family:var(--font-mono); font-size:20px; font-weight:800; color:#059669; margin-top:2px;">+$7.40 / bbl</div>
                  <div id="sim4OutMarginSub" style="font-size:11.5px; color:#065f46; margin-top:2px;">+$9.55 Gross minus -$2.15/bbl Freight</div>
                </div>
              </div>

              <!-- Output 4: Visual Product Yield Bar -->
              <div style="background:#f8fafc; padding:14px; border-radius:8px; border:1px solid #cbd5e1;">
                <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0f172a; margin-bottom:8px;">
                  ⛽ REFINED PRODUCT YIELD (PER 42-GALLON BARREL):
                </div>
                <div id="sim4YieldBar" class="stacked-bar" style="height:26px; border-radius:6px; overflow:hidden; margin-bottom:10px;"></div>
                <div id="sim4YieldLegend" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-size:12px; font-weight:700;"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 5: WHEN ATLANTIC CRUDE BECOMES COMPETITIVE + RUSSIAN FLOWS
// ============================================================================
function renderChapter5Visual() {
  const ar = OIL_DATA.atlanticAndRussianGrades;

  const atlanticCards = ar.atlanticGrades.map(g => `
    <div class="grade-card-pro">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0284c7; background:#e0f2fe; padding:3px 8px; border-radius:4px;">
            ${g.flag} ${g.country} &bull; ${g.type}
          </span>
          <button class="action-btn" style="padding:3px 8px; font-size:11px; font-weight:700;" onclick="focusChapter5Grade('${g.id}')">
            📍 Map Route
          </button>
        </div>
        <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a; margin-bottom:4px;">${g.name}</h4>
        <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0f172a; margin-bottom:8px;">
          API: ${g.api}° &bull; Sulfur: ${g.sulfur}%
        </div>
        <div style="font-size:12.5px; color:#1e293b; background:#f8fafc; padding:10px; border-radius:6px; border:1px solid #cbd5e1; margin-bottom:8px;">
          <div style="margin-bottom:4px;"><strong>🛢️ Production Region:</strong> ${g.region}</div>
          <div style="margin-bottom:4px;"><strong>⚓ Export Ports:</strong> ${g.exportPorts}</div>
          <div style="margin-bottom:4px;"><strong>🚢 Voyage to Asia:</strong> ${g.voyageToAsia}</div>
          <div><strong>🌏 Asian Buyers:</strong> ${g.mainBuyers}</div>
        </div>
        <p style="font-size:12.5px; color:#1e293b; line-height:1.45;">${g.whyBuyersWantIt}</p>
      </div>
    </div>
  `).join("");

  const russianCards = ar.russianGrades.map(g => `
    <div class="grade-card-pro" style="border-top:4px solid #dc2626;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b91c1c; background:#fee2e2; padding:3px 8px; border-radius:4px;">
            ${g.flag} ${g.country} &bull; ${g.type}
          </span>
          <button class="action-btn" style="padding:3px 8px; font-size:11px; font-weight:700;" onclick="focusChapter5Grade('${g.id}')">
            📍 Map Route
          </button>
        </div>
        <h4 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a; margin-bottom:4px;">${g.name}</h4>
        <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0f172a; margin-bottom:8px;">
          API: ${g.api}° &bull; Sulfur: ${g.sulfur}%
        </div>
        <div style="font-size:12.5px; color:#1e293b; background:#fff1f2; padding:10px; border-radius:6px; border:1px solid #fecdd3; margin-bottom:8px;">
          <div style="margin-bottom:4px;"><strong>🛢️ Production Region:</strong> ${g.region}</div>
          <div style="margin-bottom:4px;"><strong>⚓ Export Ports:</strong> ${g.exportPorts}</div>
          <div style="margin-bottom:4px;"><strong>🚢 Route to Asia:</strong> ${g.voyageToAsia}</div>
          <div><strong>🌏 Main Buyers:</strong> ${g.mainBuyers}</div>
        </div>
        <p style="font-size:12.5px; color:#1e293b; line-height:1.45;">${g.whyBuyersWantIt}</p>
      </div>
    </div>
  `).join("");

  return `
    <!-- 1. PLAIN-ENGLISH EXPLAINER: WHEN DO ATLANTIC CRUDES BECOME COMPETITIVE IN ASIA? -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">PLAIN-ENGLISH ARBITRAGE GUIDE</div>
          <h3 class="section-title">When Does Atlantic Basin Crude Become Competitive in Asia?</h3>
          <div class="section-subtitle">Why oil from Texas, the North Sea, and West Africa sails 15,000 miles to beat Middle Eastern oil</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:1.1fr 1fr; gap:22px; align-items:center;">
          <div style="font-size:14px; color:#1e293b; line-height:1.65;">
            <p style="margin-bottom:12px;">
              Normally, Middle Eastern crude has a big shipping advantage because Saudi Arabia and the UAE are only <strong>14 to 20 days</strong> away from Asia ($2.15/bbl freight), while Texas and the North Sea are <strong>38 to 46 days</strong> away ($4.50+/bbl freight).
            </p>
            <p style="margin-bottom:12px;">
              <strong>Atlantic crude becomes competitive in Asia when 3 things happen at the same time:</strong>
            </p>
            <ol style="padding-left:20px; margin-bottom:12px;">
              <li style="margin-bottom:6px;"><strong>Brent Price Drops Near Dubai (Narrow Spread):</strong> When the price gap between Atlantic oil (Brent/WTI) and Asian oil (Dubai) shrinks below <strong>$1.50/barrel</strong>.</li>
              <li style="margin-bottom:6px;"><strong>Middle East Producers Raise OSPs:</strong> When Saudi Aramco or ADNOC sets high monthly premiums (+$2.50/bbl), making Gulf oil expensive.</li>
              <li style="margin-bottom:6px;"><strong>VLCC Tanker Rates Are Reasonable:</strong> When booking a 2-million-barrel supertanker from Texas or West Africa costs under $4.80/barrel.</li>
            </ol>
          </div>

          <!-- Interactive Competitiveness Tester -->
          <div style="background:#f0f9ff; border:2px solid #0284c7; border-radius:12px; padding:18px;">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#0369a1; margin-bottom:8px;">
              ⚖️ TEST ATLANTIC VS MIDDLE EAST COMPETITIVENESS
            </div>
            <div style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; font-weight:800; margin-bottom:4px;">
                <span>BRENT OVER DUBAI SPREAD ($/BBL):</span>
                <span id="atlSpreadVal" style="color:#0284c7;">+$0.80 / bbl</span>
              </div>
              <input type="range" id="atlSpreadSlider" min="-1.00" max="4.50" step="0.20" value="0.80" oninput="updateAtlanticCompSim()" style="width:100%; accent-color:#0284c7; cursor:pointer;">
            </div>
            <div style="margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; font-weight:800; margin-bottom:4px;">
                <span>SAUDI / UAE MONTHLY OSP PREMIUM:</span>
                <span id="atlOspVal" style="color:#990000;">+$2.40 / bbl</span>
              </div>
              <input type="range" id="atlOspSlider" min="0.00" max="4.50" step="0.20" value="2.40" oninput="updateAtlanticCompSim()" style="width:100%; accent-color:#990000; cursor:pointer;">
            </div>
            <div id="atlVerdictBox" style="background:#ecfdf5; padding:10px 14px; border-radius:8px; border:1.5px solid #059669; font-size:12px; font-weight:700; color:#065f46;">
              🟢 <strong>ARBITRAGE OPEN (+$1.00/bbl):</strong> Narrow spread ($0.80) &amp; high OSP (+$2.40) pull US WTI and Atlantic crude into Asia.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. INTERACTIVE GLOBAL MAP: ATLANTIC & RUSSIAN PRODUCTION & ROUTES TO ASIA -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">GLOBAL EXPORT ROUTES // US, NORTH SEA, WEST AFRICA &amp; RUSSIA TO ASIA</div>
          <h3 class="section-title">Atlantic Basin &amp; Russian Crude Production Regions, Export Ports &amp; Sea Routes</h3>
          <div class="section-subtitle">Click any region button below to animate tankers sailing from Texas, Scotland, Nigeria, the Russian Baltic, or Pacific Kozmino into Asia</div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <button class="map-pill-btn active" onclick="filterChapter5Map('all')">All Atlantic &amp; Russian Routes</button>
          <button class="map-pill-btn" onclick="focusChapter5Grade('wti_midland')">🇺🇸 WTI Midland (Texas → Korea)</button>
          <button class="map-pill-btn" onclick="focusChapter5Grade('brent_forties')">🇬🇧🇳🇴 North Sea (Brent &amp; Sverdrup)</button>
          <button class="map-pill-btn" onclick="focusChapter5Grade('waf_nigeria_angola')">🇳🇬🇦🇴 West Africa → China/India</button>
          <button class="map-pill-btn" onclick="focusChapter5Grade('urals')">🇷🇺 Urals (Baltic → Suez → India)</button>
          <button class="map-pill-btn" onclick="focusChapter5Grade('espo')">🇷🇺 ESPO &amp; Sokol (3-Day Shuttle → China)</button>
        </div>
      </div>
      <div class="section-body">
        <div id="chapter5GlobalMap" style="width:100%; height:490px; border-radius:10px; border:1.5px solid #cbd5e1;"></div>
      </div>
    </div>

    <!-- 3. ATLANTIC BASIN GRADES (WTI MIDLAND, BRENT, NORTH SEA, WEST AFRICA) -->
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">ATLANTIC BASIN SUPPLY</div>
          <h3 class="section-title">Atlantic Basin Grades: WTI Midland, Brent, North Sea &amp; West Africa</h3>
          <div class="section-subtitle">Production locations, export terminals, quality specs, and Asian buyers</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:18px;">
          ${atlanticCards}
        </div>
      </div>
    </div>

    <!-- 4. RUSSIAN GRADES (URALS, ESPO, SOKOL) -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">RUSSIAN CRUDE PIVOT TO ASIA</div>
          <h3 class="section-title">Russian Export Grades: Urals, ESPO Blend &amp; Sokol</h3>
          <div class="section-subtitle">How Western Siberia, Eastern Siberia, and Sakhalin supply 4.3 million barrels a day to India and China</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:18px;">
          ${russianCards}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 6: HOW DUBAI/OMAN PRICING WORKS (PLATTS 16:30 SINGAPORE WINDOW)
// ============================================================================
function renderChapter6Visual() {
  const basket = OIL_DATA.benchmarks.dubai.deliverableBasket;
  const basketCards = basket.map(b => `
    <div style="background:#ffffff; border:1.5px solid #cbd5e1; border-radius:8px; padding:16px;">
      <div style="font-family:var(--font-serif); font-size:18px; font-weight:800; color:#0f172a;">${b.grade}</div>
      <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0284c7; margin:4px 0;">
        ${b.physicalVolKbpd.toLocaleString()} kb/d Physical
      </div>
      <div style="font-size:12.5px; color:#1e293b;"><strong>Operator:</strong> ${b.operator}</div>
      <div style="font-size:12px; color:#334155; margin-top:4px;">${b.qualityPrem}</div>
    </div>
  `).join("");

  return `
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">PLATTS 16:30 SINGAPORE WINDOW</div>
          <h3 class="section-title">How Dubai/Oman Pricing Works in 30 Minutes</h3>
          <div class="section-subtitle">Click each timestamp to see how 20 electronic partials (25,000 bbls each) become a real 500,000-barrel cargo</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:16px;">
          <div class="moc-step-card active" onclick="setMocStep(0)">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309;">STAGE 1</div>
            <div style="font-weight:800; color:#0f172a;">16:00 SGT</div>
            <div style="font-size:12.5px; color:#1e293b;">Window Opens. Bids &amp; offers entered in 25k bbl lots.</div>
          </div>
          <div class="moc-step-card" onclick="setMocStep(1)">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309;">STAGE 2</div>
            <div style="font-weight:800; color:#0f172a;">16:15 SGT</div>
            <div style="font-size:12.5px; color:#1e293b;">Trading Surge. Refiners and traders match partials.</div>
          </div>
          <div class="moc-step-card" onclick="setMocStep(2)">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#b45309;">STAGE 3</div>
            <div style="font-weight:800; color:#0f172a;">16:25 SGT</div>
            <div style="font-size:12.5px; color:#1e293b;">Critical Mass. Counterparties reach 18–19 partials.</div>
          </div>
          <div class="moc-step-card" onclick="setMocStep(3)">
            <div style="font-family:var(--font-mono); font-size:11px; font-weight:800; color:#990000;">STAGE 4</div>
            <div style="font-weight:800; color:#0f172a;">16:30 SGT</div>
            <div style="font-size:12.5px; color:#1e293b;">Physical Cargo! 20th partial triggers 500,000 bbl ship delivery.</div>
          </div>
        </div>
        <div id="mocStepStatus" style="background:#fffbeb; padding:14px 18px; border-radius:6px; font-size:13.5px; font-weight:600; color:#0f172a; border:1.5px solid #f59e0b;">
          16:00 SGT &mdash; Window Opens: Electronic Platts Editorial Window begins; 25,000-barrel partial bids entered.
        </div>
      </div>
    </div>

    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">PHYSICAL BACKSTOP BASKET</div>
          <h3 class="section-title">The 5 Crudes Deliverable Into the Dubai Benchmark</h3>
          <div class="section-subtitle">Sellers can deliver Dubai, Oman, Upper Zakum, Murban, or Al-Shaheen to fulfill a 500,000-barrel contract</div>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:12px;">
          ${basketCards}
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CHAPTER 7: OCEAN CHOKEPOINTS: HORMUZ & MALACCA
// ============================================================================
function renderChapter7Visual() {
  const chokepoints = OIL_DATA.chokepoints;
  const cpCards = chokepoints.map(cp => `
    <div class="buyer-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h3 style="font-family:var(--font-serif); font-size:20px; font-weight:800; color:#0f172a;">${cp.name}</h3>
        <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#990000; background:#fee2e2; padding:3px 8px; border-radius:4px;">
          ${cp.dailyVolumeMbd} Mb/d
        </span>
      </div>
      <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:#b45309; margin-bottom:8px;">
        ${cp.percentGlobalLiquids}% of World Oil &bull; Narrowest Width: ${cp.widthNm} nautical miles
      </div>
      <p style="font-size:13px; color:#1e293b; margin-bottom:8px;">
        <strong>Shipping Lanes:</strong> ${cp.navigableLanes}
      </p>
      <p style="font-size:13px; color:#1e293b; margin-bottom:12px;">
        <strong>Why Tankers Worry:</strong> ${cp.keyRisk}
      </p>
      <div style="background:#f8fafc; padding:10px; border-radius:6px; font-family:var(--font-mono); font-size:11.5px; border:1px solid #cbd5e1;">
        <strong style="color:#0284c7;">BYPASS PIPELINES:</strong>
        ${cp.bypassPipelines.length > 0 ? cp.bypassPipelines.map(p => `
          <div style="margin-top:3px; color:#1e293b;">&bull; ${p.name} (Capacity: ${p.capacityMbd || 'N/A'} Mb/d)</div>
        `).join("") : '<div style="color:#334155;">&bull; Zero pipeline bypass exists (100% ocean transit)</div>'}
        <div style="margin-top:6px; color:#990000; font-weight:800;">
          TRAPPED SEA VOLUME IF BLOCKED: ${cp.netUnbypassableVolumeMbd} Mb/d
        </div>
      </div>
    </div>
  `).join("");

  return `
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:20px; margin-bottom:24px;">
      ${cpCards}
    </div>
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">INTERACTIVE MARITIME ROUTE &amp; CHOKEPOINT MAP</div>
          <h3 class="section-title">Trace Tanker Routes Through Hormuz, Bab el-Mandeb &amp; Malacca</h3>
        </div>
      </div>
      <div class="section-body">
        <div class="map-canvas-container">
          <div id="tankerRouteMap" class="map-element"></div>
          <div class="map-control-overlay">
            <div class="map-control-title">SELECT ROUTE</div>
            <div id="routeButtonList"></div>
          </div>
          <div class="route-telemetry-hud" id="routeTelemetryHud">
            <div class="telemetry-item"><span class="telemetry-label">VESSEL</span><span class="telemetry-val" id="hudVesselClass">VLCC (2M Bbls)</span></div>
            <div class="telemetry-item"><span class="telemetry-label">DISTANCE</span><span class="telemetry-val" id="hudDistance">5,910 nm</span></div>
            <div class="telemetry-item"><span class="telemetry-label">TRANSIT</span><span class="telemetry-val" id="hudDuration">19.5 Days</span></div>
            <div class="telemetry-item"><span class="telemetry-label">FREIGHT</span><span class="telemetry-val" id="hudFreight">$2.15 / bbl</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   4B. INTERACTIVE CONTROLLERS FOR CHAPTERS 1 TO 5 (MAPS, FLOWS & SIMULATORS)
   ========================================================================== */

// --- CHAPTER 1: ECOSYSTEM FLOW & PERSIAN GULF / OMAN MAP ---
let ch1Map = null;
let ch1Markers = {};
let ch1TankerAnimId = null;

function selectEcoFlowStage(idx) {
  const stages = OIL_DATA.dubaiOmanEcosystem.animatedFlowStages;
  const st = stages[idx] || stages[0];
  document.querySelectorAll(".eco-flow-node").forEach((el, i) => {
    if (i === idx) el.classList.add("active");
    else el.classList.remove("active");
  });
  const box = document.getElementById("ecoFlowSpotlightText");
  if (box) {
    box.innerHTML = `<strong>${st.title} (${st.subtitle}):</strong> ${st.plainDesc} <span style="color:#990000; font-family:var(--font-mono); font-size:11px; margin-left:8px;">📍 ${st.location} · ⚡ ${st.metric}</span>`;
  }
}

function initChapter1EcosystemMap() {
  const el = document.getElementById("chapter1EcoMap");
  if (!el || typeof L === "undefined") return;

  if (ch1Map) {
    ch1Map.remove();
    ch1Map = null;
  }
  if (ch1TankerAnimId) cancelAnimationFrame(ch1TankerAnimId);

  ch1Map = L.map("chapter1EcoMap", { center: [25.2, 54.5], zoom: 6 });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(ch1Map);

  ch1Markers = {};
  const grades = OIL_DATA.dubaiOmanEcosystem.nineMiddleEastGrades;

  // Plot all 9 Middle Eastern Grade Terminals & Production Hubs
  grades.forEach(g => {
    const marker = L.circleMarker(g.coords, {
      radius: 9,
      fillColor: g.id === "oman" ? "#059669" : g.id === "murban" ? "#0284c7" : "#d97706",
      color: "#0f172a",
      weight: 2,
      fillOpacity: 0.95
    }).addTo(ch1Map);

    marker.bindPopup(`
      <div style="font-family:Inter,sans-serif; min-width:210px;">
        <div style="font-weight:800; font-size:14px; color:#0f172a;">${g.flag} ${g.name} (${g.country})</div>
        <div style="font-size:11.5px; font-weight:700; color:#990000; margin:3px 0;">API: ${g.api}° | Sulfur: ${g.sulfur}% (${g.weightCategory} ${g.sweetSour})</div>
        <div style="font-size:12px; color:#1e293b;"><strong>Fields:</strong> ${g.productionLocation}</div>
        <div style="font-size:12px; color:#1e293b;"><strong>Terminal:</strong> ${g.terminal}</div>
        <div style="font-size:12px; color:#059669; margin-top:4px;"><strong>Buyers:</strong> ${g.typicalBuyers}</div>
      </div>
    `);
    ch1Markers[g.id] = marker;
  });

  // Also plot Dubai Fateh Offshore Field
  const dubaiMarker = L.circleMarker([25.60, 54.42], {
    radius: 10,
    fillColor: "#990000",
    color: "#ffffff",
    weight: 2.5,
    fillOpacity: 1
  }).addTo(ch1Map);
  dubaiMarker.bindPopup(`
    <div style="font-family:Inter,sans-serif;">
      <div style="font-weight:800; font-size:14px; color:#990000;">🇦🇪 Dubai (Fateh Marine Terminal)</div>
      <div style="font-size:12px; color:#1e293b;">Fields: Fateh, SW Fateh, Falah, Rashid (31.0° API, 2.04% S)</div>
      <div style="font-size:12px; color:#1e293b;">The historic physical anchor of the Asian benchmark.</div>
    </div>
  `);

  // Draw Oman Main Oil Line Pipeline (Interior Block 6 -> Mina al Fahal Muscat)
  L.polyline([[22.18, 56.45], [23.63, 58.52]], {
    color: "#059669",
    weight: 4,
    dashArray: "6, 6"
  }).addTo(ch1Map).bindPopup("<strong>Oman Main Oil Line Pipeline (450 km):</strong> Connects Fahud, Yibal & Mukhaizna fields directly to Mina al Fahal Terminal outside the Strait of Hormuz.");

  // Draw Habshan-Fujairah ADCOP Pipeline (Onshore Abu Dhabi -> Fujairah outside Hormuz)
  L.polyline([[23.90, 53.65], [25.12, 56.36]], {
    color: "#0284c7",
    weight: 4,
    dashArray: "6, 6"
  }).addTo(ch1Map).bindPopup("<strong>ADCOP Pipeline (1.8 Mb/d):</strong> Carries Murban crude from onshore Abu Dhabi across the Hajar Mountains to Fujairah port on the Arabian Sea.");

  // Animated Shipping Route from Persian Gulf / Oman to Asia
  const seaRouteCoords = [
    [26.64, 50.16], [26.56, 56.45], [23.63, 58.52], [15.5, 68.0], [6.0, 80.5], [1.25, 103.85], [14.0, 114.0], [29.9, 121.8]
  ];
  L.polyline(seaRouteCoords, {
    color: "#d97706",
    weight: 4,
    className: "leaflet-ant-flow"
  }).addTo(ch1Map);

  // Animated Moving Tanker Icon along the Sea Route
  const shipIcon = L.divIcon({
    html: `<div style="font-size:20px; filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));">🚢</div>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  const shipMarker = L.marker(seaRouteCoords[0], { icon: shipIcon }).addTo(ch1Map);
  let t = 0;
  function animateCh1Ship() {
    t = (t + 0.0025) % 1;
    const totalSegs = seaRouteCoords.length - 1;
    const segFloat = t * totalSegs;
    const idx = Math.floor(segFloat);
    const frac = segFloat - idx;
    const p1 = seaRouteCoords[idx];
    const p2 = seaRouteCoords[Math.min(idx + 1, totalSegs)];
    shipMarker.setLatLng([p1[0] + (p2[0] - p1[0]) * frac, p1[1] + (p2[1] - p1[1]) * frac]);
    ch1TankerAnimId = requestAnimationFrame(animateCh1Ship);
  }
  animateCh1Ship();
}

function zoomChapter1Map(viewMode) {
  if (!ch1Map) return;
  if (viewMode === "gulf") {
    ch1Map.flyTo([25.6, 53.5], 6, { duration: 1.2 });
  } else if (viewMode === "oman_fujairah") {
    ch1Map.flyTo([24.2, 57.5], 7, { duration: 1.2 });
  } else {
    ch1Map.flyTo([18.0, 86.0], 4, { duration: 1.2 });
  }
}

function focusGradeOnChapter1Map(gradeId) {
  if (!ch1Map || !ch1Markers[gradeId]) return;
  const m = ch1Markers[gradeId];
  ch1Map.flyTo(m.getLatLng(), 7, { duration: 1.0 });
  m.openPopup();
  document.getElementById("chapter1EcoMap")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// --- CHAPTER 2: ASIAN CRUDE DEMAND & REFINERIES MAP ---
let ch2Map = null;
let ch2RefMarkers = {};

function initChapter2DemandMap() {
  const el = document.getElementById("chapter2DemandMap");
  if (!el || typeof L === "undefined") return;

  if (ch2Map) {
    ch2Map.remove();
    ch2Map = null;
  }

  ch2Map = L.map("chapter2DemandMap", { center: [26.0, 105.0], zoom: 4 });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(ch2Map);

  ch2RefMarkers = {};
  const refineries = OIL_DATA.asianRefineriesList;

  refineries.forEach(r => {
    const color = r.country === "China" ? "#dc2626" : r.country === "India" ? "#d97706" : r.country === "Japan" ? "#990000" : "#0284c7";
    const marker = L.circleMarker(r.coords, {
      radius: Math.max(8, Math.min(14, r.capacityKbd / 90)),
      fillColor: color,
      color: "#0f172a",
      weight: 2,
      fillOpacity: 0.92
    }).addTo(ch2Map);

    marker.bindPopup(`
      <div style="font-family:Inter,sans-serif; min-width:230px;">
        <div style="font-weight:800; font-size:14px; color:#0f172a;">${r.flag} ${r.name}</div>
        <div style="font-size:11.5px; font-weight:800; color:#990000; margin:3px 0;">
          Capacity: ${r.capacityKbd.toLocaleString()} kb/d | Complexity: ${r.nelsonComplexity}
        </div>
        <div style="font-size:12px; color:#1e293b; margin-bottom:4px;"><strong>Crude Sources:</strong> ${r.crudeSources}</div>
        <div style="font-size:12px; color:#059669;"><strong>Grades Consumed:</strong> ${r.consumedGrades.join(", ")}</div>
      </div>
    `);
    ch2RefMarkers[r.id] = marker;
  });

  // Draw Animated Import Flow Corridors into the 4 Asian Nations
  const importFlows = [
    // Middle East -> India (Jamnagar)
    { coords: [[25.12, 56.36], [22.36, 69.85]], color: "#d97706", label: "Middle East → India (2.1 Mb/d)" },
    // Middle East -> China / Korea / Japan
    { coords: [[25.12, 56.36], [6.0, 80.5], [1.25, 103.85], [30.05, 122.10]], color: "#d97706", label: "Middle East → China (5.0 Mb/d)" },
    { coords: [[1.25, 103.85], [35.50, 129.38], [35.53, 140.08]], color: "#d97706", label: "Middle East → Korea & Japan (4.3 Mb/d)" },
    // Russia Kozmino -> China Shandong
    { coords: [[42.73, 133.00], [36.06, 120.38]], color: "#dc2626", label: "Russia ESPO (Kozmino) → China (3-Day Shuttle)" },
    // Russia Suez -> India
    { coords: [[29.9, 32.5], [12.6, 43.3], [22.36, 69.85]], color: "#dc2626", label: "Russia Urals (via Suez) → India (1.8 Mb/d)" },
    // Atlantic / WAF -> Asia
    { coords: [[-34.5, 18.5], [1.25, 103.85], [35.50, 129.38]], color: "#0284c7", label: "US WTI Midland & West Africa → Asia (3.6 Mb/d)" }
  ];

  importFlows.forEach(f => {
    L.polyline(f.coords, {
      color: f.color,
      weight: 3.5,
      className: "leaflet-ant-flow"
    }).addTo(ch2Map).bindPopup(`<strong>${f.label}</strong>`);
  });
}

function filterChapter2Map(countryFilter) {
  if (!ch2Map) return;
  if (countryFilter === "China") ch2Map.flyTo([33.0, 120.5], 5, { duration: 1.1 });
  else if (countryFilter === "India") ch2Map.flyTo([21.5, 76.0], 5, { duration: 1.1 });
  else if (countryFilter === "Japan") ch2Map.flyTo([35.2, 137.5], 6, { duration: 1.1 });
  else if (countryFilter === "South Korea") ch2Map.flyTo([35.3, 128.2], 7, { duration: 1.1 });
  else ch2Map.flyTo([26.0, 105.0], 4, { duration: 1.1 });
}

function focusRefineryOnChapter2Map(refId) {
  if (!ch2Map || !ch2RefMarkers[refId]) return;
  const m = ch2RefMarkers[refId];
  ch2Map.flyTo(m.getLatLng(), 7, { duration: 1.0 });
  m.openPopup();
  document.getElementById("chapter2DemandMap")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// --- CHAPTER 3: OSP INTERACTIVE VISUALIZER & VESSEL CLASS ROUTE MAP ---
let currentOspGrade = "Arab Light";
let ch3Map = null;
let ch3RouteLayer = null;

function setOspPreset(gradeName, basePrice, ospDiff, clickedBtn) {
  currentOspGrade = gradeName;
  const bSlider = document.getElementById("ospBaseSlider");
  const dSlider = document.getElementById("ospDiffSlider");
  if (bSlider) bSlider.value = basePrice;
  if (dSlider) dSlider.value = ospDiff;

  // Highlight active preset button
  const group = document.getElementById("ospPresetBtnGroup");
  if (group) {
    group.querySelectorAll(".action-btn").forEach(btn => {
      if (clickedBtn ? btn === clickedBtn : btn.getAttribute("data-grade") === gradeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  updateOspVisualizer();
}

function updateOspVisualizer() {
  const bSlider = document.getElementById("ospBaseSlider");
  const dSlider = document.getElementById("ospDiffSlider");
  if (!bSlider || !dSlider) return;

  const base = parseFloat(bSlider.value);
  const diff = parseFloat(dSlider.value);
  const finalPrice = base + diff;
  const cargoCost = finalPrice * 2000000;
  const diffMillion = Math.abs(diff * 2.0).toFixed(1);
  const signStr = diff >= 0 ? `+` : `-`;
  const absDiffStr = `$${Math.abs(diff).toFixed(2)}`;

  document.getElementById("ospBaseDisplay").textContent = `$${base.toFixed(2)} / barrel`;
  document.getElementById("ospDiffDisplay").textContent = `${signStr}${absDiffStr} / barrel`;
  document.getElementById("ospGradeLabel").textContent = `SELECTED GRADE: ${currentOspGrade.toUpperCase()} (DUBAI/OMAN ${signStr}${absDiffStr})`;
  document.getElementById("ospFinalInvoice").textContent = `$${finalPrice.toFixed(2)} / bbl`;
  document.getElementById("ospCargoCost").textContent = `$${Math.round(cargoCost).toLocaleString()}`;

  const formulaBar = document.getElementById("ospFormulaBar");
  if (formulaBar) {
    formulaBar.innerHTML = `$${base.toFixed(2)} (Base Price) ${diff >= 0 ? '+' : '&minus;'} $${Math.abs(diff).toFixed(2)} (Monthly Adjustment) = <strong>$${finalPrice.toFixed(2)} / barrel</strong>`;
  }

  const reactionBox = document.getElementById("ospMarketReactionBox");
  if (!reactionBox) return;

  if (diff >= 2.60) {
    reactionBox.style.background = "#fef2f2";
    reactionBox.style.borderColor = "#fca5a5";
    reactionBox.style.color = "#991b1b";
    reactionBox.innerHTML = `
      <div style="font-weight:800; font-size:13px; color:#991b1b; margin-bottom:2px;">
        🔴 TOO EXPENSIVE (${signStr}${absDiffStr}/bbl markup · +$${diffMillion}M/VLCC)
      </div>
      <div style="font-size:12px; color:#1e293b;">
        Asian refiners cut Middle East allocations and substitute cheaper US, West African, or Russian barrels.
      </div>
    `;
  } else if (diff <= 0.50) {
    reactionBox.style.background = "#ecfdf5";
    reactionBox.style.borderColor = "#6ee7b7";
    reactionBox.style.color = "#065f46";
    reactionBox.innerHTML = `
      <div style="font-weight:800; font-size:13px; color:#065f46; margin-bottom:2px;">
        🟢 DISCOUNT PRICED (${signStr}${absDiffStr}/bbl · ${diff < 0 ? `saves $${diffMillion}M/VLCC` : 'near zero premium'})
      </div>
      <div style="font-size:12px; color:#1e293b;">
        Asian refiners maximize Gulf liftings, shutting out Atlantic arb volumes.
      </div>
    `;
  } else {
    reactionBox.style.background = "#fffbeb";
    reactionBox.style.borderColor = "#fde68a";
    reactionBox.style.color = "#92400e";
    reactionBox.innerHTML = `
      <div style="font-weight:800; font-size:13px; color:#92400e; margin-bottom:2px;">
        🟡 MARKET PARITY (${signStr}${absDiffStr}/bbl markup)
      </div>
      <div style="font-size:12px; color:#1e293b;">
        Price matches market fundamentals. Refiners take 100% contracted volumes.
      </div>
    `;
  }
}

function initChapter3FreightMap() {
  const el = document.getElementById("chapter3FreightMap");
  if (!el || typeof L === "undefined") return;

  if (ch3Map) {
    ch3Map.remove();
    ch3Map = null;
  }

  ch3Map = L.map("chapter3FreightMap", { center: [20.0, 82.0], zoom: 3 });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(ch3Map);

  switchChapter3VesselRoute("vlcc");
}

function switchChapter3VesselRoute(vesselId) {
  if (!ch3Map) return;
  if (ch3RouteLayer) ch3Map.removeLayer(ch3RouteLayer);

  ch3RouteLayer = L.layerGroup().addTo(ch3Map);

  const routes = {
    vlcc: {
      coords: [[26.64, 50.16], [26.56, 56.45], [6.0, 80.5], [1.25, 103.85], [29.95, 121.72]],
      color: "#d97706",
      center: [18.0, 88.0],
      zoom: 4,
      title: "VLCC Supertanker Corridor (Ras Tanura → Hormuz → Malacca → Ningbo China | 2,000,000 bbls | $2.15/bbl)"
    },
    suezmax: {
      coords: [[44.72, 37.77], [41.0, 29.0], [31.2, 32.3], [27.5, 34.0], [12.6, 43.3], [22.36, 69.85]],
      color: "#0284c7",
      center: [26.0, 48.0],
      zoom: 4,
      title: "Suezmax Canal Route (Russian Black Sea → Suez Canal → Red Sea → Jamnagar India | 1,000,000 bbls | $4.20/bbl)"
    },
    aframax: {
      coords: [[42.73, 133.00], [38.0, 129.0], [34.5, 126.0], [36.06, 120.38]],
      color: "#059669",
      center: [38.5, 126.5],
      zoom: 5,
      title: "Aframax Pacific Shuttle (Kozmino Port Russia → Qingdao Shandong China | 700,000 bbls | 3-Day Voyage | $1.15/bbl)"
    }
  };

  const r = routes[vesselId] || routes.vlcc;
  L.polyline(r.coords, { color: r.color, weight: 5, className: "leaflet-ant-flow" })
    .addTo(ch3RouteLayer)
    .bindPopup(`<strong>${r.title}</strong>`)
    .openPopup();

  L.circleMarker(r.coords[0], { radius: 8, fillColor: r.color, color: "#0f172a", weight: 2, fillOpacity: 1 })
    .addTo(ch3RouteLayer)
    .bindTooltip("Loading Export Terminal", { permanent: true });

  L.circleMarker(r.coords[r.coords.length - 1], { radius: 8, fillColor: "#990000", color: "#0f172a", weight: 2, fillOpacity: 1 })
    .addTo(ch3RouteLayer)
    .bindTooltip("Asian Receiving Refinery", { permanent: true });

  ch3Map.flyTo(r.center, r.zoom, { duration: 1.0 });
}

// --- CHAPTER 4: REFINERY PREFERENCE SIMULATOR & ANIMATED ROUTE MAP ---
let ch4Map = null;
let ch4RouteGroup = null;
let ch4AnimFrame = null;
let ch4LastRouteKey = null;
let ch4ActivePolyline = null;
let ch4ActiveShip = null;

const SIM4_GRADE_PRESETS = {
  arab_light: { name: "Arab Light (Saudi Arabia)", api: 32.8, sulfur: 1.97, freight: 2.15, voyageDays: 18, originCoords: [26.64, 50.16], originPort: "Ras Tanura (Saudi Arabia)" },
  arab_heavy: { name: "Arab Heavy (Saudi Arabia)", api: 27.4, sulfur: 2.85, freight: 2.20, voyageDays: 18, originCoords: [27.98, 48.78], originPort: "Safaniya / Ras Tanura (Saudi Arabia)" },
  basrah_heavy: { name: "Basrah Heavy (Iraq)", api: 23.5, sulfur: 4.10, freight: 2.25, voyageDays: 19, originCoords: [29.68, 48.81], originPort: "Al Basrah Oil Terminal (Iraq)" },
  oman: { name: "Oman Blend (Oman)", api: 31.3, sulfur: 1.40, freight: 1.95, voyageDays: 16, originCoords: [23.63, 58.52], originPort: "Mina al Fahal (Muscat, Oman)" },
  murban: { name: "Murban (UAE)", api: 40.5, sulfur: 0.70, freight: 2.05, voyageDays: 17, originCoords: [25.12, 56.36], originPort: "Fujairah Terminal (UAE)" },
  urals: { name: "Russian Urals (Baltic/Black Sea)", api: 31.0, sulfur: 1.48, freight: 4.80, voyageDays: 36, originCoords: [44.72, 37.77], originPort: "Novorossiysk / Primorsk (Russia)" },
  espo: { name: "Russian ESPO (Pacific)", api: 34.8, sulfur: 0.55, freight: 1.15, voyageDays: 4, originCoords: [42.73, 133.00], originPort: "Kozmino Pacific Port (Russia)" },
  wti_midland: { name: "US WTI Midland (Texas)", api: 42.5, sulfur: 0.18, freight: 4.65, voyageDays: 46, originCoords: [27.80, -97.39], originPort: "Corpus Christi, Texas (USA)" }
};

function initChapter4Simulator() {
  runRefineryPreferenceSimulator();
}

function onSim4GradeChange() {
  const sel = document.getElementById("sim4GradeSelect");
  if (!sel) return;
  const preset = SIM4_GRADE_PRESETS[sel.value];
  if (preset) {
    document.getElementById("sim4ApiSlider").value = preset.api;
    document.getElementById("sim4SulfurSlider").value = preset.sulfur;
    document.getElementById("sim4FreightSlider").value = preset.freight;
  }
  runRefineryPreferenceSimulator();
}

function runRefineryPreferenceSimulator() {
  const gradeKey = document.getElementById("sim4GradeSelect")?.value || "arab_light";
  const country = document.getElementById("sim4CountrySelect")?.value || "China";
  const api = parseFloat(document.getElementById("sim4ApiSlider")?.value || "32.8");
  const sulfur = parseFloat(document.getElementById("sim4SulfurSlider")?.value || "1.97");
  const freight = parseFloat(document.getElementById("sim4FreightSlider")?.value || "2.15");
  const vlccTotalMillions = (freight * 2.0).toFixed(2); // 1 VLCC = 2.0 Million Barrels

  const apiValEl = document.getElementById("sim4ApiVal");
  const sulfurValEl = document.getElementById("sim4SulfurVal");
  const freightValEl = document.getElementById("sim4FreightVal");
  const freightBoxEl = document.getElementById("sim4FreightBox");
  const freightSliderEl = document.getElementById("sim4FreightSlider");

  if (apiValEl) apiValEl.textContent = `${api.toFixed(1)}° API (${api >= 36 ? 'Light' : api <= 28.5 ? 'Heavy' : 'Medium'})`;
  if (sulfurValEl) sulfurValEl.textContent = `${sulfur.toFixed(2)}% S (${sulfur <= 0.6 ? 'Sweet' : sulfur >= 2.5 ? 'High-Sour' : 'Sour'})`;
  if (freightValEl) freightValEl.textContent = `$${freight.toFixed(2)} / bbl ($${vlccTotalMillions}M / VLCC)`;

  // Determine Suitable Refinery & Buyer based on Country + API + Sulfur
  const destConfigs = {
    "China": {
      heavySour: { ref: "ZPC Zhoushan Mega-Complex (800k b/d)", sub: "Delayed Cokers & Residue Hydrocrackers (Complexity 14.2)", buyer: "Rongsheng Petrochemical / Sinopec", port: "Zhoushan / Ningbo Port, China", coords: [30.05, 122.10] },
      mediumSour: { ref: "Sinopec Zhenhai & Hengli Dalian", sub: "Full Hydrotreating & Catalytic Cracking (540k b/d)", buyer: "Sinopec Corp (Unipec) / PetroChina", port: "Ningbo / Qingdao Port, China", coords: [36.06, 120.38] },
      lightSweet: { ref: "Shandong Independent & CNOOC Huizhou", sub: "High Naphtha / Ethylene & Distillate Towers", buyer: "Shandong Independent Refiners & CNOOC", port: "Qingdao / Dalian Port, China", coords: [36.06, 120.38] }
    },
    "India": {
      heavySour: { ref: "Reliance Jamnagar SEZ Complex (1.4 Mb/d)", sub: "World's Largest Delayed Coking Hub (Complexity 21.1)", buyer: "Reliance Industries & Nayara Energy", port: "Sikka / Vadinar Port, Gujarat, India", coords: [22.36, 69.85] },
      mediumSour: { ref: "Nayara Vadinar & IOCL Paradip", sub: "High-Sulfur Sour Conversion Refineries", buyer: "Indian Oil Corp (IOCL) / BPCL / Nayara", port: "Vadinar / Paradip Port, India", coords: [22.36, 69.85] },
      lightSweet: { ref: "HPCL Mumbai & BPCL Kochi", sub: "Clean Distillate & Low-Sulfur Diesel Units", buyer: "HPCL / BPCL / IOCL", port: "Mumbai / Kochi Port, India", coords: [18.95, 72.88] }
    },
    "Japan": {
      heavySour: { ref: "ENEOS Mizushima Residue Upgrader", sub: "Desulfurization + Bottom Upgrading (Requires blending)", buyer: "ENEOS Corporation / Cosmo Oil", port: "Mizushima Port, Japan", coords: [34.50, 133.74] },
      mediumSour: { ref: "ENEOS Chiba & Kawasaki Complex", sub: "High-Reliability Gulf Sour Hydrotreating (549k b/d)", buyer: "ENEOS / Idemitsu Kosan", port: "Tokyo Bay / Chiba Port, Japan", coords: [35.53, 140.08] },
      lightSweet: { ref: "Idemitsu Chiba & ENEOS Negishi", sub: "Clean Naphtha, Jet Fuel & Low-Sulfur Gasoline Units", buyer: "Idemitsu Kosan / ENEOS", port: "Chiba / Yokohama Port, Japan", coords: [35.53, 140.08] }
    },
    "South Korea": {
      heavySour: { ref: "S-Oil Onsan Coking & Upgrading Hub", sub: "Dedicated High-Sulfur Residue Cracking (669k b/d)", buyer: "S-Oil (Aramco) & HD Hyundai Oilbank", port: "Onsan / Ulsan Port, South Korea", coords: [35.43, 129.35] },
      mediumSour: { ref: "SK Energy Ulsan Mega-Complex (840k b/d)", sub: "Fluid Catalytic Cracking & Desulfurization", buyer: "SK Energy / GS Caltex", port: "Ulsan Port, South Korea", coords: [35.50, 129.38] },
      lightSweet: { ref: "GS Caltex Yeosu Petrochemical Hub (800k b/d)", sub: "KORUS FTA 0% Tariff Light Sweet Naphtha Splitter", buyer: "GS Caltex / SK Innovation", port: "Yeosu Port, South Korea", coords: [34.82, 127.75] }
    }
  };

  const tier = (api <= 28.5 || sulfur >= 2.6) ? "heavySour" : (api >= 36.5 && sulfur <= 0.9) ? "lightSweet" : "mediumSour";
  const matched = destConfigs[country][tier];
  const preset = SIM4_GRADE_PRESETS[gradeKey] || SIM4_GRADE_PRESETS.arab_light;

  // Calculate Product Yield based on API Gravity
  const gasNaphtha = Math.min(55, Math.max(20, Math.round((api - 18) * 1.65)));
  const diesel = Math.min(38, Math.max(22, Math.round(32 - Math.abs(33 - api) * 0.45)));
  const jet = Math.min(20, Math.max(8, Math.round((api - 15) * 0.55)));
  const residue = Math.max(3, 100 - (gasNaphtha + diesel + jet));

  // Calculate Gross Refining Margin & Net Margin After 1-to-1 Freight Deduction
  const discountBonus = (34 - api) * 0.25 + sulfur * 0.95;
  const desulfPenalty = sulfur * 0.72;
  const grossMargin = 9.10 + discountBonus - desulfPenalty;
  const estMargin = grossMargin - freight;

  // Determine Freight Tier (Cheap / Moderate / Too Expensive)
  const isCheapFreight = freight <= 2.40;
  const isModerateFreight = freight > 2.40 && freight <= 3.85;
  const routeThemeColor = isCheapFreight ? "#059669" : isModerateFreight ? "#d97706" : "#dc2626";

  if (freightValEl && freightBoxEl && freightSliderEl) {
    freightValEl.style.color = routeThemeColor;
    freightValEl.style.borderColor = routeThemeColor;
    freightSliderEl.style.accentColor = routeThemeColor;
    freightBoxEl.style.background = isCheapFreight ? "#f0fdf4" : isModerateFreight ? "#fffbeb" : "#fef2f2";
    freightBoxEl.style.borderColor = isCheapFreight ? "#86efac" : isModerateFreight ? "#fde68a" : "#fecaca";
  }

  // Update Freight Badge & Plain-English Freight Impact Banner
  const badgeEl = document.getElementById("sim4FreightBadge");
  const bannerEl = document.getElementById("sim4FreightImpactBanner");
  const marginCardEl = document.getElementById("sim4OutMarginCard");
  const marginTitleEl = document.getElementById("sim4OutMarginTitle");
  const marginValEl = document.getElementById("sim4OutMargin");
  const marginSubEl = document.getElementById("sim4OutMarginSub");
  const buyerSubEl = document.getElementById("sim4OutBuyerSub");
  const destSubEl = document.getElementById("sim4OutDestSub");
  const mapRouteSubEl = document.getElementById("sim4MapRouteSub");

  if (isCheapFreight) {
    if (badgeEl) {
      badgeEl.style.background = "#dcfce7";
      badgeEl.style.color = "#166534";
      badgeEl.style.borderColor = "#86efac";
      badgeEl.textContent = `🟢 FREIGHT LOW: $${vlccTotalMillions}M / VLCC`;
    }
    if (bannerEl) {
      bannerEl.style.background = "#ecfdf5";
      bannerEl.style.borderColor = "#6ee7b7";
      bannerEl.style.borderLeftColor = "#059669";
      bannerEl.style.color = "#065f46";
      bannerEl.innerHTML = `🟢 <strong>LOW FREIGHT ($${freight.toFixed(2)}/bbl · $${vlccTotalMillions}M/VLCC):</strong> Healthy net margin (+${estMargin.toFixed(2)}/bbl). ${matched.buyer} books full 2M-bbl VLCC.`;
    }
    if (buyerSubEl) buyerSubEl.textContent = `✅ Books Full 2M-bbl VLCC ($${vlccTotalMillions}M Charter)`;
  } else if (isModerateFreight) {
    if (badgeEl) {
      badgeEl.style.background = "#fef3c7";
      badgeEl.style.color = "#92400e";
      badgeEl.style.borderColor = "#fde68a";
      badgeEl.textContent = `🟡 FREIGHT MODERATE: $${vlccTotalMillions}M / VLCC`;
    }
    if (bannerEl) {
      bannerEl.style.background = "#fffbeb";
      bannerEl.style.borderColor = "#fde68a";
      bannerEl.style.borderLeftColor = "#d97706";
      bannerEl.style.color = "#92400e";
      bannerEl.innerHTML = `🟡 <strong>MODERATE FREIGHT ($${freight.toFixed(2)}/bbl · $${vlccTotalMillions}M/VLCC):</strong> Margin compresses to +${estMargin.toFixed(2)}/bbl. Requires co-load or -$${(freight - 2.15).toFixed(2)}/bbl discount.`;
    }
    if (buyerSubEl) buyerSubEl.textContent = `⚠️ Demands Co-Loaded VLCC or -$${(freight - 2.15).toFixed(2)}/bbl Seller Discount`;
  } else {
    if (badgeEl) {
      badgeEl.style.background = "#fee2e2";
      badgeEl.style.color = "#991b1b";
      badgeEl.style.borderColor = "#fecaca";
      badgeEl.textContent = `🔴 FREIGHT HIGH: $${vlccTotalMillions}M / VLCC`;
    }
    if (bannerEl) {
      bannerEl.style.background = "#fef2f2";
      bannerEl.style.borderColor = "#fecaca";
      bannerEl.style.borderLeftColor = "#dc2626";
      bannerEl.style.color = "#991b1b";
      bannerEl.innerHTML = `🔴 <strong>HIGH FREIGHT ($${freight.toFixed(2)}/bbl · $${vlccTotalMillions}M/VLCC):</strong> Squeezes margin to ${estMargin >= 0 ? '+' : ''}$${estMargin.toFixed(2)}/bbl. Buyer cancels voyage; shifts to short-haul Gulf or ESPO.`;
    }
    if (buyerSubEl) buyerSubEl.textContent = `🛑 Cancels Long-Haul Charter → Switches to Short-Haul`;
  }

  // Update the 4 Output Cards
  document.getElementById("sim4OutRefinery").textContent = matched.ref;
  document.getElementById("sim4OutRefinerySub").textContent = matched.sub;
  document.getElementById("sim4OutBuyer").textContent = matched.buyer;
  document.getElementById("sim4OutDest").textContent = matched.port;

  if (destSubEl) {
    destSubEl.textContent = `~${preset.voyageDays}-Day Voyage • $${vlccTotalMillions}M Total VLCC Tanker Bill ($${freight.toFixed(2)}/bbl)`;
  }

  if (marginCardEl && marginTitleEl && marginValEl && marginSubEl) {
    marginCardEl.style.background = isCheapFreight ? "#ecfdf5" : isModerateFreight ? "#fffbeb" : "#fef2f2";
    marginCardEl.style.borderLeftColor = routeThemeColor;
    marginTitleEl.style.color = isCheapFreight ? "#065f46" : isModerateFreight ? "#92400e" : "#991b1b";
    marginValEl.style.color = routeThemeColor;
    marginValEl.textContent = `${estMargin >= 0 ? '+' : ''}$${estMargin.toFixed(2)} / bbl`;
    marginSubEl.style.color = isCheapFreight ? "#065f46" : isModerateFreight ? "#92400e" : "#991b1b";
    marginSubEl.textContent = `+$${grossMargin.toFixed(2)} Gross Margin minus -$${freight.toFixed(2)}/bbl Freight`;
  }

  const yieldBar = document.getElementById("sim4YieldBar");
  const yieldLegend = document.getElementById("sim4YieldLegend");
  if (yieldBar && yieldLegend) {
    yieldBar.innerHTML = `
      <div class="stacked-segment" style="width:${gasNaphtha}%; background:#0284c7;"></div>
      <div class="stacked-segment" style="width:${diesel}%; background:#059669;"></div>
      <div class="stacked-segment" style="width:${jet}%; background:#d97706;"></div>
      <div class="stacked-segment" style="width:${residue}%; background:#990000;"></div>
    `;
    yieldLegend.innerHTML = `
      <div style="color:#0284c7;">🔵 Gasoline &amp; Naphtha: ${gasNaphtha}%</div>
      <div style="color:#059669;">🟢 Diesel / Gasoil: ${diesel}%</div>
      <div style="color:#b45309;">🟠 Jet Fuel / Kerosene: ${jet}%</div>
      <div style="color:#990000;">🔴 Heavy Fuel Oil / Coke: ${residue}%</div>
    `;
  }

  // Update Route Header & Live Map
  const titleEl = document.getElementById("sim4MapRouteTitle");
  if (titleEl) {
    titleEl.innerHTML = `🚢 LIVE ANIMATED ROUTE: ${preset.originPort.toUpperCase()} &rarr; ${matched.port.toUpperCase()} (${matched.ref})`;
  }
  if (mapRouteSubEl) {
    mapRouteSubEl.style.color = routeThemeColor;
    mapRouteSubEl.textContent = isCheapFreight
      ? `🟢 VLCC Charter Active ($${freight.toFixed(2)}/bbl = $${vlccTotalMillions}M Voyage Cost)`
      : isModerateFreight
      ? `🟡 Marginal Freight ($${freight.toFixed(2)}/bbl = $${vlccTotalMillions}M — Requires Discount)`
      : `🔴 Freight Arbitrage Closed ($${freight.toFixed(2)}/bbl = $${vlccTotalMillions}M — Uneconomic!)`;
  }

  if (ch4Map && ch4RouteGroup) {
    const newRouteKey = `${gradeKey}_${country}_${tier}`;
    // Only rebuild the route & reset ship position when Origin or Destination changes!
    if (ch4LastRouteKey !== newRouteKey || !ch4ActivePolyline) {
      ch4LastRouteKey = newRouteKey;
      if (ch4AnimFrame) cancelAnimationFrame(ch4AnimFrame);
      ch4RouteGroup.clearLayers();

      const start = preset.originCoords;
      const end = matched.coords;
      let waypoints = [start, end];

      if (gradeKey === "wti_midland") {
        waypoints = [start, [15.0, -60.0], [-34.5, 18.5], [1.25, 103.85], end];
      } else if (gradeKey === "urals") {
        waypoints = [start, [31.2, 32.3], [12.6, 43.3], end];
      } else if (gradeKey !== "espo") {
        waypoints = [start, [26.0, 56.5], [8.0, 77.0], end[1] > 100 ? [1.25, 103.85] : end, end];
      }

      ch4ActivePolyline = L.polyline(waypoints, {
        color: routeThemeColor,
        weight: 4.5,
        dashArray: (!isCheapFreight && !isModerateFreight) ? "8, 8" : null,
        className: "leaflet-ant-flow"
      }).addTo(ch4RouteGroup);

      L.circleMarker(start, { radius: 8, fillColor: "#d97706", color: "#0f172a", weight: 2, fillOpacity: 1 })
        .addTo(ch4RouteGroup).bindTooltip(`Origin: ${preset.originPort}`, { permanent: true });
      L.circleMarker(end, { radius: 9, fillColor: "#059669", color: "#0f172a", weight: 2, fillOpacity: 1 })
        .addTo(ch4RouteGroup).bindTooltip(`Matched Refinery: ${matched.ref}`, { permanent: true });

      const tankerIcon = L.divIcon({
        html: `<div style="font-size:20px;">🚢</div>`,
        className: "",
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      ch4ActiveShip = L.marker(start, { icon: tankerIcon }).addTo(ch4RouteGroup);
      ch4ActiveShip.bindTooltip(`🚢 Freight: $${freight.toFixed(2)}/bbl ($${vlccTotalMillions}M/VLCC)`, { direction: "top" });

      let prog = 0;
      function animCh4() {
        prog = (prog + 0.004) % 1;
        const segs = waypoints.length - 1;
        const f = prog * segs;
        const i = Math.floor(f);
        const r = f - i;
        const a = waypoints[i];
        const b = waypoints[Math.min(i + 1, segs)];
        ch4ActiveShip.setLatLng([a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r]);
        ch4AnimFrame = requestAnimationFrame(animCh4);
      }
      animCh4();
      ch4Map.fitBounds(L.latLngBounds(waypoints), { padding: [35, 35] });
    } else {
      // Just update the existing route line color & ship tooltip smoothly while ship keeps sailing!
      ch4ActivePolyline.setStyle({
        color: routeThemeColor,
        dashArray: (!isCheapFreight && !isModerateFreight) ? "8, 8" : null
      });
      if (ch4ActiveShip) {
        ch4ActiveShip.setTooltipContent(`🚢 Freight: $${freight.toFixed(2)}/bbl ($${vlccTotalMillions}M/VLCC)`);
      }
    }
  }
}

// --- CHAPTER 5: ATLANTIC BASIN & RUSSIAN GRADES MAP & COMPETITIVENESS ---
let ch5Map = null;
let ch5LayerGroup = null;

function updateAtlanticCompSim() {
  const sSlider = document.getElementById("atlSpreadSlider");
  const oSlider = document.getElementById("atlOspSlider");
  if (!sSlider || !oSlider) return;

  const spread = parseFloat(sSlider.value);
  const meOsp = parseFloat(oSlider.value);

  document.getElementById("atlSpreadVal").textContent = `${spread >= 0 ? '+' : ''}$${spread.toFixed(2)} / bbl`;
  document.getElementById("atlOspVal").textContent = `+$${meOsp.toFixed(2)} / bbl`;

  // Atlantic competitiveness score: Middle East OSP minus (Brent-Dubai Spread + $2.20 extra Atlantic freight)
  const netAdvantage = meOsp - (spread + 1.80) + 1.20;
  const box = document.getElementById("atlVerdictBox");
  if (!box) return;

  if (netAdvantage >= 0.15) {
    box.style.background = "#ecfdf5";
    box.style.borderColor = "#059669";
    box.style.color = "#065f46";
    box.innerHTML = `🟢 <strong>ARBITRAGE OPEN (+$${netAdvantage.toFixed(2)}/bbl):</strong> Narrow spread ($${spread.toFixed(2)}) & high OSP (+$${meOsp.toFixed(2)}) pull US WTI and Atlantic crude into Asia.`;
  } else {
    box.style.background = "#fef2f2";
    box.style.borderColor = "#dc2626";
    box.style.color = "#991b1b";
    box.innerHTML = `🔴 <strong>ARBITRAGE CLOSED (-$${Math.abs(netAdvantage).toFixed(2)}/bbl):</strong> Wide spread ($${spread.toFixed(2)}) shuts arb; Asia sticks with Gulf and Russian barrels.`;
  }
}

function initChapter5AtlanticRussiaMap() {
  const el = document.getElementById("chapter5GlobalMap");
  if (!el || typeof L === "undefined") return;

  if (ch5Map) {
    ch5Map.remove();
    ch5Map = null;
  }

  ch5Map = L.map("chapter5GlobalMap", { center: [22.0, 45.0], zoom: 2 });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(ch5Map);

  ch5LayerGroup = L.layerGroup().addTo(ch5Map);
  filterChapter5Map("all");
}

function filterChapter5Map(mode) {
  if (!ch5Map || !ch5LayerGroup) return;
  ch5LayerGroup.clearLayers();

  const allRoutes = [
    { id: "wti_midland", name: "US WTI Midland (Corpus Christi Texas → Cape of Good Hope → Korea/China)", coords: [[27.80, -97.39], [15.0, -60.0], [-34.5, 18.5], [1.25, 103.85], [35.50, 129.38]], color: "#0284c7" },
    { id: "brent_forties", name: "North Sea Brent / Forties & Johan Sverdrup (Scotland/Norway → Asia)", coords: [[58.5, 1.5], [36.0, -5.5], [31.2, 32.3], [12.6, 43.3], [1.25, 103.85], [35.50, 129.38]], color: "#0369a1" },
    { id: "waf_nigeria_angola", name: "West Africa Bonny Light & Cabinda (Nigeria/Angola → China & India)", coords: [[-5.55, 12.19], [-34.5, 18.5], [1.25, 103.85], [29.95, 121.72]], color: "#7c3aed" },
    { id: "urals", name: "Russian Urals (Baltic Primorsk & Black Sea → Suez Canal → Jamnagar India)", coords: [[60.35, 28.62], [55.0, 5.0], [36.0, -5.5], [31.2, 32.3], [12.6, 43.3], [22.36, 69.85]], color: "#dc2626" },
    { id: "espo", name: "Russian ESPO & Sokol (Kozmino Pacific & Sakhalin → Shandong China 3-Day Shuttle)", coords: [[42.73, 133.00], [36.06, 120.38]], color: "#b91c1c" }
  ];

  allRoutes.forEach(r => {
    L.polyline(r.coords, { color: r.color, weight: 4, className: "leaflet-ant-flow" })
      .addTo(ch5LayerGroup)
      .bindPopup(`<strong>${r.name}</strong>`);
    L.circleMarker(r.coords[0], { radius: 8, fillColor: r.color, color: "#0f172a", weight: 2, fillOpacity: 1 })
      .addTo(ch5LayerGroup)
      .bindPopup(`<strong>Origin:</strong> ${r.name}`);
  });

  ch5Map.flyTo([22.0, 45.0], 2, { duration: 1.0 });
}

function focusChapter5Grade(gradeId) {
  if (!ch5Map) return;
  const targets = {
    wti_midland: { center: [10.0, -25.0], zoom: 3 },
    brent_forties: { center: [57.0, 2.0], zoom: 5 },
    johan_sverdrup: { center: [60.8, 5.0], zoom: 5 },
    waf_nigeria_angola: { center: [-2.0, 10.0], zoom: 4 },
    urals: { center: [40.0, 35.0], zoom: 3 },
    espo: { center: [39.5, 126.5], zoom: 5 },
    sokol: { center: [48.0, 138.0], zoom: 5 }
  };
  const t = targets[gradeId] || { center: [22.0, 45.0], zoom: 2 };
  ch5Map.flyTo(t.center, t.zoom, { duration: 1.1 });
  document.getElementById("chapter5GlobalMap")?.scrollIntoView({ behavior: "smooth", block: "center" });
}


function updateEfsSimulation() {
  const slider = document.getElementById("efsSlider");
  if (!slider) return;

  const val = parseFloat(slider.value);
  document.getElementById("efsSliderVal").textContent = `${val >= 0 ? '+' : ''}$${val.toFixed(2)} / bbl`;

  const wtiStatus = document.getElementById("efsWtiStatus");
  const wtiDesc = document.getElementById("efsWtiDesc");
  const wafStatus = document.getElementById("efsWafStatus");
  const wafDesc = document.getElementById("efsWafDesc");
  const meStatus = document.getElementById("efsMeStatus");
  const meDesc = document.getElementById("efsMeDesc");

  if (val <= 1.20) {
    wtiStatus.textContent = "ARBITRAGE OPEN";
    wtiStatus.style.color = "#059669";
    wtiDesc.textContent = "American WTI Midland easily overcomes ocean freight and floods into South Korea and China.";
    
    wafStatus.textContent = "ATTRACTIVE SPREAD";
    wafStatus.style.color = "#059669";
    wafDesc.textContent = "West African sweet crudes beat Middle Eastern sour crudes on delivered cost.";

    meStatus.textContent = "DEFENSIVE (PRICE CUTS)";
    meStatus.style.color = "#dc2626";
    meDesc.textContent = "Saudi Aramco and ADNOC are forced to slash monthly OSP differentials to protect customer volume.";
  } else {
    wtiStatus.textContent = "ARBITRAGE CLOSED";
    wtiStatus.style.color = "#dc2626";
    wtiDesc.textContent = "Brent is too expensive relative to Dubai. American crude cannot overcome the $4.80 ocean shipping hurdle.";

    wafStatus.textContent = "STAYS IN EUROPE";
    wafStatus.style.color = "#dc2626";
    wafDesc.textContent = "West African barrels remain in the Atlantic Basin; Asian buyers look elsewhere.";

    meStatus.textContent = "PEAK PRICING POWER";
    meStatus.style.color = "#059669";
    meDesc.textContent = "Middle Eastern barrels dominate Asian refinery diets. National oil companies raise monthly OSPs aggressively.";
  }
}

// Chapter 8: The Journey of One Barrel (9 Stages)
function renderChapter8Visual() {
  return `
    <div class="journey-container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
        <div>
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:var(--color-me-gold); text-transform:uppercase;">
            STEP-BY-STEP LOGISTICS
          </span>
          <h3 style="font-family:var(--font-serif); font-size:22px; font-weight:800; color:#111827;">The 9 Stages of One Barrel</h3>
        </div>
        <div id="journeyStepBadge" style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:#111827; background:var(--bg-surface-subtle); padding:4px 10px; border-radius:4px; border:1px solid var(--border-subtle);">
          STEP 1 OF 9
        </div>
      </div>

      <!-- 9-Step Progress Track -->
      <div class="journey-track" id="journeyTrackContainer">
        <!-- Dynamically populated -->
      </div>

      <!-- Active Spotlight Card -->
      <div class="journey-spotlight" id="journeySpotlightContainer">
        <!-- Dynamically populated -->
      </div>

      <!-- Navigation Buttons -->
      <div class="journey-nav-footer">
        <button class="action-btn" id="btnJourneyPrev" onclick="stepJourney(-1)">&larr; Previous Stage</button>
        <div class="journey-dots" id="journeyDotsContainer"></div>
        <button class="action-btn active" id="btnJourneyNext" onclick="stepJourney(1)">Next Stage &rarr;</button>
      </div>
    </div>
  `;
}

function initJourneyOfOneBarrel() {
  const steps = OIL_DATA.journeyOfOneBarrel;
  if (!steps || steps.length === 0) return;

  const trackContainer = document.getElementById("journeyTrackContainer");
  if (!trackContainer) return;

  trackContainer.innerHTML = steps.map((s, idx) => `
    <button class="journey-step-btn ${idx === STATE.activeJourneyStep ? 'active' : ''}" onclick="setJourneyStep(${idx})">
      <span class="step-icon">${s.icon}</span>
      <span class="step-num">STAGE 0${s.step}</span>
      <span class="step-title">${s.title}</span>
    </button>
  `).join("");

  const dotsContainer = document.getElementById("journeyDotsContainer");
  if (dotsContainer) {
    dotsContainer.innerHTML = steps.map((_, idx) => `
      <div class="journey-dot ${idx === STATE.activeJourneyStep ? 'active' : ''}"></div>
    `).join("");
  }

  renderActiveJourneyStep();
}

function setJourneyStep(idx) {
  const steps = OIL_DATA.journeyOfOneBarrel;
  if (!steps || idx < 0 || idx >= steps.length) return;
  STATE.activeJourneyStep = idx;

  document.querySelectorAll(".journey-step-btn").forEach((btn, i) => {
    if (i === idx) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  document.querySelectorAll(".journey-dot").forEach((dot, i) => {
    if (i === idx) dot.classList.add("active");
    else dot.classList.remove("active");
  });

  const prevBtn = document.getElementById("btnJourneyPrev");
  const nextBtn = document.getElementById("btnJourneyNext");
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.disabled = idx === steps.length - 1;

  const badge = document.getElementById("journeyStepBadge");
  if (badge) badge.textContent = `STAGE ${idx + 1} OF ${steps.length}`;

  renderActiveJourneyStep();
}

function stepJourney(delta) {
  setJourneyStep(STATE.activeJourneyStep + delta);
}

function renderActiveJourneyStep() {
  const step = OIL_DATA.journeyOfOneBarrel[STATE.activeJourneyStep];
  if (!step) return;

  const container = document.getElementById("journeySpotlightContainer");
  if (!container) return;

  container.innerHTML = `
    <div>
      <span class="journey-badge">${step.location}</span>
      <h3 class="journey-step-heading">${step.step}. ${step.title} &mdash; ${step.subtitle}</h3>
      <p class="journey-desc">${step.description}</p>
    </div>
    <div class="journey-telemetry">
      <div class="telemetry-row">
        <span class="telemetry-label">PHYSICAL HARDWARE FACT</span>
        <span class="telemetry-val" style="color:var(--color-atlantic-marine);">${step.volumeOrFact}</span>
      </div>
      <div class="telemetry-row">
        <span class="telemetry-label">COMMERCIAL COST BUILDUP</span>
        <span class="telemetry-val" style="color:var(--color-me-gold);">${step.pricingImpact}</span>
      </div>
      <div class="telemetry-row">
        <span class="telemetry-label">OPERATIONAL RISK FACTOR</span>
        <span class="telemetry-val" style="color:var(--color-russia-red);">${step.riskFactor}</span>
      </div>
    </div>
  `;
}

// Chapter 9: The Commercial Trading Desk (Forward Curves & OSP Tracker)
function renderChapter9Visual() {
  return `
    <div class="section-block" style="margin-bottom:28px;">
      <div class="section-header">
        <div>
          <div class="section-tag">TERM STRUCTURE ENGINE</div>
          <h3 class="section-title">Forward Curve: Backwardation vs Contango</h3>
          <div class="section-subtitle">Toggle between market regimes to see why tankers are used for floating storage</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="action-btn active" id="btnCurveBack" onclick="toggleCurveState('backwardation')">Backwardation (Prompt Shortage)</button>
          <button class="action-btn" id="btnCurveCont" onclick="toggleCurveState('contango')">Contango (Surplus Storage)</button>
        </div>
      </div>
      <div class="section-body">
        <div style="display:grid; grid-template-columns:1fr 2fr; gap:20px; align-items:center;">
          <div>
            <div id="curveMetricsHud" style="margin-bottom:12px; font-family:var(--font-mono); font-size:12px; display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;"></div>
            <p id="curveRationale" style="font-size:13px; color:#374151; line-height:1.5;">
              Prompt physical demand exceeds immediate supply. Refiners draw down inventories. Prompt physical barrels command a premium over forward paper.
            </p>
          </div>
          <div id="forwardCurveChart" style="height:220px; display:flex; align-items:flex-end; gap:16px; padding:20px 10px; background:var(--bg-surface-subtle); border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      </div>
    </div>

    <!-- OSP Tracker Table -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">SOVEREIGN PRICE SHEETS</div>
          <h3 class="section-title">Monthly Official Selling Price (OSP) Tracker</h3>
          <div class="section-subtitle">How Saudi Aramco, ADNOC, and SOMO set differentials on the 5th of each month</div>
        </div>
      </div>
      <div class="section-body">
        <div id="ospTrackerContainer"></div>
      </div>
    </div>
  `;
}

function toggleCurveState(state) {
  STATE.currentCurveState = state;
  const btnBack = document.getElementById("btnCurveBack");
  const btnCont = document.getElementById("btnCurveCont");
  if (btnBack && btnCont) {
    if (state === "backwardation") {
      btnBack.classList.add("active");
      btnCont.classList.remove("active");
    } else {
      btnCont.classList.add("active");
      btnBack.classList.remove("active");
    }
  }
  renderForwardCurve();
}

function renderForwardCurve() {
  const curveData = OIL_DATA.tradingDesk.forwardCurves[STATE.currentCurveState];
  if (!curveData) return;

  const hud = document.getElementById("curveMetricsHud");
  if (hud) {
    hud.innerHTML = `
      <div style="background:#ffffff; border:1px solid var(--border-subtle); padding:8px; border-radius:4px;">
        <span style="color:#6B7280; font-size:10px;">PROMPT SPREAD (M1-M2)</span>
        <div style="font-weight:800; color:#111827; font-size:14px;">${curveData.promptSpreadM1M2 >= 0 ? '+' : ''}$${curveData.promptSpreadM1M2.toFixed(2)}</div>
      </div>
      <div style="background:#ffffff; border:1px solid var(--border-subtle); padding:8px; border-radius:4px;">
        <span style="color:#6B7280; font-size:10px;">BOX SPREAD (M1-M3)</span>
        <div style="font-weight:800; color:#111827; font-size:14px;">${curveData.boxSpreadM1M3 >= 0 ? '+' : ''}$${curveData.boxSpreadM1M3.toFixed(2)}</div>
      </div>
    `;
  }

  const chart = document.getElementById("forwardCurveChart");
  if (chart) {
    const minP = 68;
    const maxP = 76;
    chart.innerHTML = curveData.contracts.map(c => {
      const heightPercent = Math.max(15, Math.min(100, ((c.price - minP) / (maxP - minP)) * 100));
      return `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end;">
          <span style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:#111827; margin-bottom:4px;">$${c.price.toFixed(2)}</span>
          <div style="width:100%; height:${heightPercent}%; background:var(--color-ft-claret); border-radius:4px 4px 0 0; transition:height 0.3s ease;"></div>
          <span style="font-family:var(--font-mono); font-size:10px; color:#6B7280; margin-top:6px;">${c.month.split(' ')[0]}</span>
        </div>
      `;
    }).join("");
  }
}

function renderOspTracker() {
  const container = document.getElementById("ospTrackerContainer");
  if (!container || !OIL_DATA.tradingDesk) return;

  container.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
      ${OIL_DATA.tradingDesk.ospTracker.map(noc => `
        <div style="background:#ffffff; border:1px solid var(--border-subtle); border-radius:8px; padding:16px; box-shadow:var(--shadow-ft-card);">
          <div style="font-family:var(--font-serif); font-size:18px; font-weight:800; color:#111827;">${noc.noc}</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:#6B7280; margin-bottom:12px;">Pricing Basis: ${noc.anchor}</div>
          <table style="width:100%; font-family:var(--font-mono); font-size:11px; border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle); color:#6B7280; text-align:left;">
                <th style="padding:4px 0;">Grade</th>
                <th style="padding:4px 0;">OSP Diff</th>
                <th style="padding:4px 0;">MoM</th>
              </tr>
            </thead>
            <tbody>
              ${noc.differentials.map(d => `
                <tr style="border-bottom:1px solid #f3f0e6;">
                  <td style="padding:6px 0; font-weight:700; color:#111827;">${d.grade}</td>
                  <td style="padding:6px 0; color:var(--color-me-gold);">${d.diff}</td>
                  <td style="padding:6px 0; color:${d.trend === 'up' ? '#059669' : d.trend === 'down' ? '#dc2626' : '#6B7280'};">${d.chg}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `).join("")}
    </div>
  `;
}

// Chapter 10: How Refineries Choose Crude (7 Selection Pillars)
function renderChapter10Visual() {
  return `
    <div class="seven-pillars-grid" id="sevenPillarsGrid" style="margin-bottom:28px;"></div>

    <!-- 3 Blocs vs 4 Buyers Final Showdown Table -->
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">COMPETITIVE MATRIX</div>
          <h3 class="section-title">Middle East vs Russia vs Atlantic Basin: Sourcing Strategy</h3>
          <div class="section-subtitle">How China, India, Japan, and South Korea divide their refinery diets</div>
        </div>
      </div>
      <div class="section-body" style="overflow-x:auto;">
        <table class="exec-table">
          <thead>
            <tr>
              <th style="color:#111827;">ASIAN BUYER</th>
              <th style="color:var(--color-me-gold);">MIDDLE EAST STRATEGY</th>
              <th style="color:var(--color-russia-red);">RUSSIA STRATEGY</th>
              <th style="color:var(--color-atlantic-marine);">ATLANTIC BASIN STRATEGY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong style="color:#111827;">CHINA 🇨🇳</strong> (11.5 Mb/d)</td>
              <td>Term baseload (44%) with Aramco &amp; ADNOC; primary chemical feed for mega-plants.</td>
              <td>Massive buyer (21%): ESPO Pacific shuttle (2.8 days) &amp; discounted Urals for teapots.</td>
              <td>Opportunistic: Takes US WTI Midland &amp; Brazilian Tupi when EFS narrows.</td>
            </tr>
            <tr>
              <td><strong style="color:#111827;">INDIA 🇮🇳</strong> (4.9 Mb/d)</td>
              <td>Displaced incumbent: Dropped from 65% to 44% market share post-2022.</td>
              <td>Primary beneficiary: Imports 1.9 Mb/d of discounted Urals into Jamnagar &amp; Vadinar.</td>
              <td>Minimal intake (~6%): Long distance freight penalty limits Atlantic imports.</td>
            </tr>
            <tr>
              <td><strong style="color:#111827;">JAPAN 🇯🇵</strong> (2.5 Mb/d)</td>
              <td>Near-total dependency (95.2%): Long-term sovereign supply security contracts.</td>
              <td>Zero direct imports: Strict alignment with G7 sanctions and Western compliance.</td>
              <td>Niche intake (2.8%): Light sweet WTI for high-spec domestic clean fuel blending.</td>
            </tr>
            <tr>
              <td><strong style="color:#111827;">SOUTH KOREA 🇰🇷</strong> (3.0 Mb/d)</td>
              <td>Strong foundation (67%): Saudi Aramco owns major share of S-Oil Onsan refinery.</td>
              <td>Zero seaborne imports: Replaced Russian barrels entirely with US &amp; Middle East crude.</td>
              <td>Major swing buyer (18%): Zero tariff under KORUS FTA makes US WTI Midland a baseload staple.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function initSevenPillars() {
  const container = document.getElementById("sevenPillarsGrid");
  if (!container || !OIL_DATA.sevenPillars) return;

  container.innerHTML = OIL_DATA.sevenPillars.map(p => `
    <div class="pillar-card">
      <div class="pillar-icon">${p.icon}</div>
      <div class="pillar-title">${p.name}</div>
      <div class="pillar-desc">${p.desc}</div>
      <div class="pillar-impact">
        <strong style="color:var(--color-ft-claret);">Trading Impact:</strong> ${p.commercialImpact}
      </div>
    </div>
  `).join("");
}

// Chapter 11: Real-World Shocks & Sanctions
function renderChapter11Visual() {
  return `
    <div class="section-block">
      <div class="section-header">
        <div>
          <div class="section-tag">GEOPOLITICAL STRESS TESTS</div>
          <h3 class="section-title">5 Shockwaves That Redrew the Global Oil Map</h3>
          <div class="section-subtitle">Click a case study to see how trade flows and refining margins responded</div>
        </div>
      </div>
      <div class="section-body">
        <div class="case-study-nav" id="casePillsContainer" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
          <button class="case-pill active" onclick="loadCaseStudy(0)">1. Iran Sanctions &amp; Shadow Fleet</button>
          <button class="case-pill" onclick="loadCaseStudy(1)">2. Ukraine War &amp; Russian Redirection</button>
          <button class="case-pill" onclick="loadCaseStudy(2)">3. Red Sea &amp; Bab el-Mandeb Strikes</button>
          <button class="case-pill" onclick="loadCaseStudy(3)">4. OPEC+ Voluntary Production Cuts</button>
          <button class="case-pill" onclick="loadCaseStudy(4)">5. Strait of Hormuz Tensions</button>
        </div>

        <div class="case-display-box" id="caseDisplayBox"></div>
      </div>
    </div>
  `;
}

const CASE_STUDIES = [
  {
    title: "1. Iran Sanctions & Shadow Fleet Hub",
    summary: "Dark-fleet VLCCs conduct STS transfers off Malaysia, delivering Iranian barrels to Chinese teapot refiners rebranded as 'Malaysian blend'.",
    intel: [
      "Volume: ~1.2–1.5 Mb/d entering China via STS.",
      "Discount: -$8 to -$12/bbl vs Dated Brent.",
      "Market Impact: Competes directly against Basrah & Arab Heavy, pressuring Gulf OSPs."
    ]
  },
  {
    title: "2. Ukraine War & Russian Redirection to Asia",
    summary: "Post-sanctions, Russia redirected 3.5+ Mb/d of Urals and ESPO to India and China at steep discounts.",
    intel: [
      "Displaced Volume: 1.8+ Mb/d of Middle East crude displaced from Indian refineries.",
      "Refining Margins: Reliance Jamnagar earned record margins processing discounted Urals.",
      "Payment Shift: >60% settled in non-USD currencies (AED, CNY, RUB)."
    ]
  },
  {
    title: "3. Red Sea / Bab el-Mandeb Strikes & Cape Rerouting",
    summary: "Houthi missile attacks forced tankers around the Cape of Good Hope, bypassing the Suez Canal.",
    intel: [
      "Voyage Penalty: +10–14 days and +3,500 nm transit.",
      "Cost Impact: +$1.0M–$1.4M in bunker fuel & spiked war-risk insurance.",
      "Market Impact: Raised landed costs for Atlantic/Russian crude, favoring Gulf barrels."
    ]
  },
  {
    title: "4. OPEC+ Voluntary Cuts on Heavy Sour Crude",
    summary: "OPEC+ cuts targeted medium/heavy sour grades, sharply narrowing the sweet-sour differential.",
    intel: [
      "Spread Compression: Light-heavy differential collapsed to historic lows.",
      "Teapot Impact: Independent refiners faced tight margins on high-sulfur feedstock.",
      "Arb Window: Opened space for US WTI Midland exports into South Korea and China."
    ]
  },
  {
    title: "5. Strait of Hormuz Risks & Strategic Petroleum Stocks",
    summary: "Asia relies on Hormuz for 82% of its crude imports, requiring massive strategic petroleum reserves.",
    intel: [
      "Asian Exposure: 82% of Hormuz crude flows to Asian buyers.",
      "Strategic Buffer: Japan & Korea hold 100–140 days import cover.",
      "Pipeline Limit: Bypasses take only 6.8 Mb/d, leaving ~14 Mb/d trapped if blocked."
    ]
  }
];

function loadCaseStudy(idx) {
  STATE.activeCaseStudyIdx = idx;
  const cs = CASE_STUDIES[idx];
  const box = document.getElementById("caseDisplayBox");
  if (!box) return;

  document.querySelectorAll("#casePillsContainer .case-pill").forEach((btn, i) => {
    if (i === idx) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  box.innerHTML = `
    <h3 style="font-family:var(--font-serif); font-size:22px; font-weight:800; color:#111827; margin-bottom:8px;">${cs.title}</h3>
    <p style="font-size:14px; color:#374151; line-height:1.6; margin-bottom:16px;">${cs.summary}</p>
    <div style="background:var(--bg-surface-subtle); border-left:4px solid var(--color-ft-claret); padding:16px 20px; border-radius:0 8px 8px 0; border-top:1px solid var(--border-subtle); border-right:1px solid var(--border-subtle); border-bottom:1px solid var(--border-subtle);">
      <div style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:var(--color-ft-claret); text-transform:uppercase; margin-bottom:6px;">
        COMMERCIAL MARKET INTELLIGENCE:
      </div>
      <ul style="font-size:13px; color:#374151; padding-left:18px; margin:0;">
        ${cs.intel.map(item => `<li style="margin-bottom:4px;">${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

// Chapter 08: Interactive Crude Choice Simulator (7 Crudes x 4 Buyers)
function renderChapter12Visual() {
  return `
    <!-- Dynamic Winner Recommendation Banner -->
    <div class="winner-banner" id="calcWinnerBanner">
      <div>
        <strong>🏆 ARBITRAGE WINNER:</strong> <span id="winnerCrudeText">Russian Urals ($71.85/bbl landed into CHINA)</span>
      </div>
      <span id="winnerReasonText" style="font-size:11px; opacity:0.85;">Post-sanctions discount overcomes longer voyage freight.</span>
    </div>

    <div class="arb-calculator-grid">
      <!-- Controls Panel -->
      <div class="arb-panel">
        <div class="arb-panel-title">
          <span>SIMULATOR MARKET INPUTS</span>
          <button class="action-btn" onclick="resetCalculatorDefaults()" style="padding:2px 8px; font-size:11px;">Reset Defaults</button>
        </div>

        <div class="calc-control-group">
          <label class="calc-label">
            <span>SELECT CRUDE ASSAY TO HIGHLIGHT:</span>
          </label>
          <div class="crude-pills-grid" id="calcCrudePills"></div>
        </div>

        <div class="calc-control-group">
          <label class="calc-label" for="calcDestSelect">
            <span>DESTINATION REFINERY:</span>
          </label>
          <select id="calcDestSelect" class="calc-select" onchange="recalculateArbitrage()">
            <option value="china">China (Ningbo / ZPC &amp; Zhenhai)</option>
            <option value="india">India (Jamnagar / Reliance)</option>
            <option value="japan">Japan (Chiba / ENEOS)</option>
            <option value="korea">South Korea (Ulsan / SK Innovation)</option>
          </select>
        </div>

        <div class="calc-control-group">
          <label class="calc-label" for="sliderDatedBrent">
            <span>DATED BRENT BASELINE ($/BBL):</span>
            <span id="valDatedBrent" style="color:#111827; font-weight:700;">$74.50</span>
          </label>
          <input type="range" id="sliderDatedBrent" class="calc-slider" min="50" max="110" step="0.5" value="74.5" oninput="recalculateArbitrage()">
        </div>

        <div class="calc-control-group">
          <label class="calc-label" for="sliderBrentDubaiEfs">
            <span>BRENT-DUBAI EFS SPREAD ($/BBL):</span>
            <span id="valBrentDubaiEfs" style="color:var(--color-atlantic-marine); font-weight:700;">+$0.70</span>
          </label>
          <input type="range" id="sliderBrentDubaiEfs" class="calc-slider" min="-1.0" max="5.0" step="0.1" value="0.7" oninput="recalculateArbitrage()">
        </div>

        <div class="calc-control-group">
          <label class="calc-label" for="sliderVlccFreight">
            <span>TANKER FREIGHT RATE ($/BBL):</span>
            <span id="valVlccFreight" style="color:var(--color-me-gold); font-weight:700;">$2.15/bbl (WS 58.5)</span>
          </label>
          <input type="range" id="sliderVlccFreight" class="calc-slider" min="0.80" max="6.50" step="0.05" value="2.15" oninput="recalculateArbitrage()">
          <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:10px; color:#6B7280; margin-top:2px;">
            <span>$0.80 (Cheap WS 22)</span>
            <span>$2.15 (Base WS 58)</span>
            <span>$6.50 (Spike WS 177)</span>
          </div>
        </div>

        <div class="calc-control-group">
          <label class="calc-label" for="sliderUralsDiscount">
            <span>RUSSIAN URALS DISCOUNT TO BRENT:</span>
            <span id="valUralsDiscount" style="color:var(--color-russia-red); font-weight:700;">-$12.50</span>
          </label>
          <input type="range" id="sliderUralsDiscount" class="calc-slider" min="-30" max="-2" step="0.5" value="-12.5" oninput="recalculateArbitrage()">
        </div>
      </div>

      <!-- Landed Output Panel -->
      <div class="arb-panel">
        <div class="arb-panel-title">
          <span>DELIVERED LANDED NETBACK (7 CRUDES)</span>
          <span id="arbWinnerBadge" class="ticker-chg ticker-up">ARBITRAGE WINNER</span>
        </div>
        <p style="font-size:12px; color:#6B7280; margin-bottom:12px;">Delivered refinery gate parity: FOB + tanker freight + insurance + sulfur treatment.</p>
        <div id="selectedCrudeBreakdownCard"></div>
        <div class="arb-waterfall" id="arbWaterfallContainer"></div>
      </div>
    </div>
  `;
}

function initArbitrageCalculator() {
  const pillsContainer = document.getElementById("calcCrudePills");
  if (pillsContainer && OIL_DATA.crudeAssays) {
    const keys = Object.keys(OIL_DATA.crudeAssays);
    pillsContainer.innerHTML = keys.map(k => {
      const c = OIL_DATA.crudeAssays[k];
      return `
        <button class="map-pill-btn ${k === STATE.selectedCrudeCode ? 'active' : ''}" 
                id="btnCrudePill_${k}" 
                onclick="selectCalcCrude('${k}')"
                style="padding:6px 8px; font-size:11px; text-align:center;">
          <div><strong>${c.name}</strong></div>
          <div style="font-size:10px; opacity:0.8;">${c.api}° | ${c.sulfur}%S</div>
        </button>
      `;
    }).join("");
  }

  recalculateArbitrage();
}

function selectCalcCrude(crudeCode) {
  STATE.selectedCrudeCode = crudeCode;
  document.querySelectorAll("#calcCrudePills button").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`btnCrudePill_${crudeCode}`);
  if (btn) btn.classList.add("active");
  recalculateArbitrage();
}

function resetCalculatorDefaults() {
  const sb = document.getElementById("sliderDatedBrent");
  const se = document.getElementById("sliderBrentDubaiEfs");
  const sf = document.getElementById("sliderVlccFreight");
  const su = document.getElementById("sliderUralsDiscount");
  if (sb) sb.value = 74.5;
  if (se) se.value = 0.70;
  if (sf) sf.value = 2.15;
  if (su) su.value = -12.5;

  STATE.selectedCrudeCode = "ARAB_LIGHT";
  document.querySelectorAll("#calcCrudePills button").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("btnCrudePill_ARAB_LIGHT");
  if (btn) btn.classList.add("active");
  recalculateArbitrage();
}

function recalculateArbitrage() {
  const destSelect = document.getElementById("calcDestSelect");
  if (!destSelect) return;
  const dest = destSelect.value;
  const datedBrent = parseFloat(document.getElementById("sliderDatedBrent").value);
  const efs = parseFloat(document.getElementById("sliderBrentDubaiEfs").value);
  const baseFreight = parseFloat(document.getElementById("sliderVlccFreight").value);
  const uralsDisc = parseFloat(document.getElementById("sliderUralsDiscount").value);

  const approxWs = Math.round((baseFreight / 3.68) * 100);
  document.getElementById("valDatedBrent").textContent = `$${datedBrent.toFixed(2)}`;
  document.getElementById("valBrentDubaiEfs").textContent = `${efs >= 0 ? '+' : ''}$${efs.toFixed(2)}`;
  document.getElementById("valVlccFreight").textContent = `$${baseFreight.toFixed(2)}/bbl (WS ${approxWs})`;
  document.getElementById("valUralsDiscount").textContent = `$${uralsDisc.toFixed(2)}`;

  const dubaiCash = datedBrent - efs;

  let destMultiplier = 1.0;
  if (dest === "india") destMultiplier = 0.42;
  else if (dest === "japan") destMultiplier = 1.08;
  else if (dest === "korea") destMultiplier = 1.04;

  const assays = OIL_DATA.crudeAssays || {};
  const crudeKeys = Object.keys(assays);

  const contenders = crudeKeys.map(k => {
    const c = assays[k];
    let fob = dubaiCash;
    let freight = baseFreight * destMultiplier;
    let insurance = 0.18;
    let desulf = c.desulfCost;
    let isEligible = true;
    let blockReason = "";

    if (k === "URALS") {
      fob = datedBrent + uralsDisc;
      // Urals sails ~10,000-12,000 nm on Suezmax/Aframax with shadow fleet premium
      const uralsMult = (dest === "india" ? 2.50 : 3.20);
      freight = baseFreight * uralsMult;
      insurance = 0.85;
      if (dest === "japan" || dest === "korea") {
        isEligible = false;
        blockReason = "BLOCKED: G7 Sanctions Compliance";
      }
    } else if (k === "WTI_MIDLAND") {
      fob = datedBrent - 3.70;
      // WTI Midland sails 15,000 nm from US Gulf Coast via Cape of Good Hope
      const wtiMult = (dest === "india" ? 2.60 : 2.25);
      freight = baseFreight * wtiMult;
      insurance = 0.15;
      if (dest === "korea") {
        fob -= 1.20; // KORUS FTA 0% tariff benefit
      }
    } else {
      fob = dubaiCash + c.ospDiff;
    }

    const total = fob + freight + insurance + desulf;

    let color = "#d97706";
    if (k === "URALS") color = "#dc2626";
    else if (k === "WTI_MIDLAND") color = "#0284c7";
    else if (k === "MURBAN") color = "#059669";

    return {
      code: k,
      name: c.name,
      origin: c.origin,
      api: c.api,
      sulfur: c.sulfur,
      fob,
      freight,
      insurance,
      desulfurization: desulf,
      total,
      isEligible,
      blockReason,
      color
    };
  });

  const eligibleContenders = contenders.filter(c => c.isEligible).sort((a, b) => a.total - b.total);
  const winner = eligibleContenders[0] || contenders[0];

  const winnerText = document.getElementById("winnerCrudeText");
  const winnerReason = document.getElementById("winnerReasonText");
  if (winnerText && winnerReason) {
    winnerText.textContent = `${winner.name} ($${winner.total.toFixed(2)}/bbl landed into ${dest.toUpperCase()})`;
    if (winner.code === "URALS") {
      winnerReason.textContent = "Deep discount overcomes longer voyage freight from Baltic/Black Sea.";
    } else if (winner.code === "WTI_MIDLAND") {
      winnerReason.textContent = "KORUS FTA zero tariff and minimal sulfur penalty give light-ends advantage.";
    } else if (winner.code === "ARAB_LIGHT" || winner.code === "ARAB_MEDIUM") {
      winnerReason.textContent = "Short voyage freight advantage and balanced yields for coking refineries.";
    } else {
      winnerReason.textContent = "Delivered parity advantage based on freight and OSP pricing.";
    }
  }

  const badge = document.getElementById("arbWinnerBadge");
  if (badge) {
    badge.textContent = `MOST ECONOMIC: ${winner.name} ($${winner.total.toFixed(2)}/bbl Landed)`;
  }

  // Highlight Selected Crude in top breakdown banner
  const selCard = document.getElementById("selectedCrudeBreakdownCard");
  const selectedCode = STATE.selectedCrudeCode || "ARAB_LIGHT";
  const selCrude = contenders.find(c => c.code === selectedCode) || contenders[0];

  if (selCard && selCrude) {
    selCard.innerHTML = `
      <div style="background:#f8fafc; border:1.5px solid #0284c7; border-radius:8px; padding:12px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#0284c7;">
            🎯 SELECTED CRUDE: ${selCrude.name.toUpperCase()} (${selCrude.api}° API / ${selCrude.sulfur}% S)
          </div>
          <div style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:#0f172a;">
            Landed Total: $${selCrude.total.toFixed(2)}/bbl
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-family:var(--font-mono); font-size:11px;">
          <div>FOB Cargo: <strong>$${selCrude.fob.toFixed(2)}</strong></div>
          <div>Tanker Freight: <strong style="color:var(--color-me-gold); font-size:12px;">$${selCrude.freight.toFixed(2)}/bbl</strong></div>
          <div>Insurance/Port: <strong>$${selCrude.insurance.toFixed(2)}</strong></div>
          <div>Desulf Cost: <strong style="color:var(--color-russia-red);">+$${selCrude.desulfurization.toFixed(2)}</strong></div>
        </div>
      </div>
    `;
  }

  const waterfallContainer = document.getElementById("arbWaterfallContainer");
  if (waterfallContainer) {
    waterfallContainer.innerHTML = contenders.map(c => {
      const isSelected = (c.code === selectedCode);
      const isWin = (c.code === winner.code);
      const borderStyle = isWin ? '1.5px solid #10b981' : isSelected ? '1.5px solid #0284c7' : '1px solid var(--border-subtle)';
      const bgStyle = isWin ? '#ecfdf5' : isSelected ? '#f0f9ff' : '#ffffff';

      return `
        <div onclick="selectCalcCrude('${c.code}')" style="background:${bgStyle}; border:${borderStyle}; border-radius:6px; padding:12px; margin-bottom:8px; box-shadow:var(--shadow-ft-card); cursor:pointer;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-family:var(--font-mono); font-size:13px;">
            <div>
              <span style="font-weight:700; color:${c.color};">${c.name}</span>
              <span style="font-size:11px; color:#6B7280; margin-left:8px;">${c.api}° API / ${c.sulfur}% S</span>
              ${isWin ? '<span style="background:#10b981; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:3px; margin-left:8px;">★ LOWEST COST</span>' : ''}
              ${isSelected && !isWin ? '<span style="background:#0284c7; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:3px; margin-left:8px;">SELECTED</span>' : ''}
            </div>
            <span style="font-weight:800; color:${c.isEligible ? '#111827' : '#dc2626'};">
              ${c.isEligible ? `$${c.total.toFixed(2)} / bbl Landed` : c.blockReason}
            </span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; font-family:var(--font-mono); font-size:11px; color:#6B7280;">
            <div>FOB Cargo: <strong style="color:#111827;">$${c.fob.toFixed(2)}</strong></div>
            <div>Tanker Freight: <strong style="color:var(--color-me-gold); font-size:12px;">$${c.freight.toFixed(2)}/bbl</strong></div>
            <div>Insurance/Port: <strong style="color:#111827;">$${c.insurance.toFixed(2)}</strong></div>
            <div>Desulf Cost: <strong style="color:var(--color-russia-red);">+$${c.desulfurization.toFixed(2)}</strong></div>
          </div>
        </div>
      `;
    }).join("");
  }
}

/* ==========================================================================
   5. LEAFLET MAPS IMPLEMENTATION FOR CHAPTERS
   ========================================================================== */
function initBuyerSourcingMap() {
  const mapEl = document.getElementById("buyerSourcingMap");
  if (!mapEl || typeof L === "undefined") return;

  if (STATE.mapInstance) {
    STATE.mapInstance.remove();
    STATE.mapInstance = null;
  }

  STATE.mapInstance = L.map("buyerSourcingMap", {
    center: [32.0, 115.0],
    zoom: 4,
    minZoom: 2,
    maxZoom: 9,
    zoomControl: false
  });

  L.control.zoom({ position: "topleft" }).addTo(STATE.mapInstance);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(STATE.mapInstance);

  // Plot terminals for China by default
  plotBuyerTerminals("china");
}

function zoomSourcingMap(buyerKey) {
  if (!STATE.mapInstance || !OIL_DATA.asianBuyers[buyerKey]) return;

  const centers = {
    china: { center: [32.0, 115.0], zoom: 4 },
    india: { center: [21.0, 78.0], zoom: 4 },
    japan: { center: [36.0, 138.0], zoom: 5 },
    southKorea: { center: [36.0, 128.0], zoom: 5 }
  };

  const cfg = centers[buyerKey] || centers.china;
  STATE.mapInstance.flyTo(cfg.center, cfg.zoom, { duration: 1.2 });

  document.querySelectorAll(".section-header .map-pill-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");

  plotBuyerTerminals(buyerKey);
}

function plotBuyerTerminals(buyerKey) {
  if (!STATE.mapInstance) return;

  // Clear existing markers
  STATE.mapInstance.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      STATE.mapInstance.removeLayer(layer);
    }
  });

  const b = OIL_DATA.asianBuyers[buyerKey];
  if (!b || !b.primaryTerminals) return;

  b.primaryTerminals.forEach(t => {
    const icon = L.divIcon({
      className: "terminal-pin",
      html: `<div style="background:#0284c7; width:14px; height:14px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 6px rgba(2,132,199,0.6);"></div>`,
      iconSize: [14, 14]
    });

    L.marker([t.lat, t.lng], { icon })
      .addTo(STATE.mapInstance)
      .bindPopup(`
        <div style="font-family:var(--font-mono); font-size:12px;">
          <strong style="color:#0284c7;">⚓ ${t.name}</strong><br/>
          <span style="color:#374151;">${t.type}</span>
        </div>
      `);
  });
}

function initTankerRouteMap() {
  const mapEl = document.getElementById("tankerRouteMap");
  if (!mapEl || typeof L === "undefined") return;

  if (STATE.mapInstance) {
    STATE.mapInstance.remove();
    STATE.mapInstance = null;
  }

  STATE.mapInstance = L.map("tankerRouteMap", {
    center: [18.0, 85.0],
    zoom: 3,
    minZoom: 2,
    maxZoom: 9,
    zoomControl: false
  });

  L.control.zoom({ position: "topleft" }).addTo(STATE.mapInstance);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(STATE.mapInstance);

  // Plot Chokepoints
  if (OIL_DATA.chokepoints) {
    OIL_DATA.chokepoints.forEach(cp => {
      const icon = L.divIcon({
        className: "cp-icon",
        html: `<div style="background:#dc2626; width:12px; height:12px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 8px rgba(220,38,38,0.6);"></div>`,
        iconSize: [12, 12]
      });

      L.marker(cp.location, { icon })
        .addTo(STATE.mapInstance)
        .bindPopup(`
          <div style="font-family:var(--font-mono); font-size:12px;">
            <strong style="color:#dc2626;">🚨 CHOKEPOINT: ${cp.name}</strong><br/>
            <strong>Daily Flow:</strong> ${cp.dailyVolumeMbd} Mb/d<br/>
            <strong>Key Risk:</strong> ${cp.keyRisk}
          </div>
        `);
    });
  }

  // Populate Route Buttons
  const btnList = document.getElementById("routeButtonList");
  if (btnList && OIL_DATA.tankerRoutes) {
    btnList.innerHTML = OIL_DATA.tankerRoutes.map((r, i) => `
      <button class="map-route-btn ${i === 0 ? 'active' : ''}" onclick="selectTankerRoute('${r.id}')" id="btnRoute_${r.id}">
        <span>${r.name.split('→')[0].trim()} → ${r.name.split('→')[1].trim()}</span>
        <span style="color:var(--color-atlantic-marine); font-weight:700;">${r.transitDays}d</span>
      </button>
    `).join("");
  }

  selectTankerRoute(STATE.activeRouteId);
}

function selectTankerRoute(routeId) {
  STATE.activeRouteId = routeId;
  const route = OIL_DATA.tankerRoutes.find(r => r.id === routeId);
  if (!route || !STATE.mapInstance) return;

  document.querySelectorAll(".map-route-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`btnRoute_${routeId}`);
  if (btn) btn.classList.add("active");

  const vClass = document.getElementById("hudVesselClass");
  const dist = document.getElementById("hudDistance");
  const dur = document.getElementById("hudDuration");
  const freight = document.getElementById("hudFreight");

  if (vClass) vClass.textContent = route.vesselClass;
  if (dist) dist.textContent = `${route.distanceNm.toLocaleString()} nm`;
  if (dur) dur.textContent = `${route.transitDays} Days (@${route.speedKnots} kts)`;
  if (freight) freight.textContent = `$${route.freightCostPerBbl.toFixed(2)} / bbl`;

  if (STATE.routePolyline) STATE.mapInstance.removeLayer(STATE.routePolyline);
  if (STATE.vesselMarker) STATE.mapInstance.removeLayer(STATE.vesselMarker);
  if (STATE.vesselAnimationId) cancelAnimationFrame(STATE.vesselAnimationId);

  STATE.routePolyline = L.polyline(route.waypoints, {
    color: "#0284c7",
    weight: 3.5,
    opacity: 0.85,
    dashArray: "6, 8"
  }).addTo(STATE.mapInstance);

  STATE.mapInstance.fitBounds(STATE.routePolyline.getBounds(), { padding: [50, 50] });

  const shipIcon = L.divIcon({
    className: "ship-icon",
    html: `<div style="background:#d97706; width:16px; height:16px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 10px rgba(217,119,6,0.8);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  STATE.vesselMarker = L.marker(route.waypoints[0], { icon: shipIcon }).addTo(STATE.mapInstance);

  animateVesselAlongPath(route.waypoints);
}

function animateVesselAlongPath(waypoints) {
  let currentSegment = 0;
  let progress = 0;
  const speed = 0.005;

  function step() {
    if (!STATE.vesselMarker || currentSegment >= waypoints.length - 1) {
      currentSegment = 0;
      progress = 0;
    }

    const start = waypoints[currentSegment];
    const end = waypoints[currentSegment + 1];

    if (!start || !end) return;

    progress += speed;
    if (progress >= 1) {
      progress = 0;
      currentSegment++;
      if (currentSegment >= waypoints.length - 1) {
        currentSegment = 0;
      }
    }

    const currentLat = start[0] + (end[0] - start[0]) * progress;
    const currentLng = start[1] + (end[1] - start[1]) * progress;

    STATE.vesselMarker.setLatLng([currentLat, currentLng]);
    STATE.vesselAnimationId = requestAnimationFrame(step);
  }

  STATE.vesselAnimationId = requestAnimationFrame(step);
}

/* ==========================================================================
   6. THREE.JS 3D INTERACTIVE GLOBE ENGINE
   ========================================================================== */
function initThreeJsGlobe() {
  if (window.MARITIME_ENGINE && typeof window.MARITIME_ENGINE.initMapLibreHeroGlobe === "function") {
    const ok = window.MARITIME_ENGINE.initMapLibreHeroGlobe();
    if (ok) return;
  }
  const container = document.getElementById("threeGlobeContainer");
  if (!container || typeof THREE === "undefined") return;

  const width = container.clientWidth || 550;
  const height = container.clientHeight || 440;

  STATE.globeScene = new THREE.Scene();
  STATE.globeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  STATE.globeCamera.position.set(0, 0, 240);

  STATE.globeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  STATE.globeRenderer.setSize(width, height);
  STATE.globeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  container.innerHTML = "";
  container.appendChild(STATE.globeRenderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
  STATE.globeScene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffedd5, 2.2);
  sunLight.position.set(120, 80, 100);
  STATE.globeScene.add(sunLight);

  // Earth Sphere
  const radius = 70;
  const globeGeo = new THREE.SphereGeometry(radius, 64, 64);
  const globeMat = new THREE.MeshPhongMaterial({
    color: 0xf7f4eb,
    emissive: 0xede8db,
    specular: 0x0284c7,
    shininess: 15,
    wireframe: false
  });

  STATE.globeMesh = new THREE.Mesh(globeGeo, globeMat);
  STATE.globeScene.add(STATE.globeMesh);

  // Grid wireframe overlay
  const wireGeo = new THREE.SphereGeometry(radius * 1.008, 36, 36);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xd8cebc,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  STATE.globeMesh.add(wireMesh);

  // 4 Color-Coded Planetary Arcs
  // 1. Middle East -> Asia (Gold)
  addTradeArc([26.6, 50.1], [30.0, 122.0], 0xd97706, radius);
  addTradeArc([26.6, 50.1], [22.4, 70.0], 0xd97706, radius);
  // 2. Russia -> Asia (Red)
  addTradeArc([42.7, 133.0], [36.0, 120.3], 0xdc2626, radius);
  addTradeArc([60.0, 30.0], [22.4, 70.0], 0xdc2626, radius);
  // 3. US Gulf -> Asia (Cyan)
  addTradeArc([27.8, -97.4], [35.5, 129.3], 0x0284c7, radius);
  // 4. West Africa -> Asia (Purple)
  addTradeArc([-5.5, 12.2], [29.8, 121.5], 0x7c3aed, radius);

  // Focus on Asia
  STATE.globeMesh.rotation.y = -1.2;

  function animateGlobe() {
    if (STATE.globeRotating && STATE.globeMesh) {
      STATE.globeMesh.rotation.y += 0.002;
    }
    STATE.globeRenderer.render(STATE.globeScene, STATE.globeCamera);
    STATE.globeAnimationId = requestAnimationFrame(animateGlobe);
  }

  animateGlobe();

  // Resize listener
  window.addEventListener("resize", () => {
    if (!container || !STATE.globeRenderer || !STATE.globeCamera) return;
    const newW = container.clientWidth || 550;
    const newH = container.clientHeight || 440;
    STATE.globeCamera.aspect = newW / newH;
    STATE.globeCamera.updateProjectionMatrix();
    STATE.globeRenderer.setSize(newW, newH);
  });
}

function latLngToVec(lat, lng, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function addTradeArc(start, end, colorHex, radius) {
  const startVec = latLngToVec(start[0], start[1], radius);
  const endVec = latLngToVec(end[0], end[1], radius);
  const midVec = startVec.clone().add(endVec).multiplyScalar(0.5);
  const dist = startVec.distanceTo(endVec);
  midVec.setLength(radius + dist * 0.28);

  const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: colorHex, linewidth: 2.5, transparent: true, opacity: 0.85 });
  const line = new THREE.Line(geometry, material);
  STATE.globeMesh.add(line);

  // Pin markers
  [startVec, endVec].forEach(vec => {
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 16, 16),
      new THREE.MeshBasicMaterial({ color: colorHex })
    );
    pin.position.copy(vec);
    STATE.globeMesh.add(pin);
  });
}

function toggleGlobeRotation() {
  STATE.globeRotating = !STATE.globeRotating;
  if (window.MARITIME_ENGINE && typeof window.MARITIME_ENGINE.setGlobeRotating === "function") {
    window.MARITIME_ENGINE.setGlobeRotating(STATE.globeRotating);
  }
  const btn = document.getElementById("btnToggleGlobeRotate");
  if (btn) {
    btn.innerHTML = STATE.globeRotating 
      ? `<span>⏸️</span> Pause Globe Orbit` 
      : `<span>▶️</span> Resume Globe Orbit`;
  }
}

function setMocStep(idx) {
  STATE.activeMocStep = idx;
  document.querySelectorAll(".moc-step-card").forEach((card, i) => {
    if (i === idx) card.classList.add("active");
    else card.classList.remove("active");
  });

  const descriptions = [
    "16:00 SGT — Window Opens: Electronic Platts Editorial Window begins; 25,000-barrel partial bids entered.",
    "16:15 SGT — Market Liquidity Surge: Global trading houses, majors, and IOCs match bids and offers in 25k lots.",
    "16:25 SGT — Critical Mass: Counterparties accumulate 18 to 19 partials. Price transparency peaks.",
    "16:30 SGT — Physical Convergence: 20th partial executes (500k bbls). Seller declares physical cargo of Upper Zakum, Oman, or Murban."
  ];

  const status = document.getElementById("mocStepStatus");
  if (status) status.textContent = descriptions[idx];
}
