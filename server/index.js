import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

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

app.post("/createOrder", async (req, res) => {
  const { amount, userId } = req.body;
  const orderId = uuidv4();

  const order = { orderId, amount, userId, status: "pending" };

  const redirectUrl = `process.env.LYSS_REDIRECT_URL?order_id=${orderId}&amount=${amount}`;
  res.redirect(redirectUrl);
});

app.post("/api/order/update", async (req, res) => {
  const { order_id, status } = req.body;
  res.status(200).json({
    message: "Order status updated successfully",
    order_id,
    status,
  });
});
startserver();
