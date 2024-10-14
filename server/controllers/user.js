import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendContactUsMail, sendMail } from "../middlewares/sendmail.js";
import TryCatch from "../middlewares/trycatch.js";
import { client, TWILIO_PHONE_NUMBER } from "../index.js";

export const registerUser = TryCatch(async (req, res) => {
  const {
    email,
    name,
    phone_number,
    course_enrolled,
    specialization,
    referral_code,
  } = req.body;
  let referrer = null;
  if (referral_code) {
    referrer = await User.findOne({ referral_code });
    if (!referrer) {
      return res.status(400).json({ message: "Invalid referral code" });
    }
  }
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
    referred_by: referrer ? referrer._id : null,
  };
  const activationToken = jwt.sign(
    {
      email,
      otp,
      name,
      phone_number,
      course_enrolled,
      specialization,
      referred_by: referrer ? referrer._id : null,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" },
  );

  const data = {
    username: name,
    otp: otp,
  };
  sendMail(email, "your Verfication OTP for YANTRAVED", data);

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

  const user = await User.create({
    name: verify.name,
    email: verify.email,
    phone_number: verify.phone_number,
    course_enrolled: verify.course_enrolled,
    specialization: verify.specialization,
    referred_by: verify.referred_by,
  });
  //add refereal
  if (verify.referred_by) {
    await User.findByIdAndUpdate(verify.referred_by, {
      $push: { referred_users: user._id },
    });
  }
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
    await sendMail(user.email, "Your Login OTP for YANTRAVED", data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send OTP email", error: error.message });
  }

  res.status(200).json({ message: "OTP sent to your email." });
});

export const verifyLoginOtp = (item) => {
  return TryCatch(async (req, res) => {
    const otp  = req.body.otp;
    const userIdentifier = req.body[item]
    const user = await User.findOne({ [item]:userIdentifier });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found with this ${item}` });
    }
    //console.log(user)
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
        expiresIn: "2h",
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
};

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

export const sendQuery = TryCatch(async (req, res) => {
  const { name, email, phone_number, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    await sendContactUsMail({ name, email, message, subject, phone_number });
    return res
      .status(200)
      .json({ message: "Your Query has been sent successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

export const requestLogin = TryCatch(async (req, res) => {
  const { phone_number } = req.body;

  const user = await User.findOne({ phone_number });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  const otp = Math.floor(Math.random() * 900000).toString();
  user.otpExpiration = Date.now() + 5 * 60 * 1000;
  user.otp = otp;
  await user.save();
  const message = `Your Login OTP for YANTRAVED is ${otp}`;

  try {
    await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phone_number,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send OTP SMS",
      error: error.message,
    });
  }
  res.status(200).json({ message: "OTP sent to your phone number." });
});
