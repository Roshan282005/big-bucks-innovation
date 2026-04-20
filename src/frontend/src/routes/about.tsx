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
  Handshake,
  Landmark,
  Network,
} from "lucide-react";
import { motion } from "motion/react";

const partners = [
  { name: "IIT Delhi", type: "Academic", icon: BookOpen, highlight: true },
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
  { name: "AICTE", type: "Academic", icon: BookOpen },
  { name: "State Government Bodies", type: "Government", icon: Landmark },
  { name: "Enterprise Networking Alliance", type: "Industry", icon: Network },
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
        {/* Glow orbs */}
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
              delivering world-class AI, networking, and business solutions
              backed by government trust.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-smooth"
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

      {/* IIT Delhi collaboration highlight */}
      <section
        className="py-12 bg-card border-b border-border"
        data-ocid="about.iit_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto"
          >
            {/* IIT badge */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center glow-accent">
                  <FlaskConical className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0.5 font-semibold">
                    Official
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <span className="font-display font-bold text-accent text-lg">
                  IIT Delhi — Pre-Incubation Partner
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                Big Bucks Innovation is officially pre-incubated by IIT Delhi's
                renowned innovation lab — giving us access to world-class
                research facilities, faculty collaboration, and a talent
                pipeline from India's top engineering institution. This
                collaboration underpins every technology we build and validates
                our R&D capabilities.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { val: "Pre-Incubated", sub: "Official Status" },
                  { val: "IIT Delhi", sub: "Innovation Lab" },
                ].map((item) => (
                  <div
                    key={item.val}
                    className="bg-accent/5 border border-accent/15 rounded-xl px-4 py-3"
                  >
                    <div className="font-display font-bold text-accent text-sm">
                      {item.val}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Partner Ecosystem */}
      <section
        className="py-20 bg-muted/20 border-y border-border"
        data-ocid="about.partners_section"
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
              className="mb-4 border-border text-muted-foreground text-xs uppercase tracking-widest"
            >
              Partner Ecosystem
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Trusted by{" "}
              <span className="text-gradient-accent">
                government & industry
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Our partnerships span academia, government bodies, and industry
              associations — validating our approach and amplifying our reach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`bg-card border rounded-xl px-5 py-4 flex items-center gap-3 transition-smooth
                  ${
                    p.highlight
                      ? "border-accent/30 hover:border-accent/50 glow-accent"
                      : "border-border hover:border-primary/25"
                  }`}
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

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground text-sm mt-8"
          >
            10+ active MOUs — and growing. Interested in partnering?{" "}
            <Link
              to="/contact"
              className="text-primary hover:underline transition-smooth"
              data-ocid="about.partner_contact_link"
            >
              Get in touch →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* CSR */}
      <CSRSection />

      {/* CTA */}
      <section
        className="py-20 bg-card border-t border-border relative overflow-hidden"
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan transition-smooth"
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
