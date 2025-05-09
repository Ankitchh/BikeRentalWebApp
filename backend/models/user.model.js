import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    minlength: 3,
    required: true,
  },
  profilePic: {
    type: String,
    trim: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3OSU5lJevV-z9U6DXiELizmuewIDESZCwp6Ik1YcsimUf5v9FsYEDGEkZmS-YTPYayww&usqp=CAU",
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
