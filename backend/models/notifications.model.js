const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: { type: String, enum: ["booking", "payment", "info"] },
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
