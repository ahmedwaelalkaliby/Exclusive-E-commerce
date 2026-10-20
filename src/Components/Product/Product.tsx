import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import "react-rater/lib/react-rater.css"; 
import Rating from '@mui/material/Rating';
import './Product.css';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { Product as ProductData } from '../../types';
import { useGetProductsQuery } from '../../store/api';
import type { MouseEvent } from 'react';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Spinner from 'react-bootstrap/Spinner';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Product() {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading: loading, isError: error, refetch } = useGetProductsQuery(undefined, { pollingInterval: 300000 });

  const handleAddToCart = (e: MouseEvent<HTMLElement>, product: ProductData) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to continue!');
    
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

  const handleWishlist = (e: MouseEvent<HTMLElement>, product: ProductData) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to continue!');
    
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
        category: product.category.name,
        ratingsAverage: product.ratingsAverage || 0
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
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  if (error) 
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Products!</h4>
          <p>We're having trouble loading the products. Please try again later.</p>
          <hr />
          <p className="mb-0">Please try again.</p>
        </div>
        <Button 
          variant="primary" 
          className="mt-3"
          onClick={refetch}
        >
          Retry
        </Button>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">No Products Found</h4>
          <p>There are no products available at the moment.</p>
        </div>
      </div>
    );

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
                        <AiOutlineShoppingCart size={24} aria-hidden="true" />
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
                          {(product.ratingsAverage ?? 0).toFixed(1)}
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
