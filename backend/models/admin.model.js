import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3OSU5lJevV-z9U6DXiELizmuewIDESZCwp6Ik1YcsimUf5v9FsYEDGEkZmS-YTPYayww&usqp=CAU",
    },
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
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
