import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

const team = [
  {
    initials: "RK",
    name: "Rahul Kumar",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur and IIT Delhi alumnus. Built Big Bucks Innovation from the ground up, securing government partnerships and shaping India's enterprise tech landscape.",
    expertise: ["Strategy", "Enterprise Sales", "AI Policy"],
    accentColor: "primary" as const,
  },
  {
    initials: "PG",
    name: "Priya Gupta",
    role: "Co-Founder & CTO",
    bio: "Deep tech architect with expertise in AI, distributed systems, and enterprise networking. Leads all product development and research initiatives at BBI.",
    expertise: ["AI/ML", "Architecture", "R&D"],
    accentColor: "accent" as const,
  },
  {
    initials: "AS",
    name: "Amit Sharma",
    role: "Chief Operating Officer",
    bio: "Operations strategist who has orchestrated BBI's rapid growth across 5 cities and 5000+ student training programs. Specializes in process excellence and team building.",
    expertise: ["Operations", "Training", "Partnerships"],
    accentColor: "primary" as const,
  },
];

const accentMap = {
  primary: {
    ring: "border-primary/30",
    bg: "bg-primary/10",
    text: "text-primary",
    badge: "border-primary/20 text-primary bg-primary/5",
    glow: "bg-primary",
    topBar: "via-primary",
    hover: "hover:border-primary/40",
  },
  accent: {
    ring: "border-accent/30",
    bg: "bg-accent/10",
    text: "text-accent",
    badge: "border-accent/20 text-accent bg-accent/5",
    glow: "bg-accent",
    topBar: "via-accent",
    hover: "hover:border-accent/40",
  },
};

export function TeamSection() {
  return (
    <section
      id="team"
      className="py-24 bg-background relative overflow-hidden"
      data-ocid="about.team_section"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

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
            className="mb-4 border-border text-muted-foreground text-xs uppercase tracking-widest"
          >
            Leadership
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            The team behind <span className="text-gradient-accent">BBI</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            A tight-knit group of visionaries, engineers, and operators
            committed to building India's next-generation enterprise technology
            company.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => {
            const a = accentMap[member.accentColor];
            return (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className={`relative bg-card border ${a.ring} ${a.hover} rounded-2xl p-7 text-center transition-smooth surface-elevated group overflow-hidden`}
                data-ocid={`about.team_member.${i + 1}`}
              >
                {/* top accent bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${a.topBar} to-transparent opacity-60`}
                />
                {/* bg glow */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-smooth ${a.glow}`}
                />

                {/* Avatar */}
                <div className="relative inline-block mb-5">
                  <div
                    className={`w-20 h-20 rounded-full ${a.bg} border-2 ${a.ring} flex items-center justify-center mx-auto`}
                  >
                    <span
                      className={`font-display font-bold text-2xl ${a.text}`}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${a.bg} border-2 ${a.ring} flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full ${a.glow}`} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-foreground text-lg mb-1">
                  {member.name}
                </h3>
                <p className={`text-sm font-medium mb-4 ${a.text}`}>
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {member.expertise.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs ${a.badge}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    aria-label={`${member.name} LinkedIn`}
                    className={`w-8 h-8 rounded-lg ${a.bg} border ${a.ring} flex items-center justify-center ${a.text} hover:opacity-80 transition-smooth`}
                    data-ocid={`about.team_linkedin.${i + 1}`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Email ${member.name}`}
                    className={`w-8 h-8 rounded-lg ${a.bg} border ${a.ring} flex items-center justify-center ${a.text} hover:opacity-80 transition-smooth`}
                    data-ocid={`about.team_email.${i + 1}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
