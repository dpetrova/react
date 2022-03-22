/* Programmatic navigation */

//Usually we navigate using the Link component but sometimes we need to navigate based on an action.
//Then we are talking about programmatic navigation.
//There are essentially two ways of making that happen:
// - history.push('url')
// - Redirect component

/* 1. Using history */
//We need to inject the history inside of our component.
//This is accomplished by using withRouter() function.
import React from "react";
import { withRouter } from "react-router-dom";

class TestComponent extends React.Component {
  navigate = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.navigate}>Navigate</button>
      </React.Fragment>
    );
  }
}

export default withRouter(TestComponent);

/* 2. Using Redirect component */
//The idea is to have it look at a state in the component and if that condition is fulfilled then navigate.
import { Redirect } from "react-router";
import { isLoggedIn } from "./login"; // this could be from a React context or a Redux store

const User = () => <div>username ... </div>;

class UserDetail extends React.Component {
  render() {
    <React.Fragment>
      {isLoggedIn() ? <User /> : <Redirect to="/login" />}
    </React.Fragment>;
  }
}

export default UserDetail;