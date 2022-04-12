/* Storybook - the most popular pattern library creation tool. */

/* Imagine when your project grows and the number of components and developers with it. 
   It might get hard to keep track of all the components and how they are rendered differently depending on what input they get. 
   For those situations there exists a number of tools where you can visually display your components - a style guide. 
   This article is about one such tool called Storybook.
*/   

/* 1. Install & Setup */

// We need to install a CLI for this:
npm i -g @storybook/cli

//Once we have done so we can create our React project and from the project root we can type:
getstorybook

//This will install all the needed dependencies plus:
// - add a storybook-demo/.storybook/ directory
// - src/stories
// - add the following to package.json and the scripts tag: "storybook": "start-storybook -p 9009 -s public"

//The .storybook directory contains the following:
// - addons.js
// - config.js 

//config.js tells storybook where our stories can be found. 
//The stories directory contains an index.js and stories which is something that storybook picks up and renders as a HTML page.

//The /stories/index.js looks like this:
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
      😀 😎 👍 💯
      </span>
    </Button>
  ));



/* 2. Run */

//By running:
yarn storybook

//It will startup story book and we can navigate to http://localhost:9000.

//Let's look at the code that produces this in stories/index.js. 
//Every call storiesOf('name of module', module) produces a section. 
//We can then chain a call to id add('name of component variant', () => ()). 
//Now the add method is worth looking closer at:
.add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)

//The second argument renders out a React component and we seem to be able to set whatever property we want in there. 
//Let's try to create a component and add it to stories/index.js next.



/* 3. Add a story */

//Let's do the following:
// - create a Todos.js component
// - add an entry of that component to stories/index.js

//First off the code for Todos.js:
// Todos.js
import React from 'react';
import styled from 'styled-components';

const Todo = styled.div`
  box-shadow: 0 0 5px grey;
  padding: 10px;
  margin-bottom: 10px;
`;

const Todos = ({ todos }) => (
  <React.Fragment>
    <h3>List of todos</h3>
    {todos.map(t => <Todo key={t.title}>{t.title}</Todo>)}
  </React.Fragment>
);

export default Todos;


//Now let's add the entry to stories/index.js:
// stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import Todos from '../Todos';
import mocks from './mocks';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
    😀 😎 👍 💯
    </span>
    </Button>
  ));

//set up the story and define a variant of that story by calling add
storiesOf('Todos', module)
  .add('with todos', () => <Todos todos={mocks.todos} />)


//The mocks.js is a file we created to supply our components with data. 
//We chose to place it in a separate file so we don't clutter up index.js.
// stories/mocks.js
const mocks = {
  todos: [{ title: 'test' }, { title: 'test2' }]
};

export default mocks;



/* 4. Improving - Dedicated story folders */

//Ok great now we know how to create our components and display them in a storybook. 
//However your storybook/index.js might become quite cluttered so you may want to opt for a solution that scales better. 
//Let's have a look .storybook/config.js:
import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);

//The loadStories function allows us to add more entries in there, which is perfect. Let's do that:
import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories');
  require('../src/stories/common');
}

configure(loadStories, module);

//As you can see we can now point out ../src/stories/common as yet another place our stories can exist on. 
//That directory now needs to consist of an index.js and we can write our stories per usual like so:
// stories/common/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../../common/Button';

storiesOf('Button', module)
  .add('with text', () => <Button title={'title for a button'}>text</Button>)
  .add('with markup', () => <Button title={'title for a button'}><h3>My button</h3><span>button text</span></Button>)

//The component we render above has the following code:
import React from 'react';
import styled from 'styled-components';

const InnerButton = styled.button`
  padding: 20px;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  :focus {
  border: solid 1px black;
}
`;

class Button extends React.Component {
  render() {
    return (
      <InnerButton { ...this.props } >{this.props.children}</InnerButton>
    );
  }
}

export default Button;

//So if you start to have components divided up into different directories it can be a good idea to bring that directory structure with you.