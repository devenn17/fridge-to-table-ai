import jwt from "jsonwebtoken";

/**
 * Verifies the Bearer JWT and attaches the authenticated user's id to
 * req.userId. All pantry/scan/recipe routes trust req.userId instead of
 * whatever userId the client might otherwise try to pass in the body.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = String(payload.id || payload.userId || "");
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
}
