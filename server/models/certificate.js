import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = new mongoose.Schema(
  {
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
    course: {
      type: String,
      required: true,
    },
    certificate_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
const Certificate = mongoose.model("Certificates", Schema);

export default Certificate;
