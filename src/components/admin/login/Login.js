import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";
// import history from "../../../store/Route";
// import * as Types from "../../../redux/action/loginAction"
import "./Login.css";
import { Redirect } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSuccess: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== null && prevProps.data !== this.props.data) {
      this.setState({
        isSuccess: true,
      });
    } else {
      toast.error("Đăng nhập không thành công!");
    }
  }
  onChange = (e) => {
    e.preventDefault();
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === "" || password === "") {
      toast.warn("Vui lòng nhập thông tin đăng nhập!");
      return;
    } else {
      this.props.loginAction({
        email: email,
        password: password,
      });
    }
  };
  render() {
    const { email, password, isSuccess } = this.state;
    if (isSuccess === true) {
      return <Redirect to="/admin" />;
    }

    return (
      <Container className="layout mt-10">
        <ToastContainer autoClose={3000} />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập tài khoản"
              value={email}
              // type="text"
              autoComplete="off"
              name="email"
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Nhập mật khẩu"
              autoComplete="off"
              name="password"
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Đăng nhập
          </Button>
        </Form>
        <div className="logo">
          <img
            src={require("../../../res/image/logo.png").default}
            width="300"
            height="300"
            alt="logo"
          />
        </div>
      </Container>
    );
  }
}

export default Login;
