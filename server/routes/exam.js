import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  applyExam,
  getExamPdf,
  knowExamstatus, listAllExams,
  listExamsByCourse,
  submitExam,
} from "../controllers/user.js";

const router = express.Router();
router.post("/exam/apply/", isAuth, applyExam);
router.get("/know/exam-status", isAuth, knowExamstatus);
router.post("/submitExam/:id", isAuth, submitExam);
router.get("/exam/download/:id", isAuth, getExamPdf);
router.get("/exam/ongoing/all", isAuth, listAllExams);
router.get("/exam/list-by-course/:id", isAuth, listExamsByCourse);
export default router;
