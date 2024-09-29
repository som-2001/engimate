import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "please Login",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is missing, Please Login",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log("Decoded Data: ", decodedData);
    next();
  } catch (error) {
    res.status(401).json({
      message: "login first or token expired",
      error: error.message,
    });
    //console.log("JWT_SECRET: ", process.env.JWT_SECRET);
  }
};
export const isAdminOrInstructor = (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "instructor")
      return res.status(403).json({
        message: "You do not have the required permissions.",
      });
    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
