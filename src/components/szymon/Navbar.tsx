import { Link } from "@tanstack/react-router";
import { useTheme } from "../olha/AppContext";

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-base-content/75 transition-colors hover:bg-base-300 hover:text-base-content [&.active]:bg-primary [&.active]:text-primary-content";

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
        className="inline-flex justify-self-start rounded-lg transition-colors hover:bg-base-300 md:mr-auto"
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
        className="w-fit shrink-0 justify-self-end rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-content transition-colors hover:bg-primary/80"
        type="button"
        onClick={toggleTheme}
      >
        {theme === "luxury" ? "Hell" : "Dunkel"}
      </button>
    </div>
  );
};

export default Navbar;
