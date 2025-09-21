import express from "express";
import {
  signupCustomer,
  signupAdmin,
  approveAdmin,
  login,
  logout,
  me,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * =============================
 * 🔑 AUTH ROUTES
 * Prefix: /auth
 * =============================
 */

/**
 * 👤 Đăng ký khách hàng
 * POST /auth/register-customer
 */
router.post("/register-customer", signupCustomer);

/**
 * 🛠️ Đăng ký admin (cần super-admin duyệt)
 * POST /auth/register-admin
 */
router.post("/register-admin", signupAdmin);

/**
 * ✅ Super-admin duyệt admin
 * PATCH /auth/approve-admin/:id
 */
router.patch("/approve-admin/:id", approveAdmin);

/**
 * 🔑 Đăng nhập (cookie-based)
 * POST /auth/login
 */
router.post("/login", login);

/**
 * 👤 Lấy thông tin user hiện tại từ token/cookie
 * GET /auth/me
 */
router.get("/me", me);

/**
 * 📄 Lấy profile theo userId
 * GET /auth/profile/:id
 */
router.get("/profile/:id", getProfile);

/**
 * 🚪 Đăng xuất (xóa cookie)
 * POST /auth/logout
 */
router.post("/logout", logout);

export default router;
