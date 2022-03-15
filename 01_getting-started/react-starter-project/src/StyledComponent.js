import React from "react";
import styled, { css } from "styled-components";

// a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  border-radius: ${(props) => (props.round ? "50%" : "7px")};
`;

// a Button component that'll render a <button> tag with some styles
const Button = styled.button`
  background: black;
  color: white;
  border-radius: 7px;
  padding: 20px;
  margin: 10px;
  font-size: 16px;
  :disabled {
    opacity: 0.4;
  }
  :hover {
    box-shadow: 0 0 10px yellow;
  }
  ${(props) =>
    props.primary &&
    css`
      background: green;
      color: white;
    `}
  border-radius: ${(props) => (props.round ? "50%" : "7px")}
`;

// use Title and Wrapper like any other React component
const Element = ({ text, className }) => (
  <Wrapper>
    <Title>{text}</Title>
    <Button className={className}>Styled Button</Button>
  </Wrapper>
);

export default Element;
