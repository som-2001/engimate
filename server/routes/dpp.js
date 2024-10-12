import express from "express";
import {
  getAllDpp,
  getAllDppByCategory,
  getDppByTitleAndId,
  getSingleDpp,
} from "../controllers/dpp.js";
import { isAuth, isSubscriber } from "../middlewares/isAuth.js";

const router = express.Router();
router.get("/dpp/all", isAuth, getAllDpp);
router.get("/dpp/single/:id", isAuth, isSubscriber("dpp"), getSingleDpp);
router.get(
  "/dpp/category/:id",
  isAuth,
  isSubscriber("dpp"),
  getAllDppByCategory,
);
router.get("/dpp-search/", isAuth, getDppByTitleAndId);
export default router;
