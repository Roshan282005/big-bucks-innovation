import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart2,
  Building2,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Clients", href: "/dashboard/clients", icon: Building2 },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const { principal, logout } = useAuthStore();
  const { clear } = useInternetIdentity();
  const location = useLocation();

  const handleLogout = () => {
    clear();
    logout();
    onClose?.();
  };

  const shortPrincipal = principal
    ? `${principal.slice(0, 6)}...${principal.slice(-4)}`
    : "Anonymous";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5"
          onClick={onClose}
        >
          <div className="w-7 h-7 rounded-md bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-display font-bold text-xs">
              B
            </span>
          </div>
          <span className="font-display font-semibold text-sidebar-foreground text-sm">
            BBI CRM
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            location.pathname === item.href ||
            (item.href !== "/dashboard" &&
              location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href as "/dashboard"}
              onClick={onClose}
              data-ocid={`sidebar.${item.label.toLowerCase()}_link`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                active
                  ? "bg-sidebar-primary/15 text-sidebar-primary border border-sidebar-primary/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs font-medium text-sidebar-foreground truncate">
            {shortPrincipal}
          </p>
          <p className="text-[10px] text-sidebar-foreground/50 mt-0.5">
            Internet Identity
          </p>
        </div>
        <button
          type="button"
          data-ocid="sidebar.logout_button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-smooth"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <motion.aside
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed inset-y-0 left-0 w-56 bg-sidebar border-r border-sidebar-border z-40 flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </>
  );
}
