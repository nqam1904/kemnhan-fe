import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import history from "../../../store/Route";
class HomeComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      alert("Logined")
      history.push("/login")
    }
  }
  render() {
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }
}

export default HomeComponents;
