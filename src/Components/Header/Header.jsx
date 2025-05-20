import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from "./Header.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  // const [selectedTheme, setSelectedTheme] = useState("Light Mode");

  const {setTheme , theme} = useContext(ThemeContext)
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.items.length);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (language) => {
    setSelectedLanguage(language);
  }

  const handleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light"); 
  }

  const handleLogout = () => {
    logout();
    navigate('/Login');
  }

  return <>
  <div className={style.Header}><p className={style.p}>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! ShopNow</p>
    {/* <Dropdown>
      <Dropdown.Toggle variant="dark">
      {selectedLanguage}
      </Dropdown.Toggle>
      <Dropdown.Menu className='overflow-hidden'>
        <Dropdown.Item onClick={() => handleSelect("English")}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSelect("Arabic")}>Arabic</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown>
      <Dropdown.Toggle variant="dark">
        {theme}
      </Dropdown.Toggle>
      <Dropdown.Menu className='overflow-hidden'>
        <Dropdown.Item onClick={() => handleTheme("Light")}>Light</Dropdown.Item>
        <Dropdown.Item onClick={() => handleTheme("Dark")}>Dark</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
  </div>
   
  <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      <Navbar.Brand href="#">Exclusive</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink to ="/" className={({isActive})=>isActive?"text-dark border-bottom " : ''}>Home</NavLink>
            <NavLink to ="/Contact" className={({isActive})=>isActive?"text-dark border-bottom " : ''}>Contact</NavLink>
            <NavLink to ="/About" className={({isActive})=>isActive?"text-dark border-bottom " : ''}>About</NavLink>
            {!isAuthenticated ? (
              <NavLink to="/signup" className={({isActive})=>isActive?"text-dark border-bottom" : ''}>Sign Up</NavLink>
            ) : (
              <Button variant="link" className="text-dark text-decoration-none" onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="search"
            />
             <Button variant="light"><img src='/images/Vector.png'></img></Button>
          </Form>
          <NavLink to="/wishlist" className={style.wishlistIcon}>
            <img src='/images/Wishlist.png'></img>
            {wishlistQuantity > 0 && <span className={style.wishlistBadge}>{wishlistQuantity}</span>}
          </NavLink>
          <NavLink to="/cart" className={style.cartIcon}>
            <img src='/images/Cart1.png'></img>
            {cartQuantity > 0 && <span className={style.cartBadge}>{cartQuantity}</span>}
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>
};
