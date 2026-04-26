import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { StatsStrip } from "@/components/home/StatsStrip";
import { TeamPreview } from "@/components/home/TeamPreview";
import { ValueProposition } from "@/components/home/ValueProposition";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Award, Building2, MapPin, Trophy } from "lucide-react";
import { motion } from "motion/react";

const fundingGrants = [
  {
    amount: "Rs. 5 LAKHS",
    source: "IIT Delhi IHFC",
    type: "Grant",
    icon: Trophy,
    highlight: true,
  },
  {
    amount: "Rs. 3 LAKHS",
    source: "EDII Government of Tamil Nadu",
    type: "Grant",
    icon: Award,
    highlight: false,
  },
  {
    amount: "Rs. 3 LAKHS",
    source: "Maharashtra Pollution Control Board",
    type: "Cash Prize",
    icon: Award,
    highlight: false,
  },
  {
    amount: "Rs. 5 LAKHS",
    source: "NIT Srinagar Kashmir",
    type: "Equity Funding",
    icon: Trophy,
    highlight: true,
  },
  {
    amount: "Rs. 1 LAKH",
    source: "Chennai Institute of Technology",
    type: "Grant",
    icon: Award,
    highlight: false,
  },
  {
    amount: "Rs. 1 LAKH",
    source: "Anna Incubator Chennai",
    type: "Cash Prize",
    icon: Award,
    highlight: false,
  },
];

const branchOffices = [
  {
    label: "Head Office",
    location: "Thoraipakkam, Chennai",
    address:
      "No.14 Prabhu Nagar, Neelankarai Link Road, Thoraipakkam, Chennai – 600 097",
    badge: "HQ",
    badgeClass: "bg-primary/10 text-primary border-primary/25",
  },
  {
    label: "2nd Branch Office",
    location: "St Josephs Institute of Technology",
    address:
      "3rd Floor, Lab Block 1, St Josephs Institute of Technology, Semmancherry, Chennai – 600 119",
    badge: "Branch",
    badgeClass: "bg-accent/10 text-accent border-accent/25",
  },
];

function FundingSection() {
  return (
    <section
      className="py-20 md:py-28 bg-muted/30 border-y border-border"
      data-ocid="funding.section"
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
            Recognition &amp; Funding
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Funding Grants &amp; Awards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recognized and funded by prestigious government bodies, IITs, and
            leading institutions across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundingGrants.map((grant, i) => (
            <motion.div
              key={grant.source}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className={`group bg-card border rounded-2xl p-6 transition-smooth surface-subtle flex flex-col ${
                grant.highlight
                  ? "border-primary/35 hover:border-primary/55"
                  : "border-border hover:border-accent/35"
              }`}
              data-ocid={`funding.card.${i + 1}`}
            >
              {/* Top ribbon for highlighted */}
              {grant.highlight && (
                <div className="h-1 w-12 rounded-full bg-primary mb-4" />
              )}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    grant.highlight
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <grant.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest block mb-0.5 ${
                      grant.highlight ? "text-primary" : "text-accent"
                    }`}
                  >
                    {grant.type}
                  </span>
                  <p className="font-display font-bold text-xl text-foreground leading-tight">
                    {grant.amount}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {grant.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchOfficesSection() {
  return (
    <section
      className="py-20 md:py-28 bg-background"
      data-ocid="offices.section"
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
            Our Presence
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Branch Offices
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Strategically located to serve clients and collaborators across
            Chennai's technology and education corridors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-3xl mx-auto">
          {branchOffices.map((office, i) => (
            <motion.div
              key={office.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl p-7 hover:border-primary/35 transition-smooth surface-subtle"
              data-ocid={`offices.card.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-smooth">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest border rounded-full px-2.5 py-0.5 mb-1 ${office.badgeClass}`}
                  >
                    {office.badge}
                  </span>
                  <p className="font-display font-bold text-foreground text-sm leading-tight">
                    {office.label}
                  </p>
                </div>
              </div>
              <h3 className="font-display font-semibold text-foreground text-base mb-2 leading-snug">
                {office.location}
              </h3>
              <div className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{office.address}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <FundingSection />
      <BranchOfficesSection />
      <FinalCTA />
    </PublicLayout>
  );
}

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: HomePage,
});
