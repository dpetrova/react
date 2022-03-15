import React from "react";
import PropTypes from "prop-types";

const Text = ({ text, className }) => <div className={className}>{text}</div>;

Text.propTypes = {
  text: PropTypes.string,
  className: PropTypes.any,
};

export default Text;
