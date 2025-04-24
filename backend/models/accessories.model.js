const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
  _id: Number,
  name: String,
  image: String,
  price: Number,
  description: String,
  available: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Accessory", accessorySchema);
