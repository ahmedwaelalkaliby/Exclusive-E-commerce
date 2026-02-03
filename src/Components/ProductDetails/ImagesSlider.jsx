import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function ImagesSlider({ imageCover, images, setActiveImage }) {
  return (
    <div className="col-12 col-lg-6">
      <div className="d-flex flex-column flex-md-row gap-3">

        {/* Thumbnails */}
        <div className="d-flex flex-md-column gap-2 order-2 order-md-1 justify-content-center">
          {images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="img-fluid border"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer"
              }}
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>

        {/* Carousel */}
        <div className="flex-grow-1 order-1 order-md-2">
          <Carousel indicators={false} interval={null}>
            {[imageCover, ...images]?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt=""
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

      </div>
    </div>
  );
}
