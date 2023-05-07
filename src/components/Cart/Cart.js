import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const items = cartItems["cartItems"];

  const totalAmount = items
    .reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.price * currentValue.amount;
    }, 0)
    .toFixed(2);

  const CartRenderItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
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
        />
      ))}
    </ul>
  );

  return (
    <Modal closeModal={props.closeModal}>
      {CartRenderItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.closeModal} className={classes["button--alt"]}>
          Cancel
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
