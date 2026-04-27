import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router: Router = Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

interface SessionUser {
  uid: string;
  email?: string;
  role?: string;
}

router.get("/users/me", (req: Request, res: Response) => {
  const token = req.cookies?.session;
  if (!token || !JWT_SECRET) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  try {
    const user = jwt.verify(token, JWT_SECRET) as SessionUser;
    res.json({ id: user.uid, email: user.email, role: user.role ?? "member" });
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
});

export default router;
