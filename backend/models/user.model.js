import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    default: null,
  },
  address: {
    type: String,
    trim: true,
    default: null,
  },
  otp: {
    type: Number,
    trim: true,
    default: null,
  },
  otpCreatedAt: {
    // <-- new field
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
