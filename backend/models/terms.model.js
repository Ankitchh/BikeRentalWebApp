const mongoose = require('mongoose')


const termSchema = new mongoose.Schema({
  content: String,
  lastUpdated: Date,
});

module.exports = mongoose.model("Term", termSchema);
