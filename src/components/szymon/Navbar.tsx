import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
