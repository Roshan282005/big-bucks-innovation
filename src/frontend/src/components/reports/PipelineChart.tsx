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

const pipelineData = [
  { status: "New", count: 87 },
  { status: "Contacted", count: 64 },
  { status: "Qualified", count: 41 },
  { status: "Closed", count: 28 },
];

const CYAN = "oklch(0.72 0.18 190)";
const CYAN_DIM = "oklch(0.58 0.15 190)";

const tooltipStyle = {
  background: "oklch(0.17 0.016 255)",
  border: "1px solid oklch(0.26 0.022 260)",
  borderRadius: 8,
  fontSize: 12,
  color: "oklch(0.95 0.01 260)",
};

export function PipelineChart() {
  return (
    <Card className="bg-card border-border" data-ocid="reports.pipeline_chart">
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
              stroke="oklch(0.26 0.022 260)"
              vertical={false}
            />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 260)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 260)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "oklch(0.26 0.022 260)" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
              {pipelineData.map((entry, index) => (
                <Cell
                  key={entry.status}
                  fill={index === 0 ? CYAN : CYAN_DIM}
                  opacity={1 - index * 0.1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
