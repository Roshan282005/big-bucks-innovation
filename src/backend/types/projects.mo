import Common "common";

module {
  public type ProjectStatus = { #Planning; #InProgress; #OnHold; #Completed };

  public type Project = {
    id : Common.ProjectId;
    var client_id : Common.ClientId;
    var name : Text;
    var description : Text;
    var status : ProjectStatus;
    var start_date : Text;
    var end_date : Text;
    var budget : Nat;
    var owner_principal : Common.UserId;
    var progress : Nat;
    created_at : Common.Timestamp;
  };

  public type ProjectPublic = {
    id : Common.ProjectId;
    client_id : Common.ClientId;
    name : Text;
    description : Text;
    status : ProjectStatus;
    start_date : Text;
    end_date : Text;
    budget : Nat;
    owner_principal : Common.UserId;
    progress : Nat;
    created_at : Common.Timestamp;
  };

  public type CreateProjectPayload = {
    client_id : Common.ClientId;
    name : Text;
    description : Text;
    status : ProjectStatus;
    start_date : Text;
    end_date : Text;
    budget : Nat;
    owner_principal : Common.UserId;
    progress : Nat;
  };

  public type UpdateProjectPayload = {
    client_id : Common.ClientId;
    name : Text;
    description : Text;
    status : ProjectStatus;
    start_date : Text;
    end_date : Text;
    budget : Nat;
    owner_principal : Common.UserId;
    progress : Nat;
  };
};
