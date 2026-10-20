import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { useAppSelector } from '../../store/hooks';

const accountLinks = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];
const quickLinks = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];

export default function Footer() {
  const theme = useAppSelector((state) => state.theme);
  const isLight = theme === 'light';
  const themeClasses = isLight ? 'bg-black text-white' : 'bg-light text-dark';
  const inputClasses = isLight ? 'bg-transparent text-white border-light' : 'bg-white text-dark border-secondary';

  return (
    <footer className={`${themeClasses} pt-5 pb-2`}>
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <h3 className="fw-bold mb-4">Exclusive</h3>
            <h5 className="fs-6 mb-3">Subscribe</h5>
            <p className="small mb-3">Get 10% off your first order</p>
            <Form className="d-flex position-relative w-60">
              <Form.Control type="email" placeholder="Enter your email" className={`${inputClasses} pe-5 border-0 rounded-4`} />
              <Button variant="link" className="position-absolute end-0 top-50 translate-middle-y text-reset">
                <Image src="/images/send.png" alt="Send" width={20} />
              </Button>
            </Form>
          </Col>
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Support</h5>
            <address className="small lh-lg">111 Bijoy Sarani, Dhaka,<br />Bangladesh.<br />exclusive@gmail.com<br />+88015-88888-9999</address>
          </Col>
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Account</h5>
            <ul className="list-unstyled small lh-lg">{accountLinks.map((link) => <li key={link}><a href={`/${link}`} className="text-reset text-decoration-none">{link}</a></li>)}</ul>
          </Col>
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-4">Quick Link</h5>
            <ul className="list-unstyled small lh-lg">{quickLinks.map((link) => <li key={link}><a href={`/${link}`} className="text-reset text-decoration-none">{link}</a></li>)}</ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-2">Download App</h5>
            <p className="small mb-3">Save $3 with App New User Only</p>
            <div className="d-flex gap-2 align-items-center">
              <Image src="/images/Qrcode1.png" alt="QR code" width={80} height={80} className="bg-white p-1" />
              <div className="d-flex flex-column gap-2">
                <a href="#playstore"><Image src="/images/play-store.png" alt="Google Play" width={120} /></a>
                <a href="#appstore"><Image src="/images/appstore.png" alt="App Store" width={120} /></a>
              </div>
            </div>
            <div className="d-flex gap-3 mt-3">
              <a href="#facebook" className="text-reset"><AiFillFacebook /></a>
              <a href="#twitter" className="text-reset"><AiOutlineTwitter /></a>
              <a href="#instagram" className="text-reset"><AiFillInstagram /></a>
              <a href="#linkedin" className="text-reset"><AiFillLinkedin /></a>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-5 pt-4 border-top opacity-50 small">&copy; Copyright Rimel 2025. All rights reserved</div>
      </Container>
    </footer>
  );
}
