import type { JobPostingPublic } from "@/backend.d.ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/lib/backend";
import { useQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { JobCard, type JobCardData, type JobTypeKey } from "./JobCard";

const FALLBACK_JOBS: JobCardData[] = [
  {
    id: "1",
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "New Delhi / Remote",
    job_type: "FullTime" as JobTypeKey,
    description:
      "Build and deploy machine learning pipelines for enterprise clients. Lead research initiatives and collaborate with cross-functional teams to integrate AI into products.",
    requirements: "5+ years ML, Python, TensorFlow/PyTorch, MLOps",
  },
  {
    id: "2",
    title: "Network Infrastructure Specialist",
    department: "Infrastructure",
    location: "New Delhi",
    job_type: "FullTime" as JobTypeKey,
    description:
      "Design and maintain enterprise network architectures for government and corporate clients, ensuring high availability and security compliance.",
    requirements: "CCNA/CCNP, SD-WAN, 4+ years networking",
  },
  {
    id: "3",
    title: "Business Development Manager",
    department: "Sales",
    location: "Bangalore / Remote",
    job_type: "FullTime" as JobTypeKey,
    description:
      "Drive enterprise sales and build strategic partnerships across verticals. Own the full sales cycle from prospecting to close in government and Fortune-500 accounts.",
    requirements: "B2B enterprise sales, 3+ years BD, Government sector",
  },
  {
    id: "4",
    title: "Cloud Solutions Architect",
    department: "Engineering",
    location: "Remote",
    job_type: "Contract" as JobTypeKey,
    description:
      "Design multi-cloud architectures for enterprise migration projects. Define reference architectures and work closely with clients on digital transformation roadmaps.",
    requirements: "AWS/Azure/GCP certified, 6+ years cloud, Enterprise",
  },
];

function mapBackendJob(job: JobPostingPublic): JobCardData {
  const validTypes: JobTypeKey[] = ["FullTime", "PartTime", "Contract"];
  const rawType = String(job.job_type);
  const jobType: JobTypeKey = validTypes.includes(rawType as JobTypeKey)
    ? (rawType as JobTypeKey)
    : "FullTime";

  return {
    id: String(job.id),
    title: job.title,
    department: job.department,
    location: job.location,
    job_type: jobType,
    description: job.description,
    requirements: job.requirements,
  };
}

export function JobListings() {
  const { actor, isFetching } = useActor();

  const { data, isLoading, isError } = useQuery<JobCardData[]>({
    queryKey: ["jobPostings", "active"],
    queryFn: async () => {
      if (!actor) return FALLBACK_JOBS;
      try {
        const result = await (
          actor as {
            listJobPostings: (
              a: boolean,
              b: bigint,
              c: bigint,
            ) => Promise<{ items: JobPostingPublic[] }>;
          }
        ).listJobPostings(true, BigInt(0), BigInt(50));
        const mapped = result.items.map(mapBackendJob);
        return mapped.length > 0 ? mapped : FALLBACK_JOBS;
      } catch {
        return FALLBACK_JOBS;
      }
    },
    enabled: !isFetching,
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
