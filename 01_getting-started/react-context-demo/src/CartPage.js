// A containing our Consumer component
import React from "react";
import CartContext from "./cart";

const products = [
  {
    id: 1,
    title: "Fortnite",
  },
  {
    id: 2,
    title: "Doom",
  },
  {
    id: 3,
    title: "Quake",
  },
];

//we use CartContext component and that we define and display our cart value;
//in addition addItem() method wich allow us to change the cart item,
const CartPage = () => (
  <CartContext.Consumer>
    {({ cart, addItem }) => (
      <React.Fragment>
        <div>
          <h2>Product list</h2>
          {products.map((p) => (
            <button onClick={() => addItem(p)} value={p} key={p.id}>
              {p.title}
            </button>
          ))}
        </div>
        <div>
          <h2>Cart</h2>
          {cart.map((item, index) => (
            <div key={index}> {item.title} </div>
          ))}
        </div>
      </React.Fragment>
    )}
  </CartContext.Consumer>
);

export default CartPage;
