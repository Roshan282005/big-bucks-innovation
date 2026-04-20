import { motion } from "motion/react";

const stats = [
  { value: "5000+", label: "Students Trained", suffix: "" },
  { value: "20", label: "Active Members", suffix: "" },
  { value: "10+", label: "MOUs Signed", suffix: "" },
  { value: "4+", label: "Years of Innovation", suffix: "" },
  { value: "Govt.", label: "Funded & Recognized", suffix: "" },
];

export function StatsStrip() {
  return (
    <section
      className="bg-card border-y border-border py-10 md:py-12"
      data-ocid="stats.section"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-0 md:grid md:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center px-4 md:border-r md:border-border last:border-0"
              data-ocid={`stats.item.${i + 1}`}
            >
              <p className="font-display font-bold text-3xl md:text-4xl text-gradient-accent leading-none">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
