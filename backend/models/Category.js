// backend/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant',
    required: true 
  },
  title: { type: String, required: true }, // "Recommended", "Biryani"
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dish' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);