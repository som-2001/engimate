import Trycatch from "../middlewares/trycatch.js";
import { Dpp } from "../models/Dpp.js";

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
