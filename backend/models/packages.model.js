const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  discountPercentage: Number,
  validFrom: Date,
  validTill: Date,
  occasion: String,
},{ timestamps: true
})


module.exports = mongoose.model('Package', packageSchema)