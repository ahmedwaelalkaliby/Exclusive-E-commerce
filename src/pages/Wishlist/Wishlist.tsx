import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { toast } from '../../lib/toast';
import WishlistCard from '../../Components/WishlistCard';
import type { WishlistItem } from '../../types';

export default function Wishlist() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const moveToCart = (item: WishlistItem) => {
    dispatch(cartActions.addToCart({ id: item.id, name: item.name, price: item.price, image: item.image }));
    dispatch(wishlistActions.removeFromWishlist(item.id));
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <section className="mx-auto max-w-7xl py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
          <p className="my-3 text-slate-600">You have not added any items to your wishlist yet.</p>
          <Link to="/products" className="inline-flex rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistItems.map((item) => <WishlistCard key={item.id} item={item} onMoveToCart={moveToCart} />)}
        </div>
      )}
    </section>
  );
}
