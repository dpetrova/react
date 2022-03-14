/* Conditional rendering 
Conditional rendering is about deciding what to render given a value of a variable. There are different approaches we can have here:
 - render if true
 - ternary expression
*/

/* render if true */
class Element extends React.Component {
  state = {
    show: true,
  };

  toggle = () => {
    this.setState({
      show: !this.state.show,
    });
    console.log(this.state.show);
  };

  render() {
    return (
      <React.Fragment>
        <div>some data</div>
        {this.state.show && <div>conditional rendered body content</div>}
        <button onClick={this.toggle}>Toggle rendering</button>
      </React.Fragment>
    );
  }
}

/* ternary rendering */
const IntervalExample = () => {
  //declare a new state variable, which we'll call "loading" and initial value of true
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((loading) => false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      {loading ? <div>loading...</div> : <div>Fetched data</div>}
    </React.Fragment>
  );
};

/* using if, else if, else */
class Element extends React.Component {
  state = {
    loading: true,
    data: void 0,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
        data: "fetched data from API",
      });
    }, 3000);
  }

  //we can't use if, else if and so on directly in the template but we can have a method getData() that can decide for us what to render out:
  getData() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else if (this.state.data) {
      return <div>{this.state.data}</div>;
    } else {
      return <div>No data to show</div>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>calling API</div>
        {/* calling the method in the template */}
        {this.getData()}
      </React.Fragment>
    );
  }
}
