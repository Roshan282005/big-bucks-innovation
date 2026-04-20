import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { StatsStrip } from "@/components/home/StatsStrip";
import { TeamPreview } from "@/components/home/TeamPreview";
import { ValueProposition } from "@/components/home/ValueProposition";
import { PublicLayout } from "@/components/layout/PublicLayout";

export function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsStrip />
      <ProductsPreview />
      <ValueProposition />
      <InsightsTeaser />
      <PartnersSection />
      <TeamPreview />
      <FinalCTA />
    </PublicLayout>
  );
}
