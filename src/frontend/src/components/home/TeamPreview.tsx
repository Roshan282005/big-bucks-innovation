import { motion } from "motion/react";

const team = [
  {
    role: "Founder",
    name: "Visionary Leader",
    initials: "FL",
    description:
      "Serial entrepreneur with 10+ years in enterprise technology, government relations, and startup ecosystem development.",
    accent: "bg-primary",
  },
  {
    role: "Co-Founder",
    name: "Innovation Catalyst",
    initials: "IC",
    description:
      "Expert in AI/ML systems and product development. Leads R&D initiatives in collaboration with IIT Delhi research teams.",
    accent: "bg-accent",
  },
  {
    role: "Chief Operating Officer",
    name: "Operations Lead",
    initials: "OL",
    description:
      "Operations specialist with deep expertise in scaling technology teams, client delivery, and enterprise partnerships.",
    accent: "bg-primary",
  },
];

export function TeamPreview() {
  return (
    <section className="py-20 md:py-24 bg-background" data-ocid="team.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Our Leadership
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            The Team Behind the Vision
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A team of innovators, engineers, and strategists united by a single
            mission: building technology that matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-smooth group"
              data-ocid={`team.card.${i + 1}`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full ${member.accent} flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-105 transition-smooth`}
                >
                  {member.initials}
                </div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1 block">
                {member.role}
              </span>
              <h3 className="font-display font-semibold text-foreground text-base mb-3 leading-snug">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
