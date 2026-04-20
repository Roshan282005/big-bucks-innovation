import { DeleteConfirmDialog, LeadModal } from "@/components/crm/LeadModal";
import { LeadsTable, SAMPLE_LEADS } from "@/components/crm/LeadsTable";
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
import {
  type CreateLeadPayload,
  type LeadPublic,
  type UpdateLeadPayload,
  useCreateLead,
  useDeleteLead,
  useLeads,
  useUpdateLead,
} from "@/hooks/useLeads";
import { Filter, Plus, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Helpers ────────────────────────────────────────────────────────────────

type ModalPayload = CreateLeadPayload | (UpdateLeadPayload & { id: bigint });

function isUpdatePayload(
  p: ModalPayload,
): p is UpdateLeadPayload & { id: bigint } {
  return "id" in p;
}

// ── Page ───────────────────────────────────────────────────────────────────

export function LeadsPage() {
  // ── Query / mutations ────────────────────────────────────────────────────
  const { data: backendLeads, isLoading, isError } = useLeads();
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();

  // Use backend data or fall back to sample data for demo
  const leads: LeadPublic[] =
    backendLeads ?? (isError || !isLoading ? SAMPLE_LEADS : []);

  // ── UI state ─────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadPublic | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadPublic | null>(null);

  // ── Counts for summary bar ───────────────────────────────────────────────
  const totalLeads = leads.length;
  const newCount = leads.filter((l) => l.status === "New").length;
  const qualifiedCount = leads.filter((l) => l.status === "Qualified").length;

  // ── Handlers ─────────────────────────────────────────────────────────────
  function openAddModal() {
    setEditingLead(null);
    setModalOpen(true);
  }

  function openEditModal(lead: LeadPublic) {
    setEditingLead(lead);
    setModalOpen(true);
  }

  function openDeleteDialog(lead: LeadPublic) {
    setDeleteTarget(lead);
  }

  async function handleSave(data: ModalPayload) {
    try {
      if (isUpdatePayload(data)) {
        const { id, ...payload } = data;
        await updateMutation.mutateAsync({ id, payload });
        toast.success("Lead updated successfully");
      } else {
        await createMutation.mutateAsync(data);
        toast.success("Lead added successfully");
      }
      setModalOpen(false);
      setEditingLead(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`${deleteTarget.name} deleted`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete lead.");
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  return (
    <DashboardLayout title="Leads">
      <div className="space-y-5">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Lead Pipeline
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and track your sales leads
            </p>
          </div>
          <Button
            data-ocid="leads.add_button"
            onClick={openAddModal}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan h-9"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Lead
          </Button>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            {
              label: "Total Leads",
              value: totalLeads,
              icon: Users,
              color: "text-primary",
            },
            {
              label: "New",
              value: newCount,
              icon: Users,
              color: "text-cyan-400",
            },
            {
              label: "Qualified",
              value: qualifiedCount,
              icon: Users,
              color: "text-green-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <div className={`text-2xl font-display font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search + filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="leads.search_input"
              placeholder="Search by name, email or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border h-9 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              data-ocid="leads.status_filter"
              className="w-40 bg-card border-border h-9 text-sm"
            >
              <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <LeadsTable
            leads={leads}
            isLoading={isLoading}
            searchQuery={search}
            statusFilter={statusFilter}
            onEdit={openEditModal}
            onDelete={openDeleteDialog}
            onAddFirst={openAddModal}
          />
        </motion.div>

        {/* Footer count */}
        {!isLoading && leads.length > 0 && (
          <p className="text-xs text-muted-foreground text-right pr-1">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} total
          </p>
        )}
      </div>

      {/* Edit / Create modal */}
      <LeadModal
        open={modalOpen}
        lead={editingLead}
        onClose={() => {
          setModalOpen(false);
          setEditingLead(null);
        }}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={deleteTarget !== null}
        leadName={deleteTarget?.name ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
