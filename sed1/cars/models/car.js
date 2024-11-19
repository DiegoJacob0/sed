const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  price: Number,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Car', carSchema);
