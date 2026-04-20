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
  color: string;
  ocid: string;
}

const actions: QuickAction[] = [
  {
    label: "Add Lead",
    icon: UserPlus,
    href: "/dashboard/leads",
    color:
      "text-primary bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/40",
    ocid: "dashboard.quick_add_lead",
  },
  {
    label: "Add Client",
    icon: Building2,
    href: "/dashboard/clients",
    color:
      "text-accent bg-accent/10 hover:bg-accent/20 border-accent/20 hover:border-accent/40",
    ocid: "dashboard.quick_add_client",
  },
  {
    label: "New Project",
    icon: FolderKanban,
    href: "/dashboard/projects",
    color:
      "text-primary bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/40",
    ocid: "dashboard.quick_new_project",
  },
  {
    label: "New Task",
    icon: ListTodo,
    href: "/dashboard/tasks",
    color:
      "text-accent bg-accent/10 hover:bg-accent/20 border-accent/20 hover:border-accent/40",
    ocid: "dashboard.quick_new_task",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="flex flex-wrap gap-2.5"
      data-ocid="dashboard.quick_actions_section"
    >
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground self-center pr-1">
        <Plus className="w-3.5 h-3.5" />
        Quick Actions
      </span>
      {actions.map((action) => (
        <Link key={action.label} to={action.href}>
          <Button
            size="sm"
            variant="outline"
            className={`h-8 text-xs font-medium border transition-smooth gap-1.5 ${action.color}`}
            data-ocid={action.ocid}
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </Button>
        </Link>
      ))}
    </motion.div>
  );
}
