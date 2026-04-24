import { motion } from "motion/react";

const mouColleges = [
  "ST JOSEPHS INSTITUTE OF TECHNOLOGY CHENNAI",
  "ST JOSEPHS COLLEGE OF ENGINEERING CHENNAI",
  "CHENNAI INSTITUTE OF TECHNOLOGY",
  "SRI SAIRAM ENGINEERING COLLEGE",
  "SRI SAIRAM INSTITUTE OF TECHNOLOGY",
  "AARUPADAI VEEDU INSTITUTE OF TECHNOLOGY",
  "GLOBAL INSTITUTE OF ENGINEERING & TECHNOLOGY RANIPET",
  "ADHIPARASKATHI COLLEGE OF ENGINEERING & TECHNOLOGY RANIPET",
  "ARM COLLEGE OF ENGINEERING & TECHNOLOGY",
  "THANGAVELU ENGINEERING COLLEGE",
];

// Duplicate list for seamless loop
const marqueeItems = [...mouColleges, ...mouColleges];

export function PartnersSection() {
  return (
    <section
      className="py-20 md:py-28 bg-muted/30 border-y border-border overflow-hidden"
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Academic Network
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            MOU Partner Colleges
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Proud to collaborate with 10 leading engineering institutions across
            Tamil Nadu and India through formal MOU partnerships.
          </p>
        </motion.div>

        {/* College count badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-full px-6 py-2.5">
            <span className="font-display font-bold text-2xl text-primary">
              10
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              Active MOU Colleges
            </span>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </motion.div>

        {/* Marquee container */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-muted/30 to-transparent" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-muted/30 to-transparent" />

          <div
            className="flex gap-4 overflow-hidden"
            style={{ maskImage: "none" }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 32,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="flex gap-4 shrink-0"
            >
              {marqueeItems.map((college, i) => (
                <div
                  key={`${college}-loop-${Math.floor(i / mouColleges.length)}`}
                  className="shrink-0 bg-card border border-border rounded-xl px-5 py-3 flex items-center gap-3 hover:border-primary/35 transition-smooth surface-subtle"
                  data-ocid={
                    i < mouColleges.length
                      ? `partners.item.${i + 1}`
                      : undefined
                  }
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="font-display font-semibold text-sm text-foreground whitespace-nowrap">
                    {college}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
