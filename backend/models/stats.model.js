import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0,
  },
  totalBikes: {
    type: Number,
    default: 0,
  },
  totalAccessories: {
    type: Number,
    default: 0,
  },
  totalPackages: {
    type: Number,
    default: 0,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
});

const Stats = mongoose.model("Stats", statsSchema);
export default Stats;
