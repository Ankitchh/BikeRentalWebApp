import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    trim: true,
    required: true,
    unique: true,
    locwercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "admin",
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
