import Trycatch from "../middlewares/trycatch.js";

import { Lecture } from "../models/lecture.js";
import { Course } from "../models/course.js";
import { promisify } from "util";
import fs, { rm } from "fs";
import { User } from "../models/user.js";
import { Dpp } from "../models/Dpp.js";
import { Material } from "../models/material.js";
import { Category_Course } from "../models/category_course.js";
import { Exam } from "../models/exam.js";
import { ExamSubmission } from "../models/exam-submissions.js";
import { ExamApplication } from "../models/exam-applications.js";
import { Exam_Application_ref } from "../models/exam-applications-ref.js";

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
  await Category_Course.create({
    course: course._id,
    category: category,
  });
  res.status(201).json({
    message: "course created successfully",
    course,
  });
});

export const updateCourse = Trycatch(async (req, res) => {
  const { id } = req.params;
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
  //console.log("Request body:", req.body);
  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  const image = req.file;
  let base64Image = course.image;
  if (image) {
    base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;
  }
  course.title = title || course.title;
  course.course_description = course_description || course.course_description;
  course.course_objective = course_objective || course.course_objective;
  course.roles_in_industry = roles_in_industry || course.roles_in_industry;
  course.course_highlights = course_highlights || course.course_highlights;
  course.learn = learn || course.learn;
  course.caption = caption || course.caption;
  course.card_description = card_description || course.card_description;
  course.price = price || course.price;
  course.display_video_url = display_video_url || course.display_video_url;
  course.category = category || course.category;
  course.image = base64Image;
  await course.save();

  res.status(200).json({
    message: "Course updated successfully",
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

export const updateLecture = Trycatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, video_url } = req.body;
  const lecture = await Lecture.findById(id);
  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found." });
  }
  lecture.title = title || lecture.title;
  lecture.description = description || lecture.description;
  lecture.video_url = video_url || lecture.video_url;
  await lecture.save();
  res.status(200).json({
    message: "Lecture updated successfully",
    lecture,
  });
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
  await Course.deleteOne({ _id: req.params.id });
  await User.updateMany({}, { $pull: { subscription: req.params.id } });
  res.json({
    message: "Course Deleted successfully",
  });
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
  const existingDpp = await Dpp.findOne({ title: title });
  if (existingDpp) {
    return res.status(400).json({
      message: "title is Invalid, should be unique",
    });
  }
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

  const material = await Material.create({
    title,
    course,
    fileData: base64Pdfs,
    createdBy: req.user._id,
  });
  res.status(201).json({
    message: "materials added successfully",
    material,
  });
});

export const getAllUsers = Trycatch(async (req, res) => {
  const users = await User.find();
  return res.status(200).json({
    message: "users fetch successful",
    users,
  });
});

export const getSingleUser = Trycatch(async (req, res) => {
  const users = await User.findById(req.params.id);
  return res.status(200).json({
    message: "user data fetch successful",
    users,
  });
});

export const deleteUser = Trycatch(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "user Not found",
    });
  }
  await User.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    message: "user deleted successfully",
  });
});

export const deleteDpp = Trycatch(async (req, res) => {
  const dpp = await Dpp.findById(req.params.id);
  if (!dpp) {
    return res.status(404).json({
      message: "Dpp not found",
    });
  }
  await Dpp.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    message: "Dpp deleted successfully",
  });
});

export const deleteMaterial = Trycatch(async (req, res) => {
  const material = await Material.findById(req.params.id);
  if (!material) {
    return res.status(404).json({
      message: "material not found",
    });
  }
  await Material.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    message: "Material deleted successfully",
  });
});

export const updateUserRole = Trycatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("_id name email role");
  const { role } = req.body;
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  if (!["user", "admin", "instructor"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }
  user.role = role;

  await user.save();

  res.status(200).json({
    message: "User role updated Successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const addExam = Trycatch(async (req, res) => {
  const { title, course } = req.body;
  const pdf = req.file;
  if (!pdf || pdf.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one PDF file is required." });
  }
  if (pdf.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Only PDF files are allowed." });
  }
  const base64Pdf = `data:${pdf.mimetype};base64,${pdf.buffer.toString("base64")}`;
  const exam = await Exam.create({
    title,
    course,
    fileData: base64Pdf,
    createdBy: req.user._id,
  });
  res.status(201).json({
    message: "exam added successfully",
    exam,
  });
});

export const getAllSubmissions = Trycatch(async (req, res) => {
  const submissions = await ExamSubmission.find().select(
    "_id applicant examApplication status",
  );
  if (!submissions || submissions.length === 0) {
    return res.status(404).json({
      message: "No submissions Found.",
    });
  }
  res.status(200).json({
    message: "submissions retrieved successfully",
    submissions,
  });
});

export const getDetailSubmission = Trycatch(async (req, res) => {
  const submission = await ExamSubmission.findById(req.params.id);
  if (!submission || submission.status !== "submitted") {
    return res.status(404).json({
      message: "Applicant did not yet submitted or submission not found.",
    });
  }
  res.status(200).json({
    message: "Submission details retrieved successfully.",
    submission,
  });
});

export const addMarksToSubmission = Trycatch(async (req, res) => {
  const marks = req.body.marks;
  const submission = await ExamSubmission.findById(req.params.id)
    .populate("examApplication")
    .select("_id applicant exam status marks examApplication");

  if (!submission) {
    return res.status(404).json({
      message: "submission Not found",
    });
  }
  submission.marks = marks;
  await submission.save();
  const examApplication = await ExamApplication.findById(
    submission.examApplication._id,
  ).select("_id marks applicant examApplication status");
  if (!examApplication) {
    return res.status(404).json({
      message: "Exam application not found for this submission.",
    });
  }
  //console.log("Exam Application ID:", submission.examApplication._id.toString());
  const refApplication = await Exam_Application_ref.findOne({
    exam_application: submission.examApplication._id.toString(),
  });
  //console.log(refApplication);
  if (!refApplication) {
    return res.status(404).json({
      message: "Exam Ref application not found for this submission.",
    });
  }
  examApplication.marks = marks;
  examApplication.status = marks >= 75 ? "passed" : "failed";
  refApplication.status = marks >= 75 ? "passed" : "failed";
  await examApplication.save();
  await refApplication.save();
  res.status(200).json({
    message: "Marks updated successfully.",
    submission,
    examApplication,
  });
});
