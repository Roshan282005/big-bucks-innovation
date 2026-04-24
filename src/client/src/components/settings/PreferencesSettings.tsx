import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/store/theme";
import { Bell, DollarSign, Globe, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationPrefs {
  emailAlerts: boolean;
  pushNotifications: boolean;
  weeklySummary: boolean;
  leadUpdates: boolean;
}

export function PreferencesSettings() {
  const { theme, setTheme } = useThemeStore();

  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("INR");
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    emailAlerts: true,
    pushNotifications: false,
    weeklySummary: true,
    leadUpdates: true,
  });

  const handleThemeChange = (isDark: boolean) => {
    setTheme(isDark ? "dark" : "light");
    toast.success(`Switched to ${isDark ? "dark" : "light"} mode.`);
  };

  const handleNotifChange = (key: keyof NotificationPrefs, value: boolean) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("bbi-notifications", JSON.stringify(next));
      return next;
    });
    toast.success("Notification preference saved.");
  };

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    localStorage.setItem("bbi-language", val);
    toast.success("Language preference saved.");
  };

  const handleCurrencyChange = (val: string) => {
    setCurrency(val);
    localStorage.setItem("bbi-currency", val);
    toast.success("Currency preference saved.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Appearance */}
      <section
        className="bg-card border border-border rounded-xl p-5"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        data-ocid="preferences.appearance_section"
      >
        <div className="flex items-center gap-2.5 mb-4">
          {theme === "dark" ? (
            <Moon className="w-4 h-4 text-primary" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
          <h3 className="font-display font-semibold text-sm text-foreground">
            Appearance
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applies across all dashboard pages — navy/slate background
            </p>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={handleThemeChange}
            data-ocid="preferences.dark_mode_toggle"
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </section>

      {/* Language & Currency */}
      <section
        className="bg-card border border-border rounded-xl p-5"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        data-ocid="preferences.locale_section"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Language & Region
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Label className="text-sm font-medium text-foreground">
                Language
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Interface language
              </p>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="w-36 border-border bg-white"
                data-ocid="preferences.language_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-border/60" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <DollarSign className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="min-w-0">
                <Label className="text-sm font-medium text-foreground">
                  Currency
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Used in reports & invoices
                </p>
              </div>
            </div>
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger
                className="w-36 border-border bg-white"
                data-ocid="preferences.currency_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹ INR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
                <SelectItem value="GBP">£ GBP</SelectItem>
                <SelectItem value="AED">AED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section
        className="bg-card border border-border rounded-xl p-5"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        data-ocid="preferences.notifications_section"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">
            Notifications
          </h3>
        </div>
        <div className="space-y-0">
          {(
            [
              {
                key: "emailAlerts",
                label: "Email Alerts",
                desc: "Receive updates via email",
              },
              {
                key: "pushNotifications",
                label: "Push Notifications",
                desc: "Browser push alerts",
              },
              {
                key: "weeklySummary",
                label: "Weekly Summary",
                desc: "Digest every Monday morning",
              },
              {
                key: "leadUpdates",
                label: "Lead Updates",
                desc: "Notify on new lead activity",
              },
            ] as { key: keyof NotificationPrefs; label: string; desc: string }[]
          ).map((item, i, arr) => (
            <div key={item.key}>
              <div
                className="flex items-center justify-between py-3"
                data-ocid={`preferences.notif_${item.key}_row`}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(v) => handleNotifChange(item.key, v)}
                  data-ocid={`preferences.notif_${item.key}_toggle`}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              {i < arr.length - 1 && <Separator className="bg-border/50" />}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
