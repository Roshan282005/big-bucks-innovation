import Map "mo:core/Map";
import List "mo:core/List";
import UserTypes "types/users";
import LeadTypes "types/leads";
import ClientTypes "types/clients";
import ProjectTypes "types/projects";
import TaskTypes "types/tasks";
import ContactTypes "types/contact_submissions";
import JobTypes "types/job_postings";
import Common "types/common";
import UsersMixin "mixins/users-api";
import LeadsMixin "mixins/leads-api";
import ClientsMixin "mixins/clients-api";
import ProjectsMixin "mixins/projects-api";
import TasksMixin "mixins/tasks-api";
import ContactsMixin "mixins/contact-submissions-api";
import JobsMixin "mixins/job-postings-api";

actor {
  // Users state
  let users = Map.empty<Common.UserId, UserTypes.User>();
  let userCounter = { var id : Nat = 0 };

  // Leads state
  let leads = List.empty<LeadTypes.Lead>();
  let leadCounter = { var id : Nat = 1 };

  // Clients state
  let clients = List.empty<ClientTypes.Client>();
  let clientCounter = { var id : Nat = 1 };

  // Projects state
  let projects = List.empty<ProjectTypes.Project>();
  let projectCounter = { var id : Nat = 1 };

  // Tasks state
  let tasks = List.empty<TaskTypes.Task>();
  let taskCounter = { var id : Nat = 1 };

  // Contact Submissions state
  let contactSubmissions = List.empty<ContactTypes.ContactSubmission>();
  let contactSubmissionCounter = { var id : Nat = 1 };

  // Job Postings state
  let jobPostings = List.empty<JobTypes.JobPosting>();
  let jobPostingCounter = { var id : Nat = 1 };

  // Include all domain mixins
  include UsersMixin(users, userCounter);
  include LeadsMixin(leads, leadCounter);
  include ClientsMixin(clients, clientCounter);
  include ProjectsMixin(projects, projectCounter);
  include TasksMixin(tasks, taskCounter);
  include ContactsMixin(contactSubmissions, contactSubmissionCounter);
  include JobsMixin(jobPostings, jobPostingCounter);
};
