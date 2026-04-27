import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";

export type JobTypeKey = "FullTime" | "PartTime" | "Contract";

const typeLabel: Record<JobTypeKey, string> = {
  FullTime: "Full-time",
  PartTime: "Part-time",
  Contract: "Contract",
};

const typeBadgeClass: Record<JobTypeKey, string> = {
  FullTime: "bg-primary/10 text-primary border-primary/20",
  PartTime: "bg-accent/10 text-accent border-accent/20",
  Contract: "bg-muted text-muted-foreground border-border",
};

export interface JobCardData {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: JobTypeKey;
  description: string;
  requirements: string;
}

interface JobCardProps {
  job: JobCardData;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-lg transition-smooth surface-elevated"
      data-ocid={`careers.job.${index + 1}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight truncate">
            {job.title}
          </h3>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 text-xs font-medium ${typeBadgeClass[job.job_type]}`}
        >
          {typeLabel[job.job_type]}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 mb-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Briefcase className="w-3.5 h-3.5 text-primary/70" />
          {job.department}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary/70" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-accent/70" />
          {typeLabel[job.job_type]}
        </span>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      {job.requirements && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.requirements
            .split(",")
            .slice(0, 3)
            .map((req) => (
              <span
                key={req}
                className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {req.trim()}
              </span>
            ))}
        </div>
      )}

      <a
        href={`/contact?subject=${encodeURIComponent(`Job Application: ${job.title}`)}`}
      >
        <Button
          size="sm"
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth group-hover:border-primary/50"
          data-ocid={`careers.apply_button.${index + 1}`}
        >
          Apply Now
          <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-smooth" />
        </Button>
      </a>
    </motion.div>
  );
}
