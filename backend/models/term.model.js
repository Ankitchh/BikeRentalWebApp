import mongoose from "mongoose";

const termAndConditionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TermAndCondition = mongoose.model(
  "TermAndCondition",
  termAndConditionSchema
);

export default TermAndCondition;
