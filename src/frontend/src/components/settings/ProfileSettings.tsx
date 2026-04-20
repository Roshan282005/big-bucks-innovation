import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";
import { Save, UserCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface FormErrors {
  displayName?: string;
  email?: string;
}

export function ProfileSettings() {
  const { principal } = useAuthStore();

  const [displayName, setDisplayName] = useState("Admin User");
  const [email, setEmail] = useState("admin@bigbucksinnovation.com");
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const shortPrincipal = principal
    ? `${principal.slice(0, 14)}...${principal.slice(-8)}`
    : "Anonymous";

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!displayName.trim()) next.displayName = "Display name is required.";
    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    toast.success("Profile updated successfully.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Avatar + role row */}
      <div className="flex items-center gap-4 p-5 bg-muted/30 border border-border rounded-xl">
        <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shrink-0">
          <UserCircle className="w-8 h-8 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground truncate">
            {displayName || "Unnamed User"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate">
            {shortPrincipal}
          </p>
        </div>
        <Badge
          variant="secondary"
          className="ml-auto shrink-0 bg-primary/10 text-primary border-primary/20"
          data-ocid="profile.role_badge"
        >
          Admin
        </Badge>
      </div>

      {/* Form fields */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label
            htmlFor="displayName"
            className="text-sm font-medium text-foreground"
          >
            Display Name
          </Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              if (errors.displayName)
                setErrors((prev) => ({ ...prev, displayName: undefined }));
            }}
            onBlur={validate}
            placeholder="Your full name"
            className="bg-background border-border"
            data-ocid="profile.display_name_input"
          />
          {errors.displayName && (
            <p
              className="text-xs text-destructive mt-1"
              data-ocid="profile.display_name_field_error"
            >
              {errors.displayName}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            onBlur={validate}
            placeholder="you@company.com"
            className="bg-background border-border"
            data-ocid="profile.email_input"
          />
          {errors.email && (
            <p
              className="text-xs text-destructive mt-1"
              data-ocid="profile.email_field_error"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">Role</Label>
          <div
            className="h-9 px-3 flex items-center rounded-md border border-border bg-muted/50 text-muted-foreground text-sm"
            data-ocid="profile.role_input"
          >
            Administrator
          </div>
          <p className="text-xs text-muted-foreground">
            Role is managed by your organization.
          </p>
        </div>
      </div>

      {/* Save action */}
      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-6"
          data-ocid="profile.save_button"
        >
          {saving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
