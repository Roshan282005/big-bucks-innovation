// ──────────────────────────────────────────────
// Domain types matching backend contracts
// ──────────────────────────────────────────────

export type UserId = string;
export type LeadId = string;
export type ClientId = string;
export type ProjectId = string;
export type TaskId = string;
export type ContactSubmissionId = string;
export type JobPostingId = string;

export type Role = "admin" | "member";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";
export type ClientStatus = "Active" | "Inactive" | "Prospect";
export type ProjectStatus = "Planning" | "InProgress" | "OnHold" | "Completed";
export type TaskStatus = "ToDo" | "InProgress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";
export type JobType = "FullTime" | "PartTime" | "Contract";

export interface Lead {
  id: LeadId;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: ClientId;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  address: string;
  industry: string;
  createdAt: string;
}

export interface Project {
  id: ProjectId;
  title: string;
  description: string;
  clientId: ClientId;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  createdAt: string;
}

export interface Task {
  id: TaskId;
  title: string;
  description: string;
  projectId: ProjectId;
  assigneeId: UserId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: ContactSubmissionId;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdAt: string;
}

export interface JobPosting {
  id: JobPostingId;
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatsCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}
