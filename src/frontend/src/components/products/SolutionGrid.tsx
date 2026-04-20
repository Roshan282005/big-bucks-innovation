import {
  BarChart3,
  CloudUpload,
  GraduationCap,
  Lock,
  Server,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accent: string;
  iconBg: string;
}

const solutions: Solution[] = [
  {
    id: "smart-campus",
    icon: GraduationCap,
    title: "Smart Campus",
    description:
      "Unified IoT and networking infrastructure enabling digital learning environments with real-time monitoring.",
    tag: "Education",
    accent: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "digital-security",
    icon: Lock,
    title: "Digital Security",
    description:
      "End-to-end encryption, threat hunting, and compliance frameworks protecting your critical data assets.",
    tag: "Security",
    accent: "text-chart-2",
    iconBg: "bg-chart-2/10",
  },
  {
    id: "ai-analytics",
    icon: BarChart3,
    title: "AI-Powered Analytics",
    description:
      "Turn raw enterprise data into predictive insights with embedded machine learning pipelines.",
    tag: "AI & Data",
    accent: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    id: "cloud-migration",
    icon: CloudUpload,
    title: "Cloud Migration",
    description:
      "Lift-and-shift or re-architect strategies with zero downtime cutover and full rollback plans.",
    tag: "Cloud",
    accent: "text-chart-3",
    iconBg: "bg-chart-3/10",
  },
  {
    id: "hybrid-infra",
    icon: Server,
    title: "Hybrid Infrastructure",
    description:
      "Bridge on-premise workloads with public cloud seamlessly, optimising for cost and resilience.",
    tag: "Infrastructure",
    accent: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "business-intelligence",
    icon: TrendingUp,
    title: "Business Intelligence",
    description:
      "Executive dashboards, KPI tracking, and automated reporting that drive decisions at every level.",
    tag: "Analytics",
    accent: "text-accent",
    iconBg: "bg-accent/10",
  },
];

export function SolutionGrid() {
  return (
    <section className="py-20 bg-muted/20" data-ocid="solutions.section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/25 bg-primary/5">
            Solutions
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Industry-Specific Use Cases
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Pre-built solution accelerators designed for rapid deployment across
            verticals—from education to enterprise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group bg-card border border-border hover:border-primary/25 rounded-xl p-6 transition-smooth cursor-default"
                data-ocid={`solutions.${sol.id}_card`}
              >
                <div
                  className={`w-11 h-11 rounded-lg ${sol.iconBg} flex items-center justify-center mb-4`}
                >
                  <Icon
                    className={`w-5 h-5 ${sol.accent}`}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-base text-foreground">
                    {sol.title}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${sol.accent} opacity-70`}
                  >
                    {sol.tag}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sol.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
