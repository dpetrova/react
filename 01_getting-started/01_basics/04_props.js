/*
Adding props, or properties to your component means we add attributes to our component element. 
This means we can pass data from an outer component to an inner component. 
That data can either be data that we want to render, or a function that we want to invoke.
*/

/* Class component */
// 1.Define component
//Product.js
import React from "react";
class Product extends React.Component {
  render() {
    return <div>{this.props.data.name}</div>;
  }
}
export default Product;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Product from "./Product";
const product = {
  name: "Game Console",
};

ReactDOM.render(
  <div>
    <Product data={product} />,
  </div>,
  document.getElementById("app")
);

//two things are made:
// - Passed input data.
//   The product object was assigned to the data attribute. 
//   Note the use of {} to pass in the data. It's needed if want to pass something in and you want React to interpret it.
// - Rendered data. 
//   In the render() method you rendered the input data by returning it as JSX and by drilling down into it like so: this.props.data.name




/* Function component */
// 1.Define component
//Product.js
import React from 'react';
const Product = (props) => <div>{props.data.name}</div>
export default Product;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Product from "./Product";
const product = {
  name: "Game Console",
};

ReactDOM.render(
  <div>
    <Product data={product} />,
  </div>,
  document.getElementById("app")
);