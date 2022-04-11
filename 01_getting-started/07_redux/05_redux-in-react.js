/* Adding Redux to React */

/* 1. Get started */

//We need to install a couple of dependencies:
yarn add redux react-redux




/* 2. Adding Redux to React */

//We need to do the following:
// - create a store
// - expose the store with a Provider
// - create a container component




/* 2.1. Create a store */

//Creating a store is about creating the needed reducers, use a few helper functions and tell Redux about it:
// store.js
import { combineReducers } from 'redux';

const listReducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_ITEM':
      return [ ...state, { ...action.payload }];
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

const store = combineReducers({
  list: listReducer
});

export default store;

//Normally we would define one reducer per file and have them imported into store.js. 
//Now we have everything defined in one file to make it easy to understand, what is going on.
//One thing worth noting is our usage of the helper function combineReducers, which is the equivalent of writing:
const calc = (state, action) => {
  return {
    list: listReducer(state.list, action)
  };
};




/* 2.2. Expose the store via a provider */

//Next step is to wire everything up so we need to go to our index.js file and import our store and expose it using a provider. 
//We need to perform the following steps:
// - import createStore and invoke it to create a store instance
// - add the store to a Provider
// - can give our store an initial value (maybe there is some starter data that our app needs); initial value is added by calling dispatch on our store instance

// index.js
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import app from './store';

const store = createStore(app)
store.dispatch({ type: 'CREATE_ITEM', payload: { title: 'first item' } });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();





/* 2.3. Accessing and changing data */

//The way we talk to the store is by introducing the concepts container component and presentation component.
//A container component is simply a component that contains the data and in this case has knowledge of Redux. 
//A presentational component relies fully on its inputs wether it is about rendering data or invoking a method. 

//Let's look at a non Redux example that shows this.

//First let's define the presentational components:
const PresentationComponent = ({ todos }) => (
  <React.Fragment>
  {todos.map(todo => <div>{todo.title}</div>)}
  </React.Fragment>
);

const PresentationComponentInput = ({ add, onChange }) => (
  <div>
    Add a todo
    <input onChange={onChange} />
    <button onClick={add}>Add</button>
  </div>
);

//As you can see above the components are relying fully on input wether that input is pure data to be rendered or functions to be invoked.

//Next up let's define a container component, the component that sits on data and behavior:
class ContainerComponent extends React.Component {
  state = {
    todos: [
      { id: 1, title: 'clean' },
      { id: 2, title: 'dishwash' }
    ],
    newItem: void 0
  }

  change = (ev) => {
    this.setState({
      newItem: ev.target.value,
    })
  }

  add = (todo) => {
    this.setState({
      todos: [ ...this.state.todos, { title: todo }],
      newItem: ''
    });
  }

  render() {
    <React.Fragment>
      <PresentationComponent todos={this.state.todos} />
      <PresentationComponentInput onChange={this.change} add={this.add} />
    </React.Fragment>
  }
}


//Applying this to Redux is about using a method called "connect" that helps us create container components. 
//Let's have a look what that looks like:
const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

//There are three things here we need to explain:
// - mapStateToProps: this is function that returns an object of store states our component should have access to
// - mapDispatchToProps: this is a function that returns an object with methods we should be able to call
// - List: a presentation component

/* mapStateToProps */

//It's job is to decide what data from the store we want to provide to a presentation component. 
//We only want a slice of state, never the full application state. 
const mapStateToProps = (state) => {
  return {
    items: state.list
  };
}

//We can see above that we define a function that takes a state as parameter and ends up returning an object. 
//We are reading the list property from the store and it is being exposed as property items.

/* mapDispatchToProps */

//This is a function that produces an object, when invoked:
const addItem = (item) => ({ type: 'CREATE_ITEM', payload: { title: item } });

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: item => {
      dispatch(addItem(item))
    }
  };
}

//Above we see that we take a dispatch method in. 
//This method when called will allow us to dispatch actions that leads to the stores state being changed. 
//We define a onAddItem method that when invoked will call on addItem method, and when we add an item that is ultimately going to be added to a list in a store.

/* ListContainer - container component */

//The full code for a container component looks like this:
import React from 'react';
import {connect} from 'react-redux';
import List from '../components/List';

const addItem = (item) => ({ type: 'CREATE_ITEM', payload: { title: item } });

const mapStateToProps = (state) => {
  return {
    items: state.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: item => {
      dispatch(addItem(item))
    }
  };
}

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default ListContainer;


/* List - presentation component */

//The List components source code looks like this:

// components/List.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CreateItem from './CreateItem';

const Item = styled.div`
  box-shadow: 0 0 5px;
  margin-bottom: 10px;
  padding: 20px;
`;

const ItemsContainer = styled.div`
  margin: 10px;
`;

const Items = ({ items }) => (
  <ItemsContainer>
  {items.map(item => <Item>{item.title}</Item>)}
  </ItemsContainer>
);

const NoItems = () => (
  <div>No items yet</div>
);

const List = ({ items, onAddItem }) => (
  <React.Fragment>
    <CreateItem onAddItem={onAddItem} />
    {items.length === 0 ? <NoItems /> : <Items items={items} />}
  </React.Fragment>
);

List.propTypes = {
  items: PropTypes.array,
};

export default List;

//What's interesting here is we see that List component takes items and onAddItem as props. 
//Now this is exactly what the connect method does for us when it glues together Redux container data/behaviour with a presentation component. 
//The items property came from the object returned from mapStateToProps and onAddItem came from mapDispatchToProps.





/* 2.4. Make it work */

//What you end up rendering is container components like so:

// App.js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListContainer from './containers/ListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ListContainer />
      </div>
    );
  }
}

export default App;

//Above we render ListContainer.
//Our container component knows how to grab data from the store but also how to invoke functions that adds/changes store data.