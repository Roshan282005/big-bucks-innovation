import { Router, type Request, type Response } from "express";
import { randomUUID } from "crypto";
import { requireAuth } from "../middleware/requireAuth.js";

const router: Router = Router();

// ── In-memory stores (persists for the lifetime of the process) ──────────────
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  source: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "prospect";
  created_at: string;
  address?: string;
  industry?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status: "Planning" | "InProgress" | "OnHold" | "Completed";
  startDate: string;
  endDate: string;
  budget: number;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  status: "ToDo" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  createdAt: string;
}

const leads: Lead[] = [];
const clients: Client[] = [];
const projects: Project[] = [];
const tasks: Task[] = [];

// ── Leads ────────────────────────────────────────────────────────────────────
router.get("/leads", requireAuth, (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status ? leads.filter((l) => l.status === status) : leads;
  res.json(result);
});

router.post("/leads", requireAuth, (req: Request, res: Response) => {
  const lead: Lead = {
    id: randomUUID(),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  leads.push(lead);
  res.status(201).json(lead);
});

router.put("/leads/:id", requireAuth, (req: Request, res: Response) => {
  const idx = leads.findIndex((l) => l.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Lead not found" }); return; }
  leads[idx] = { ...leads[idx], ...req.body, updated_at: new Date().toISOString() };
  res.json(leads[idx]);
});

router.delete("/leads/:id", requireAuth, (req: Request, res: Response) => {
  const idx = leads.findIndex((l) => l.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Lead not found" }); return; }
  leads.splice(idx, 1);
  res.status(204).send();
});

// ── Clients ──────────────────────────────────────────────────────────────────
router.get("/clients", requireAuth, (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status ? clients.filter((c) => c.status === status) : clients;
  res.json(result);
});

router.post("/clients", requireAuth, (req: Request, res: Response) => {
  const client: Client = {
    id: randomUUID(),
    ...req.body,
    created_at: new Date().toISOString(),
  };
  clients.push(client);
  res.status(201).json(client);
});

router.put("/clients/:id", requireAuth, (req: Request, res: Response) => {
  const idx = clients.findIndex((c) => c.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Client not found" }); return; }
  clients[idx] = { ...clients[idx], ...req.body };
  res.json(clients[idx]);
});

router.delete("/clients/:id", requireAuth, (req: Request, res: Response) => {
  const idx = clients.findIndex((c) => c.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Client not found" }); return; }
  clients.splice(idx, 1);
  res.status(204).send();
});

// ── Projects ─────────────────────────────────────────────────────────────────
router.get("/projects", requireAuth, (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status ? projects.filter((p) => p.status === status) : projects;
  res.json(result);
});

router.post("/projects", requireAuth, (req: Request, res: Response) => {
  const project: Project = {
    id: randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  projects.push(project);
  res.status(201).json(project);
});

router.put("/projects/:id", requireAuth, (req: Request, res: Response) => {
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Project not found" }); return; }
  projects[idx] = { ...projects[idx], ...req.body };
  res.json(projects[idx]);
});

router.delete("/projects/:id", requireAuth, (req: Request, res: Response) => {
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Project not found" }); return; }
  projects.splice(idx, 1);
  res.status(204).send();
});

// ── Tasks ─────────────────────────────────────────────────────────────────────
router.get("/tasks", requireAuth, (req: Request, res: Response) => {
  const { status } = req.query;
  const result = status ? tasks.filter((t) => t.status === status) : tasks;
  res.json(result);
});

router.post("/tasks", requireAuth, (req: Request, res: Response) => {
  const task: Task = {
    id: randomUUID(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put("/tasks/:id", requireAuth, (req: Request, res: Response) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Task not found" }); return; }
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

router.delete("/tasks/:id", requireAuth, (req: Request, res: Response) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: "Task not found" }); return; }
  tasks.splice(idx, 1);
  res.status(204).send();
});

export default router;
