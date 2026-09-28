import React, { useState } from 'react';
import { CRUDE_ASSAYS, ASIAN_BUYERS } from '../data/crudeData';
import { CrudeChoiceResult } from '../types';

export const CrudeChoiceSimulator: React.FC = () => {
  const [selectedCrudeKey, setSelectedCrudeKey] = useState<string>('ARAB_LIGHT');
  const [selectedDestKey, setSelectedDestKey] = useState<string>('china');
  const [datedBrent, setDatedBrent] = useState<number>(74.50);
  const [vlccWorldscale, setVlccWorldscale] = useState<number>(58.5);

  const crudeKeys = Object.keys(CRUDE_ASSAYS);
  const buyerKeys = Object.keys(ASIAN_BUYERS);

  // Compute parity for all 7 crudes into the chosen destination
  const calculateResults = (): CrudeChoiceResult[] => {
    const baseDubai = datedBrent - 0.70;
    const baseMeFreight = (vlccWorldscale / 100) * 3.68;

    let destFreightMult = 1.0;
    if (selectedDestKey === 'india') destFreightMult = 0.42;
    else if (selectedDestKey === 'japan') destFreightMult = 1.08;
    else if (selectedDestKey === 'southKorea') destFreightMult = 1.04;

    const items: CrudeChoiceResult[] = crudeKeys.map((key) => {
      const assay = CRUDE_ASSAYS[key];
      let fob = baseDubai;
      let freight = baseMeFreight * destFreightMult;
      let ospImpact = assay.ospDifferential;
      let qualityAdj = assay.desulfurizationCostPerBbl;
      let yieldAdv = (assay.api - 31.0) * 0.35; // Light crude yield premium
      let isEligible = true;

      if (key === 'URALS') {
        fob = datedBrent - 12.50; // Discounted FOB
        freight = selectedDestKey === 'india' ? 5.80 : 7.20;
        ospImpact = -12.50;
        if (selectedDestKey === 'japan' || selectedDestKey === 'southKorea') {
          isEligible = false;
        }
      } else if (key === 'WTI_MIDLAND') {
        fob = datedBrent - 3.70;
        freight = 4.80;
        ospImpact = -3.70;
        if (selectedDestKey === 'southKorea') {
          fob -= 1.20; // KORUS FTA 0% tariff advantage
        }
      } else {
        fob = baseDubai + assay.ospDifferential;
      }

      const deliveredCost = Number((fob + freight + 0.18 + qualityAdj).toFixed(2));
      const netRefineryValue = Number((10.50 + yieldAdv - deliveredCost + datedBrent).toFixed(2));

      return {
        crudeCode: assay.code,
        crudeName: assay.name,
        origin: assay.origin,
        api: assay.api,
        sulfur: assay.sulfur,
        fobPrice: Number(fob.toFixed(2)),
        freightCost: Number(freight.toFixed(2)),
        ospImpact: Number(ospImpact.toFixed(2)),
        qualityAdjustment: Number(qualityAdj.toFixed(2)),
        yieldAdvantage: Number(yieldAdv.toFixed(2)),
        deliveredCost: isEligible ? deliveredCost : 999,
        netRefineryValue: isEligible ? netRefineryValue : -999,
        isRecommended: false,
        recommendationReason: ''
      };
    });

    const eligible = items.filter(i => i.deliveredCost < 500).sort((a, b) => a.deliveredCost - b.deliveredCost);
    if (eligible.length > 0) {
      eligible[0].isRecommended = true;
      if (eligible[0].crudeCode === 'URALS') {
        eligible[0].recommendationReason = 'Unbeatable post-sanctions discount overcomes longer voyage freight.';
      } else if (eligible[0].crudeCode === 'WTI_MIDLAND') {
        eligible[0].recommendationReason = 'Zero tariff under KORUS and ultra-low sulfur saves cleaning costs.';
      } else if (eligible[0].crudeCode === 'ARAB_LIGHT' || eligible[0].crudeCode === 'ARAB_MEDIUM') {
        eligible[0].recommendationReason = 'Short voyage shipping advantage and ideal balance for complex coking units.';
      } else {
        eligible[0].recommendationReason = 'Optimal delivered netback parity for this refinery diet.';
      }
    }

    return items;
  };

  const results = calculateResults();
  const activeCrudeResult = results.find(r => r.crudeCode === selectedCrudeKey) || results[0];
  const recommendedCrude = results.find(r => r.isRecommended) || results[0];

  return (
    <div className="bg-white rounded-xl border border-paper-border p-6 md:p-8 shadow-ft-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-paper-border pb-6 mb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ft-marine">
            Interactive Commercial Decision Tool
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mt-1">
            Crude Choice Simulator
          </h2>
          <p className="text-sm text-ink-light mt-1">
            Select a crude and an Asian destination to see delivered cost, freight, refinery yields, and the winning recommendation.
          </p>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-emerald-800 font-bold">
          RECOMMENDED: {recommendedCrude.crudeName} (${recommendedCrude.deliveredCost}/bbl)
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink-muted mb-2">
            1. Select Crude Oil (7 Grudes)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {crudeKeys.map(k => {
              const c = CRUDE_ASSAYS[k];
              return (
                <button
                  key={k}
                  onClick={() => setSelectedCrudeKey(k)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedCrudeKey === k
                      ? 'border-ft-marine bg-sky-50/50 shadow-sm font-bold text-ft-marine'
                      : 'border-paper-border bg-paper hover:bg-paper-subtle text-ink'
                  }`}
                >
                  <div className="text-xs truncate">{c.name}</div>
                  <div className="text-[10px] text-ink-muted font-mono">{c.api}° / {c.sulfur}%S</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink-muted mb-2">
            2. Select Destination Country (4 Buyers)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {buyerKeys.map(k => {
              const b = ASIAN_BUYERS[k];
              return (
                <button
                  key={k}
                  onClick={() => setSelectedDestKey(k)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedDestKey === k
                      ? 'border-ft-gold bg-amber-50/50 shadow-sm font-bold text-amber-900'
                      : 'border-paper-border bg-paper hover:bg-paper-subtle text-ink'
                  }`}
                >
                  <div className="text-base mb-0.5">{b.flag}</div>
                  <div className="text-xs">{b.name}</div>
                  <div className="text-[10px] text-ink-muted font-mono">{b.totalImportsMbd} Mb/d</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sliders for Market Sensitivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-paper-subtle p-4 rounded-xl border border-paper-border mb-8">
        <div>
          <div className="flex justify-between text-xs font-mono text-ink-muted mb-1">
            <span>DATED BRENT BASELINE:</span>
            <span className="font-bold text-ink">${datedBrent.toFixed(2)} / bbl</span>
          </div>
          <input
            type="range"
            min="50"
            max="110"
            step="0.5"
            value={datedBrent}
            onChange={(e) => setDatedBrent(parseFloat(e.target.value))}
            className="w-full accent-ft-marine cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono text-ink-muted mb-1">
            <span>VLCC TD3C FREIGHT RATE:</span>
            <span className="font-bold text-ink">WS {vlccWorldscale.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="35"
            max="120"
            step="1.0"
            value={vlccWorldscale}
            onChange={(e) => setVlccWorldscale(parseFloat(e.target.value))}
            className="w-full accent-ft-gold cursor-pointer"
          />
        </div>
      </div>

      {/* Selected Crude Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <div className="bg-paper p-3 rounded-lg border border-paper-border">
          <span className="font-mono text-[10px] text-ink-muted uppercase">FOB Cargo</span>
          <div className="font-mono text-lg font-bold text-ink">${activeCrudeResult.fobPrice}</div>
          <span className="text-[10px] text-ink-muted">At Loading Port</span>
        </div>
        <div className="bg-paper p-3 rounded-lg border border-paper-border">
          <span className="font-mono text-[10px] text-ink-muted uppercase">Tanker Freight</span>
          <div className="font-mono text-lg font-bold text-ft-gold">${activeCrudeResult.freightCost}</div>
          <span className="text-[10px] text-ink-muted">Ocean Shipping</span>
        </div>
        <div className="bg-paper p-3 rounded-lg border border-paper-border">
          <span className="font-mono text-[10px] text-ink-muted uppercase">Quality / Sulfur Clean</span>
          <div className="font-mono text-lg font-bold text-ft-claret">-${activeCrudeResult.qualityAdjustment}</div>
          <span className="text-[10px] text-ink-muted">Desulfurization Cost</span>
        </div>
        <div className="bg-paper p-3 rounded-lg border border-paper-border">
          <span className="font-mono text-[10px] text-ink-muted uppercase">Yield Advantage</span>
          <div className="font-mono text-lg font-bold text-ft-emerald">+${activeCrudeResult.yieldAdvantage}</div>
          <span className="text-[10px] text-ink-muted">Light Product Value</span>
        </div>
        <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200 col-span-2 md:col-span-1">
          <span className="font-mono text-[10px] text-amber-800 uppercase font-bold">Total Landed Cost</span>
          <div className="font-mono text-lg font-bold text-amber-900">
            {activeCrudeResult.deliveredCost > 500 ? 'BLOCKED' : `$${activeCrudeResult.deliveredCost}`}
          </div>
          <span className="text-[10px] text-amber-700">Delivered to Refinery</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-paper-border text-ink-muted">
              <th className="py-2.5 px-3">CRUDE</th>
              <th className="py-2.5 px-3">API / SULFUR</th>
              <th className="py-2.5 px-3">FOB PRICE</th>
              <th className="py-2.5 px-3">FREIGHT</th>
              <th className="py-2.5 px-3">SULFUR COST</th>
              <th className="py-2.5 px-3">TOTAL DELIVERED</th>
              <th className="py-2.5 px-3">DECISION</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr
                key={r.crudeCode}
                className={`border-b border-paper-border transition-all ${
                  r.isRecommended ? 'bg-emerald-50/70 font-bold' : r.crudeCode === selectedCrudeKey ? 'bg-sky-50/40' : 'hover:bg-paper-subtle'
                }`}
              >
                <td className="py-2.5 px-3 text-ink font-sans font-bold">{r.crudeName}</td>
                <td className="py-2.5 px-3 text-ink-muted">{r.api}° / {r.sulfur}%</td>
                <td className="py-2.5 px-3">${r.fobPrice}</td>
                <td className="py-2.5 px-3 text-ft-gold">${r.freightCost}</td>
                <td className="py-2.5 px-3 text-ft-claret">${r.qualityAdjustment}</td>
                <td className="py-2.5 px-3 text-ink font-bold">
                  {r.deliveredCost > 500 ? <span className="text-ft-claret">SANCTIONED</span> : `$${r.deliveredCost}`}
                </td>
                <td className="py-2.5 px-3">
                  {r.isRecommended ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ★ BEST BUY
                    </span>
                  ) : r.deliveredCost > 500 ? (
                    <span className="text-ink-muted text-[10px]">Restricted</span>
                  ) : (
                    <span className="text-ink-muted text-[10px]">Competitive</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 rounded-lg bg-paper-subtle border border-paper-border text-xs text-ink-light leading-relaxed">
        <strong>Commercial Procurement Insight:</strong> {recommendedCrude.crudeName} is the most economic choice for {ASIAN_BUYERS[selectedDestKey].name} refineries under current freight and price conditions. {recommendedCrude.recommendationReason}
      </div>
    </div>
  );
};
