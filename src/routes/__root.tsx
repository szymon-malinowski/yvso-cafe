/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="flex flex-wrap gap-2 p-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>

      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>

      <Link to="/reservations" className="[&.active]:font-bold">
        Reservierung
      </Link>

      <Link to="/dashboard" className="[&.active]:font-bold">
        Dashboard
      </Link>
    </div>

    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
