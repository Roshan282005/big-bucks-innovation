import { useAuthStore } from "@/store/auth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
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

// Root route — no global shell here; each page uses its own layout
// (PublicLayout for public pages, DashboardLayout for dashboard pages)
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  ),
});

// Public routes
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

// Dashboard guard
const dashboardGuard = createRoute({
  getParentRoute: () => rootRoute,
  id: "dashboard-guard",
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
  },
});
const leadsRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard/leads",
  component: LeadsPage,
});
const clientsRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard/clients",
  component: ClientsPage,
});
const projectsRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard/projects",
  component: ProjectsPage,
});
const tasksRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard/tasks",
  component: TasksPage,
});
const reportsRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard/reports",
  component: ReportsPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => dashboardGuard,
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
  dashboardGuard.addChildren([
    leadsRoute,
    clientsRoute,
    projectsRoute,
    tasksRoute,
    reportsRoute,
    settingsRoute,
  ]),
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
