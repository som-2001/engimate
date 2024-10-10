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
  const dpp = await Dpp.findById(req.params.id);
  res.json({
    dpp,
  });
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
