import Trycatch from "../middlewares/trycatch.js";
import { Material } from "../models/material.js";

export const getAllMaterials = Trycatch(async (req, res) => {
  if (
    !req.user ||
    !req.user.subscription ||
    req.user.subscription.length === 0
  ) {
    return res.status(403).json({
      message: "Access denied. You must be subscribed to view Materials.",
    });
  }
  const materials = await Material.find({
    course: { $in: req.user.subscription },
  });
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
  const { title, material_id } = req.body;

  const material = await Material.find({ title: title, _id: material_id });
  if (!material) {
    return res.status(401).json({
      message: "material not found",
    });
  }
  return res.status(200).json({
    message: "material fetch successful",
    material,
  });
});
