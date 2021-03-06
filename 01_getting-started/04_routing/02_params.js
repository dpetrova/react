/* Dealing with router and query params */

//There are two different concepts that interest us:
// - router parameters
// - query parameters


/* 1. Router params */
//Router parameters are part of url and can look like the following:
/products/111
/users/1/products

//Usually what we do is having a user navigate to a page and if necessary we dig out the router parameter, cause it needs to be part of our query. 
//Imagine that the link /products/111 is clicked. 
//This will mean we will take the user to a ProductDetail component where we will need to:
// - dig out the the router param
// - pose a query based on said param and show the result

class ProductDetail extends React.Component {
  state = {
    product: void 0
  }

  async componentDidMount() {
    const product = await api.getProduct(`/products/${this.props.match.params.id}`);
    this.setState({
      product,
    });
  }

  render() {
    return (
      <React.Fragment>
        { this.state.product && <div>{this.state.product.name}</div> }
      </React.Fragment>
    );
  }
}

//There is a match object that contains a params object that points to our router parameter id.
this.props.match.params.id

//Let's quickly remind ourself how this router was set up:
<Route path='/products/:id' component={ProductDetail}/>

//Above you can see that we define the route /products/:id, and thereby we set the wildcard to :id, which makes it possible to access it by this.props.match.params.id.




/* 2. Query params */
//Query parameters are used to filter down a resource. 
//A typical example is using parameters like pageSize or page to indicate to the backend that you only want a small slice of content and not the full list which can be millions of rows potentially. 
//Query parameters are found after the ? character in the url which would make the url look like this /products?page=1&pageSize=20. 
//Let's have a look in code how we can access query parameters:
import React from 'react';
import { parse } from 'query-string';

class Products extends React.Component {
  state = {
    products: []
  };

  async componentDidMount() {
    const { location: { search } } = this.props;
    const { page, pageSize } = search;
    const products = await api.getProducts(`/products?page=${page}&pageSize=${pageSize}`);
    this.setState({
      products,
    });
  }

  render() {
    <React.Fragment>
    {this.props.products.map(product => <div>{product.name}</div>)}
    </React.Fragment>
  }
}

//As you can see above we are able to access our query parameters through a location object that sits on a search object that represents our parameters like so:
{
  page: 1,
  pageSize: 20
}