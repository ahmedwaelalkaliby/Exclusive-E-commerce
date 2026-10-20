import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import RatingStars from './RatingStars';
import { useAppDispatch } from '../store/hooks';
import { wishlistActions } from '../store/wishlistSlice';
import { toast } from '../lib/toast';
import type { WishlistItem } from '../types';

interface WishlistCardProps {
  item: WishlistItem;
  onMoveToCart: (item: WishlistItem) => void;
}

export default function WishlistCard({ item, onMoveToCart }: WishlistCardProps) {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(wishlistActions.removeFromWishlist(item.id));
    toast.error(`${item.name || 'Item'} removed from wishlist`);
  };

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button type="button" onClick={handleDelete} aria-label={`Remove ${item.name} from wishlist`} className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-red-600 shadow hover:bg-red-50"><AiOutlineDelete size={20} /></button>
      <Link to={`/productdetails/${item.id}/${item.category || 'uncategorized'}`} className="flex flex-1 flex-col text-slate-900">
        <div className="flex h-56 items-center justify-center bg-slate-50 p-5"><img src={item.image} alt={item.name} className="h-full w-full object-contain" /></div>
        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold">{item.name}</h3>
          <p className="my-2 font-bold text-red-600">${(item.price * 0.9).toFixed(2)} <span className="ml-2 text-sm font-normal text-slate-400 line-through">${item.price}</span></p>
          <div className="flex items-center gap-2 text-sm text-slate-500"><RatingStars value={item.ratingsAverage ?? 0} /><span>({item.quantity ?? 0})</span></div>
        </div>
      </Link>
      <button type="button" onClick={() => onMoveToCart(item)} className="flex items-center justify-center gap-2 bg-slate-950 px-4 py-3 font-medium text-white hover:bg-emerald-700"><AiOutlineShoppingCart size={20} />Move to cart</button>
    </article>
  );
}
