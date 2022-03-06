/* 
Validate with PropTypes
As our components becomes more and more complicated, we want to ensure we use them correctly. 
For example, if a component has a certain property set, it should render it. 
We might even go so far as to convey that if a property is not set you should throw an error. 
The library "prop-types" helps you to define what properties are a must and helps us define what type they are.

The steps you need to take to use the library are:
    - download it
    - import it
    - configure, as define the properties your component should have and what type they are
 */


// 1. Download the library:
npm install prop-types
yarn add prop-types // or this one, depending on if you are using NPM or Yarn

// 2. Add the import and define the shape of the input:
//Product.js
import React from 'react';
import PropType from 'prop-types'; //import the library
 
const Product = (props) => <div>{props.data.name}</div>

//define the shape of the properties
Product.propTypes = {
   data : PropType.shape({
     name: PropType.string.isRequired,
   })
};
 
export default Product;

//3. Best practice
//It's considered a best practice to mark up every single input with a specific type. 
//Also it's considered a better practice to move in the propTypes as member of the class, like so:
//Jedi.js
class Jedi extends React.Component {
  static propTypes = {
    jedi : PropType.shape({
      name: PropType.string.isRequired,
    })
  };
  
  render() {
    return (
      <div>Name: {this.props.jedi.name}</div>
    );
  }
}