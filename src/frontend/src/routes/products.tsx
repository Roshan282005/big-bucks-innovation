import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  ProductCard,
  type ProductCardData,
} from "@/components/products/ProductCard";
import { SolutionGrid } from "@/components/products/SolutionGrid";
import { WhyChooseUs } from "@/components/products/WhyChooseUs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Cloud,
  Network,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const products: ProductCardData[] = [
  {
    id: "networking",
    icon: Network,
    title: "Enterprise Networking",
    badge: "Infrastructure",
    description:
      "High-performance network architectures engineered for zero-downtime operations, massive throughput, and multi-site resilience — from campus LANs to global SD-WAN fabrics.",
    features: [
      "SD-WAN & WAN optimisation",
      "Enterprise switches & managed routers",
      "Network monitoring & real-time analytics",
      "Multi-site connectivity & load balancing",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
    borderHover: "hover:border-primary/35",
    glowColor: "primary",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Cybersecurity Suite",
    badge: "Protection",
    description:
      "Comprehensive threat detection, prevention, and automated response systems that safeguard endpoints, data, and identities across the entire enterprise perimeter.",
    features: [
      "Next-gen firewall & endpoint protection",
      "Zero-trust network access (ZTNA)",
      "Threat intelligence & SIEM integration",
      "Compliance automation (ISO 27001, GDPR)",
    ],
    color: "text-chart-2",
    bg: "bg-chart-2/10",
    borderHover: "hover:border-chart-2/35",
    glowColor: "chart-2",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions",
    badge: "Intelligence",
    description:
      "Intelligent automation and machine learning platforms that augment decision-making, streamline operations, and surface predictive insights from your enterprise data.",
    features: [
      "Predictive analytics & forecasting",
      "NLP, chatbots & conversational AI",
      "Robotic process automation (RPA)",
      "Computer vision & quality inspection",
    ],
    color: "text-accent",
    bg: "bg-accent/10",
    borderHover: "hover:border-accent/35",
    glowColor: "accent",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Infrastructure",
    badge: "Scalability",
    description:
      "Managed cloud services and proven migration strategies delivering cost efficiency, global availability, and DevOps-grade CI/CD pipelines at enterprise scale.",
    features: [
      "Cloud migration (lift-shift & re-architect)",
      "Multi-cloud & hybrid management",
      "Auto-scaling & cost optimisation",
      "DevOps toolchain & IaC provisioning",
    ],
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    borderHover: "hover:border-chart-3/35",
    glowColor: "chart-3",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products & Services", href: "/products" },
];

export function ProductsPage() {
  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-card to-background border-b border-border"
        data-ocid="products.hero_section"
      >
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(var(--primary) / 0.12), transparent)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-8"
            data-ocid="products.breadcrumb"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 opacity-50" />}
                {i < breadcrumbs.length - 1 ? (
                  <Link
                    to={crumb.href}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground/60">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/35 text-primary bg-primary/5 px-4 py-1 text-xs tracking-widest uppercase font-mono"
            >
              Products & Services
            </Badge>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 leading-tight">
              Technology Built for{" "}
              <span className="text-gradient-accent">Enterprise Impact</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
              Four core technology pillars — Networking, Security, AI, and Cloud
              — powering digital transformation across industries and
              institutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 gap-2 glow-cyan"
                  data-ocid="products.hero_cta"
                >
                  Get a Custom Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/40 px-8"
                onClick={() => {
                  document
                    .getElementById("products-grid")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="products.explore_button"
              >
                Explore Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Product Categories ── */}
      <section
        id="products-grid"
        className="py-20 bg-background"
        data-ocid="products.categories_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Core Product Categories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each pillar is a full-stack capability — from strategy and design
              to deployment and 24×7 managed operations.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-ocid="products.card_list"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions Grid ── */}
      <SolutionGrid />

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── Bottom CTA banner ── */}
      <section
        className="py-20 bg-gradient-to-r from-card via-card to-muted/40 border-t border-border relative overflow-hidden"
        data-ocid="products.cta_section"
      >
        <div
          className="absolute right-0 top-0 w-[500px] h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 100% 50%, oklch(var(--accent) / 0.07), transparent)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 border-accent/35 text-accent bg-accent/5 px-4 py-1 text-xs tracking-widest uppercase font-mono"
              >
                Let's Build Together
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-5">
                Need a Tailored Enterprise Solution?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Our architects design custom packages combining any of our
                products. From scoping to delivery — we own the outcome.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 gap-2 glow-accent font-semibold"
                    data-ocid="products.bottom_cta"
                  >
                    Talk to an Expert <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground px-8"
                    data-ocid="products.about_link"
                  >
                    About Big Bucks
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
