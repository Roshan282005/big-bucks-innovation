import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Client, ClientStatus } from "@/types";
import { useEffect, useState } from "react";

interface FormState {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: ClientStatus;
}

const EMPTY_FORM: FormState = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  status: "active",
};

interface ClientModalProps {
  open: boolean;
  client: Client | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: (form: FormState) => void;
}

export function ClientModal({
  open,
  client,
  isSaving,
  onClose,
  onSave,
}: ClientModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  useEffect(() => {
    if (client) {
      setForm({
        company_name: client.company_name,
        contact_name: client.contact_name,
        email: client.email,
        phone: client.phone,
        status: client.status,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [client]);

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.company_name.trim())
      newErrors.company_name = "Company name is required";
    if (!form.contact_name.trim())
      newErrors.contact_name = "Contact name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSave(form);
  }

  function field(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const isEdit = !!client;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="sm:max-w-md bg-white border-border"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "16px",
        }}
        data-ocid="clients.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {isEdit ? "Edit Client" : "Add New Client"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="company_name"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company_name"
              data-ocid="clients.company_name.input"
              value={form.company_name}
              onChange={(e) => field("company_name", e.target.value)}
              placeholder="e.g. Infosys Limited"
              className="bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {errors.company_name && (
              <p
                className="text-xs text-red-500"
                data-ocid="clients.company_name.field_error"
              >
                {errors.company_name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="contact_name"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Contact Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contact_name"
              data-ocid="clients.contact_name.input"
              value={form.contact_name}
              onChange={(e) => field("contact_name", e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {errors.contact_name && (
              <p
                className="text-xs text-red-500"
                data-ocid="clients.contact_name.field_error"
              >
                {errors.contact_name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                data-ocid="clients.email.input"
                value={form.email}
                onChange={(e) => field("email", e.target.value)}
                placeholder="rahul@company.in"
                className="bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.email && (
                <p
                  className="text-xs text-red-500"
                  data-ocid="clients.email.field_error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                data-ocid="clients.phone.input"
                value={form.phone}
                onChange={(e) => field("phone", e.target.value)}
                placeholder="98XXXXXXXX"
                className="bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {errors.phone && (
                <p
                  className="text-xs text-red-500"
                  data-ocid="clients.phone.field_error"
                >
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </Label>
            <Select
              value={form.status}
              onValueChange={(v) => field("status", v as ClientStatus)}
            >
              <SelectTrigger
                data-ocid="clients.status.select"
                className="bg-white border-border"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="clients.cancel_button"
              onClick={onClose}
              disabled={isSaving}
              className="border-border text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="clients.submit_button"
              disabled={isSaving}
              className="bg-primary text-white hover:bg-primary/90"
            >
              {isSaving
                ? isEdit
                  ? "Saving…"
                  : "Creating…"
                : isEdit
                  ? "Save Changes"
                  : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { FormState as ClientFormState };
