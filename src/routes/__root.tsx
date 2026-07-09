/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTheme } from "../components/olha/AppContext";

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-base-content/75 transition-colors hover:bg-base-300 hover:text-base-content [&.active]:bg-primary [&.active]:text-primary-content";

const RootLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors">
      <header className="sticky top-0 z-10 border-b border-base-300 bg-base-100/90 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>

            <Link to="/about" className={navLinkClass}>
              About
            </Link>

            <Link to="/reservations" className={navLinkClass}>
              Reservierung
            </Link>

            <Link to="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          </div>

          <button
            aria-label="Theme wechseln"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/80 sm:w-fit"
            type="button"
            onClick={toggleTheme}
          >
            {theme === "luxury" ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
      </header>

      <main className="min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
