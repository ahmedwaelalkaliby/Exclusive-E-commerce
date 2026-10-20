import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaTruck, FaSyncAlt } from 'react-icons/fa';
import RatingStars from '../RatingStars';
import type { Product, WishlistItem } from '../../types';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';

interface ProductDetailsSectionProps {
  productDetails: Product;
  activeSize: string | null;
  counter: number;
  wishlistItems: WishlistItem[];
  handleSizeSelect: (size: string) => void;
  setCounter: Dispatch<SetStateAction<number>>;
  handleAddToCart: (event: MouseEvent<HTMLButtonElement>) => void;
  handleWishlist: () => void;
}

export default function ProductDetailsSection({ productDetails, activeSize, counter, wishlistItems, handleSizeSelect, setCounter, handleAddToCart, handleWishlist }: ProductDetailsSectionProps) {
  const isInWishlist = wishlistItems.some((item) => item.id === productDetails.id);

  return (
    <div className="flex flex-col gap-5 lg:col-span-1">
      <div>
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">{productDetails.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-slate-500"><RatingStars value={productDetails.ratingsAverage ?? 0} /><span>({productDetails.ratingsQuantity ?? 0} reviews)</span><span className="text-slate-300">|</span><span className={(productDetails.quantity ?? 0) > 0 ? 'text-emerald-600' : 'text-red-600'}>{(productDetails.quantity ?? 0) > 0 ? 'In stock' : 'Out of stock'}</span></div>
      </div>
      <p className="text-2xl font-semibold text-slate-950">${(productDetails.price * 0.9).toFixed(2)}</p>
      <p className="leading-7 text-slate-600">{productDetails.description}</p>
      <hr className="border-slate-200" />

      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-1 font-medium text-slate-900">Size:</span>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => <button key={size} type="button" onClick={() => handleSizeSelect(size)} className={`h-10 min-w-10 rounded border px-2 text-sm font-medium transition ${activeSize === size ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300 text-slate-800 hover:border-red-600'}`}>{size}</button>)}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded border border-slate-300">
          <button type="button" aria-label="Decrease quantity" onClick={() => setCounter((previous) => Math.max(previous - 1, 1))} className="px-4 py-2 text-lg hover:bg-slate-100">−</button>
          <span className="min-w-10 text-center">{counter}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setCounter((previous) => previous + 1)} className="px-4 py-2 text-lg hover:bg-slate-100">+</button>
        </div>
        <button type="button" onClick={handleAddToCart} className="flex-1 rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 sm:flex-none">Add to cart</button>
        <button type="button" onClick={handleWishlist} aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'} className="rounded border border-slate-300 p-3 text-xl text-slate-800 hover:border-red-600 hover:text-red-600">{isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}</button>
      </div>

      <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
        <div className="flex gap-4 p-4"><FaTruck size={24} className="mt-1 shrink-0" /><div><h2 className="font-semibold">Free Delivery</h2><p className="mt-1 text-sm text-slate-600">Enter your postal code for delivery availability.</p></div></div>
        <div className="flex gap-4 p-4"><FaSyncAlt size={24} className="mt-1 shrink-0" /><div><h2 className="font-semibold">Return Delivery</h2><p className="mt-1 text-sm text-slate-600">Free 30 day returns. Details</p></div></div>
      </div>
    </div>
  );
}
