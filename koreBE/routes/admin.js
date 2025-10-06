const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { verifyToken, requireRole } = require("../middleware/auth");

// Hàm tạo mã KH duy nhất (KHxxxxxx)
async function generateUniqueCustomerCode() {
  let code;
  let exists = true;
  while (exists) {
    const random = Math.floor(100000 + Math.random() * 900000);
    code = `KH${random}`;
    const found = await User.findOne({ where: { customerCode: code } });
    if (!found) exists = false;
  }
  return code;
}

// ✅ Tạo khách hàng - admin dùng
router.post(
  "/customers",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    try {
      const { email, name, phone, active = true } = req.body;

      if (!email || !phone)
        return res
          .status(400)
          .json({ message: "Email và số điện thoại là bắt buộc" });

      // Kiểm tra trùng email
      const existing = await User.findOne({ where: { email } });
      if (existing)
        return res.status(400).json({ message: "Email đã tồn tại" });

      // ✅ Mật khẩu mặc định = 6 số đầu của số điện thoại
      const basePass = phone.replace(/\D/g, "").substring(0, 6) || "123456";
      const hash = await bcrypt.hash(basePass, 10);

      // Sinh mã KH duy nhất
      const customerCode = await generateUniqueCustomerCode();

      // Tạo khách hàng
      const newUser = await User.create({
        email,
        name,
        phone,
        passwordHash: hash,
        customerCode,
        role: "customer",
        active,
      });

      res.status(201).json({
        message: `Tạo khách hàng thành công (mật khẩu mặc định: ${basePass})`,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          customerCode: newUser.customerCode,
          active: newUser.active,
        },
      });
    } catch (err) {
      console.error("Error creating customer:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// ✅ Danh sách khách hàng
router.get(
  "/customers",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    try {
      const customers = await User.findAll({
        where: { role: "customer" },
        attributes: { exclude: ["passwordHash"] },
      });
      res.json(customers);
    } catch (err) {
      console.error("Error fetching customers:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

// ✅ Cập nhật trạng thái hoạt động
router.patch(
  "/customers/:id/active",
  verifyToken,
  requireRole("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { active } = req.body;
      const user = await User.findByPk(id);
      if (!user)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });

      user.active = !!active;
      await user.save();

      const out = user.toJSON();
      delete out.passwordHash;
      res.json(out);
    } catch (err) {
      console.error("Error updating active status:", err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
