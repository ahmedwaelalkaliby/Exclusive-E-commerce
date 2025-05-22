import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";
import style from './Wishlist.module.css';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const removeFromWishlist = (id, name) => {
    if (!id) {
      toast.error('Invalid item ID', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    dispatch(wishlistActions.removeFromWishlist(id));
    toast.error(`${name || 'Item'} removed from wishlist`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const moveToCart = (item) => {
    try {
      if (!item || !item.id || !item.name || !item.price || !item.image) {
        throw new Error('Invalid item data');
      }
      dispatch(cartActions.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      }));
      dispatch(wishlistActions.removeFromWishlist(item.id));
      toast.success(`${item.name} moved to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`Failed to move ${item?.name || 'item'} to cart. Please try again.`, {
        position: "top-right",
        autoClose: 2000,
      });
      console.error("Error moving item to cart:", error);
    }
  };

  return (
    <div className={style.wishlistContainer}>
      <h2>Your Wishlist</h2>
      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "300px" }}>
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Your Wishlist is Empty</h4>
            <p>You haven't added any items to your wishlist yet.</p>
            <hr />
            <p className="mb-0">
              <Link to="/" className="alert-link">Browse our products</Link> to find something you like!
            </p>
          </div>
        </div>
      ) : (
        <Row className="justify-content-center">
          {wishlistItems.map((item) => (
            <Col
              key={item?.id || Math.random()}
              style={{ width: "270px", height: "322px" }}
              className="d-flex flex-column justify-content-center mb-4 w-270 h-350"
            >
              <Card
                style={{ width: "270px", height: "312px" }}
                className="w-270 d-flex flex-column align-items-center justify-content-center product-card"
              >
                {!item?.image ? (
                  <div className="alert alert-warning" role="alert">
                    Image not available
                  </div>
                ) : (
                  <Link
                    to={`/productdetails/${item?.id}/${item?.category || 'uncategorized'}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="d-flex justify-content-center m-2 position-relative">
                      <Card.Img
                        src={item.image}
                        alt={item?.name || 'Product image'}
                        style={{ width: "120px", height: "140px", objectFit: "cover" }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          removeFromWishlist(item?.id, item?.name);
                        }}
                        className="position-absolute top-0 end-0 border-0 bg-transparent"
                        style={{ margin: "5px" }}
                      >
                        <img src="/images/delete.png" alt="Remove" style={{ width: "20px", height: "20px" }} />
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
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            moveToCart(item);
                          }}
                        >
                          <div className="d-flex gap-2 justify-content-center">
                            <img
                              src="/images/Cart2.png"
                              style={{ width: "24px", height: "24px" }}
                            />
                            <p>Move to Cart</p>
                          </div>
                        </Button>
                      </div>
                      <div className="m-1 w-206 h-84">
                        <div className="d-flex flex-column">
                          <div style={{ height: "25px", overflow: "hidden" }}>
                            <Card.Title>
                              {(item?.name || '').split(" ").slice(0, 2).join(" ")}
                            </Card.Title>
                          </div>
                          <div className="d-flex gap-3">
                            <Card.Text>
                              <strong style={{ textDecoration: "line-through" }}>
                                ${item?.price || 0}
                              </strong>
                            </Card.Text>
                            <Card.Text>
                              <strong style={{ color: "red" }}>
                                ${((item?.price || 0) * 0.9).toFixed(2)}
                              </strong>
                            </Card.Text>
                          </div>

                          <div className="d-flex align-items-center mb-2 d-flex gap-2 ">
                            <Rating
                              name="read-only"
                              value={item?.ratingsAverage || 0}
                              readOnly
                            />
                            <Badge bg="warning" text="light" className="ms-2">
                              {(item?.ratingsAverage || 0).toFixed(1)}
                            </Badge>
                            <Card.Text> ({item?.quantity || 0}) </Card.Text>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Link>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Wishlist; 