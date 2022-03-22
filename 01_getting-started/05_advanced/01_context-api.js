/* Leveraging the Context API in React.js */

/* 1. Context API */

//The React Context exist so you don’t have to pass in data manually at every level. 
//Context is about sharing data to many components. 
//The reason we need the Context API is that it’s cumbersome to pass data from parent to child via props if there are many components requiring the same data. 
//By using the Context API we no longer pass this kind of shared data with props.

// 1.1. When to use /not use it:
// - data needed in many places: data that needs to be used by many components like a theme, user or a cart
// - pass props through many components: sometimes it’s better to use composition over context when you want to pass a props value through many components

// 1.2. Building blocks and API
//The Context API consists of some building blocks:
// - context: the context object is an object holding the current context value and can be subscribed to
// - provider: this is a React component that provides the value in question, it grabs it from the context object
// - consumer: this is a React component that is able to consume the value provided by the Provider and is able to show the value




/* 2. Context API in action */

//To utilize a Context in React we need to do the following:
// - create a context: we do this with a call to React.createContext(), this will return a Context object that exposes a Provider Component as well as a Consumer Component
// - declare a provider: this is us grabbing the Provider Component reference available in the context object we just created
// - declare a consumer: this is also a component that lives on the Context object and we use this to show the value to the user

// 2.1. Creating a Context object
//Let’s start by creating a React project using Create React App, CRA:
npx create-react-app context-demo
cd context-demo
npm start

//Now let’s create a file called theme.js, it will hold our Context object.
//To create a Context object, we use the React.createContext() method:
// theme.js
import React from 'react';

const ThemeContext = React.createContext('light');

export default ThemeContext;

//Above we call createContext() and we give it an input parameter which is simply the default value we want the context to have.
// We also export the object itself so we can use it in other places.

// 2.2. Declare a Provider
//So we have a Context object let’s grab a reference to a Provider next.
// Sample.js
import React from 'react';
import Theme from './theme';

const Sample = () => (

  <Theme.Provider value='dark'>
    // declare consumer
  </Theme.Provider>

);

export default Sample;

//Above we are declaring a normal functional React component and we also import our Theme, our Context object. 
//We then grab a reference to our provider by calling Theme.Provider and set the value property to dark.

// 2.3. Declare a Consumer
//So next up is about declaring a Consumer component and show how we can show the value to the user.
//Sample.js
import React from 'react';
import Theme from './theme';

const Sample = () => (
  <Theme.Provider value='dark'>
    <Theme.Consumer>
    {theme => <div>Our theme is: {theme}</div>}
    </Theme.Consumer>
  </Theme.Provider>
);

export default Sample;

//Above we added our Consumer, in the form of Theme.Consumer component and we can see that we inside it define a function whose parameter is our theme value.
//We are then able to show the theme value in a div.

//Ok then, let’s get back to our question, why are we setting the value property in our Theme.Provider component if we already set a default value in our theme.js file?
//Well, the default value above won’t be used if we declare a Provider. 
//If we are missing a Provider component, however, it will use the default value as a fallback. 
//So the following code will output dark as value, which is the value we give to the Provider:
const Sample = () => (
  <Theme.Provider value='dark'>
    <Theme.Consumer>
    {theme => <div>Theme value: {theme}</div>}
    </Theme.Consumer>
  </Theme.Provider>
)

//Whereas this code will output light as value, e.g the default value:
const Sample = () => (
  <Theme.Consumer>
  {theme => <div>Theme value: {theme}</div>}
  </Theme.Consumer>
);

/* 2.4. Usage */
//Taking our Context for a spin means we need to create a Provider and a Consumer as we did in the last section, 
//however, most likely the Consumer part is baked into a Component like so:
// ThemedButton.js
import Theme from 'theme.js';

const ThemedButton = (props) => (

<Theme.Consumer>
{theme => <button { ...props }>button with them: {theme}</button>}
</Theme.Consumer>

);
export default ThemedButton

//This means that our code from the last section can be cleaned up somewhat to look like this:
// Sample.js
import React from 'react';
import Theme from './theme';
import ThemedButton from './ThemedButton';

const Sample = () => (

<Theme.Provider value='dark'>
  <ThemedButton />
</Theme.Provider>
);

export default Sample;

//As you can see the value from the Provider is being passed down through the props 
//and we can inside of the ThemedButton component access the theme property through the Consumer.





/* 3. Dynamic Context */

//What if we want to change the provider value? 
//One way of doing that is by having a dynamic context. 
//We can achieve that by placing our Provider inside of a component and let its value depend on the component state:
// AnyComponent.js
import React from 'react';

class AnyComponent extends React.Component {
  state = {
    theme: 'dark'
  };

  render() {
    return (
      <ThemeContext.Provider value={ this.state.theme }>
        <ThemedButton />
      </ThemeContext.Provider>
    );
  }
}

export default AnyComponent;

//Now it’s easy for us to change the state and thereby we can change the value the Provider is providing to any Consumer.




/* 4. Higher order component (HOC) */

//Sometimes a context needs to be provided in many places. 
//Imagine the cart being used inside of a header that wants to show how many items you have in a cart. 
//There might also be dedicated Cart Page where you can see the cart content more in detail. 
//It might get tedious to have to wrap all those component content in a Consumer tag. 
//For those situations, it’s better to use a HOC, a higher order component. 
//This means we can create a function where we use our component as input and we augment the context data.

//It can look like the following:
// withCart.js
import CartContext from './cart';
import React from 'react';

export const withCart = (Component) => {
  return function fn(props) {
    return (
      <CartContext.Consumer>
      {(context) => <Component {...props} {...context} />}
      </CartContext.Consumer>
    );
  };
};

//As you can see above, we are using a Consumer to make this happen 
//but we also use the spread parameter { ...context} to transfer what is in the context object to the underlying component. 

//Now we can easily use this function to decorate our component, like so:
//Header.js
import React from 'react';
import withCart from './withCart';

class Header extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <React.Fragment>
        {cart.length === 0 ? (<div> Empty cart </div>) : (<div> Items in cart : ({cart.length}) </div> )}
      </React.Fragment>
    );
  }
}

const HeaderWithCart = withCart(Header);
export default HeaderWithCart;