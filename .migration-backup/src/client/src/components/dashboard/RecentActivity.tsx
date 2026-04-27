import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

interface ActivityItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  time: string;
  highlighted?: boolean;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    icon: Plus,
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    title: "New lead added",
    detail: "Rahul Sharma — TechCorp India",
    time: "2 min ago",
    highlighted: false,
  },
  {
    id: 2,
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    title: "Task completed",
    detail: "Review security audit report",
    time: "18 min ago",
  },
  {
    id: 3,
    icon: UserCheck,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    title: "Lead qualified",
    detail: "Priya Nair — FinEdge Solutions",
    time: "1 hr ago",
    highlighted: true,
  },
  {
    id: 4,
    icon: Building2,
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    title: "Client updated",
    detail: "Profile updated for GovTech Ministry",
    time: "3 hr ago",
  },
  {
    id: 5,
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    title: "New project created",
    detail: "AI Infrastructure Rollout — Phase 2",
    time: "5 hr ago",
    highlighted: true,
  },
  {
    id: 6,
    icon: MessageSquare,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    title: "Note added to lead",
    detail: "Amit Verma — called, demo scheduled",
    time: "Yesterday",
  },
  {
    id: 7,
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-primary",
    title: "Lead converted to client",
    detail: "Sunita Reddy — InnovateMfg Ltd",
    time: "Yesterday",
  },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.46, duration: 0.45 }}
    >
      <Card
        className="bg-card border-border"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-base text-foreground">
              Recent Activity
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest actions across your CRM
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            Live
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div
            className="divide-y divide-border"
            data-ocid="dashboard.activity_feed"
          >
            {activities.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                className={`flex items-start gap-3.5 px-5 py-3.5 transition-smooth ${
                  item.highlighted
                    ? "bg-amber-50/50 hover:bg-amber-50"
                    : "hover:bg-blue-50/30"
                }`}
                data-ocid={`dashboard.activity.${i + 1}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.iconBg}`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p
                    className={`text-xs truncate mt-0.5 ${
                      item.highlighted
                        ? "text-amber-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.detail}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-1 flex-shrink-0">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
