import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export interface ProductCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  badge: string;
  description: string;
  features: string[];
  color: string;
  bg: string;
  borderHover: string;
  glowColor: string;
}

interface ProductCardProps {
  product: ProductCardData;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { icon: Icon } = product;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={[
        "group relative bg-card border border-border",
        product.borderHover,
        "rounded-2xl p-7 transition-smooth surface-elevated overflow-hidden cursor-default",
      ].join(" ")}
      data-ocid={`products.${product.id}_card`}
    >
      {/* Ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 0% 0%, oklch(var(--${product.glowColor}) / 0.06), transparent)`,
        }}
      />

      {/* Icon badge */}
      <div
        className={`relative w-14 h-14 rounded-xl ${product.bg} flex items-center justify-center mb-6`}
      >
        <Icon className={`w-7 h-7 ${product.color}`} strokeWidth={1.75} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-display font-bold text-xl text-foreground leading-tight">
          {product.title}
        </h3>
        <Badge
          variant="outline"
          className={`text-xs border-current ${product.color} bg-transparent shrink-0`}
        >
          {product.badge}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Feature list */}
      <ul className="space-y-2.5 mb-7">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-foreground/75"
          >
            <CheckCircle
              className={`w-4 h-4 ${product.color} flex-shrink-0 mt-0.5`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant="ghost"
        size="sm"
        className={`${product.color} hover:${product.bg} gap-1.5 px-0 font-medium group/btn`}
        data-ocid={`products.${product.id}_learn_more`}
      >
        Learn More
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </Button>
    </motion.article>
  );
}
