/* Mocking HTTP calls with Nock */

//Nock is used to mock calls to HTTP. 
//It makes it possible for us to specify what URLs to listen to and what to respond with. 

//We will cover:
// - set up: setting up a nock and specify a mock response
// - query parameters: see how we can set up our nock with query parameters
// - verification: we should always verify that our nocks where hit. 
//   If they weren't then something changed and we need to change our tests to reflect that


/* Scenario */

//Imagine we have the following files:
// - products.js -> a service that can retrieve data for us
// - ProductsList.js -> a component that calls a method on products.js to get data and render that

// products.js
export const getProducts = async () => {
  const response = await fetch('http://myapi.com/products');
  const json = await response.json();
  return json.products;
}

//Above we can see that we do a fetch() call to url http://myapi.com/products and thereafter we transform the response and dig out the data products.

// ProductsList.js
import React from 'react';
import { getProducts } from '../products';

const Products = ({ products }) => (
  <React.Fragment>
  {products.map(p => <div>{product.name}</div>)}
  </React.Fragment>
);

class ProductsContainer extends React.Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const products = await getProducts();

    this.setState({
      products
    });
  }

  render() {
    return (
      <Products products={this.state.products} />
    );
  }
}

export default ProductsContainer;

//We can see that we use product.js module and call getProducts() in the componentDidMount() and end up rendering the data when it arrives.



/* Testing it */

//If we wanted to test ProductsList.js module we would want to focus on mocking away products.js cause it is a dependency. 
//We could use the library nock for this. 

//Let's now create a test __tests__/ProductsList.js and define it like the following:
// __tests__/ProductsList.js
import React from 'react';
import ReactDOM from 'react-dom';
import ProductsList from '../ProductsList';
import nock from 'nock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//Let's see first what happens if we don't set up a nock: it will attempt to perform a network request. 
//We should never do that when running a test. 

//We could add a Jest mock for this that is definitely one way to solve it:
// __mocks__/products.js
export const getProducts = async () => {
  const products = await Promise.resolve([{ name: 'test' }]);
  return products;
}

//That works but let's look at how to solve it with nock. 

//Let's start off by installing nock:
yarn add nock

//Because we are attempting to call fetch() in a node environment we need to ensure it is set up correctly. 
//Suggestion is to set up the global.fetch and assign node-fetch to it, like so:
// setupTests.js
global.fetch = require('node-fetch');

//Let's now add nock to our test, like so:
import React from 'react';
import ReactDOM from 'react-dom';
import ProductsList from '../ProductsList';
import nock from 'nock';

it('renders without crashing', () => {
  const scope = nock('http://myapi.com')
  .get('/products')
  .reply(200, {
    products: [{ id: 1, name: 'nocked data' }]
  }, {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  });

  const div = document.createElement('div');
  ReactDOM.render(<ProductsList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//Note above how we invoke the nock() method by first giving it the baseUrl http://myapi.com,
//followed by the path /products and the HTTP verb get and how we define what the response should look like with reply(). 
//We also give the reply() method a second argument to ensure CORS plays nicely. 
//At this point our test works.




/* Query parameters */

//What if we have a url that looks like this:
http://myapi.com/products?page=1&pageSize=10

//We can use the helper method query for that, like so:
nock('http://myapi.com')
 .get('/products')
 .query({ page: 1, pageSize: 10 })




/* Verify your mock/s */

//It's considered best practice to verify that the mocks you have set up are being hit. 
//To do that we can call done() on the returned reference when we are calling nock:
const scope = nock('http://myapi.com')
.get('/products')
.reply(200, {
  products: [{ id: 1, name: 'nocked data' }]
}, {
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json'
});

scope.done();




/* Block HTTP calls */

//You should never let a HTTP call happen for real so therefore make sure to shut off that ability. 
//We can do so by adding the following line to setupTests.js:

// setupTests.js
import nock from 'nock';
nock.disableNetConnect();