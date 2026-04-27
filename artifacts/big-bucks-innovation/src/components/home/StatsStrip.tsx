import { motion } from "motion/react";

const stats = [
  { value: "35+", label: "Completed Projects" },
  { value: "5000+", label: "Students Trained" },
  { value: "15", label: "Active Members" },
  { value: "10+", label: "MOUs & Collaborations" },
];

export function StatsStrip() {
  return (
    <section
      className="bg-white border-y border-border py-10 md:py-14"
      data-ocid="stats.section"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.09 }}
              className="text-center px-4 md:border-r md:border-border last:border-0"
              data-ocid={`stats.item.${i + 1}`}
            >
              <p className="font-display font-bold text-3xl md:text-4xl text-primary leading-none mb-1.5">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground leading-snug font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
