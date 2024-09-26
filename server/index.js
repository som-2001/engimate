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

//importing routes
import userRoutes from "./routes/user.js";

// using routes
app.use("/api", userRoutes);
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
