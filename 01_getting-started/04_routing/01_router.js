/* Type of routers */
// - BrowserRouter
// - HashRouter
// - Router

// 1. Install and set up

// 1.1. Install the router
npm install --save react-router-dom

// 1.2. Add the router
// index.js
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

// 1.3. Define the routes
//Our routes will be defined by x number of Route element where we specify which path they will match and what component that should respond. 
//All these routes will be put inside of a Switch component.
// Main.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';

const Main = () => (
<main>
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/products' component={Products}/>
    <Route path='/products/:id' component={ProductDetail}/>
  </Switch>
</main>
);

export default Main;

//Worth noting above is our usage of the attribute "exact", without it our router wouldn't be able to tell the difference between /products and /products/:id. 
//Removing it will lead to a product list being loaded even when we type /products/111. 
//Why is that? The way the router is constructed it will match the first pattern it sees. 


// 2. Set up the app
//Now we define the skeleton of our app. Normally an app has a header and a body, so our App.js file will now look like this:
//App.js
import React, { Component } from 'react';
import Head from './Head';
import Main from './Main';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;

//We have already defined what the Main component looks like above in Main.js. 

//What about Head component? Well this is typically where we define a menu the user can interact with. 
//This is where we introduce the Link component. This will help us create links that our router knows how to respond to. 
//Ultimately it will generate anchor, a-tags.
// Head.js
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Menu = styled.div`
  box-shadow: 0 2px 2px;
  border-bottom: solid 1px grey;
  padding: 20px;
  margin-bottom: 20px;
`;

const MenuItem = styled(Link)`
  padding: 20px 10px;
`;

const Head = () => (
  <Menu>
    <MenuItem to="/" >Home</MenuItem>
    <MenuItem to="/products" >Products</MenuItem>
  </Menu>
);

export default Head;