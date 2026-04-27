import { Bell, Menu, Search } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content — offset for sidebar on desktop */}
      <div className="flex-1 flex flex-col lg:ml-60 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#E5E7EB] flex items-center px-6 gap-4 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <button
            type="button"
            data-ocid="dashboard.mobile_menu_button"
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-semibold text-[#111827] text-base truncate">
              {title}
            </h1>
            <p className="text-xs text-[#9CA3AF] hidden sm:block">
              Big Bucks Innovation Pvt Ltd
            </p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 h-9 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB] text-[#9CA3AF] text-sm w-52 hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
            <Search className="w-3.5 h-3.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              data-ocid="dashboard.search_input"
              className="flex-1 bg-transparent outline-none text-[#374151] placeholder-[#9CA3AF] text-sm font-body"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              data-ocid="dashboard.notifications_button"
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F59E0B] border-2 border-white" />
            </button>

            {/* User avatar */}
            <div
              data-ocid="dashboard.user_avatar"
              className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-display font-bold text-sm cursor-pointer shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)] transition-all duration-200"
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* Footer strip */}
        <footer className="px-6 py-3 border-t border-[#E5E7EB] bg-white text-xs text-[#9CA3AF] flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} Big Bucks Innovation Pvt Ltd. All
            rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-all duration-200"
          >
            Built with love using caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
