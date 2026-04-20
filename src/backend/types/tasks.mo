import Common "common";

module {
  public type TaskStatus = { #ToDo; #InProgress; #Done };
  public type TaskPriority = { #Low; #Medium; #High };

  public type Task = {
    id : Common.TaskId;
    var project_id : Common.ProjectId;
    var title : Text;
    var description : Text;
    var assigned_to : Common.UserId;
    var due_date : Text;
    var status : TaskStatus;
    var priority : TaskPriority;
    created_at : Common.Timestamp;
  };

  public type TaskPublic = {
    id : Common.TaskId;
    project_id : Common.ProjectId;
    title : Text;
    description : Text;
    assigned_to : Common.UserId;
    due_date : Text;
    status : TaskStatus;
    priority : TaskPriority;
    created_at : Common.Timestamp;
  };

  public type CreateTaskPayload = {
    project_id : Common.ProjectId;
    title : Text;
    description : Text;
    assigned_to : Common.UserId;
    due_date : Text;
    status : TaskStatus;
    priority : TaskPriority;
  };

  public type UpdateTaskPayload = {
    project_id : Common.ProjectId;
    title : Text;
    description : Text;
    assigned_to : Common.UserId;
    due_date : Text;
    status : TaskStatus;
    priority : TaskPriority;
  };
};
