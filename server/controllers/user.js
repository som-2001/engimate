import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendmail from "../middlewares/sendmail.js";
import TryCatch from "../middlewares/trycatch.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, phone_number, course_enrolled, specialization } =
    req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });
  const otp = Math.floor(Math.random() * 900000);

  user = {
    name,
    email,
    otp,
    phone_number,
    course_enrolled,
    specialization,
    otpExpiration: Date.now() + 5 * 60 * 1000,
  };
  const activationToken = jwt.sign(
    {
      email,
      otp,
      name,
      phone_number,
      course_enrolled,
      specialization,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" },
  );

  const data = {
    username: name,
    otp: otp,
  };
  sendmail(email, "your Verfication OTP for YANTRAVED", data);

  res.status(200).json({
    message: "OTP send to you mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
  if (!verify)
    return res.status(400).json({
      message: "OTP Expired",
    });
  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong OTP",
    });

  await User.create({
    name: verify.name,
    email: verify.email,
    phone_number: verify.phone_number,
    course_enrolled: verify.course_enrolled,
    specialization: verify.specialization,
  });
  res.status(201).json({ message: "User registered successfully." });
});

export const requestLoginOtp = TryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const otp = Math.floor(Math.random() * 900000).toString();
  user.otpExpiration = Date.now() + 5 * 60 * 1000;
  user.otp = otp;
  await user.save();

  const data = { username: user.name, otp: otp };

  try {
    await sendmail(user.email, "Your Login OTP for YANTRAVED", data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send OTP email", error: error.message });
  }

  res.status(200).json({ message: "OTP sent to your email." });
});

export const verifyLoginOtp = TryCatch(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found with this email" });
  }
  if (user.otp !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  if (Date.now() > user.otpExpiration) {
    return res.status(400).json({ message: "OTP has Expired" });
  }
  const token = jwt.sign(
    { email: user.email, _id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  user.otp = null;
  user.otpExpiration = null;
  await user.save();

  res.status(200).json({
    message: "login successful",
    token,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "profile retrieved successfully",
    user,
  });
});
