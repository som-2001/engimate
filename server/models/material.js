import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileData: [
    {
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
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
export const Material = mongoose.model("materials", Schema);
