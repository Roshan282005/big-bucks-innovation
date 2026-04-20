import List "mo:core/List";
import LeadLib "../lib/leads";
import LeadTypes "../types/leads";
import Common "../types/common";

mixin (
  leads : List.List<LeadTypes.Lead>,
  counter : { var id : Nat },
) {
  public shared query ({ caller }) func listLeads(statusFilter : ?LeadTypes.LeadStatus, offset : Nat, limit : Nat) : async Common.PaginatedResult<LeadTypes.LeadPublic> {
    assert not caller.isAnonymous();
    LeadLib.listLeads(leads, statusFilter, { offset; limit });
  };

  public shared query ({ caller }) func getLead(id : Common.LeadId) : async ?LeadTypes.LeadPublic {
    assert not caller.isAnonymous();
    LeadLib.getLead(leads, id);
  };

  public shared ({ caller }) func createLead(payload : LeadTypes.CreateLeadPayload) : async LeadTypes.LeadPublic {
    assert not caller.isAnonymous();
    let result = LeadLib.createLead(leads, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared ({ caller }) func updateLead(id : Common.LeadId, payload : LeadTypes.UpdateLeadPayload) : async Bool {
    assert not caller.isAnonymous();
    LeadLib.updateLead(leads, id, payload);
  };

  public shared ({ caller }) func deleteLead(id : Common.LeadId) : async Bool {
    assert not caller.isAnonymous();
    LeadLib.deleteLead(leads, id);
  };
};
