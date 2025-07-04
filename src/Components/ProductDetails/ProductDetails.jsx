import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Carousel from 'react-bootstrap/Carousel';
import "react-rater/lib/react-rater.css"; 
import { Link } from "react-router-dom";
import './ProductDetails.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../context/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
export default function ProductDetails() {
  const { id , category} = useParams(); 
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { requireAuth } = useAuth();
  const [productDetails, setProductDetails] = useState(null); 
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [activeSize, setActiveSize] = useState(null);
  const [counter, setCounter] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  console.log(id)
  console.log(category) 
      const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
          setProductDetails(response.data.data); 
          
        setLoading(false); 
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false); 
      }
    }; 
    
function fetchRelatedProducts(category, id) {
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({ data }) => {
      let allProducts = data.data;
      console.log(allProducts)
      let related = allProducts.filter((product) => product.category.name == category && product.id != id);
      console.log(related)
      setRelatedProducts(related);
    })
    .catch((err) => {
      console.error("Error fetching related products:", err);
      setRelatedProducts([]);
    });
}

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts(category, id);
  }, [id, category]); 

  const handleSizeSelect = (size) => {
    setActiveSize(size);
    toast.info(`Size ${size} selected`, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!activeSize) {
      toast.warning('Please select a size first!', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    dispatch(cartActions.addToCart({
      id: productDetails.id,
      name: productDetails.title,
      price: productDetails.price * 0.9,
      image: productDetails.imageCover,
      quantity: counter,
      size: activeSize
    }));
    toast.success(`${productDetails.title.split(" ").slice(0, 2).join(" ")} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleWishlist = () => {
    if (!requireAuth()) return;
    
    const isInWishlist = wishlistItems.some(item => item.id === productDetails.id);
    
    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(productDetails.id));
      toast.error(`${productDetails.title.split(" ").slice(0, 2).join(" ")} removed from wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      dispatch(wishlistActions.addToWishlist({
        id: productDetails.id,
        name: productDetails.title,
        price: productDetails.price * 0.9,
        image: productDetails.imageCover,
        category: productDetails.category.name,
        ratingsAverage: productDetails.ratingsAverage || 0
      }));
      toast.success(`${productDetails.title.split(" ").slice(0, 2).join(" ")} added to wishlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleRelatedProductAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    if (!requireAuth()) return;
    
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
    });
  };

  const handleRelatedProductWishlist = (e, product) => {
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
          <h4 className="alert-heading">Error Loading Product Details!</h4>
          <p>We're having trouble loading the product details. Please try again later.</p>
          <hr />
          <p className="mb-0">Error details: {error}</p>
        </div>
        <Button 
          variant="primary" 
          className="mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );

  if (!productDetails)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Product Not Found</h4>
          <p>The requested product could not be found.</p>
        </div>
      </div>
    );

    return (
        <>
            <div className='d-flex flex-column gap-5'>
                {/* product details */}
                <div className='d-flex justify-content-center align-items-center gap-5'> 
                    {/* product images  */}
                    <div className='d-flex align-items-center gap-3'>  
                        <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                            {productDetails.images.map((image, index) => (
                                <img 
                                    key={index}
                                    src={image} 
                                    style={{
                                        width: "170px", 
                                        height: "138px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setActiveImage(image)}
                                />
                            ))}
                        </div>
                        <Carousel 
                            className="product-carousel" 
                            style={{ width: "500px", height: "600px" }}
                            indicators={false}
                            controls={true}
                            interval={null}
                        >
                            {[productDetails.imageCover, ...productDetails.images].map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100 h-100"
                                        src={image}
                                        alt={`Product image ${index + 1}`}
                                        style={{ objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    {/* product details   */}
                    <div>
                        <h3>{productDetails.title.split(" ").slice(0, 2).join(" ")}</h3> 
                        <div className='d-flex gap-2'>     
                            <Rating name="read-only" value={productDetails.ratingsAverage} readOnly /> 
                            {productDetails.quantity > 0 ? (
                                <p style={{ color: "lightgreen" }}>in stock</p>
                            ) : (
                                <p style={{ color: "rgba(219, 68, 68, 1)" }}>out of stock</p>
                            )}      
                        </div>  
                        <p>{(productDetails.price * 0.9).toFixed(2)} $</p>  
                        <p style={{ width: "373px"}}>{productDetails.description}</p> 
                        <div style={{ borderBottom: "1px solid black" }}></div> 
                            
                        <div className='d-flex gap-2 mt-3'>
                            <p>Size:</p>
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeSelect(size)}
                                    style={{
                                        width: "32px",
                                        borderRadius: "5px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "10px",
                                        height: "32px",
                                        border: "1px  grey solid",
                                        backgroundColor: activeSize === size ? "rgba(219, 68, 68, 1)" : "white",
                                        color: activeSize === size ? "white" : "black",
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        <div className='d-flex mt-2 gap-2'>  
                            {/* + and - buttons  */}
                            <div className='d-flex gap-2 align-items-center'>
                                <button 
                                    onClick={() => setCounter((prev) => Math.max(prev - 1, 1))}
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "5px",
                                        border: "1px grey solid",
                                        backgroundColor: "white",
                                        color: "black",
                                    }}
                                >
                                    -
                                </button>
                                <p style={{ margin: "0 10px" }}>{counter}</p>
                                <button 
                                    onClick={() => setCounter((prev) => prev + 1)}
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "5px",
                                        border: "1px grey solid",
                                        backgroundColor: "rgba(219, 68, 68, 1)",
                                        color: "white",
                                    }}
                                >
                                    +
                                </button>
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                style={{
                                    width: "165px",
                                    height: "44px",
                                    borderRadius: "5px",
                                    border: "1px grey solid",
                                    backgroundColor: "rgba(219, 68, 68, 1)",
                                    color: "white",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                Buy Now
                            </button>

                            <button 
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "5px",
                                    border: "1px grey solid",
                                    backgroundColor: "white",
                                    color: "black",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onClick={handleWishlist}>
                                {wishlistItems.some(item => item.id === productDetails.id) ? (
                                    <FavoriteIcon style={{ color: "red", fontSize: "2rem" }} />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </button>
                        </div> 

              {/* delivary */}
              <div className='d-flex gap-2 mt-3 p-2' style={{ alignItems: "center",border:"1px solid black", width:"400px", height: "110px", borderRadius: "5px 5px 0px 0px"}}>
                <LocalShippingOutlinedIcon style={{width:"40px", height:"40px"}}/>
                <p>Free Delivery
                  <br />
                  Enter your postal code for Delivery Availability
                </p>
              </div>
              <div className='d-flex gap-2 p-2' style={{ alignItems: "center",border:"1px solid black", width:"400px", height: "110px", borderRadius: "0px 0px 5px 5px"}}>
                <SyncOutlinedIcon style={{width:"40px", height:"40px"}}/>
                <p>Return Delivery
                  <br />
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
                            
                    </div>
                </div>

                {/* related product */}
                <div className='d-flex mt-3 gap-3'>
                    <div style={{ width: "20px", height: "40px", backgroundColor: "rgba(219, 68, 68, 1)", borderRadius: "5px" }}></div>  
                    <h4 style={{ color: "rgba(219, 68, 68, 1)"}}>Related Item</h4>      
                </div>

                {/* Related Products Section */}
                <div>
                    <Row className="justify-content-center">
                        {relatedProducts.map((relatedProduct) => (
                            <Col
                                key={relatedProduct.id}
                                style={{ width: "270px", height: "322px" }}
                                className="d-flex flex-column mb-4 w-270 h-350"
                            >
                                <Card
                                    style={{ width: "270px", height: "312px" }}
                                    className="w-270 d-flex flex-column align-items-center justify-content-center product-card"
                                >
                                    <Link
                                        to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}
                                        className="text-decoration-none text-dark"
                                    >
                                        <div className="d-flex justify-content-center m-2 position-relative">
                                            <Card.Img 
                                                src={relatedProduct.imageCover}
                                                alt={relatedProduct.title}
                                                style={{ width: "120px", height: "140px", objectFit: "cover" }}
                                            />
                                            <button
                                                onClick={(e) => handleRelatedProductWishlist(e, relatedProduct)}
                                                className="position-absolute top-0 end-0 border-0 bg-transparent"
                                                style={{ margin: "5px" }}
                                            >
                                                {wishlistItems.some(item => item.id === relatedProduct.id) ? (
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
                                                    onClick={(e) => handleRelatedProductAddToCart(e, relatedProduct)}
                                                >
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <ShoppingCartOutlinedIcon style={{"color":"white"}}/>
                                                        <p>Add To Cart</p>
                                                    </div>
                                                </Button>
                                            </div>
                                            <div className="m-1 w-206 h-84">
                                                <div className="d-flex flex-column">
                                                    <div style={{ height: "25px", overflow: "hidden" }}>
                                                        <Card.Title>
                                                            {relatedProduct.title.split(" ").slice(0, 2).join(" ")}
                                                        </Card.Title>
                                                    </div>
                                                    <div className="d-flex gap-3">
                                                        <Card.Text>
                                                            <strong style={{ textDecoration: "line-through" }}>
                                                                ${relatedProduct.price}
                                                            </strong>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <strong style={{ color: "red" }}>
                                                                ${(relatedProduct.price * 0.9).toFixed(2)}
                                                            </strong>
                                                        </Card.Text>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-2 d-flex gap-2">
                                                        <Rating
                                                            name="read-only"
                                                            value={relatedProduct.ratingsAverage}
                                                            readOnly
                                                        />
                                                        <Badge bg="warning" text="light" className="ms-2">
                                                            {relatedProduct.ratingsAverage.toFixed(1)}
                                                        </Badge>
                                                        <Card.Text> ({relatedProduct.quantity}) </Card.Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}
