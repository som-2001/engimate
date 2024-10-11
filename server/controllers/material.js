import Trycatch from "../middlewares/trycatch.js";
import { Material } from "../models/material.js";
import mongoose from "mongoose";

export const getAllMaterials = Trycatch(async (req, res) => {
  const materials = await Material.find().select("_id title");
  res.json({
    materials,
  });
});
export const getSingleMaterial = Trycatch(async (req, res) => {
  const material = await Material.find({course:req.params.id});
  res.json({
    material,
  });
});

export const getMaterialByTitleAndId = Trycatch(async (req, res) => {
  const { title, material_id } = req.query;
  if (!title || !material_id) {
    return res.status(400).json({
      message: "Title and material_id are required",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(material_id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  const material = await Material.find({ title: title, _id: material_id });
  if (!material) {
    return res.status(404).json({
      message: "material not found",
    });
  }
  return res.status(200).json({
    message: "material fetch successful",
    material,
  });
});
