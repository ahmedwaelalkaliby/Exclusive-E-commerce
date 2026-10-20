import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { toast } from '../../lib/toast';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition hover:text-red-600 ${isActive ? 'font-semibold text-red-600' : 'text-slate-800'}`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useAppSelector((state) => state.wishlist.items.length);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Successfully logged out!');
    setMenuOpen(false);
    navigate('/Login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full">
      <div className="bg-slate-950 px-4 py-2 text-center text-xs text-white sm:text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now
      </div>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 lg:px-8">
          <NavLink to="/" className="text-2xl font-bold tracking-tight text-slate-950">Exclusive</NavLink>
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            {!isAuthenticated ? <NavLink to="/signup" className={linkClass}>Sign Up</NavLink> : (
              <button type="button" onClick={handleLogout} className="text-sm text-slate-800 hover:text-red-600">Log Out</button>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <form className="hidden items-center rounded bg-slate-100 px-3 py-2 md:flex" onSubmit={(event) => event.preventDefault()}>
              <input type="search" placeholder="Search" aria-label="Search products" className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-500" />
              <button type="submit" aria-label="Submit search" className="text-slate-700"><AiOutlineSearch size={20} /></button>
            </form>
            <NavLink to="/wishlist" aria-label="Wishlist" className="relative text-slate-900 hover:text-red-600">
              <AiOutlineHeart size={23} />
              {wishlistQuantity > 0 && <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-red-600 px-1 text-center text-[10px] leading-4 text-white">{wishlistQuantity}</span>}
            </NavLink>
            <NavLink to="/cart" aria-label="Cart" className="relative text-slate-900 hover:text-red-600">
              <AiOutlineShoppingCart size={23} />
              {cartQuantity > 0 && <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-red-600 px-1 text-center text-[10px] leading-4 text-white">{cartQuantity}</span>}
            </NavLink>
            <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)} className="text-slate-900 lg:hidden">
              {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 lg:hidden">
            <NavLink to="/" onClick={closeMenu} className={linkClass}>Home</NavLink>
            <NavLink to="/products" onClick={closeMenu} className={linkClass}>Products</NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={linkClass}>Contact</NavLink>
            <NavLink to="/about" onClick={closeMenu} className={linkClass}>About</NavLink>
            {!isAuthenticated ? <NavLink to="/signup" onClick={closeMenu} className={linkClass}>Sign Up</NavLink> : (
              <button type="button" onClick={handleLogout} className="text-left text-sm text-slate-800">Log Out</button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
