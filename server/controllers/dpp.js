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
  if (!title || !dpp_id) {
    return res.status(400).json({
      message: "title and dpp_id are required",
    });
  }
  const dpp = await Dpp.find({ title: title, _id: dpp_id });
  if (!dpp || dpp.length === 0) {
    return res.status(404).json({
      message: "material not found",
    });
  }
  return res.status(200).json({
    message: "material fetch successful",
    dpp,
  });
});
