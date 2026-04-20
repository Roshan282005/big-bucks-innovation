import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateTaskPayload {
    status: TaskStatus;
    title: string;
    description: string;
    assigned_to: UserId;
    due_date: string;
    priority: TaskPriority;
    project_id: ProjectId;
}
export type Timestamp = bigint;
export interface UserPublic {
    principal: UserId;
    name: string;
    role: Role;
    created_at: Timestamp;
    email: string;
}
export interface PaginatedResult_6 {
    total: bigint;
    items: Array<ClientPublic>;
}
export interface PaginatedResult_1 {
    total: bigint;
    items: Array<TaskPublic>;
}
export interface LeadPublic {
    id: LeadId;
    status: LeadStatus;
    updated_at: Timestamp;
    source: string;
    name: string;
    created_at: Timestamp;
    email: string;
    company: string;
    notes: string;
    phone: string;
}
export type LeadId = bigint;
export interface CreateContactSubmissionPayload {
    name: string;
    email: string;
    company: string;
    message: string;
    phone: string;
}
export type ContactSubmissionId = bigint;
export interface PaginatedResult_2 {
    total: bigint;
    items: Array<ProjectPublic>;
}
export interface ContactSubmission {
    id: ContactSubmissionId;
    name: string;
    created_at: Timestamp;
    email: string;
    company: string;
    message: string;
    phone: string;
}
export interface UpdateClientPayload {
    status: ClientStatus;
    company_name: string;
    email: string;
    contact_name: string;
    phone: string;
}
export interface CreateJobPostingPayload {
    title: string;
    description: string;
    is_active: boolean;
    department: string;
    requirements: string;
    location: string;
    job_type: JobType;
}
export interface PaginatedResult_5 {
    total: bigint;
    items: Array<ContactSubmission>;
}
export interface ProjectPublic {
    id: ProjectId;
    status: ProjectStatus;
    name: string;
    description: string;
    end_date: string;
    created_at: Timestamp;
    start_date: string;
    progress: bigint;
    client_id: ClientId;
    budget: bigint;
    owner_principal: UserId;
}
export interface TaskPublic {
    id: TaskId;
    status: TaskStatus;
    title: string;
    description: string;
    created_at: Timestamp;
    assigned_to: UserId;
    due_date: string;
    priority: TaskPriority;
    project_id: ProjectId;
}
export interface PaginatedResult {
    total: bigint;
    items: Array<UserPublic>;
}
export type JobPostingId = bigint;
export interface ClientPublic {
    id: ClientId;
    status: ClientStatus;
    company_name: string;
    created_at: Timestamp;
    email: string;
    contact_name: string;
    phone: string;
}
export interface JobPostingPublic {
    id: JobPostingId;
    title: string;
    description: string;
    created_at: Timestamp;
    is_active: boolean;
    department: string;
    requirements: string;
    location: string;
    job_type: JobType;
}
export interface UpdateUserProfilePayload {
    name: string;
    email: string;
}
export type ClientId = bigint;
export interface CreateProjectPayload {
    status: ProjectStatus;
    name: string;
    description: string;
    end_date: string;
    start_date: string;
    progress: bigint;
    client_id: ClientId;
    budget: bigint;
    owner_principal: UserId;
}
export interface UpdateJobPostingPayload {
    title: string;
    description: string;
    is_active: boolean;
    department: string;
    requirements: string;
    location: string;
    job_type: JobType;
}
export interface CreateTaskPayload {
    status: TaskStatus;
    title: string;
    description: string;
    assigned_to: UserId;
    due_date: string;
    priority: TaskPriority;
    project_id: ProjectId;
}
export interface UpdateProjectPayload {
    status: ProjectStatus;
    name: string;
    description: string;
    end_date: string;
    start_date: string;
    progress: bigint;
    client_id: ClientId;
    budget: bigint;
    owner_principal: UserId;
}
export interface UpdateLeadPayload {
    status: LeadStatus;
    source: string;
    name: string;
    email: string;
    company: string;
    notes: string;
    phone: string;
}
export type UserId = Principal;
export interface PaginatedResult_3 {
    total: bigint;
    items: Array<LeadPublic>;
}
export type TaskId = bigint;
export type ProjectId = bigint;
export interface CreateClientPayload {
    status: ClientStatus;
    company_name: string;
    email: string;
    contact_name: string;
    phone: string;
}
export interface PaginatedResult_4 {
    total: bigint;
    items: Array<JobPostingPublic>;
}
export interface CreateLeadPayload {
    status: LeadStatus;
    source: string;
    name: string;
    email: string;
    company: string;
    notes: string;
    phone: string;
}
export enum ClientStatus {
    Inactive = "Inactive",
    Prospect = "Prospect",
    Active = "Active"
}
export enum JobType {
    Contract = "Contract",
    PartTime = "PartTime",
    FullTime = "FullTime"
}
export enum LeadStatus {
    New = "New",
    Closed = "Closed",
    Contacted = "Contacted",
    Qualified = "Qualified"
}
export enum ProjectStatus {
    OnHold = "OnHold",
    Planning = "Planning",
    InProgress = "InProgress",
    Completed = "Completed"
}
export enum Role {
    member = "member",
    admin = "admin"
}
export enum TaskPriority {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum TaskStatus {
    Done = "Done",
    ToDo = "ToDo",
    InProgress = "InProgress"
}
export interface backendInterface {
    createClient(payload: CreateClientPayload): Promise<ClientPublic>;
    createJobPosting(payload: CreateJobPostingPayload): Promise<JobPostingPublic>;
    createLead(payload: CreateLeadPayload): Promise<LeadPublic>;
    createProject(payload: CreateProjectPayload): Promise<ProjectPublic>;
    createTask(payload: CreateTaskPayload): Promise<TaskPublic>;
    deleteClient(id: ClientId): Promise<boolean>;
    deleteContactSubmission(id: ContactSubmissionId): Promise<boolean>;
    deleteJobPosting(id: JobPostingId): Promise<boolean>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteProject(id: ProjectId): Promise<boolean>;
    deleteTask(id: TaskId): Promise<boolean>;
    getClient(id: ClientId): Promise<ClientPublic | null>;
    getContactSubmission(id: ContactSubmissionId): Promise<ContactSubmission | null>;
    getJobPosting(id: JobPostingId): Promise<JobPostingPublic | null>;
    getLead(id: LeadId): Promise<LeadPublic | null>;
    getMe(): Promise<UserPublic | null>;
    getProject(id: ProjectId): Promise<ProjectPublic | null>;
    getTask(id: TaskId): Promise<TaskPublic | null>;
    getUser(principal: UserId): Promise<UserPublic | null>;
    listClients(statusFilter: ClientStatus | null, offset: bigint, limit: bigint): Promise<PaginatedResult_6>;
    listContactSubmissions(offset: bigint, limit: bigint): Promise<PaginatedResult_5>;
    listJobPostings(activeOnly: boolean | null, offset: bigint, limit: bigint): Promise<PaginatedResult_4>;
    listLeads(statusFilter: LeadStatus | null, offset: bigint, limit: bigint): Promise<PaginatedResult_3>;
    listProjects(statusFilter: ProjectStatus | null, offset: bigint, limit: bigint): Promise<PaginatedResult_2>;
    listTasks(statusFilter: TaskStatus | null, offset: bigint, limit: bigint): Promise<PaginatedResult_1>;
    listUsers(offset: bigint, limit: bigint): Promise<PaginatedResult>;
    registerOrUpdateMe(name: string, email: string): Promise<UserPublic>;
    setUserRole(principal: UserId, role: Role): Promise<boolean>;
    submitContactForm(payload: CreateContactSubmissionPayload): Promise<ContactSubmission>;
    updateClient(id: ClientId, payload: UpdateClientPayload): Promise<boolean>;
    updateJobPosting(id: JobPostingId, payload: UpdateJobPostingPayload): Promise<boolean>;
    updateLead(id: LeadId, payload: UpdateLeadPayload): Promise<boolean>;
    updateMyProfile(payload: UpdateUserProfilePayload): Promise<boolean>;
    updateProject(id: ProjectId, payload: UpdateProjectPayload): Promise<boolean>;
    updateTask(id: TaskId, payload: UpdateTaskPayload): Promise<boolean>;
}
