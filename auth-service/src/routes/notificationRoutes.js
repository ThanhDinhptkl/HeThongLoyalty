import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);

// Đánh dấu đã đọc
router.post("/:id/read", markAsRead);

export default router;
