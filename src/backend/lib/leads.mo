import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/leads";
import Common "../types/common";

module {
  public func toPublic(lead : Types.Lead) : Types.LeadPublic {
    {
      id = lead.id;
      name = lead.name;
      email = lead.email;
      phone = lead.phone;
      company = lead.company;
      status = lead.status;
      source = lead.source;
      notes = lead.notes;
      created_at = lead.created_at;
      updated_at = lead.updated_at;
    };
  };

  public func listLeads(
    leads : List.List<Types.Lead>,
    statusFilter : ?Types.LeadStatus,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.LeadPublic> {
    let filtered = switch (statusFilter) {
      case null { leads };
      case (?s) { leads.filter(func(l) { l.status == s }) };
    };
    let all = filtered.values().map(toPublic).toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getLead(
    leads : List.List<Types.Lead>,
    id : Common.LeadId,
  ) : ?Types.LeadPublic {
    switch (leads.find(func(l) { l.id == id })) {
      case (?l) { ?toPublic(l) };
      case null { null };
    };
  };

  public func createLead(
    leads : List.List<Types.Lead>,
    nextId : Nat,
    payload : Types.CreateLeadPayload,
  ) : Types.LeadPublic {
    let now = Time.now();
    let lead : Types.Lead = {
      id = nextId;
      var name = payload.name;
      var email = payload.email;
      var phone = payload.phone;
      var company = payload.company;
      var status = payload.status;
      var source = payload.source;
      var notes = payload.notes;
      created_at = now;
      var updated_at = now;
    };
    leads.add(lead);
    toPublic(lead);
  };

  public func updateLead(
    leads : List.List<Types.Lead>,
    id : Common.LeadId,
    payload : Types.UpdateLeadPayload,
  ) : Bool {
    switch (leads.find(func(l) { l.id == id })) {
      case (?l) {
        l.name := payload.name;
        l.email := payload.email;
        l.phone := payload.phone;
        l.company := payload.company;
        l.status := payload.status;
        l.source := payload.source;
        l.notes := payload.notes;
        l.updated_at := Time.now();
        true;
      };
      case null { false };
    };
  };

  public func deleteLead(
    leads : List.List<Types.Lead>,
    id : Common.LeadId,
  ) : Bool {
    let sizeBefore = leads.size();
    let filtered = leads.filter(func(l) { l.id != id });
    leads.clear();
    leads.append(filtered);
    leads.size() < sizeBefore;
  };
};
