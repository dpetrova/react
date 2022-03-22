/* Render props pattern */

//The Render props pattern is a way for us to create a component that provides some kind of data to a child component.

//Imagine that we wanted to do something of the following:
// - fetching data: to have a component that abstracts away all of the mess of HTTP and just serves you the data when it’s done
// - A/B testing: to be able to conditionally decide whether something is visible or not
//If you have any of the scenarios above you have reusable functionality. 
//With reusable functionality, you most likely want to abstract that away into a function or a component.
//In a sense, this resembles what we do with Providers but also how container components wrap presentation components. 

const ProductDetail = ({ product }) => ( 
  <React.Fragment> 
    <h2>{product.title}</h2> 
    <div>{product.description}</div> 
  </React.Fragment> 
) 
  
<Fetch url="some url where my data is" 
  render={(data) => <ProductDetail product={data.product} /> }
/>

//As we can see above we have two different components ProductDetail and Fetch. 
//ProductDetail just looks like a presentation component. 
//Fetch on the other hand has a property url on it and it seems like it has a render property that ends up rendering our ProductDetail.


/* 1. Render props explained */

//We can reverse engineer this and figure out how this works.
//Fetch component has an attribute render that seems to take a function that ends up producing JSX. 
//Here is the thing, the whole render-props pattern is about us invoking a function in our return method:
class Fetch extends React.Component { 
  render() { 
    return this.props.render(); 
  } 
}

//This is what the pattern is, at its simplest. 
//The way we use the Fetch component means we at least need to send something into the this.props.render() call:
(data) => <ProductDetail product={data.product} />

//We can see above that we need a parameter data and data seems to be an object. 
//Ok, so where does data come from? 
//Well thats the thing with our Fetch component, it does some heavy lifting for us namely carrying out HTTP calls.



/* 2. Component for HTTP */

//Let’s add some life cycle methods to Fetch so it looks like this:
class Fetch extends React.Component { 
  state = { 
    data: void 0, //void 0 is just setting something to undefined
    error: void 0 
  } 

  componentDidMount() { 
    this.fetchData(); 
  } 

  async fetchData() { 
    try { 
      const response = await fetch(this.props.url)
      const json = await response.json()
      this.setState({ data: json }) 
    }
    catch (err) { 
      this.setState({ error: err }) 
    } 
  } 

  render() { 
    if (!this.state.data) return null; 
    else return this.props.render(this.state.data); 
  } 
}

//We’ve added the method fetchData() that makes HTTP call, given this.props.url and we can see that our render() method renders null if this.state.data isn't set, 
//but if the HTTP call finished we invoke this.props.render(data) with our JSON response.

//However, it lacks three things:
// - handling error: we should add logic to handle error
// - handling loading: right now we render nothing if thefetch() call hasn't finished, that isn't very nice
// - handling this.props.url, this prop might not be set initially and it might be changed over time, so we should handle that



/* 2.1. Handling errors */

//We can easily handle this one by changing our render() method a little, to cater to if this.state.error: 
class Fetch extends React.Component { 
  state = { 
    data: void 0, 
    error: void 0 
  } 

  componentDidMount() { 
    this.fetchData(); 
  } 

  async fetchData() { 
    try { 
      const response = await fetch(this.props.url) 
      const json = await response.json()
      this.setState({ data: json })
    }
    catch (err) { 
      this.setState({ error: err }) 
    } 
  } 

  render() { 
    const { error, data, loading } = this.state; 
    if(error) return this.props.error(error); 
    if (data) return this.props.render(data); 
    else return null; 
  } 
}

//Above we added handling of this.state.error by invoking this.props.error(), so that is a thing we need to reflect once we try to use the Fetch component.



/* 2.2. Handling loading */

//For this one we just need to add a new state loading and updated the render() method to look at the said property:
class Fetch extends React.Component { 
  state = { 
    data: void 0, 
    error: void 0,
    loading: false 
  } 

  componentDidMount() { 
    this.fetchData(); 
  } 

  async fetchData() { 
    try { 
      this.setState({ loading: true })
      const response = await fetch(this.props.url)
      const json = await response.json()
      this.setState({ data: json })
      this.setState({ loading: false })
    }
    catch (err) { 
      this.setState({ error: err }) 
    } 
  }
 
  render() { 
    const { error, data, loading } = this.state; 
    if(loading) return <div>Loading...</div> 
    if(error) return this.props.error(error); 
    if (data) return this.props.render(data);
    else return null; 
  } 
}

//Above we are a bit sloppy handling the loading, but it can be improved using a nice component that looks like a spinner or a ghost image.



/* 2.3. Handling changes to this.props.url */

//It’s entirely possible that this URL can change and we need to cater to it unless we plan on using the component like so
<Fetch url="static-url" />

//If it so, skip next section. But if we have URL that could be changed:
class Fetch extends React.Component { 
  state = { 
    data: void 0, 
    error: void 0,
    loading: false 
  } 

  componentDidMount() { 
    this.fetchData(); 
  } 

  componentDidUpdate(prevProps) { 
    if (this.props.url && this.props.url !== prevProps.url) {     
      this.fetchData(this.props.url); 
    } 
  } 

  async fetchData() { 
    try { 
      this.setState({ loading: true }); 
      const response = await fetch(this.props.url); 
      const json = await response.json(); 
      this.setState({ data: json }); 
      this.setState({ loading: false }); 
    }
    catch (err) { 
      this.setState({ error: err }) 
    } 
  } 

  render() {
    const { error, data, loading } = this.state; 
    if(loading) return <div>Loading...</div>
    if(error) return this.props.error(error);
    if(data) return this.props.render(data); 
    else return null; 
  } 
}

//To use our component:
<Fetch 
  url={url-to-product} 
  render={(data) => <ProductDetail product={data.product} />} 
  error={(error) => <div>{error.message}</div>} 
/>



/* 3. A/B Testing */

//We will sooner or later have probably two major reasons for wanting to show code conditionally using this component:
// - it’s not ready yet: we want to deploy often and we may want to show a new feature only to our Product Owner so we can gather feedback, 
//   so if we would be able to control the showing of these components content with a flag
// - A/B test: let’s say we don’t know which new Checkout page we want to go to, within our e-commerce app, 
//   then it would be great if we can send half the users to version1 and the other half to version 2.
//   In such a scenario you might have two different pages but if the difference is minor, like the toggling of a few sections, then this could be a good candidate.

<FeatureFlag 
  flag={showAlternateSection} 
  render={()=> <div>Alternate design</div>} 
  else={()=> <div>Normal design</div>} 
/>

//Above we have a component FeatureFlag and the following attributes:
// - flag: this would be the name of the feature flag, most likely a string
// - render: this would be a method we invoke given that the feature flag is enabled
// - else: this would be a method we invoke if feature flag is disabled or non-existent


/* 3.1. Building our component */

class FeatureFlag extends React.Component { 
  state = { 
    enabled: void 0 
  } 
  
  componentDidMount() { 
    const enabled = localStorage.getItem(this.props.flag) === 'true'; 
    this.setState({ enabled }); 
  } 

  render() { 
    if(enabled) return this.props.render(); 
    else if(enabled === false) return this.props.else(); 
    else return null; 
  } 
}

//We introduce three states here:
// - true: when we know the flag is true
// - false: when we know the flag is false
// - void 0/undefined: when the flags value hasn’t been resolved yet

// We want to make sure it renders exactly what it should be rendering and that it doesn’t show something it shouldn’t, if only for a millisecond.
//So, localStorage.getItem() is usually fast to respond.
//But if you want to place your flags in a service instead of localStorage:
async componentDidMount() { 
  const enabled = await flagService.get(this.props.flag);
  this.setState({ enabled }); 
}
