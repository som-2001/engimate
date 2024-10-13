import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const Category_Course = mongoose.model("Categories-Courses", Schema);
