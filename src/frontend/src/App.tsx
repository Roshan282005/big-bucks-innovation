import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { Toaster } from 'sonner'
// Basic routes - to be expanded
import AboutPage from './routes/about'
import HomePage from './routes/index'
import UsersPage from './routes/users'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </>
  ),
})

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage })
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage })

const usersRoute = createRoute({ getParentRoute: () => rootRoute, path: '/users', component: UsersPage })

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, usersRoute])

const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
