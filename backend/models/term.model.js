import mongoose from "mongoose";

const termAndConditionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const TermAndCondition = mongoose.model(
  "TermAndCondition",
  termAndConditionSchema
);

export default TermAndCondition;
