import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@tanstack/react-router";
import { motion } from "motion/react";

export function ContactPage() {
  // Read optional ?subject= query param (pre-fills form — used by careers Apply Now)
  const search = useSearch({ strict: false }) as Record<string, string>;
  const subject =
    typeof search?.subject === "string" ? search.subject : undefined;

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden bg-gradient-to-b from-card to-background border-b border-border"
        data-ocid="contact.hero_section"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-5 border-primary/40 text-primary bg-primary/5 px-4 py-1.5"
            >
              Contact Us
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Start a <span className="text-gradient-accent">Conversation</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're exploring enterprise solutions, planning a
              partnership, or just have a question — our team is ready to help.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: "5,000+", label: "Students Trained" },
              { value: "15", label: "Active Members" },
              { value: "10+", label: "MOUs Signed" },
              { value: "35", label: "Projects Completed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main split layout */}
      <section className="py-16 bg-background" data-ocid="contact.section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2" data-ocid="contact.info_panel">
              <ContactInfo />
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3" data-ocid="contact.form_panel">
              <div className="mb-5">
                <h2 className="font-display font-bold text-2xl text-foreground mb-1.5">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-sm">
                  Fill out the form below and we'll be in touch shortly.
                </p>
              </div>
              <ContactForm defaultSubject={subject} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm"
          >
            Prefer to reach us directly?{" "}
            <a
              href="tel:8667858430"
              className="text-primary font-medium hover:underline"
              data-ocid="contact.phone_link"
            >
              +91 86678 58430
            </a>{" "}
            or{" "}
            <a
              href="mailto:bigbucksinnovation@gmail.com"
              className="text-primary font-medium hover:underline"
              data-ocid="contact.email_link"
            >
              bigbucksinnovation@gmail.com
            </a>
          </motion.p>
        </div>
      </section>
    </PublicLayout>
  );
}
