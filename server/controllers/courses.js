import Trycatch from "../middlewares/trycatch.js";
import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import { rm } from "fs";

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
