import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BarChart2, BookOpen, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

const insights = [
  {
    type: "Research",
    icon: Lightbulb,
    title: "AI in Public Sector: How Government Agencies Are Modernizing",
    snippet:
      "From smart city dashboards to predictive maintenance — explore how AI is reshaping government infrastructure across India.",
    date: "March 2026",
  },
  {
    type: "Report",
    icon: BarChart2,
    title: "LED Street Lighting Trends 2026: Smart, Solar & Energy-Efficient",
    snippet:
      "Our annual report analyzes adoption of smart lighting in Indian municipalities and the ROI of transitioning to LED infrastructure.",
    date: "February 2026",
  },
  {
    type: "Blog",
    icon: BookOpen,
    title:
      "Bridging the Gap: How SEYAL Connects Students, Startups & Investors",
    snippet:
      "A look at how platform-based connectivity is changing the innovation pipeline from campus to commercial success across India.",
    date: "January 2026",
  },
];

export function InsightsTeaser() {
  return (
    <section
      className="py-20 md:py-28 bg-background"
      data-ocid="insights.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Insights &amp; Resources
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Knowledge That Drives Strategy
            </h2>
          </div>
          <Link to="/about">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary hover:bg-primary/8 shrink-0"
              data-ocid="insights.view_all_button"
            >
              View All Resources <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/35 transition-smooth surface-subtle"
              data-ocid={`insights.card.${i + 1}`}
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary/70 to-accent/70" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5"
                  >
                    {item.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-smooth">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {item.snippet}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
