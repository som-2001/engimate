import express from "express";
import { getAllDpp, getSingleDpp } from "../controllers/dpp.js";
import { isAuth, isSubscriber } from "../middlewares/isAuth.js";

const router = express.Router();
router.get("/dpp/all", isAuth, getAllDpp);
router.get("/dpp/:id", isAuth, isSubscriber('dpp'), getSingleDpp);
export default router;
