import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { LeadStatus, Lead } from "@/types";
import { Edit2, Trash2, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const STATUS_STYLES: Record<LeadStatus, string> = {
  "New": "bg-blue-50 text-blue-600 border-blue-200",
  "Contacted": "bg-amber-50 text-amber-600 border-amber-200",
  "Qualified": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Closed": "bg-muted text-muted-foreground border-border",
};

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"] as const;

function fmtTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border last:border-0">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

interface LeadPublic extends Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> {
  id: bigint;
  created_at: bigint;
  updated_at: bigint;
}

export const SAMPLE_LEADS: LeadPublic[] = [
  {
    id: BigInt(1),
    name: "Rahul Sharma",
    email: "rahul@techcorp.in",
    phone: "9876543210",
    company: "TechCorp India",
    status: "New",
    source: "LinkedIn",
    notes: "Interested in AI package",
    created_at: BigInt(1709251200000000000),
    updated_at: BigInt(1709251200000000000),
  },
  {
    id: BigInt(2),
    name: "Priya Nair",
    email: "priya@finedge.com",
    phone: "9123456789",
    company: "FinEdge Solutions",
    status: "Contacted",
    source: "Website",
    notes: "Requested cloud demo",
    created_at: BigInt(1709078400000000000),
    updated_at: BigInt(1709164800000000000),
  },
  {
    id: BigInt(3),
    name: "Amit Verma",
    email: "amit@ministry.gov.in",
    phone: "9345678901",
    company: "Ministry of IT",
    status: "Qualified",
    source: "Referral",
    notes: "Government tender interest",
    created_at: BigInt(1708819200000000000),
    updated_at: BigInt(1709078400000000000),
  },
  {
    id: BigInt(4),
    name: "Sunita Reddy",
    email: "sunita@innovatemfg.com",
    phone: "9456789012",
    company: "InnovateMfg Ltd",
    status: "New",
    source: "Event",
    notes: "Met at Delhi Tech Summit",
    created_at: BigInt(1708560000000000000),
    updated_at: BigInt(1708560000000000000),
  },
  {
    id: BigInt(5),
    name: "Karan Mehta",
    email: "karan@eduplus.org",
    phone: "9567890123",
    company: "EduPlus Foundation",
    status: "Closed",
    source: "Cold call",
    notes: "Training contract signed",
    created_at: BigInt(1707350400000000000),
    updated_at: BigInt(1707782400000000000),
  },
];

interface LeadsTableProps {
  leads: LeadPublic[];
  isLoading: boolean;
  searchQuery: string;
  statusFilter: LeadStatus | "all";
  onEdit: (lead: LeadPublic) => void;
  onDelete: (lead: LeadPublic) => void;
  onAddFirst: () => void;
}

export function LeadsTable({
  leads,
  isLoading,
  searchQuery,
  statusFilter,
  onEdit,
  onDelete,
  onAddFirst,
}: LeadsTableProps) {
  const filtered = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-border"
              style={{ backgroundColor: "#F3F4F6" }}
            >
              {(
                [
                  { col: "Name / Email", cls: "" },
                  { col: "Company", cls: "hidden md:table-cell" },
                  { col: "Status", cls: "" },
                  { col: "Source", cls: "hidden lg:table-cell" },
                  { col: "Created", cls: "hidden lg:table-cell" },
                  { col: "Actions", cls: "text-right" },
                ] as const
              ).map(({ col, cls }) => (
                <th
                  key={col}
                  className={`text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${cls}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border" data-ocid="leads.table">
            {isLoading ? (
              SKELETON_KEYS.map((k) => <SkeletonRow key={k} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-16 text-center"
                  data-ocid="leads.empty_state"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">
                      No leads yet
                    </p>
                    <p className="text-muted-foreground text-xs max-w-xs">
                      {searchQuery || statusFilter !== "all"
                        ? "No leads match your current filters."
                        : "Start building your pipeline by adding your first lead."}
                    </p>
                    {!searchQuery && statusFilter === "all" && (
                      <button
                        type="button"
                        data-ocid="leads.empty_state_add_button"
                        onClick={onAddFirst}
                        className="mt-1 text-xs text-primary underline underline-offset-2 hover:text-primary/80 transition-smooth"
                      >
                        Add your first lead →
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              <AnimatePresence initial={false}>
                {filtered.map((lead, i) => (
                  <motion.tr
                    key={lead.id.toString()}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                    className="transition-smooth cursor-pointer"
                    style={{}}
                    onMouseEnter={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.backgroundColor = "#EFF6FF";
                    }}
                    onMouseLeave={(e) => {
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.backgroundColor = "";
                    }}
                    data-ocid={`leads.item.${i + 1}`}
                    onClick={() => onEdit(lead)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-primary text-xs font-bold">
                          {initials(lead.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground/75 hidden md:table-cell max-w-[140px]">
                      <span className="truncate block">{lead.company}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-xs border ${STATUS_STYLES[lead.status] ?? ""}`}
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-foreground/60 text-xs hidden lg:table-cell">
                      {lead.source || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground/60 text-xs hidden lg:table-cell whitespace-nowrap">
                      {fmtTimestamp(lead.created_at)}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`leads.edit_button.${i + 1}`}
                          onClick={() => onEdit(lead)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-blue-50"
                          aria-label="Edit lead"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`leads.delete_button.${i + 1}`}
                          onClick={() => onDelete(lead)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                          aria-label="Delete lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { Lead };
