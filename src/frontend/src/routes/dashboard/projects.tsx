import type { UserId } from "@/backend";
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
  ProjectStatus,
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/useProjects";
import type { ProjectPublic } from "@/hooks/useProjects";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ── Sample principal stub ──────────────────────────────────────────────────
function stubPrincipal(text: string): UserId {
  return { toString: () => text } as unknown as UserId;
}

// ── Sample fallback data ───────────────────────────────────────────────────

const SAMPLE_PROJECTS: ProjectPublic[] = [
  {
    id: BigInt(1),
    name: "Ministry AI Dashboard",
    description: "Analytics platform for government data visualization",
    client_id: BigInt(1),
    status: ProjectStatus.InProgress,
    start_date: "2024-01-15",
    end_date: "2024-06-30",
    budget: BigInt(1500000),
    progress: BigInt(65),
    owner_principal: stubPrincipal("bd3sg-teaaa-aaaaa-qaaba-cai"),
    created_at: BigInt(1704844800000000000),
  },
  {
    id: BigInt(2),
    name: "StartupX Cloud Migration",
    description: "Full cloud migration from on-premise to multi-cloud",
    client_id: BigInt(2),
    status: ProjectStatus.Planning,
    start_date: "2024-03-01",
    end_date: "2024-08-31",
    budget: BigInt(800000),
    progress: BigInt(10),
    owner_principal: stubPrincipal("rd6wl-graba-aaaaa-qaada-cai"),
    created_at: BigInt(1706745600000000000),
  },
  {
    id: BigInt(3),
    name: "PSU Bank Cybersecurity",
    description: "End-to-end security implementation and audit",
    client_id: BigInt(3),
    status: ProjectStatus.InProgress,
    start_date: "2023-11-01",
    end_date: "2024-04-30",
    budget: BigInt(2200000),
    progress: BigInt(80),
    owner_principal: stubPrincipal("2vxsx-faaaa-aaaaa-qaabq-cai"),
    created_at: BigInt(1698796800000000000),
  },
  {
    id: BigInt(4),
    name: "EduCorp Learning Platform",
    description: "AI-powered personalized learning system",
    client_id: BigInt(4),
    status: ProjectStatus.OnHold,
    start_date: "2023-09-01",
    end_date: "2024-03-31",
    budget: BigInt(600000),
    progress: BigInt(40),
    owner_principal: stubPrincipal("aaaaa-aa"),
    created_at: BigInt(1693526400000000000),
  },
  {
    id: BigInt(5),
    name: "HealthTech Networking",
    description: "Hospital network infrastructure overhaul",
    client_id: BigInt(5),
    status: ProjectStatus.Completed,
    start_date: "2023-06-01",
    end_date: "2023-12-31",
    budget: BigInt(1100000),
    progress: BigInt(100),
    owner_principal: stubPrincipal("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    created_at: BigInt(1685577600000000000),
  },
];

// ── Page ──────────────────────────────────────────────────────────────────

export function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<ProjectPublic | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectPublic | null>(null);

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
      const matchSearch = p.name.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  // ── Open/close modal ────────────────────────────────────────────────

  function openCreate() {
    setEditProject(null);
    setModalOpen(true);
  }

  function openEdit(project: ProjectPublic) {
    setEditProject(project);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditProject(null);
  }

  // ── Save handler ────────────────────────────────────────────────────

  async function handleSave(data: ProjectFormData) {
    const payload = {
      name: data.name,
      description: data.description,
      status: data.status,
      start_date: data.startDate,
      end_date: data.endDate,
      budget: BigInt(Math.round(Number(data.budget) || 0)),
      progress: BigInt(data.progress),
      client_id: BigInt(1),
      owner_principal: stubPrincipal(data.owner || "aaaaa-aa"),
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

  // ── Delete handler ──────────────────────────────────────────────────

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteProject.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
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
              <SelectItem
                data-ocid="projects.status_filter.planning"
                value={ProjectStatus.Planning}
              >
                Planning
              </SelectItem>
              <SelectItem
                data-ocid="projects.status_filter.inprogress"
                value={ProjectStatus.InProgress}
              >
                In Progress
              </SelectItem>
              <SelectItem
                data-ocid="projects.status_filter.onhold"
                value={ProjectStatus.OnHold}
              >
                On Hold
              </SelectItem>
              <SelectItem
                data-ocid="projects.status_filter.completed"
                value={ProjectStatus.Completed}
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            data-ocid="projects.add_button"
            onClick={openCreate}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { status: ProjectStatus.InProgress, label: "In Progress" },
              { status: ProjectStatus.Planning, label: "Planning" },
              { status: ProjectStatus.OnHold, label: "On Hold" },
              { status: ProjectStatus.Completed, label: "Completed" },
            ] as const
          ).map(({ status, label }) => {
            const count = projects.filter((p) => p.status === status).length;
            return (
              <button
                key={status}
                type="button"
                data-ocid={`projects.quick_filter.${status.toLowerCase()}`}
                onClick={() =>
                  setStatusFilter((prev) => (prev === status ? "all" : status))
                }
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-smooth ${
                  statusFilter === status
                    ? "bg-primary/15 text-primary border-primary/40"
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

      {/* Create / Edit modal */}
      <ProjectModal
        open={modalOpen}
        project={editProject}
        onClose={closeModal}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          data-ocid="projects.delete_dialog"
          className="bg-card border-border"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{deleteTarget?.name}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="projects.delete_cancel_button"
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="projects.delete_confirm_button"
              onClick={confirmDelete}
              disabled={deleteProject.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProject.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
