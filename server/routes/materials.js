import express from "express";
import { isAuth, isSubscriber } from "../middlewares/isAuth.js";
import {
  getAllMaterials, getallMaterialsByCategory,
  getMaterialByTitleAndId,
  getSingleMaterial,
} from "../controllers/material.js";

const router = express.Router();
router.get("/materials/all", isAuth, getAllMaterials);
router.get(
  "/materials/single/:id",
  isAuth,
  isSubscriber("material"),
  getSingleMaterial,
);
router.get(
  "/materials/category/:id",
  isAuth,
  getallMaterialsByCategory,
);

router.get("/materials-search/", isAuth, getMaterialByTitleAndId);
export default router;
