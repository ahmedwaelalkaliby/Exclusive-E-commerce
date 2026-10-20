import React from "react";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";

export default function ProductDetailsSection({
  productDetails,
  activeSize,
  counter,
  wishlistItems,
  handleSizeSelect,
  setCounter,
  handleAddToCart,
  handleWishlist,
}) {
  return (
    <div className="col-12 col-lg-6  ">

      {/* TITLE */}
      <h3 className="mb-2">
        {productDetails.title.split(" ").slice(0, 3).join(" ")}
      </h3>

      {/* RATING + STOCK */}
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <Rating value={productDetails.ratingsAverage} readOnly />
        </div>
        <div className="col-auto">
          {productDetails.quantity > 0 ? (
            <span className="text-success">In Stock</span>
          ) : (
            <span className="text-danger">Out of Stock</span>
          )}
        </div>
      </div>

      {/* PRICE */}
      <h4 className="mb-3 text-danger">
        ${(productDetails.price * 0.9).toFixed(2)}
      </h4>

      {/* DESCRIPTION */}
      <p className="text-muted">
        {productDetails.description}
      </p>

      <hr />

      {/* SIZE */}
      <div className="row align-items-center mb-4 g-2">
        <div className="col-12 col-sm-auto">
          <strong>Size:</strong>
        </div>

        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <div key={size} className="col-auto">
            <button
              onClick={() => handleSizeSelect(size)}
              className="btn btn-sm"
              style={{
                width: "40px",
                border:
                  activeSize === size
                    ? "1px solid #db4444"
                    : "1px solid #ccc",
                backgroundColor:
                  activeSize === size ? "#db4444" : "white",
                color: activeSize === size ? "white" : "black",
              }}
            >
              {size}
            </button>
          </div>
        ))}
      </div>

      {/* COUNTER + BUTTONS */}
      <div className="row align-items-center g-2 mb-4">

        {/* Counter */}
        <div className="col-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              setCounter((prev) => Math.max(prev - 1, 1))
            }
          >
            -
          </button>
        </div>

        <div className="col-auto">
          <span className="px-2">{counter}</span>
        </div>

        <div className="col-auto">
          <button
            className="btn btn-outline-danger"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Buy Now */}
        <div className="col-12 col-sm">
          <button
            className="btn btn-danger w-100"
            onClick={handleAddToCart}
          >
            Buy Now
          </button>
        </div>

        {/* Wishlist */}
        <div className="col-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={handleWishlist}
          >
            {wishlistItems.some(
              (item) => item.id === productDetails.id
            ) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </div>
      </div>

      {/* DELIVERY BOXES */}
      <div className="row border rounded-top p-3">
        <div className="col-auto">
          <LocalShippingOutlinedIcon fontSize="large" />
        </div>
        <div className="col-auto">
          <strong>Free Delivery</strong>
          <p className="mb-0 small">
            Enter your postal code for delivery availability
          </p>
        </div>
      </div>

      <div className="row border border-top-0 rounded-bottom p-3">
        <div className="col-auto">
          <SyncOutlinedIcon fontSize="large" />
        </div>
        <div className="col-auto">
          <strong>Return Delivery</strong>
          <p className="mb-0 small">
            Free 30 Days Delivery Returns. Details
          </p>
        </div>
      </div>

    </div>
  );
}
