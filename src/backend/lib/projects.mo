import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/projects";
import Common "../types/common";

module {
  public func toPublic(project : Types.Project) : Types.ProjectPublic {
    {
      id = project.id;
      client_id = project.client_id;
      name = project.name;
      description = project.description;
      status = project.status;
      start_date = project.start_date;
      end_date = project.end_date;
      budget = project.budget;
      owner_principal = project.owner_principal;
      progress = project.progress;
      created_at = project.created_at;
    };
  };

  public func listProjects(
    projects : List.List<Types.Project>,
    statusFilter : ?Types.ProjectStatus,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.ProjectPublic> {
    let filtered = switch (statusFilter) {
      case null { projects };
      case (?s) { projects.filter(func(p) { p.status == s }) };
    };
    let all = filtered.values().map(toPublic).toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getProject(
    projects : List.List<Types.Project>,
    id : Common.ProjectId,
  ) : ?Types.ProjectPublic {
    switch (projects.find(func(p) { p.id == id })) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func createProject(
    projects : List.List<Types.Project>,
    nextId : Nat,
    payload : Types.CreateProjectPayload,
  ) : Types.ProjectPublic {
    let project : Types.Project = {
      id = nextId;
      var client_id = payload.client_id;
      var name = payload.name;
      var description = payload.description;
      var status = payload.status;
      var start_date = payload.start_date;
      var end_date = payload.end_date;
      var budget = payload.budget;
      var owner_principal = payload.owner_principal;
      var progress = payload.progress;
      created_at = Time.now();
    };
    projects.add(project);
    toPublic(project);
  };

  public func updateProject(
    projects : List.List<Types.Project>,
    id : Common.ProjectId,
    payload : Types.UpdateProjectPayload,
  ) : Bool {
    switch (projects.find(func(p) { p.id == id })) {
      case (?p) {
        p.client_id := payload.client_id;
        p.name := payload.name;
        p.description := payload.description;
        p.status := payload.status;
        p.start_date := payload.start_date;
        p.end_date := payload.end_date;
        p.budget := payload.budget;
        p.owner_principal := payload.owner_principal;
        p.progress := payload.progress;
        true;
      };
      case null { false };
    };
  };

  public func deleteProject(
    projects : List.List<Types.Project>,
    id : Common.ProjectId,
  ) : Bool {
    let sizeBefore = projects.size();
    let filtered = projects.filter(func(p) { p.id != id });
    projects.clear();
    projects.append(filtered);
    projects.size() < sizeBefore;
  };
};
