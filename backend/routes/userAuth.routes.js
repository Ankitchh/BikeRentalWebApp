import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendEmail from "../utils/nodemailer.utils.js";
import { OAuth2Client } from "google-auth-library";

// THIS IS USER AUTHENTICATION ROUTE

const router = express.Router();

//  LOGIN
router.post("/login", async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const user = await User.create({
        fullName: name,
        email,
        otp: otp,
      });

      await sendEmail(email, name, otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
        data: { userId: user._id, email: user.email }, // send back userId to frontend
      });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const existinguser = await User.findOneAndUpdate(
        { email },
        { otp, otpCreatedAt: new Date() },
        { new: true }
      );

      await sendEmail(email, name, otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
        data: { userId: user._id, email: user.email }, // send back userId to frontend
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// VERIFY OTP

router.post("/verify-otp", async (req, res) => {
  const { otp, userId } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ message: "User ID and OTP are required" });
  }

  try {
    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches
    if (user.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP expired (5 minutes)
    const otpExpired = user.otpCreatedAt
      ? user.otpCreatedAt.getTime() < Date.now() - 5 * 60 * 1000
      : true;

    if (otpExpired) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    // Clear the OTP fields after successful verification
    user.otp = null;
    user.otpCreatedAt = null;
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// RESEND OTP
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Update user's otp and otpCreatedAt
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();

    // Send OTP via email
    await sendEmail(email, user.fullName, otp);

    return res.status(200).json({
      message: "OTP resent to your email",
    });
  } catch (error) {
    console.error("Error in resend-otp:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Goole login route

router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  const CLIENT_ID = process.env.CLIENT_ID;

  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name } = payload;

    const user = await User.create({
      fullName: name,
      email: email,
    });

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({
      message: "User verified",
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
