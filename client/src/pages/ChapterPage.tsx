import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PLAIN_ENGLISH_CHAPTERS, NINE_MIDDLE_EAST_GRADES, SEVEN_SELECTION_PILLARS, CITATIONS, ASIAN_BUYERS } from '../data/crudeData';
import { MapboxViewer } from '../components/MapboxViewer';
import { CrudeChoiceSimulator } from '../components/CrudeChoiceSimulator';

export const ChapterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chapterId = parseInt(id || '1', 10);

  const chapter = PLAIN_ENGLISH_CHAPTERS.find(c => c.id === chapterId) || PLAIN_ENGLISH_CHAPTERS[0];

  // Interactive states for Chapter 3 OSP & Chapter 4 Refinery Simulator
  const [ospBase, setOspBase] = useState(74.0);
  const [ospDiff, setOspDiff] = useState(1.80);
  const [simApi, setSimApi] = useState(32.8);
  const [simSulfur, setSimSulfur] = useState(1.97);
  const [simFreight, setSimFreight] = useState(2.15);
  const [simCountry, setSimCountry] = useState('China');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && chapterId < 12) {
        navigate(`/chapter/${chapterId + 1}`);
      } else if (e.key === 'ArrowLeft' && chapterId > 1) {
        navigate(`/chapter/${chapterId - 1}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapterId, navigate]);

  const getInitialMapForChapter = (chId: number): string => {
    switch (chId) {
      case 1: return 'dubai_oman_eco';
      case 2: return 'china_sourcing';
      case 3: return 'saudi_china';
      case 4: return 'india_sourcing';
      case 5: return 'russia_india';
      case 6: return 'dubai_oman_eco';
      case 7: return 'hormuz_tactical';
      case 8: return 'saudi_china';
      default: return 'china_sourcing';
    }
  };

  return (
    <div className="space-y-8 pb-16 text-[#0f172a]">
      {/* Chapter Hero */}
      <div className="bg-white rounded-xl border border-paper-border p-8 shadow-ft-card">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-ft-claret uppercase tracking-wider bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            CHAPTER {String(chapter.id).padStart(2, '0')} OF 12
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mt-2">
          {chapter.title}
        </h1>
        <h2 className="text-base md:text-lg font-sans text-ft-gold font-bold mt-1">
          {chapter.subtitle}
        </h2>
        <p className="text-sm text-[#1e293b] font-medium mt-3 max-w-3xl leading-relaxed">
          {chapter.summary}
        </p>

        {/* Mandatory 3-Question Framework in Plain English (High Contrast) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-paper-border">
          <div className="bg-paper p-4 rounded-lg border-l-4 border-ft-marine">
            <span className="font-mono text-xs font-bold uppercase text-ft-marine flex items-center gap-1.5 mb-1.5">
              <span>🔍</span> What is this?
            </span>
            <p className="text-xs text-[#1e293b] font-medium leading-relaxed">
              {getWhatHappened(chapter.id)}
            </p>
          </div>

          <div className="bg-paper p-4 rounded-lg border-l-4 border-ft-gold">
            <span className="font-mono text-xs font-bold uppercase text-ft-gold flex items-center gap-1.5 mb-1.5">
              <span>⚖️</span> Why does it matter to Asia?
            </span>
            <p className="text-xs text-[#1e293b] font-medium leading-relaxed">
              {getWhyItMatters(chapter.id)}
            </p>
          </div>

          <div className="bg-paper p-4 rounded-lg border-l-4 border-ft-emerald">
            <span className="font-mono text-xs font-bold uppercase text-ft-emerald flex items-center gap-1.5 mb-1.5">
              <span>📈</span> Trading impact &amp; Who wins/loses
            </span>
            <p className="text-xs text-[#1e293b] font-medium leading-relaxed">
              {getMarketImpact(chapter.id)}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Map Storytelling Engine */}
      <MapboxViewer initialMapId={getInitialMapForChapter(chapter.id)} />

      {/* CHAPTER 1: DUBAI / OMAN ECOSYSTEM & 9 MIDDLE EASTERN GRADES */}
      {chapter.id === 1 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-paper-border shadow-ft-card">
            <h3 className="font-serif text-2xl font-bold text-[#0f172a] mb-4">
              Animated Flow: Oil Field &rarr; Gathering System &rarr; Export Terminal &rarr; Tanker &rarr; Asia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: '1. Oil Field', desc: 'Fahud & Yibal (Oman), Fateh (Dubai), Ghawar (Saudi), Bab (UAE) pump crude from 2,500m deep.' },
                { step: '2. Gathering System', desc: 'Field pipelines carry oil to plants (Abqaiq, Habshan) to strip out toxic gas and salt water.' },
                { step: '3. Export Terminal', desc: 'Stored at Mina al Fahal (Muscat), Fujairah, Ras Tanura & Basrah and pumped to offshore buoys.' },
                { step: '4. Supertanker', desc: 'VLCC ships load 2,000,000 barrels and sail 14–20 days across the Indian Ocean & Malacca.' },
                { step: '5. Asian Buyers', desc: 'Unloaded at mega-refineries in China (Ningbo), India (Jamnagar), Japan (Chiba) & Korea (Ulsan).' }
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-lg bg-amber-50/60 border-2 border-amber-300">
                  <div className="font-mono text-xs font-extrabold text-ft-claret mb-1">{s.step}</div>
                  <p className="text-xs text-[#1e293b] font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-paper-border shadow-ft-card">
            <h3 className="font-serif text-2xl font-bold text-[#0f172a] mb-4">
              The 9 Major Middle Eastern Crude Grades
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {NINE_MIDDLE_EAST_GRADES.map(g => (
                <div key={g.name} className="p-4 rounded-lg border border-paper-border bg-paper-subtle">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif font-bold text-lg text-[#0f172a]">{g.flag} {g.name}</span>
                    <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border">{g.api}° API | {g.sulfur}% S</span>
                  </div>
                  <div className="text-xs font-bold text-ft-gold mb-2">{g.country} &bull; {g.weight} {g.sweetSour}</div>
                  <div className="text-xs text-[#1e293b] space-y-1">
                    <div><strong>Fields:</strong> {g.location}</div>
                    <div><strong>Terminal:</strong> {g.terminal}</div>
                    <div><strong>Typical Buyers:</strong> {g.buyers}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 2: ASIAN CRUDE DEMAND */}
      {chapter.id === 2 && (
        <div className="bg-white p-6 rounded-xl border border-paper-border shadow-ft-card">
          <h3 className="font-serif text-2xl font-bold text-[#0f172a] mb-4">
            China, India, Japan &amp; South Korea: Demand, Sources &amp; Refineries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(ASIAN_BUYERS).map(b => (
              <div key={b.name} className="p-5 rounded-lg border border-paper-border bg-paper-subtle">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-serif text-xl font-bold text-[#0f172a]">{b.flag} {b.name}</h4>
                  <span className="font-mono text-xs font-bold bg-red-50 text-ft-claret px-2.5 py-1 rounded border border-red-200">
                    Imports: {b.totalImportsMbd} Mb/d
                  </span>
                </div>
                <p className="text-xs text-[#1e293b] mb-2"><strong>Refineries:</strong> {b.buyerStructure}</p>
                <p className="text-xs text-[#1e293b]"><strong>Sourcing Strategy:</strong> {b.tradingBehavior}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAPTER 3: OSP + FREIGHT */}
      {chapter.id === 3 && (
        <div className="bg-white p-6 rounded-xl border border-paper-border shadow-ft-card space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#0f172a]">
              Interactive Official Selling Price (OSP) Visualizer
            </h3>
            <p className="text-xs text-[#1e293b] mt-1">
              Final Invoice Price = Monthly Average of Dubai/Oman + Monthly OSP Differential
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-amber-50 rounded-lg border border-amber-300">
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#0f172a]">
                    Dubai/Oman Base Price: ${ospBase.toFixed(2)}/bbl
                  </label>
                  <input type="range" min="55" max="95" step="0.5" value={ospBase} onChange={e => setOspBase(parseFloat(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-[#0f172a]">
                    Monthly OSP Differential: {ospDiff >= 0 ? '+' : ''}${ospDiff.toFixed(2)}/bbl
                  </label>
                  <input type="range" min="-3.0" max="5.0" step="0.1" value={ospDiff} onChange={e => setOspDiff(parseFloat(e.target.value))} className="w-full" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border flex flex-col justify-center">
                <div className="font-mono text-xs font-bold text-[#334155]">FINAL INVOICE PRICE PER BARREL</div>
                <div className="font-mono text-3xl font-extrabold text-[#0f172a]">${(ospBase + ospDiff).toFixed(2)} / bbl</div>
                <div className="text-xs font-bold text-ft-claret mt-1">
                  2-Million-Barrel VLCC Cargo Cost: ${((ospBase + ospDiff) * 2000000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 4: REFINERY PREFERENCE SIMULATOR */}
      {chapter.id === 4 && (
        <div className="bg-white p-6 rounded-xl border border-paper-border shadow-ft-card">
          <h3 className="font-serif text-2xl font-bold text-[#0f172a] mb-3">
            Refinery Preferences Simulator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-paper-subtle p-4 rounded-lg border">
              <div>
                <label className="block font-mono text-xs font-bold">API Gravity: {simApi}° API</label>
                <input type="range" min="22" max="44" step="0.5" value={simApi} onChange={e => setSimApi(parseFloat(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold">Sulfur %: {simSulfur}%</label>
                <input type="range" min="0.1" max="4.2" step="0.05" value={simSulfur} onChange={e => setSimSulfur(parseFloat(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold">Freight Cost: ${simFreight}/bbl</label>
                <input type="range" min="0.9" max="6.0" step="0.1" value={simFreight} onChange={e => setSimFreight(parseFloat(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold">Destination Country:</label>
                <select value={simCountry} onChange={e => setSimCountry(e.target.value)} className="w-full p-2 border rounded font-bold">
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-white border rounded-lg space-y-2">
              <div className="text-xs font-mono font-bold text-ft-emerald">MATCHED REFINERY &amp; BUYER</div>
              <div className="font-serif text-xl font-bold text-[#0f172a]">
                {simApi < 29 || simSulfur > 2.5
                  ? `Deep Coking Mega-Refinery in ${simCountry} (Reliance Jamnagar / ZPC Zhoushan)`
                  : `Coastal Hydrocracking Complex in ${simCountry} (SK Ulsan / Sinopec Zhenhai / ENEOS)`}
              </div>
              <p className="text-xs text-[#1e293b]">
                Estimated Product Yield: <strong>{Math.round((simApi - 18) * 1.6)}% Gasoline/Naphtha</strong>, <strong>31% Diesel</strong>, <strong>15% Jet Fuel</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 12: CRUDE SIMULATOR */}
      {chapter.id === 12 && <CrudeChoiceSimulator />}

      {/* Chapter Next / Prev Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-paper-border">
        {chapter.id > 1 ? (
          <Link
            to={`/chapter/${chapter.id - 1}`}
            className="px-5 py-2.5 bg-white border border-paper-border rounded-lg text-xs font-mono font-bold text-[#0f172a] hover:border-ft-claret transition-all"
          >
            &larr; Chapter 0{chapter.id - 1}
          </Link>
        ) : (
          <Link
            to="/"
            className="px-5 py-2.5 bg-white border border-paper-border rounded-lg text-xs font-mono font-bold text-[#0f172a] hover:border-ft-claret transition-all"
          >
            &larr; Overview
          </Link>
        )}

        <div className="font-mono text-xs text-[#334155] font-bold hidden sm:inline">
          Use Left/Right Arrows (&larr; / &rarr;) on keyboard to navigate chapters
        </div>

        {chapter.id < 12 ? (
          <Link
            to={`/chapter/${chapter.id + 1}`}
            className="px-5 py-2.5 bg-ft-claret text-white font-mono font-bold rounded-lg text-xs hover:bg-ft-darkClaret transition-all"
          >
            Chapter 0{chapter.id + 1} &rarr;
          </Link>
        ) : (
          <button
            onClick={() => navigate('/simulator')}
            className="px-5 py-2.5 bg-ft-gold text-white font-mono font-bold rounded-lg text-xs hover:opacity-90 transition-all"
          >
            Open Crude Choice Tool &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

function getWhatHappened(id: number): string {
  switch (id) {
    case 1: return "Dubai's offshore Fateh fields and Oman's onshore Block 6 fields form the physical anchor for pricing 14.5 million barrels a day of Middle Eastern oil shipped to Asia.";
    case 2: return "China (11.5 Mb/d), India (4.9 Mb/d), South Korea (3.0 Mb/d), and Japan (2.5 Mb/d) operate the world's largest coastal refineries.";
    case 3: return "Around the 5th of each month, Middle East producers announce their Official Selling Price (OSP)—a premium or discount to Dubai/Oman—while VLCC, Suezmax, and Aframax ships carry the oil.";
    case 4: return "Simple refineries must buy light, low-sulfur crude, while complex coking refineries in India and China buy heavy, high-sulfur crude at steep discounts.";
    case 5: return "Atlantic crudes (WTI Midland, Brent, West Africa) and Russian crudes (Urals, ESPO, Sokol) compete directly with Middle Eastern barrels in Asia.";
    default: return "Global crude flows shift every day based on ocean shipping costs, refinery equipment, and benchmark price spreads.";
  }
}

function getWhyItMatters(id: number): string {
  switch (id) {
    case 1: return "Because Oman's Mina al Fahal terminal and Abu Dhabi's Fujairah port sit outside the Strait of Hormuz, they provide Asia with secure, bottleneck-free oil.";
    case 2: return "Each buyer has distinct needs: Japan buys 95% Middle East oil for security; India buys 39% discounted Russian Urals; China buys Oman, ESPO, and Saudi crudes.";
    case 3: return "Carrying 2 million barrels on a VLCC supertanker drops freight from Saudi Arabia to China to ~$2.15/bbl, while smaller Aframax ships run 3-day shuttles from Russia to China.";
    case 4: return "Matching the right API gravity and sulfur level to a refinery's chemical units earns an extra $4 to $7 per barrel in diesel and jet fuel profit.";
    case 5: return "Atlantic crude becomes competitive in Asia whenever the Brent-Dubai spread narrows below $1.50/bbl and Saudi/UAE OSPs are high.";
    default: return "Refinery profit margins are decided by pennies per barrel on freight, sulfur removal, and monthly OSP differentials.";
  }
}

function getMarketImpact(id: number): string {
  switch (id) {
    case 1: return "The 9 Middle Eastern grades (Oman, Murban, Arab Light/Medium/Heavy, Basrah Medium/Heavy, Upper Zakum, Das Blend) set the baseline for Asian energy supply.";
    case 2: return "Refinery buying shifts in Ningbo, Jamnagar, Ulsan, and Chiba immediately move global tanker rates and physical crude differentials.";
    case 3: return "When Aramco raises OSPs too high, Asian buyers cut term volumes and book VLCCs from the US Gulf or West Africa instead.";
    case 4: return "High-complexity Asian refineries capture billions in value by converting cheap heavy sour oil into ultra-clean transportation fuels.";
    case 5: return "Russian ESPO (3-day voyage from Kozmino to China) and Urals (via Suez to India) permanently reshaped Asian crude trade flows.";
    default: return "Asia's 22.4 Mb/d import appetite makes it the ultimate battleground for global oil producers.";
  }
}
