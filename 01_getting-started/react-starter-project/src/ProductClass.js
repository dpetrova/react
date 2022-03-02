/* Class component with props example */

import React from "react";

class Product extends React.Component {
  render() {
    return <div>{this.props.data.name}</div>;
  }
}
export default Product;
