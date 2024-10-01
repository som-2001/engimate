import Trycatch from "../middlewares/trycatch.js";
import { Category } from "../models/category.js";
import courses from "../routes/courses.js";

export const addCategory = Trycatch(async (req, res) => {
  const { category_name, description } = req.body;
  const image = req.file;
  const createdBy = req.user._id;

  if (!category_name || !description || !image || !createdBy) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const category = await Category.create({
    category_name,
    description,
    image: image?.path,
    createdBy,
  });

  res.status(201).json({
    message: "new category added successfully",
    newCategory,
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
  if (category.image) {
    rm(Category.image, (error) => {
      if (error) {
        console.error("Error deleting image:", err);
        return res.status(500).json({
          message: "Error deleting course image",
        });
      }
      console.log("category Image deleted");
    });
  }
});

export const getSingleCategory = Trycatch(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    category,
  });
});
