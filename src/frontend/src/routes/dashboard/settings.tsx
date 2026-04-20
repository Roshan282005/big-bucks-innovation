import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PreferencesSettings } from "@/components/settings/PreferencesSettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { TeamSettings } from "@/components/settings/TeamSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Sliders, User, Users } from "lucide-react";
import { motion } from "motion/react";

const TABS = [
  { value: "profile", label: "Profile", icon: User },
  { value: "team", label: "Team", icon: Users },
  { value: "preferences", label: "Preferences", icon: Sliders },
] as const;

export function SettingsPage() {
  return (
    <DashboardLayout title="Settings">
      <div className="max-w-3xl space-y-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
          data-ocid="settings.page"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Settings className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Settings
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your profile, team, and workspace preferences.
            </p>
          </div>
        </motion.div>

        {/* Tabbed content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <Tabs defaultValue="profile" data-ocid="settings.tabs">
            <TabsList
              className="w-full sm:w-auto grid grid-cols-3 sm:flex bg-muted/60 border border-border rounded-xl p-1 mb-6 h-auto"
              data-ocid="settings.tab_list"
            >
              {TABS.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth
                    data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm
                    data-[state=active]:border data-[state=active]:border-primary/20
                    text-muted-foreground hover:text-foreground"
                  data-ocid={`settings.${value}_tab`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="profile" data-ocid="settings.profile_panel">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="team" data-ocid="settings.team_panel">
              <TeamSettings />
            </TabsContent>

            <TabsContent
              value="preferences"
              data-ocid="settings.preferences_panel"
            >
              <PreferencesSettings />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
