import React from "react";
import ReactDOM from "react-dom";
import JediClassComponent from "./JediClass";
import JediFunctionComponent from "./JediFunction";
import ProductClassComponent from "./ProductClass";
import ProductFunctionComponent from "./ProductFunction";
import Cart from "./Cart";

const product = {
  name: "Game console",
};

const products = [
  {
    name: "Game console",
  },
  {
    name: "Laptop",
  },
];

ReactDOM.render(
  <div>
    {/* class component */}
    <JediClassComponent />
    {/* function component */}
    <JediFunctionComponent />
    {/* data property is assigned to with the product object. */}
    <ProductClassComponent data={product} />
    <ProductFunctionComponent data={product} />
    {/* products property is assigned to with the products object. */}
    <Cart products={products} />
  </div>,
  document.getElementById("app")
);
