import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import MobileMenu from './MobileMenu';

export default function Header() {
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
    navigate('/Login');
  };

  return (
    <>
      <div className="bg-dark text-white py-2 text-center small w-100">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now
      </div>
      <Navbar expand="lg" bg="light" className="shadow-sm py-3 w-100">
        <Container fluid className="px-3 px-lg-5">
          <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">Exclusive</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto d-none d-lg-flex gap-4">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/products" className="nav-link">Products</NavLink>
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
              <NavLink to="/about" className="nav-link">About</NavLink>
              {!isAuthenticated ? <NavLink to="/signup" className="nav-link">Sign Up</NavLink> : (
                <Button variant="link" className="text-dark text-decoration-none" onClick={handleLogout}>Log Out</Button>
              )}
            </Nav>
            <div className="d-lg-none w-100 mt-3">
              <MobileMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            </div>
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 ms-lg-auto">
              <Form className="position-relative d-none d-lg-flex">
                <Form.Control type="search" placeholder="Search" className="pe-5" />
                <Button variant="light" className="position-absolute end-0 top-50 translate-middle-y border-0">
                  <AiOutlineSearch aria-label="Search" size={18} />
                </Button>
              </Form>
              <NavLink to="/wishlist" className="position-relative">
                <AiOutlineHeart aria-label="Wishlist" size={22} />
                {wishlistQuantity > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{wishlistQuantity}</span>}
              </NavLink>
              <NavLink to="/cart" className="position-relative">
                <AiOutlineShoppingCart aria-label="Cart" size={22} />
                {cartQuantity > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartQuantity}</span>}
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <style>{`.nav-link.active { color: #dc3545 !important; font-weight: 500; } .nav-link:hover { color: #dc3545 !important; }`}</style>
    </>
  );
}
