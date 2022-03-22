// withCart.js

//using a HOC, a higher order component.
//It means we can create a function where we use our component as input and we augment the context data.

import React from "react";
import CartContext from "./cart";

export const withCart = (Component) => {
  return function fn(props) {
    return (
      <CartContext.Consumer>
        {" "}
        {(context) => <Component {...props} {...context} />}
      </CartContext.Consumer>
    );
  };
};
