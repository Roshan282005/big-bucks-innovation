import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type ClientPublic, ClientStatus } from "@/hooks/useClients";
import {
  Building2,
  CalendarDays,
  Mail,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";

interface ClientsTableProps {
  clients: ClientPublic[];
  isLoading: boolean;
  onEdit: (client: ClientPublic) => void;
  onDelete: (client: ClientPublic) => void;
}

const STATUS_STYLES: Record<ClientStatus, string> = {
  [ClientStatus.Active]: "bg-primary/10 text-primary border-0",
  [ClientStatus.Inactive]: "bg-muted text-muted-foreground border-0",
  [ClientStatus.Prospect]: "bg-accent/10 text-accent border-0",
};

function formatDate(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const SKELETON_ROWS = ["sk1", "sk2", "sk3", "sk4", "sk5"];

function LoadingSkeleton() {
  return (
    <>
      {SKELETON_ROWS.map((id) => (
        <tr key={id} className="border-b border-border">
          <td className="px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
          </td>
          <td className="px-4 py-3 hidden md:table-cell">
            <Skeleton className="h-3.5 w-32" />
          </td>
          <td className="px-4 py-3 hidden lg:table-cell">
            <Skeleton className="h-3.5 w-24" />
          </td>
          <td className="px-4 py-3 hidden lg:table-cell">
            <Skeleton className="h-3.5 w-20" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-5 w-16 rounded-full" />
          </td>
          <td className="px-4 py-3 hidden xl:table-cell">
            <Skeleton className="h-3.5 w-20" />
          </td>
          <td className="px-4 py-3">
            <div className="flex justify-end gap-1.5">
              <Skeleton className="h-7 w-14" />
              <Skeleton className="h-7 w-14" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export function ClientsTable({
  clients,
  isLoading,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Company
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                Contact
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                Email
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                Phone
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                Created
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-ocid="clients.table">
            {isLoading ? (
              <LoadingSkeleton />
            ) : clients.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-16 text-center"
                  data-ocid="clients.empty_state"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                      No clients found
                    </p>
                    <p className="text-muted-foreground/60 text-xs">
                      Try adjusting your filters or add a new client
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              clients.map((client, i) => (
                <motion.tr
                  key={String(client.id)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-muted/30 transition-smooth"
                  data-ocid={`clients.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs font-semibold">
                          {client.company_name[0]?.toUpperCase() ?? "?"}
                        </span>
                      </div>
                      <span className="font-medium text-foreground truncate max-w-[140px]">
                        {client.company_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground/70 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span>{client.contact_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-foreground/60">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate max-w-[160px]">
                        {client.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-foreground/60">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`text-xs ${STATUS_STYLES[client.status]}`}
                    >
                      {client.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-foreground/50 text-xs hidden xl:table-cell">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      <span>{formatDate(client.created_at)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        data-ocid={`clients.edit_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground hover:bg-muted"
                        onClick={() => onEdit(client)}
                        aria-label={`Edit ${client.company_name}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        data-ocid={`clients.delete_button.${i + 1}`}
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(client)}
                        aria-label={`Delete ${client.company_name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
