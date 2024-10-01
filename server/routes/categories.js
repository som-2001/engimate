import express from "express";
import {addCategory, deleteCategory, getAllCategories} from "../controllers/category.js";
import { isAdminOrInstructor, isAuth } from "../middlewares/isAuth.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/category/add",
  isAuth,
  isAdminOrInstructor,
  uploadFiles,
  addCategory,
);
router.delete("/category/:id",isAuth,isAdminOrInstructor, deleteCategory)
router.get("/category/:id",)
router.get("/category/all", getAllCategories);
export default router;