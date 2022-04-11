/* Reducer */

//A reducer is a function that is able to process our message, our Action.
//A reducer takes the existing state and applies the message on it.
//The end result is a new state.
//A reducer typically operates on a slice of state.

/* 1. Defining a reducer */

//A reducer typically looks like this:
function reducer(state = [], action) {
  switch (action.type) {
    case "CREATE_ITEM":
      return [...state, { ...action.payload }];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

//Using the reducer is done by invoking it:
let id = 1;
const actionCreator = (title) => ({
  type: "CREATE_ITEM",
  payload: { id: counter++, title },
});
let state = reducer([], actionCreator("item1")); // [{ title: 'item1' }]
state = reducer([], actionCreator("item2")); // [{ title: 'item1' }, { title: 'item2' }]

//What we can see above is how we can use the reducer and take initial state, and apply an action to it.
//We also see how we can take an existing state and another action and simply create a new state which consists of the old state + action.

/* 2. Reducer Types */

// There are different types of reducers:
// - lists
// - objects
// - primitives

/* 2.1. List reducer */

function reducer(state = [], action) {
  switch (action.type) {
    case "CREATE_ITEM":
      return [...state, { ...action.payload }];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

/* 2.2. Object reducer */

//The aim of an object reducer is simply to either load the object or update parts of it, if we are editing it:
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_ITEM":
    case "UPDATE_ITEM":
      return { ...state, ...action.payload };
    case "REMOVE_ITEM":
      return null;
  }
};

/* 2.3. Primitive reducer */

//E.g. if we are dealing with an integer:
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
