import express from "express";
import {
  myProfile,
  registerUser,
  requestLoginOtp,
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
export default router;
