import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import Products from '../Products/Products';

export default function Home() {
  return <>
  <div className='container-fluid'>
      <Sidebar/>
    </div>
    
    {/* categories */}
  {/* <div style={{ position: "relative", marginTop: "1.25rem", height: "40px" , margin: "40px 0" }}>
  <div
    style={{
      position: "absolute",
      left: 0, 
      top: 0,
      width: "20px",
      height: "40px",
      backgroundColor: "rgba(219, 68, 68, 1)",
      borderRadius: "5px",
    }}
  />
 
  <h4
    style={{
      position: "absolute",
      left: "30px", 
      top: 0,
      height: "100%",
      margin: 0,
      display: "flex",
      alignItems: "center",
      color: "rgba(219, 68, 68, 1)",
    }}
  >
    Categories
  </h4>
    </div> */}
    




    <Products />



    
    {/* lastdiv */}
    <div className='d-flex w-80 justify-content-center gap-5 mt-5'>
      <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
        <img src='/images/Truck.png' style={{width:80 , height:80 }} />
        <h6>FREE AND FAST DELIVERY</h6>
        <p>Free delivery for all orders over $140</p>
      </div>

      <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
        <img src='/images/headphone.png' style={{width:80 , height:80 }} />
        <h6>24/7 CUSTOMER SERVICE</h6>
        <p>24/7 CUSTOMER SERVICE</p>
      </div>

      <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
        <img src='/images/iconright.png' style={{width:80 , height:80 }} />
        <h6>MONEY BACK GUARANTEE</h6>
        <p>We reurn money within 30 days</p>
      </div>
      
    </div>
  </>
}
