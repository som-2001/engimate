import Trycatch from "../middlewares/trycatch.js";
import { Material } from "../models/material.js";

export const getAllMaterials = Trycatch(async (req, res) => {
  if (
    !req.user ||
    !req.user.subscription ||
    req.user.subscription.length === 0
  ) {
    return res
      .status(403)
      .json({
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
