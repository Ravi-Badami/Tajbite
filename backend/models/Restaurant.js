const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisines: [String],
  areaName: { type: String, required: true },
  avgRating: { type: Number, default: 0 },
  costForTwo: { type: Number, required: true },
  costForTwoMessage: String,
  cloudinaryImageId: String,
  promoted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);