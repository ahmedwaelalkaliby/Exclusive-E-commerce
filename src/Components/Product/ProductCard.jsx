import React from 'react';
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import './Product.css';

export default function ProductCard({ product, isInWishlist, onWishlist, onAddToCart }) {
  const displayTitle = product.title.split(" ").slice(0, 2).join(" ");
  const discountedPrice = (product.price * 0.9).toFixed(2);

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
      <Card className="product-card border-0 shadow-sm position-relative w-100 h-100" 
            style={{ transition: "transform 0.2s" }}>
        
        {/* Wishlist Icon */}
        <Button
          onClick={(e) => onWishlist(e, product)}
          variant="light"
          className="position-absolute top-0 end-0 m-2 p-1 rounded-circle shadow-sm"
          style={{ zIndex: 10, width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isInWishlist ? <AiFillHeart color="red" size={20}/> : <AiOutlineHeart size={20}/>}
        </Button>

        <Link to={`/productdetails/${product.id}/${product.category.name}`} className="text-decoration-none text-dark">
          
          {/* Product Image */}
          <div className="bg-light d-flex align-items-center justify-content-center p-3"
               style={{ height: "250px", maxHeight: "250px", minHeight: "180px" }}>
            <Card.Img
              src={product.imageCover}
              alt={product.title}
              style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
            />
          </div>

          <Card.Body className="px-2">
            {/* Add to Cart Button */}
            <Button
              className="add-to-cart-overlay w-100 rounded-0 d-flex align-items-center justify-content-center gap-2"
              variant="dark"
              onClick={(e) => onAddToCart(e, product)}
            >
              <AiOutlineShoppingCart size={20} />
              Add To Cart
            </Button>

            {/* Product Info */}
            <div className="mt-2">
              <Card.Title className="fs-6 fw-bold mb-1 text-truncate">{displayTitle}</Card.Title>
              <div className="d-flex gap-2 align-items-center mb-1 flex-wrap">
                <span className="text-danger fw-bold">${discountedPrice}</span>
                <span className="text-muted text-decoration-line-through small">${product.price}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Rating value={product.ratingsAverage} precision={0.5} readOnly size="small" />
                <span className="text-muted small">({product.quantity})</span>
              </div>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}
