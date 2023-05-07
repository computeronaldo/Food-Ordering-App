import React, { useReducer } from "react";

const CartContext = React.createContext({
  cartItems: [],
  addToCart: (item) => {},
  deleteFromCart: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const targetIndex = state.cartItems.findIndex(
      (cartItem) => cartItem.id === action.val.id
    );

    if (targetIndex !== -1) {
      const updatedItems = state.cartItems;
      updatedItems[targetIndex].amount =
        state.cartItems[targetIndex].amount + action.val.amount;
      return {
        cartItems: [...updatedItems],
      };
    }

    return {
      cartItems: [
        ...state.cartItems,
        {
          id: action.val.id,
          name: action.val.name,
          price: action.val.price,
          amount: action.val.amount,
        },
      ],
    };
  }

  return {
    cartItems: [],
  };
};

export const CartContextProvider = (props) => {
  const [cartItemsState, dispatchCart] = useReducer(cartReducer, {
    cartItems: [],
  });

  const addToCartHandler = (item) => {
    dispatchCart({ type: "ADD_TO_CART", val: item });
  };

  const deleteFromCartHandler = (id) => {};

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItemsState,
        addToCart: addToCartHandler,
        deleteFromCart: deleteFromCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
