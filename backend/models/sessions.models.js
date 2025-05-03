import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  loggedInAt: {
    type: Date,
    default: Date.now,
  },
  loggedOutAt: {
    type: Date,
    default: null,
  },
});

const Sessions = mongoose.model("Sessions", sessionSchema);

export default Sessions;
