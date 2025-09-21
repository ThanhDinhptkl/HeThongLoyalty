import { sbAdmin } from "../config/supabaseClient.js";

export async function requireAuth(req, res, next) {
  try {
    const token =
      req.cookies["sb-access-token"] ||
      (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Gắn user vào req
    req.user = data.user;

    // Lấy role từ cookie (ưu tiên) hoặc từ profile
    let role = req.cookies["sb-user-role"];
    if (!role) {
      const { data: profile } = await sbAdmin
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      role = profile?.role;
    }

    req.user.role = role;

    next();
  } catch (e) {
    console.error("[AUTH MIDDLEWARE] error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
