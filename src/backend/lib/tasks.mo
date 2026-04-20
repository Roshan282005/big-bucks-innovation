import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/tasks";
import Common "../types/common";

module {
  public func toPublic(task : Types.Task) : Types.TaskPublic {
    {
      id = task.id;
      project_id = task.project_id;
      title = task.title;
      description = task.description;
      assigned_to = task.assigned_to;
      due_date = task.due_date;
      status = task.status;
      priority = task.priority;
      created_at = task.created_at;
    };
  };

  public func listTasks(
    tasks : List.List<Types.Task>,
    statusFilter : ?Types.TaskStatus,
    pagination : Common.PaginationParams,
  ) : Common.PaginatedResult<Types.TaskPublic> {
    let filtered = switch (statusFilter) {
      case null { tasks };
      case (?s) { tasks.filter(func(t) { t.status == s }) };
    };
    let all = filtered.values().map(toPublic).toArray();
    let total = all.size();
    let items = all.sliceToArray(pagination.offset, pagination.offset + pagination.limit);
    { items; total };
  };

  public func getTask(
    tasks : List.List<Types.Task>,
    id : Common.TaskId,
  ) : ?Types.TaskPublic {
    switch (tasks.find(func(t) { t.id == id })) {
      case (?t) { ?toPublic(t) };
      case null { null };
    };
  };

  public func createTask(
    tasks : List.List<Types.Task>,
    nextId : Nat,
    payload : Types.CreateTaskPayload,
  ) : Types.TaskPublic {
    let task : Types.Task = {
      id = nextId;
      var project_id = payload.project_id;
      var title = payload.title;
      var description = payload.description;
      var assigned_to = payload.assigned_to;
      var due_date = payload.due_date;
      var status = payload.status;
      var priority = payload.priority;
      created_at = Time.now();
    };
    tasks.add(task);
    toPublic(task);
  };

  public func updateTask(
    tasks : List.List<Types.Task>,
    id : Common.TaskId,
    payload : Types.UpdateTaskPayload,
  ) : Bool {
    switch (tasks.find(func(t) { t.id == id })) {
      case (?t) {
        t.project_id := payload.project_id;
        t.title := payload.title;
        t.description := payload.description;
        t.assigned_to := payload.assigned_to;
        t.due_date := payload.due_date;
        t.status := payload.status;
        t.priority := payload.priority;
        true;
      };
      case null { false };
    };
  };

  public func deleteTask(
    tasks : List.List<Types.Task>,
    id : Common.TaskId,
  ) : Bool {
    let sizeBefore = tasks.size();
    let filtered = tasks.filter(func(t) { t.id != id });
    tasks.clear();
    tasks.append(filtered);
    tasks.size() < sizeBefore;
  };
};
