// import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";
// import { normalizePhone, normalizeIdentifier } from "../utils/normalize.js";

// /**
//  * ===== Đăng ký Customer =====
//  */
// export async function signupCustomer(req, res) {
//   try {
//     const { full_name, email, phone, password } = req.body;

//     if ((!email && !phone) || !password) {
//       return res.status(400).json({ error: "Thiếu email/phone hoặc password" });
//     }

//     const normPhone = phone ? normalizePhone(phone) : undefined;

//     const { data, error } = await sbAdmin.auth.admin.createUser({
//       email: email || undefined,
//       phone: normPhone,
//       password,
//       user_metadata: { full_name },
//       email_confirm: !!email,
//       phone_confirm: !!normPhone,
//     });

//     if (error) {
//       console.error("[SIGNUP CUSTOMER] Lỗi createUser:", error.message);
//       return res.status(400).json({ error: error.message });
//     }

//     const user = data.user;

//     await sbAdmin.from("profiles").insert([
//       {
//         id: user.id,
//         full_name,
//         email,
//         phone: normPhone,
//         role: "customer",
//         approved: true,
//       },
//     ]);

//     await writeAudit({
//       user_id: user.id,
//       action: "signup_customer",
//       resource: "auth",
//       metadata: { email, phone: normPhone },
//     });

//     return res.json({
//       ok: true,
//       user: { id: user.id, email: user.email, phone: user.phone },
//     });
//   } catch (e) {
//     console.error("[SIGNUP CUSTOMER] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Đăng ký Admin =====
//  */
// export async function signupAdmin(req, res) {
//   try {
//     const { full_name, email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Thiếu email hoặc password" });
//     }

//     const { data, error } = await sbAdmin.auth.admin.createUser({
//       email,
//       password,
//       user_metadata: { full_name },
//       email_confirm: true,
//     });

//     if (error) {
//       console.error("[SIGNUP ADMIN] Lỗi createUser:", error.message);
//       return res.status(400).json({ error: error.message });
//     }

//     const user = data.user;

//     await sbAdmin
//       .from("profiles")
//       .insert([
//         { id: user.id, full_name, email, role: "admin", approved: false },
//       ]);

//     await writeAudit({
//       user_id: user.id,
//       action: "signup_admin",
//       resource: "auth",
//       metadata: { email },
//     });

//     return res.json({
//       ok: true,
//       message: "Đăng ký admin thành công, chờ duyệt",
//     });
//   } catch (e) {
//     console.error("[SIGNUP ADMIN] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Super-admin duyệt Admin =====
//  */
// export async function approveAdmin(req, res) {
//   try {
//     const { id } = req.params;

//     const { data, error } = await sbAdmin
//       .from("profiles")
//       .update({ approved: true })
//       .eq("id", id)
//       .eq("role", "admin")
//       .select();

//     if (error || !data || data.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Không tìm thấy admin hoặc đã duyệt" });
//     }

//     await writeAudit({
//       user_id: id,
//       action: "approve_admin",
//       resource: "auth",
//     });

//     return res.json({ ok: true, message: "Duyệt admin thành công" });
//   } catch (e) {
//     console.error("[APPROVE ADMIN] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Đăng nhập =====
//  */
// export async function login(req, res) {
//   try {
//     const { identifier, email, phone, password } = req.body;
//     const id = identifier || email || phone;

//     if (!id || !password) {
//       return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
//     }

//     const { isEmail, value } = normalizeIdentifier(id);
//     const phoneValue = !isEmail ? normalizePhone(value) : undefined;

//     const { data, error } = await sbPublic.auth.signInWithPassword(
//       isEmail ? { email: value, password } : { phone: phoneValue, password }
//     );

//     if (error) {
//       return res
//         .status(401)
//         .json({ error: "Sai thông tin đăng nhập: " + error.message });
//     }

//     const { session, user } = data;

//     const { data: profile } = await sbAdmin
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     if (profile?.role === "admin" && !profile.approved) {
//       return res
//         .status(403)
//         .json({ error: "Admin chưa được super-admin duyệt" });
//     }

//     const maxAge = 60 * 60 * 24 * 7;
//     res
//       .cookie("sb-access-token", session.access_token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         domain: process.env.COOKIE_DOMAIN || undefined,
//         path: "/",
//         maxAge: maxAge * 1000,
//       })
//       .cookie("sb-refresh-token", session.refresh_token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         domain: process.env.COOKIE_DOMAIN || undefined,
//         path: "/",
//         maxAge: maxAge * 1000,
//       });

//     await writeAudit({
//       user_id: user.id,
//       action: "login",
//       resource: "auth",
//       metadata: { role: profile?.role },
//     });

//     return res.json({
//       ok: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         phone: user.phone,
//         role: profile?.role,
//         full_name: user.user_metadata?.full_name,
//       },
//     });
//   } catch (e) {
//     console.error("[LOGIN] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Me =====
//  */
// export async function me(req, res) {
//   try {
//     const token =
//       req.cookies["sb-access-token"] ||
//       (req.headers.authorization || "").replace("Bearer ", "");

//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     const { data, error } = await sbAdmin.auth.getUser(token);
//     if (error) return res.status(401).json({ error: "Invalid token" });

//     const user = data.user;
//     const { data: profile } = await sbAdmin
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     return res.json({ ok: true, user, profile });
//   } catch (e) {
//     console.error("[ME] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Lấy profile =====
//  */
// export async function getProfile(req, res) {
//   try {
//     const { id } = req.params;
//     const { data, error } = await sbAdmin
//       .from("profiles")
//       .select("*")
//       .eq("id", id)
//       .single();

//     if (error || !data) {
//       return res.status(404).json({ error: "Không tìm thấy user" });
//     }

//     return res.json({ ok: true, profile: data });
//   } catch (e) {
//     console.error("[GET PROFILE] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// /**
//  * ===== Logout =====
//  */
// export async function logout(req, res) {
//   try {
//     res
//       .clearCookie("sb-access-token", { path: "/" })
//       .clearCookie("sb-refresh-token", { path: "/" });

//     return res.json({ ok: true, message: "Đăng xuất thành công" });
//   } catch (e) {
//     console.error("[LOGOUT] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }
import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";
import { normalizePhone, normalizeIdentifier } from "../utils/normalize.js";

/**
 * ===== Đăng ký Customer =====
 */
export async function signupCustomer(req, res) {
  try {
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

    if (error) {
      console.error("[SIGNUP CUSTOMER] Lỗi createUser:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const user = data.user;

    await sbAdmin.from("profiles").insert([
      {
        id: user.id,
        full_name,
        email,
        phone: normPhone,
        role: "customer",
        approved: true,
      },
    ]);

    await writeAudit({
      user_id: user.id,
      action: "signup_customer",
      resource: "auth",
      metadata: { email, phone: normPhone },
    });

    return res.json({
      ok: true,
      user: { id: user.id, email: user.email, phone: user.phone },
    });
  } catch (e) {
    console.error("[SIGNUP CUSTOMER] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Đăng ký Admin =====
 */
export async function signupAdmin(req, res) {
  try {
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

    if (error) {
      console.error("[SIGNUP ADMIN] Lỗi createUser:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const user = data.user;

    await sbAdmin
      .from("profiles")
      .insert([
        { id: user.id, full_name, email, role: "admin", approved: false },
      ]);

    await writeAudit({
      user_id: user.id,
      action: "signup_admin",
      resource: "auth",
      metadata: { email },
    });

    return res.json({
      ok: true,
      message: "Đăng ký admin thành công, chờ duyệt",
    });
  } catch (e) {
    console.error("[SIGNUP ADMIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Super-admin duyệt Admin =====
 */
export async function approveAdmin(req, res) {
  try {
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

    return res.json({ ok: true, message: "Duyệt admin thành công" });
  } catch (e) {
    console.error("[APPROVE ADMIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Đăng nhập =====
 * (Cách 2 - trả token JSON để FE lưu localStorage)
 */
export async function login(req, res) {
  try {
    const { identifier, email, phone, password } = req.body;
    const id = identifier || email || phone;

    if (!id || !password) {
      return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
    }

    const { isEmail, value } = normalizeIdentifier(id);
    const phoneValue = !isEmail ? normalizePhone(value) : undefined;

    // Đăng nhập bằng Supabase
    const { data, error } = await sbPublic.auth.signInWithPassword(
      isEmail ? { email: value, password } : { phone: phoneValue, password }
    );

    if (error) {
      return res
        .status(401)
        .json({ error: "Sai thông tin đăng nhập: " + error.message });
    }

    const { session, user } = data;

    // Lấy profile trong DB
    const { data: profile } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin" && !profile.approved) {
      return res
        .status(403)
        .json({ error: "Admin chưa được super-admin duyệt" });
    }

    // Audit log
    await writeAudit({
      user_id: user.id,
      action: "login",
      resource: "auth",
      metadata: { role: profile?.role },
    });

    // 👉 Trả JSON cho FE (FE sẽ tự lưu localStorage)
    return res.json({
      ok: true,
      token: session.access_token,
      refreshToken: session.refresh_token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: profile?.role,
        full_name: user.user_metadata?.full_name,
      },
    });
  } catch (e) {
    console.error("[LOGIN] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Me =====
 * (FE gửi kèm Authorization: Bearer token)
 */
export async function me(req, res) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error) return res.status(401).json({ error: "Invalid token" });

    const user = data.user;
    const { data: profile } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.user_metadata?.full_name,
        role: profile?.role,
      },
    });
  } catch (e) {
    console.error("[ME] Server error:", e);
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
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    return res.json({ ok: true, profile: data });
  } catch (e) {
    console.error("[GET PROFILE] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

/**
 * ===== Logout =====
 */
export async function logout(req, res) {
  try {
    // FE chỉ cần xóa token trong localStorage, BE không quản lý
    return res.json({
      ok: true,
      message: "Đăng xuất thành công (xóa token ở FE)",
    });
  } catch (e) {
    console.error("[LOGOUT] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
