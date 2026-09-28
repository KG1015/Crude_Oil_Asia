const mongoose = require('mongoose');

const TankerRouteSchema = new mongoose.Schema({
  routeCode: { type: String, required: true, unique: true }, // e.g. SA_TO_CHINA_TD3C
  originTerminal: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: [Number] // [lat, lng]
  },
  destinationTerminal: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: [Number]
  },
  vesselClass: { type: String, enum: ['VLCC', 'SUEZMAX', 'AFRAMAX'], default: 'VLCC' },
  cargoCapacityBbls: { type: Number, default: 2000000 },
  distanceNauticalMiles: { type: Number, required: true },
  transitDays: { type: Number, required: true },
  serviceSpeedKnots: { type: Number, default: 13.0 },
  chokepointsTraversed: [{ type: String }],
  flatRateUsdPerTon: { type: Number, required: true }, // Worldscale base flat rate
  currentWorldscalePercent: { type: Number, required: true }, // e.g., WS 58.5
  freightCostUsdPerBbl: { type: Number, required: true },
  bunkerConsumptionTonsPerDay: { type: Number, default: 45.0 },
  waypoints: [[Number]] // Array of [lat, lng] coordinates
}, { timestamps: true });

module.exports = mongoose.model('TankerRoute', TankerRouteSchema);
