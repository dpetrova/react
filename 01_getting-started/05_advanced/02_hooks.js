/* React Hooks */

//Hooks are an upcoming feature that lets you use state and other React features without writing a class component - functions FTW.


/* 1. Problems Hooks are trying to address */

//There are many problems Hooks are trying to address and solve. Here is a list of offenders:
// - wrapper hell: components are surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions
// - increasing complexity: something that starts out small becomes large and complex over time, especially as we add lifecycle methods
// - life cycle methods does too many things: components might perform some data fetching in componentDidMount and componentDidUpdate, same componentDidMount method might also contain some unrelated logic that sets up event listeners, with cleanup performed in componentWillUnmount

//Just create smaller components?
//In many cases it’s not possible because:
// - difficult to test: stateful logic is all over the place, thus making it difficult to test
// - classes confuse both people and machines: you have to understand how "this" works in JavaScript, you have to bind them to event handlers etc 
// - minify issues: classes don’t minify very well, and they make hot reloading flaky and unreliable

//Selling point of Hooks:
// - let you use more of React’s features without classes
// - extract stateful logic from a component, so it can be tested independently and reused
// - reuse stateful logic, without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.




/* 2. What is a hook? */

//Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), 
//rather than forcing a split based on lifecycle methods.

//Hooks are divided into Basic Hooks and Additional Hooks. 

/* 2.1. Basic Hooks */

// - useState: allows you to use state inside of function component
// - useEffect: allows you to perform side effect in such a way that it replaces several life cycle methods
// - useContext: accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context. 
//               When the provider updates, this Hook will trigger a rerender with the latest context value.


/* 2.1.1. useState */

//This hook let's us use state inside of a function component. 

//We need to do two things to get started with hooks:
// - scaffold a project using Create React App
npx create-react-app hooks-demo
// - upgrade react and react-dom
yarn add react@next react-dom@next

//Now we are good to go:
import React, { useState } from 'react';

const Counter = () => {
  //invoke useState and give it an initial value of 0, and get an array back that we do a destructuring on
  //the first value in the array is counter and the second value setCounter
  //the first value counter is the actual value that we can showcase in our render method
  //the second value setCounter() is a function that we can invoke and thereby change the value of counter
  //so setCounter(3) is equivalent to this.setState({ counter: 3 })
  const [counter, setCounter] = useState(0);
  
  return (
    <div>
      {counter}
      <button onClick={() => setCounter(counter + 1)} >Increment</button>
    </div>
  )
}

export default Counter;

//Let's create a few more states:
import React, { useState } from 'react';

const ProductList = () => {
  const [products] = useState([{ id: 1, name: 'Fortnite' }]);
  const [cart, setCart] = useState([]);

  const addToCart = (p) => {
    const newCartItem = { ...p };
    setCart([...cart, newCartItem]);
  }

  return (
    <div>
      <h2>Cart items</h2>
      {cart.map(item => <div>{item.name}</div>)}
      <h2>Products</h2>
      {products.map(p => <div onClick={() => addToCart(p)}>{p.name}</div>)}
    </div>
  )
}
export default ProductList;


/* 2.1.2. useEffect */

/* 2.1.2.1. Handling side-effects with a Hook */

//The Effect hook is meant to be used to perform side effects like for example HTTP calls. 
//It performs the same task as life cycle methods componentDidMount, componentDidUpdate, and componentWillUnmount.

//Here is how we can use it:
import React, { useEffect, useState } from 'react';

const products = [{ id: 1, name: "Fortnite" }, { id: 2, name: "Doom" }];

const api = {
  getProducts: () => {
    return Promise.resolve(products);
  },
  getProduct: (id) => {
    return Promise.resolve(products.find(p => p.id === id));
  }
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [selected, setSelected] = useState(2);

  async function fetchData() {
    const products = await api.getProducts();
    setProducts(products);
  }

  async function fetchProduct(productId) {
    const p = await api.getProduct(productId);
    setProduct(p.name);
  }

  //using useEffect in this case acts like componentDidMount
  //the interesting part is the second argument [selected]: this is looking at the selected variable and, if a change happens to selected then we will run useEffect function
  useEffect(() => {
    console.log('use effect');
    fetchData();
    fetchProduct(selected);
  }, [selected]);

  return (
    <React.Fragment>
        <h1>Async shop</h1>
        <h2>Products</h2>
        {products.map(p => <div>{p.name}</div>)}
        <h3>Selected product</h3>
        {product}
        <button onClick={() => setSelected(1)}>Change selected</button>
    </React.Fragment>
  );
}

export default ProductList;


/* 2.1.2.2. Life cycle */

//Hooks replaces the needs for many life cycle methods
//By default, React runs the effects after every render
//Our effect is being run after React has flushed changes to the DOM — including the first render

//Accessing the DOM tree
//Let's talk about when we access the DOM tree, to perform a side effect. 
//If we are not using Hooks we would be doing so in the methods componentDidMount and componentDidUpdate
componentDidMount() {
  document.title = 'Component started';
}

componentDidUpdate() {
  document.title = 'Component updated'
}

//We see that we can do so using two different life cycle methods.

//Accessing the DOM tree with an Effects Hook would look like the following:
const TitleHook = () => {
  const [title, setTitle] = useState('no title');

  useEffect(() => {
    document.title = `App name ${title} times`;
  })
}

//As you can see above we have access to props as well as state and the DOM.
//Our effect is being run after React has flushed changes to the DOM — including the first render
//That means that two life cycle methods can be replaced by one effect.


/* 2.1.2.3. Handling set up/ tear down */

//Let's now look at another aspect of the useEffect hook namely that we can, and we should, clean up after ourselves. The idea for that is the following:
useEffect(() => {
  // set up
  // perform side effect
  return () => {
    // perform clean up here
  }
});

//What we have here is set up and tear down
useEffect(() => {
  const id = setInterval(() => console.log('logging'));

  return () => {
    clearInterval(id);
  }
})

//You can also setting up a socket connection for example, e.g some kind of subscription:
onMessage = (message) => {
  // do something with message
}

useEffect(() => {
  chatRoom.subscribe('roomId', onMessage)
  
  return () => {
    chatRoom.unsubscribe('roomId');
  }
})



/* 2.2. Additional Hooks */

// - useReducer: alternative to useState, it accepts a reducer and returns a pair with the current state and a dispatch function
// - useCallback: will return a memoized version of the callback that only changes if one of the inputs has changed. 
//        This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders
// - useMemo: passes a create function and an array of inputs; useMemo will only recompute the memoized value when one of the inputs has changed. 
//        This optimization helps to avoid expensive calculations on every render.
// - useRef: returns a mutable ref object whose ".current" property is initialized to the passed argument (initialValue). 
//        The returned object will persist for the full lifetime of the component
// - useImperativeHandle: customizes the instance value that is exposed to parent components when using ref
// - useLayoutEffect: the signature is identical to useEffect, but it fires synchronously after all DOM mutations. 
//        Use this to read layout from the DOM and synchronously re-render
// - useDebugValue, can be used to display a label for custom hooks in React DevTools





/* 3. Can I create my own Hook? */

//Yes you can. With useState and useEffect the world is completely open. You can create whatever hook you need.
//Let's look at some interesting candidates and see how we can use hooks to build them out:
// - a modal: this has a state that says wether it shows or not and we will need to manipulate the DOM to add the modal itself and it will also need to clean up after itself when the modal closes
// - a feature flag: feature flag will have a state where it says wether something should be shown or not, it will need to get its state initially from somewhere like localStorage and/or over HTTP
// - a cart: a cart in an e-commerce app is something that most likely follows us everywhere in our app; we can sync a cart to localStorage as well as a backend endpoint.

/* 3.1. Feature flag */

//Let's create a hook called useFeatureFlag:
import React, { useState } from 'react';

function useFeatureFlag(flag) {
  let flags = localStorage.getItem("flags");
  flags = flags ? JSON.parse(flags) : null;

  const [enabled] = useState(Boolean(flags ? flags[flag]: false));

  return [enabled];
}

export default useFeatureFlag;

//This reads its value from localStorage and it uses useState to set up our hook state. 

//Let's take it for a spin:
import React from 'react';
import useFeatureFlag from './flag';

const TestComponent = ({ flag }) => {
  const [enabled] = useFeatureFlag(flag);

  return (
    <React.Fragment>
      <div>Normal component</div>
      {enabled &&
      <div>Experimental</div>
      }
    </React.Fragment>
  );
};

export default TestComponent;

// using it:
<TestComponent flag="experiment1" />

//Imagine you have an admin page. 
//On that admin page it would be neat if we could list all the flags and toggle them any way we want to. 
//Let's write such a component:
import React, { useState } from 'react';

const useFlags = () => {
  let flags = localStorage.getItem("flags");
  flags = flags ? JSON.parse(flags) : {};

  const [ flagsValue, setFlagsValue ] = useState(flags);

  const updateFlags = (f) => {
    localStorage.setItem("flags", JSON.stringify(f));
    setFlagsValue(f);
  }

  return [flagsValue, updateFlags];
}

const FlagsPage = () => {
  const [flags, setFlags] = useFlags();

  const toggleFlag = (f) => {
    const currentValue = Boolean(flags[f]);
    flags[f] = !currentValue;
    setFlags(flags)
  }

  return (
    <React.Fragment>
      <h1>Flags page</h1>
      {Object.keys(flags).filter(key => flags[key]).map(flag => <div><button onClick={() => toggleFlag(flag)}>{flag}</button></div>)}
    </React.Fragment>
  )
}

export default FlagsPage;

//What we are doing above is to read out the flags from localStorage and then we render them all out. 
//While rendering them out, flag by flag, we also hook-up a method on the onClick. 
//That method is toggleFlag that let's us change a specific flag. 
//Inside of toggleFlag we not only set the new flag value but we also ensure our flags have the latest updated value.

//It should also be said that us creating useFlags hook have made the code in FlagsPage quite simple, so hooks are good at cleaning up a bit too.


