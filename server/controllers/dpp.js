import Trycatch from "../middlewares/trycatch.js";
import { Dpp } from "../models/Dpp.js";
import { Material } from "../models/material.js";
import mongoose from "mongoose";

export const getAllDpp = Trycatch(async (req, res) => {
  const dpp = await Dpp.find().select("_id title");
  res.json({
    dpp,
  });
});
export const getSingleDpp = Trycatch(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }
  const dpp = await Dpp.findOne({
    course: mongoose.Types.ObjectId(req.params.id),
  });
  if (!dpp.length) {
    return res.status(404).json({ message: "No DPP found for this course" });
  }
  res.json({ dpp });
});

export const getAllDppByCategory = Trycatch(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.category_id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }
  const dpp = await Dpp.find({
    course: mongoose.Types.ObjectId(req.params.category_id).select("_id title"),
  });
  if (!dpp.length) {
    return res.status(404).json({ message: "No DPP found for this course" });
  }
  res.json({ dpp });
});

export const getDppByTitleAndId = Trycatch(async (req, res) => {
  const { title, dpp_id } = req.query;
  // Validate presence of parameters
  if (!title || !dpp_id) {
    return res.status(400).json({
      message: "title and dpp_id are required",
    });
  }

  // Validate ObjectId format
  //console.log(`Fetching DPP with title: ${title} and ID: ${dpp_id}`);
  if (!mongoose.Types.ObjectId.isValid(dpp_id)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  // Fetch the DPP document
  const dpp = await Dpp.findOne({
    title: title,
    _id: dpp_id.toString(),
  });
  if (!dpp) {
    return res.status(404).json({
      message: "DPP not found.",
    });
  }
  return res.status(200).json({
    message: "Dpp fetch successful",
    dpp,
  });
});
