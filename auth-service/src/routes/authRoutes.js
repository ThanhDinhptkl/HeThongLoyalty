import express from "express";
import passport from "passport";
import {
  register,
  login,
  sendOtpHandler,
  otpLogin,
  me,
  googleCallbackHandler,
} from "../controllers/authController.js";
import { verifyToken, requireRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/send-otp", sendOtpHandler);
router.post("/otp-login", otpLogin);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login?error=google",
  }),
  googleCallbackHandler
);

router.get("/profile", verifyToken, me);

router.get("/admin-only", verifyToken, requireRoles("admin"), (req, res) => {
  res.json({ secret: "Only admin can see this." });
});

export default router;
