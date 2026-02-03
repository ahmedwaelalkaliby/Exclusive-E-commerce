import React from "react";
import Carousel from "react-bootstrap/Carousel";


export default function ImagesSlider({ imageCover, images, setActiveImage }) {
  return (
    <div className="col-12 col-lg-6">
      <div className="d-flex flex-column gap-3">

        {/* Carousel */}
        <div className="flex-grow-1">
          <Carousel indicators={false} interval={null}>
            {[imageCover, ...images]?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Product image ${index + 1}`}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Thumbnails Horizontal */}
        <div
          className="grid col-24 gap-2 overflow-auto justify-content-start"
        >
          {images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="img-fluid border"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                cursor: "pointer",
                flex: "0 0 auto", 
              }}
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
