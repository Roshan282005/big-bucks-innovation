import { ProjectModal } from "@/components/crm/ProjectModal";
import type { ProjectFormData } from "@/components/crm/ProjectModal";
import {
  ProjectsTable,
  ProjectsTableSkeleton,
} from "@/components/crm/ProjectsTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/useProjects";
import type { Project, ProjectStatus } from "@/types";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Ministry AI Dashboard",
    description: "Analytics platform for government data visualization",
    clientId: "1",
    status: "InProgress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 1500000,
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "2",
    title: "StartupX Cloud Migration",
    description: "Full cloud migration from on-premise to multi-cloud",
    clientId: "2",
    status: "Planning",
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    budget: 800000,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "PSU Bank Cybersecurity",
    description: "End-to-end security implementation and audit",
    clientId: "3",
    status: "InProgress",
    startDate: "2023-11-01",
    endDate: "2024-04-30",
    budget: 2200000,
    createdAt: "2023-11-01T00:00:00Z",
  },
  {
    id: "4",
    title: "EduCorp Learning Platform",
    description: "AI-powered personalized learning system",
    clientId: "4",
    status: "OnHold",
    startDate: "2023-09-01",
    endDate: "2024-03-31",
    budget: 600000,
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "5",
    title: "HealthTech Networking",
    description: "Hospital network infrastructure overhaul",
    clientId: "5",
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    budget: 1100000,
    createdAt: "2023-06-01T00:00:00Z",
  },
];

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const backendFilter =
    statusFilter === "all" ? null : (statusFilter as ProjectStatus);

  const { data: backendProjects, isLoading } = useProjects(backendFilter);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const projects = backendProjects ?? SAMPLE_PROJECTS;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  function openCreate() {
    setEditProject(null);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditProject(project);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditProject(null);
  }

  async function handleSave(data: ProjectFormData) {
    const payload = {
      title: data.name,
      description: data.description,
      status: data.status as ProjectStatus,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: Math.round(Number(data.budget) || 0),
      clientId: data.client || "1",
    };

    try {
      if (editProject) {
        await updateProject.mutateAsync({ id: editProject.id, payload });
        toast.success("Project updated successfully");
      } else {
        await createProject.mutateAsync(payload);
        toast.success("Project created successfully");
      }
      closeModal();
    } catch {
      toast.error("Failed to save project. Please try again.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProject.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.title}" deleted`);
    } catch {
      toast.error("Failed to delete project.");
    } finally {
      setDeleteTarget(null);
    }
  }

  const isSaving = createProject.isPending || updateProject.isPending;

  return (
    <DashboardLayout title="Projects">
      <div className="space-y-5">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Projects
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {projects.length} total projects
            </p>
          </div>
          <Button
            data-ocid="projects.add_button"
            onClick={openCreate}
            className="bg-primary text-white hover:bg-primary/90 gap-1.5"
            style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-44">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="projects.search_input"
              placeholder="Search projects…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              data-ocid="projects.status_filter.select"
              className="w-36 bg-card border-border"
            >
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="OnHold">On Hold</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              {
                status: "InProgress" as ProjectStatus,
                label: "In Progress",
                color: "text-primary bg-blue-50 border-blue-200",
              },
              {
                status: "Planning" as ProjectStatus,
                label: "Planning",
                color: "text-blue-400 bg-blue-50/50 border-blue-100",
              },
              {
                status: "OnHold" as ProjectStatus,
                label: "On Hold",
                color: "text-amber-600 bg-amber-50 border-amber-200",
              },
              {
                status: "Completed" as ProjectStatus,
                label: "Completed",
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
            ] as const
          ).map(({ status, label, color }) => {
            const count = projects.filter((p) => p.status === status).length;
            return (
              <button
                key={status}
                type="button"
                data-ocid={`projects.quick_filter.${status.toLowerCase()}`}
                onClick={() =>
                  setStatusFilter((prev) => (prev === status ? "all" : status))
                }
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${
                  statusFilter === status
                    ? color
                    : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                }`}
              >
                {label}
                <span className="ml-1.5 opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        {isLoading ? (
          <ProjectsTableSkeleton />
        ) : (
          <ProjectsTable
            projects={filtered}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <ProjectModal
        open={modalOpen}
        project={editProject}
        onClose={closeModal}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          data-ocid="projects.delete_dialog"
          className="bg-white border-border"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{deleteTarget?.title}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="projects.delete_cancel_button"
              className="border-border text-muted-foreground"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="projects.delete_confirm_button"
              onClick={confirmDelete}
              disabled={deleteProject.isPending}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {deleteProject.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
