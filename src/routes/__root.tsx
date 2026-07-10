/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import { useTheme } from "../components/olha/AppContext";

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-base-content/75 transition-colors hover:bg-base-300 hover:text-base-content [&.active]:bg-primary [&.active]:text-primary-content";

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors">
      <header className="sticky top-0 z-10 border-b border-base-300 bg-base-100/90 shadow-sm backdrop-blur">
        <nav
          className="mx-auto max-w-6xl px-4 py-3"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-3 md:hidden">
            <Link
              to="/"
              className="text-base font-bold text-base-content"
              onClick={closeMenu}
            >
              YVSO Café
            </Link>

            <button
              aria-controls="site-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              className="burger-button"
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>

          <div
            id="site-menu"
            className={`${isMenuOpen ? "grid" : "hidden"} mt-3 gap-2 md:mt-0 md:flex md:items-center md:justify-between`}
          >
            <div className="grid gap-2 md:flex md:flex-wrap">
              <Link to="/" className={navLinkClass} onClick={closeMenu}>
                Home
              </Link>

              <Link to="/about" className={navLinkClass} onClick={closeMenu}>
                Über uns
              </Link>

              <Link
                to="/reservations"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Reservierung
              </Link>

              <Link
                to="/dashboard"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </div>

            <button
              aria-label="Theme wechseln"
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/80 md:w-fit"
              type="button"
              onClick={toggleTheme}
            >
              {theme === "luxury" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
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
