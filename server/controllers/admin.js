import Trycatch from "../middlewares/trycatch.js";

import { Lecture } from "../models/lecture.js";
import { Course } from "../models/course.js";
import { promise } from "bcrypt/promises.js";
import { promisify } from "util";
import fs, { rm } from "fs";
import { User } from "../models/user.js";
import { Dpp } from "../models/Dpp.js";
import { Material } from "../models/material.js";

export const createCourse = Trycatch(async (req, res) => {
  const {
    title,
    course_description,
    course_objective,
    roles_in_industry,
    course_highlights,
    learn,
    caption,
    card_description,
    price,
    display_video_url,
    category,
  } = req.body;
  const createdBy = req.user._id;
  const image = req.file;
  if (!image) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;
  const course = await Course.create({
    title,
    course_description,
    course_objective,
    roles_in_industry,
    course_highlights,
    learn,
    caption,
    card_description,
    price,
    display_video_url,
    category,
    createdBy,
    image: base64Image,
  });
  res.status(201).json({
    message: "course created successfully",
    course,
  });
});

export const addLectures = Trycatch(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "No Course with this id",
    });

  const { title, description, video_url } = req.body;
  const lecture = await Lecture.create({
    title,
    description,
    video_url,
    course: course._id,
  });
  res.status(201).json({ message: "Lecture added succesfully", lecture });
});

export const deleteLecture = Trycatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) {
    return res.status(404).json({
      message: "Lecture not found",
    });
  }
  await lecture.deleteOne();
  res.json({
    message: "lecture Deleted successfully",
  });
});

const unlinkAsync = promisify(fs.unlink);
export const deleteCourse = Trycatch(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      message: "course not found",
    });
  }
  await Lecture.deleteMany({ course: req.params.id });
  if (course.image) {
    rm(course.image, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
        return res.status(500).json({
          message: "Error deleting course image",
        });
      }
      console.log("course Image deleted");
    });
    await Course.deleteOne({ _id: req.params.id });
    await User.updateMany({}, { $pull: { subscription: req.params.id } });
    res.json({
      message: "Course Deleted successfully",
    });
  }
});

export const getAllStats = Trycatch(async (req, res) => {
  const totalCourse = (await Course.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find({ role: "user" })).length;
  const stats = {
    totalCourse,
    totalLectures,
    totalUsers,
  };
  res.status(200).json({
    message: "Statistics retrieved successfully",
    stats,
  });
});

export const addDpp = Trycatch(async (req, res) => {
  const { title, course } = req.body;
  const pdfs = req.files;
  if (!pdfs || pdfs.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one PDF file is required." });
  }
  const base64Pdfs = pdfs.map((pdf) => {
    return `data:${pdf.mimetype};base64,${pdf.buffer.toString("base64")}`;
  });

  const dpp = await Dpp.create({
    title,
    course,
    fileData: base64Pdfs,
    createdBy: req.user._id,
  });
  res.status(201).json({
    message: "DPP created successfully",
    dpp,
  });
});

export const addMaterials = Trycatch(async (req, res) => {
  const { course } = req.body;
  const pdfs = req.files;
  if (!pdfs || pdfs.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one PDF file is required." });
  }
  const base64Pdfs = pdfs.map((pdf) => {
    return `data:${pdf.mimetype};base64,${pdf.buffer.toString("base64")}`;
  });

  const material = await Material.create({
    course,
    fileData: base64Pdfs,
    createdBy: req.user._id,
  });
  res.status(201).json({
    message: "materials added successfully",
    material,
  });
});
