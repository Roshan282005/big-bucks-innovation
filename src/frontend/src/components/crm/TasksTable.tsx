import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";

const STATUS_LABEL: Record<TaskStatus, string> = {
  ToDo: "To Do",
  InProgress: "In Progress",
  Done: "Done",
};

const STATUS_CLASS: Record<TaskStatus, string> = {
  ToDo: "bg-muted text-muted-foreground border-0",
  InProgress: "bg-primary/10 text-primary border-0",
  Done: "bg-chart-2/10 text-chart-2 border-0",
};

const PRIORITY_CLASS: Record<TaskPriority, string> = {
  Low: "bg-chart-2/10 text-chart-2 border-0",
  Medium: "bg-accent/10 text-accent border-0",
  High: "bg-destructive/10 text-destructive border-0",
};

interface TasksTableProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkComplete: (task: Task) => void;
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"] as const;

function TaskRowSkeleton() {
  return (
    <tr className="border-b border-border/50">
      {(["c1", "c2", "c3", "c4", "c5", "c6"] as const).map((k) => (
        <td key={k} className="px-4 py-3">
          <Skeleton className="h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

function isOverdue(dueDate: string, status: TaskStatus) {
  if (status === "Done") return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function TasksTable({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onMarkComplete,
}: TasksTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {(
                [
                  "Task",
                  "Project",
                  "Assigned To",
                  "Due Date",
                  "Status",
                  "Priority",
                  "Actions",
                ] as const
              ).map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider${h === "Actions" ? " text-right" : ""}${["Project", "Assigned To"].includes(h) ? " hidden md:table-cell" : ""}${h === "Due Date" ? " hidden lg:table-cell" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50" data-ocid="tasks.table">
            {isLoading ? (
              SKELETON_KEYS.map((k) => <TaskRowSkeleton key={k} />)
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-16 text-center"
                  data-ocid="tasks.empty_state"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      No tasks found
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                      Create your first task to get started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map((task, i) => {
                const overdue = isOverdue(task.dueDate, task.status);
                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`hover:bg-muted/20 transition-smooth${overdue ? " bg-destructive/5" : ""}`}
                    data-ocid={`tasks.item.${i + 1}`}
                  >
                    {/* Task title */}
                    <td className="px-4 py-3 max-w-[260px]">
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          aria-label="Mark complete"
                          data-ocid={`tasks.complete_button.${i + 1}`}
                          onClick={() => onMarkComplete(task)}
                          className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-smooth"
                        >
                          {task.status === "Done" ? (
                            <CheckCircle2 className="w-4 h-4 text-chart-2" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p
                            className={`font-medium truncate${task.status === "Done" ? " line-through text-muted-foreground" : " text-foreground"}`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-xs text-muted-foreground/60 truncate mt-0.5">
                              {task.description}
                            </p>
                          )}
                          {overdue && (
                            <span className="text-[10px] font-semibold text-destructive">
                              OVERDUE
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Project */}
                    <td className="px-4 py-3 text-foreground/70 hidden md:table-cell">
                      <span className="truncate block max-w-[120px]">
                        {task.projectId || "—"}
                      </span>
                    </td>
                    {/* Assigned to */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-[10px] font-bold">
                            {task.assigneeId
                              ? task.assigneeId.charAt(0).toUpperCase()
                              : "?"}
                          </span>
                        </div>
                        <span className="text-foreground/70 text-xs truncate max-w-[100px]">
                          {task.assigneeId || "Unassigned"}
                        </span>
                      </div>
                    </td>
                    {/* Due date */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`text-xs${overdue ? " text-destructive font-semibold" : " text-foreground/60"}`}
                      >
                        {task.dueDate || "—"}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-[10px] px-2 ${STATUS_CLASS[task.status]}`}
                      >
                        {STATUS_LABEL[task.status]}
                      </Badge>
                    </td>
                    {/* Priority */}
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-[10px] px-2 ${PRIORITY_CLASS[task.priority]}`}
                      >
                        {task.priority}
                      </Badge>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          aria-label="Edit task"
                          data-ocid={`tasks.edit_button.${i + 1}`}
                          onClick={() => onEdit(task)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              aria-label="Delete task"
                              data-ocid={`tasks.delete_button.${i + 1}`}
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent
                            className="bg-card border-border"
                            data-ocid="tasks.confirm_dialog"
                          >
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-foreground">
                                Delete Task?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                This will permanently delete "{task.title}".
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                data-ocid="tasks.cancel_button"
                                className="border-border"
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                data-ocid="tasks.confirm_button"
                                onClick={() => onDelete(task.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
