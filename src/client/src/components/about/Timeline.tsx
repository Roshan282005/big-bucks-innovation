import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const milestones = [
  {
    year: "2020",
    quarter: "Q1",
    title: "Founded",
    description:
      "Big Bucks Innovation Pvt Ltd established with IIT Delhi pre-incubation backing. First team of 5 engineers assembled, initial R&D into enterprise IoT and technology solutions commenced.",
    tags: ["Company Founded", "IIT Delhi", "Pre-Incubation"],
    accent: false,
  },
  {
    year: "2021",
    quarter: "Q3",
    title: "First MOU & Training Cohort",
    description:
      "Signed inaugural MOU with an academic institution. Launched first student training cohort — 500 students trained in the first year across IoT, digital marketing, and web technologies.",
    tags: ["First MOU", "500 Students", "Training Launch"],
    accent: true,
  },
  {
    year: "2022",
    quarter: "Q2",
    title: "IIT Delhi Strategic Partnership",
    description:
      "Formalized deep collaboration with IIT Delhi's innovation lab, gaining access to world-class research facilities, faculty expertise, and a pipeline of top engineering talent for R&D projects.",
    tags: ["IIT Delhi Partnership", "Research Lab", "Talent Pipeline"],
    accent: false,
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "Product & Service Expansion",
    description:
      "Launched RENEWA LED Street Light, ANNAM food surplus SaaS, and SEYAL student-startup connector app. Expanded services to 10 verticals including 3D printing, PCB design, and patent services.",
    tags: ["3 Products Launched", "10 Services", "SaaS Expansion"],
    accent: true,
  },
  {
    year: "2024",
    quarter: "Today",
    title: "35 Projects, 5000+ Students & 10+ MOUs",
    description:
      "Reached major milestones: 35 completed projects, 5000+ students trained across India, 10+ MOUs signed, 15 active team members, 6 funding grants, and 2 branch offices operational nationally.",
    tags: ["5000+ Students", "10+ MOUs", "35 Projects", "National Reach"],
    accent: false,
  },
];

export function Timeline() {
  return (
    <section
      className="py-24 bg-muted/20 border-y border-border relative overflow-hidden"
      data-ocid="about.timeline_section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
          >
            Our Journey
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Four years of{" "}
            <span className="text-gradient-accent">building and growing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            From a bold idea in IIT Delhi's innovation lab to a
            government-backed enterprise technology company with national reach.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent hidden sm:block" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={m.year + m.quarter}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className={`relative flex gap-6 md:gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-ocid={`about.timeline_item.${i + 1}`}
                >
                  {/* Card half */}
                  <div
                    className={`flex-1 ${isRight ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div
                      className="bg-white border rounded-2xl p-6 transition-smooth group"
                      style={{
                        borderColor: m.accent
                          ? "rgba(245,158,11,0.25)"
                          : "rgba(37,99,235,0.2)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      }}
                    >
                      {/* top accent */}
                      <div
                        className={`w-full h-0.5 -mx-6 -mt-6 mb-5 rounded-t-2xl bg-gradient-to-r from-transparent
                        ${m.accent ? "via-accent" : "via-primary"} to-transparent opacity-50`}
                        style={{ width: "calc(100% + 3rem)" }}
                      />
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`flex-shrink-0 mt-0.5 ${m.accent ? "text-accent" : "text-primary"}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className={`font-display font-bold text-sm ${m.accent ? "text-accent" : "text-primary"}`}
                            >
                              {m.year} · {m.quarter}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-foreground text-lg mb-2">
                            {m.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-4 ml-7">
                        {m.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`text-xs ${m.accent ? "border-accent/20 text-accent bg-accent/5" : "border-primary/20 text-primary bg-primary/5"}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot on desktop */}
                  <div className="hidden md:flex items-start justify-center pt-6 relative z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${m.accent ? "border-accent bg-accent/20" : "border-primary bg-primary/20"} shadow-lg`}
                    />
                  </div>

                  {/* Empty other side on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
