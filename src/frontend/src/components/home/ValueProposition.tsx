import { Cpu, Globe, Lock, Repeat } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Cpu,
    title: "Innovation",
    description:
      "Continuously pushing boundaries with R&D partnerships, IIT Delhi collaboration, and cutting-edge technology labs.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "Scalability",
    description:
      "Architected to grow from 10 users to 10 million without re-platforming — built on elastic, distributed infrastructure.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Lock,
    title: "Security",
    description:
      "Zero-trust architecture, compliance-ready frameworks, and real-time threat response embedded in every product.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Repeat,
    title: "Reliability",
    description:
      "99.9% uptime SLAs, redundant failover systems, and dedicated 24/7 support engineers on every enterprise contract.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export function ValueProposition() {
  return (
    <section
      className="py-20 md:py-24 bg-muted/30 border-y border-border"
      data-ocid="value_prop.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Why Big Bucks Innovation
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Four Pillars of Excellence
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every product we build is grounded in these principles, ensuring
            long-term value for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-smooth"
              data-ocid={`value_prop.pillar.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center ${pillar.color} mb-5`}
              >
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
