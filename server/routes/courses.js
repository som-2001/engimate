import express from "express";
import {
  checkout,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getMycourses,
  getSingleCourse,
  paymentVerification,
} from "../controllers/courses.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourses", isAuth, getMycourses);
router.post("/course/checkout/:id", isAuth, checkout);
router.post("/verifypayment/:id", isAuth, paymentVerification);

export default router;
