import express from "express";
import {register, requestLoginOtp, verifyLoginOtp, verifyUser} from "../controllers/user.js";

const router = express.Router();
//user routes
router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/request-login-otp", requestLoginOtp);
router.post("/user/login/", verifyLoginOtp);
export default router;
