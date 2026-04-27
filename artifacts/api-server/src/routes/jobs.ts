import { Router, type Request, type Response } from "express";

const router: Router = Router();

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "FullTime" | "PartTime" | "Contract";
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

const jobs: JobPosting[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "IIT Delhi / Remote",
    type: "FullTime",
    description:
      "Build enterprise-grade web and mobile applications using React, Node.js, and cloud platforms.",
    requirements: [
      "3+ years of React or Node.js experience",
      "Familiarity with REST APIs and cloud deployment",
      "Strong communication skills",
    ],
    isActive: true,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "IoT Solutions Engineer",
    department: "Product",
    location: "New Delhi",
    type: "FullTime",
    description:
      "Design and ship IoT hardware-software integrations for smart energy and enterprise deployments.",
    requirements: [
      "Experience with embedded systems or IoT protocols (MQTT, Zigbee)",
      "Python or C++ skills",
      "Passion for sustainable technology",
    ],
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
