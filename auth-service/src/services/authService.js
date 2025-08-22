import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signJwt } from "../utils/jwt.js";
import { generateOTP, verifyOTP } from "./otpService.js";

export async function registerEmail({ email, password, role = "customer" }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("EMAIL_EXISTS");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashed,
    role,
    provider: "local",
  });

  return user;
}

export async function loginEmail({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("USER_NOT_FOUND");

  if (!user.password) {
    throw new Error("GOOGLE_ACCOUNT_USE_GOOGLE_LOGIN");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("INVALID_PASSWORD");

  const token = signJwt({ id: user._id, role: user.role });
  return { user, token };
}

export async function sendOtp({ phone }) {
  if (!phone) throw new Error("PHONE_REQUIRED");
  generateOTP(phone);
  return { sent: true };
}

export async function loginOtp({ phone, otp }) {
  if (!verifyOTP(phone, otp)) throw new Error("OTP_INVALID");

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, role: "customer", provider: "local" });
  }
  const token = signJwt({ id: user._id, role: user.role });
  return { user, token };
}

export function issueTokenForUser(user) {
  const token = signJwt({ id: user._id, role: user.role });
  return { user, token };
}

export async function getProfile(userId) {
  return User.findById(userId).select("-password");
}
