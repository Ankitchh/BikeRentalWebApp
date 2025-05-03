import express from "express";
import bikes from "../models/bike.model.js";
import Accessories from "../models/accessorie.model.js";
import Reviews from "../models/review.model.js";

const router = express.Router();

// This route to get data of the bike

router.get("/bikes", async (req, res) => {
  try {
    // Find all bikes
    const bike = await bikes.find();
    if (!bike) {
      return res.status(404).json({ message: "Bikes not found" });
    }
    // Send the bike details back to the client
    res.status(200).json(bike);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route to get data of the accessories

router.get("/accessories", async (req, res) => {
  try {
    // Find all bikes
    const bike = await Accessories.find();
    if (!bike) {
      return res.status(404).json({ message: "Bikes not found" });
    }
    // Send the bike details back to the client
    res.status(200).json(bike);
  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route to get all the reviews

router.get("/reviews", async (req, res) => {
  try {
    // Find all reviews
    const review = await Reviews.find();
    if (!review) {
      return res.status(404).json({ message: "Reviews not found" });
    }
    // Send the review details back to the client
    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
