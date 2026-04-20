import List "mo:core/List";
import ProjectLib "../lib/projects";
import ProjectTypes "../types/projects";
import Common "../types/common";

mixin (
  projects : List.List<ProjectTypes.Project>,
  counter : { var id : Nat },
) {
  public shared query ({ caller }) func listProjects(statusFilter : ?ProjectTypes.ProjectStatus, offset : Nat, limit : Nat) : async Common.PaginatedResult<ProjectTypes.ProjectPublic> {
    assert not caller.isAnonymous();
    ProjectLib.listProjects(projects, statusFilter, { offset; limit });
  };

  public shared query ({ caller }) func getProject(id : Common.ProjectId) : async ?ProjectTypes.ProjectPublic {
    assert not caller.isAnonymous();
    ProjectLib.getProject(projects, id);
  };

  public shared ({ caller }) func createProject(payload : ProjectTypes.CreateProjectPayload) : async ProjectTypes.ProjectPublic {
    assert not caller.isAnonymous();
    let result = ProjectLib.createProject(projects, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared ({ caller }) func updateProject(id : Common.ProjectId, payload : ProjectTypes.UpdateProjectPayload) : async Bool {
    assert not caller.isAnonymous();
    ProjectLib.updateProject(projects, id, payload);
  };

  public shared ({ caller }) func deleteProject(id : Common.ProjectId) : async Bool {
    assert not caller.isAnonymous();
    ProjectLib.deleteProject(projects, id);
  };
};
