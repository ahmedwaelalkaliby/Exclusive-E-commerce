import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { wishlistActions } from "../../store/wishlistSlice";
import { cartActions } from "../../store/cartSlice";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Wishlist.module.css";
import WishlistCard from "../../Components/WishlistCard";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  // Move item to cart
  const moveToCart = (item) => {
    try {
      if (!item || !item.id || !item.name || !item.price || !item.image) {
        throw new Error("Invalid item data");
      }

      dispatch(
        cartActions.addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        })
      );

      dispatch(wishlistActions.removeFromWishlist(item.id));

      toast.success(`${item.name} moved to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`Failed to move ${item?.name || "item"} to cart.`, {
        position: "top-right",
        autoClose: 2000,
      });
      console.error("Error moving item to cart:", error);
    }
  };

  return (
    <div className={style.wishlistContainer}>
      <h2>Your Wishlist</h2>

      {/* Empty State */}
      {!wishlistItems || wishlistItems.length === 0 ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <div className="alert alert-info text-center" role="alert">
            <h4 className="alert-heading">Your wishlist is empty</h4>
            <p>You haven't added any items to your wishlist yet.</p>
            <hr />
            <p className="mb-0">
              <Link to="/" className="alert-link">
                Browse our products
              </Link>{" "}
              to find something you like!
            </p>
          </div>
        </div>
      ) : (
        // Wishlist Items Grid
        <Row className="justify-content-center">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onMoveToCart={moveToCart}
            />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Wishlist;
