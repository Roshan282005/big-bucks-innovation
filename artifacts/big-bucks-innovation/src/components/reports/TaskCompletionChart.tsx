import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const taskData = [
  { name: "Done", value: 68, color: BLUE },
  { name: "In Progress", value: 23, color: GOLD },
  { name: "To Do", value: 19, color: "#E5E7EB" },
];

const total = taskData.reduce((s, d) => s + d.value, 0);

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  fontSize: 12,
  color: "#111827",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

export function TaskCompletionChart() {
  return (
    <Card
      className="bg-card border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="reports.task_pie_chart"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-sm text-foreground">
          Task Completion
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Current sprint breakdown
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 relative">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {taskData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value: number, name: string) => [
                    `${value} tasks (${Math.round((value / total) * 100)}%)`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display font-bold text-xl text-primary leading-none">
                {total}
              </span>
              <span className="text-[9px] text-muted-foreground mt-0.5">
                tasks
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {taskData.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
                data-ocid={`reports.task_segment.${i + 1}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs text-muted-foreground truncate">
                    {item.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span className="text-xs font-semibold text-foreground tabular-nums">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-1">
                    ({Math.round((item.value / total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total tasks</span>
              <span className="text-xs font-bold text-foreground">{total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
