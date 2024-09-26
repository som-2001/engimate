import Trycatch from "../middlewares/trycatch.js";
import { Courses } from "../models/courses.js";

export const createCourse = Trycatch(async (req, res) => {
  const {
    title,
    course_description,
    course_objective,
    roles_in_industry,
    course_highlights,
    price,
    category,
  } = req.body;
  const createdBy = req.user._id;
  const image = req.file;
  await Courses.create({
    title,
    course_description,
    course_objective,
    roles_in_industry,
    course_highlights,
    price,
    category,
    createdBy,
    image: image?.path,
  });
  res.status(201).json({
    message: "course created successfully",
  });
});



