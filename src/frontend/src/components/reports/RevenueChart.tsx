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

const AMBER = "oklch(0.78 0.17 70)";
const AMBER_DIM = "oklch(0.60 0.13 70)";

const tooltipStyle = {
  background: "oklch(0.17 0.016 255)",
  border: "1px solid oklch(0.26 0.022 260)",
  borderRadius: 8,
  fontSize: 12,
  color: "oklch(0.95 0.01 260)",
};

export function RevenueChart() {
  return (
    <Card className="bg-card border-border" data-ocid="reports.revenue_chart">
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
              <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={AMBER} stopOpacity={0.4} />
                <stop offset="95%" stopColor={AMBER} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={AMBER_DIM} stopOpacity={0.2} />
                <stop offset="95%" stopColor={AMBER_DIM} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.26 0.022 260)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 260)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "oklch(0.55 0.015 260)" }}
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
              stroke={AMBER_DIM}
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="url(#forecastGrad)"
              dot={false}
              name="forecast"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke={AMBER}
              strokeWidth={2.5}
              fill="url(#amberGrad)"
              dot={{ r: 4, fill: AMBER, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: AMBER }}
              name="actual"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-6 h-0.5 rounded"
              style={{ background: AMBER }}
            />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-6 h-px rounded border-t border-dashed"
              style={{ borderColor: AMBER_DIM }}
            />
            Forecast
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
