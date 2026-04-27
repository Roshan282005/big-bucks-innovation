import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router: Router = Router();

router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

/** POST /api/auth/session — Exchange Firebase ID token for HttpOnly session cookie */
router.post("/session", async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ error: "idToken is required" });
      return;
    }

    let decoded: { uid: string; email?: string };

    try {
      const { adminAuth } = await import("../lib/firebase-admin.js");
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      res.status(401).json({ error: "Invalid Firebase token" });
      return;
    }

    const sessionToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({ uid: decoded.uid, email: decoded.email });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/** POST /api/auth/logout — Clear session cookie */
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ ok: true });
});

/** GET /api/auth/me — Get current session user */
router.get("/me", (req: Request, res: Response) => {
  const token = req.cookies?.session;
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json(user);
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
});

export default router;
