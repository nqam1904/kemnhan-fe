import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      return <Redirect to="/login" />
    }
  }
  render() {
    return (
      <>
        <p>Hello</p>
      </>
    );
  }
}

export default HomeComponents;
