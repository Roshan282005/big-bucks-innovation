import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { JobCard, type JobCardData, type JobTypeKey } from "./JobCard";

const FALLBACK_JOBS: JobCardData[] = [
  {
    id: "1",
    title: "Co Founder ( Women )",
    department: "Leadership",
    location: "Chennai / Remote",
    job_type: "FullTime" as JobTypeKey,
    description:
      "We are looking for a passionate and driven woman co-founder to join our founding team. You will play a key role in shaping the company's vision, strategy, and growth across business, operations, or technology.",
    requirements: "Entrepreneurial mindset, leadership experience, strong communication skills",
  },
];

export function JobListings() {
  const { data, isLoading, isError } = useQuery<JobCardData[]>({
    queryKey: ["jobPostings", "active"],
    queryFn: async () => {
      try {
        const result = await apiClient.get("/api/jobs?active=true");
        return result.length > 0 ? result : FALLBACK_JOBS;
      } catch {
        return FALLBACK_JOBS;
      }
    },
    placeholderData: FALLBACK_JOBS,
  });

  const jobs = data ?? FALLBACK_JOBS;

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="careers.jobs_loading">
        {(["sk-1", "sk-2", "sk-3"] as const).map((skKey) => (
          <div
            key={skKey}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex justify-between mb-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex gap-3 mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && !isError && jobs.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="careers.jobs_empty_state"
      >
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-2">
          No open positions right now
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          We don't have active openings at the moment, but we're always looking
          for exceptional talent. Send your resume to{" "}
          <a
            href="mailto:bigbucksinnovation@gmail.com"
            className="text-primary hover:underline"
          >
            bigbucksinnovation@gmail.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="careers.jobs_list">
      {jobs.map((job, i) => (
        <JobCard key={job.id} job={job} index={i} />
      ))}
    </div>
  );
}