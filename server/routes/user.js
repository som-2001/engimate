import express from "express";
import {
  myProfile,
  registerUser,
  requestLogin,
  requestLoginOtp,
  sendQuery,
  verifyLoginOtp,
  verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
//user routes
router.post("/user/register", registerUser);
router.post("/user/verify", verifyUser);
router.post("/user/request-login-otp", requestLoginOtp);
router.post("/user/login/", verifyLoginOtp);
router.get("/user/profile/", isAuth, myProfile);
router.post("/contact/us", sendQuery);
router.post("user/request-mobile-otp", requestLogin);
export default router;
