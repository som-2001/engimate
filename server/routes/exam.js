import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { applyExam, knowExamstatus, submitExam } from "../controllers/user.js";

const router = express.Router();
router.post("/exam/apply/", isAuth, applyExam);
router.get("/know/exam-status", isAuth, knowExamstatus);
router.post("/submitExam/", isAuth, submitExam);
export default router;
