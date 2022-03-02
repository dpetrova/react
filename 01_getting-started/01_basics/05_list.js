/*
When Rendering a list, you still need to return JSX but use a function like map() to iterate through your content.
*/

/* Class component */
// 1.Define component
//Cart.js
import React from "react";
import Product from "./Product";

class Cart extends React.Component {
  render() {
    return (
      <div>
        {this.props.products.map((product, index) => (
          <Product data={product} key={index}/>
        ))}
      </div>
    );
  }
}
export default Cart;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";

const products = [{ name: "Game console" }, { name: "Laptop" }];

ReactDOM.render(
  <div>
    <Cart products={products} />
  </div>,
  document.getElementById("app")
);

/* Function component */
// 1.Define component
//Cart.js
import React from "react";
import Product from "./ProductClass";

const Cart = (props) => (
  <div>
    {props.products.map((product, index) => (
      <Product data={product} key={index} />
    ))}
  </div>
);
export default Cart;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";

const products = [{ name: "Game console" }, { name: "Laptop" }];

ReactDOM.render(
  <div>
    <Cart products={products} />
  </div>,
  document.getElementById("app")
);
