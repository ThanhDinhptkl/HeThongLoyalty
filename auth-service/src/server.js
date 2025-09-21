import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS: Cho phép frontend gọi API kèm credentials (cookie)
app.use(
  cors({
    origin: "http://localhost:3000", // địa chỉ frontend
    credentials: true, // cho phép gửi cookie
  })
);

// ✅ Middleware parse JSON và cookie
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
