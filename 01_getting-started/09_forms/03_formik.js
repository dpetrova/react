/* Easy forms with Formik */

//In this article we will cover:
// - forms overview: discussing forms in general and different form libraries
// - set up: we will cover how to install and set up a React project with Formik
// - taking it for a spin: here we will create a relatively realistic Form example that includes most types of form fields
// - validation types: there is more than one way to validate like every time the field value change or when you shift focus from one field to the next
// - schema Validation with Yup: there is an alternate way to validate your input elements and that is by declaring a schema in Yup and simply assign that to an attribute on the Formik component
// - async validation
// - built-in components: make everything less verbose using some of Formiks built-in components



/* 1. Forms in general and Form libraries */

//So many things we need to get right here:
// - too many input fields
// - too few input fields
// - clear error messages
// - different types of validation like email, numbers, server-side validation
// - how it validates like on every character change or when the input field changes or maybe when you press the Submit button

//React currently doesn’t have an official Forms library and usually when the creator a Framework doesn’t show the way you end up with a multitude of options like:
// - roll your own , this is about building your own way of handling Forms
// - Formsy: according to the creator it aims to be the sweet spot between flexibility and reusability
// - Formik: we will use it here
// - React Forms: this is about putting your Form value in a Redux state



/* 2. Set up Formik */

//Like all React projects we start off by using the tool Create React App, CRA:
npx create-react-app [myapp]
cd [my app]

//Now that we have a React app lets add the library Formik to it:
yarn add formik
OR
npm install formik --save

//Let’s quickly explain what we need to do to get Formik up and running. We need to do the following:
// - import the Formik component
// - define initialValues: this will give the form the initial values
// - validate: this is a function that takes the form values as input parameters. 
//   The point of the function is to construct and return an object representing the state of the form. 
//   The object itself is key-value pairs where the key is the name of the form field and the value should be the error message if there is an error detected on that field
// - onSubmit: this is a function we need to define where we determine what should happen when we press submit
// - child: The child of the Formik component is where we define the markup of the form and it’s containing fields. 
//   This is also where we render form errors if there are any



/* 3. Taking it for a Spin */

// FirstExample.js
import React from 'react';
import { Formik } from 'formik'; //import Formik

//a component that wraps the Formik component
const FirstExample = () => (
  <Formik 
    initialValues={{ name:'' }}
    onSubmit={values => {
      console.log('submitting',values);
    }}
    validate={values => {
      console.log('First Example form - running validation function')
      let errors = {};
      if(!errors.name) {
        errors.name = 'Name is required';
      }
      return errors;
    }}
  >
    {({ 
      values, 
      errors,
      touched ,
      handleSubmit,
      handleChange,
      handleBlur
    }) => (
      <form onSubmit={handleSubmit}>
      <div>
        <input name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" placeholder="Name"></input>
        {errors.name && touched.name && <span style={{ color:"red", fontWeight: "bold" }}>{errors.name}</span>}
      </div>
      
      <div>
        <button>Submit</button>
      </div>
      </form>
    )}
  </Formik>
)

export default FirstExample;

//3.1. Handling submit: 
// - we need to assign a function to the onSubmit attribute of our Formik component

//3.2. Handling the element input lifecycle with initialValues. 
//We need:
// - define the initialValues and gave it an object representing our Form input values
// - connect the method handleChange to our onChange event on our input element
// - connect the value attribute of our input element to our values object and specifically the name attribute

//3.3. Validation
//We need to take the following steps:
// - define the validate property on the Formik component, it expects a function that returns an object with a mapping of our errors
// - read from an errors property in our template function and ensure we show the errors if it’s set

//3.4 Improving our Form
//There are many ways of improving how we work with Forms using Formik:
// - touched: this state is about indicating whether the user has interacted with this input element or not. 
//   If the user has interacted with it touched will have the value true for your element, for example, touched.name will be true
// - hide/disable submit button: when you submit a form it usually means you talk to a backend and that backend will take some time coming back to you, meanwhile it’s a good idea to ensure the user can’t press the submit button
// - controlling validation invocation: normally the validation function is run three times that you need to care about, on Blur, on Change, and on Submit.

//3.4. Handling touched
//We can ensure neither field shows any validation error unless they have been touched. 
//It means we have entered characters in the field and we have left it to work on another field. 

//3.5. Hide/disable our submit button while submitting
//We’ve аsked the user to be patient, to wait for the service to come back. We’ve even shown a spinner. 
//Sooner or later we’ve come to the conclusion that we must hide or at least disable the submit button while the form is being submitted.
//Formik helps us by providing a function called setSubmitting. Let’s look at how to use it, we will need to go to our onSubmit definition:

onSubmit={(values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
}}

<button type="submit" disabled={isSubmitting}>Submit</button>

//As you can see above we are using setTimeout to simulate the fact that a backend call takes time and during that time we don’t want any more submits to be possible. 
//When we hit our submit button the property isSubmitting is set to true. Once we call setSubmitting(false) inside of our onSubmit function isSubmitting is set to false.

//3.6. Controlling validation invocation
//We have established three invocations points of the validation function that we care about namely:
// - onBlur: this means the validation function will run when we switch focus from one input element to the next
// - onChange: this means the validation function will run every time we enter/removes a character in the input element
// - onSubmit: the validation function runs when we submit our form

//Controlling blur behavior is done by changing the value of the attribute validateOnBlur to false. 
//Its default value is true, which mean it will run the validation function every time we lose focus on this element. 
//If you know you have a costly validation such as doing async calls in your validation function it’s probably a good idea to run the validation as seldom as possible. 
//Most forms I’ve encountered validates on blur so it’s probably a good idea to keep this functionality enabled unless validation is really really costly,
//or you have a good reason for just running validation upon submitting the form.
//To control this behavior you would write the following in your markup:
<Formik validateOnBlur={false} />

//As for change events, those are triggered every time you change a character, now usually that’s just way too often in my opinion but you might have valid reasons for using this one.
//To control its behavior type:
<Formik validateOnChange={false} />





/* 4. Built-in components */

//So far we have been using regular HTML elements like form and input to build our form and we have connected to events like onSubmit, onChange and onBlur. 
//But we can actually be typing a lot less, using built-in components:
// - Form: this replaces a normal form element
// - Field: this replaces any type of input element
// - ErrorMessage: a component that given the attribute name is able to show your error message

//Let's first look at a simple form and then rewrite it using the above-mentioned components:
import { Formik } from 'formik';
import React from 'react';

const FormikExample1 = () => (
  <Formik
    initialValues={{ name: '' }}
    validation={values => {
      let errors = {};
      if(!values.name) {
        errors.name = 'Name is required';
      }
      return errors;
    }}
    onSubmit={values => {
      console.log('submitted');
    }}
  >
  {({ handleSubmit, handleChange, values, errors }) => (
   <form onSubmit={handleSubmit}>
    <input name="name" onChange={handleChange} value={values.name} />
    {errors.name && 
    <span>{errors.name}</span>
    }
   </form>
  )}
  </Formik>
)

//Now lets clean this up using Formiks built-in controls:
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

const FormikExample2 = () => (
  <Formik
    initialValues={{ name: '' }}
    validation={values => {
      let errors = {};
      if(!values.name) {
        errors.name = 'Name is required';
      }
      return errors;
    }}
    onSubmit={values => {
      console.log('submitted');
    }}
  >
  {({ handleSubmit, errors }) => (
   <Form onSubmit={handleSubmit}>
    <Field type="text" name="name" />
    <ErrorMessage name="name"/>    
   </Form>
  )}
  </Formik>
)

//Let's list what we don't need to type anymore:
// - the onChange disappears from each input element
// - the input element is replaced by Field component
// - the form element is replaced by Form component
// - the conditional {errors.name && } disappears as well as ErrorMessage component takes care of that bit




/* 5. Schema validation with Yup */

//Now to our next improvement, we can replace our validation property with a validationSchema property. 
//For that to be possible we need to define a schema using the library Yup. 
//So what does a schema look like :
import * as Yup from 'yup'

const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

//The above schema defines three different fields firstName, lastName and email and gives them each attributes that they should adhere to:
// - firstName: this should be a string consisting of min 2 characters and maximum 50 characters and its also required
// - lastName: this is also a string with the same min/max requirements and it's also required
// - email: this is just a string that is required

//Let's now put it to use in our Formik element, like so:
<Formik validationSchema={schema} />

//That's it, that is all you need to define your form data in a really expressive way





/* 6. Async validation */

//Sometimes you have data that you can't really tell on client side only whether the entered value is correct or not. 
//Imagine you have a form where you want to find out whether a company or certain web page domain is already taken? 
//At that point, you most likely will need to make a call to an endpoint and the endpoint will not be coming back with the answer instantly.
//The validation property is able to accept a Promise as well. 

<Formik
  validate={values => {
    console.log('validating async');
    let errors = {};
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        errors.companyName = 'not cool';
        resolve('done');
      },3000);
      }).then(() => {
        if(Object.keys(errors).length) {
          throw errors;
        }
      });
    }}
>
// define the rest here
</Formik>

//Looking at our validate implementation we see that we create a Promise that internally runs a setTimout to simulate it going to an endpoint that it takes time to get an answer from.
//In more real scenario we would probably call a function and depending on the functions answer we would possibly assign errors.companyName. 
//I'll show you below what I mean:
isCompanyNameUnique(values.companyName).then(isUnique => {
  if(!isUnique) {
    errors.companyName = `companyName is not unique, please select another one`
  }
  resolve('done')
})

//Next thing that happens in our code is that we invoke then(), that happens when we call resolve(). 
//Something really interesting happens in there, we check the errors for any properties that might have been set 
//and if so we throw an error with our errors object as an argument, like so:
.then(() => {
  if(Object.keys(errors).length) {
    throw errors;
  }
});


// 6.1. Async on field level

//So far we have shown how to do async validation on Forms level
//Most likely you have a mix of fields where it's enough to validate some of them client side while only a minority if fields need async validation. 
//In such a case it makes sense to apply validation per field. 
<Field name="username" validate={this.validate} />

//This is probably preferred if you got async validation on a field. 
//As for the other fields, you can validate client side it's probably a good idea to define those in on the Formik components validationSchema and use Yup schemas for that

//If we do have async validation in there make sure your validations don't run too often especially if the validation takes time. 
//You don't want a 3-sec validation to trigger every time a key is typed, 
//at most you want it when the user leaves the field to start typing in another field, we refer to this as the blur event. 
//So make sure you set up your Formik component like this:
<Formik
  validateOnBlur={true} 
  validateOnChange={false} >
</Formik>


