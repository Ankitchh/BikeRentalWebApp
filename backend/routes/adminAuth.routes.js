import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Sessions from "../models/sessions.models.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import bikes from "../models/bike.model.js";

// THIS IS ADMIN AUTHENTICATION ROUTE

const router = express.Router();

// Register a new Admin

router.post("/register", adminAuthMiddleware, async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the Admin email & password are provided

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // check if the Admin already exists

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    // hash the Admin password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new Admin

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {}
});

// Login an Admin

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the Admin email & password are provided

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    // check if the Admin is valid

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check if the Admin password is correct

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check if the Admin is already logged in

    if (admin.loggedIn === true) {
      return res.status(401).json({ message: "Admin already logged in" });
    }

    // update the Admin loggedIn status to true

    admin.loggedIn = true;
    await admin.save();

    // create a new session for the Admin

    const session = new Sessions({
      adminId: admin._id,
      adminEmail: admin.email,
    });
    await session.save();

    // if the Admin is valid, create a token

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        sessionId: session._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Adding bike

router.post("/addBike", adminAuthMiddleware, async (req, res) => {
  const {
    image,
    bikeModel,
    ratePerDay,
    rating,
    milage,
    optionOne,
    optionTwo,
    description,
    bikeCount,
  } = req.body;

  try {
    // Fix: await bikes.findOne({ bikeModel }) instead of bikes.find()
    const existingBike = await bikes.findOne({ bikeModel });

    if (!existingBike) {
      const newBike = await bikes.create({
        image,
        bikeModel,
        ratePerDay,
        rating,
        milage,
        optionOne,
        optionTwo,
        description,
        bikeCount,
      });

      return res.status(201).json({
        message: "Bike added successfully",
        bike: newBike,
      });
    } else {
      // Fix: Proper update syntax
      const updatedBike = await bikes.findOneAndUpdate(
        { bikeModel },
        { $inc: { bikeCount } }, // Increment bikeCount
        { new: true }
      );

      return res.status(200).json({
        message: "Bike count updated",
        bike: updatedBike,
      });
    }
  } catch (error) {
    console.error("Error in /addBike:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout an Admin

router.post("/logout", adminAuthMiddleware, async (req, res) => {
  const { token } = req.body;

  try {
    // check if the Admin token is provided

    if (!token) {
      return res.status(400).json({ message: "Please provide a token" });
    }

    // verify the token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if the Admin is valid

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // update the Admin loggedIn status to false

    admin.loggedIn = false;
    await admin.save();

    // update the session loggedOutAt time

    const session = await Sessions.findOne({ _id: decoded.sessionId });

    if (session) {
      session.loggedOutAt = new Date();
      await session.save();
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// This is a temporary route to create a new admin ## Do not un-comment ##

// router.post("/createAdmin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // check if the Admin email & password are provided

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }

//     // check if the Admin already exists

//     const existingAdmin = await Admin.findOne({ email });

//     if (existingAdmin) {
//       return res.status(409).json({ message: "Admin already exists" });
//     }

//     // hash the Admin password

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create a new Admin

//     const newAdmin = new Admin({
//       email,
//       password: hashedPassword,
//     });

//     await newAdmin.save();

//     res.status(201).json({ message: "Admin registered successfully" });
//   } catch (error) {
//     console.error("Error creating admin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
