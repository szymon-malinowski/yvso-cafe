import { Link } from "@tanstack/react-router";
import { useTheme } from "../olha/AppContext";

const navLinkClass =
  "rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-base-content transition-colors hover:border-base-content/15 hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 [&.active]:border-primary/70 [&.active]:bg-primary/70 [&.active]:text-primary-content [&.active]:shadow-sm";

type NavbarProps = {
  onNavigate?: () => void;
};

const Navbar = ({ onNavigate }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="nav grid w-full gap-2 md:flex md:items-center md:flex-wrap">
      <Link
        to="/"
        aria-label="Zur Startseite"
        className="inline-flex justify-self-start rounded-lg transition-colors hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 md:mr-auto"
        onClick={onNavigate}
      >
        <img
          src="/yvso_cafe_logo_final.svg"
          alt=""
          className="h-14 w-16 object-contain object-left"
        />
      </Link>

      <Link to="/about" className={navLinkClass} onClick={onNavigate}>
        Über uns
      </Link>

      <Link to="/reservations" className={navLinkClass} onClick={onNavigate}>
        Reservierung
      </Link>

      <Link to="/dashboard" className={navLinkClass} onClick={onNavigate}>
        Dashboard
      </Link>

      <button
        aria-label="Theme wechseln"
        className="w-fit shrink-0 justify-self-end rounded-lg border border-primary/80 bg-primary/75 px-4 py-2 text-sm font-bold text-primary-content shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
        type="button"
        onClick={toggleTheme}
      >
        {theme === "luxury" ? "Hell" : "Dunkel"}
      </button>
    </div>
  );
};

export default Navbar;
