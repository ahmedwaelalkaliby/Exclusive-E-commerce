import React from 'react'
import './About.css';
export default function About() {
  return <>
    {/* head of badge */}
    <div className='d-flex ms-2 col-12 mb-5 w-100 align-items-center gap-5'>
      <div className='d-flex flex-column gap-5 justify-content-center align-items-center'>
        <div className='d-flex flex-column col-9'>
        <h1 >Our Story</h1>
        <p>
          Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in Bangladesh.
          Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands
          and serves 3 millioons customers across the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer,
          growing at a very fast. Exclusive offers a diverse assotment in categories ranging
          from consumer.
        </p>
        </div>
        
      </div>
      <div className='col-6 justify-content-center '>
        <img className='w-100 align-self-flex-end' src='/images/portrait-two-african-femal.png'/>
      </div>
    </div>

    {/* boxes */}
<div className='d-flex w-90 justify-content-center gap-5'>
  {[
    { imgSrc: '/images/Services1.png', count: '10.5k', text: 'Sellers active on our site' },
    { imgSrc: '/images/Services2.png', count: '10.5k', text: 'Sellers active on our site' },
    { imgSrc: '/images/Services3.png', count: '10.5k', text: 'Sellers active on our site' },
    { imgSrc: '/images/Services4.png', count: '10.5k', text: 'Sellers active on our site' },
  ].map((box, index) => (
    <div
      key={index}
      className='box d-flex flex-column justify-content-center align-items-center gap-3 border border-1 rounded-3 p-3'
    >
      <img src={box.imgSrc} alt={`Service ${index + 1}`} style={{ width: 80, height: 80 }} />
      <h1>{box.count}</h1>
      <p>{box.text}</p>
    </div>
  ))}
</div>

    {/* owners  */}
    <div className='d-flex w-90 justify-content-center gap-5 mt-5'>
      <div className='d-flex flex-column w-90 justify-content-center gap-2 '>
        <img src='/images/tom.png' style={{ width: 370, height: 430 }} />
        <div>
          <h1>Tom Cruise</h1>
          <p>Founder & Chairman</p>
          <div>
            <img src="/images/Icon-Twitter.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-instagram.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-Linkedin.png" style={{width:24, height:24}} />
          </div>
        </div> 
      </div>
      
      <div className='d-flex flex-column w-90 justify-content-center gap-2 '>
        <img src='/images/emma.png' style={{ width: 370, height: 430 }} />
        <div>
          <h1>Emma Watson</h1>
          <p>Managing Director</p>
          <div>
            <img src="/images/Icon-Twitter.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-instagram.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-Linkedin.png" style={{width:24, height:24}} />
          </div>
        </div> 
      </div>
      
      <div className='d-flex flex-column w-90 justify-content-center gap-2 '>
        <img src='/images/will.png' style={{ width: 370, height: 430 }} />
        <div>
          <h1>Will Smith</h1>
          <p>Product Designer</p>
          <div>
            <img src="/images/Icon-Twitter.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-instagram.png" style={{ width: 24, height: 24 }} />
            <img src="/images/Icon-Linkedin.png" style={{width:24, height:24}} />
          </div>
        </div> 
      </div>
       
    </div>

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
    {/* end */}
    {/* if you want add something to this page ahh here */}


    
   </>
}
