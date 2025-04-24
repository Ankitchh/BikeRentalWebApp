const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: { type: String, default: null },
  phone: String,
  address: String,
  role: { typr: String, enum: ["user", "admin"], default: "user" },
},
  { timestamps: true });

module.exports = mongoose.model("Users", userSchema);