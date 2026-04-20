import Common "common";

module {
  public type ContactSubmission = {
    id : Common.ContactSubmissionId;
    name : Text;
    email : Text;
    message : Text;
    company : Text;
    phone : Text;
    created_at : Common.Timestamp;
  };

  public type CreateContactSubmissionPayload = {
    name : Text;
    email : Text;
    message : Text;
    company : Text;
    phone : Text;
  };
};
