import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

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

// using routes
app.use("/api", userRoutes);
app.use("/api", coursesRoutes);
app.use("/api", adminRoutes);
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
