const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    bikeId: mongoose.Schema.Types.ObjectId,
    accessoriesId: [mongoose.Schema.Types.ObjectId],
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String,
    documentAddress: String,
    documentImage : String,
    bookingStart: Date,
    bookingEnd: Date,
    pickupLocation: String,
    dropLocation: String,
    fuelTank: { type: String, enum: ["full", "half"] },
    rider: { type: String, enum: ["single", "double"] },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentReceived: Boolean,
    totalPrice: Number,
  },
  { timestamps: true }
);