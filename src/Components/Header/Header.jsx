import React, { useContext, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { setTheme, theme } = useContext(ThemeContext);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.items.length);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(false);
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  const handleLogout = () => {
    logout();
    navigate('/Login');
    handleCloseSidebar();
  };

  // Helper for NavLink onClick
  const navLinkProps = {
    onClick: handleCloseSidebar,
  };

  return (
    <>
      <style>
        {`
          .nav-link.active {
            color: #dc3545 !important;
            font-weight: 500;
          }
          .nav-link:hover {
            color: #dc3545 !important;
          }
        `}
      </style>
      
      <div className="bg-dark text-white py-2">
        <div className="container">
          <p className="mb-0 text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow
          </p>
        </div>
      </div>

      <Navbar expand="lg" bg="light" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold">Exclusive</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-nav" onClick={handleShowSidebar} />
          <Navbar.Offcanvas
            id="sidebar-nav"
            aria-labelledby="sidebar-nav-label"
            placement="start"
            show={showSidebar}
            onHide={handleCloseSidebar}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="sidebar-nav-label">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* Navigation Links */}
              <Nav className="flex-column flex-lg-row align-items-start w-100 mb-3 mb-lg-0">
                <NavLink to="/" className="nav-link" {...navLinkProps}>Home</NavLink>
                <NavLink to="/Contact" className="nav-link" {...navLinkProps}>Contact</NavLink>
                <NavLink to="/About" className="nav-link" {...navLinkProps}>About</NavLink>
                {!isAuthenticated ? (
                  <NavLink to="/signup" className="nav-link" {...navLinkProps}>Sign Up</NavLink>
                ) : (
                  <Button variant="text" className="p-2 text-dark" onClick={handleLogout}>Log Out</Button>
                )}
              </Nav>

              {/* Search Form */}
              <Form className="w-10 position-relative" >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="search"
                />
              </Form>
                <Button variant="light" className="postion-" >
                  <img src='/images/Vector.png' alt="search" />
                </Button>
              
              {/* Shopping Icons */}
              
                <NavLink to="/wishlist" className=" me-3" {...navLinkProps}>
                  <img src='/images/Wishlist.png' alt="wishlist" className='mt-1'/>
                  {wishlistQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistQuantity}
                    </span>
                  )}
                </NavLink>
                <NavLink to="/cart"  className=" me-3"{...navLinkProps}>
                  <img src='/images/Cart1.png' alt="cart"  className='mt-1'/>
                  {cartQuantity > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartQuantity}
                    </span>
                  )}
                </NavLink>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}