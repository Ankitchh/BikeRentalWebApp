import mongoose from "mongoose";

// THIS IS ACCESSORIE COLLECTION SCHEMA WHICH WILL BE USED TO STORE ACCESSORIE DATA IN THE DATABASE

const accessorieSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  accessorieName: {
    type: String,
    required: true,
  },
  ratePerDay: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: "Not Available",
  },
  accessorieCount: {
    type: Number,
    default: 0,
  },
});

const Accessories = mongoose.model("Accessorie", accessorieSchema);

export default Accessories;
