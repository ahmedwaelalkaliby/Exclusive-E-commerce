import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from '../../lib/toast';
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

  if (isLoading) return <div className="grid min-h-72 place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-red-600" role="status" aria-label="Loading product" /></div>;
  if (isError) return <div className="py-16 text-center"><p className="mb-4 text-red-600">Unable to load this product.</p><button type="button" className="rounded bg-slate-900 px-5 py-2 text-white hover:bg-red-600" onClick={refetch}>Retry</button></div>;
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
    <div className="mx-auto my-8 max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-2">
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
      <h2 className="my-8 text-2xl font-bold text-slate-950">Related Items</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
