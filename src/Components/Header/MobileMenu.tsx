import { NavLink } from 'react-router-dom';

interface MobileMenuProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export default function MobileMenu({ isAuthenticated, handleLogout }: MobileMenuProps) {
  const linkClass = 'border-b border-slate-100 py-3 text-sm text-slate-800 hover:text-red-600';
  return (
    <nav className="flex flex-col text-center">
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/products" className={linkClass}>Products</NavLink>
      <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      <NavLink to="/about" className={linkClass}>About</NavLink>
      {!isAuthenticated ? <NavLink to="/signup" className={linkClass}>Sign Up</NavLink> : <button type="button" onClick={handleLogout} className={linkClass}>Log Out</button>}
    </nav>
  );
}
