//A component that will not only provide the value from the Context object but also expose a method with which we can change the provided value

import React from "react";
import CartPage from "./CartPage";
import CartContext from "./cart";

//the state object consists of the properties cart and addItem
//and what gets passed into the value property of the CartContext.Provider is this.state e.g both cart and addItem()
class CartProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      total: void 0,
      addItem: (item) => {
        this.setState({
          cart: [...this.state.cart, { ...item }],
          total: this.state.cart.length,
        });
      },
    };
  }

  render() {
    return (
      <CartContext.Provider value={this.state}>
        <CartPage />
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
