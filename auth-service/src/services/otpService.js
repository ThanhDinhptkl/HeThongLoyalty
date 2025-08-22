// Fake OTP store in-memory (demo). Production: Redis/SMS provider.
const otpStore = new Map(); // phone -> { otp, exp }

export const generateOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const exp = Date.now() + 5 * 60 * 1000; // 5 phút
  otpStore.set(phone, { otp, exp });
  console.log(`📲 OTP for ${phone}: ${otp} (valid 5m)`);
  return otp;
};

export const verifyOTP = (phone, otp) => {
  const entry = otpStore.get(phone);
  if (!entry) return false;
  if (entry.exp < Date.now()) {
    otpStore.delete(phone);
    return false;
  }
  const ok = entry.otp === otp;
  if (ok) otpStore.delete(phone);
  return ok;
};
