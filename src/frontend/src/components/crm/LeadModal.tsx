import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreateLeadPayload,
  LeadPublic,
  UpdateLeadPayload,
} from "@/hooks/useLeads";
import { LeadStatus } from "@/hooks/useLeads";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: string;
  notes: string;
}

const DEFAULT_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: LeadStatus.New,
  source: "",
  notes: "",
};

interface LeadModalProps {
  open: boolean;
  lead: LeadPublic | null; // null = create mode
  onClose: () => void;
  onSave: (
    data: CreateLeadPayload | (UpdateLeadPayload & { id: bigint }),
  ) => Promise<void>;
  isSaving: boolean;
}

// ── Field component ────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-destructive" data-ocid="leads.field_error">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function LeadModal({
  open,
  lead,
  onClose,
  onSave,
  isSaving,
}: LeadModalProps) {
  const isEdit = lead !== null;
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Populate form when lead changes
  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        status: lead.status,
        source: lead.source,
        notes: lead.notes,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setErrors({});
  }, [lead]);

  // Trap focus on open
  useEffect(() => {
    if (open) setTimeout(() => firstInputRef.current?.focus(), 80);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.company.trim()) errs.company = "Company is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const payload: UpdateLeadPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      status: form.status,
      source: form.source.trim(),
      notes: form.notes.trim(),
    };
    if (isEdit) {
      await onSave({ ...payload, id: lead.id });
    } else {
      await onSave(payload as CreateLeadPayload);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Positioned dialog wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            data-ocid="leads.dialog"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <dialog
              open
              aria-label={isEdit ? "Edit Lead" : "Add Lead"}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-0 m-0 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
                <div>
                  <h2 className="font-display font-semibold text-foreground text-base">
                    {isEdit ? "Edit Lead" : "Add New Lead"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEdit
                      ? `Updating ${lead?.name}`
                      : "Fill in the details to add a new lead"}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="leads.close_button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Field label="Full Name *" error={errors.name}>
                        <Input
                          ref={firstInputRef}
                          data-ocid="leads.name_input"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Rahul Sharma"
                          className="bg-background border-border focus:border-primary"
                        />
                      </Field>
                    </div>
                    <Field label="Email *" error={errors.email}>
                      <Input
                        data-ocid="leads.email_input"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="rahul@company.com"
                        className="bg-background border-border focus:border-primary"
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <Input
                        data-ocid="leads.phone_input"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="98765 43210"
                        className="bg-background border-border focus:border-primary"
                      />
                    </Field>
                    <div className="col-span-2">
                      <Field label="Company *" error={errors.company}>
                        <Input
                          data-ocid="leads.company_input"
                          value={form.company}
                          onChange={(e) => set("company", e.target.value)}
                          placeholder="TechCorp India"
                          className="bg-background border-border focus:border-primary"
                        />
                      </Field>
                    </div>
                    <Field label="Status">
                      <Select
                        value={form.status}
                        onValueChange={(v) => set("status", v as LeadStatus)}
                      >
                        <SelectTrigger
                          data-ocid="leads.status_select"
                          className="bg-background border-border"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(LeadStatus).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Source">
                      <Input
                        data-ocid="leads.source_input"
                        value={form.source}
                        onChange={(e) => set("source", e.target.value)}
                        placeholder="LinkedIn, Referral, Event…"
                        className="bg-background border-border focus:border-primary"
                      />
                    </Field>
                    <div className="col-span-2">
                      <Field label="Notes">
                        <Textarea
                          data-ocid="leads.notes_textarea"
                          value={form.notes}
                          onChange={(e) => set("notes", e.target.value)}
                          placeholder="Any additional context about this lead…"
                          rows={3}
                          className="bg-background border-border focus:border-primary resize-none"
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-border bg-muted/10">
                  <Button
                    type="button"
                    variant="ghost"
                    data-ocid="leads.cancel_button"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    data-ocid="leads.submit_button"
                    disabled={isSaving}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[100px]"
                  >
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Saving…
                      </span>
                    ) : isEdit ? (
                      "Save Changes"
                    ) : (
                      "Add Lead"
                    )}
                  </Button>
                </div>
              </form>
            </dialog>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Delete confirmation dialog ─────────────────────────────────────────────

interface DeleteConfirmProps {
  open: boolean;
  leadName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export function DeleteConfirmDialog({
  open,
  leadName,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            data-ocid="leads.delete_dialog"
          >
            <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-2xl p-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <span className="text-destructive text-lg">⚠</span>
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">
                Delete Lead
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Are you sure you want to delete{" "}
                <strong className="text-foreground">{leadName}</strong>? This
                action cannot be undone.
              </p>
              <div className="flex gap-2.5 justify-end">
                <Button
                  variant="ghost"
                  data-ocid="leads.cancel_button"
                  onClick={onCancel}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  data-ocid="leads.confirm_button"
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="min-w-[90px]"
                >
                  {isDeleting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                      Deleting…
                    </span>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
