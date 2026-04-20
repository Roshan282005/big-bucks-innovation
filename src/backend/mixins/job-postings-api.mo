import List "mo:core/List";
import JobLib "../lib/job_postings";
import JobTypes "../types/job_postings";
import Common "../types/common";

mixin (
  jobPostings : List.List<JobTypes.JobPosting>,
  counter : { var id : Nat },
) {
  // Public query — no auth required
  public shared query func listJobPostings(activeOnly : ?Bool, offset : Nat, limit : Nat) : async Common.PaginatedResult<JobTypes.JobPostingPublic> {
    JobLib.listJobPostings(jobPostings, activeOnly, { offset; limit });
  };

  public shared query func getJobPosting(id : Common.JobPostingId) : async ?JobTypes.JobPostingPublic {
    JobLib.getJobPosting(jobPostings, id);
  };

  public shared ({ caller }) func createJobPosting(payload : JobTypes.CreateJobPostingPayload) : async JobTypes.JobPostingPublic {
    assert not caller.isAnonymous();
    let result = JobLib.createJobPosting(jobPostings, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared ({ caller }) func updateJobPosting(id : Common.JobPostingId, payload : JobTypes.UpdateJobPostingPayload) : async Bool {
    assert not caller.isAnonymous();
    JobLib.updateJobPosting(jobPostings, id, payload);
  };

  public shared ({ caller }) func deleteJobPosting(id : Common.JobPostingId) : async Bool {
    assert not caller.isAnonymous();
    JobLib.deleteJobPosting(jobPostings, id);
  };
};
