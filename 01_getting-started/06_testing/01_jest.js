/* Testing with Jest */

//We will cover the testing framework Jest:
// - write tests and assert on specific conditions
// - manage our test suite, by running specific tests as well as specific test files by utilizing the pattern matching functionality
// - debug our tests: by augmenting VS Code we can gain the ability to set breakpoints in our tests
// - snapshot mastery: using snapshots can give you increased confidence that your components are still working after a change you made
// - mocking: mocking dependencies can ensure you only test what you want to test
// - coverage reports: run coverage reports and quickly find what parts of your code that could benefit from some more testing

//Jest:
// - Great performance by tests running in parallel thanks to workers.
// - Built-in coverage tool
// - Works with typescript thanks to ts-jest

//Any decent test runner/framework should give us the ability to:
// - run specific tests
// - ignore tests
// - set breakpoints, let us add breakpoints in our IDE
// - run in browser, let us run our tests in a Browser



/* 1. Writing tests */

//To make the test runner find the tests we need to follow one of three conventions:
// - create a __tests__ directory and place your files in there
// - make file match *spec.js
// - make file match .test.js

// add.js
function add(a, b) { 
  return a + b; 
} 

module.exports = add; 

// add.spec.js
const add = require('../add'); 

describe('add', () => { 
  it('should add two numbers', () => { 
    expect(add(1, 2)).toBe(3);   
  }); 
});

//Above that we are using "describe" to create a test suite and "it" to create a test within the test suite. 
//We also use "expect" to assert on the result. 
//The "expect" gives us access to a lot of matchers, a matcher is a function we call after the expect:
expect(something).matcher(value)

//In our test example we are using a matcher called toBe() which essentially matches what's inside the expect to what's inside the matcher, example:
expect(1).toBe(1) // succeeds 
expect(2).toBe(1) // fails



/* 2. Running tests */

//The simplest thing we can do is just to create a project using create-react-app, cause Jest is already set up in there. 
//Once we have the project created and all dependencies installed we can simply run:
yarn test




/* Run а specific test file */

//Let’s start with running specific tests. First off we will add another file subtract.js and a corresponding test.

// subtract.js
function subtract(a,b) { 
  return a - b; 
} 

export default subtract;

// subtract.spec.js
import subtract from '../subtract'; 

it('testing subtract', () => { 
  const actual = subtract(3,2); 
  expect(actual).toBe(1); 
});

//We have a range of commands which will make our debugging easier:
//a: runs all the tests
//p: filter by a filename regex pattern
//t: filter by a test name regex pattern
//q: quit the watch mode
//Enter: to trigger a test run

//Given the above description we will try to filter it down to only test the add.js file so we type p.
//This takes us to a pattern dialog where we can type in the file name. 




/* Run specific tests */

//add.spec.js
import add from '../add'; 

it('testing add', () => { 
  const actual = add(1,3); 
  expect(actual).toBe(4); 
}); 

it('testing add - should be negative', () => { 
  const actual = add(-2,1); 
  expect(actual).toBe(-1); 
});

//So we have two tests in the same file but we only want to run a specific test. 

//We can use .only() to make the test runner call a specific test:
it.only('testing add', () => { 
  const actual = add(1,3); 
  expect(actual).toBe(4); 
});

//We can use .skip() to make the test runner skip a specific test:
it.skip('testing add', () => { 
  const actual = add(1,3); 
  expect(actual).toBe(4); 
});




/* 3. Debugging */

/* Debugging with Breakpoints */

//This one is a bit IDE dependant, for this section we will cover how to do this in VS Code. 
//The first thing we are going to do is install an extension. 
//Head over to the extension menu and search for Jest.
//Install this extension and head back to your code. 
//Now we have some added capabilities. 
//All of our tests should have a Debug link over every single test.
//At this point, we can add a breakpoint and then press our Debug link: your breakpoint should now be hit.




/* Snapshot testing */

//Snapshot is about creating a snapshot, a view of what the DOM looks like when you render your component. 
//It’s used to ensure that when you or someone else does a change to the component the snapshot is there to tell you, you did a change, does the change look ok?
//If you agree with the change you made you can easily update the snapshot with what DOM it now renders. 
//So snapshot is your friend to safeguard you from unintentional changes.

//Let’s see how we can create a snapshot. 
//First off we might need to install a dependency:
yarn add react-test-renderer --save

//ext step is to write a component and a test to go along with it.
// Todos.js
import React from 'react'; 

const Todos = ({ todos }) => ( 
  <React.Fragment> 
   {todos.map(todo => <div>{todo}</div>)} 
  </React.Fragment> ); 

export default Todos;

// Todos.spec.js
import renderer from 'react-test-renderer'; 
import React from 'react'; 
import Todos from '../Todos'; 

test('Todo - should create snapshot', () => { 
  const component = renderer.create( 
    <Todos todos={['item1', 'item2']} /> 
  ); 
  let tree = component.toJSON(); 
  expect(tree).toMatchSnapshot(); 
})

//Note how import, imports the component we are about to test.
//Then we use the renderer to create an instance of our component. 
//Next step is to turn that component into a JSON representation.
//Lastly, we assert this by calling expect(tree).toMatchSnapshot(), this will call a snapshot that will place itself in a __snapshots__ directory under your tests directory.


/* Managing the snapshot */

//If we make a change to our todo component, like so:
// Todos.js
import React from 'react'; 

const Todos = ({ todos }) => ( 
  <React.Fragment> {
    todos.map(todo => ( 
      <React.Fragment> 
        <h3>{todo.title}</h3> <div>{todo.description}</div> 
      </React.Fragment> 
    ))}
   </React.Fragment> ); 

export default Todos;

//Whe we run the test, this will make our snapshot react and indicates something is different and asks us to inspect the code. 
//If we are happy with the changes we should press u to update the snapshot to its new version. 




/* Mocking */

//Mocking in Jest is quite easy. 
//You need to create your mocks in a directory that is adjacent to your module, or more like a child directory to the module. 

//Imagine you have the following module:
// repository.js
const data = [{ title: 'data from database' }]; 

export default data;

//A test for this one:
// repository.spec.js
import data from '../repository'; 

describe('testing repository data', () => { 
  it('should return 1 item', () => { 
    console.log(data); 
    expect(data.length).toBe(1); 
  }); 
});

//Let’s create our mock so that our file structure looks like so:
repository.js // our repo file
__mocks__/repository.js // our mock

//Our mock should look like this:
// __mocks__/repository.js
const data = [{ title: 'mocked data' }]; 
export default data;

//To use this mock we need to call jest.mock() inside of our test:
// repository.spec.js
import data from '../repository'; 

jest.mock('../repository'); // taking __mock/repository instead of the actual one

describe('testing repository data', () => { 
  it('should return 1 item', () => { 
    console.log(data); 
    expect(data.length).toBe(1); 
  }); 
});

//Now it uses our mock instead of the actual module. 

//We are going to create another file consumer.js that use our repository.js.
// consumer.js
import data from './repository'; 

const item = { title: 'consumer' };

export default [ ...data, { ...item}];

//Above we clearly see how our consumer use our repository.js and now we want to mock it so we can focus on testing the consumer module.
// consumer.spec.js
import data from '../consumer'; 

jest.mock('../repository'); 

describe('testing consumer data', () => { 
  it('should return 2 items', () => { 
    console.log(data); 
    expect(data.length).toBe(2); 
  }); 
});

//We use jest.mock() and mocks away the only external dependency this module had.

//What about libs like lodash or jquery, things that are not modules that we created but is dependant on? 
//We can create mocks for those at the highest level by creating a __mocks__ directory.




/* Coverage */

//Coverage is about realizing how much of our code is covered by tests. 
//To check this we just run:
yarn test coverage

//This will give us a table inside of the terminal that will tell us about the coverage in percentage per file. 
//It will also produce a coverage directory that we can navigate into and find a HTML report of our coverage. 

//But first off let's change the add.js file to add a piece of logic that needs a test:
// add.js
function add(a, b) { 
  if(a > 0 && b > 0 ) { 
    return a + b; 
  } 
  throw new Error('parameters must be larger than zero'); 
} 

export default add;

//Now we can see we have more than one path through the application. 
//If our input params are larger than zero then we have existing tests that cover it.
//However, if one or more parameters is below zero then we enter a new execution path and that one is NOT covered by tests. 

//Let’s see what that looks like in the coverage report by navigating to coverage/lcov-report. 
//We can show this by typing for example
http-server -p 5000

//We can navigate to src/add.js and we can clearly see how our added code is indicated in red and that we need to add a test to cover that new execution path.

//Next, we add a test to cover for this:
// add.spec.js
import add from '../add'; 

describe('add', () => { 
  it('testing addition', () => { 
    const actual = add(1,2); 
    expect(actual).toBe(3); 
  });
 
  it('testing addition with neg number', () => { 
    expect(() => { add(-1,2); }).toThrow('parameters must be larger than zero'); 
  })
})

//Our second case should now cover for the execution path that leads to an exception being thrown. 