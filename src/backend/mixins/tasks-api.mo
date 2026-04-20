import List "mo:core/List";
import TaskLib "../lib/tasks";
import TaskTypes "../types/tasks";
import Common "../types/common";

mixin (
  tasks : List.List<TaskTypes.Task>,
  counter : { var id : Nat },
) {
  public shared query ({ caller }) func listTasks(statusFilter : ?TaskTypes.TaskStatus, offset : Nat, limit : Nat) : async Common.PaginatedResult<TaskTypes.TaskPublic> {
    assert not caller.isAnonymous();
    TaskLib.listTasks(tasks, statusFilter, { offset; limit });
  };

  public shared query ({ caller }) func getTask(id : Common.TaskId) : async ?TaskTypes.TaskPublic {
    assert not caller.isAnonymous();
    TaskLib.getTask(tasks, id);
  };

  public shared ({ caller }) func createTask(payload : TaskTypes.CreateTaskPayload) : async TaskTypes.TaskPublic {
    assert not caller.isAnonymous();
    let result = TaskLib.createTask(tasks, counter.id, payload);
    counter.id += 1;
    result;
  };

  public shared ({ caller }) func updateTask(id : Common.TaskId, payload : TaskTypes.UpdateTaskPayload) : async Bool {
    assert not caller.isAnonymous();
    TaskLib.updateTask(tasks, id, payload);
  };

  public shared ({ caller }) func deleteTask(id : Common.TaskId) : async Bool {
    assert not caller.isAnonymous();
    TaskLib.deleteTask(tasks, id);
  };
};
