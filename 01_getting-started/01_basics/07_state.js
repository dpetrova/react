/*
State is how we can change the data inside of a component. 
You used to only be able to change state from class based components. 
However, thanks to Hooks, you can use functional components as well.

Props can't be changed
Props are great, but lack the ability to be changed in the component they are added in.
*/

//the problem:
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Element extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  // THIS WON'T WORK
  changeName() {
    this.props.name = 'new name';
  }

  render() {
    return (
      <div>{this.props.name}</div>
      <button onClick={() => this.changeName()} ></button>
    )
  }
}

//if you try to change the name property React won't let you do that
//Instead we need to rely on state



/* State in Class component*/

// 1. Create the state
//There are two ways we can create the state:

// 1.1.In the constructor:
// By declaring a field on the class called state, you can assign to it in the constructor and thereby construct an initial state:
constructor() {
  this.state = {
    cart: [],
    discounts: []
  }
}

// 1.2 Create an inline field
// Instead of creating the field state in the constructor, you can instead create an inline field that you then can set:
class Element extends React.Component {
  state = {
    field : 'some value'
  }
}

// 2. Access the state

// 2.1.Accessing the state is done by calling by referring to this.state and the name of the property:
this.state.nameOfYourProperty

// 2.2.Destructuring
//If you have many properties to render, you might want to use destructuring to dig out the values
//consider the following example:
render() {
  return (
    <React.Fragment>
      <div>{this.state.name}</div>
      <div>{this.state.description}</div>
    </React.Fragment>
  )
}

//let's apply destructuring:
render() {
  const { name, description } = this.state
  return (
    <React.Fragment>
      <div>{name}</div>
      <div>{description}</div>
    </React.Fragment>
  )
}

//Using destructuring is good pattern to use and can be used to dig out information from this.props as well.

// 3. Change the state

//To change state, you need to work with this.state over this.props. 
//You also can't reassign content to this this.state:
this.state.name = 'new value'; // wouldn't work

//Instead, you need to use the method setState(). 
//The method setState() is smart, it accepts whole or part of the state to do the necessary changes. 
//e.g. if you've initalized a state:
this.state = {
  name: 'initial name',
  description: 'initial description'
}

//to change your state you need to call the setState() method and provide it the slice of change you want to change here:
this.setState({
  name: 'new name'
})

//this instruction will only affect the name property, description will be left untouched.

//Note: the change is asynchronous, it doesn't happen straight away. 
//If you need to know exactly when the change has been carried out, use a callback as the second parameter to setState():
this.setState({ name: 'new value' }, function() {
  // change has happened here
})




/* State in Functional component*/

//Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
