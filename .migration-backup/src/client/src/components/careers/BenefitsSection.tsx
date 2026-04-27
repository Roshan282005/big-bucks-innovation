import {
  BookOpen,
  Building2,
  Globe,
  GraduationCap,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Globe,
    title: "Remote-First Culture",
    description:
      "Work from anywhere in India. We champion flexibility with async collaboration and regular in-person sprints.",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Learning & Development",
    description:
      "Annual L&D budget, conference sponsorships, and a dedicated learning hour every Friday for skill growth.",
    accent: "primary",
  },
  {
    icon: Lightbulb,
    title: "Innovation Culture",
    description:
      "10% time for passion projects. Regular hackathons, internal labs, and open R&D with real business impact.",
    accent: "accent",
  },
  {
    icon: Building2,
    title: "Government Collaboration",
    description:
      "Work directly with government bodies and public institutions. Shape policy-level tech decisions.",
    accent: "accent",
  },
  {
    icon: GraduationCap,
    title: "IIT Delhi Network",
    description:
      "As a pre-incubated company, you get access to IIT Delhi's premier academic and research ecosystem.",
    accent: "primary",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description:
      "Clear career progression tracks, quarterly reviews, ESOP options, and high-ownership roles from day one.",
    accent: "accent",
  },
];

export function BenefitsSection() {
  return (
    <section
      className="py-20 bg-muted/30 border-t border-border"
      data-ocid="careers.benefits_section"
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
            Why Join Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Benefits & Perks
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We believe great work comes from great conditions. Here's what we
            offer beyond competitive compensation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-smooth"
              data-ocid={`careers.benefit.${i + 1}`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  benefit.accent === "accent"
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <benefit.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
