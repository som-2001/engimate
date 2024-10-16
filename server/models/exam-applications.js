import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exams",
  },
  status: {
    type: String,
    enum: ["not-applied", "applied", "failed", "passed"],
    default: "not-applied",
  },
  marks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

Schema.post("save", async function (doc, next) {
  try {
    //console.log("Saved ExamApplication _id:", doc._id);
    const examSubmission = await mongoose.model("Exam-Submissions").create({
      applicant: doc.applicant,
      examApplication: doc._id,
      status: "not-submitted",
      marks: 0,
      fileData: "",
    });
    /*console.log(
              "Created ExamSubmission with examApplication _id:",
              examSubmission.examApplication,
            );     
        */
    next();
  } catch (error) {
    next(error);
  }
});
export const ExamApplication = mongoose.model("Exam-Applications", Schema);
