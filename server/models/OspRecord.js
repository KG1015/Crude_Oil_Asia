const mongoose = require('mongoose');

const OspDifferentialSchema = new mongoose.Schema({
  gradeName: { type: String, required: true }, // Arab Super Light, Arab Extra Light, Arab Light, Arab Medium, Arab Heavy, Basrah Medium, Murban
  pricingBasis: { type: String, default: 'Oman/Dubai Platts Average' },
  differentialUsd: { type: Number, required: true }, // e.g. +$1.80/bbl
  monthOfDelivery: { type: String, required: true }, // e.g., 'October 2026'
  changeVsPriorMonth: { type: Number, default: 0.0 }
});

const OspRecordSchema = new mongoose.Schema({
  nationalOilCompany: { type: String, required: true }, // Saudi Aramco, ADNOC, Iraq SOMO, Kuwait Petroleum Corp (KPC)
  country: { type: String, required: true },
  targetMarket: { type: String, default: 'Asia-Pacific' },
  announcementDate: { type: Date, required: true },
  differentials: [OspDifferentialSchema],
  marketRationale: { type: String },
  sourceCitation: {
    source: { type: String, required: true },
    document: { type: String, required: true },
    url: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('OspRecord', OspRecordSchema);
