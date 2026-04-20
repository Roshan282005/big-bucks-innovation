import { Award, LifeBuoy, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Zap,
    title: "Rapid Deployment",
    description:
      "From kickoff to go-live in as little as 2 weeks. Our pre-built modules and agile delivery cut implementation time by 60%.",
    stat: "2 wks",
    statLabel: "Avg. time-to-live",
  },
  {
    icon: Award,
    title: "IIT Delhi Pedigree",
    description:
      "Co-developed with IIT Delhi's innovation lab, our solutions carry academic rigour and cutting-edge research backing.",
    stat: "10+",
    statLabel: "Active MOUs",
  },
  {
    icon: Users,
    title: "Proven at Scale",
    description:
      "5,000+ students trained, 20 active expert members, and government-backed programmes that validate our reach.",
    stat: "5,000+",
    statLabel: "Students trained",
  },
  {
    icon: LifeBuoy,
    title: "Enterprise Support",
    description:
      "Dedicated account managers, 24 × 7 SLA-backed incident response, and proactive health monitoring for all deployments.",
    stat: "24×7",
    statLabel: "SLA support",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="py-20 bg-background relative overflow-hidden"
      data-ocid="why_choose_us.section"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/25 bg-accent/5">
            Why Big Bucks
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Four Reasons Enterprises Choose Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Beyond technology — we bring credibility, speed, and a track record
            of transformations that last.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border hover:border-primary/25 rounded-2xl p-6 transition-smooth text-center"
                data-ocid={`why_choose_us.item.${i + 1}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                </div>

                {/* Stat */}
                <div className="mb-1">
                  <span className="font-display font-bold text-3xl text-gradient-accent">
                    {item.stat}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  {item.statLabel}
                </p>

                {/* Text */}
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
