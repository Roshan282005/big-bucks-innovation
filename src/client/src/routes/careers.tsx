import { BenefitsSection } from "@/components/careers/BenefitsSection";
import { CultureSection } from "@/components/careers/CultureSection";
import { DEISection } from "@/components/careers/DEISection";
import { JobListings } from "@/components/careers/JobListings";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, GraduationCap, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "5,000+", label: "Students Trained", icon: GraduationCap },
  { value: "15", label: "Team Members", icon: Users },
  { value: "10+", label: "Active MOUs", icon: Building2 },
];

export function CareersPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative py-24 overflow-hidden gradient-hero"
        data-ocid="careers.hero_section"
      >
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/5 px-4 py-1"
            >
              We're Hiring
            </Badge>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Join <span className="text-gradient-accent">BIG BUCKS</span>
              <br />
              INNOVATION
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Pre-incubated at IIT Delhi. Building enterprise technology for
              India's most critical sectors. Be part of a team that shapes how
              government and Fortune-500 companies work.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <a href="#open-positions">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                  data-ocid="careers.view_jobs_button"
                >
                  View Open Roles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:border-primary/40 transition-smooth"
                  data-ocid="careers.contact_button"
                >
                  Send Your Resume
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-foreground text-sm">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Culture section */}
      <CultureSection />

      {/* Open Positions */}
      <section
        id="open-positions"
        className="py-20 bg-background border-t border-border"
        data-ocid="careers.jobs_section"
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
              Open Positions
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Find Your Role
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We're a small, high-leverage team. Every hire significantly shapes
              what we build and how we operate.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <JobListings />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection />

      {/* DEI */}
      <DEISection />

      {/* CTA */}
      <section
        className="py-16 bg-muted/20 border-t border-border"
        data-ocid="careers.cta_section"
      >
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Don't see a fit?{" "}
              <span className="text-gradient-accent">Write to us anyway.</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              We're always open to exceptional people. Send us your story and
              tell us how you'd contribute to BIG BUCKS INNOVATION.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 transition-smooth"
                data-ocid="careers.spontaneous_apply_button"
              >
                Send Spontaneous Application
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
