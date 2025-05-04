import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (admin.role != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!admin.loggedIn) {
      return res.status(403).json({ message: "Admin not logged in" });
    }
    req.data = { admin: decoded }; // attaching admin to req.data

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateAdmin;
