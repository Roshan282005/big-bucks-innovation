import List "mo:core/List";
import ClientLib "../lib/clients";
import ClientTypes "../types/clients";
import Common "../types/common";

mixin (
  clients : List.List<ClientTypes.Client>,
  counter : { var id : Nat },
) {
  public shared query ({ caller }) func listClients(statusFilter : ?ClientTypes.ClientStatus, offset : Nat, limit : Nat) : async Common.PaginatedResult<ClientTypes.ClientPublic> {
    assert not caller.isAnonymous();
    ClientLib.listClients(clients, statusFilter, { offset; limit });
  };

  public shared query ({ caller }) func getClient(id : Common.ClientId) : async ?ClientTypes.ClientPublic {
    assert not caller.isAnonymous();
    ClientLib.getClient(clients, id);
  };

  public shared ({ caller }) func createClient(payload : ClientTypes.CreateClientPayload) : async ClientTypes.ClientPublic {
    assert not caller.isAnonymous();
    let result = ClientLib.createClient(clients, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared ({ caller }) func updateClient(id : Common.ClientId, payload : ClientTypes.UpdateClientPayload) : async Bool {
    assert not caller.isAnonymous();
    ClientLib.updateClient(clients, id, payload);
  };

  public shared ({ caller }) func deleteClient(id : Common.ClientId) : async Bool {
    assert not caller.isAnonymous();
    ClientLib.deleteClient(clients, id);
  };
};
