import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cartActions } from '../../store/cartSlice';
import { toast } from '../../lib/toast';

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useAppDispatch();

  const removeItemHandler = (id: string, name: string) => {
    dispatch(cartActions.removeFromCart(id));
    toast.error(`${name} removed from cart`);
  };

  return (
    <section className="mx-auto max-w-5xl py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">Your shopping cart is empty</h2>
          <p className="my-3 text-slate-600">You have not added any items to your cart yet.</p>
          <Link to="/products" className="inline-flex rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">Browse products</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <article key={`${item.id}-${item.size || ''}`} className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                <img src={item.image} alt={item.name} className="h-28 w-full rounded-lg bg-slate-50 object-contain p-2 sm:w-28" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-600">Price: ${item.price.toFixed(2)} · Quantity: {item.quantity}</p>
                  {item.size && <p className="text-sm text-slate-600">Size: {item.size}</p>}
                  <p className="mt-1 font-semibold">Total: ${item.totalPrice.toFixed(2)}</p>
                </div>
                <button type="button" onClick={() => removeItemHandler(item.id, item.name)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Remove one</button>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-slate-50 p-6 sm:flex-row sm:items-center">
            <p className="text-xl font-bold text-slate-900">Total Amount: ${totalAmount.toFixed(2)}</p>
            <button type="button" onClick={() => toast.info('Checkout functionality coming soon!')} className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700">Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
}
