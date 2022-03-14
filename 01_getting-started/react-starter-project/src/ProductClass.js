/* Class component with props example */

import React from "react";
import PropType from "prop-types"; //library that helps defining what properties are a must and helps defining what type they are

class Product extends React.Component {
  //optional: validate props
  // static propTypes = {
  //   name: PropTypes.string,
  // };
  static propTypes = {
    data: PropType.shape({
      name: PropType.string.isRequired,
    }),
  };

  render() {
    return <div>{this.props.data.name}</div>;
  }
}
export default Product;
