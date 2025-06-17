import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return <div className={`${theme == "dark" ? " bg-black text-white" : "bg-white text-black"} d-flex ms-2 col-12 mb-5 w-100 `}>
    <div className={`d-flex flex-column gap-3 col-3 mt-3`}>
      <h6>Mens Fashon</h6>
      <h6>Womwens Fashon</h6>
      <h6>Electronics</h6>
      <h6>Home ferniture</h6>
      <h6>Medicine</h6>
      <h6>Sports wear</h6>
      <h6>Games</h6>
      <h6>Baby & Toys</h6>
      <h6>Health & Buetty</h6>
    </div>
    <div className='col-9'>
      <Slider {...settings}>
        <div>
          <img src="/images/Frame.png" alt="Slide 1" width="100%" />
        </div>
        <div>
          <img src="/images/Frame.png" alt="Slide 2" width="100%" />
        </div>
        <div>
          <img src="/images/Frame.png" alt="Slide 3" width="100%" />
        </div>
      </Slider>
    </div>
  </div>
}
