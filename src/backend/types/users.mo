import Common "common";

module {
  public type Role = { #admin; #member };

  public type User = {
    principal : Common.UserId;
    var name : Text;
    var email : Text;
    var role : Role;
    created_at : Common.Timestamp;
  };

  public type UserPublic = {
    principal : Common.UserId;
    name : Text;
    email : Text;
    role : Role;
    created_at : Common.Timestamp;
  };

  public type UpdateUserProfilePayload = {
    name : Text;
    email : Text;
  };
};
