import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendContactUsMail, sendMail } from "../middlewares/sendmail.js";
import TryCatch from "../middlewares/trycatch.js";
import { client, TWILIO_PHONE_NUMBER } from "../index.js";
import { ExamApplication } from "../models/exam-applications.js";
import { ExamSubmission } from "../models/exam-submissions.js";
import trycatch from "../middlewares/trycatch.js";
import { Exam } from "../models/exam.js";
import user from "../routes/user.js";
import { Exam_Application_ref } from "../models/exam-applications-ref.js";
import { response } from "express";
import Certificate from "../models/certificate.js";
import certificate from "../models/certificate.js";

export const registerUser = TryCatch(async (req, res) => {
  const {
    email,
    name,
    phone_number,
    course_enrolled,
    specialization,
    referral_code,
  } = req.body;
  let referrer = null;
  if (referral_code) {
    referrer = await User.findOne({ referral_code });
    if (!referrer) {
      return res.status(400).json({ message: "Invalid referral code" });
    }
  }
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });
  const otp = Math.floor(Math.random() * 900000);

  user = {
    name,
    email,
    otp,
    phone_number,
    course_enrolled,
    specialization,
    otpExpiration: Date.now() + 5 * 60 * 1000,
    referred_by: referrer ? referrer._id : null,
  };
  const activationToken = jwt.sign(
    {
      email,
      otp,
      name,
      phone_number,
      course_enrolled,
      specialization,
      referred_by: referrer ? referrer._id : null,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" },
  );

  const data = {
    username: name,
    otp: otp,
  };
  sendMail(email, "your Verfication OTP for YANTRAVED", data);

  res.status(200).json({
    message: "OTP send to you mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
  if (!verify)
    return res.status(400).json({
      message: "OTP Expired",
    });
  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong OTP",
    });

  const user = await User.create({
    name: verify.name,
    email: verify.email,
    phone_number: verify.phone_number,
    course_enrolled: verify.course_enrolled,
    specialization: verify.specialization,
    referred_by: verify.referred_by,
  });
  //add refereal
  if (verify.referred_by) {
    await User.findByIdAndUpdate(verify.referred_by, {
      $push: { referred_users: user._id },
      $inc: { points: 10 },
    });
  }
  res.status(201).json({ message: "User registered successfully." });
});

export const requestLoginOtp = TryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const otp = Math.floor(Math.random() * 900000).toString();
  user.otpExpiration = Date.now() + 5 * 60 * 1000;
  user.otp = otp;
  await user.save();

  const data = { username: user.name, otp: otp };

  try {
    await sendMail(user.email, "Your Login OTP for YANTRAVED", data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send OTP email", error: error.message });
  }

  res.status(200).json({ message: "OTP sent to your email." });
});

export const verifyLoginOtp = (item) => {
  return TryCatch(async (req, res) => {
    const otp = req.body.otp;
    const userIdentifier = req.body[item];
    const user = await User.findOne({ [item]: userIdentifier });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found with this ${item}` });
    }
    //console.log(user)
    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpiration) {
      return res.status(400).json({ message: "OTP has Expired" });
    }
    const token = jwt.sign(
      { email: user.email, _id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({
      message: "login successful",
      token,
    });
  });
};

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "profile retrieved successfully",
    user,
  });
});

export const sendQuery = TryCatch(async (req, res) => {
  const { name, email, phone_number, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    await sendContactUsMail({ name, email, message, subject, phone_number });
    return res
      .status(200)
      .json({ message: "Your Query has been sent successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
});

export const requestLogin = TryCatch(async (req, res) => {
  const { phone_number } = req.body;

  const user = await User.findOne({ phone_number });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  const otp = Math.floor(Math.random() * 900000).toString();
  user.otpExpiration = Date.now() + 5 * 60 * 1000;
  user.otp = otp;
  await user.save();
  const message = `Your Login OTP for YANTRAVED is ${otp}`;

  try {
    await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phone_number,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send OTP SMS",
      error: error.message,
    });
  }
  res.status(200).json({ message: "OTP sent to your phone number." });
});

export const applyExam = TryCatch(async (req, res) => {
  const { examId } = req.body;
  const applicantId = req.user._id;
  const exam = await Exam.findById(examId).populate("course");
  const user = await User.findById(applicantId).populate("subscription");

  if (!exam || !user) {
    return res.status(404).json({
      message: "Exam or user not found.",
    });
  }
  const isSubscribedToCourse = user.subscription.some((subscribedCourse) =>
    subscribedCourse.equals(exam.course._id),
  );
  if (!isSubscribedToCourse) {
    return res.status(403).json({
      message:
        "You are not subscribed to this course. Please subscribe to apply for this exam.",
    });
  }
  let examApplication = await ExamApplication.findOne({
    applicant: applicantId,
    exam: examId,
  });
  if (examApplication) {
    if (examApplication.status === "fail") {
      examApplication.status = "applied";
      examApplication.marks = 0;
      await examApplication.save();

      return res.status(200).json({
        message: "Re-applied for the exam successfully.",
        examApplication,
      });
    } else {
      return res.status(400).json({
        message:
          "Cannot re-apply. You have either already passed or not applied for this exam yet.",
      });
    }
  }
  examApplication = await ExamApplication.create({
    applicant: applicantId,
    exam: examId,
    status: "applied",
  });
  await Exam_Application_ref.create({
    user: applicantId,
    exam: examId,
    exam_application: examApplication._id,
    status: "applied",
  });
  res.status(201).json({
    message: "Applied for the exam Successfully and submission initialized.",
    examApplication,
  });
});

export const knowExamstatus = TryCatch(async (req, res) => {
  const examApplication = await ExamApplication.findOne({
    applicant: req.user._id,
    exam: req.params.id,
  }).select("status _id");

  if (!examApplication) {
    return res.status(400).json({
      message: "You have not applied to any Exam",
    });
  }
  res.status(200).json({
    message: "your exam status is retrieved successfully",
    exam_status: examApplication.status,
  });
});

export const submitExam = TryCatch(async (req, res) => {
  const examApplicationId = req.params.id;
  const pdf = req.file;
  const userId = req.user._id;
  if (!pdf) {
    return res.status(400).json({
      message: "No file uploaded. Please upload a PDF file to submit.",
    });
  }
  const existingSubmission = await ExamSubmission.findOne({
    applicant: userId,
    examApplication: examApplicationId,
    status: "submitted",
  });

  if (existingSubmission) {
    return res.status(400).json({
      message: "You have already submitted this exam.",
    });
  }
  const submission = await ExamSubmission.findOne({
    examApplication: examApplicationId,
    applicant: userId,
    status: "not-submitted",
  });

  if (!submission) {
    return res.status(400).json({
      message: "Invalid submission.",
    });
  }
  const fileBase64 = `data:${pdf.mimetype};base64,${pdf.buffer.toString("base64")}`;
  submission.fileData = fileBase64;
  submission.status = "submitted";
  submission.updatedAt = Date.now();
  await submission.save();

  res.status(200).json({
    message: "Exam submission was successfull.",
    submission,
  });
});

export const getExamPdf = trycatch(async (req, res) => {
  const examId = req.params.id;
  const applicantId = req.user._id;
  const exam = await Exam.findById(examId).populate("course");
  const user = await User.findById(applicantId).populate("subscription");
  if (!exam || !user) {
    return res.status(404).json({
      message: "Exam or user not found.",
    });
  }
  const isSubscribedToCourse = user.subscription.some((subscribedCourse) =>
    subscribedCourse.equals(exam.course._id),
  );
  if (!isSubscribedToCourse) {
    return res.status(403).json({
      message:
        "You are not subscribed to this course. Please subscribe to access the exam file.",
    });
  }
  const examApplication = await ExamApplication.findOne({
    applicant: applicantId,
    exam: examId,
  });
  if (!examApplication) {
    return res.status(404).json({
      message: "You have not applied for this exam.",
    });
  }
  res.status(200).json({
    message: "Exam file retrieved successfully.",
    fileData: exam.fileData,
  });
});
export const listAllExams = trycatch(async (req, res) => {
  const exams = await Exam.find().select("title course _id");

  if (!exams || exams.length === 0) {
    return res.status(404).json({
      message: "No Exams found",
    });
  }
  res.status(200).json({
    message: "All Exams retrieved successfully",
    exams,
  });
});

export const listExamsByCourse = trycatch(async (req, res) => {
  const exams = await Exam.find({ course: req.params.id }).select(
    "title _id createdAt",
  );

  if (!exams || exams.length === 0) {
    return res.status(404).json({
      message: "No Exams found",
    });
  }
  res.status(200).json({
    message: "All Exams retrieved successfully",
    exams,
  });
});

export const listExamApplications = trycatch(async (req, res) => {
  const applications = await ExamApplication.find({
    applicant: req.user._id,
  })
    .select("_id applicant exam status")
    .populate("exam", "title");
  if (!applications || applications.length === 0) {
    return res.status(404).json({
      message: "Applications not found.",
    });
  }
  res.status(200).json({
    message: "applications retrieved successfully",
    applications,
  });
});

export const getExamApplicationId = trycatch(async (req, res) => {
  const examId = req.params.id;
  const applicationRef = await Exam_Application_ref.findOne({
    user: req.user._id,
    exam: examId,
  }).select("exam_application");
  if (!applicationRef) {
    return res.status(404).json({
      message: "Application Reference not found.",
    });
  }
  res.status(200).json({
    message: "Application ID retrieved successfully",
    applicationId: applicationRef.exam_application,
  });
});

export const getCertificate = trycatch(async (req, res) => {
  const examID = req.params.id;
  const application = await ExamApplication.findOne({
    applicant: req.user._id,
    exam: examID,
  });

  if (!application) {
    return res.status(404).json({
      message: "Application not found.",
    });
  }
  if (application.status === "failed") {
    return res.status(403).json({
      message: "You cannot apply for the certificate as you failed the exam",
    });
  }
  if (application.status === "passed") {
    const exam = await Exam.findById(examID).populate("course");
    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }
    const courseName = exam.course.title;
    const existingCertificate = await Certificate.findOne({
      user: req.user._id,
      exam: examID,
      course: courseName,
    });
    if (existingCertificate) {
      return res.status(400).json({
        message: "Certificate already issued.",
      });
    }
    const certificate = await Certificate.create({
      user: req.user._id,
      exam: examID,
      course: courseName,
    });
    return res.status(201).json({
      message: "Certificate generated successfully.",
      certificate,
    });
  }
  return res.status(400).json({
    message: "You are not eligible to get a certificate.",
  });
});
export const getAllCertificate = trycatch(async (req, res) => {
  const certificates = await Certificate.find({ user: req.user._id }).populate(
    "exam",
    "title",
  );
  if (!certificates || certificates.length === 0) {
    return res.status(404).json({
      message: "certificates not found for this user",
    });
  }
  return res.status(200).json({
    message: "certificates fetch successfully",
    certificates,
  });
});

export const getCertificateDetail = trycatch(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id).populate(
    "exam",
    "title",
  );
  if (!certificate || certificate.length === 0) {
    return res.status(404).json({
      message: "certificate not found.",
    });
  }
  return res.status(200).json({
    message: "certificate fetch successfully",
    certificate,
  });
});
