import { Router, Request, Response } from "express";
import { adminAuth } from "../lib/firebase-admin.js";
import jwt from "jsonwebtoken";

export const authRouter: Router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

/** POST /auth/session — Exchange Firebase ID token for HttpOnly session cookie */
authRouter.post("/session", async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({ error: "idToken is required" });
      return;
    }

    // Verify the Firebase ID token
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Create our own JWT for session management
    const sessionToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email, role: "user" },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Set HttpOnly cookie — not accessible from JavaScript
    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });

    res.json({ uid: decoded.uid, email: decoded.email });
  } catch (err) {
    console.error("Session creation failed:", err);
    res.status(401).json({ error: "Invalid Firebase token" });
  }
});

/** POST /auth/logout — Clear session cookie */
authRouter.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ ok: true });
});

/** GET /auth/me — Get current session user */
authRouter.get("/me", (req: Request, res: Response) => {
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
