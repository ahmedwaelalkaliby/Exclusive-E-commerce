import React from 'react'

export default function Contact() {
  console.log("contact")
  return <>
    <div className='d-flex flex-column flex-md-row gap-3 ms-2 col-12 mb-5 w-100 align-items-center'>
      {/* div1 */}
      <div className='col-12 col-md-4 d-flex flex-column border border-shadow mb-3 mb-md-0' style={{ height: 'auto', minHeight: 457 }}>

        {/* div1 */}
        <div className='d-flex flex-column gap-2 mb-3 p-3'>
          <div className='d-flex align-items-center gap-2'>
            <img src='../images/icons-phone.png' style={{ width: 40, height: 40 }} alt="Phone Icon" />
            <h4>Call To Us</h4>
          </div>
          <div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
        </div>

        <div className='border-none border-bottom'></div>

        {/* div2 */}
        <div className='d-flex flex-column gap-2 mb-3 p-3'>
          <div className='d-flex align-items-center gap-2'>
            <img src='../images/icons-mail.png' style={{ width: 40, height: 40 }} alt="Mail Icon" />
            <h4>Write To Us</h4>
          </div>
          <div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>
      </div>

      {/* div2 */}
      <div className='col-12 col-md-7 d-flex flex-column border border-shadow gap-3 p-3' style={{ minHeight: 457 }}>
        <div className='d-flex flex-column flex-md-row gap-5 p-3 align-items-center justify-content-center'>
          <input type='text' placeholder='Your Name *' style={{ width: '100%', maxWidth: 235, height: 50 }} className='border-0 bg-light p-3 mb-2 mb-md-0'></input>
          <input type='text' placeholder='Your Email *' style={{ width: '100%', maxWidth: 235, height: 50 }} className='border-0 bg-light p-3 mb-2 mb-md-0'></input>
          <input type='text' placeholder='Your Phone *' style={{ width: '100%', maxWidth: 235, height: 50 }} className='border-0 bg-light p-3'></input>
        </div>
        <input type='textarea' placeholder='Your Message *' style={{ height: 207, width: '100%' }} className='border-0 bg-light align-self-center p-3 mb-3'></input>
        <button className='btn btn-danger text-white align-self-center align-self-md-end'>Send Message</button>
      </div>
    </div>
  </>
}