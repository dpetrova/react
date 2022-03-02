/* class component with props */

import React from "react";
import Product from "./ProductClass";

//class component
// class Cart extends React.Component {
//   render() {
//     return (
//       <div>
//         {this.props.products.map((product, index) => (
//           <Product data={product} key={index}/>
//         ))}
//       </div>
//     );
//   }
// }

//function component
const Cart = (props) => (
  <div>
    {props.products.map((product, index) => (
      <Product data={product} key={index} />
    ))}
  </div>
);

export default Cart;
