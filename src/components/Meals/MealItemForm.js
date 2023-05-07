import React, { useContext } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  const { addToCart } = useContext(CartContext);

  const inputRef = React.createRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const cartItem = {
      id: props.id,
      name: props.name,
      amount: +inputRef.current.value,
      price: props.price,
    };

    inputRef.current.value = "1";
    addToCart(cartItem);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
