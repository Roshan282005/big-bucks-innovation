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
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-[#E5E7EB]">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_12px_rgba(37,99,235,0.4)] transition-all duration-200">
            <span className="text-white font-display font-bold text-xs">B</span>
          </div>
          <div>
            <p className="font-display font-bold text-[#111827] text-xs leading-tight">
              BIG BUCKS
            </p>
            <p className="font-display font-semibold text-primary text-xs leading-tight">
              CRM
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest px-3 pt-2 pb-1">
          Main Menu
        </p>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-[#EFF6FF] text-primary border-l-[3px] border-primary pl-[9px] shadow-[0_1px_4px_rgba(37,99,235,0.08)]"
                  : "text-[#374151] hover:text-primary hover:bg-[#F5F9FF] border-l-[3px] border-transparent pl-[9px]",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  active ? "text-primary" : "text-[#9CA3AF]",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F9FAFB] mb-1">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-xs flex-shrink-0">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#374151] truncate">
              {shortPrincipal}
            </p>
            <p className="text-[10px] text-[#9CA3AF]">Internet Identity</p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="sidebar.logout_button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#E5E7EB] fixed inset-y-0 left-0 z-30 shadow-[1px_0_0_rgba(0,0,0,0.04)]">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose?.()}
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
          />
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden fixed inset-y-0 left-0 w-60 bg-white border-r border-[#E5E7EB] z-40 flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </>
  );
}
