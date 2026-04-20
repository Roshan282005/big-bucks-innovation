import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FunnelChart } from "@/components/reports/FunnelChart";
import { PipelineChart } from "@/components/reports/PipelineChart";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { TaskCompletionChart } from "@/components/reports/TaskCompletionChart";
import { TeamPerformanceTable } from "@/components/reports/TeamPerformanceTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type DateRange = "7d" | "30d" | "90d" | "custom";

const DATE_RANGES: { label: string; value: DateRange }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Custom", value: "custom" },
];

const summaryStats = [
  {
    label: "Total Leads",
    value: "240",
    delta: "+12%",
    positive: true,
    icon: Users,
    color: "oklch(0.72 0.18 190)",
    bg: "oklch(0.72 0.18 190 / 0.1)",
  },
  {
    label: "Conversion Rate",
    value: "17.1%",
    delta: "+2.4pp",
    positive: true,
    icon: TrendingUp,
    color: "oklch(0.72 0.18 190)",
    bg: "oklch(0.72 0.18 190 / 0.1)",
  },
  {
    label: "Active Clients",
    value: "63",
    delta: "+5",
    positive: true,
    icon: Activity,
    color: "oklch(0.78 0.17 70)",
    bg: "oklch(0.78 0.17 70 / 0.1)",
  },
  {
    label: "Revenue Pipeline",
    value: "₹38.9L",
    delta: "+23%",
    positive: true,
    icon: BarChart3,
    color: "oklch(0.78 0.17 70)",
    bg: "oklch(0.78 0.17 70 / 0.1)",
  },
];

export function ReportsPage() {
  const [activeRange, setActiveRange] = useState<DateRange>("30d");

  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Reports &amp; Analytics
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Performance metrics for BIG BUCKS INNOVATION
            </p>
          </div>

          {/* Date range picker */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg border border-border bg-card"
            data-ocid="reports.date_range_picker"
          >
            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground ml-1.5 flex-shrink-0" />
            {DATE_RANGES.map((r) => (
              <Button
                key={r.value}
                size="sm"
                variant={activeRange === r.value ? "default" : "ghost"}
                className="h-6 text-[11px] px-2.5"
                onClick={() => setActiveRange(r.value)}
                data-ocid={`reports.date_range.${r.value}`}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {summaryStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              data-ocid={`reports.stat.${i + 1}`}
            >
              <Card className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: stat.bg }}
                    >
                      <stat.icon
                        className="w-4 h-4"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 border-border text-muted-foreground"
                    >
                      <ArrowUpRight className="w-2.5 h-2.5 mr-0.5 text-primary" />
                      {stat.delta}
                    </Badge>
                  </div>
                  <p
                    className="font-display font-bold text-2xl"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Top charts row: Pipeline + Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PipelineChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <FunnelChart />
          </motion.div>
        </div>

        {/* Revenue + Task Completion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
          >
            <RevenueChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
          >
            <TaskCompletionChart />
          </motion.div>
        </div>

        {/* Team performance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TeamPerformanceTable />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
