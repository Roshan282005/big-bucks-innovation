import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router: Router = Router();

router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn(
    "[auth] WARNING: JWT_SECRET is not set. Auth endpoints are disabled until the secret is configured.",
  );
}

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function requireSecret(res: Response): boolean {
  if (!JWT_SECRET) {
    res
      .status(503)
      .json({ error: "Authentication is not configured. JWT_SECRET is missing." });
    return false;
  }
  return true;
}

/** POST /api/auth/session — Exchange Firebase ID token for HttpOnly session cookie */
router.post("/session", async (req: Request, res: Response) => {
  if (!requireSecret(res)) return;

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
      JWT_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({ uid: decoded.uid, email: decoded.email });
  } catch {
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
  if (!requireSecret(res)) return;

  const token = req.cookies?.session;
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET!);
    res.json(user);
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
});

export default router;
