/*
The most used ways to create a component are:
    - Class based. A class based component is made up of a class that inherits from React.Component.
    - Function based. Function based component consists of nothing but a function that needs to return JSX.

The reason for using a class based component is that you want to use state.
Function based components used to only be able to render data, not change it. 
However, since hooks were added you now use function based all the time, so that's my recommendation.    
*/

/* Class component */
// 1.Define component
//Jedi.js
import React from "react";

class Jedi extends React.Component {
  render() {
    return <div>I am a Jedi Component</div>;
  }
}

export default Jedi;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Jedi from "./Jedi";

ReactDOM.render(
  <div>
    <Jedi />
  </div>,
  document.getElementById("app")
);




/* Function component */
// 1.Define component
//Jedi.js
import React from 'react';

const Jedi = () => <div>I am a Jedi Component</div>

export default Jedi;

// 2. Use component
//index.js
import React from "react";
import ReactDOM from "react-dom";
import Jedi from "./Jedi";

ReactDOM.render(
  <div>
    <Jedi />
  </div>,
  document.getElementById("app")
);