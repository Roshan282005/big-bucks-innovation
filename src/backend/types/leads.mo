import Common "common";

module {
  public type LeadStatus = { #New; #Contacted; #Qualified; #Closed };

  public type Lead = {
    id : Common.LeadId;
    var name : Text;
    var email : Text;
    var phone : Text;
    var company : Text;
    var status : LeadStatus;
    var source : Text;
    var notes : Text;
    created_at : Common.Timestamp;
    var updated_at : Common.Timestamp;
  };

  public type LeadPublic = {
    id : Common.LeadId;
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    status : LeadStatus;
    source : Text;
    notes : Text;
    created_at : Common.Timestamp;
    updated_at : Common.Timestamp;
  };

  public type CreateLeadPayload = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    status : LeadStatus;
    source : Text;
    notes : Text;
  };

  public type UpdateLeadPayload = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    status : LeadStatus;
    source : Text;
    notes : Text;
  };
};
