import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  provider: { type: String, default: "local" },
  googleId: { type: String, unique: true, sparse: true },
  role: {
    type: String,
    enum: ["customer", "partner", "admin"],
    default: "customer",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
