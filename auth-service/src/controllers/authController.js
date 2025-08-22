import {
  registerEmail,
  loginEmail,
  sendOtp,
  loginOtp,
  getProfile,
  issueTokenForUser,
} from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerEmail({ email, password, role });
    return res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    const code = err.message === "EMAIL_EXISTS" ? 409 : 400;
    return res.status(code).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginEmail({ email, password });
    return res.json({ token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const sendOtpHandler = async (req, res) => {
  try {
    const { phone } = req.body;
    const result = await sendOtp({ phone });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const otpLogin = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const { user, token } = await loginOtp({ phone, otp });
    return res.json({ token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const googleCallbackHandler = (req, res) => {
  const { user, token } = issueTokenForUser(req.user);
  const redirectUrl =
    process.env.OAUTH_SUCCESS_REDIRECT || "http://localhost:3000/oauth/success";
  const url = new URL(redirectUrl);
  url.searchParams.set("token", token);
  url.searchParams.set("email", user.email || "");
  return res.redirect(url.toString());
};
