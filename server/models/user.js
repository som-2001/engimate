import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone_number: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    course_enrolled: {
      type: String,
      enum: ["B.tech", "M.tech", "B.sc"],
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "instructor"],
      default: "user",
    },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

schema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyValue.email) {
      next(new Error("Email already exists"));
    } else if (error.keyValue.phone_number) {
      next(new Error("Phone number already exists"));
    } else {
      next(error);
    }
  } else {
    next();
  }
});
export const User = mongoose.model("User", schema);
