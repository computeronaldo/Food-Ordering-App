import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
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
