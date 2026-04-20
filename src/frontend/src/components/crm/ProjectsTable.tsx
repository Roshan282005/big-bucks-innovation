import { ProjectStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectPublic } from "@/hooks/useProjects";
import { Edit2, FolderOpen, Trash2 } from "lucide-react";
import { motion } from "motion/react";

// ── Status metadata ────────────────────────────────────────────────────────

const statusMeta: Record<ProjectStatus, { label: string; className: string }> =
  {
    [ProjectStatus.Planning]: {
      label: "Planning",
      className: "bg-primary/15 text-primary border-0",
    },
    [ProjectStatus.InProgress]: {
      label: "In Progress",
      className: "bg-cyan-500/15 text-cyan-400 border-0",
    },
    [ProjectStatus.OnHold]: {
      label: "On Hold",
      className: "bg-accent/15 text-accent border-0",
    },
    [ProjectStatus.Completed]: {
      label: "Completed",
      className: "bg-emerald-500/15 text-emerald-400 border-0",
    },
  };

// ── Progress bar ───────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  const color =
    pct >= 80
      ? "bg-emerald-500"
      : pct >= 50
        ? "bg-primary"
        : pct >= 25
          ? "bg-accent"
          : "bg-muted-foreground";
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────

export function ProjectsTableSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="border-b border-border bg-muted/40 px-4 py-3 flex gap-4">
        {["40%", "12%", "10%", "12%", "12%", "10%", "8%"].map((w) => (
          <Skeleton key={w} className="h-3 rounded" style={{ width: w }} />
        ))}
      </div>
      {["row-a", "row-b", "row-c", "row-d", "row-e"].map((key) => (
        <div
          key={key}
          className="px-4 py-3.5 border-b border-border/60 flex gap-4 items-center"
        >
          <Skeleton className="h-4 rounded" style={{ width: "40%" }} />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 rounded" style={{ width: "10%" }} />
          <Skeleton className="h-3 rounded" style={{ width: "12%" }} />
          <Skeleton className="h-3 rounded" style={{ width: "12%" }} />
          <Skeleton className="h-3 rounded" style={{ width: "12%" }} />
          <Skeleton className="h-3 rounded" style={{ width: "8%" }} />
        </div>
      ))}
    </div>
  );
}

// ── Main table ─────────────────────────────────────────────────────────────

interface ProjectsTableProps {
  projects: ProjectPublic[];
  onEdit: (project: ProjectPublic) => void;
  onDelete: (project: ProjectPublic) => void;
}

export function ProjectsTable({
  projects,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div
        data-ocid="projects.empty_state"
        className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-16 gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
          <FolderOpen className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="font-medium text-foreground">No projects found</p>
        <p className="text-sm text-muted-foreground">
          Create a new project or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Project Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                Client
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                Start Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                End Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                Progress
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                Owner
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-ocid="projects.table">
            {projects.map((project, i) => {
              const meta = statusMeta[project.status];
              const ownerShort = project.owner_principal
                .toString()
                .slice(0, 8)
                .concat("…");
              return (
                <motion.tr
                  key={String(project.id)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="hover:bg-muted/30 transition-smooth group"
                  data-ocid={`projects.item.${i + 1}`}
                >
                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs font-bold">
                          {project.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[180px]">
                          {project.name}
                        </p>
                        {project.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="px-4 py-3 text-foreground/70 text-sm hidden md:table-cell">
                    <span className="truncate max-w-[120px] block">
                      Client #{String(project.client_id)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${meta.className}`}>
                      {meta.label}
                    </Badge>
                  </td>

                  {/* Start Date */}
                  <td className="px-4 py-3 text-xs text-foreground/60 hidden lg:table-cell">
                    {project.start_date || "—"}
                  </td>

                  {/* End Date */}
                  <td className="px-4 py-3 text-xs text-foreground/60 hidden lg:table-cell">
                    {project.end_date || "—"}
                  </td>

                  {/* Progress bar */}
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <ProgressBar value={Number(project.progress)} />
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <span className="text-xs font-mono text-muted-foreground">
                      {ownerShort}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        data-ocid={`projects.edit_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(project)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                        aria-label={`Edit ${project.name}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        data-ocid={`projects.delete_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(project)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-smooth"
                        aria-label={`Delete ${project.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
