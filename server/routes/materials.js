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
  "/materials/single/:id",
  isAuth,
  isSubscriber("material"),
  getSingleMaterial,
);
router.get(
  "/materials/category/:id",
  isAuth,
  isSubscriber("material"),
  getallMaterialsByCategory,
);

router.get("/materials-search/", isAuth, getMaterialByTitleAndId);
export default router;
