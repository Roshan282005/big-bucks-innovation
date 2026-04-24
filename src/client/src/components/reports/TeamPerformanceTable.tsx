import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teamData = [
  {
    name: "Arjun Sharma",
    role: "Business Dev",
    leadsManaged: 42,
    tasksCompleted: 28,
    projectsActive: 4,
    performance: "high",
  },
  {
    name: "Priya Nair",
    role: "Sales Lead",
    leadsManaged: 37,
    tasksCompleted: 31,
    projectsActive: 3,
    performance: "high",
  },
  {
    name: "Rahul Verma",
    role: "Account Mgr",
    leadsManaged: 29,
    tasksCompleted: 22,
    projectsActive: 5,
    performance: "medium",
  },
  {
    name: "Sneha Iyer",
    role: "Tech Sales",
    leadsManaged: 24,
    tasksCompleted: 19,
    projectsActive: 2,
    performance: "medium",
  },
  {
    name: "Karan Mehta",
    role: "Partnerships",
    leadsManaged: 18,
    tasksCompleted: 14,
    projectsActive: 3,
    performance: "low",
  },
];

const perfBadge: Record<string, { label: string; cls: string }> = {
  high: {
    label: "High",
    cls: "bg-blue-50 text-primary border-blue-200",
  },
  medium: {
    label: "Medium",
    cls: "bg-amber-50 text-amber-600 border-amber-200",
  },
  low: {
    label: "Low",
    cls: "bg-muted text-muted-foreground border-border",
  },
};

const avatarColor = [
  "bg-blue-50 text-primary",
  "bg-amber-50 text-amber-600",
  "bg-emerald-50 text-emerald-600",
  "bg-purple-50 text-purple-600",
  "bg-muted text-muted-foreground",
];

export function TeamPerformanceTable() {
  return (
    <Card
      className="bg-card border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="reports.team_performance_table"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-sm text-foreground">
          Team Performance
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Current quarter activity
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow
              className="border-border hover:bg-transparent"
              style={{ backgroundColor: "#F3F4F6" }}
            >
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider pl-6">
                Member
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">
                Leads
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">
                Tasks Done
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">
                Projects
              </TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right pr-6">
                Performance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamData.map((member, i) => {
              const badge = perfBadge[member.performance];
              return (
                <TableRow
                  key={member.name}
                  className="border-border transition-smooth"
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
                  data-ocid={`reports.team_row.${i + 1}`}
                >
                  <TableCell className="pl-6 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${avatarColor[i] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {member.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums text-foreground">
                    {member.leadsManaged}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums text-foreground">
                    {member.tasksCompleted}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold tabular-nums text-foreground">
                    {member.projectsActive}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium border ${badge.cls}`}
                    >
                      {badge.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
