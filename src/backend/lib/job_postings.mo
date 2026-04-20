import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/job_postings";
import Common "../types/common";

module {
  public func toPublic(posting : Types.JobPosting) : Types.JobPostingPublic {
    {
      id = posting.id;
      title = posting.title;
      department = posting.department;
      location = posting.location;
      job_type = posting.job_type;
      description = posting.description;
      requirements = posting.requirements;
      is_active = posting.is_active;
      created_at = posting.created_at;
    };
  };

  public func listJobPostings(
    postings : List.List<Types.JobPosting>,
    activeOnly : ?Bool,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.JobPostingPublic> {
    let filtered = switch (activeOnly) {
      case null { postings };
      case (?true) { postings.filter(func(p) { p.is_active }) };
      case (?false) { postings.filter(func(p) { not p.is_active }) };
    };
    let all = filtered.values().map(toPublic).toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getJobPosting(
    postings : List.List<Types.JobPosting>,
    id : Common.JobPostingId,
  ) : ?Types.JobPostingPublic {
    switch (postings.find(func(p) { p.id == id })) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func createJobPosting(
    postings : List.List<Types.JobPosting>,
    nextId : Nat,
    payload : Types.CreateJobPostingPayload,
  ) : Types.JobPostingPublic {
    let posting : Types.JobPosting = {
      id = nextId;
      var title = payload.title;
      var department = payload.department;
      var location = payload.location;
      var job_type = payload.job_type;
      var description = payload.description;
      var requirements = payload.requirements;
      var is_active = payload.is_active;
      created_at = Time.now();
    };
    postings.add(posting);
    toPublic(posting);
  };

  public func updateJobPosting(
    postings : List.List<Types.JobPosting>,
    id : Common.JobPostingId,
    payload : Types.UpdateJobPostingPayload,
  ) : Bool {
    switch (postings.find(func(p) { p.id == id })) {
      case (?p) {
        p.title := payload.title;
        p.department := payload.department;
        p.location := payload.location;
        p.job_type := payload.job_type;
        p.description := payload.description;
        p.requirements := payload.requirements;
        p.is_active := payload.is_active;
        true;
      };
      case null { false };
    };
  };

  public func deleteJobPosting(
    postings : List.List<Types.JobPosting>,
    id : Common.JobPostingId,
  ) : Bool {
    let sizeBefore = postings.size();
    let filtered = postings.filter(func(p) { p.id != id });
    postings.clear();
    postings.append(filtered);
    postings.size() < sizeBefore;
  };
};
