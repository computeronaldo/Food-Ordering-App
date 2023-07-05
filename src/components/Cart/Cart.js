import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const { cartItems, addToCart, deleteFromCart, clearCart } =
    useContext(CartContext);

  const totalAmount = cartItems
    .reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.price * currentValue.amount;
    }, 0)
    .toFixed(2);

  const CartRenderItems = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={() =>
            addToCart({
              id: item.id,
              name: item.name,
              amount: 1,
              price: item.price,
            })
          }
          onRemove={() => deleteFromCart({ id: item.id })}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-479d8-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartItems,
        }),
      }
    );
    // we awaited for submission and assumed no errors would occur
    // so it makes perfect sense to set isSubmitting state to false
    setIsSubmitting(false);
    // and also set did submit to true using above mentioned reasoning
    setDidSubmit(true);
    clearCart();
  };

  const cartModalContent = (
    <>
      {CartRenderItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onCancel={props.closeModal} onConfirm={submitOrderHandler} />
      )}
      {!isCheckingOut && (
        <div className={classes.actions}>
          <button onClick={props.closeModal} className={classes["button--alt"]}>
            Cancel
          </button>
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <div className={classes["actions-center"]}>
      <p>Successfully sent the order!</p>
      <button className={classes.button} onClick={props.closeModal}>
        Back to menu
      </button>
    </div>
  );

  return (
    <Modal closeModal={props.closeModal}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
