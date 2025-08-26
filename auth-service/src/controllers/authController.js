import supabase from "../config/supabaseClient.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "User registered successfully", user: data.user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({
    message: "Login successful",
    session: data.session,
    user: data.user,
  });
};

export const googleLogin = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({
    message: "Redirect to Google Login",
    url: data.url, // URL này FE sẽ redirect user sang
  });
};

// Lấy profile user từ JWT token
export const profile = async (req, res) => {
  const user = req.user; // lấy từ middleware
  res.json({ message: "Profile data", user });
};
