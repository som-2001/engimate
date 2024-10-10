import Trycatch from "../middlewares/trycatch.js";
import { Dpp } from "../models/Dpp.js";
import { Material } from "../models/material.js";

export const getAllDpp = Trycatch(async (req, res) => {
  const dpp = await Dpp.find().select("_id title");
  res.json({
    dpp,
  });
});
export const getSingleDpp = Trycatch(async (req, res) => {
  const dpp = await Dpp.findById(req.params.id);
  res.json({
    dpp,
  });
});

export const getDppByTitleAndId = Trycatch(async (req, res) => {
  const { title, dpp_id } = req.query;

// Check if both title and dpp_id are provided
if (!title || !dpp_id) {
  return res.status(400).json({
    message: "title and dpp_id are required",
  });
}

try {
  // Use findOne instead of find, and pass the conditions correctly
  const dpp = await Dpp.findOne({_id: dpp_id });

  // Check if the document is not found
  if (!dpp) {
    return res.status(404).json({
      message: "material not found",
    });
  }

  // Successful response
  return res.status(200).json({
    message: "material fetch successful",
    dpp,
  });

} catch (error) {
  // Handle any server errors
  return res.status(500).json({
    message: "Server error occurred",
    error: error.message, // Include the error message for debugging
  });
}
});
