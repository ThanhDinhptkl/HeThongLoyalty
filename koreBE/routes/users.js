// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize"); // ✅ Thêm dòng này
const User = require("../models/User");

// ✅ Lấy danh sách tất cả user (chỉ admin dùng)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "email",
        "name",
        "customerCode",
        "role",
        "active",
        "createdAt",
      ],
    });
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Tạo tài khoản khách hàng mới
router.post("/", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email và mật khẩu bắt buộc" });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash: hash,
      name,
      phone: phone || null,
      role: "customer",
      active: true,
      customerCode: "CUST" + Date.now().toString().slice(-6),
    });

    res.status(201).json({
      message: "Tạo tài khoản thành công",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        customerCode: user.customerCode,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("POST /users error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Tìm kiếm khách hàng theo mã hoặc số điện thoại
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tham số tìm kiếm" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ customerCode: query }, { phone: query }],
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy khách hàng" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("GET /users/search error:", error);
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi tìm khách hàng" });
  }
});

module.exports = router;
