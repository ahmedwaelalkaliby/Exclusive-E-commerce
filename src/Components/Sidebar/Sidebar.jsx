import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext.jsx/ThemeContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'react-bootstrap/Image';

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

 return (
  <div className="bg-white text-black d-flex flex-column flex-lg-row ms-2 mb-5 w-100">

    {/* Categories */}
      <div className="d-none d-md-flex flex-row flex-wrap flex-lg-column gap-3 col-md-3 mt-3">
      <h6>Mens Fashion</h6>
      <h6>Womens Fashion</h6>
      <h6>Electronics</h6>
      <h6>Home Furniture</h6>
      <h6>Medicine</h6>
      <h6>Sports Wear</h6>
      <h6>Games</h6>
      <h6>Baby & Toys</h6>
      <h6>Health & Beauty</h6>
    </div>

    {/* Slider */}
    <div className="col-12 col-lg-9">
      <Slider {...settings}>
        <div>
          <Image src="/images/Frame.png" alt="Slide 1" className="w-100" />
        </div>
        <div>
          <Image src="/images/Frame.png" alt="Slide 2" className="w-100" />
        </div>
        <div>
          <Image src="/images/Frame.png" alt="Slide 3" className="w-100" />
        </div>
      </Slider>
    </div>

  </div>
);

}
