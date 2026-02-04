import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { wishlistActions } from "../store/wishlistSlice";
import { toast } from "react-toastify";
import "./Product/Product.css";

export default function WishlistCard({ item, onMoveToCart }) {
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    dispatch(wishlistActions.removeFromWishlist(id));
    toast.error(`${name || "Item"} removed from wishlist`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const displayTitle = item.name?.split(" ").slice(0, 2).join(" ");
  const discountedPrice = ((item.price || 0) * 0.9).toFixed(2);

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
      <Card
        className="product-card border-0 shadow-sm position-relative w-100 h-100"
        style={{ transition: "transform 0.2s" }}
      >
        {/* Delete Button */}
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm"
          style={{ zIndex: 10 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(item.id, item.name);
          }}
        >
          <DeleteOutlineIcon style={{ color: "red", fontSize: "20px" }} />
        </Button>

        <Link
          to={`/productdetails/${item.id}/${item.category || "uncategorized"}`}
          className="text-decoration-none text-dark"
        >
          {/* Product Image */}
          <div
            className="bg-light d-flex align-items-center justify-content-center p-3"
            style={{ height: "250px", maxHeight: "250px", minHeight: "180px" }}
          >
            <Card.Img
              src={item.image}
              alt={item.name}
              style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
            />
          </div>

          <Card.Body className="px-2">
            {/* Move to Cart Button */}
            <Button
              className="add-to-cart-overlay w-100 rounded-0 d-flex align-items-center justify-content-center gap-2"
              variant="dark"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMoveToCart(item);
              }}
            >
              <AiOutlineShoppingCart size={20} />
              Move To Cart
            </Button>

            {/* Product Info */}
            <div className="mt-2">
              <Card.Title className="fs-6 fw-bold mb-1 text-truncate">
                {displayTitle}
              </Card.Title>

              <div className="d-flex gap-2 align-items-center mb-1 flex-wrap">
                <span className="text-danger fw-bold">${discountedPrice}</span>
                <span className="text-muted text-decoration-line-through small">
                  ${item.price}
                </span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Rating
                  value={item.ratingsAverage || 0}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <span className="text-muted small">
                  ({item.quantity || 0})
                </span>
              </div>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}
