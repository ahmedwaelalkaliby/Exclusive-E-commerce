import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector(
    (state) => state.wishlist.items.length
  );

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-dark text-white py-2 text-center small w-100">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now
      </div>

      <Navbar expand="lg" bg="light" className="shadow-sm py-3 w-100">
        <Container fluid className="px-3 px-lg-5">

          {/* Logo */}
          <Navbar.Brand className="fw-bold fs-4">
            Exclusive
          </Navbar.Brand>

          {/* Toggle */}
          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">

            {/* Desktop Links */}
            <Nav className="mx-auto d-none d-lg-flex gap-4">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/Contact" className="nav-link">
                Contact
              </NavLink>
              <NavLink to="/About" className="nav-link">
                About
              </NavLink>

              {!isAuthenticated ? (
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              ) : (
                <Button
                  variant="link"
                  className="text-dark text-decoration-none"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              )}
            </Nav>

            {/* Mobile Links */}
            <div className="d-lg-none w-100 mt-3">
              <MobileMenu
                isAuthenticated={isAuthenticated}
                handleLogout={handleLogout}
              />
            </div>

            {/* Right Section */}
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 ms-lg-auto">

              {/* Search */}
              <Form className="position-relative d-none d-lg-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="pe-5"
                />
                <Button
                  variant="light"
                  className="position-absolute end-0 top-50 translate-middle-y border-0"
                >
                  <img
                    src="/images/Vector.png"
                    alt="search"
                    width="18"
                  />
                </Button>
              </Form>

              {/* Wishlist */}
              <NavLink to="/wishlist" className="position-relative">
                <img
                  src="/images/Wishlist.png"
                  alt="wishlist"
                  width="22"
                />
                {wishlistQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistQuantity}
                  </span>
                )}
              </NavLink>

              {/* Cart */}
              <NavLink to="/cart" className="position-relative">
                <img
                  src="/images/Cart1.png"
                  alt="cart"
                  width="22"
                />
                {cartQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartQuantity}
                  </span>
                )}
              </NavLink>

            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Active Styling */}
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
    </>
  );
}
