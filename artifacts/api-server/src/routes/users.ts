import { Router, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { requireAuth } from "../middleware/requireAuth.js";

const router: Router = Router();
router.use(cookieParser());

router.get("/users/me", requireAuth, (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ id: user.uid, email: user.email, role: user.role ?? "member" });
});

export default router;
