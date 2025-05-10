import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    accessoriesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accessorie",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
