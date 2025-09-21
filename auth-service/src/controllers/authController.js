import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";
import { normalizePhone, normalizeIdentifier } from "../utils/normalize.js";

/**
 * Helper: tạo hoặc cập nhật profile cho user
 * - Nếu chưa có: tạo mới
 * - Nếu đã có nhưng role sai hoặc chưa approved: cập nhật
 */
async function createOrUpdateProfile(user) {
  // ✅ Luôn ép role = super-admin nếu đúng email ntdinh10@gmail.com
  const isSuperAdmin = user.email?.toLowerCase() === "ntdinh10@gmail.com";
  const wantedRole = isSuperAdmin ? "super-admin" : "customer";

  // Bỏ qua role trong DB nếu là super-admin
  if (isSuperAdmin) {
    return {
      id: user.id,
      email: user.email,
      role: "super-admin",
      approved: true,
    };
  }

  // Các user khác vẫn xử lý bình thường
  const { data: existing, error: fetchErr } = await sbAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchErr) console.error("[PROFILE] Lỗi lấy profile:", fetchErr);

  if (existing) return existing;

  // Nếu chưa có → tạo mới
  const newProfile = {
    id: user.id,
    full_name: user.user_metadata?.full_name || user.email,
    email: user.email,
    phone: user.phone,
    role: "customer",
    approved: true,
  };

  const { data: inserted, error: insertError } = await sbAdmin
    .from("profiles")
    .insert([newProfile])
    .select()
    .single();

  if (insertError) {
    console.error("[PROFILE] Lỗi tạo profile:", insertError);
    throw insertError;
  }

  return inserted;
}

/**
 * ===== Đăng ký Customer =====
 */
export async function signupCustomer(req, res) {
  try {
    console.log("🟢 [SIGNUP CUSTOMER] Bắt đầu...", req.body);
    const { full_name, email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({ error: "Thiếu email/phone hoặc password" });
    }

    const normPhone = phone ? normalizePhone(phone) : undefined;

    const { data, error } = await sbAdmin.auth.admin.createUser({
      email: email || undefined,
      phone: normPhone,
      password,
      user_metadata: { full_name },
      email_confirm: !!email,
      phone_confirm: !!normPhone,
    });

    if (error || !data?.user) {
      console.error("❌ [SIGNUP CUSTOMER] createUser error:", error);
      return res
        .status(400)
        .json({ error: error?.message || "Tạo user thất bại" });
    }

    const user = data.user;
    console.log("✅ [SIGNUP CUSTOMER] User created:", user.id);

    try {
      const profile = await createOrUpdateProfile(user);
      await writeAudit({
        user_id: user.id,
        action: "signup_customer",
        resource: "auth",
        metadata: { email, phone: normPhone },
      });

      return res.json({
        ok: true,
        user: { id: user.id, email: user.email, phone: user.phone },
        profile,
      });
    } catch (e) {
      console.error("[SIGNUP CUSTOMER] Lỗi insert profile:", e);
      return res.status(500).json({ error: "Không thể tạo profile" });
    }
  } catch (e) {
    console.error("🔥 [SIGNUP CUSTOMER] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Đăng ký Admin =====
 */
export async function signupAdmin(req, res) {
  try {
    console.log("🟢 [SIGNUP ADMIN] Bắt đầu...", req.body);
    const { full_name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Thiếu email hoặc password" });
    }

    const { data, error } = await sbAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name },
      email_confirm: true,
    });

    if (error || !data?.user) {
      console.error("❌ [SIGNUP ADMIN] createUser error:", error);
      return res
        .status(400)
        .json({ error: error?.message || "Tạo admin thất bại" });
    }

    const user = data.user;
    console.log("✅ [SIGNUP ADMIN] User created:", user.id);

    const { data: profileInserted, error: insertError } = await sbAdmin
      .from("profiles")
      .insert([
        { id: user.id, full_name, email, role: "admin", approved: false },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("[SIGNUP ADMIN] Lỗi insert profile admin:", insertError);
      return res.status(500).json({ error: "Không thể tạo profile admin" });
    }

    await writeAudit({
      user_id: user.id,
      action: "signup_admin",
      resource: "auth",
      metadata: { email },
    });

    return res.json({
      ok: true,
      message: "Đăng ký admin thành công, chờ duyệt",
      user: { id: user.id, email: user.email },
      profile: profileInserted,
    });
  } catch (e) {
    console.error("🔥 [SIGNUP ADMIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Duyệt Admin =====
 */
export async function approveAdmin(req, res) {
  try {
    console.log("🟢 [APPROVE ADMIN] id=", req.params.id);
    const { id } = req.params;

    const { data, error } = await sbAdmin
      .from("profiles")
      .update({ approved: true })
      .eq("id", id)
      .eq("role", "admin")
      .select();

    if (error || !data || data.length === 0) {
      return res
        .status(400)
        .json({ error: "Không tìm thấy admin hoặc đã duyệt" });
    }

    await writeAudit({
      user_id: id,
      action: "approve_admin",
      resource: "auth",
    });

    return res.json({
      ok: true,
      message: "Duyệt admin thành công",
      updated: data,
    });
  } catch (e) {
    console.error("🔥 [APPROVE ADMIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Đăng nhập =====
 */
export async function login(req, res) {
  try {
    console.log("🟢 [LOGIN] body:", req.body);
    const { identifier, email, phone, password } = req.body;
    const id = identifier || email || phone;

    if (!id || !password) {
      return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
    }

    const { isEmail, value } = normalizeIdentifier(id);
    const phoneValue = !isEmail ? normalizePhone(value) : undefined;

    const { data, error } = await sbPublic.auth.signInWithPassword(
      isEmail ? { email: value, password } : { phone: phoneValue, password }
    );

    if (error) {
      console.error("[LOGIN] Supabase signIn error:", error);
      return res.status(401).json({ error: "Sai thông tin đăng nhập" });
    }

    const { session, user } = data;
    if (!user) return res.status(500).json({ error: "Auth fail" });

    // Lấy hoặc cập nhật profile
    const profile = await createOrUpdateProfile(user);

    if (profile.role === "admin" && !profile.approved) {
      return res
        .status(403)
        .json({ error: "Admin chưa được super-admin duyệt" });
    }

    await writeAudit({
      user_id: user.id,
      action: "login",
      resource: "auth",
      metadata: { role: profile.role },
    });

    // Set cookies
    res.cookie("sb-access-token", session.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookie("sb-refresh-token", session.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    res.cookie("sb-user-role", profile.role, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.user_metadata?.full_name || profile.full_name,
      },
      profile,
    });
  } catch (e) {
    console.error("🔥 [LOGIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Me =====
 */
export async function me(req, res) {
  try {
    const token =
      req.cookies["sb-access-token"] ||
      (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error || !data?.user)
      return res.status(401).json({ error: "Invalid token" });

    const user = data.user;
    const profile = await createOrUpdateProfile(user);

    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.user_metadata?.full_name,
      },
      profile,
    });
  } catch (e) {
    console.error("🔥 [ME] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Lấy profile =====
 */
export async function getProfile(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: "Server error" });
    if (!data) return res.status(404).json({ error: "Không tìm thấy user" });

    return res.json({ ok: true, profile: data });
  } catch (e) {
    console.error("🔥 [GET PROFILE] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Logout =====
 */
export async function logout(req, res) {
  try {
    res.clearCookie("sb-access-token", { path: "/" });
    res.clearCookie("sb-refresh-token", { path: "/" });
    res.clearCookie("sb-user-role", { path: "/" });
    return res.json({ ok: true, message: "Đăng xuất thành công" });
  } catch (e) {
    console.error("🔥 [LOGOUT] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
