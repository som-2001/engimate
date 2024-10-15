import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  examApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam-Applications",
  },
  status: {
    type: String,
    enum: ["not-applied", "submitted", "not-submitted"],
    default: "not-applied",
  },
  marks: {
    type: Number,
    default: 0,
  },
  fileData: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const sizeInBytes = Buffer.from(value, "base64").length;
        return sizeInBytes <= 12 * 1024 * 1024;
      },
      message: "File size must be less than or equal to 12 MB",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


export const ExamSubmission = mongoose.model("Exam-Submissions", Schema);
