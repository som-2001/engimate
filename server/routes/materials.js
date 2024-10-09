import express from "express";
import { isAuth, isSubscriber } from "../middlewares/isAuth.js";
import {getAllMaterials, getSingleMaterial} from "../controllers/material.js";

const router = express.Router();
router.get("/materials/all", isAuth, getAllMaterials);
router.get("/materials/:id", isAuth, isSubscriber("material"), getSingleMaterial);
export default router;
