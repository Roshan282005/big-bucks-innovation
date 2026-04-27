import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Oct", actual: 18.2, forecast: 20 },
  { month: "Nov", actual: 22.5, forecast: 23 },
  { month: "Dec", actual: 19.8, forecast: 25 },
  { month: "Jan", actual: 28.4, forecast: 28 },
  { month: "Feb", actual: 31.6, forecast: 32 },
  { month: "Mar", actual: 38.9, forecast: 37 },
];

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  fontSize: 12,
  color: "#111827",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

export function RevenueChart() {
  return (
    <Card
      className="bg-card border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="reports.revenue_chart"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-sm text-foreground">
          Revenue Forecast
        </CardTitle>
        <p className="text-xs text-muted-foreground">6-month trend (₹ Lakhs)</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={revenueData}
            margin={{ top: 6, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={BLUE} stopOpacity={0.15} />
                <stop offset="95%" stopColor={BLUE} stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={GOLD} stopOpacity={0.12} />
                <stop offset="95%" stopColor={GOLD} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `₹${v}L`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [
                `₹${value}L`,
                name === "actual" ? "Actual" : "Forecast",
              ]}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke={GOLD}
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="url(#goldGrad)"
              dot={false}
              name="forecast"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke={BLUE}
              strokeWidth={2.5}
              fill="url(#blueGrad)"
              dot={{ r: 4, fill: BLUE, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: BLUE }}
              name="actual"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-6 h-0.5 rounded"
              style={{ background: BLUE }}
            />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-6 h-px rounded border-t border-dashed"
              style={{ borderColor: GOLD }}
            />
            Forecast
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
