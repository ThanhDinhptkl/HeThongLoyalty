// import { Router } from "express";
// import { login, logout, me, signup } from "../controllers/authController.js";
// import { requireAuth } from "../middlewares/authMiddleware.js";

// const router = Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/me", requireAuth, me);
// router.post("/logout", logout);

// export default router;
import express from "express";
import {
  signup,
  login,
  me,
  logout,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

// ===== Lấy thông tin user hiện tại từ token =====
router.get("/me", me);

// ===== Lấy profile theo userId =====
router.get("/profile/:id", getProfile);

router.post("/logout", logout);

export default router;
