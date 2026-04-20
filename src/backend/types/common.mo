module {
  public type Timestamp = Int;
  public type UserId = Principal;
  public type LeadId = Nat;
  public type ClientId = Nat;
  public type ProjectId = Nat;
  public type TaskId = Nat;
  public type ContactSubmissionId = Nat;
  public type JobPostingId = Nat;

  public type PaginationParams = {
    offset : Nat;
    limit : Nat;
  };

  public type PaginatedResult<T> = {
    items : [T];
    total : Nat;
  };
};
