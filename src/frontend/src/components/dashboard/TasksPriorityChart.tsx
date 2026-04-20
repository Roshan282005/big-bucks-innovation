import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const priorityData = [
  { name: "High", value: 15, fill: GOLD },
  { name: "Medium", value: 20, fill: BLUE },
  { name: "Low", value: 8, fill: "#E5E7EB" },
];

const total = priorityData.reduce((sum, d) => sum + d.value, 0);

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const pct = Math.round((item.value / total) * 100);
  return (
    <div
      className="bg-white border border-border rounded-lg px-3 py-2 text-xs"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: item.payload.fill }}
        />
        <span className="text-muted-foreground">{item.name}</span>
      </div>
      <p className="font-display font-bold text-foreground text-sm mt-0.5">
        {item.value}{" "}
        <span className="text-muted-foreground font-normal text-xs">
          tasks ({pct}%)
        </span>
      </p>
    </div>
  );
}

export function TasksPriorityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.38, duration: 0.45 }}
      className="h-full"
    >
      <Card
        className="bg-card border-border h-full"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      >
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base text-foreground">
            Tasks by Priority
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {total} total open tasks
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 flex flex-col items-center">
          <div className="relative">
            <ResponsiveContainer width={200} height={180}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {priorityData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display font-bold text-2xl text-primary leading-none">
                {total}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                Tasks
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full space-y-2.5 mt-2">
            {priorityData.map((d) => {
              const pct = Math.round((d.value / total) * 100);
              return (
                <div key={d.name} className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.fill }}
                  />
                  <span className="text-xs text-muted-foreground flex-1">
                    {d.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: d.fill }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground w-6 text-right">
                      {d.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
