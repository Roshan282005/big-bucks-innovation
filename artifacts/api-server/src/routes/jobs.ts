import { Router, type Request, type Response } from "express";

const router: Router = Router();

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: "FullTime" | "PartTime" | "Contract";
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
}

const jobs: JobPosting[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "IIT Delhi / Remote",
    job_type: "FullTime",
    description:
      "Build enterprise-grade web and mobile applications using React, Node.js, and cloud platforms.",
    requirements: "3+ years React or Node.js, REST APIs, cloud deployment, strong communication",
    isActive: true,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "IoT Solutions Engineer",
    department: "Product",
    location: "New Delhi",
    job_type: "FullTime",
    description:
      "Design and ship IoT hardware-software integrations for smart energy and enterprise deployments.",
    requirements: "Embedded systems or IoT protocols (MQTT/Zigbee), Python or C++, sustainable tech passion",
    isActive: true,
    createdAt: "2025-01-15T00:00:00.000Z",
  },
];

router.get("/jobs", (req: Request, res: Response) => {
  const active = req.query.active;
  const result = active === "true" ? jobs.filter((j) => j.isActive) : jobs;
  res.json(result);
});

export default router;
