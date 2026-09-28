const express = require('express');
const router = express.Router();
const arbitrageController = require('../controllers/arbitrageController');

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ONLINE', timestamp: new Date().toISOString(), service: 'Asian Crude Battleground API' });
});

// Live Arbitrage Calculation Endpoint
router.post('/arbitrage/calculate', arbitrageController.calculateArbitrage);

// EFS Sensitivity Matrix Endpoint
router.get('/efs/sensitivity', (req, res) => {
  const efsSteps = [-1.0, 0.0, 0.70, 1.50, 2.50, 4.0];
  const sensitivity = efsSteps.map(efs => {
    let wtiFlowState = 'CLOSED';
    let wafFlowState = 'RESTRICTED';
    let meCompetitiveness = 'HIGH';

    if (efs <= 0.80) {
      wtiFlowState = 'FLOODING ASIA (MAXIMUM ARB)';
      wafFlowState = 'COMPETITIVE TO ASIA';
      meCompetitiveness = 'UNDER SEVERE PRESSURE (OSPs MUST CUT)';
    } else if (efs <= 1.80) {
      wtiFlowState = 'SELECTIVE (SOUTH KOREA / CHINA)';
      wafFlowState = 'BALANCED (EUROPE/ASIA SPLIT)';
      meCompetitiveness = 'STABLE (HEALTHY INTAKE)';
    } else {
      wtiFlowState = 'SHUT OUT OF ASIA';
      wafFlowState = 'TRAPPED IN ATLANTIC BASIN';
      meCompetitiveness = 'MAXIMUM PRICING POWER (OSPs RAISED)';
    }

    return {
      efsSpreadUsd: efs,
      wtiFlowState,
      wafFlowState,
      meCompetitiveness
    };
  });

  res.status(200).json({ success: true, sensitivity });
});

// OSP Tracker Data
router.get('/osps', (req, res) => {
  res.status(200).json({
    success: true,
    month: 'October 2026',
    anchorBenchmark: 'Platts Dubai / DME Oman average',
    producers: [
      {
        noc: 'Saudi Aramco',
        grades: [
          { grade: 'Arab Super Light', diff: +3.25, chgVsPrior: +0.20 },
          { grade: 'Arab Extra Light', diff: +2.10, chgVsPrior: +0.15 },
          { grade: 'Arab Light', diff: +1.80, chgVsPrior: 0.00 },
          { grade: 'Arab Medium', diff: +0.65, chgVsPrior: -0.10 },
          { grade: 'Arab Heavy', diff: -0.85, chgVsPrior: -0.20 }
        ]
      },
      {
        noc: 'ADNOC',
        grades: [
          { grade: 'Murban', pricing: 'IFAD Settlement', diff: 'Flat Market' },
          { grade: 'Upper Zakum', pricing: 'Dubai Assessment', diff: 'Platts Deliverable Basket' },
          { grade: 'Das Blend', diff: +0.65, chgVsPrior: +0.05 }
        ]
      },
      {
        noc: 'Iraq SOMO',
        grades: [
          { grade: 'Basrah Medium', diff: -0.40, chgVsPrior: -0.15 },
          { grade: 'Basrah Heavy', diff: -3.20, chgVsPrior: -0.30 }
        ]
      }
    ]
  });
});

module.exports = router;
