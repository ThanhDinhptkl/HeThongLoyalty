// import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";
// import { normalizePhone, normalizeIdentifier } from "../utils/normalize.js";

// export async function signup(req, res) {
//   try {
//     const {
//       full_name,
//       email, // hoặc phone
//       phone,
//       password,
//       restaurant_name,
//       owner_name,
//       address,
//     } = req.body;

//     if ((!email && !phone) || !password) {
//       console.warn("[SIGNUP] Thiếu email/phone hoặc password:", req.body);
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
//       console.error("[SIGNUP] Lỗi createUser:", error.message);
//       return res.status(400).json({ error: error.message });
//     }

//     const user = data.user;

//     console.log("[SIGNUP] User mới:", user.id, user.email || user.phone);

//     await sbAdmin
//       .from("profiles")
//       .insert([{ id: user.id, full_name, phone: normPhone, role: "partner" }]);

//     if (restaurant_name) {
//       await sbAdmin.from("partners").insert([
//         {
//           owner_id: user.id,
//           restaurant_name,
//           owner_name,
//           address,
//           phone: normPhone,
//           status: "trial",
//         },
//       ]);
//     }

//     await writeAudit({
//       user_id: user.id,
//       action: "signup",
//       resource: "auth",
//       metadata: { email, phone: normPhone, restaurant_name },
//     });

//     return res.json({ ok: true, user: { id: user.id, email: user.email } });
//   } catch (e) {
//     console.error("[SIGNUP] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export async function login(req, res) {
//   try {
//     const { identifier, email, phone, password } = req.body;
//     const id = identifier || email || phone;

//     if (!id || !password) {
//       console.warn("[LOGIN] Thiếu thông tin:", req.body);
//       return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
//     }

//     const { isEmail, value } = normalizeIdentifier(id);
//     const phoneValue = !isEmail ? normalizePhone(value) : undefined;

//     console.log("[LOGIN] Đang đăng nhập với:", {
//       identifier: id,
//       isEmail,
//       email: isEmail ? value : undefined,
//       phone: phoneValue,
//     });

//     const { data, error } = await sbPublic.auth.signInWithPassword(
//       isEmail ? { email: value, password } : { phone: phoneValue, password }
//     );

//     if (error) {
//       console.warn("[LOGIN] Lỗi Supabase:", error.message, {
//         email: isEmail ? value : undefined,
//         phone: phoneValue,
//       });
//       return res
//         .status(401)
//         .json({ error: "Sai thông tin đăng nhập: " + error.message });
//     }

//     const { session, user } = data;
//     console.log("[LOGIN] Đăng nhập thành công:", user.id);

//     const { data: profile, error: profileError } = await sbAdmin
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     if (profileError) {
//       console.error("[LOGIN] Lỗi load profile:", profileError.message);
//     }

//     const maxAge = 60 * 60 * 24 * 7; // 7 ngày
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

// export async function me(req, res) {
//   try {
//     const token =
//       req.cookies["sb-access-token"] ||
//       (req.headers.authorization || "").replace("Bearer ", "");

//     if (!token) {
//       console.warn("[ME] Không có token");
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { data, error } = await sbAdmin.auth.getUser(token);
//     if (error) {
//       console.warn("[ME] Token không hợp lệ:", error.message);
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     const user = data.user;
//     const { data: profile, error: profileError } = await sbAdmin
//       .from("profiles")
//       .select("*")
//       .eq("id", user.id)
//       .single();

//     if (profileError) {
//       console.error("[ME] Lỗi load profile:", profileError.message);
//     }

//     return res.json({ ok: true, user, profile });
//   } catch (e) {
//     console.error("[ME] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export async function logout(req, res) {
//   try {
//     res
//       .clearCookie("sb-access-token", { path: "/" })
//       .clearCookie("sb-refresh-token", { path: "/" });

//     console.log("[LOGOUT] Thành công");
//     return res.json({ ok: true, message: "Đăng xuất thành công" });
//   } catch (e) {
//     console.error("[LOGOUT] Server error:", e);
//     return res.status(500).json({ error: "Server error" });
//   }
// }
import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";
import { normalizePhone, normalizeIdentifier } from "../utils/normalize.js";

// ===== Đăng ký =====
export async function signup(req, res) {
  try {
    const {
      full_name,
      email, // hoặc phone
      phone,
      password,
      restaurant_name,
      owner_name,
      address,
    } = req.body;

    if ((!email && !phone) || !password) {
      console.warn("[SIGNUP] Thiếu email/phone hoặc password:", req.body);
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
      console.error("[SIGNUP] Lỗi createUser:", error.message);
      return res.status(400).json({ error: error.message });
    }

    const user = data.user;
    console.log("[SIGNUP] User mới:", user.id, user.email || user.phone);

    await sbAdmin
      .from("profiles")
      .insert([{ id: user.id, full_name, phone: normPhone, role: "partner" }]);

    if (restaurant_name) {
      await sbAdmin.from("partners").insert([
        {
          owner_id: user.id,
          restaurant_name,
          owner_name,
          address,
          phone: normPhone,
          status: "trial",
        },
      ]);
    }

    await writeAudit({
      user_id: user.id,
      action: "signup",
      resource: "auth",
      metadata: { email, phone: normPhone, restaurant_name },
    });

    return res.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error("[SIGNUP] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ===== Đăng nhập =====
export async function login(req, res) {
  try {
    const { identifier, email, phone, password } = req.body;
    const id = identifier || email || phone;

    if (!id || !password) {
      console.warn("[LOGIN] Thiếu thông tin:", req.body);
      return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });
    }

    const { isEmail, value } = normalizeIdentifier(id);
    const phoneValue = !isEmail ? normalizePhone(value) : undefined;

    console.log("[LOGIN] Đang đăng nhập với:", {
      identifier: id,
      isEmail,
      email: isEmail ? value : undefined,
      phone: phoneValue,
    });

    const { data, error } = await sbPublic.auth.signInWithPassword(
      isEmail ? { email: value, password } : { phone: phoneValue, password }
    );

    if (error) {
      console.warn("[LOGIN] Lỗi Supabase:", error.message);
      return res
        .status(401)
        .json({ error: "Sai thông tin đăng nhập: " + error.message });
    }

    const { session, user } = data;
    console.log("[LOGIN] Đăng nhập thành công:", user.id);

    const { data: profile, error: profileError } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("[LOGIN] Lỗi load profile:", profileError.message);
    }

    const maxAge = 60 * 60 * 24 * 7; // 7 ngày
    res
      .cookie("sb-access-token", session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        // domain: process.env.COOKIE_DOMAIN || undefined,
        domain: undefined,
        path: "/",
        maxAge: maxAge * 1000,
      })
      .cookie("sb-refresh-token", session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        // domain: process.env.COOKIE_DOMAIN || undefined,
        domain: undefined,
        path: "/",
        maxAge: maxAge * 1000,
      });

    await writeAudit({
      user_id: user.id,
      action: "login",
      resource: "auth",
      metadata: { role: profile?.role },
    });

    return res.json({
      ok: true,
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

// ===== Lấy thông tin từ token (me) =====
export async function me(req, res) {
  try {
    const token =
      req.cookies["sb-access-token"] ||
      (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) {
      console.warn("[ME] Không có token");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error) {
      console.warn("[ME] Token không hợp lệ:", error.message);
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = data.user;
    const { data: profile, error: profileError } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("[ME] Lỗi load profile:", profileError.message);
    }

    return res.json({ ok: true, user, profile });
  } catch (e) {
    console.error("[ME] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ===== Lấy profile theo userId (phục vụ authRoutes.js) =====
export async function getProfile(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.warn("[GET PROFILE] Không tìm thấy user:", id);
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    return res.json({ ok: true, profile: data });
  } catch (e) {
    console.error("[GET PROFILE] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}

// ===== Đăng xuất =====
export async function logout(req, res) {
  try {
    res
      .clearCookie("sb-access-token", { path: "/" })
      .clearCookie("sb-refresh-token", { path: "/" });

    console.log("[LOGOUT] Thành công");
    return res.json({ ok: true, message: "Đăng xuất thành công" });
  } catch (e) {
    console.error("[LOGOUT] Server error:", e);
    return res.status(500).json({ error: "Server error" });
  }
}
