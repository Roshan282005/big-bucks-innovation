import { Cpu, Globe, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously pushing boundaries through R&D partnerships, IIT Delhi collaboration, and cutting-edge technology development that creates real-world solutions.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/40",
  },
  {
    icon: Globe,
    title: "Technology",
    description:
      "Architected to grow from idea to enterprise scale without re-platforming — built on robust, distributed infrastructure backed by modern software practices.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "group-hover:border-accent/40",
  },
  {
    icon: Cpu,
    title: "Impact",
    description:
      "Every product, service, and partnership is measured by tangible impact: students trained, businesses enabled, energy saved, and communities uplifted.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/40",
  },
];

export function ValueProposition() {
  return (
    <section
      className="py-20 md:py-28 bg-muted/30 border-y border-border"
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Why Big Bucks Innovation
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Three Pillars of Excellence
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every product we build is grounded in these principles, ensuring
            long-term value for our clients, partners, and communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group bg-white border border-border rounded-2xl p-7 ${pillar.border} transition-smooth shadow-subtle hover:shadow-elevated`}
              data-ocid={`value_prop.pillar.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center ${pillar.color} mb-5 group-hover:scale-105 transition-smooth`}
              >
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
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
