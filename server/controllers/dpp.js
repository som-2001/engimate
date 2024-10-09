import Trycatch from "../middlewares/trycatch.js";
import { Dpp } from "../models/Dpp.js";

export const getAllDpp = Trycatch(async (req, res) => {
  if (
    !req.user ||
    !req.user.subscription ||
    req.user.subscription.length === 0
  ) {
    return res
      .status(403)
      .json({ message: "Access denied. You must be subscribed to view DPPs." });
  }
  const dpp = await Dpp.find({ course: { $in: req.user.subscription } });
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
