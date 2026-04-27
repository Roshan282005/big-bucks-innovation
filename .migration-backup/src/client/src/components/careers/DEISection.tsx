import { Heart, Scale, Users2 } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Users2,
    title: "Diversity",
    description:
      "We actively recruit from varied backgrounds, geographies, and institutions — not just IITs. Diverse perspectives drive better solutions for complex enterprise problems.",
  },
  {
    icon: Scale,
    title: "Equity",
    description:
      "Equal pay for equal work, transparent compensation bands, and structured processes to eliminate bias in hiring, promotions, and project assignments.",
  },
  {
    icon: Heart,
    title: "Inclusion",
    description:
      "Every team member has a voice in how we build the company. We celebrate differences, support employee resource groups, and create safe spaces for all identities.",
  },
];

export function DEISection() {
  return (
    <section
      className="py-20 bg-background border-t border-border"
      data-ocid="careers.dei_section"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Statement */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-medium text-accent uppercase tracking-widest mb-3 block">
                Our Commitment
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Diversity, Equity
                <br />& Inclusion
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At BIG BUCKS INNOVATION, we believe innovation thrives when
                people from all walks of life collaborate at the table. Our
                mission to solve enterprise-grade problems demands the broadest
                possible range of human experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We hold ourselves accountable through measurable goals, annual
                pay equity audits, and inclusive hiring panels. Our 20-member
                team spans 8 states and represents first-generation
                professionals, career-changers, and seasoned veterans alike.
              </p>

              <div className="mt-8 flex gap-6">
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-gradient-accent">
                    40%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Women in leadership
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-gradient-accent">
                    8+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    States represented
                  </div>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-gradient-accent">
                    0
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Pay gap policy
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Pillars */}
            <div className="space-y-4">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-smooth"
                  data-ocid={`careers.dei_pillar.${i + 1}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
