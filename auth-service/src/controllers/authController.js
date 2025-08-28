import { sbAdmin, sbPublic, writeAudit } from "../config/supabaseClient.js";

function normalizeIdentifier(identifier = "") {
  const isEmail = identifier.includes("@");
  return { isEmail, value: identifier.trim() };
}

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
      return res.status(400).json({ error: "Thiếu email/phone hoặc password" });
    }

    const { data, error } = await sbAdmin.auth.admin.createUser({
      email: email || undefined,
      password,
      phone: phone || undefined,
      user_metadata: { full_name },
      email_confirm: !!email,
      phone_confirm: !!phone,
    });

    if (error) return res.status(400).json({ error: error.message });

    const user = data.user;
    await sbAdmin
      .from("profiles")
      .insert([{ id: user.id, full_name, phone, role: "partner" }]);
    if (restaurant_name) {
      await sbAdmin.from("partners").insert([
        {
          owner_id: user.id,
          restaurant_name,
          owner_name,
          address,
          phone,
          status: "trial",
        },
      ]);
    }

    await writeAudit({
      user_id: user.id,
      action: "signup",
      resource: "auth",
      metadata: { email, phone, restaurant_name },
    });

    return res.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ error: "Thiếu thông tin đăng nhập" });

    const { isEmail, value } = normalizeIdentifier(identifier);

    const { data, error } = await sbPublic.auth.signInWithPassword(
      isEmail ? { email: value, password } : { phone: value, password }
    );
    if (error)
      return res.status(401).json({ error: "Sai thông tin đăng nhập" });

    const { session, user } = data;

    const { data: profile } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const maxAge = 60 * 60 * 24 * 7; // 7 ngày
    res
      .cookie("sb-access-token", session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: process.env.COOKIE_DOMAIN || undefined,
        path: "/",
        maxAge: maxAge * 1000,
      })
      .cookie("sb-refresh-token", session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: process.env.COOKIE_DOMAIN || undefined,
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
        role: profile?.role,
        full_name: user.user_metadata?.full_name,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function me(req, res) {
  try {
    const token =
      req.cookies["sb-access-token"] ||
      (req.headers.authorization || "").replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error) return res.status(401).json({ error: "Invalid token" });

    const user = data.user;
    const { data: profile } = await sbAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return res.json({ user, profile });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function logout(req, res) {
  try {
    res
      .clearCookie("sb-access-token", { path: "/" })
      .clearCookie("sb-refresh-token", { path: "/" });

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
