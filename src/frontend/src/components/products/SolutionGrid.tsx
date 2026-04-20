import {
  Cpu,
  Globe,
  GraduationCap,
  Hammer,
  Lightbulb,
  Monitor,
  Printer,
  Rocket,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accent: string;
  iconBg: string;
  borderColor: string;
}

const services: Service[] = [
  {
    id: "iot-home-automation",
    icon: Cpu,
    title: "IoT Home Automation Services",
    description:
      "Smart home and building automation using IoT technologies — from lighting control and energy management to security systems and remote monitoring.",
    tag: "IoT",
    accent: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "rgba(37,99,235,0.2)",
  },
  {
    id: "website-development",
    icon: Monitor,
    title: "Website Development",
    description:
      "Full-stack web development delivering responsive, performant, and visually stunning websites for businesses, startups, and educational institutions.",
    tag: "Web",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "rgba(245,158,11,0.2)",
  },
  {
    id: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile Application Development",
    description:
      "Native and cross-platform mobile app development for Android and iOS — from concept and UI/UX to deployment and maintenance.",
    tag: "Mobile",
    accent: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "rgba(37,99,235,0.2)",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing Solution",
    description:
      "End-to-end digital marketing strategies encompassing SEO, social media, content marketing, and performance advertising to grow your brand online.",
    tag: "Marketing",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "rgba(245,158,11,0.2)",
  },
  {
    id: "innovation-patent",
    icon: Lightbulb,
    title: "Innovation & Patent Service",
    description:
      "Guiding inventors and startups through the patent filing process, IP strategy, and innovation audits — backed by IIT Delhi's research ecosystem.",
    tag: "IP & Patents",
    accent: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "rgba(37,99,235,0.2)",
  },
  {
    id: "trainings-internships",
    icon: GraduationCap,
    title: "Trainings & Internships",
    description:
      "Structured internship programs and technical training cohorts covering IoT, web development, AI, and digital skills — with 5000+ students trained.",
    tag: "Education",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "rgba(245,158,11,0.2)",
  },
  {
    id: "hackathon-funding",
    icon: Rocket,
    title: "Hackathon & Funding Assistance",
    description:
      "End-to-end support for students and startups participating in hackathons — mentorship, team formation, pitch coaching, and connections to funding networks.",
    tag: "Startup",
    accent: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "rgba(37,99,235,0.2)",
  },
  {
    id: "pcb-designing",
    icon: Hammer,
    title: "PCB Designing Services",
    description:
      "Professional PCB design and layout services for electronics projects, IoT devices, and industrial applications — from schematic to fabrication-ready files.",
    tag: "Electronics",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "rgba(245,158,11,0.2)",
  },
  {
    id: "3d-printing",
    icon: Printer,
    title: "3D Printing Services",
    description:
      "Rapid prototyping and production using advanced 3D printing technologies. From product prototypes to custom parts — precise, fast, and cost-effective.",
    tag: "Fabrication",
    accent: "text-primary",
    iconBg: "bg-primary/10",
    borderColor: "rgba(37,99,235,0.2)",
  },
  {
    id: "research-development",
    icon: Globe,
    title: "Research & Development Support",
    description:
      "Collaborative R&D initiatives for enterprises and academic institutions — project scoping, technical research, and prototype development with IIT Delhi backing.",
    tag: "R&D",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    borderColor: "rgba(245,158,11,0.2)",
  },
];

export function SolutionGrid() {
  return (
    <section className="py-20 bg-muted/20" data-ocid="solutions.section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-mono font-medium tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/25 bg-primary/5">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            10 Services Built for{" "}
            <span className="text-gradient-accent">Real Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            From IoT automation and web development to R&D support and patent
            services — every offering is designed to accelerate growth.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-white border rounded-xl p-6 hover:border-primary/30 transition-smooth cursor-default flex flex-col"
                style={{
                  borderColor: svc.borderColor,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
                data-ocid={`solutions.${svc.id}_card`}
              >
                <div
                  className={`w-11 h-11 rounded-lg ${svc.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-smooth`}
                >
                  <Icon
                    className={`w-5 h-5 ${svc.accent}`}
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-base text-foreground leading-snug">
                    {svc.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {svc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${svc.accent} opacity-70`}
                  >
                    {svc.tag}
                  </span>
                  <a
                    href="/contact"
                    className="text-xs font-semibold text-primary hover:underline transition-colors duration-200 flex items-center gap-1"
                    data-ocid={`solutions.${svc.id}_learn_more`}
                  >
                    Learn More →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
