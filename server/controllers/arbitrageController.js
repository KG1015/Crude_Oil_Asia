/**
 * ARBITRAGE & REFINERY SOURCING CONTROLLER
 * Evaluates Middle East vs Russia vs Atlantic Basin parity into Asian refineries
 */

// Baseline crude assay definitions
const CRUDE_ASSAYS = {
  ARAB_MEDIUM: {
    name: 'Saudi Arab Medium',
    origin: 'Saudi Arabia (Ras Tanura)',
    api: 31.0,
    sulfur: 2.50,
    desulfurizationCostPerBbl: 2.60,
    ospDifferential: +0.65 // OSP to Oman/Dubai
  },
  MURBAN: {
    name: 'Abu Dhabi Murban',
    origin: 'UAE (Fujairah / Jebel Dhanna)',
    api: 40.5,
    sulfur: 0.70,
    desulfurizationCostPerBbl: 0.80,
    ospDifferential: +1.60
  },
  BASRAH_MEDIUM: {
    name: 'Iraq Basrah Medium',
    origin: 'Iraq (Basrah Oil Terminal)',
    api: 27.9,
    sulfur: 3.00,
    desulfurizationCostPerBbl: 3.10,
    ospDifferential: -0.40
  },
  URALS: {
    name: 'Russian Urals',
    origin: 'Russia (Primorsk Baltic / Novorossiysk)',
    api: 31.0,
    sulfur: 1.48,
    desulfurizationCostPerBbl: 1.80,
    discountToDatedBrent: -12.50
  },
  WTI_MIDLAND: {
    name: 'US WTI Midland',
    origin: 'United States (Corpus Christi / Houston)',
    api: 44.3,
    sulfur: 0.15,
    desulfurizationCostPerBbl: 0.25,
    discountToDatedBrent: -3.70 // Typical WTI discount vs Brent in Atlantic
  }
};

const DESTINATIONS = {
  CHINA: {
    name: 'China (Ningbo-Zhoushan / ZPC & Sinopec)',
    meFreightMultiplier: 1.0,   // Baseline TD3C
    russiaFreightMultiplier: 1.0, // ~7.20 $/bbl seaborne Baltic or short ESPO
    usFreightMultiplier: 1.0     // ~4.80 $/bbl VLCC
  },
  INDIA: {
    name: 'India (Jamnagar / Reliance Industries)',
    meFreightMultiplier: 0.42,  // Ultra-short 5.4 days
    russiaFreightMultiplier: 0.80, // ~5.80 $/bbl
    usFreightMultiplier: 0.95
  },
  JAPAN: {
    name: 'Japan (Chiba / ENEOS Corporation)',
    meFreightMultiplier: 1.08,
    russiaFreightMultiplier: 0.0, // Ceased due to G7 sanctions
    usFreightMultiplier: 1.04
  },
  SOUTH_KOREA: {
    name: 'South Korea (Ulsan / SK Innovation)',
    meFreightMultiplier: 1.04,
    russiaFreightMultiplier: 0.0, // Direct seaborne ceased
    usFreightMultiplier: 1.02,
    usTariffAdvantagePerBbl: -1.20 // KORUS FTA 0% tariff benefit
  }
};

exports.calculateArbitrage = (req, res) => {
  try {
    const {
      datedBrent = 74.50,
      brentDubaiEfs = 0.70,
      vlccWorldscale = 58.5,
      uralsDiscount = -12.50,
      destination = 'CHINA'
    } = req.body;

    const destKey = destination.toUpperCase();
    const destConfig = DESTINATIONS[destKey] || DESTINATIONS.CHINA;

    // Derived Market Prices
    const dubaiCash = datedBrent - brentDubaiEfs;
    const baseMeFreight = (vlccWorldscale / 100) * 3.68; // Base flat rate normalized

    const results = Object.keys(CRUDE_ASSAYS).map(key => {
      const assay = CRUDE_ASSAYS[key];
      let fobPrice = 0;
      let freightCost = 0;
      let insuranceCost = 0.18;
      let desulfCost = assay.desulfurizationCostPerBbl;
      let isEligible = true;

      if (key === 'URALS' && (destKey === 'JAPAN' || destKey === 'SOUTH_KOREA')) {
        isEligible = false;
      }

      // FOB Pricing logic
      if (key === 'URALS') {
        fobPrice = datedBrent + uralsDiscount;
        freightCost = destKey === 'INDIA' ? 5.80 : 7.20;
        insuranceCost = 0.85; // Shadow fleet insurance premium
      } else if (key === 'WTI_MIDLAND') {
        fobPrice = datedBrent + assay.discountToDatedBrent;
        freightCost = 4.80 * destConfig.usFreightMultiplier;
        insuranceCost = 0.15;
        if (destKey === 'SOUTH_KOREA') {
          fobPrice += destConfig.usTariffAdvantagePerBbl; // Tariff discount credit
        }
      } else {
        // Middle Eastern grades priced off Oman/Dubai + OSP
        fobPrice = dubaiCash + assay.ospDifferential;
        freightCost = baseMeFreight * destConfig.meFreightMultiplier;
      }

      const landedCost = fobPrice + freightCost + insuranceCost + desulfCost;

      return {
        crudeCode: key,
        crudeName: assay.name,
        origin: assay.origin,
        api: assay.api,
        sulfur: assay.sulfur,
        fobPrice: Number(fobPrice.toFixed(2)),
        freightCost: Number(freightCost.toFixed(2)),
        insuranceCost: Number(insuranceCost.toFixed(2)),
        desulfurizationCost: Number(desulfCost.toFixed(2)),
        totalLandedCost: Number(landedCost.toFixed(2)),
        isEligible,
        economicRank: 0
      };
    });

    // Rank eligible crudes by lowest delivered landed cost
    const eligible = results.filter(r => r.isEligible).sort((a, b) => a.totalLandedCost - b.totalLandedCost);
    eligible.forEach((item, index) => {
      item.economicRank = index + 1;
    });

    const winningGrade = eligible[0];
    const runnerUp = eligible[1];
    const arbitrageEdgeUsd = Number((runnerUp.totalLandedCost - winningGrade.totalLandedCost).toFixed(2));

    return res.status(200).json({
      success: true,
      destination: destConfig.name,
      marketParameters: {
        datedBrent,
        dubaiCash,
        brentDubaiEfs,
        vlccWorldscale,
        baseMeFreight: Number(baseMeFreight.toFixed(2)),
        uralsDiscount
      },
      winner: {
        crudeName: winningGrade.crudeName,
        totalLandedCost: winningGrade.totalLandedCost,
        arbitrageEdgeUsd,
        economicDriver: keyEconomicDriver(winningGrade.crudeCode, brentDubaiEfs, uralsDiscount)
      },
      rankings: results
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

function keyEconomicDriver(crudeCode, efs, uralsDiscount) {
  if (crudeCode === 'URALS') return `Steep sanctioned discount (${uralsDiscount} $/bbl) overcomes high freight.`;
  if (crudeCode === 'WTI_MIDLAND') return `Narrow EFS (+${efs} $/bbl) and negligible desulfurization penalty opens Atlantic arbitrage.`;
  if (crudeCode === 'ARAB_MEDIUM') return 'Unbeatable Middle East freight proximity and balanced yield value.';
  if (crudeCode === 'MURBAN') return 'High distillate yield and light gravity commands strong refinery crack premium.';
  if (crudeCode === 'BASRAH_MEDIUM') return 'Discounted OSP enables deep coking unit profit margins.';
  return 'Competitive landed netback parity.';
}
