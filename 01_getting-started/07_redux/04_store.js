/* Store */

//Reducers are used as the access point to our global state.
//It's a way to protect the global state if you will.
//If we didn't use a reducer to manage our global state then potentially anything could change and we would quickly loose control.

//Let's show how we can let reducers handle our global state.
let state = {
  list: [],
  user: void 0,
};

const calc = (state, action) => {
  //connect every property of our state object with a reducer function
  return {
    list: listReducer(state.list, action),
    user: userReducer(state.user, action),
  };
};

const dispatch = (action) => {
  state = calc(state, action);
};

//Dispatch function is our entry point for changing the global state.
//The job of dispatch is to take an action and make sure it finds the correct reducer and have that reducer calculate a new state.

//What we do we mean by the right reducer?
//A reducer only operates on a slice of state, it never manages the entire state.
//There is usually one reducer for our property of our state object.
//As you can see above we can connect every property of our state object with a reducer function.
//Now we can connect this to our dispatch function.
//As you can see above we also introduce a "state" variable that is nothing more than the state of our store.

//Now the above is the very engine in Redux.
//This is how we can send a message, have it processed via a reducer and finally the state changes accordingly.

//There are of course other things to this like:
// - ability to select a slice of state
// - notify listeners

/* Select a slice of state*/

//A component is not going to be interested in the entire state object but merely a slice of it.
//To cater to this we need a select function that has the ability to select a slice of the object:
const select = (fn) => {
  return fn(state);
};

//As you can see above we give it a parameter fn and end up return fn(state) and thereby we let the input parameter decide what slice of state it wants.
//Let's showcase how we can call the select method:
select((state) => state.list); // returns the list part only
select((state) => state.user); // returns the user part only

/* Notify listeners */

//Last but not least we need a way to communicate that our state has changed.
//This is easily achieved by using letting a listener subscribe, like so:
let listeners = [];

const subscribe = (listener) => {
  listeners.push(listener);
};

//Then to notify all the listeners we need to call all these listeners when a change to our state happens, we need to place some code in the dispatch:
const dispatch = (action) => {
  state = calc(state, action);
  listeners.forEach((l) => l()); // calls all listeners
};

//So the full code now looks like this:

// store.js
let state = {
  list: [],
  user: void 0,
};

let listeners = [];

const listReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_ITEM":
      return [...state, { ...action.payload }];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_USER":
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const calc = (state, action) => {
  return {
    list: listReducer(state.list, action),
    user: userReducer(state.user, action),
  };
};

export const dispatch = (action) => {
  state = calc(state, action);
  listeners.forEach((l) => l()); // calls all listeners
};

export const subscribe = (listener) => {
  listeners.push(listener);
};

export const select = (fn) => {
  return fn(state);
};

/* Example */

//Imagine you have the following components:
// - create item component
// - list component

//When a create item component is create a new item, it needs to express this as an action and call dispatch on the store, like so:

// create-action.js
export const createItem = (item) => ({
  type: "CREATE_ITEM",
  payload: { title: item },
});

// create-item.js
import { createItem } from "./create-action";
import { dispatch } from "./store";

class CreateItem extends React.Component {
  state = {
    content: "",
  };

  create() {
    // to be defined
  }

  onChange = (evt) => {
    this.setState({
      content: evt.target.value,
    });
  };

  onCreate = () => {
    dispatch(createItem(this.state.content));

    this.setState({
      content: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <input onChange={onChange} />
        <button onClick={onCreate}>Save</button>
      </React.Fragment>
    );
  }
}

//What about the list component, how does it listen to the store and how does it handle updates to the store?

// list-component
import { select, subscribe } from "./store";

class ListComponent extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.setState({
      list: select((state) => state.list),
    });

    subscribe(this.update.bind(this));
  }

  update = () => {
    console.log("store is updated");
    this.setState({
      list: select((state) => state.list),
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3>My list</h3>
        {this.state.list.map((item) => (
          <div>{item.title}</div>
        ))}
      </React.Fragment>
    );
  }
}

//We initially fetch the store value we care about in the componentDidMount.
//We also listen to the store by calling subscribe and passing our update method.
//Lastly when update is invoked we make sure to reread the state slice we care about.
