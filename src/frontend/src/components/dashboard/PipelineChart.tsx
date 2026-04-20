import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
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
  { status: "New", count: 42, fill: "oklch(0.72 0.18 190)" },
  { status: "Contacted", count: 31, fill: "oklch(0.65 0.16 200)" },
  { status: "Qualified", count: 28, fill: "oklch(0.58 0.14 210)" },
  { status: "Proposal", count: 18, fill: "oklch(0.72 0.17 70)" },
  { status: "Closed", count: 14, fill: "oklch(0.55 0.12 220)" },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-display font-bold text-foreground text-sm">
        {payload[0].value}{" "}
        <span className="text-muted-foreground font-normal">leads</span>
      </p>
    </div>
  );
}

export function PipelineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
    >
      <Card className="bg-card border-border surface-elevated h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base text-foreground">
              Lead Pipeline
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
              By Status
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Total leads across all pipeline stages
          </p>
        </CardHeader>
        <CardContent className="pt-1 pb-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={pipelineData}
              barSize={36}
              margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="oklch(0.26 0.022 260 / 0.5)"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="status"
                tick={{ fill: "oklch(0.55 0.015 260)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.55 0.015 260)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "oklch(0.72 0.18 190 / 0.06)" }}
              />
              <Bar dataKey="count" radius={[5, 5, 0, 0]}>
                {pipelineData.map((entry) => (
                  <Cell key={entry.status} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 px-1">
            {pipelineData.map((d) => (
              <div key={d.status} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: d.fill }}
                />
                <span className="text-[11px] text-muted-foreground">
                  {d.status}
                </span>
                <span className="text-[11px] font-medium text-foreground">
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
