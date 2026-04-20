import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";

const funnelStages = [
  { label: "Leads", count: 240, pct: 100, color: "oklch(0.72 0.18 190)" },
  { label: "Contacted", count: 172, pct: 72, color: "oklch(0.65 0.17 190)" },
  { label: "Qualified", count: 89, pct: 37, color: "oklch(0.56 0.16 190)" },
  { label: "Closed Won", count: 41, pct: 17, color: "oklch(0.48 0.14 190)" },
];

export function FunnelChart() {
  return (
    <Card className="bg-card border-border" data-ocid="reports.funnel_chart">
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
              <div
                className="h-7 rounded-md overflow-hidden"
                style={{
                  background: "oklch(0.21 0.02 260)",
                }}
              >
                <motion.div
                  className="h-full rounded-md flex items-center px-3"
                  style={{
                    width: `${stage.pct}%`,
                    background: stage.color,
                    opacity: 0.85,
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
          <span className="text-sm font-semibold text-primary">17.1%</span>
        </div>
      </CardContent>
    </Card>
  );
}
