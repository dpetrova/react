/* Conditional rendering if true */

import React from "react";

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

export default Element;
