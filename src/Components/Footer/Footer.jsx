import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`${theme === "light" ? "bg-black text-white" : "bg-white text-black"} w-100 p-3`}
      style={{ borderTop: "1px solid #ddd" }}
    >
      <div className="container">
        <div className="row ">
          <div className="col-12 col-md-3 mb-4 text-start">
            <h2>Exclusive</h2>
            <h6>Subscribe</h6>
            <h6>Get 10% off</h6>
            <Form className="mt-2">
              <div className="input-group">
                <Form.Control
                  type="email"
                  placeholder="E-mail"
                  className={`bg-black text-white border-0`}
                  aria-label="Enter E-mail"
                  style={{ borderRadius: "10px 0 0 10px" , height: "40px" , maxWidthwidth: "50px" }}
                />
                <Button
                  variant="dark"
                  className="border-0"
                  style={{ borderRadius: "0 20px 20px 0" }}
                >
                  <img src="/images/send.png" alt="Send" />
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-12 col-md-2 mb-4 text-start">
            <h2>Support</h2>
            <h6>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</h6>
            <h6>exclusive@gmail.com</h6>
            <h6>+88015-88888-9999</h6>
          </div>
          <div className="col-12 col-md-2 mb-4 text-start">
            <h2>Account</h2>
            <h6>My Account</h6>
            <h6>Login / Register</h6>
            <h6>Cart</h6>
            <h6>Wishlist</h6>
            <h6>Shop</h6>
          </div>
          <div className="col-12 col-md-2 mb-4 text-start">
            <h2>Quick Link</h2>
            <h6>Privacy Policy</h6>
            <h6>Login / Register</h6>
            <h6>Terms Of Use</h6>
            <h6>FAQ</h6>
            <h6>Contact</h6>
          </div>
          <div className="col-12 col-md-3 mb-4 text-start">
            <h2>Download App</h2>
            <p>Save $3 with App New User Only</p>
            <div className="row">
              <div className="col-4">
                <img src="/images/Qrcode1.png" style={{ width: 76, height: 76 }} alt="QR" />
              </div>
              <div className="col-8">
                <img src="/images/play-store.png" style={{ height: 34, width: 104, marginBottom: 8 }} alt="Play Store" />
                <br />
                <img src="/images/appstore.png" style={{ height: 34, width: 104 }} alt="App Store" />
              </div>
            </div>
            <div className="mt-3">
              <img src="/images/Facebook.png" style={{ width: 24, height: 24, marginRight: 8 }} alt="Facebook" />
              <img src="/images/Twitter1.png" style={{ width: 24, height: 24, marginRight: 8 }} alt="Twitter" />
              <img src="/images/Instagram1.png" style={{ width: 24, height: 24, marginRight: 8 }} alt="Instagram" />
              <img src="/images/Linkedin1.png" style={{ width: 24, height: 24 }} alt="LinkedIn" />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 small text-secondary">
          &copy; 2025 Exclusive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}