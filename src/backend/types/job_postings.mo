import Common "common";

module {
  public type JobType = { #FullTime; #PartTime; #Contract };

  public type JobPosting = {
    id : Common.JobPostingId;
    var title : Text;
    var department : Text;
    var location : Text;
    var job_type : JobType;
    var description : Text;
    var requirements : Text;
    var is_active : Bool;
    created_at : Common.Timestamp;
  };

  public type JobPostingPublic = {
    id : Common.JobPostingId;
    title : Text;
    department : Text;
    location : Text;
    job_type : JobType;
    description : Text;
    requirements : Text;
    is_active : Bool;
    created_at : Common.Timestamp;
  };

  public type CreateJobPostingPayload = {
    title : Text;
    department : Text;
    location : Text;
    job_type : JobType;
    description : Text;
    requirements : Text;
    is_active : Bool;
  };

  public type UpdateJobPostingPayload = {
    title : Text;
    department : Text;
    location : Text;
    job_type : JobType;
    description : Text;
    requirements : Text;
    is_active : Bool;
  };
};
