import { TaskModal } from "@/components/crm/TaskModal";
import { TasksTable } from "@/components/crm/TasksTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { ClipboardList, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ── Sample data ──────────────────────────────────────────────
const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Prepare Q1 Presentation for Ministry of IT",
    description: "Quarterly review deck with KPIs and progress",
    projectId: "Gov Cloud Portal",
    assigneeId: "Arjun Kapoor",
    status: "ToDo",
    priority: "High",
    dueDate: "2026-04-10",
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    title: "Security audit report review – PSU Bank",
    description: "Identify critical findings and remediation plan",
    projectId: "PSU Bank Security",
    assigneeId: "Priya Nair",
    status: "InProgress",
    priority: "High",
    dueDate: "2026-04-08",
    createdAt: "2026-03-22",
  },
  {
    id: "3",
    title: "Follow up with StartupX on cloud migration demo",
    description: "Schedule call and share proposal",
    projectId: "StartupX Cloud",
    assigneeId: "Rahul Mehta",
    status: "ToDo",
    priority: "Medium",
    dueDate: "2026-04-22",
    createdAt: "2026-03-25",
  },
  {
    id: "4",
    title: "Update CRM with 50 new leads from Delhi Summit",
    description: "Import CSV and tag by category",
    projectId: "CRM Operations",
    assigneeId: "Sunita Reddy",
    status: "Done",
    priority: "Low",
    dueDate: "2026-04-05",
    createdAt: "2026-03-28",
  },
  {
    id: "5",
    title: "AI dashboard wireframes for Ministry",
    description: "Figma mockups for data visualization module",
    projectId: "Gov Cloud Portal",
    assigneeId: "Priya Nair",
    status: "InProgress",
    priority: "Medium",
    dueDate: "2026-04-25",
    createdAt: "2026-03-29",
  },
  {
    id: "6",
    title: "Deploy staging environment for PSU Bank",
    description: "Provision AWS infra and run smoke tests",
    projectId: "PSU Bank Security",
    assigneeId: "Arjun Kapoor",
    status: "ToDo",
    priority: "High",
    dueDate: "2026-04-02",
    createdAt: "2026-04-01",
  },
  {
    id: "7",
    title: "Draft MOU for EduPlus Foundation partnership",
    description: "Legal review + sign-off from COO",
    projectId: "EduPlus Training",
    assigneeId: "Rahul Mehta",
    status: "ToDo",
    priority: "Medium",
    dueDate: "2026-04-30",
    createdAt: "2026-04-02",
  },
];

// ── Helper ────────────────────────────────────────────────────
let nextId = 100;
function generateId() {
  nextId += 1;
  return String(nextId);
}

// ── Page ──────────────────────────────────────────────────────
export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // ── Counts for filter pills ───────────────────────────────
  const counts = useMemo(
    () => ({
      todo: tasks.filter((t) => t.status === "ToDo").length,
      inProgress: tasks.filter((t) => t.status === "InProgress").length,
      done: tasks.filter((t) => t.status === "Done").length,
    }),
    [tasks],
  );

  // ── Filter ────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      tasks.filter((t) => {
        const q = search.toLowerCase();
        const matchSearch = t.title.toLowerCase().includes(q);
        const matchStatus = statusFilter === "all" || t.status === statusFilter;
        const matchPriority =
          priorityFilter === "all" || t.priority === priorityFilter;
        return matchSearch && matchStatus && matchPriority;
      }),
    [tasks, search, statusFilter, priorityFilter],
  );

  // ── CRUD handlers ─────────────────────────────────────────
  function handleOpenCreate() {
    setEditingTask(null);
    setModalOpen(true);
  }
  function handleOpenEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSave(
    data: {
      title: string;
      description: string;
      project: string;
      assignedTo: string;
      dueDate: string;
      status: TaskStatus;
      priority: TaskPriority;
    },
    id?: string,
  ) {
    setIsSaving(true);
    setTimeout(() => {
      if (id) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  title: data.title,
                  description: data.description,
                  projectId: data.project,
                  assigneeId: data.assignedTo,
                  dueDate: data.dueDate,
                  status: data.status,
                  priority: data.priority,
                }
              : t,
          ),
        );
        toast.success("Task updated successfully");
      } else {
        const newTask: Task = {
          id: generateId(),
          title: data.title,
          description: data.description,
          projectId: data.project,
          assigneeId: data.assignedTo,
          dueDate: data.dueDate,
          status: data.status,
          priority: data.priority,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setTasks((prev) => [newTask, ...prev]);
        toast.success("Task created successfully");
      }
      setIsSaving(false);
      setModalOpen(false);
    }, 400);
  }

  function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    toast.success("Task deleted");
  }

  function handleMarkComplete(task: Task) {
    const newStatus: TaskStatus = task.status === "Done" ? "ToDo" : "Done";
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
    );
    toast.success(
      newStatus === "Done" ? "Task marked complete" : "Task reopened",
    );
  }

  // ── Stat pills ────────────────────────────────────────────
  const statPills = [
    { label: "To Do", value: counts.todo, color: "text-muted-foreground" },
    { label: "In Progress", value: counts.inProgress, color: "text-primary" },
    { label: "Done", value: counts.done, color: "text-chart-2" },
  ];

  return (
    <DashboardLayout title="Tasks">
      <div className="space-y-5">
        {/* ── Page header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-lg leading-tight">
                Task Management
              </h2>
              <p className="text-xs text-muted-foreground">
                {tasks.length} total tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {statPills.map((p) => (
              <div
                key={p.label}
                className="hidden sm:flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-1.5"
              >
                <span className={`text-lg font-bold font-display ${p.color}`}>
                  {p.value}
                </span>
                <span className="text-xs text-muted-foreground">{p.label}</span>
              </div>
            ))}
            <Button
              data-ocid="tasks.add_button"
              onClick={handleOpenCreate}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
            >
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>
        </motion.div>

        {/* ── Filters ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="relative flex-1 min-w-44">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="tasks.search_input"
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              data-ocid="tasks.status_filter.select"
              className="w-36 bg-card border-border"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-ocid="tasks.status_filter.all">
                All Status
              </SelectItem>
              <SelectItem value="ToDo" data-ocid="tasks.status_filter.todo">
                To Do
              </SelectItem>
              <SelectItem
                value="InProgress"
                data-ocid="tasks.status_filter.inprogress"
              >
                In Progress
              </SelectItem>
              <SelectItem value="Done" data-ocid="tasks.status_filter.done">
                Done
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger
              data-ocid="tasks.priority_filter.select"
              className="w-36 bg-card border-border"
            >
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-ocid="tasks.priority_filter.all">
                All Priority
              </SelectItem>
              <SelectItem value="High" data-ocid="tasks.priority_filter.high">
                High
              </SelectItem>
              <SelectItem
                value="Medium"
                data-ocid="tasks.priority_filter.medium"
              >
                Medium
              </SelectItem>
              <SelectItem value="Low" data-ocid="tasks.priority_filter.low">
                Low
              </SelectItem>
            </SelectContent>
          </Select>
          {(search || statusFilter !== "all" || priorityFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              data-ocid="tasks.clear_filters_button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              Clear filters
            </Button>
          )}
        </motion.div>

        {/* ── Table ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          data-ocid="tasks.list"
        >
          <TasksTable
            tasks={filtered}
            isLoading={false}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onMarkComplete={handleMarkComplete}
          />
        </motion.div>
      </div>

      {/* ── Modal ────────────────────────────────────────────── */}
      <TaskModal
        open={modalOpen}
        task={editingTask}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </DashboardLayout>
  );
}
