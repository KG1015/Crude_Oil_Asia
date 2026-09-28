const mongoose = require('mongoose');

const ForwardContractSchema = new mongoose.Schema({
  monthCode: { type: String, required: true }, // e.g., M1, M2, M3 ... M12
  monthLabel: { type: String, required: true }, // e.g., Oct 26, Nov 26
  priceUsd: { type: Number, required: true }
});

const BenchmarkSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true }, // BRENT, DUBAI_CASH, DME_OMAN, WTI_HOUSTON, EFS
  name: { type: String, required: true },
  exchange: { type: String, required: true }, // ICE, PLATTS_MOC, DME, NYMEX
  currentPrice: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  unit: { type: String, default: 'BBL' },
  changePct24h: { type: Number, default: 0.0 },
  termStructure: {
    state: { type: String, enum: ['BACKWARDATION', 'CONTANGO', 'FLAT'], default: 'BACKWARDATION' },
    promptSpreadM1M2: { type: Number, default: 0.85 },
    boxSpreadM1M3: { type: Number, default: 1.65 },
    flySpread: { type: Number, default: 0.05 }, // 2*M2 - (M1+M3)
    contracts: [ForwardContractSchema]
  },
  lastUpdated: { type: Date, default: Date.now },
  sourceCitation: {
    source: { type: String, required: true },
    document: { type: String, required: true },
    url: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Benchmark', BenchmarkSchema);
