/* Styled components */
//the styling library for React apps you don’t want to be without

// 1. The case for the styled components approach
//When you start out styling your React components you may opt for defining CSS classes and assigning them to each element, like so:
<div className=”card”>
  <div className=”card-header”>
    <h3>{card.header}</h3>
  </div>
  <div className=”content”>{card.content}</div>
</div>

//There is really nothing wrong with the above, it is a viable approach.

// 2. Installing and setting up styled-components
//We can simply install styled-components via NPM:
yarn add styled-components
// OR
npm install --save styled-components

// 3. Using styled-components library
//We will take an example of buttons. 
//You might end up creating different buttons meant for different purposes in your app. 
//You might have default buttons, primary buttons, disabled buttons and so on. 
//Styled components lib enable you to keep all that CSS in one place.

// Let’s start off by importing the librarry:
import styled from 'styled-components'

// To use it we need to use double back ticks ``:
styled.nameOfElement``

//To define a style for our element. Let’s add some style to it:
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
`

//What we can see from the above example is that we are able to use normal CSS properties in combination with pseudo selectors like :disabled and :hover.

//If we want to use our Button as part of our JSX we can simply do so:
<div>
  <Button>
    press me
  </Button>
</div>

// 4. Using attributes
//The styled-component library can apply styles conditionally by looking for the occurrence of a specified attribute on our element. 
//We can use existing attributes as well as custom ones that we make up.

//Let’s now show the usage of attributes with styled-components to create different types of buttons. 
//We have our styled Button and we can add the attribute primary, like so:
<Button primary >I am a primary button</Button>

//Next step is updating our Button definition and write some conditional logic for if this attribute primary is present.
//We can do so with the following construct:
${props => props.primary && css``}

//We use the ${} to signal that we are running some conditional logic and we refer to something called props. 
//props is simply a dictionary containing all the attributes on our element. 

//Below we use the above construct add some styling that we should only apply if the primary attribute is present.
//We needed to use the css function, that we find in the styled-components namespace 
import styled, { css } from 'styled-components';

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
  ${props => props.primary && css`
    background: green;
    color: white;
  `}
`

// 5. Adapting
//We’ve shown how we can look at if certain attributes exist but we can also set different values on a property depending on whether an attribute exists.
//Let’s have a look at the below code where we change the border-radius depending whether a circle attribute is set:
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
  ${props => props.primary && css`
    background: green;
    color: white;
  `}
  border-radius: ${props => (props.round ? '50%' : '7px')}
`

//We can trigger the above code to be rendered by declaring our Button like so:
<Button round >Round</Button>

// 6. Styling an existing component
//This one is great for styling 3rd party components or one of your own components.
//Imagine you have the following components:
// Text.js
import React from "react";
import PropTypes from "prop-types";

const Text = ({ text, className }) => (
  <div className={className}> Here is text: {text}</div>
);

Text.propTypes = {
  text: PropTypes.string,
  className: PropTypes.any,
};

export default Text;

//Now to style this one we need to use the styled function in a little different way. 
//We need to call it like a function with the component as a parameter like so:
const DecoratedText = styled(Text)`
  // define styles
`;

<DecoratedText text={"I am now decorated"} className={heading}/>

//As you can see above calling the styled() function means that it under the hood produces a className that it injects into our component.

// 7. Inheritance
//We can easily take an existing style and add to it by using the method extend:
const GiantButton = Button.extend`
  font-size: 48px;
`;

// 8. Change Styled components
//In some cases, you might want to apply the style intended for a specific type of element and have that applied to another type of element.
//E.g. you might like all the styling a specific button comes with but you might want to apply that on an anchor element instead. 
//Using the withComponent() method allows you to do just that:
const LinkButton = Button.withComponent('a');

//The end result of the above operation is an anchor, <a> tag with all the styling of a Button.

// 9. Using the attribute function
//Sometimes all you need is just to change a small thing in the component styling. 
//For that the attrs() function allows you to add a property with a value:
const FramedText = styled(Text).attrs({ title: "framed" })`
  border: solid 2px black;
  color: blue;
  font-size: 16px;
  padding: 30px;
`

//Another example is:
const Button = styled.button.attrs({ title: "titled" })`
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
  ${props => props.primary && css`
    background: green;
    color: white;
  `}
  border-radius: ${props => (props.round ? "50%" : "7px")}
`