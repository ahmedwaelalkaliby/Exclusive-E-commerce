import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { wishlistActions } from "../../store/wishlistSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import ProductCard from "../Product/ProductCard";
import ImagesSlider from "./ImagesSlider";
import ProductDetailsSection from "./ProductDetailsSection";

export default function ProductDetails() {
  const { id, category } = useParams();
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

  /* ================= FETCH PRODUCT ================= */

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );

      const related = data.data.filter(
        (product) =>
          product.category.name === category &&
          product.id !== id
      );

      setRelatedProducts(related);
    } catch (err) {
      console.error("Error fetching related products:", err);
      setRelatedProducts([]);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id, category]);

  /* ================= HANDLERS ================= */

  const handleSizeSelect = (size) => {
    setActiveSize(size);
    toast.info(`Size ${size} selected`, { autoClose: 1500 });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!activeSize) {
      toast.warning("Please select a size first!", {
        autoClose: 2000,
      });
      return;
    }

    dispatch(
      cartActions.addToCart({
        id: productDetails.id,
        name: productDetails.title,
        price: productDetails.price * 0.9,
        image: productDetails.imageCover,
        quantity: counter,
        size: activeSize,
      })
    );

    toast.success(
      `${productDetails.title
        .split(" ")
        .slice(0, 2)
        .join(" ")} added to cart!`
    );
  };

  const handleWishlist = () => {
    if (!requireAuth()) return;

    const isInWishlist = wishlistItems.some(
      (item) => item.id === productDetails.id
    );

    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(productDetails.id));
      toast.error("Removed from wishlist!");
    } else {
      dispatch(
        wishlistActions.addToWishlist({
          id: productDetails.id,
          name: productDetails.title,
          price: productDetails.price * 0.9,
          image: productDetails.imageCover,
          category: productDetails.category.name,
          ratingsAverage: productDetails.ratingsAverage || 0,
        })
      );
      toast.success("Added to wishlist!");
    }
  };

  /* ================= LOADING / ERROR ================= */

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
        <Spinner animation="border" variant="danger" style={{ width: "4rem", height: "4rem" }} />
      </div>
    );

  if (error)
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">
          <h4>Error Loading Product</h4>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );

  if (!productDetails) return null;

  /* ================= RENDER ================= */

  return (
    <div className="container my-5">

      <div className="row g-5">

        {/* LEFT SIDE */}
        <ImagesSlider
          imageCover={productDetails.imageCover}
          images={productDetails.images}
          setActiveImage={setActiveImage}
        />

        {/* RIGHT SIDE */}
        <ProductDetailsSection
          productDetails={productDetails}
          activeSize={activeSize}
          counter={counter}
          wishlistItems={wishlistItems}
          handleSizeSelect={handleSizeSelect}
          setCounter={setCounter}
          handleAddToCart={handleAddToCart}
          handleWishlist={handleWishlist}
        />

      </div>

      {/* RELATED SECTION */}
  <div style={{ position: "relative", marginTop: "1.25rem", height: "40px" , margin: "40px 0" }}>
  <div
    style={{
      position: "absolute",
      left: 0, 
      top: 0,
      width: "20px",
      height: "40px",
      backgroundColor: "rgba(219, 68, 68, 1)",
      borderRadius: "5px",
    }}
  />
 
  <h4
    style={{
      position: "absolute",
      left: "30px", 
      top: 0,
      height: "100%",
      margin: 0,
      display: "flex",
      alignItems: "center",
      color: "rgba(219, 68, 68, 1)",
    }}
  >
    Related Items
  </h4>
</div>


      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {relatedProducts?.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInWishlist={wishlistItems.some(
              (item) => item.id === product.id
            )}
          />
        ))}
      </Row>
    </div>
  );
}
