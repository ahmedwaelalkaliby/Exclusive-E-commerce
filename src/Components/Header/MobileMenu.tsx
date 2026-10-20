import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface MobileMenuProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export default function MobileMenu({
  isAuthenticated,
  handleLogout,
}: MobileMenuProps) {
  return (
    <Nav className="flex-column w-100 text-center">

      <NavLink
        to="/"
        className="nav-link py-3 w-100 border-bottom"
      >
        Home
      </NavLink>

      <NavLink
        to="/Products"
        className="nav-link py-3 w-100 border-bottom"
      >
        Products
        </NavLink>
          
      <NavLink
        to="/Contact"
        className="nav-link py-3 w-100 border-bottom"
      >
        Contact
    </NavLink>

      <NavLink
        to="/About"
        className="nav-link py-3 w-100 border-bottom"
      >
        About
      </NavLink>

      {!isAuthenticated ? (
        <NavLink
          to="/signup"
          className="nav-link py-3 w-100"
        >
          Sign Up
        </NavLink>
      ) : (
        <button
          className="btn btn-link text-dark text-decoration-none py-3 w-100"
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </Nav>
  );
}
