import express from "express";
import { isAuth, isSubscriber } from "../middlewares/isAuth.js";
import {
  getAllMaterials,
  getMaterialByTitleAndId,
  getSingleMaterial,
} from "../controllers/material.js";

const router = express.Router();
router.get("/materials/all", isAuth, getAllMaterials);
router.get(
  "/materials/:id",
  isAuth,
  isSubscriber("material"),
  getSingleMaterial,
);
router.post("materials/search", isAuth, getMaterialByTitleAndId);
export default router;
