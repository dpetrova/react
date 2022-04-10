/* Use React Testing Library to test component surface */

//React Testing Library is a different testing library in that it tests the surface of your component rather than the internals.
//Simple and complete React DOM testing utilities.
//It's a lightweight solution for testing React components. 
//It provides utility functions on top of react-dom. 
//Your tests work on DOM nodes as opposed to React component instances.

//We will cover the following:
// - writing tests: how to write a test, instantiate a component, and assert on it
// - dealing with events: how can trigger event and assert on the resulting component afterward
// - asynchronous actions: how can trigger and wait for asynchronous actions to finish
// - manage input: how to send keystrokes to input elements on our components and assert on the result

//To get started, need to install react-testing-library:
yarn add react-testing-library



/* 1. Writing a test */

//Let's look at a real scenario:
// Todos.js
import React from 'react';
import './Todos.css';

const Todos = ({ todos, select, selected }) => (
  <React.Fragment>
  {todos.map(todo => (
    <React.Fragment key={todo.title}>
      <h3 data-testid="item" className={ selected && selected.title === todo.title ? 'selected' :'' }>{todo.title}</h3>
      <div>{todo.description}</div>
      <button onClick={() => select(todo)}>Select</button>
    </React.Fragment>
  ))}
  </React.Fragment>
);

class TodosContainer extends React.Component {
  state = {
    todo: void 0,
  }

  select = (todo) => {
    this.setState({
      todo,
    })
  }

  render() {
    return (
      <Todos { ...this.props } select={this.select} selected={this.state.todo} />
    );
  }
}

export default TodosContainer;

// Todos.test.js
import {render, fireEvent, wait} from 'react-testing-library';
import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import Todos from '../Todos';

const todos = [ { title: 'todo1' }, { title: 'todo2' } ];

describe('Todos', () => {
  it('finds title', () => {
    const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
    const elem = getByTestId('item');
    expect(elem.innerHTML).toBe('todo1');
  })
});

//We can see that we are using some helpers from react-testing-library:
// - render(): this will render our component
// - fireEvent: this will help us trigger things like a click event or change the input data for example
// - wait: this allows us to wait for an element to appear

//We see that when we call render we get an object back, and that we destructure 3 values from it:
// - getByText: this grabs an element by it's text content
// - getByTestId: this grabs an element by data-testid, so if you have an attribute on your element like so data-testid="saved" you would be querying it like so getByTestId('saved')
// - container: the div your component was rendered to

//we are able to render our component and query for an h3 element by using the container and the querySelector. Finally, we assert on the text inside the element.




/* 2. Handling actions */

//In Todos.js component we try to set the CSS class to selected if a todo is selected. 
//The way to get a todo selected is to click on it.
//Let's try to test this out by adding a test:

import {render, fireEvent, wait} from 'react-testing-library'
import React from 'react';
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import Todos from '../Todos';

const todos = [ { title: 'todo1' }, { title: 'todo2' } ];

describe('Todos', () => {
  it('finds title', () => {
    const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
    const elem = getByTestId('item');
    expect(elem.innerHTML).toBe('todo1');
  })

  it('select todo', () => {
    const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
    fireEvent.click(getByText('Select'));
    const elem = getByTestId('item');
    expect(elem.classList[0]).toBe('selected');
  })
});

//Our last newly added test is using the fireEvent helper to perform a click and we can see that we are using the getByText helper to find the button. 
//We again use the container to find and assert on the selected CSS class.




/* 3. Asynchronous tests and working with input */

//We will show two things:
// - handling input
// - dealing with asynchronous actions

//We will build the following:
// - Note.js -> a component that allows us to enter data and save down the results, it will also allow us to fetch data
// - tests/Note.js -> the test file

// Note.js
import React from 'react';

class Note extends React.Component {
  state = {
    content: '',
    saved: '',
  };

  onChange = (evt) => {
    this.setState({
      content: evt.target.value,
    });
    console.log('updating content');
  }

  save = () => {
    this.setState({
      saved: `Saved: ${this.state.content}`,
    });
  }

  load = () => {
    var me = this;

    setTimeout(() => {
      me.setState({
        data: [{ title: 'test' }, { title: 'test2' }]
      })
    }, 3000);
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="change">Change text</label>
        <input id="change" placeholder="change text" onChange={this.onChange} />
        <div data-testid="saved">{this.state.saved}</div>
        {this.state.data &&
        <div data-testid="data">
        {this.state.data.map(item => (
          <div className="item" >{item.title}</div>
        ))}
        </div>
       }
       <div>
         <button onClick={this.save}>Save</button>
         <button onClick={this.load}>Load</button>
       </div>
     </React.Fragment>
   );
  }
}

export default Note;



/* 3.1. Handling user input */

//To save data in our sample app, we enter text into an input and press the save button.
//Let's create a test for that:

// __tests__/Note.js
import {render, fireEvent, wait} from 'react-testing-library'
import React from 'react';
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import Select from '../Note';

describe('Note', () => {
  it('save text', async() => {
    const {getByText, getByTestId, getByPlaceholderText, container, getByLabelText} = render(<Select />);
    const input = getByLabelText('Change text');
    input.value= 'input text';
    fireEvent.change(input);
    fireEvent.click(getByText('Save'));
    console.log('saved', getByTestId('saved').innerHTML);
    expect(getByTestId('saved')).toHaveTextContent('input text')
  })
});

//We can see above that we use the helper getByLabelText to get a reference to our input and we simply do input.value = 'input text' at that point. 
//Then we need to invoke fireEvent.change(input) for the change to happen. 
//After that we can assert on the results by typing expect(getByTestId('saved')).toHaveTextContent('input text')



/* 3.2. Dealing with asynchronous code */

//We have another piece of functionality in our component namely pressing a Load button that invokes a load() method
//And we can see that the change doesn't happen straight away, this due to us using a setTimeout(). 
//And we can see that we don't render out the data property unless it is set to a value.

//Our test needs to cater to this and wait for the div with attribute data-testid="data" to be present before it can assert on it. 
//This can be handled through async/await. 
//We import waitForElement from react-testing-library which allows us to halt execution while waiting for the element to appear: 

import { render, fireEvent, wait, waitForElement } from 'react-testing-library'
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import 'jest-dom/extend-expect'
import Select from '../Note';

describe('Note', () => {
  it('save text', async () => {
    const {getByText, getByTestId, getByPlaceholderText, container, getByLabelText} = render(<Select />);
    const input = getByLabelText('Change text');
    input.value= 'input text';
    fireEvent.change(input);
    fireEvent.click(getByText('Save'));
    console.log('saved', getByTestId('saved').innerHTML);
    expect(getByTestId('saved')).toHaveTextContent('input text')
  })

  it('load data', async() => {
    const {getByText, getByTestId, getByPlaceholderText, container} = render(<Select />);
    fireEvent.click(getByText('Load'));
    const elem = await waitForElement(() => getByTestId('data'))
    const elem = getByTestId('item');
    expect(elem).toHaveTextContent('test');
  })
});

//Above we see the construct await waitForElement(() => getByTestId('data')) that prevent the test from continuing until the element is present. 
//The waitForElement returns a promise that doesn't resolve until the element exist on the DOM. 
//Thereafter we assert on the result.