const mongoose = require('mongoose');

const RefinerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cluster: { type: String, required: true }, // e.g., Ningbo/Zhoushan, Jamnagar/Vadinar, Chiba/Tokyo Bay, Ulsan
  country: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  operator: { type: String, required: true },
  crudeCapacityKbpd: { type: Number, required: true },
  nelsonComplexityIndex: { type: Number, required: true }, // e.g. 21.1 for Jamnagar
  conversionUnits: {
    hasDelayedCoking: { type: Boolean, default: true },
    hasHydrocracker: { type: Boolean, default: true },
    hasFluidCatalyticCracking: { type: Boolean, default: true },
    desulfurizationCapacityKbpd: { type: Number, required: true }
  },
  crudeDietFlexibility: {
    maxSulfurPercent: { type: Number, default: 3.5 },
    minApiGravity: { type: Number, default: 24.0 },
    maxApiGravity: { type: Number, default: 48.0 },
    preferredCrudes: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Refinery', RefinerySchema);
