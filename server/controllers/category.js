import Trycatch from "../middlewares/trycatch.js";
import { Category } from "../models/category.js";
import courses from "../routes/courses.js";
import { Course } from "../models/course.js";
import { Category_Course } from "../models/category_course.js";

export const addCategory = Trycatch(async (req, res) => {
  const { category_name, description } = req.body;
  const image = req.file;
  const createdBy = req.user._id;

  if (!category_name || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

  const category = await Category.create({
    category_name,
    description,
    image: base64Image,
    createdBy,
  });

  res.status(201).json({
    message: "new category added successfully",
    category,
  });
});

export const getAllCategories = Trycatch(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({ categories });
});

export const deleteCategory = Trycatch(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      message: "category not found",
    });
  }
});

export const getSingleCategory = Trycatch(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    category,
  });
});

export const getCourseByCategory = Trycatch(async (req, res) => {
  const category = await Course.find({ category: req.params.id });
  res.json({
    category,
  });
});

export const getCategoryCourses = Trycatch(async (req, res) => {

  const categoryCourse = await Category_Course.aggregate([
    {
      $lookup: {
        from: "courses", // Name of the courses collection
        localField: "course", // Field in the category-course mapping that holds the course IDs
        foreignField: "_id", // Field in the course collection that matches the course IDs
        as: "courses", // The name of the field to store the courses
      },
    },
    {
      $unwind: "$courses", // Unwind the courses array to simplify the results
    },
    {
      $group: {
        _id: "$category", // Group by category
        category: { $first: "$category" }, // Add the category info (using $first to get the single category)
        courses: { $push: "$courses" }, // Push all related courses to the "courses" array
      },
    },
    {
      $lookup: {
        from: "categories", // Name of the categories collection
        localField: "_id", // Match category ID with the category collection
        foreignField: "_id", // Match field in the categories collection
        as: "categoryDetails", // Add the category details to the result
      },
    },
    {
      $unwind: "$categoryDetails", // Unwind to get category details
    },
    {
      $project: {
        _id: 1,
        category: "$categoryDetails", // Include category details in the result
        courses: 1, // Include the courses
      },
    },
  ]);
  if (!categoryCourse || categoryCourse.length === 0) {
    return res
      .status(404)
      .json({ message: "No courses found for this category" });
  }
  res.status(200).json({
    message: "Category and Courses data fetched successfully",
    categoryCourse,
  });
});
