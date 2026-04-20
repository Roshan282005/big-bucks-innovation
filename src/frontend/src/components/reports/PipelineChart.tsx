import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const pipelineData = [
  { status: "New", count: 87 },
  { status: "Contacted", count: 64 },
  { status: "Qualified", count: 41 },
  { status: "Closed", count: 28 },
];

const FILLS = [BLUE, "#3B82F6", GOLD, "#60A5FA"];

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  fontSize: 12,
  color: "#111827",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

export function PipelineChart() {
  return (
    <Card
      className="bg-card border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="reports.pipeline_chart"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-sm text-foreground">
          Pipeline by Status
        </CardTitle>
        <p className="text-xs text-muted-foreground">Lead count per stage</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={pipelineData}
            margin={{ top: 6, right: 8, left: -16, bottom: 0 }}
            barCategoryGap="35%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "rgba(37,99,235,0.04)" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
              {pipelineData.map((entry, index) => (
                <Cell key={entry.status} fill={FILLS[index] ?? BLUE} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
