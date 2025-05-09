import express from "express";
import Cart from "../models/cart.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

const router = express.Router();

router.post("/book", async (req, res) => {
  const { bikeId } = req.body;

  // Extract the booking details from the request body
  const {
    name,
    email,
    phone,
    address,
    startDate,
    endDate,
    fuelType,
    rider,
    totalPrice,
  } = req.body;

  try {
    // find the user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new booking

    const booking = new Booking({
      user: user._id,
      bikeId: req.body.bikeId,
      name,
      email,
      phone,
      address,
      startDate,
      endDate,
      fuelType,
      rider,
      totalPrice,
    });
    // Save the booking to the database
    await booking.save();

    // create a cart

    const cart = new Cart({
      user: user._id,
      bikeId: bikeId,
      bookingId: booking._id,
    });
    // Save the cart to the database
    await cart.save();

    // Send a response back to the client
    res.status(201).json({
      message: "Booking created successfully",
      bookingId: booking._id,
      cartId: cart._id,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route is used to get the cart for a user

router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId })
      .populate("bookingId")
      .populate("accessoriesId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send the cart details back to the client
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route is used to delete the cart

router.delete("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the cart for the user
    const cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send a response back to the client
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// These adds accessories to the cart

router.post("/cart/:userId/accessories", async (req, res) => {
  const { userId } = req.params;
  const { accessoriesId } = req.body;

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Add the accessories to the cart
    cart.accessoriesId.push(...accessoriesId);
    await cart.save();
    // Send a response back to the client
    res.status(200).json({ message: "Accessories added to cart successfully" });
  } catch (error) {
    console.error("Error adding accessories to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route is used when a user wants to give a review

router.post("/review", async (req, res) => {
  const { userId, rating, description } = req.body;

  try {
    // Find the user by ID

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new review
    const review = new Review({
      userId: user._id,
      name: user.fullName,
      avatar: user.profilePic,
      rating,
      description,
    });

    // Save the review to the database
    await review.save();

    // Send a response back to the client
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
