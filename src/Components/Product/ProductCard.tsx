import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';
import { toast } from '../../lib/toast';
import type { Product } from '../../types';
import type { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const discountedPrice = (product.price * 0.9).toFixed(2);

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to continue!');
    dispatch(cartActions.addToCart({ id: product.id, name: product.title, price: product.price * 0.9, image: product.imageCover }));
    toast.success('Added to cart!');
  };

  const handleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuthenticated) return toast.error('Please login to continue!');
    if (isInWishlist) {
      dispatch(wishlistActions.removeFromWishlist(product.id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(wishlistActions.addToWishlist({ id: product.id, name: product.title, price: product.price * 0.9, image: product.imageCover, category: product.category.name, ratingsAverage: product.ratingsAverage }));
      toast.success('Added to wishlist!');
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button type="button" onClick={handleWishlist} aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'} className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-xl shadow hover:text-red-600">
        {isInWishlist ? <AiFillHeart className="text-red-600" /> : <AiOutlineHeart />}
      </button>
      <Link to={`/productdetails/${product.id}/${product.category.name}`} className="flex flex-1 flex-col text-slate-900">
        <div className="flex h-56 items-center justify-center bg-slate-50 p-5">
          <img src={product.imageCover} alt={product.title} className="h-full w-full object-contain transition group-hover:scale-105" />
        </div>
        <button type="button" onClick={handleAddToCart} className="flex items-center justify-center gap-2 bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-red-600">
        <AiOutlineShoppingCart size={20} /> Add to cart
      </button>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 min-h-12 font-semibold">{product.title}</h3>
          <div className="my-2 flex items-center gap-2">
            <span className="font-bold text-red-600">${discountedPrice}</span>
            <span className="text-sm text-slate-400 line-through">${product.price}</span>
          </div>
          <div className="mt-auto flex items-center gap-2 text-sm text-slate-500">
            <RatingStars value={product.ratingsAverage ?? 0} />
            <span>({product.quantity ?? 0})</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
