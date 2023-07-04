import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { cartItems, addToCart, deleteFromCart } = useContext(CartContext);

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

  const submitOrderHandler = (userData) => {
    fetch("https://react-http-479d8-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartItems,
      }),
    });
  };

  return (
    <Modal closeModal={props.closeModal}>
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
    </Modal>
  );
};

export default Cart;
