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
import { Navbar } from "./components/layout/Navbar";
import { ThemeToggle } from "./components/ThemeToggle";
import { AboutPage } from "@/routes/about";
import { CareersPage } from "@/routes/careers";
import { ContactPage } from "@/routes/contact";
import { ClientsPage } from "@/routes/dashboard/clients";
import { DashboardPage } from "@/routes/dashboard/index";
import { LeadsPage } from "@/routes/dashboard/leads";
import { ProjectsPage } from "@/routes/dashboard/projects";
import { ReportsPage } from "@/routes/dashboard/reports";
import { SettingsPage } from "@/routes/dashboard/settings";
import { TasksPage } from "@/routes/dashboard/tasks";
import { HomePage } from "@/routes/index";
import { LoginPage } from "@/routes/login";
import { OfficePage } from "@/routes/offices";
import { ProductsPage } from "@/routes/products";
import { RegisterPage } from "@/routes/register";

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <ThemeToggle />
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
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
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

// Dashboard routes
const dashboardRoute = createRoute({
  getParentRoute: () => dashboardGuard,
  path: "/dashboard",
  component: DashboardPage,
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
  loginRoute,
  registerRoute,
  officesRoute,
  dashboardGuard.addChildren([
    dashboardRoute,
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
