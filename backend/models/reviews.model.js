const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  bikeId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
