import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { useGetProductQuery, useGetProductsQuery } from '../../store/api';
import ProductCard from '../Product/ProductCard';
import ImagesSlider from './ImagesSlider';
import ProductDetailsSection from './ProductDetailsSection';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function ProductDetails() {
  const { id, category } = useParams();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: productDetails, isLoading, isError, refetch } = useGetProductQuery(id ?? '', { skip: !id });
  const { data: products = [] } = useGetProductsQuery();
  const relatedProducts = products.filter((product) => product.category.name === category && product.id !== id);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [counter, setCounter] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading) return <div className="d-flex justify-content-center py-5"><Spinner animation="border" variant="danger" /></div>;
  if (isError) return <div className="container text-center py-5"><div className="alert alert-danger">Unable to load this product.<Button className="ms-3" onClick={refetch}>Retry</Button></div></div>;
  if (!productDetails) return null;

  const handleSizeSelect = (size: string) => {
    setActiveSize(size);
    toast.info(`Size ${size} selected`, { autoClose: 1500 });
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) return toast.error('Please login to continue!');
    if (!activeSize) return toast.warning('Please select a size first!', { autoClose: 2000 });
    dispatch(cartActions.addToCart({
      id: productDetails.id,
      name: productDetails.title,
      price: productDetails.price * 0.9,
      image: activeImage || productDetails.imageCover,
      quantity: counter,
      size: activeSize,
    }));
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    if (!isAuthenticated) return toast.error('Please login to continue!');
    const isInWishlist = wishlistItems.some((item) => item.id === productDetails.id);
    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(productDetails.id));
      toast.info('Removed from wishlist!');
    } else {
      dispatch(wishlistActions.addToWishlist({
        id: productDetails.id,
        name: productDetails.title,
        price: productDetails.price * 0.9,
        image: productDetails.imageCover,
        category: productDetails.category.name,
        ratingsAverage: productDetails.ratingsAverage || 0,
      }));
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-5">
        <ImagesSlider imageCover={productDetails.imageCover} images={productDetails.images || []} activeImage={activeImage} setActiveImage={setActiveImage} />
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
      <h4 className="text-danger my-4">Related Items</h4>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {relatedProducts.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
      </Row>
    </div>
  );
}
