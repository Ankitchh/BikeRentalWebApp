import mongoose from "mongoose";

// THIS IS BIKE COLLECTION SCHEMA WHICH WILL BE USED TO STORE BIKE DATA IN THE DATABASE
// THIS SCHEMA WILL BE USED TO CREATE A MODEL WHICH WILL BE USED TO INTERACT WITH THE DATABASE
// THE DATA WILL BE CREATE BY THE ADMIN

const bikeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  bikeModel: {
    type: String,
    required: true,
  },
  ratePerDay: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  milage: {
    type: String,
    required: true,
  },
  optionOne: {
    type: String,
    default: null,
  },
  optionTwo: {
    type: String,
    default: null,
  },
  optionThree: {
    type: String,
    default: null,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
