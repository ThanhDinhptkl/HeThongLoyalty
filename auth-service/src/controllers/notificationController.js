// controllers/notificationController.js
import { sbAdmin } from "../config/supabaseClient.js";

/**
 * Lấy danh sách notification
 * ?unread=true => chỉ lấy chưa đọc
 */
export async function getNotifications(req, res) {
  try {
    const { unread } = req.query;
    let query = sbAdmin
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (unread === "true") {
      query = query.eq("read", false);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[NOTIFICATION] Lỗi get:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.json({ ok: true, notifications: data });
  } catch (e) {
    console.error("[NOTIFICATION] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * Đánh dấu notification đã đọc
 */
export async function markAsRead(req, res) {
  try {
    const { id } = req.params;

    const { error } = await sbAdmin
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      console.error("[NOTIFICATION] Lỗi update:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.json({ ok: true, message: "Đã đánh dấu đã đọc" });
  } catch (e) {
    console.error("[NOTIFICATION] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
