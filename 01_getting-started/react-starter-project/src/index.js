import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import JediClassComponent from "./JediClass";
import JediFunctionComponent from "./JediFunction";
import ProductClassComponent from "./ProductClass";
import ProductFunctionComponent from "./ProductFunction";
import Cart from "./Cart";
import Person from "./Person";
import Method from "./Method";
import Conditional from "./Conditional";
import Ternary from "./TernaryFunction";
import TernaryClass from "./TernaryClass";
import IfElse from "./IfElse";
import StyledComponent from "./StyledComponent";
import Text from "./Text";

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

const Decoratedtext = styled(Text)`
  font-size: 1.5em;
  color: violet;
`;

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
    {/* component with a state that will be changed */}
    <Person name={"Pesho"} />
    {/* component with a method wired up to click event */}
    <Method />
    {/* component with conditional rendering if true */}
    <Conditional />
    {/* functional component with conditional rendering using ternary expression */}
    <Ternary />
    <TernaryClass />
    {/* component with conditional rendering if-else */}
    <IfElse />
    {/* styled component */}
    <StyledComponent text={"I am a styled component"} className={"round"} />
    <Decoratedtext text={"I am a styled text"} />
  </div>,
  document.getElementById("app")
);
