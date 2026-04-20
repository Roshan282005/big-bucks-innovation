import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/users";
import Common "../types/common";

module {
  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      principal = user.principal;
      name = user.name;
      email = user.email;
      role = user.role;
      created_at = user.created_at;
    };
  };

  public func getUser(
    users : Map.Map<Common.UserId, Types.User>,
    principal : Common.UserId,
  ) : ?Types.UserPublic {
    switch (users.get(principal)) {
      case (?u) { ?toPublic(u) };
      case null { null };
    };
  };

  public func listUsers(
    users : Map.Map<Common.UserId, Types.User>,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.UserPublic> {
    let all = users.values().map(toPublic).toArray();
    let total = all.size();
    let start = pagination.offset;
    let end_ = pagination.offset + pagination.limit;
    let items = all.sliceToArray(start, end_);
    { items; total };
  };

  public func upsertUser(
    users : Map.Map<Common.UserId, Types.User>,
    principal : Common.UserId,
    name : Text,
    email : Text,
  ) : () {
    switch (users.get(principal)) {
      case (?existing) {
        existing.name := name;
        existing.email := email;
      };
      case null {
        let newUser : Types.User = {
          principal;
          var name;
          var email;
          var role = #member;
          created_at = Time.now();
        };
        users.add(principal, newUser);
      };
    };
  };

  public func updateUserProfile(
    users : Map.Map<Common.UserId, Types.User>,
    principal : Common.UserId,
    payload : Types.UpdateUserProfilePayload,
  ) : Bool {
    switch (users.get(principal)) {
      case (?u) {
        u.name := payload.name;
        u.email := payload.email;
        true;
      };
      case null { false };
    };
  };

  public func setUserRole(
    users : Map.Map<Common.UserId, Types.User>,
    principal : Common.UserId,
    role : Types.Role,
  ) : Bool {
    switch (users.get(principal)) {
      case (?u) {
        u.role := role;
        true;
      };
      case null { false };
    };
  };

  public func isAdmin(
    users : Map.Map<Common.UserId, Types.User>,
    principal : Common.UserId,
  ) : Bool {
    switch (users.get(principal)) {
      case (?u) { u.role == #admin };
      case null { false };
    };
  };
};
