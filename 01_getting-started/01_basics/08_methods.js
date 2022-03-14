/* Events in React

When you build components you are going to want to add methods to it. You are going to attach methods to different events such as submit, click, change etc.
One thing you need to keep in mind is that React changes the name and the casing of the event.
What happens is that the text "on" is prepended to the event name, and event name is capitalized, e.g:
Event name    Name in React
click	        onClick
change        onChange
submit        onSubmit

To wire up an event to an event handler a method, you need the name of the event (the React version of its name) and a function. 
This process looks slightly different if you are using a class based component or a function based.
*/


/* 1. Class component */

// 1.1 Using handler.bind(this) like statement
class Element extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this); //ensures the method knows what this is
  } 

  clicked() {
    console.log('clicked');
    console.log(this.props.someAttribute);
  }

  render() {
    return (
      <button onClick={this.clicked}></button>
    )
  }
}

//Note two points of interest:
// 1.1.1. the constructor
//In the constructor there's a line of code that ensures the method knows what this is:
this.clicked = this.clicked.bind(this);

//the reason we need this is when you want to access properties on the component inside of the clicked() method:
clicked() {
 console.log(this.props.someAttribute); 
}

//The code would have printed the value of someAttribute, if it was set at bind time.
//Had you NOT done the row in the constructor you would have gotten an error.

// 1.1.2. the JSX
//In the JSX part, in the render() function, the actual wire up is done:
<button onClick={this.clicked}></button>

//Thanks to the row in the constructor, you can now refer to this.linked, and you don't have to worry about the value of "this".

//At this point, your code works using the handler.bind(this) like statement, but it doesn't feel all too pretty.
//You will need to do this for every method that you intend to bind to an event.
//Is there a better way? Actually there are two more ways we could solve "this":


// 1.2 Invoke method as a lambda
//This approach means to use an arrow function in your JSX handler expression.
class Element extends React.Component {
  constructor() {
    super();
  }

  state = {
    str: 'test'
  }
  
  clicked(evt, additionalArgument) {
    console.log('clicked ' + this.state.str);
    console.log(evt)
    console.log(additionalArgument)
  }
  
  render() {
    return (
      <button onClick={(evt) => this.clicked(evt, "someOtherArgument")}></button>
    )
  }
}

//With this variant, you can skip the bind in the constructor. 
//Additionally, it gives you the ability to pass a value to the event callback. 
//You can pass the event object and any other custom arguments


// 1.3 Declare method as a field in the class
class Element extends React.Component {
  constructor() {
    super();
    this.clicked = this.clicked.bind(this);
  }
  
  state = {
    str: 'test'
  }
  
  //this is the preferred way of declaring methods on a class
  clicked = () => {
    console.log('clicked ' + this.state.str);
  }
  
  render() {
    return (
      <button onClick={this.clicked}></button>
    )
  }
}




/* 2. Function component */

//Wiring up to an event handler in functional component is a lot easier to deal. For one thing, you don't have to worry about the value of "this"
import React from 'react'

const AComponent = (props) => {
  function handler(evt) {
    console.log('clicked'); 
  }

  return (
    <div>
      <button onClick={handler}></button>
    </div> 
  )
}

export default AComponent;