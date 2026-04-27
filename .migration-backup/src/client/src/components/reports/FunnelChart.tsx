import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";

const BLUE = "#2563EB";
const GOLD = "#F59E0B";

const funnelStages = [
  { label: "Leads", count: 240, pct: 100, color: BLUE },
  { label: "Contacted", count: 172, pct: 72, color: "#3B82F6" },
  { label: "Qualified", count: 89, pct: 37, color: GOLD },
  { label: "Closed Won", count: 41, pct: 17, color: "#F59E0B99" },
];

export function FunnelChart() {
  return (
    <Card
      className="bg-card border-border"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
      data-ocid="reports.funnel_chart"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-sm text-foreground">
          Lead Conversion Funnel
        </CardTitle>
        <p className="text-xs text-muted-foreground">Stage drop-off analysis</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 pt-2">
          {funnelStages.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative"
              data-ocid={`reports.funnel_stage.${i + 1}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  {stage.label}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {stage.count} &nbsp;·&nbsp;
                  <span
                    className="font-semibold"
                    style={{ color: stage.color }}
                  >
                    {stage.pct}%
                  </span>
                </span>
              </div>
              <div className="h-7 rounded-md overflow-hidden bg-muted">
                <motion.div
                  className="h-full rounded-md flex items-center px-3"
                  style={{
                    width: `${stage.pct}%`,
                    background: stage.color,
                    opacity: 0.9,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.pct}%` }}
                  transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                >
                  {stage.pct > 20 && (
                    <span className="text-[10px] font-semibold text-white truncate">
                      {stage.label}
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Overall conversion
          </span>
          <span className="text-sm font-bold text-primary">17.1%</span>
        </div>
      </CardContent>
    </Card>
  );
}
