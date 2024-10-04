import mongoose from "mongoose";
import * as crypto from "crypto";

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
    referral_code: {
      type: String,
      unique: true,
    },
    referred_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referred_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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

schema.pre("save", async function (next) {
  if (!this.referral_code) {
    try {
      this.referral_code = await generateUniqueReferralCode(this.name);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

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
const generateUniqueReferralCode = async (name) => {
  const randomString = crypto.randomBytes(3).toString("hex"); // 6 character random string
  const referralCode = `${name.slice(0, 3).toUpperCase()}-${randomString}`; // Use first 3 letters of name + random string

  const existingUser = await mongoose
    .model("User")
    .findOne({ referral_code: referralCode });
  if (existingUser) {
    return await generateUniqueReferralCode(name);
  }
  return referralCode;
};
export const User = mongoose.model("User", schema);
