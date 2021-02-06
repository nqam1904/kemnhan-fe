import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { history } from "../../../configureStore";
class HomeComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {

      this.setState({ isLogin: true })
    }
  }
  render() {
    const { isLogin } = this.state;
    if (isLogin === true) {
      return history.push("/login")
    }
    return (
      <>
        <p>Hello</p>
      </>
    );
  }
}

export default HomeComponents;
