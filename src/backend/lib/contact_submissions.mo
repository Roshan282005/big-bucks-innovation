import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Types "../types/contact_submissions";
import Common "../types/common";

module {
  public func listContactSubmissions(
    submissions : List.List<Types.ContactSubmission>,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.ContactSubmission> {
    let all = submissions.toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getContactSubmission(
    submissions : List.List<Types.ContactSubmission>,
    id : Common.ContactSubmissionId,
  ) : ?Types.ContactSubmission {
    submissions.find(func(s) { s.id == id });
  };

  public func createContactSubmission(
    submissions : List.List<Types.ContactSubmission>,
    nextId : Nat,
    payload : Types.CreateContactSubmissionPayload,
  ) : Types.ContactSubmission {
    let submission : Types.ContactSubmission = {
      id = nextId;
      name = payload.name;
      email = payload.email;
      message = payload.message;
      company = payload.company;
      phone = payload.phone;
      created_at = Time.now();
    };
    submissions.add(submission);
    submission;
  };

  public func deleteContactSubmission(
    submissions : List.List<Types.ContactSubmission>,
    id : Common.ContactSubmissionId,
  ) : Bool {
    let sizeBefore = submissions.size();
    let filtered = submissions.filter(func(s) { s.id != id });
    submissions.clear();
    submissions.append(filtered);
    submissions.size() < sizeBefore;
  };
};
