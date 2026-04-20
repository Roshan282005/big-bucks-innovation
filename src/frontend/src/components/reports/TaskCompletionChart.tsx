import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const taskData = [
  { name: "Done", value: 68, color: "oklch(0.72 0.18 190)" },
  { name: "In Progress", value: 23, color: "oklch(0.78 0.17 70)" },
  { name: "To Do", value: 19, color: "oklch(0.35 0.025 260)" },
];

const total = taskData.reduce((s, d) => s + d.value, 0);

const tooltipStyle = {
  background: "oklch(0.17 0.016 255)",
  border: "1px solid oklch(0.26 0.022 260)",
  borderRadius: 8,
  fontSize: 12,
  color: "oklch(0.95 0.01 260)",
};

export function TaskCompletionChart() {
  return (
    <Card className="bg-card border-border" data-ocid="reports.task_pie_chart">
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
          <div className="flex-shrink-0">
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
                >
                  {taskData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
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
