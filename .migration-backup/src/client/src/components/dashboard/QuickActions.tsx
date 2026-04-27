import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  FolderKanban,
  ListTodo,
  Plus,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href:
    | "/dashboard/leads"
    | "/dashboard/clients"
    | "/dashboard/projects"
    | "/dashboard/tasks";
  variant: "primary" | "accent";
  ocid: string;
}

const actions: QuickAction[] = [
  {
    label: "New Lead",
    icon: UserPlus,
    href: "/dashboard/leads",
    variant: "primary",
    ocid: "dashboard.quick_add_lead",
  },
  {
    label: "New Client",
    icon: Building2,
    href: "/dashboard/clients",
    variant: "primary",
    ocid: "dashboard.quick_add_client",
  },
  {
    label: "New Project",
    icon: FolderKanban,
    href: "/dashboard/projects",
    variant: "primary",
    ocid: "dashboard.quick_new_project",
  },
  {
    label: "New Task",
    icon: ListTodo,
    href: "/dashboard/tasks",
    variant: "accent",
    ocid: "dashboard.quick_new_task",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="flex flex-wrap gap-2.5 p-4 bg-card rounded-xl border border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="dashboard.quick_actions_section"
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground self-center pr-2">
        <Plus className="w-3.5 h-3.5 text-primary" />
        Quick Add
      </span>
      {actions.map((action) => (
        <Link key={action.label} to={action.href}>
          {action.variant === "primary" ? (
            <Button
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 bg-primary text-white hover:bg-primary/90 transition-smooth"
              data-ocid={action.ocid}
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs font-semibold gap-1.5 border-amber-400 text-amber-600 hover:bg-amber-50 transition-smooth"
              data-ocid={action.ocid}
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </Button>
          )}
        </Link>
      ))}
    </motion.div>
  );
}
