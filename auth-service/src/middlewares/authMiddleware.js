import { verifyJwt } from "../utils/jwt.js";

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "NO_TOKEN" });

  try {
    const payload = verifyJwt(token);
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
};

export const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "NO_USER" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "FORBIDDEN" });
    return next();
  };
};
