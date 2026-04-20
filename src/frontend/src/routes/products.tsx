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
import { ArrowRight, ChevronRight, Leaf, Share2, Zap } from "lucide-react";
import { motion } from "motion/react";

const products: ProductCardData[] = [
  {
    id: "renewa",
    icon: Leaf,
    title: "RENEWA",
    badge: "Hardware Product",
    description:
      "LED Street Light engineered for energy efficiency and sustainability. RENEWA reduces municipal energy consumption by up to 70% with smart dimming, remote monitoring, and long-life components — bringing smart city infrastructure to Indian roads.",
    features: [
      "Energy efficient — up to 70% savings",
      "Smart dimming & remote monitoring",
      "Weatherproof industrial-grade design",
      "Municipality & smart city ready",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
    borderHover: "hover:border-primary/35",
    glowColor: "primary",
  },
  {
    id: "annam",
    icon: Share2,
    title: "ANNAM",
    badge: "SaaS Mobile App",
    description:
      "Redirecting Surplus Food to Wealth. ANNAM is a SaaS mobile app that connects food donors — restaurants, events, and households — with NGOs and communities in need. Turning food waste into social value through intelligent logistics and real-time matching.",
    features: [
      "Real-time food donor-recipient matching",
      "Logistics tracking & route optimization",
      "NGO and community onboarding portal",
      "Impact analytics and reporting dashboard",
    ],
    color: "text-accent",
    bg: "bg-accent/10",
    borderHover: "hover:border-accent/35",
    glowColor: "accent",
  },
  {
    id: "seyal",
    icon: Zap,
    title: "SEYAL",
    badge: "SaaS Mobile App",
    description:
      "Connects Students, Startups, Colleges, and Investors in one unified ecosystem. SEYAL is the platform where talent meets opportunity — enabling collaboration, mentorship, funding discovery, and project showcasing for India's next generation of innovators.",
    features: [
      "Student-startup collaboration network",
      "Investor discovery and pitch portal",
      "College and mentor onboarding",
      "Project showcase and feedback system",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
    borderHover: "hover:border-primary/35",
    glowColor: "primary",
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
              Products &amp; Services
            </Badge>

            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground mb-6 leading-tight">
              Technology Built for{" "}
              <span className="text-gradient-accent">Enterprise Impact</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
              3 flagship products and 10 specialized services — from IoT
              hardware and SaaS apps to web development, patent services, and
              R&D support.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 gap-2"
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

      {/* ── Flagship Products ── */}
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
            <Badge
              variant="outline"
              className="mb-4 border-accent/30 text-accent bg-accent/5 text-xs uppercase tracking-widest"
            >
              Flagship Products
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              3 Products Built for{" "}
              <span className="text-gradient-primary">Scale</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hardware innovation, food sustainability SaaS, and an ecosystem
              connector — each product addresses a real-world challenge.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-ocid="products.card_list"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid (10 services) ── */}
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
                products and services. From scoping to delivery — we own the
                outcome.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="px-10 gap-2 font-semibold text-sm"
                    style={{ background: "#F59E0B", color: "#111827" }}
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
