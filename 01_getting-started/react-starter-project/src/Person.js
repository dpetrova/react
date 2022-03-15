import React from "react";

class Person extends React.Component {
  constructor(props) {
    super(); // this call is needed to turn it into a React component
    this.state = {
      name: props.name,
    };
  }

  changeName(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>{this.state.name}</div>
        <div>
          <input
            type="text"
            onChange={(evt) => this.changeName(evt)}
            value={this.state.name}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Person;
