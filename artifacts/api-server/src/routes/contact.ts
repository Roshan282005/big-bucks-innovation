import { Router, type Request, type Response } from "express";
import { randomUUID } from "crypto";

const router: Router = Router();

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
}

const submissions: ContactSubmission[] = [];

router.post("/contact", (req: Request, res: Response) => {
  const { name, email, phone, company, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }
  const submission: ContactSubmission = {
    id: randomUUID(),
    name,
    email,
    phone,
    company,
    message,
    createdAt: new Date().toISOString(),
  };
  submissions.push(submission);
  res.status(201).json({ ok: true, id: submission.id });
});

export default router;
