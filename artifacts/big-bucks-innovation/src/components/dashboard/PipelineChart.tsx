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

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const pipelineData = [
  { status: "New", count: 42, fill: BLUE },
  { status: "Contacted", count: 31, fill: "#3B82F6" },
  { status: "Qualified", count: 28, fill: GOLD },
  { status: "Proposal", count: 18, fill: "#F59E0B99" },
  { status: "Closed", count: 14, fill: "#60A5FA" },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-white border border-border rounded-lg px-3 py-2 text-xs"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
    >
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
      <Card
        className="bg-card border-border h-full"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
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
                stroke="#E5E7EB"
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="status"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(37,99,235,0.04)" }}
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
