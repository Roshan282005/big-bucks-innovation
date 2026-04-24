import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  CheckSquare,
  FolderKanban,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  href:
    | "/dashboard"
    | "/dashboard/leads"
    | "/dashboard/clients"
    | "/dashboard/projects"
    | "/dashboard/tasks";
  sub?: string;
  subIcon?: React.ComponentType<{ className?: string }>;
}

const stats: StatCard[] = [
  {
    label: "Total Leads",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: Users,
    href: "/dashboard/leads",
    sub: "18 new this week",
  },
  {
    label: "Active Clients",
    value: "38",
    change: "+5%",
    trend: "up",
    icon: Building2,
    href: "/dashboard/clients",
    sub: "3 added this month",
  },
  {
    label: "Active Projects",
    value: "16",
    change: "+2",
    trend: "up",
    icon: FolderKanban,
    href: "/dashboard/projects",
    sub: "4 due this week",
  },
  {
    label: "Pending Tasks",
    value: "43",
    change: "7 overdue",
    trend: "down",
    icon: CheckSquare,
    href: "/dashboard/tasks",
    sub: "7 overdue",
    subIcon: AlertTriangle,
  },
];

export function StatsCards() {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      data-ocid="dashboard.stats_section"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          data-ocid={`dashboard.stat.${i + 1}`}
          whileHover={{ y: -2 }}
        >
          <Link to={stat.href}>
            <Card
              className="bg-card border-border transition-smooth cursor-pointer group overflow-hidden relative"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Blue left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />
              <CardContent className="p-4 sm:p-5 pl-5 sm:pl-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <stat.icon className="w-[18px] h-[18px] text-primary" />
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                      stat.trend === "up"
                        ? "bg-emerald-50 text-emerald-600"
                        : stat.trend === "down"
                          ? "bg-red-50 text-red-500"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : stat.trend === "down" ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    {stat.change}
                  </span>
                </div>
                <p className="font-display font-bold text-3xl text-primary leading-none">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs font-medium mt-1.5">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p
                    className={`text-[10px] mt-1.5 flex items-center gap-1 ${
                      stat.trend === "down"
                        ? "text-red-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stat.subIcon && (
                      <stat.subIcon className="w-[10px] h-[10px]" />
                    )}
                    {stat.sub}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
