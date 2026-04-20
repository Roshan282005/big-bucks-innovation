import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Cloud, Network, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    icon: Network,
    title: "Networking",
    description:
      "Scalable, high-performance network infrastructure for enterprises, campuses, and government facilities.",
    tag: "Infrastructure",
    href: "/products",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "End-to-end cybersecurity: threat detection, endpoint protection, SOC monitoring, and compliance frameworks.",
    tag: "Cybersecurity",
    href: "/products",
  },
  {
    icon: Zap,
    title: "AI Solutions",
    description:
      "Intelligent automation, ML-powered analytics, and conversational AI platforms that accelerate decision-making.",
    tag: "Artificial Intelligence",
    href: "/products",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "Hybrid cloud architectures, managed cloud migration, DevOps pipelines, and 24/7 support.",
    tag: "Cloud",
    href: "/products",
  },
];

export function ProductsPreview() {
  return (
    <section
      className="py-20 md:py-24 bg-background"
      data-ocid="products_preview.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Products &amp; Solutions
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Technology Built for the Future
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From networking to AI — every solution is engineered for enterprise
            reliability and rapid deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg transition-smooth cursor-pointer"
              data-ocid={`products_preview.card.${i + 1}`}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-smooth">
                <product.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70 mb-2 block">
                {product.tag}
              </span>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2 leading-snug">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/products">
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 px-8"
              data-ocid="products_preview.view_all_button"
            >
              View All Solutions
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
