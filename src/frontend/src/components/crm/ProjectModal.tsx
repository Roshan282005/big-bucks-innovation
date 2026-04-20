import { ProjectStatus } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import type { ProjectPublic } from "@/hooks/useProjects";
import { useEffect, useState } from "react";

interface ProjectFormData {
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: string;
  owner: string;
  progress: number;
}

const defaultForm: ProjectFormData = {
  name: "",
  client: "",
  description: "",
  status: ProjectStatus.Planning,
  startDate: "",
  endDate: "",
  budget: "",
  owner: "",
  progress: 0,
};

interface ProjectModalProps {
  open: boolean;
  project: ProjectPublic | null;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  isSaving: boolean;
}

const inputCls =
  "bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wider";

export function ProjectModal({
  open,
  project,
  onClose,
  onSave,
  isSaving,
}: ProjectModalProps) {
  const [form, setForm] = useState<ProjectFormData>(defaultForm);

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        client: String(project.client_id),
        description: project.description,
        status: project.status,
        startDate: project.start_date,
        endDate: project.end_date,
        budget: String(project.budget),
        owner: project.owner_principal.toString(),
        progress: Number(project.progress),
      });
    } else {
      setForm(defaultForm);
    }
  }, [project]);

  const set =
    (field: keyof ProjectFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="project.dialog"
        className="bg-white border-border max-w-lg max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "16px",
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {project ? "Edit Project" : "New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="proj-name" className={labelCls}>
              Project Name *
            </Label>
            <Input
              id="proj-name"
              data-ocid="project.name_input"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="Ministry AI Dashboard"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="proj-client" className={labelCls}>
                Client
              </Label>
              <Input
                id="proj-client"
                data-ocid="project.client_input"
                value={form.client}
                onChange={set("client")}
                placeholder="Client name"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, status: v as ProjectStatus }))
                }
              >
                <SelectTrigger
                  data-ocid="project.status_select"
                  className="bg-white border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProjectStatus.Planning}>
                    Planning
                  </SelectItem>
                  <SelectItem value={ProjectStatus.InProgress}>
                    In Progress
                  </SelectItem>
                  <SelectItem value={ProjectStatus.OnHold}>On Hold</SelectItem>
                  <SelectItem value={ProjectStatus.Completed}>
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-desc" className={labelCls}>
              Description
            </Label>
            <Textarea
              id="proj-desc"
              data-ocid="project.description_input"
              value={form.description}
              onChange={set("description")}
              placeholder="Project summary..."
              rows={3}
              className="bg-white border-border focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="proj-start" className={labelCls}>
                Start Date
              </Label>
              <Input
                id="proj-start"
                data-ocid="project.start_date_input"
                type="date"
                value={form.startDate}
                onChange={set("startDate")}
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-end" className={labelCls}>
                End Date
              </Label>
              <Input
                id="proj-end"
                data-ocid="project.end_date_input"
                type="date"
                value={form.endDate}
                onChange={set("endDate")}
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="proj-budget" className={labelCls}>
                Budget (₹)
              </Label>
              <Input
                id="proj-budget"
                data-ocid="project.budget_input"
                type="number"
                min="0"
                value={form.budget}
                onChange={set("budget")}
                placeholder="1500000"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="proj-owner" className={labelCls}>
                Owner
              </Label>
              <Input
                id="proj-owner"
                data-ocid="project.owner_input"
                value={form.owner}
                onChange={set("owner")}
                placeholder="Principal or name"
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="proj-progress" className={labelCls}>
                Progress
              </Label>
              <span className="text-xs font-mono font-bold text-primary">
                {form.progress}%
              </span>
            </div>
            <input
              id="proj-progress"
              data-ocid="project.progress_input"
              type="range"
              min="0"
              max="100"
              value={form.progress}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  progress: Number(e.target.value),
                }))
              }
              className="w-full h-2 rounded-full accent-primary cursor-pointer"
            />
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${form.progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2 justify-end">
            <Button
              type="button"
              data-ocid="project.cancel_button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="border-border text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="project.submit_button"
              disabled={isSaving || !form.name.trim()}
              className="bg-primary text-white hover:bg-primary/90 min-w-24"
            >
              {isSaving
                ? "Saving…"
                : project
                  ? "Save Changes"
                  : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type { ProjectFormData };
