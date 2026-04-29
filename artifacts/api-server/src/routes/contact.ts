import { Router, json, type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "crypto";

const router: Router = Router();

router.use(json());

// ── Types ─────────────────────────────────────────────────────────────────────

interface ContactSubmission {
  id:        string;
  name:      string;
  email:     string;
  phone?:    string;
  company?:  string;
  subject?:  string;
  message:   string;
  createdAt: string;
}

interface ContactBody {
  name?:    unknown;
  email?:   unknown;
  phone?:   unknown;
  company?: unknown;
  subject?: unknown;
  message?: unknown;
}

// ── In-memory store ───────────────────────────────────────────────────────────

const submissions: ContactSubmission[] = [];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Route ─────────────────────────────────────────────────────────────────────

router.post(
  "/contact",
  (req: Request<object, object, ContactBody>, res: Response, next: NextFunction) => {
    try {
      const body: ContactBody =
        req.body && typeof req.body === "object" ? req.body : {};

      const { name, email, phone, company, subject, message } = body;

      const errors: string[] = [];

      if (!isNonEmptyString(name)) {
        errors.push("name is required");
      }

      if (!isNonEmptyString(email)) {
        errors.push("email is required");
      } else if (!EMAIL_RE.test(email)) {
        errors.push("email format invalid");
      }

      if (!isNonEmptyString(message)) {
        errors.push("message is required");
      }

      if (errors.length) {
        res.status(400).json({ ok: false, errors });
        return;
      }

      const submission: ContactSubmission = {
        id:        randomUUID(),
        name:      (name as string).trim(),
        email:     (email as string).trim().toLowerCase(),
        phone:     isNonEmptyString(phone)   ? phone.trim()   : undefined,
        company:   isNonEmptyString(company) ? company.trim() : undefined,
        subject:   isNonEmptyString(subject) ? subject.trim() : undefined,
        message:   (message as string).trim(),
        createdAt: new Date().toISOString(),
      };

      submissions.push(submission);

      console.info(
        `[contact] saved  id=${submission.id}  email=${submission.email}`
      );

      res.status(201).json({ ok: true, id: submission.id });
    } catch (err) {
      next(err);
    }
  }
);

export default router;