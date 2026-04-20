import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { useEffect, useState } from "react";

interface TaskFormState {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const defaultForm: TaskFormState = {
  title: "",
  description: "",
  project: "",
  assignedTo: "",
  dueDate: "",
  status: "ToDo",
  priority: "Medium",
};

interface TaskModalProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (data: TaskFormState, id?: string) => void;
  isSaving?: boolean;
}

export function TaskModal({
  open,
  task,
  onClose,
  onSave,
  isSaving,
}: TaskModalProps) {
  const [form, setForm] = useState<TaskFormState>(defaultForm);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        project: task.projectId,
        assignedTo: task.assigneeId,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
      });
    } else {
      setForm(defaultForm);
    }
  }, [task]);

  const set = (key: keyof TaskFormState) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form, task?.id);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border max-w-lg"
        data-ocid="tasks.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {task ? "Edit Task" : "New Task"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-foreground/80 text-xs">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task-title"
              data-ocid="tasks.modal.title_input"
              placeholder="e.g. Prepare Q2 audit report"
              value={form.title}
              onChange={(e) => set("title")(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="task-desc" className="text-foreground/80 text-xs">
              Description
            </Label>
            <Textarea
              id="task-desc"
              data-ocid="tasks.modal.description_input"
              placeholder="Optional details..."
              value={form.description}
              onChange={(e) => set("description")(e.target.value)}
              rows={3}
              className="bg-background border-border resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="task-project"
                className="text-foreground/80 text-xs"
              >
                Project
              </Label>
              <Input
                id="task-project"
                data-ocid="tasks.modal.project_input"
                placeholder="Project name"
                value={form.project}
                onChange={(e) => set("project")(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="task-assignee"
                className="text-foreground/80 text-xs"
              >
                Assigned To
              </Label>
              <Input
                id="task-assignee"
                data-ocid="tasks.modal.assignedto_input"
                placeholder="Team member name"
                value={form.assignedTo}
                onChange={(e) => set("assignedTo")(e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="task-due" className="text-foreground/80 text-xs">
                Due Date
              </Label>
              <Input
                id="task-due"
                type="date"
                data-ocid="tasks.modal.duedate_input"
                value={form.dueDate}
                onChange={(e) => set("dueDate")(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground/80 text-xs">Status</Label>
              <Select value={form.status} onValueChange={set("status")}>
                <SelectTrigger
                  data-ocid="tasks.modal.status_select"
                  className="bg-background border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ToDo">To Do</SelectItem>
                  <SelectItem value="InProgress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground/80 text-xs">Priority</Label>
              <Select value={form.priority} onValueChange={set("priority")}>
                <SelectTrigger
                  data-ocid="tasks.modal.priority_select"
                  className="bg-background border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="tasks.modal.cancel_button"
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || !form.title.trim()}
              data-ocid="tasks.modal.submit_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? "Saving…" : task ? "Save Changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
