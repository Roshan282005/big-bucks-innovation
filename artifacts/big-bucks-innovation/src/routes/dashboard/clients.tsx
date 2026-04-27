import {
  type ClientFormState,
  ClientModal,
} from "@/components/crm/ClientModal";
import { ClientsTable } from "@/components/crm/ClientsTable";
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
  useClients,
  useCreateClient,
  useDeleteClient,
  useUpdateClient,
} from "@/hooks/useClients";
import type { Client, ClientStatus } from "@/types";
import { Building2, Plus, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

type StatusFilter = "all" | ClientStatus;

export function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);

  const backendStatus = statusFilter === "all" ? null : statusFilter;
  const { data: clients = [], isLoading } = useClients(backendStatus);
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();
  const deleteMutation = useDeleteClient();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.company_name.toLowerCase().includes(q) ||
        c.contact_name.toLowerCase().includes(q),
    );
  }, [clients, search]);

  function openCreate() {
    setEditingClient(null);
    setModalOpen(true);
  }

  function openEdit(client: Client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  function handleSave(form: ClientFormState) {
    if (editingClient) {
      updateMutation.mutate(
        { id: editingClient.id, payload: form },
        { onSuccess: () => setModalOpen(false) },
      );
    } else {
      createMutation.mutate(
        { ...form, created_at: new Date().toISOString() },
        { onSuccess: () => setModalOpen(false) },
      );
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSettled: () => setDeleteTarget(null),
    });
  }

  const totalByStatus = useMemo(() => {
    const counts: Record<string, number> = {
      active: 0,
      inactive: 0,
      prospect: 0,
    };
    for (const c of clients) counts[c.status] = (counts[c.status] ?? 0) + 1;
    return counts;
  }, [clients]);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <DashboardLayout title="Clients">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Clients
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your client relationships
            </p>
          </div>
          <Button
            data-ocid="clients.add_button"
            onClick={openCreate}
            className="bg-primary text-white hover:bg-primary/90 gap-1.5"
            style={{ boxShadow: "0 4px 12px rgba(37,99,235,0.25)" }}
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total Clients",
              value: clients.length,
              icon: Users,
              color: "text-primary",
              bg: "bg-blue-50",
            },
            {
              label: "Active",
              value: totalByStatus.active,
              icon: Building2,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Inactive",
              value: totalByStatus.inactive,
              icon: Users,
              color: "text-muted-foreground",
              bg: "bg-muted",
            },
            {
              label: "Prospect",
              value: totalByStatus.prospect,
              icon: Users,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
            >
              <div
                className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className={`text-lg font-display font-semibold ${stat.color}`}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="clients.search_input"
              placeholder="Search by company or contact…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          >
            <SelectTrigger
              data-ocid="clients.status_filter.select"
              className="w-36 bg-card border-border"
            >
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <ClientsTable
          clients={filtered}
          isLoading={isLoading}
          onEdit={openEdit}
          onDelete={(c: Client) => setDeleteTarget(c)}
        />
      </div>

      <ClientModal
        open={modalOpen}
        client={editingClient}
        isSaving={isSaving}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="bg-white border-border"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            borderRadius: "16px",
          }}
          data-ocid="clients.delete_dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Client
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.company_name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="clients.cancel_button"
              className="border-border text-muted-foreground"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="clients.confirm_button"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete Client"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
