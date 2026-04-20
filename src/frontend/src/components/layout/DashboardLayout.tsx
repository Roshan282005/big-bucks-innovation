import { useThemeStore } from "@/store/theme";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { PageTransition } from "./PageTransition";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({
  children,
  title = "Dashboard",
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content — offset for sidebar on desktop */}
      <div className="flex-1 flex flex-col lg:ml-56 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-14 bg-card/90 nav-blur border-b border-border flex items-center px-4 gap-3">
          <button
            type="button"
            data-ocid="dashboard.mobile_menu_button"
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="font-display font-semibold text-foreground text-base flex-1 truncate">
            {title}
          </h1>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-ocid="dashboard.theme_toggle"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              data-ocid="dashboard.notifications_button"
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-border/50 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Big Bucks Innovation Pvt Ltd
        </footer>
      </div>
    </div>
  );
}
