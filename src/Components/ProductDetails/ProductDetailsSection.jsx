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
    <div className="col-6"> {/* always 50% width */}

      <h3>{productDetails.title.split(" ").slice(0, 2).join(" ")}</h3>

      {/* Rating + Stock */}
      <div className="row align-items-center mb-2">
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

      <h4 className="my-3">
        {(productDetails.price * 0.9).toFixed(2)} $
      </h4>

      <p style={{ width: "373px" }}>
        {productDetails.description}
      </p>

      <hr />

      {/* SIZE */}
      <div className="row align-items-center mb-3">
        <div className="col-auto">
          <span>Size:</span>
        </div>

        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <div key={size} className="col-auto">
            <button
              onClick={() => handleSizeSelect(size)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "5px",
                border: "1px grey solid",
                backgroundColor:
                  activeSize === size
                    ? "rgba(219, 68, 68, 1)"
                    : "white",
                color: activeSize === size ? "white" : "black",
              }}
            >
              {size}
            </button>
          </div>
        ))}
      </div>

      {/* COUNTER + BUTTONS */}
      <div className="row align-items-center mb-4">

        {/* Counter */}
        <div className="col-auto">
          <button
            style={{
              width: "44px",
              height: "44px",
              border: "1px grey solid",
              background: "white"
            }}
            onClick={() =>
              setCounter((prev) => Math.max(prev - 1, 1))
            }
          >
            -
          </button>
        </div>

        <div className="col-auto">
          <span>{counter}</span>
        </div>

        <div className="col-auto">
          <button
            style={{
              width: "44px",
              height: "44px",
              border: "1px grey solid",
              background: "rgba(219, 68, 68, 1)",
              color: "white"
            }}
            onClick={() => setCounter((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        {/* Buy Button */}
        <div className="col-auto">
          <button
            style={{
              width: "165px",
              height: "44px",
              background: "rgba(219, 68, 68, 1)",
              color: "white",
              border: "1px grey solid"
            }}
            onClick={handleAddToCart}
          >
            Buy Now
          </button>
        </div>

        {/* Wishlist */}
        <div className="col-auto">
          <button
            style={{
              width: "44px",
              height: "44px",
              border: "1px grey solid",
              background: "white"
            }}
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
      <div
        className="row border p-3"
        style={{
          width: "400px",
          height: "110px",
          borderRadius: "5px 5px 0px 0px"
        }}
      >
        <div className="col-auto">
          <LocalShippingOutlinedIcon fontSize="large" />
        </div>
        <div className="col">
          Free Delivery <br />
          Enter your postal code for Delivery Availability
        </div>
      </div>

      <div
        className="row border p-3"
        style={{
          width: "400px",
          height: "110px",
          borderRadius: "0px 0px 5px 5px"
        }}
      >
        <div className="col-auto">
          <SyncOutlinedIcon fontSize="large" />
        </div>
        <div className="col">
          Return Delivery <br />
          Free 30 Days Delivery Returns. Details
        </div>
      </div>

    </div>
  );
}
