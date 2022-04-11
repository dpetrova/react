/* Handling async work with Redux-Saga */

//So far when we have built our app using Redux we have worked in synchronous data. 
//A real app will most likely do asynchronous work, performing AJAX requests when fetching and changing data. 
//How would that look if we weren't using Sagas?

const createAction = () => ({ type: 'CREATED' });

const loadAction = (data) => ({ type: 'LOAD_DATA', payload: data });

const mapDispatchToProps = (dispatch) => {
  return {
    add: (data) => {
      const response = await fetch('url', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const responseData = response.json();
      dispatch(createAction());
    },
    get: () => {
      const response = await fetch('url');
      const responseData = response.json();
      dispatch(loadAction(responseData));
    }
  }
}

//Here we use some way to perform an AJAX call and when done we talk to Redux and our store by calling dispatch.
//There is a way to handle this a bit more elegantly namely by using Sagas.
//The idea with Saga is that the only thing you should see in a container component are dispatching of actions. 
//Saga acts as listeners to specific actions. 
//When a specific action happens the Saga will have the ability to intervene, you can do its AJAX interaction and then end it all with dispatching an action.



/* Installation & Setup */

//To use Saga we need to install it:
yarn add redux-saga

//Next step is about telling Redux we want to use Saga. 
//Saga are a so called middleware, something that intercepts the normal Redux flow which means we need to do the following to make Sagas work:
// - import and register Sagas as a middleware
//- create a saga
// -run a saga

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchIncrementAsync } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  app,
  applyMiddleware(sagaMiddleware)
)

//Above we have imported applyMiddleware that we will need to register Saga as a middleware. 
//Next we imported createSagaMiddleware that we will use to create the middleware. 
//Lastly we import watchIncrementAsync which is simply our own written Saga that intercepts a specific dispatch action of our choosing and carries out asynchronous work.
//Next step is creating the middleware and registering it with Redux.
//As you can see we now give createStore a second parameter instead of just the root reducer. 
//That second parameter instructs Redux to run Sagas as a middleware.




/* Writing a Saga */

//We need:
// - creating our saga
// - instruct our Saga to run, so it actively listens

//For now we will create our handwritten Sagas in a file called sagas.js but as our project grows we will need to break it down in many small files to make it maintable

// sagas.js - excerpt
import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

//Above we import delay, put and takeEvery:
// - delay: this is really just a utility function that resolves a promise after x number of milliseconds
// - put: this is pretty much the dispatch of Sagas, you add an action as input parameter to it
// - takeEvery: this listens to a specific action type and runs a generator function in response to a specific action occurring

//What we wan't to do and what Sagas promise to help us with is to clean up the flow a bit when dealing with asynchronous actions. 
//To accomplish that a Saga has the following data flow to it:
// - listen to a specific action type
// - run a generator function in response to said action type
// - carry out asynchronous work in generator function
// - end generator function by calling put that dispatches an action and thereby leaves back control to Redux

//Let's build a Saga with that flow in mind. 
//Let's take something dead simple like incrementing a number. 
//I need you to imagine that this performs an AJAX request and when its done resolves a Promise. 

// sagas.js
import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  console.log("Then me - do async work here...");
  yield delay(1000)
  console.log('Done with async work, dispatch data');
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  console.log("I'm hit first");
  yield takeEvery('INCREMENT_ASYNC', incrementAsync) 
}

//Above we define the listener function watchIncrementAsync and we see that it calls takeEvery on the action type INCREMENT_ASYNC. 
//The second parameter of the function says what function it should run in the response to this action occurring, namely incrementAsync. 
//This is also called a watcher function.

//Next we can see in the function incrementAsync that the first thing we do is to call yield delay(1000), think of this as writing: await fetch(url);
//What we mean is that this is the point where we should perform an AJAX call, instead of writing await we use yield which is the corresponding keyword for generators. 
//Last thing to happen in this function is calling put which dispatches an action and thereby leaves control back to Redux.

//Let's repeat again the steps we need to take for every Saga we write:
// - define a watcher function / listener that listens to a specific action
// - define a generator function, also called a worker saga that performs AJAX operations or some other asynchronous work and end it all with a call to put to relinquish control.




/* Run the Saga */

//We have forgotten a little thing which is triggering the Saga to start watching. 
//We need to head back to our index.js file and do that:

// index.js - excerpt
sagaMiddleware.run(watchIncrementAsync)

//Without this call, nothing will work, so don't forget it :)




/* Using it in the app */

//Using this in the app is about the following:
// - create a container component
// - dispatch an action that targets INCREMENT_ASYNC

//Let's create that container component:

// IncrementContainer.js
import React from 'react';
import {connect} from 'react-redux';
import Increment from '../components/Increment';

const increment = () => ({ type: 'INCREMENT_ASYNC' });

const mapStateToProps = (state) => {
  return {
    value: state.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => {
      dispatch(increment())
    }
  };
}

const IncrementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Increment);

export default IncrementContainer;

//We can see above how we create the container component IncrementContainer by using the presentation component Increment and augmenting it with the method increment and the state value. 
//We also see that upon invoking increment() we dispatch the action of type INCREMENT_ASYNC.

//For the presentation component we just need to wire up the increment method to a button so we can invoke the method and thereby dispatch the action so our Saga will be targeted. 
//Let's define the presentation component:

// Increment.js
import React from 'react';

const Increment = ({ value, increment }) => (
<div>
  Value: {value} &nbsp;
  <button onClick={increment}>Increment</button>
</div>
);

export default Increment;