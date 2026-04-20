import List "mo:core/List";
import ContactLib "../lib/contact_submissions";
import ContactTypes "../types/contact_submissions";
import Common "../types/common";

mixin (
  contactSubmissions : List.List<ContactTypes.ContactSubmission>,
  counter : { var id : Nat },
) {
  // Public — anyone can submit
  public shared func submitContactForm(payload : ContactTypes.CreateContactSubmissionPayload) : async ContactTypes.ContactSubmission {
    let result = ContactLib.createContactSubmission(contactSubmissions, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared query ({ caller }) func listContactSubmissions(offset : Nat, limit : Nat) : async Common.PaginatedResult<ContactTypes.ContactSubmission> {
    assert not caller.isAnonymous();
    ContactLib.listContactSubmissions(contactSubmissions, { offset; limit });
  };

  public shared query ({ caller }) func getContactSubmission(id : Common.ContactSubmissionId) : async ?ContactTypes.ContactSubmission {
    assert not caller.isAnonymous();
    ContactLib.getContactSubmission(contactSubmissions, id);
  };

  public shared ({ caller }) func deleteContactSubmission(id : Common.ContactSubmissionId) : async Bool {
    assert not caller.isAnonymous();
    ContactLib.deleteContactSubmission(contactSubmissions, id);
  };
};
