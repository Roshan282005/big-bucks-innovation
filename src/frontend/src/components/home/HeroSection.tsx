import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { BulbAnimation } from "./BulbAnimation";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, oklch(0.72 0.18 190 / 0.14), transparent 62%)",
        }}
      />
      {/* Amber accent orb bottom-right */}
      <div
        className="absolute -bottom-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.17 70 / 0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide"
              data-ocid="hero.badge"
            >
              Pre-incubated &amp; IIT Delhi Innovation Lab
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-6 tracking-tight"
            data-ocid="hero.heading"
          >
            BIG BUCKS <span className="text-gradient-accent">INNOVATION</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground">
              PVT LTD
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            data-ocid="hero.subheadline"
          >
            Enterprise-grade AI, networking &amp; business solutions engineered
            for scale. Backed by IIT Delhi. Trusted by government and industry
            leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/products">
              <Button
                data-ocid="hero.explore_button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 h-12 text-base font-semibold transition-smooth"
              >
                Explore Solutions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                data-ocid="hero.demo_button"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent px-8 h-12 text-base font-semibold transition-smooth"
              >
                Get Demo
              </Button>
            </Link>
          </motion.div>

          <BulbAnimation />
        </div>
      </div>
    </section>
  );
}
