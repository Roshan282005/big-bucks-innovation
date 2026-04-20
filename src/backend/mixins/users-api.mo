import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import UserLib "../lib/users";
import UserTypes "../types/users";
import Common "../types/common";

mixin (
  users : Map.Map<Common.UserId, UserTypes.User>,
  counter : { var id : Nat },
) {
  public shared query ({ caller }) func getMe() : async ?UserTypes.UserPublic {
    UserLib.getUser(users, caller);
  };

  public shared ({ caller }) func registerOrUpdateMe(name : Text, email : Text) : async UserTypes.UserPublic {
    UserLib.upsertUser(users, caller, name, email);
    switch (UserLib.getUser(users, caller)) {
      case (?u) { u };
      case null { Runtime.trap("User not found after upsert") };
    };
  };

  public shared ({ caller }) func updateMyProfile(payload : UserTypes.UpdateUserProfilePayload) : async Bool {
    UserLib.updateUserProfile(users, caller, payload);
  };

  public shared query ({ caller }) func getUser(principal : Common.UserId) : async ?UserTypes.UserPublic {
    assert UserLib.isAdmin(users, caller);
    UserLib.getUser(users, principal);
  };

  public shared query ({ caller }) func listUsers(offset : Nat, limit : Nat) : async Common.PaginatedResult<UserTypes.UserPublic> {
    assert UserLib.isAdmin(users, caller);
    UserLib.listUsers(users, { offset; limit });
  };

  public shared ({ caller }) func setUserRole(principal : Common.UserId, role : UserTypes.Role) : async Bool {
    assert UserLib.isAdmin(users, caller);
    UserLib.setUserRole(users, principal, role);
  };
};
