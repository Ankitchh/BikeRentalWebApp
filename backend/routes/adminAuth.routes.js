import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Sessions from "../models/sessions.models.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js";
import bikes from "../models/bike.model.js";
import Review from "../models/review.model.js";
import Accessories from "../models/accessorie.model.js";
import TermAndCondition from "../models/term.model.js";

// THIS IS ADMIN AUTHENTICATION ROUTE

const router = express.Router();

// Register a new Admin

router.post("/register", adminAuthMiddleware, async (req, res) => {
  const { email, password, adminName, profilePicture } = req.body;

  try {
    // check if the Admin email & password are provided

    if (!email || !password || !adminName || !profilePicture) {
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
      adminName,
      profilePicture,
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
      admin,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete the exixting admin

router.post("/delete/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // check if the Admin is valid

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(401).json({ message: "Invalid Admin" });
    }

    // delete the Admin

    await admin.remove();

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error during delete:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Adding bike

router.post("/addBike", adminAuthMiddleware, async (req, res) => {
  const { image, bikeModel, ratePerDay, description, bikeCount } = req.body;

  try {
    // Fix: await bikes.findOne({ bikeModel }) instead of bikes.find()
    const existingBike = await bikes.findOne({ bikeModel });

    if (!existingBike) {
      const newBike = await bikes.create({
        image,
        bikeModel,
        ratePerDay,
        description,
        bikeCount,
      });

      return res.status(201).json({
        message: "Bike added successfully",
        bike: newBike,
      });
    }
  } catch (error) {
    console.error("Error in /addBike:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update the bike

router.put("/updateBike/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { image, bikeModel, ratePerDay, description, bikeCount } = req.body;

  try {
    // check if the bike is valid

    const bike = await bikes.findById(id);

    if (!bike) {
      return res.status(401).json({ message: "Invalid bike" });
    }

    // update the bike

    const updatedBike = await bikes.findByIdAndUpdate(
      id,
      {
        image,
        bikeModel,
        ratePerDay,
        description,
        bikeCount,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Bike updated successfully",
      bike: updatedBike,
    });
  } catch (error) {
    console.error("Error in /updateBike:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete the bike

router.delete("/deleteBike/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // check if the bike is valid

    const bike = await bikes.findById(id);

    if (!bike) {
      return res.status(401).json({ message: "Invalid bike" });
    }

    // delete the bike

    await bikes.findByIdAndDelete(id);

    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (error) {
    console.error("Error in /deleteBike:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// fetching all the reviews for the Admin

router.get("/get-reviews", adminAuthMiddleware, async (req, res) => {
  try {
    const reviewList = await Review.find();
    res.status(200).json(reviewList);
  } catch (error) {
    console.error("Error in /getBikes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Adding a new accessories

router.post("/addAccessories", adminAuthMiddleware, async (req, res) => {
  const { image, accessorieName, ratePerDay, description, accessorieCount } =
    req.body;

  try {
    const existingAccessorie = await Accessories.findOne({ accessorieName });

    if (!existingAccessorie) {
      const newAccessorie = await Accessories.create({
        image,
        accessorieName,
        ratePerDay,
        description,
        accessorieCount,
      });

      return res.status(201).json({
        message: "Accessorie added successfully",
        accessorie: newAccessorie,
      });
    } else {
      const updatedAccessorie = await Accessories.findOneAndUpdate(
        { accessorieName },
        { $inc: { accessorieCount } }, // Increment accessorieCount
        { new: true }
      );

      return res.status(200).json({
        message: "Accessorie count updated",
        accessorie: updatedAccessorie,
      });
    }
  } catch (error) {
    console.error("Error in /addAccessories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update the accessories

router.put("/updateAccessories/:id", adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const { image, accessorieName, ratePerDay, description, accessorieCount } =
    req.body;

  try {
    // check if the accessorie is valid

    const accessorie = await Accessories.findById(id);

    if (!accessorie) {
      return res.status(401).json({ message: "Invalid accessorie" });
    }

    // update the accessorie

    const updatedAccessorie = await Accessories.findByIdAndUpdate(
      id,
      {
        image,
        accessorieName,
        ratePerDay,
        description,
        accessorieCount,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Accessorie updated successfully",
      accessorie: updatedAccessorie,
    });
  } catch (error) {
    console.error("Error in /updateAccessories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete the accessorie

router.delete("/deleteAccessories/:id", adminAuthMiddleware, async (req, res) => {

  const { id } = req.params;

  try {
    // check if the accessorie is valid

    const accessorie = await Accessories.findById(id);

    if (!accessorie) {
      return res.status(401).json({ message: "Invalid accessorie" });
    }

    // delete the accessorie

    await Accessories.findByIdAndDelete(id);

    res.status(200).json({ message: "Accessorie deleted successfully" });
  } catch (error) {
    console.error("Error in /deleteAccessories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

})

// terms and conditions

router.post("/terms", adminAuthMiddleware, async (req, res) => {
  const { description } = req.body;

  try {
    // check if the terms and conditions are provided

    if (!description) {
      return res
        .status(400)
        .json({ message: "Please provide terms and conditions" });
    }

    // check if the terms and conditions already exist

    const existingTerms = await TermAndCondition.find();

    // create a new terms and conditions

    if (!existingTerms) {
      const newTerms = new TermAndCondition({
        description,
      });

      await newTerms.save();

      res
        .status(201)
        .json({ message: "Terms and conditions added successfully" });
    } else {
      // update the existing terms and conditions

      const updatedTerms = await TermAndCondition.findOneAndUpdate(
        { description },
        { $set: { description } }, // Update the description
        { new: true }
      );
      return res.status(200).json({
        message: "Terms and conditions updated",
        terms: updatedTerms,
      });
    }
  } catch (error) {
    console.error("Error creating terms and conditions:", error);
    res.status(500).json({ message: "Internal server error" });
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
