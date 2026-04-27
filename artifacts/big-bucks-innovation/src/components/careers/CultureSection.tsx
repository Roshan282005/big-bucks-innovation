import { Coffee, Rocket, Zap } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  {
    icon: Rocket,
    title: "Move Fast, Build Right",
    description:
      "We ship weekly and iterate in public. Bureaucracy is minimal — ownership is maximal. Every team member directly impacts what we build and how fast we grow.",
    stat: "Weekly releases",
    statLabel: "deployment cadence",
    color: "primary",
  },
  {
    icon: Zap,
    title: "High Ownership by Default",
    description:
      "No permission culture. You own your projects end-to-end, from scoping to delivery. Our flat structure means direct access to founders and fast decision loops.",
    stat: "20 members",
    statLabel: "flat org structure",
    color: "accent",
  },
  {
    icon: Coffee,
    title: "Recharge & Reset",
    description:
      "Mandatory 15 days of paid leave, zero-meeting Fridays, and a quarterly off-site retreat. We believe rested minds build better products.",
    stat: "15 days PTO",
    statLabel: "fully paid leave",
    color: "primary",
  },
];

export function CultureSection() {
  return (
    <section
      className="py-20 bg-card border-t border-border"
      data-ocid="careers.culture_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium text-primary uppercase tracking-widest mb-3 block">
            Life at BBI
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Culture
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We're building a company we'd want to work at. Here's what that
            looks like in practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative bg-background border border-border rounded-xl p-6 overflow-hidden hover:border-primary/30 transition-smooth"
              data-ocid={`careers.culture.${i + 1}`}
            >
              {/* Decorative glow */}
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${
                  item.color === "accent" ? "bg-accent/8" : "bg-primary/8"
                }`}
              />

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  item.color === "accent"
                    ? "bg-accent/15 text-accent"
                    : "bg-primary/15 text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>

              <h3 className="font-display font-semibold text-foreground text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="border-t border-border pt-4">
                <div
                  className={`font-display font-bold text-xl ${
                    item.color === "accent" ? "text-accent" : "text-primary"
                  }`}
                >
                  {item.stat}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
