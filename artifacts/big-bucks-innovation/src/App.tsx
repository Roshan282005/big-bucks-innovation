import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AboutPage } from "@/routes/about";
import { CareersPage } from "@/routes/careers";
import { ContactPage } from "@/routes/contact";
import { ClientsPage } from "@/routes/dashboard/clients";
import { LeadsPage } from "@/routes/dashboard/leads";
import { ProjectsPage } from "@/routes/dashboard/projects";
import { ReportsPage } from "@/routes/dashboard/reports";
import { SettingsPage } from "@/routes/dashboard/settings";
import { TasksPage } from "@/routes/dashboard/tasks";
import { HomePage } from "@/routes/index";
import { OfficePage } from "@/routes/offices";
import { ProductsPage } from "@/routes/products";
import { RegisterPage } from "@/routes/register";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/careers",
  component: CareersPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const officesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offices",
  component: OfficePage,
});
const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/leads",
  component: LeadsPage,
});
const clientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/clients",
  component: ClientsPage,
});
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/projects",
  component: ProjectsPage,
});
const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/tasks",
  component: TasksPage,
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/reports",
  component: ReportsPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  aboutRoute,
  careersRoute,
  contactRoute,
  registerRoute,
  officesRoute,
  leadsRoute,
  clientsRoute,
  projectsRoute,
  tasksRoute,
  reportsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}