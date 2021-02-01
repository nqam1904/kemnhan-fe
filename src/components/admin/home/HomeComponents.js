import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class HomeComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      user: [],
      showModal: false,
      titileModal: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      email: "",
      role: "",
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') === null && localStorage.getItem('token') === 'undefined') {
      this.setState({
        isLogin: false
      })
    }
  }
  render() {

    const { isLogin } = this.state;
    if (isLogin === false) {
      return <Redirect to='/login' />
    }
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }
}

export default HomeComponents;
