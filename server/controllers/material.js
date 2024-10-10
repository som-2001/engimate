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
  const { title, material_id } = req.query;

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
