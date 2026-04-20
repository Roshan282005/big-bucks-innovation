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
import { type ClientPublic, ClientStatus } from "@/hooks/useClients";
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
  status: ClientStatus.Active,
};

interface ClientModalProps {
  open: boolean;
  client: ClientPublic | null;
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
        className="sm:max-w-md bg-card border-border"
        data-ocid="clients.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {isEdit ? "Edit Client" : "Add New Client"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Company Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="company_name"
              className="text-xs text-muted-foreground"
            >
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company_name"
              data-ocid="clients.company_name.input"
              value={form.company_name}
              onChange={(e) => field("company_name", e.target.value)}
              placeholder="e.g. Infosys Limited"
              className="bg-background border-input"
            />
            {errors.company_name && (
              <p
                className="text-xs text-destructive"
                data-ocid="clients.company_name.field_error"
              >
                {errors.company_name}
              </p>
            )}
          </div>

          {/* Contact Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="contact_name"
              className="text-xs text-muted-foreground"
            >
              Contact Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact_name"
              data-ocid="clients.contact_name.input"
              value={form.contact_name}
              onChange={(e) => field("contact_name", e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="bg-background border-input"
            />
            {errors.contact_name && (
              <p
                className="text-xs text-destructive"
                data-ocid="clients.contact_name.field_error"
              >
                {errors.contact_name}
              </p>
            )}
          </div>

          {/* Email + Phone row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs text-muted-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                data-ocid="clients.email.input"
                value={form.email}
                onChange={(e) => field("email", e.target.value)}
                placeholder="rahul@company.in"
                className="bg-background border-input"
              />
              {errors.email && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="clients.email.field_error"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs text-muted-foreground">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                data-ocid="clients.phone.input"
                value={form.phone}
                onChange={(e) => field("phone", e.target.value)}
                placeholder="98XXXXXXXX"
                className="bg-background border-input"
              />
              {errors.phone && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="clients.phone.field_error"
                >
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => field("status", v as ClientStatus)}
            >
              <SelectTrigger
                data-ocid="clients.status.select"
                className="bg-background border-input"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ClientStatus.Active}>Active</SelectItem>
                <SelectItem value={ClientStatus.Inactive}>Inactive</SelectItem>
                <SelectItem value={ClientStatus.Prospect}>Prospect</SelectItem>
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
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="clients.submit_button"
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
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
