import Trycatch from "../middlewares/trycatch.js";
import { Material } from "../models/material.js";

export const getAllMaterials = Trycatch(async (req, res) => {
  const materials = await Material.find().select("_id title");
  res.json({
    materials,
  });
});
export const getSingleMaterial = Trycatch(async (req, res) => {
  const material = await Material.findById(req.params.id);
  res.json({
    material,
  });
});

export const getMaterialByTitleAndId = Trycatch(async (req, res) => {
  const { title, dpp_id } = req.query;

// Check if both title and dpp_id are provided
if (!title || !dpp_id) {
  return res.status(400).json({
    message: "title and dpp_id are required",
  });
}

try {
  // Use findOne instead of find, and pass the conditions correctly
  const dpp = await Dpp.findOne({ title: title, _id: dpp_id });

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
