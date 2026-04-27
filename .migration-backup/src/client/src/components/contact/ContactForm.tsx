import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/api";
import { sanitize } from "@/lib/sanitize";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  defaultSubject?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm({ defaultSubject }: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: defaultSubject ? `RE: ${defaultSubject}\n\n` : "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultSubject) {
      setForm((f) => ({ ...f, message: `RE: ${defaultSubject}\n\n` }));
    }
  }, [defaultSubject]);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Full name is required.";
    if (!data.email.trim()) errs.email = "Email address is required.";
    else if (!validateEmail(data.email))
      errs.email = "Enter a valid email address.";
    if (!data.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const set =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [key]: value }));
      if (touched[key]) {
        const errs = validate({ ...form, [key]: value });
        setErrors((prev) => ({
          ...prev,
          [key]: errs[key as keyof FormErrors],
        }));
      }
    };

  const handleBlur = (key: keyof FormData) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [key]: errs[key as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched((t) => ({ ...t, ...allTouched }));
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      // Sanitize all inputs before sending
      const sanitizedData = {
        name: sanitize(form.name),
        email: sanitize(form.email),
        phone: sanitize(form.phone),
        company: sanitize(form.company),
        message: sanitize(form.message),
      };

      await apiClient.post("/api/contact", sanitizedData);

      toast.success("Message sent! We'll respond within 24 hours.", {
        duration: 5000,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
      setTouched({});
      setErrors({});
    } catch {
      toast.error(
        "Failed to send message. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-border rounded-2xl p-10 flex flex-col items-center text-center gap-5"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        data-ocid="contact.success_state"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-label="Success checkmark"
          >
            <title>Success checkmark</title>
            <path
              d="M5 13l4 4L19 7"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground text-xl mb-2">
            Message Received
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Thank you for reaching out. Our team will review your inquiry and
            respond within one business day.
          </p>
        </div>
        <Button
          variant="outline"
          data-ocid="contact.send_another_button"
          onClick={() => setSubmitted(false)}
          className="border-primary/30 text-primary hover:bg-primary/5"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-2xl p-7 space-y-5"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="contact.form"
      noValidate
    >
      <div className="pb-2 border-b border-border/60">
        <Badge
          variant="outline"
          className="border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
        >
          Send a Message
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-name"
            className="text-sm font-medium text-foreground"
          >
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            data-ocid="contact.name_input"
            placeholder="Your Name"
            value={form.name}
            onChange={set("name")}
            onBlur={handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`bg-background transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 ${errors.name ? "border-destructive" : "border-input"}`}
          />
          {errors.name && touched.name && (
            <p
              id="name-error"
              className="text-xs text-destructive"
              data-ocid="contact.name.field_error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-email"
            className="text-sm font-medium text-foreground"
          >
            Work Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            data-ocid="contact.email_input"
            placeholder="you@company.com"
            value={form.email}
            onChange={set("email")}
            onBlur={handleBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`bg-background transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 ${errors.email ? "border-destructive" : "border-input"}`}
          />
          {errors.email && touched.email && (
            <p
              id="email-error"
              className="text-xs text-destructive"
              data-ocid="contact.email.field_error"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-phone"
            className="text-sm font-medium text-foreground"
          >
            Phone{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </Label>
          <Input
            id="contact-phone"
            data-ocid="contact.phone_input"
            placeholder="+91 86678 58430"
            value={form.phone}
            onChange={set("phone")}
            className="bg-background border-input transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-company"
            className="text-sm font-medium text-foreground"
          >
            Company{" "}
            <span className="text-muted-foreground font-normal text-xs">
              (optional)
            </span>
          </Label>
          <Input
            id="contact-company"
            data-ocid="contact.company_input"
            placeholder="Acme Corp"
            value={form.company}
            onChange={set("company")}
            className="bg-background border-input transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label
          htmlFor="contact-message"
          className="text-sm font-medium text-foreground"
        >
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          data-ocid="contact.message_textarea"
          placeholder="Tell us about your project, requirements, or questions..."
          value={form.message}
          onChange={set("message")}
          onBlur={handleBlur("message")}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`bg-background resize-none transition-colors duration-200 focus:border-primary focus:ring-1 focus:ring-primary/30 ${errors.message ? "border-destructive" : "border-input"}`}
        />
        {errors.message && touched.message && (
          <p
            id="message-error"
            className="text-xs text-destructive"
            data-ocid="contact.message.field_error"
          >
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        data-ocid="contact.submit_button"
        disabled={submitting}
        className="w-full h-11 font-semibold text-sm text-white"
        style={{
          background: submitting ? "#d97706" : "#F59E0B",
          color: "#111827",
        }}
      >
        {submitting ? (
          <span
            className="flex items-center gap-2"
            data-ocid="contact.loading_state"
          >
            <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Sending Message...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        We typically respond within{" "}
        <span className="text-foreground font-medium">1 business day</span>.
      </p>
    </motion.form>
  );
}
