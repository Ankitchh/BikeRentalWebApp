import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import userAuthRoute from "./routes/userAuth.routes.js";
import userRoutes from "./routes/user.route.js";
import adminAuthRoute from "./routes/adminAuth.routes.js";
import userAuthmiddleware from "./middleware/userAuth.middleware.js";
import staticDataRoute from "./routes/staticData.route.js";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

// User Auth Routes
app.use("/api/v1/user", userAuthRoute);

// Admin Auth Routes
app.use("/api/v1/admin", adminAuthRoute);

// User Routes -> for booking bikes
app.use("/api/v1/user", userAuthmiddleware, userRoutes);

// Static routes to get data from the database

app.use("/api/v1/data", staticDataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
