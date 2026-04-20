import { CSRSection } from "@/components/about/CSRSection";
import { CompanyStats } from "@/components/about/CompanyStats";
import { MissionVision } from "@/components/about/MissionVision";
import { TeamSection } from "@/components/about/TeamSection";
import { Timeline } from "@/components/about/Timeline";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Cpu,
  FlaskConical,
  GraduationCap,
  Handshake,
  Landmark,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";

const mouColleges = [
  {
    name: "St. Josephs Institute of Technology",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Easwari Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Saveetha Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Jeppiaar Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Panimalar Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Misrimal Navajee Munoth Jain Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Meenakshi College of Engineering",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
  {
    name: "Dr. Ambedkar Institute of Technology",
    location: "Bengaluru, Karnataka",
    type: "Engineering",
  },
  {
    name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute",
    location: "Chennai, Tamil Nadu",
    type: "Engineering & Research",
  },
  {
    name: "RMK Engineering College",
    location: "Chennai, Tamil Nadu",
    type: "Engineering",
  },
];

const partners = [
  {
    name: "IIT Delhi",
    type: "Academic Partner",
    icon: BookOpen,
    highlight: true,
  },
  { name: "Ministry of Education", type: "Government", icon: Landmark },
  { name: "NASSCOM", type: "Industry", icon: Building2 },
  {
    name: "National Skill Development Corporation",
    type: "Government",
    icon: Award,
  },
  { name: "Startup India", type: "Government", icon: FlaskConical },
  {
    name: "CII — Confederation of Indian Industry",
    type: "Industry",
    icon: Handshake,
  },
];

const fundingGrants = [
  { title: "MSME Innovation Grant", body: "Ministry of MSME", year: "2022" },
  {
    title: "Startup India Seed Fund",
    body: "DPIIT, Govt. of India",
    year: "2022",
  },
  { title: "TIDE 2.0 Grant", body: "MeitY, Govt. of India", year: "2023" },
  { title: "State Innovation Grant", body: "Tamil Nadu Govt.", year: "2023" },
  {
    title: "Academic Research Fund",
    body: "IIT Delhi Innovation Lab",
    year: "2023",
  },
  { title: "NIDHI-EIR Fellowship", body: "DST, Govt. of India", year: "2024" },
];

export function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative py-24 md:py-32 overflow-hidden gradient-hero border-b border-border"
        data-ocid="about.hero_section"
      >
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/5 text-xs uppercase tracking-widest"
            >
              About Big Bucks Innovation
            </Badge>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
              <span className="text-gradient-accent">Innovating</span> India's
              Technology Future
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Big Bucks Innovation Pvt Ltd is a pre-incubated enterprise
              technology company born from IIT Delhi's innovation ecosystem —
              delivering world-class IoT, web, mobile, and digital
              transformation solutions backed by government trust.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                data-ocid="about.hero_cta_primary"
              >
                <Link to="/contact">
                  Partner With Us <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/40 transition-smooth"
                data-ocid="about.hero_cta_secondary"
              >
                <Link to="/products">Explore Solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IIT Delhi Pre-Incubation — prominent */}
      <section
        className="py-14 bg-white border-b border-border"
        data-ocid="about.iit_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="mb-4 border-accent/40 text-accent bg-accent/5 text-xs uppercase tracking-widest"
              >
                Pre-Incubation Partner
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Backed by{" "}
                <span className="text-gradient-accent">IIT Delhi</span>'s
                Innovation Ecosystem
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
                Big Bucks Innovation holds official pre-incubation status with
                IIT Delhi — India's premier technical institute. This gives us
                direct access to research labs, faculty mentorship, and a
                pipeline of top engineering talent.
              </p>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: FlaskConical,
                  title: "Pre-Incubated",
                  desc: "Official status with IIT Delhi Innovation Lab",
                  isAccent: true,
                },
                {
                  icon: GraduationCap,
                  title: "Research Access",
                  desc: "World-class facilities and faculty collaboration",
                  isAccent: false,
                },
                {
                  icon: Award,
                  title: "6 Funding Grants",
                  desc: "Government-backed national tech initiatives",
                  isAccent: true,
                },
                {
                  icon: Building2,
                  title: "2 Branch Offices",
                  desc: "Chennai head office + St. Josephs campus branch",
                  isAccent: false,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="bg-white rounded-xl px-5 py-5 border flex items-start gap-4 transition-smooth"
                    style={{
                      borderColor: item.isAccent
                        ? "rgba(245,158,11,0.3)"
                        : "rgba(37,99,235,0.2)",
                      borderLeftWidth: "3px",
                      borderLeftColor: item.isAccent ? "#F59E0B" : "#2563EB",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: item.isAccent
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(37,99,235,0.1)",
                      }}
                    >
                      <Icon
                        className="w-4.5 h-4.5"
                        style={{
                          color: item.isAccent ? "#F59E0B" : "#2563EB",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-display font-bold text-sm mb-1"
                        style={{ color: item.isAccent ? "#F59E0B" : "#2563EB" }}
                      >
                        {item.title}
                      </div>
                      <div className="text-muted-foreground text-xs leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <CompanyStats />

      {/* Mission & Vision + Values */}
      <MissionVision />

      {/* Timeline */}
      <Timeline />

      {/* Team */}
      <TeamSection />

      {/* MOU Colleges Carousel */}
      <section
        className="py-20 bg-white border-y border-border"
        data-ocid="about.mou_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 text-primary bg-primary/5 text-xs uppercase tracking-widest"
            >
              MOU Colleges
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              10 Colleges in Our{" "}
              <span className="text-gradient-accent">MOU Network</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Formal Memoranda of Understanding with leading engineering
              institutions across India — enabling training programs, R&D
              collaboration, and internship pipelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {mouColleges.map((college, i) => (
              <motion.div
                key={college.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-white border border-border hover:border-primary/30 rounded-xl p-4 flex flex-col gap-2 transition-smooth group"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.mou_college.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground text-xs leading-snug group-hover:text-primary transition-colors duration-200">
                    {college.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <p className="text-muted-foreground text-[11px] truncate">
                      {college.location}
                    </p>
                  </div>
                  <span
                    className="inline-block mt-1.5 text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(245,158,11,0.1)",
                      color: "#F59E0B",
                    }}
                  >
                    {college.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground text-sm mt-8"
          >
            Interested in an MOU with Big Bucks Innovation?{" "}
            <Link
              to="/contact"
              className="text-primary font-medium hover:underline transition-smooth"
              data-ocid="about.mou_contact_link"
            >
              Reach out to us →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Funding Grants */}
      <section
        className="py-16 bg-muted/20 border-b border-border"
        data-ocid="about.funding_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="mb-4 border-accent/30 text-accent bg-accent/5 text-xs uppercase tracking-widest"
            >
              Government Funded
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              6 Funding Grants &{" "}
              <span className="text-gradient-primary">Recognition</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Validated by government bodies and research institutions through
              competitive grants and fellowships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {fundingGrants.map((grant, i) => (
              <motion.div
                key={grant.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="bg-white border border-border rounded-xl px-5 py-4 flex items-start gap-3 transition-smooth hover:border-accent/30"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.funding_grant.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground leading-snug mb-0.5">
                    {grant.title}
                  </p>
                  <p className="text-muted-foreground text-xs">{grant.body}</p>
                  <span
                    className="inline-block mt-1 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      color: "#2563EB",
                    }}
                  >
                    {grant.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section
        className="py-16 bg-background border-b border-border"
        data-ocid="about.partners_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="mb-4 border-border text-muted-foreground text-xs uppercase tracking-widest"
            >
              Partner Ecosystem
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              Trusted by{" "}
              <span className="text-gradient-accent">
                government &amp; industry
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`bg-white border rounded-xl px-5 py-4 flex items-center gap-3 transition-smooth
                  ${
                    p.highlight
                      ? "border-accent/30 hover:border-accent/50"
                      : "border-border hover:border-primary/25"
                  }`}
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                data-ocid={`about.partner.${i + 1}`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                  ${p.highlight ? "bg-accent/10 border border-accent/20" : "bg-primary/8 border border-primary/15"}`}
                >
                  <p.icon
                    className={`w-4 h-4 ${p.highlight ? "text-accent" : "text-primary"}`}
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className={`font-display font-semibold text-sm truncate ${p.highlight ? "text-accent" : "text-foreground"}`}
                  >
                    {p.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{p.type}</p>
                </div>
                {p.highlight && (
                  <Badge className="ml-auto flex-shrink-0 bg-accent/15 text-accent border-accent/30 text-xs">
                    Key Partner
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR */}
      <CSRSection />

      {/* CTA */}
      <section
        className="py-20 bg-white border-t border-border relative overflow-hidden"
        data-ocid="about.cta_section"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Cpu className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ready to build the future{" "}
              <span className="text-gradient-accent">together?</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Whether you're a government body, enterprise, or educational
              institution — we'd love to explore how Big Bucks Innovation can
              accelerate your digital transformation journey.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                data-ocid="about.cta_contact_button"
              >
                <Link to="/contact">
                  Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/40 transition-smooth"
                data-ocid="about.cta_careers_button"
              >
                <Link to="/careers">Join Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
