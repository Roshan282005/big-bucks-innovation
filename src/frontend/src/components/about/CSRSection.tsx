import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Leaf, Users } from "lucide-react";
import { motion } from "motion/react";

const csrInitiatives = [
  {
    icon: GraduationCap,
    title: "Skill India Training",
    description:
      "Partnered with government bodies to deliver free and subsidized training in AI, networking, and digital skills to students from underserved communities across India.",
    stat: "5000+",
    statLabel: "Students Trained",
    accent: false,
  },
  {
    icon: Users,
    title: "Women in Tech",
    description:
      "Dedicated programs to increase female participation in technology careers — with targeted internships, mentorship, and scholarships for women pursuing STEM education.",
    stat: "40%",
    statLabel: "Women Participants",
    accent: true,
  },
  {
    icon: Leaf,
    title: "Rural Connectivity",
    description:
      "Working with state government initiatives to extend enterprise-grade networking infrastructure to rural schools and community centers, bridging the digital divide.",
    stat: "12",
    statLabel: "Districts Reached",
    accent: false,
  },
  {
    icon: Heart,
    title: "Open Source & Research",
    description:
      "Publishing research, open-sourcing training materials, and contributing to India's national AI/technology policy discourse through IIT Delhi's research network.",
    stat: "20+",
    statLabel: "Publications",
    accent: true,
  },
];

export function CSRSection() {
  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      data-ocid="about.csr_section"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
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
            className="mb-4 border-accent/30 text-accent bg-accent/5 text-xs uppercase tracking-widest"
          >
            CSR & Impact
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Technology with{" "}
            <span className="text-gradient-accent">purpose</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            We believe technology should uplift communities, not just
            corporations. Our CSR initiatives are woven into our DNA — from
            day-one investments in student training to rural connectivity
            programs that reach the last mile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-12">
          {csrInitiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-card border rounded-2xl p-6 transition-smooth group surface-elevated
                ${item.accent ? "border-accent/25 hover:border-accent/40" : "border-border hover:border-primary/30"}`}
              data-ocid={`about.csr_item.${i + 1}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                  ${item.accent ? "bg-accent/10 border border-accent/20" : "bg-primary/10 border border-primary/20"}`}
                >
                  <item.icon
                    className={`w-5 h-5 ${item.accent ? "text-accent" : "text-primary"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-display font-bold text-2xl ${item.accent ? "text-accent" : "text-primary"}`}
                    >
                      {item.stat}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl mx-auto text-center bg-card border border-primary/20 rounded-2xl p-8 relative overflow-hidden"
          data-ocid="about.csr_quote"
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <blockquote className="font-display text-xl text-foreground font-medium leading-relaxed mb-4">
            "We don't just build technology — we build the people who will shape
            India's technology future."
          </blockquote>
          <cite className="text-muted-foreground text-sm not-italic">
            — Leadership Team, Big Bucks Innovation Pvt Ltd
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
