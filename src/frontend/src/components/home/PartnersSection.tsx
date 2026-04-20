import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const partners = [
  { name: "IIT Delhi", category: "Academic Partner" },
  { name: "Govt. of India", category: "Government Funding" },
  { name: "MSME", category: "MOU Partner" },
  { name: "Startup India", category: "Certified Startup" },
  { name: "NASSCOM", category: "Tech Association" },
  { name: "CII", category: "Industry Partner" },
];

const trustSignals = [
  "ISO 27001 Security Certified",
  "Government Funded & Recognized",
  "10+ Active MOUs",
  "4+ Years of Innovation",
];

export function PartnersSection() {
  return (
    <section
      className="py-20 md:py-24 bg-muted/30 border-y border-border"
      data-ocid="partners.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Trusted Partners &amp; Affiliations
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            A Network Built on Trust
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From IIT research labs to government ministries — our partnerships
            validate our commitment to quality and impact.
          </p>
        </motion.div>

        {/* Partner grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-smooth"
              data-ocid={`partners.item.${i + 1}`}
            >
              <p className="font-display font-bold text-foreground text-sm mb-1">
                {partner.name}
              </p>
              <p className="text-[10px] text-muted-foreground leading-snug">
                {partner.category}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5"
        >
          {trustSignals.map((signal, i) => (
            <span
              key={signal}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-full px-4 py-2"
              data-ocid={`partners.trust.${i + 1}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              {signal}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
