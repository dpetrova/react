/* Redux Form */

//"redux-form" is a library that makes it easier to handle forms and make them fit into the Redux system. 

//Let's discuss briefly how we normally approach Forms without using this library:
state = {
  value: ''
}

onSubmit = (evt) => {
  // check the values, if ok, submit
}

onChange = (evt) => {
  this.setState({
    value: evt.target.value
  })
}

render() {
  return (
    <form onSubmit={this.onSubmit}>
      <div>
        <input onChange={this.onChange} value={this.state.value} />
      </div>
    </form>
  )
}

//Above we show a few things we need to do work with forms:
// - keep track of when the value of inputs change, using onChange
// - respond to a submit, using onSubmit
// - validating input: from checking wether an input is there at all or matching some pattern or may even need to check on server side wether something validates or not
// - check if its pristine, untouched: if so no need to validate and definitely we shouldn't allow a submit to happen

//"redux-form" library helps us with all these things.




/* 1. Install and Set up */

//Installing it:
yarn add redux-form

//It's assuming you already add:
yarn add redux, react-redux

//What we need to do to setup is to add some code in the file where we create the root reducer:

// store.js
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  value: reducer,
  form: formReducer,
});

export default rootReducer;

//Above we have a reducer function called reducer that we pass as a parameter to combineReducers. 
//We create an association so that the function reducer takes care of value in the state of our store. 
//To get redux-form to work we need to create the value form and let a form reducer take care of it.





/* 2. Your first redux-form instance */

//Because this is Redux it means that we need to create the following:
// - a container component
// - a presentation component

//There is a difference though, instead of using a connect function, to create our container component, we will be using a function called reduxForm to achieve it. 
//Let's create a simple form and turn it into a redux-form:

// TodoForm.js
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <Field name="title" component="input" type="text"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
TodoForm = reduxForm({
  form: 'todo' // a unique name for this form
})(TodoForm);

export default TodoForm;

//Ok, so now we have our presentation form and as you can see above we are passing a handleSubmit function through our props. 
//Another thing is the usage of Field component that is an abstraction over any type of input that we want to create. 
//In this case we use to create a normal input tag but it can be made to represent any type of form field.
//Let's turn into a container component. 
//We do that by simply calling reduxForm.
//As you can see above we are calling reduxForm with an object that has the property form that needs to have a unique value, so we give it the value todo. 
//This is so our store can differ between different forms when tracking its values. 

//At this point let's put this in use. 
//We will create a TodoPage component:

// TodoPage.js
import React from 'react';
import TodoForm from './containers/TodoForm';

class TodoPage extends React.Component {
  handle = (values) => {
   // Do something with the form values
    console.log(values);
  }

  render() {
    return (
    <TodoForm onSubmit={this.handle} />
    );
  }
}

export default TodoPage;

//What we can see above is how we render out the TodoForm component and we also assign a function to its property onSubmit. 
//Here the input of handle() method is the parameter values that is an object representing our form looking like so: values: { title: 'the value you typed' }
//This is where redux-form has done its magic, in a normal form the input parameter on an onSubmit for a form would be an event instead.




/* 3. A more advanced example */

//This library comes pack with useful functionality:
// - pristine: boolean saying where we interacted with the form at all
// - reset: function that allows us to reset the form to its previous state
// - submitting: boolean that determines wether we are submitting

//Now back to our TodoForm.js, we will try to enhance it a little bit by adding the above properties:

// TodoForm.js
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    // rest of the form definition
  }
}

// Decorate the form component
TodoForm = reduxForm({
  form: 'todo' // a unique name for this form
})(TodoForm);

export default TodoForm;

//The change consists of digging out pristine, reset and submitting from props. 
//Now let's add them to our form markup. 
//We can add pristine and submitting on our button and disable the button if either of those properties are true. 
//It really makes no sense to allow a submit button to be pushed in the middle of submitting or when the user hasn't even interacted with the form. 
//It makes no sense to resetting a form that hasn't been interacted with.
//Our markup therefore now looks like so:

// TodoForm.js - excerpt
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="title">Title</label>
    <Field name="title" component="input" type="text" />
  </div>
  <div>
    <label htmlFor="email">Email</label>
    <Field name="email" component="input" type="email" />
  </div>
  <button disabled={ pristine || submitting } type="submit">Submit</button>
  <button onClick={reset} disabled={pristine}>Reset</button>
</form>





/* 4. Validating the form */

//Validation is pretty simple as:
// - writing a validation function, and tell redux-form about it
// - customize the rendering of your input field to show validation errors, if any


/* 4.1 Writing a validation function */

//We need to do the following for this to work:
// - provide a property validate to the object you give to reduxForm, this property should point to a validation function that you need to write
// - define a custom input control where you are able to show your input as well as errors, if there are any

// TodoForm.js - excerpt
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'title must be entered';
  }
    
  return errors;
}

TodoForm = reduxForm({
  form: 'todo',
  validate
})(TodoForm);

//We added the property validate that points to a function validate.
//This function is expected to return a dictionary of your errors. 
//The input parameter values contain all the field values so if you have a field title, values will contain: { title: 'your entered value' }
//We go through the values input parameter which is an object containing all of our field values. 
//If we find that a certain values isn't what it should be, like:
// - not existing
// - not conforming to a pattern 
//then we create an entry in the dictionary errors with an error message. 
//The method validate will be invoked on each keyup event. 

/* 4.2. Customize an input */

//We have been using Field as the component that represents an input. 
//So far we have set an attribute component like so:
<Field name="title" component="input" />

//We can give component a function as an argument instead of a string. 
//This means that we decide what gets rendered:
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
return (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
      ((error && <Error>{error}</Error>))}
    </div>
  </div>
  )
}

//What we see above is that renderField is function that takes an object as a parameter and expects us to return a markup. 
//We have the following interesting bits:
// - input: this is our input value
// - label: this is a text label
// - type: the type of input, given the value of this we an choose to render different types of input components
// - meta: this is an object containing interesting information on the state of our input, if it has been interacted with, if it has an error and so on.
//Note, that we look on the property touched, which means if we interacted with the element and based on it being in that state then we display the error.

//Lastly we need to instruct our Field component to use this function:
<Field name="title" component={renderField} />





/* 5. Finishing up */

//Putting it all together our TodoForm.js should now look like this:

// TodoForm.js
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';

const Error = styled.div`
  color: red;
  font-weight: bold;
  margin: 5px;
  padding: 10px;
  margin-top: 0px;
`;

const FormContainer = styled.div`
  margin: 20px;
  box-shadow: 0 0 5px grey;
  padding: 20px;

  input {
  border: solid 1px grey;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  }

  button {
    border: solid 1px grey
  }
`;

const validate = (values) => {
  const errors = {};

  if(!values.title) {
    errors.title ="title is required";
  }

  return errors;
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
        ((error && <Error>{error}</Error>))}
      </div>
    </div>
  )
}

class TodoForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    
    return (
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
          </div>
          <div>
            <Field name="title" component={renderField} type="text"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <Field name="email" component="input" type="email"/>
          </div>
          <button onClick={reset} disabled={ pristine } type="submit">Reset</button>
          <button disabled={ pristine || submitting } type="submit">Submit</button>
        </form>
      </FormContainer>
    );
  }
}

// Decorate the form component
TodoForm = reduxForm({
  form: 'todo',
  validate
})(TodoForm);

export default TodoForm;