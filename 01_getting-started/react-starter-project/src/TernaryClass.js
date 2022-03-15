/* Conditional rendering using ternary expression */

import React from "react";

class Element extends React.Component {
  state = {
    loading: true,
    data: "Fetched data",
  };

  componentDidMount() {
    const intervalId = setInterval(() => {
      //   this.setState({
      //     loading: false,
      //   });
      this.setState((prevState) => {
        return {
          loading: !prevState.loading,
        };
      });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>{this.state.data}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Element;
