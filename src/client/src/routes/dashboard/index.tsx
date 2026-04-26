import { PipelineChart } from "@/components/dashboard/PipelineChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TasksPriorityChart } from "@/components/dashboard/TasksPriorityChart";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuthStore } from "@/store/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "motion/react";

export function DashboardPage() {
  const { userName } = useAuthStore();
  const displayName = userName || "Admin";

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          data-ocid="dashboard.welcome_section"
        >
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Welcome back, <span className="text-primary">{displayName}</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Here's what's happening at Big Bucks Innovation today.
            </p>
          </div>
          <div
            className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </motion.div>

        {/* Stats cards */}
        <StatsCards />

        {/* Quick actions */}
        <QuickActions />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <PipelineChart />
          </div>
          <div className="lg:col-span-2">
            <TasksPriorityChart />
          </div>
        </div>

        {/* Recent activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardPage,
});
