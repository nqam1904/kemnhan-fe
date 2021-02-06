import React, { Component } from "react";

import { history } from "../../../configureStore";
import { toast, ToastContainer } from "react-toastify";

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
        <ToastContainer autoClose={3000} />
        <p>Hello</p>
      </>
    );
  }
}

export default HomeComponents;
