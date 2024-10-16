import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exams",
    required: true,
  },
  exam_application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exams",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["not-applied", "applied", "failed", "passed"],
    default: "not-applied",
  },
});
export const Exam_Application_ref = mongoose.model(
  "Exam-Application-ref",
  Schema,
);
