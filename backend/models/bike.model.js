const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  image: String,
  modelName: String,
  ratePerDay: Number,
  rating: Number,
  milage: String,
  avilability: Number,
  pickupLocations: [String],
  dropLocations: [String],
},{timestamps:true
})


module.exports = mongoose.model('Bike', bikeSchema);