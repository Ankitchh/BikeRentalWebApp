const mongoose = require('mongoose')

const statSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "dashboard-stats" },
    totalUsers: Number,
    totalBookings: Number,
    pendingBookings: Number,
    approvedBookings: Number,
    totalRevenue: Number,
    availableBikes: Number,
    updatedAt: Date,
  },
  { _id: false }
);

module.exports = mongoose.model("Stat", statSchema);
