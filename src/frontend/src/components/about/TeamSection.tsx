import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

const team = [
  {
    initials: "BA",
    name: "Mr. Balaji Arumugam",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur and IIT Delhi pre-incubated founder. Spearheads enterprise strategy, government partnerships, and leads Big Bucks Innovation's mission to transform India's technology landscape.",
    expertise: ["Strategy", "Enterprise Sales", "Innovation"],
    accentColor: "primary" as const,
  },
  {
    initials: "MB",
    name: "Mr. Magesvaran B",
    role: "Chief Operating Officer",
    bio: "Operations architect driving BBI's rapid growth across multiple cities. Orchestrates training programs, business operations, and ensures excellence in every client engagement.",
    expertise: ["Operations", "Process Excellence", "Team Building"],
    accentColor: "accent" as const,
  },
  {
    initials: "SS",
    name: "Mr. Sriram S",
    role: "General Manager",
    bio: "Seasoned manager overseeing end-to-end project delivery and cross-functional coordination. Ensures BBI's strategic goals translate into measurable outcomes for clients.",
    expertise: ["Project Management", "Delivery", "Coordination"],
    accentColor: "primary" as const,
  },
  {
    initials: "GM",
    name: "Mr. Gowtham M",
    role: "Co-Founder",
    bio: "Co-creator of BBI's vision, Gowtham drives product innovation and technology partnerships. Passionate about leveraging emerging tech to solve real-world enterprise challenges.",
    expertise: ["Product", "Partnerships", "Technology"],
    accentColor: "accent" as const,
  },
  {
    initials: "VE",
    name: "Ms. Vinitha E",
    role: "Head – Internships Portfolio",
    bio: "Leads BBI's flagship internship programs, managing placements, curriculum, and industry collaborations that have empowered 5000+ students across India.",
    expertise: ["Internships", "Curriculum", "Student Success"],
    accentColor: "primary" as const,
  },
  {
    initials: "SRL",
    name: "Mr. Sai Ramesh L",
    role: "Chief Mentor",
    bio: "Distinguished mentor guiding students and early-stage startups through technology challenges. Bridges academic knowledge with real-world industry application.",
    expertise: ["Mentorship", "Startups", "Technology Guidance"],
    accentColor: "accent" as const,
  },
  {
    initials: "PV",
    name: "Ms. Prathiksha V",
    role: "Frontend & UI/UX Engineer",
    bio: "Creative engineer crafting pixel-perfect interfaces and seamless user experiences. Builds the visual layer that makes BBI's digital products intuitive and delightful.",
    expertise: ["Frontend", "UI/UX", "React"],
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
            className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, i) => {
            const a = accentMap[member.accentColor];
            return (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`relative bg-white border ${a.ring} ${a.hover} rounded-2xl p-6 text-center transition-smooth surface-elevated group overflow-hidden`}
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.team_member.${i + 1}`}
              >
                {/* left blue border accent */}
                <div
                  className={`absolute top-0 left-0 h-full w-0.5 ${a.glow} opacity-40`}
                />
                {/* top accent bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${a.topBar} to-transparent opacity-50`}
                />
                {/* bg glow */}
                <div
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-8 group-hover:opacity-15 transition-smooth ${a.glow}`}
                />

                {/* Avatar — blue circle with initials */}
                <div className="relative inline-block mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "#2563EB" }}
                  >
                    <span className="font-display font-bold text-lg text-white">
                      {member.initials}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border-2 ${a.ring} flex items-center justify-center`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${a.glow}`} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-foreground text-sm mb-0.5 leading-snug">
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold mb-3 uppercase tracking-wide"
                  style={{ color: "#F59E0B" }}
                >
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.expertise.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-[10px] ${a.badge}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    aria-label={`${member.name} LinkedIn`}
                    className={`w-7 h-7 rounded-lg ${a.bg} border ${a.ring} flex items-center justify-center ${a.text} hover:opacity-80 transition-smooth`}
                    data-ocid={`about.team_linkedin.${i + 1}`}
                  >
                    <Linkedin className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Email ${member.name}`}
                    className={`w-7 h-7 rounded-lg ${a.bg} border ${a.ring} flex items-center justify-center ${a.text} hover:opacity-80 transition-smooth`}
                    data-ocid={`about.team_email.${i + 1}`}
                  >
                    <Mail className="w-3 h-3" />
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
