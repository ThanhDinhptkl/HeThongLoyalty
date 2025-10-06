const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

// ✅ Seed admin
router.post("/seed-admin", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email và password bắt buộc" });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Admin đã tồn tại" });
    const hash = await bcrypt.hash(password, 10);
    const admin = await User.create({
      email,
      passwordHash: hash,
      name,
      role: "admin",
      active: true,
    });
    return res.json({ message: "Admin created", id: admin.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// ✅ Đăng nhập admin
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Không phải admin" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Đăng nhập khách hàng (email hoặc số điện thoại)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        [require("sequelize").Op.or]: [{ email }, { phone: email }],
      },
    });
    if (!user)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    if (user.role !== "customer")
      return res.status(403).json({ message: "Không phải khách hàng" });
    if (!user.active)
      return res.status(403).json({ message: "Tài khoản chưa được kích hoạt" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({
      token,
      user: {
        id: user.id,
        customerCode: user.customerCode,
        email: user.email,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
