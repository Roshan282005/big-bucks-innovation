import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.45 0.16 264) 0%, oklch(0.38 0.14 264) 100%)",
      }}
      data-ocid="final_cta.section"
    >
      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Gold orb */}
      <div
        className="absolute -top-20 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.19 60 / 0.18), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center border border-white/20 bg-white/10"
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
                fill="oklch(0.62 0.19 60 / 0.95)"
              />
              <line
                x1="10"
                y1="21"
                x2="18"
                y2="21"
                stroke="oklch(0.62 0.19 60)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="23.5"
                x2="17"
                y2="23.5"
                stroke="oklch(0.62 0.19 60)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
            Ready to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.19 60), oklch(0.72 0.17 70))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Innovate?
            </span>
          </h2>
          <p
            className="text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.95 0.01 260 / 0.80)" }}
          >
            Let's build the future together. Reach out to explore custom
            solutions, partnerships, or a live product demo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link to="/contact">
              <Button
                data-ocid="final_cta.contact_button"
                size="lg"
                className="h-12 px-8 font-semibold text-base transition-smooth text-foreground"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.19 60), oklch(0.72 0.17 70))",
                  border: "none",
                }}
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
                className="border-white/30 text-white hover:bg-white/10 px-8 h-12 transition-smooth"
              >
                Explore Products
              </Button>
            </Link>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:8667858430"
              className="flex items-center gap-2 transition-smooth"
              style={{ color: "oklch(0.95 0.01 260 / 0.75)" }}
              data-ocid="final_cta.phone_link"
            >
              <Phone
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.62 0.19 60)" }}
              />
              8667858430
            </a>
            <span
              className="hidden sm:block w-px h-4"
              style={{ background: "oklch(0.95 0.01 260 / 0.25)" }}
            />
            <a
              href="mailto:bigbucksinnovation@gmail.com"
              className="flex items-center gap-2 transition-smooth"
              style={{ color: "oklch(0.95 0.01 260 / 0.75)" }}
              data-ocid="final_cta.email_link"
            >
              <Mail
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.62 0.19 60)" }}
              />
              bigbucksinnovation@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
