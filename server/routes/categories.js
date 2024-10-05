import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCourseByCategory,
  getSingleCategory,
} from "../controllers/category.js";
import { isAdminOrInstructor, isAuth } from "../middlewares/isAuth.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/categories/add",
  isAuth,
  isAdminOrInstructor,
  uploadFiles,
  addCategory,
);
router.delete("/category/:id", isAuth, isAdminOrInstructor, deleteCategory);
router.get("/category/:id", getSingleCategory);
router.get("/categories/all", getAllCategories);
router.get("/course-category/:id", getCourseByCategory);
export default router;
