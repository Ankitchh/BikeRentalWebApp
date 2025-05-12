import mongoose from "mongoose";

// THIS IS ACCESSORIE COLLECTION SCHEMA WHICH WILL BE USED TO STORE ACCESSORIE DATA IN THE DATABASE

const accessorieSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true,
      default:
        "https://images.unsplash.com/photo-1609174470568-ac0c96458a67?w=500&auto=format",
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
  },
  { timestamps: true }
);

const Accessories = mongoose.model("Accessorie", accessorieSchema);

export default Accessories;
