import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';
export default function Footer() {

  const{theme}= useContext(ThemeContext)
  return <div className={`${theme == "light" ? " bg-black text-white" : "bg-white text-black"} d-flex gap-4 w-100 p-5`} >
    <div className={'d-flex flex-column gap-3 col-3 ms-4'}>
      <h2>Exclusive</h2>
      <h6>Subscribe</h6>
      <h6>Get 10% off</h6>
      <Form className="d-flex">
            <Form.Control
              type="input"
              placeholder="E-mail"
              className="me-2 bg-black text-white"
              variant="dark"
              aria-label="Enter E-mail"
            />
             <Button variant="dark" className='me-4'><img src='../images/send.png'></img></Button>
          </Form>
    </div>
    <div className='d-flex flex-column gap-3 col-2'>
    <h2>Sypport</h2>
    <h6>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</h6>
    <h6>exclusive@gmail.com</h6>
    <h6>+88015-88888-9999</h6>
    </div>
    <div className='d-flex flex-column gap-3 col-2'>
    <h2>Account</h2>
      <h6>My Account</h6>
      <h6>Login / Register</h6>
      <h6>Cart</h6>
      <h6>Wishlist</h6>
      <h6>Shop</h6>
    </div>
    <div className='d-flex flex-column gap-3 col-2 ms-e'>
    <h2>Quick Link</h2>
      <h6>Privacy Policy</h6>
      <h6>Login / Register</h6>
      <h6>Terms Of Use</h6>
      <h6>FAQ</h6>
      <h6>Contact</h6>
    </div>
    <div className='d-flex flex-column gap-3 col-3 ms-e'>
      <h2>Download App</h2>
      <p>Save $3 with App New User Only</p>
      <div className='d-flex gap-2'>
        <img src="../images/Qrcode1.png" style={{ width: 76, height: 76 }} />
        <div className='d-flex flex-column gap-2'>
          <img src="../images/play-store.png" style={{height:34, width:104}}/>
          <img src="../images/appstore.png" style={{height:34, width:104}}/>  
        </div>
      </div>
       <div className='d-flex gap-3'>
            <img src="../images/Facebook.png" style={{ width: 24, height: 24 }} />
            <img src="../images/Twitter1.png" style={{ width: 24, height: 24 }} />
            <img src="../images/Instagram1.png" style={{ width: 24, height: 24 }} />
            <img src="../images/Linkedin1.png" style={{width:24, height:24}} />
          </div>
    </div>
  </div>
}
