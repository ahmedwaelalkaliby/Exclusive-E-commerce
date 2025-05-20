import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import style from './Cart.module.css';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const removeItemHandler = (id, name) => {
    dispatch(cartActions.removeFromCart(id));
    toast.error(`${name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className={style.cartContainer}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={style.cartItem}>
                <img src={item.image} alt={item.name} />
                <div className={style.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Total: ${item.totalPrice}</p>
                </div>
                <button
                  onClick={() => removeItemHandler(item.id, item.name)}
                  className={style.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={style.cartSummary}>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button 
              className={style.checkoutButton}
              onClick={() => toast.info('Checkout functionality coming soon!', {
                position: "top-right",
                autoClose: 2000,
              })}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 