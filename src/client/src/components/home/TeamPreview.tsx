import { motion } from "motion/react";

const team = [
  {
    role: "Founder & CEO",
    name: "Balaji Arumugam",
    initials: "BA",
    description:
      "Serial entrepreneur and visionary leader driving BIG BUCKS INNOVATION's mission to create technology-driven impact. Spearheads partnerships, strategy, and IIT Delhi collaboration.",
    accent: "bg-primary",
    image: "/assets/foun.jpg",
  },
  {
    role: "Chief Operating Officer",
    name: "Magesvaran B",
    initials: "MB",
    description:
      "Operations specialist with deep expertise in scaling technology teams, managing client delivery, and building enterprise partnerships that drive sustained growth.",
    accent: "bg-accent",
    image: "/assets/coo.jpg",
  },
  {
    role: "Co Founder",
    name: "Gowtham M",
    initials: "GM",
    description:
      "Innovation catalyst and co-founder leading product development and R&D initiatives. Expert in AI/ML systems and building solutions in collaboration with leading academic institutions.",
    accent: "bg-primary",
    image: "/assets/cofoun.jpg",
  },
];

export function TeamPreview() {
  return (
    <section className="py-20 md:py-28 bg-background" data-ocid="team.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.13 }}
              className="bg-card border border-border rounded-2xl p-7 text-center hover:border-primary/35 transition-smooth group surface-subtle"
              data-ocid={`team.card.${i + 1}`}
            >
              {/* Avatar circle */}
              <div className="flex justify-center mb-5">
                <div
                  className={`w-18 h-18 rounded-full ${member.accent} flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-105 transition-smooth shadow-md overflow-hidden relative`}
                  style={{ width: "4.5rem", height: "4.5rem" }}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    member.initials
                  )}
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5 block">
                {member.role}
              </span>
              <h3 className="font-display font-bold text-foreground text-base mb-3 leading-snug">
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
