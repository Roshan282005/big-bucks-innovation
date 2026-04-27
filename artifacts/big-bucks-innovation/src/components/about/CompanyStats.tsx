import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  accent?: boolean;
}

const stats: Stat[] = [
  {
    value: 35,
    suffix: "",
    label: "Completed Projects",
    sublabel: "Delivered across enterprise, government & education sectors",
    accent: false,
  },
  {
    value: 5000,
    suffix: "+",
    label: "Total Students Trained",
    sublabel: "In AI, IoT, digital skills & innovation programs",
    accent: true,
  },
  {
    value: 15,
    suffix: "",
    label: "Active Members",
    sublabel: "Expert engineers, mentors, trainers & researchers",
    accent: false,
  },
  {
    value: 10,
    suffix: "+",
    label: "MOU & Collaboration",
    sublabel: "With colleges, government bodies & industry partners",
    accent: true,
  },
];

function AnimatedCounter({
  target,
  suffix,
}: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function CompanyStats() {
  return (
    <section
      className="py-20 bg-muted/30 border-y border-border relative overflow-hidden"
      data-ocid="about.stats_section"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
          >
            By the Numbers
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Impact that speaks{" "}
            <span className="text-gradient-accent">for itself</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="relative bg-white rounded-2xl p-7 text-center border-l-4 overflow-hidden group transition-smooth"
              style={{
                borderLeftColor: s.accent ? "#F59E0B" : "#2563EB",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
              data-ocid={`about.stat_card.${i + 1}`}
            >
              {/* Glow orb */}
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-smooth
                ${s.accent ? "bg-accent" : "bg-primary"}`}
              />

              <div
                className="font-display font-bold text-5xl md:text-6xl mb-3 relative"
                style={{ color: s.accent ? "#F59E0B" : "#2563EB" }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <h3 className="font-display font-semibold text-foreground text-base mb-1.5">
                {s.label}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {s.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Government funded banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 bg-gradient-to-r from-primary/10 via-card to-accent/10 border border-primary/20 rounded-xl py-4 px-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
          data-ocid="about.government_badge"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-display font-semibold text-foreground text-sm">
              Government Funded
            </span>
          </div>
          <span className="hidden sm:block text-muted-foreground">·</span>
          <span className="text-muted-foreground text-sm">
            Officially supported and funded by central government bodies for
            national technology initiatives
          </span>
        </motion.div>
      </div>
    </section>
  );
}
