import Common "common";

module {
  public type ClientStatus = { #Active; #Inactive; #Prospect };

  public type Client = {
    id : Common.ClientId;
    var company_name : Text;
    var contact_name : Text;
    var email : Text;
    var phone : Text;
    var status : ClientStatus;
    created_at : Common.Timestamp;
  };

  public type ClientPublic = {
    id : Common.ClientId;
    company_name : Text;
    contact_name : Text;
    email : Text;
    phone : Text;
    status : ClientStatus;
    created_at : Common.Timestamp;
  };

  public type CreateClientPayload = {
    company_name : Text;
    contact_name : Text;
    email : Text;
    phone : Text;
    status : ClientStatus;
  };

  public type UpdateClientPayload = {
    company_name : Text;
    contact_name : Text;
    email : Text;
    phone : Text;
    status : ClientStatus;
  };
};
