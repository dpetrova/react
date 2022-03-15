/* Conditional rendering using if-else */

import React from "react";

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

export default Element;
