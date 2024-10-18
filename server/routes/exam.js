import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  applyExam,
  getAllCertificate,
  getCertificate,
  getCertificateDetail,
  getExamApplicationId,
  getExamPdf,
  knowExamstatus,
  listAllExams,
  listExamApplications,
  listExamsByCourse,
  submitExam,
} from "../controllers/user.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();
router.post("/exam/apply/", isAuth, applyExam);
router.get("/know/exam-status/:id", isAuth, knowExamstatus);
router.post("/submitExam/:id", isAuth, uploadFiles, submitExam);
router.get("/exam/download/:id", isAuth, getExamPdf);
router.get("/exam/ongoing/all", isAuth, listAllExams);
router.get("/exam/list-by-course/:id", isAuth, listExamsByCourse);
router.get("/exam/applications/", isAuth, listExamApplications);
router.get("/exam/applicationId/:id", isAuth, getExamApplicationId);
router.post("/exam/getcertificate/:id", isAuth, getCertificate);
router.get("/exam/getcertificate/all", isAuth, getAllCertificate);
router.get("/exam/getcertificate/detail/:id", isAuth, getCertificateDetail);
export default router;
