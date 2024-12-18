import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cors from "cors";
import Razorpay from "razorpay";
import twilio from "twilio";

dotenv.config();
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const app = express();
const port = process.env.PORT || 8000;

export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  }),
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running");
});
// static routes
app.use("/uploads", express.static("uploads"));

//importing routes
import userRoutes from "./routes/user.js";
import coursesRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";
import categoryRoutes from "./routes/categories.js";
import dppRoutes from "./routes/dpp.js";
import materialRoutes from "./routes/materials.js";
import examRoutes from "./routes/exam.js";

// using routes
app.use("/api", userRoutes);
app.use("/api", coursesRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", dppRoutes);
app.use("/api", materialRoutes);
app.use("/api", examRoutes);

const startserver = async () => {
  try {
    await connectDb();
    {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startserver();
