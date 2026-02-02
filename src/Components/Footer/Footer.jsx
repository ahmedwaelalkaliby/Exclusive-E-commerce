import React, { useContext } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import ThemeContext from "../../ThemeContext.jsx/ThemeContext";

const accountLinks = ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"];
const quickLinks = ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"];

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  // Dynamic Styles
  const themeClasses = isLight ? "bg-black text-white" : "bg-light text-dark";
  const inputClasses = isLight ? "bg-transparent text-white border-light" : "bg-white text-dark border-secondary";

  return (
    <footer className={`${themeClasses} pt-5 pb-2`}>
      <Container>
        <Row className="gy-4">
          
          {/* Section 1: Brand & Subscription */}
          <Col lg={3} md={6}>
            <h3 className="fw-bold mb-4">Exclusive</h3>
            <h5 className="fs-6 mb-3">Subscribe</h5>
            <p className="small mb-3">Get 10% off your first order</p>
            <Form className="d-flex position-relative w-[60%]">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className={`${inputClasses} pe-5 border-0 rounded-4 h-[4px] w-[60%]`}
              />
              <Button 
                variant="link" 
                className="position-absolute end-0 top-50 translate-middle-y text-reset"
              >
                <Image src="/images/send.png" alt="Send" width={20} />
              </Button>
            </Form>
          </Col>

          {/* Section 2: Support */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Support</h5>
            <address className="small lh-lg">
              111 Bijoy Sarani, Dhaka, <br /> Bangladesh. <br />
              exclusive@gmail.com <br />
              +88015-88888-9999
            </address>
          </Col>

          {/* Section 3: Account */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Account</h5>
            <ul className="list-unstyled small lh-lg">
              {accountLinks.map((link) => (
                <li key={link}><a href={`/${link}`} className="text-reset text-decoration-none">{link}</a></li>
              ))}
            </ul>
          </Col>

          {/* Section 4: Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Quick Link</h5>
            <ul className="list-unstyled small lh-lg">
              {quickLinks.map((link) => (
                <li key={link}><a href={`/${link}`} className="text-reset text-decoration-none">{link}</a></li>
              ))}
            </ul>
          </Col>

          {/* Section 5: App Download */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-2">Download App</h5>
            <p className="small text-muted mb-3">Save $3 with App New User Only</p>
            
           <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "80px 120px", 
                gap: "10px", 
                alignItems: "center" 
              }}
            >
              {/* Grid Item 1: QR Code */}
              <div className="bg-white p-1 border rounded" style={{ height: "80px" }}>
                <Image 
                  src="/images/Qrcode1.png" 
                  alt="QR" 
                  className="w-100 h-100" 
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Grid Item 2: App Stores (Nested Grid or Flex) */}
              <div style={{ display: "grid", gap: "8px" }}>
                <a href="#playstore">
                  <Image src="/images/play-store.png" alt="Google Play" className="w-100" />
                </a>
                <a href="#appstore">
                  <Image src="/images/appstore.png" alt="App Store" className="w-100" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-4">
              <a href="#" className="text-reset"><AiFillFacebook /></a>
              <a href="#" className="text-reset"><AiOutlineTwitter /></a>
              <a href="#" className="text-reset"><AiFillInstagram /></a>
              <a href="#" className="text-reset"><AiFillLinkedin /></a>
            </div>
          </Col>
        </Row>

        {/* Bottom Copyright */}
        <div className="text-center mt-5 pt-4 border-top opacity-50 small">
          <p>&copy; Copyright Rimel 2025. All rights reserved</p>
        </div>
      </Container>
    </footer>
  );
}