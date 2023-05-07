import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { cartItems } = useContext(CartContext);
  const items = cartItems["cartItems"];

  const itemCount = items.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.amount;
  }, 0);
  return (
    <button onClick={props.openModal} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default HeaderCartButton;
