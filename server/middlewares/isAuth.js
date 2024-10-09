import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Dpp } from "../models/Dpp.js";
import {Material} from "../models/material.js";

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

export const isSubscriber = (itemType) => {
  return async (req, res, next) => {
    try {
      const itemId = req.params.id;

      let itemDoc;
      let courseId;
      if (itemType === "dpp") {
        itemDoc = await Dpp.findById(dpp_id);
        if (!dpp_doc) {
          return res.status(404).json({ message: "DPP not found." });
        }
        courseId = itemDoc.course._id;
      } else if (itemType === "material") {
        itemDoc = await Material.findById(itemId);
        if (!itemDoc) {
          return res.status(404).json({ message: "Material not found." });
        }
        courseId = itemDoc.course._id;
      } else {
        return res.status(400).json({ message: "Invalid item type." });
      }

      if (
        !req.user ||
        !req.user.subscription ||
        req.user.subscription.length === 0
      ) {
        return res.status(403).json({
          message: "Access denied. Please subscribe to at least one course.",
        });
      }
      const isSubscribed = req.user.subscription.some(
        (subscribedCourseId) =>
          subscribedCourseId.toString() === courseId.toString(),
      );
      if (!isSubscribed) {
        return res
          .status(403)
          .json({ message: "You are not subscribed to this course." });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error." });
    }
  };
};
