import { sbAdmin } from "../config/supabaseClient.js";

export async function requireAuth(req, res, next) {
  try {
    const token =
      req.cookies["sb-access-token"] ||
      (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error) return res.status(401).json({ error: "Invalid token" });

    req.user = data.user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
