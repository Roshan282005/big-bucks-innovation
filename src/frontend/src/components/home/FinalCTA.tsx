import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section
      className="py-20 md:py-28 bg-card border-t border-border"
      data-ocid="final_cta.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative bulb glow */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center border border-accent/30 bg-accent/10"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Light bulb icon"
            >
              <path
                d="M14 3C9.582 3 6 6.582 6 11c0 2.52 1.26 4.739 3.15 6.076V19.5h9.7V17.076C20.74 15.74 22 13.52 22 11c0-4.418-3.582-8-8-8z"
                fill="oklch(0.78 0.17 70 / 0.9)"
              />
              <line
                x1="10"
                y1="21"
                x2="18"
                y2="21"
                stroke="oklch(0.78 0.17 70)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="23.5"
                x2="17"
                y2="23.5"
                stroke="oklch(0.78 0.17 70)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-5 leading-tight">
            Ready to <span className="text-gradient-accent">Innovate?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Let's build the future together. Reach out to explore custom
            solutions, partnerships, or a live product demo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link to="/contact">
              <Button
                data-ocid="final_cta.contact_button"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent px-8 h-12 font-semibold text-base transition-smooth"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button
                data-ocid="final_cta.explore_button"
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 px-8 h-12 transition-smooth"
              >
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Contact quick info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="tel:8667858430"
              className="flex items-center gap-2 hover:text-foreground transition-smooth"
              data-ocid="final_cta.phone_link"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              8667858430
            </a>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <a
              href="mailto:bigbucksinnovation@gmail.com"
              className="flex items-center gap-2 hover:text-foreground transition-smooth"
              data-ocid="final_cta.email_link"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              bigbucksinnovation@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
