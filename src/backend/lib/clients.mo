import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/clients";
import Common "../types/common";

module {
  public func toPublic(client : Types.Client) : Types.ClientPublic {
    {
      id = client.id;
      company_name = client.company_name;
      contact_name = client.contact_name;
      email = client.email;
      phone = client.phone;
      status = client.status;
      created_at = client.created_at;
    };
  };

  public func listClients(
    clients : List.List<Types.Client>,
    statusFilter : ?Types.ClientStatus,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.ClientPublic> {
    let filtered = switch (statusFilter) {
      case null { clients };
      case (?s) { clients.filter(func(c) { c.status == s }) };
    };
    let all = filtered.values().map(toPublic).toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getClient(
    clients : List.List<Types.Client>,
    id : Common.ClientId,
  ) : ?Types.ClientPublic {
    switch (clients.find(func(c) { c.id == id })) {
      case (?c) { ?toPublic(c) };
      case null { null };
    };
  };

  public func createClient(
    clients : List.List<Types.Client>,
    nextId : Nat,
    payload : Types.CreateClientPayload,
  ) : Types.ClientPublic {
    let client : Types.Client = {
      id = nextId;
      var company_name = payload.company_name;
      var contact_name = payload.contact_name;
      var email = payload.email;
      var phone = payload.phone;
      var status = payload.status;
      created_at = Time.now();
    };
    clients.add(client);
    toPublic(client);
  };

  public func updateClient(
    clients : List.List<Types.Client>,
    id : Common.ClientId,
    payload : Types.UpdateClientPayload,
  ) : Bool {
    switch (clients.find(func(c) { c.id == id })) {
      case (?c) {
        c.company_name := payload.company_name;
        c.contact_name := payload.contact_name;
        c.email := payload.email;
        c.phone := payload.phone;
        c.status := payload.status;
        true;
      };
      case null { false };
    };
  };

  public func deleteClient(
    clients : List.List<Types.Client>,
    id : Common.ClientId,
  ) : Bool {
    let sizeBefore = clients.size();
    let filtered = clients.filter(func(c) { c.id != id });
    clients.clear();
    clients.append(filtered);
    clients.size() < sizeBefore;
  };
};
