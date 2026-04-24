import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Leaf, Lightbulb, Network } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    icon: Lightbulb,
    title: "RENEWA",
    subtitle: "LED Street Light",
    description:
      "Smart, energy-efficient LED street lighting solution engineered for urban and rural infrastructure. Reduces energy consumption by up to 70% with intelligent control systems.",
    tag: "Hardware Product",
    accentClass: "bg-primary/10 text-primary",
  },
  {
    icon: Leaf,
    title: "ANNAM",
    subtitle: "SaaS Mobile App",
    description:
      "Redirecting Surplus Food to Wealth. Connects food donors, recipients, and logistics — turning waste into impact through real-time surplus food redistribution.",
    tag: "SaaS · Mobile",
    accentClass: "bg-accent/10 text-accent",
  },
  {
    icon: Network,
    title: "SEYAL",
    subtitle: "SaaS Mobile App",
    description:
      "Connects Students, Startups, Colleges and Investors. A unified platform that bridges the gap between academic talent, entrepreneurial ventures, and funding opportunities.",
    tag: "SaaS · Mobile",
    accentClass: "bg-primary/10 text-primary",
  },
];

export function ProductsPreview() {
  return (
    <section
      className="py-20 md:py-28 bg-background"
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Our Products
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Built for Real-World Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three flagship products solving critical problems across energy,
            food security, and student-startup connectivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: i * 0.12 }}
              className="group bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-lg transition-smooth surface-subtle flex flex-col"
              data-ocid={`products_preview.card.${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${product.accentClass} flex items-center justify-center mb-5 group-hover:scale-105 transition-smooth`}
              >
                <product.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                {product.tag}
              </span>
              <h3 className="font-display font-bold text-foreground text-xl mb-1 leading-snug">
                {product.title}
              </h3>
              <p className="text-sm font-semibold text-primary mb-3">
                {product.subtitle}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {product.description}
              </p>
              <div className="mt-5 pt-4 border-t border-border">
                <Link to="/products">
                  <span
                    className="text-xs font-semibold text-accent hover:text-accent/80 transition-smooth cursor-pointer"
                    data-ocid={`products_preview.learn_more.${i + 1}`}
                  >
                    Learn more →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="text-center mt-10"
        >
          <Link to="/products">
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/8 px-8"
              data-ocid="products_preview.view_all_button"
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
