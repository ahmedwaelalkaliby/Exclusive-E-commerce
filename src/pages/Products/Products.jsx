import React from 'react';
import { Row, Spinner, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { toast } from 'react-toastify';

import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../Components/Product/ProductCard';

// --- API Helper ---
const fetchProducts = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return data.data;
};

export default function Products() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { requireAuth } = useAuth();

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5000,
  });

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireAuth()) return;

    dispatch(cartActions.addToCart({
      id: product.id,
      name: product.title,
      price: product.price * 0.9,
      image: product.imageCover,
      quantity: 1
    }));
    toast.success("Added to cart!");
  };

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (!requireAuth()) return;

    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(product.id));
      toast.info("Removed from wishlist");
    } else {
      dispatch(wishlistActions.addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price * 0.9,
        image: product.imageCover,
        category: product.category.name,
        ratingsAverage: product.ratingsAverage || 0
      }));
      toast.success("Added to wishlist!");
    }
  };

  if (isLoading) return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="danger" />
    </div>
  );

  if (isError) return (
    <div className="text-center py-5">
      <p className="text-danger">Error: {error.message}</p>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <div className="container py-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInWishlist={wishlistItems.some(item => item.id === product.id)}
            onWishlist={handleWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Row>
    </div>
  );
}
