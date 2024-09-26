import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  concepts_list: {
    type: String,
    required: true,
  },
  course_description: {
    type: String,
    required: true,
  },
  course_objective: {
    type: String,
    required: true,
  },
  roles_in_industry: {
    type: String,
    required: true,
  },
  course_highlights: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const Courses = mongoose.model("Courses", Schema);
