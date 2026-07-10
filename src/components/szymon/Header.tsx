import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-10 border-b border-base-300 bg-base-100/90 shadow-sm backdrop-blur">
      <nav
        className="mx-auto max-w-6xl px-4 py-3"
        aria-label="Hauptnavigation"
      >
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link
            to="/"
            className="text-base font-bold text-base-content"
            onClick={closeMenu}
          >
            Y.V.S.O. Café
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
          <Navbar onNavigate={closeMenu} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
