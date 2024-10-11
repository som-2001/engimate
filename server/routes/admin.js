import express from "express";
import { isAdminOrInstructor, isAuth } from "../middlewares/isAuth.js";
import {
  addDpp,
  addLectures,
  addMaterials,
  createCourse,
  deleteCourse,
  deleteDpp,
  deleteLecture,
  deleteMaterial,
  deleteUser,
  getAllStats,
  getAllUsers,
  getSingleUser,
  updateCourse,
  updateLecture,
} from "../controllers/admin.js";
import { uploadFiles, uploadMany } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/courses/add",
  isAuth,
  isAdminOrInstructor,
  uploadFiles,
  createCourse,
);
router.post("/course/:id", isAuth, isAdminOrInstructor, addLectures);
router.put("/course/:id", isAuth, isAdminOrInstructor, updateCourse);
router.delete("/lecture/:id", isAuth, isAdminOrInstructor, deleteLecture);
router.put("/lecture/:id", isAuth, isAdminOrInstructor, updateLecture);
router.delete("/course/:id", isAuth, isAdminOrInstructor, deleteCourse);
router.get("/stats/", isAuth, isAdminOrInstructor, getAllStats);
router.post(
  "/daily-practice-problems/add",
  isAuth,
  isAdminOrInstructor,
  uploadMany,
  addDpp,
);
router.post(
  "/materials/add",
  isAuth,
  isAdminOrInstructor,
  uploadMany,
  addMaterials,
);
//user-mangement
router.get("/users/all", isAuth, isAdminOrInstructor, getAllUsers);
router.get("/users/:id", isAuth, isAdminOrInstructor, getSingleUser);
router.delete("/users/:id", isAuth, isAdminOrInstructor, deleteUser);
router.delete("/materials/:id", isAuth, isAdminOrInstructor, deleteMaterial);
router.delete("/dpp/:id", isAuth, isAdminOrInstructor, deleteDpp);
export default router;
