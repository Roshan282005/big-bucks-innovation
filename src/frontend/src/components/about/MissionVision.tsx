import { Badge } from "@/components/ui/badge";
import { Eye, Globe, Lightbulb, Shield, Star, Zap } from "lucide-react";
import { motion } from "motion/react";

const coreValues = [
  {
    icon: Lightbulb,
    label: "Innovation First",
    desc: "Continuous R&D backed by India's premier IIT Delhi network drives every product and service we build.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Shield,
    label: "Enterprise Trust",
    desc: "Government-funded and MOU-backed, our solutions meet the highest standards of security and reliability.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Star,
    label: "Student Empowerment",
    desc: "5000+ students trained in cutting-edge technologies — building the workforce of tomorrow, today.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Globe,
    label: "Mission-Driven",
    desc: "Every solution we craft solves a real enterprise challenge and creates measurable social impact.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Zap,
    label: "Agile Execution",
    desc: "From ideation to deployment in record time — our lean team delivers enterprise solutions at startup speed.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Eye,
    label: "Transparent Impact",
    desc: "We measure what matters: training outcomes, MOU milestones, and deployed technology in the field.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
];

export function MissionVision() {
  return (
    <section
      className="py-24 bg-background relative overflow-hidden"
      data-ocid="about.mission_section"
    >
      {/* subtle grid bg */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Mission + Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white border border-primary/20 rounded-2xl p-8 relative overflow-hidden group hover:border-primary/40 transition-smooth"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            {/* left blue accent bar */}
            <div className="absolute top-0 left-0 h-full w-1 bg-primary rounded-l-2xl opacity-70" />
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 ml-3">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="pl-3">
              <Badge
                variant="outline"
                className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
              >
                Our Mission
              </Badge>
              <h3 className="font-display font-bold text-2xl text-foreground mb-4 leading-snug">
                Empowering enterprises through{" "}
                <span className="text-gradient-primary">
                  intelligent technology
                </span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We exist to bridge the gap between cutting-edge research and
                real-world enterprise needs — delivering IoT, web, mobile, and
                digital transformation solutions that scale. From government
                bodies to growing startups, our mission is to make world-class
                technology accessible to every organization in India.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-white border border-accent/20 rounded-2xl p-8 relative overflow-hidden group hover:border-accent/40 transition-smooth"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            {/* left gold accent bar */}
            <div className="absolute top-0 left-0 h-full w-1 bg-accent rounded-l-2xl opacity-70" />
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 ml-3">
              <Eye className="w-6 h-6 text-accent" />
            </div>
            <div className="pl-3">
              <Badge
                variant="outline"
                className="mb-4 border-accent/30 text-accent bg-accent/5 text-xs uppercase tracking-widest"
              >
                Our Vision
              </Badge>
              <h3 className="font-display font-bold text-2xl text-foreground mb-4 leading-snug">
                India's most trusted{" "}
                <span className="text-gradient-accent">innovation partner</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become India's foremost pre-incubated technology company — a
                benchmark for innovation, talent development, and enterprise
                impact. By 2030, we envision a network of 50,000+ trained
                professionals, 100+ enterprise MOUs, and technology solutions
                deployed across every state in India.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="mb-4 border-border text-muted-foreground text-xs uppercase tracking-widest"
          >
            Core Values
          </Badge>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            What drives us{" "}
            <span className="text-gradient-accent">every day</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreValues.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white border border-border rounded-xl p-6 hover:border-primary/30 transition-smooth group"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              data-ocid={`about.value_card.${i + 1}`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${v.bg} border ${v.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}
              >
                <v.icon className={`w-5 h-5 ${v.color}`} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {v.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
