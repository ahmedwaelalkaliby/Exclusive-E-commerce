import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import "react-rater/lib/react-rater.css"; 
import Rating from '@mui/material/Rating';
import './Product.css';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Spinner from 'react-bootstrap/Spinner';
export default function Product() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const getProducts = async () => {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data.data;
  };

  const { data, isLoading: loading, isError: error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5000,
    retry: 8,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(cartActions.addToCart({
      id: product.id,
      name: product.title,
      price: product.price * 0.9,
      image: product.imageCover,
      quantity: 1
    }));
    toast.success(`${product.title.split(" ").slice(0, 2).join(" ")} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(product.id));
      toast.error(`${product.title.split(" ").slice(0, 2).join(" ")} removed from wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      dispatch(wishlistActions.addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price * 0.9,
        image: product.imageCover,
      }));
      toast.success(`${product.title.split(" ").slice(0, 2).join(" ")} added to wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (loading) 
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
      <Spinner
        animation="border"
        role="status"
        variant="danger"
        style={{ width: "5rem", height: "5rem" }} // Increased size
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Row className="justify-content-center">
        {data?.map((product) => (
          <Col
            key={product.id}
            style={{ width: "270px", height: "322px" }}
            className="d-flex flex-column justify-content-center mb-4 w-270 h-350"
          >
            <Card
              style={{ width: "270px", height: "312px" }}
              className="w-270 d-flex flex-column align-items-center justify-content-center product-card"
            >
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
                className="text-decoration-none text-dark"
              >
                <div className="d-flex justify-content-center m-2 position-relative">
                  <Card.Img
                    src={product.imageCover}
                    alt={product.title}
                    style={{ width: "120px", height: "140px", objectFit: "cover" }}
                  />
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className="position-absolute top-0 end-0 border-0 bg-transparent"
                    style={{ margin: "5px" }}
                  >
                    {wishlistItems.some(item => item.id === product.id) ? (
                      <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button>
                </div>
                <Card.Body>
                  <div className="justify-content-space-between">
                    <Button
                      variant="primary"
                      style={{
                        marginTop: "-30px",
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "0px",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "41px",
                        width: "270px",
                        padding: "10px",
                      }}
                      className="add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <div className="d-flex gap-2 justify-content-center">
                        <img
                          src="/images/Cart2.png"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <p>Add To Cart</p>
                      </div>
                    </Button>
                  </div>
                  <div className="m-1 w-206 h-84">
                    <div className="d-flex flex-column ">
                      <div style={{ height: "25px", overflow: "hidden" }}>
                        <Card.Title>
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </Card.Title>
                      </div>
                      <div className="d-flex gap-3">
                        <Card.Text>
                          <strong style={{ textDecoration: "line-through" }}>
                            ${product.price}
                          </strong>
                        </Card.Text>
                        <Card.Text>
                          <strong style={{ color: "red" }}>
                            ${(product.price * 0.9).toFixed(2)}
                          </strong>
                        </Card.Text>
                      </div>

                      <div className="d-flex align-items-center mb-2 d-flex gap-2 ">
                        <Rating
                          name="read-only"
                          value={product.ratingsAverage}
                          readOnly
                        />
                        <Badge bg="warning" text="light" className="ms-2">
                          {product.ratingsAverage.toFixed(1)}
                        </Badge>
                        <Card.Text> ({product.quantity}) </Card.Text>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}