/* Function component with props example */

import React from "react";
import PropType from "prop-types"; //library that helps defining what properties are a must and helps defining what type they are

const Product = (props) => <div>{props.data.name}</div>;

//optional: validate props as define the shape
Product.propTypes = {
  data: PropType.shape({
    name: PropType.string.isRequired,
  }),
};

export default Product;
