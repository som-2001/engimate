import express from "express";
import {
  addItemToCart,
  checkout,
  checkoutWithCartItems,
  deleteItemFromCart,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getCartItems,
  getMycourses,
  getSingleCourse,
  paymentVerification,
  paymentVerificationForCart,
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
router.post("/cart/add-item/:id", isAuth, addItemToCart);
router.delete("/cart/delete-item/:id", isAuth, deleteItemFromCart);
router.get("/cart/getItems/", isAuth, getCartItems);
router.post("/cart/checkout/", isAuth, checkoutWithCartItems);
router.post(
  "/verifypaymentforcartcheckout/:id",
  isAuth,
  paymentVerificationForCart,
);

export default router;
