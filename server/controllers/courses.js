import Trycatch from "../middlewares/trycatch.js";
import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import { rm } from "fs";
import { instance } from "../index.js";
import * as crypto from "crypto";
import { Order } from "../models/orders.js";

export const getAllCourses = Trycatch(async (req, res) => {
  const courses = await Course.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = Trycatch(async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json({
    course,
  });
});

export const fetchLectures = Trycatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);

  if (user.role === "admin" || user.role === "instructor") {
    return res.json({ lectures });
  }
  if (!user.subscription.includes(req.params.id)) {
    return res.json({
      message: "you are not subscribed to this course",
    });
  }
  res.json({ lectures });
});

export const fetchLecture = Trycatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (user.role === "admin" || user.role === "instructor") {
    return res.json({ lecture });
  }
  if (!user.subscription.includes(req.params.id)) {
    return res.json({
      message: "you are not subscribed to this course",
    });
  }
  res.json({ lecture });
});

export const getMycourses = Trycatch(async (req, res) => {
  const courses = await Course.find({ _id: req.user.subscription });

  res.json(courses);
});

export const checkout = Trycatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.params.id);
  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "you are already subscribed for this course",
    });
  }
  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(201).json({ order, course });
});

export const paymentVerification = Trycatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Order.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);
    user.subscription.push(course._id);
    await user.save();

    res.status(200).json({
      message: "Course purchased successfully",
    });
  } else {
    res.status(400).json({
      message: "Payment failed",
    });
  }
});
