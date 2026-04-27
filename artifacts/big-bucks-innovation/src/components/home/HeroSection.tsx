import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-background">
      {/* Full-viewport background image */}
      <div
        className="absolute inset-0 z-0"
        role="presentation"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/ihfc-iitdelhi.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.6) saturate(1.2)",
          pointerEvents: "none",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "multiply",
          opacity: 0.8,
        }}
      />

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-40 z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.45 0.16 264 / 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top blue gradient wash */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.45 0.16 264 / 0.10), transparent 65%)",
        }}
      />
      {/* Gold accent orb bottom-right */}
      <div
        className="absolute -bottom-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.19 60 / 0.06), transparent 65%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* IIT Delhi badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-accent/60 text-accent bg-accent/8 px-5 py-2 text-xs font-bold tracking-widest uppercase gap-1.5"
              data-ocid="hero.badge"
            >
              <Sparkles className="w-3 h-3" />
              Pre Incubated Company at IIT Delhi IHFC
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-4 tracking-tight"
            data-ocid="hero.heading"
          >
            BIG BUCKS <span className="text-gradient-accent">INNOVATION</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground">
              PVT LTD
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-display font-semibold text-base md:text-lg tracking-[0.25em] uppercase text-primary mb-6"
            data-ocid="hero.tagline"
          >
            Innovation &nbsp;|&nbsp; Technology &nbsp;|&nbsp; Impact
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            data-ocid="hero.subheadline"
          >
            Enterprise-grade AI, smart products &amp; technology solutions
            engineered for scale. Backed by IIT Delhi. Trusted by government and
            industry leaders.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/about">
              <Button
                data-ocid="hero.explore_services_button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary px-8 h-12 text-base font-semibold transition-smooth"
              >
                Explore Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button
                data-ocid="hero.our_products_button"
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-accent/10 hover:border-accent/60 hover:text-accent px-8 h-12 text-base font-semibold transition-smooth"
              >
                Our Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}