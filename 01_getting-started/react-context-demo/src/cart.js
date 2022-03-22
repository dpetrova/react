// cart.js
import React from "react";

//creating our Context object
const CartContext = React.createContext({
  cart: [],
  total: void 0, //a note void 0 is just the same as undefined
  addItem: () => {},
});

export default CartContext;
