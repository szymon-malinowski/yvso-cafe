/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Footer from "../components/szymon/Footer";
import Header from "../components/szymon/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors">
      <Header />

      <main className="min-h-[calc(100vh-65px)]">
        <Outlet />
      </main>

      <Footer />

      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRoute({ component: RootLayout });
