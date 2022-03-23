import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";
import { history } from "../../../configureStore";
import { userData } from '../../../config/setting';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./Login.css";
import { isValidEmailAddress } from "../../../shared/Function";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSuccess: false,
      count: 0,
      changeDevMode: false,
    };
  }
  componentDidUpdate(prevProps) {

    if (this.props.result !== null && prevProps.result !== this.props.result) {
      if (this.props.result) {

        this.setState({
          isSuccess: true,
        });
        userData.accessToken = this.props.data.accessToken;
        userData.firstName = this.props.data.user.firstName;
        userData.lastName = this.props.data.user.lastName;
        userData.email = this.props.data.user.email;
        userData.phone = this.props.data.user.phone;
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        toast.error("Có lỗi xảy ra!")
      }
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
    } else if (!isValidEmailAddress(email)) {
      toast.error("Nhập đúng định dạng email!");
      return;
    }
    else {
      this.props.loginAction({
        email: email,
        password: password,
      });
    }
  };
  DevMode = () => {
    const { count, changeDevMode } = this.state;
    this.setState({ count: count + 1 })
    if (count === 7) {
      this.setState({
        changeDevMode: !changeDevMode,
        email: 'dev@gmail.com'
      })
    }

  }
  render() {
    const { email, password, isSuccess } = this.state;
    // console.log(userData)
    if (isSuccess === true) {
      return history.push("/admin")
    }

    return (
      <Container className="layout mt-10">
        <ToastContainer autoClose={3000} />
        <Form>
          <Form.Group controlId="formBasicEmail">
            {this.state.changeDevMode === false ? (
              <>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  // type="text"
                  autoComplete="off"
                  name="email"
                  onChange={this.onChange}
                />
              </>
            ) : (
              <>
                <Form.Label>DEV</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập tên dev"
                  value={email}
                  // type="text"
                  autoComplete="off"
                  name="email"
                  onChange={this.onChange}
                />
              </>
            )}
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
        <div className="logo" onClick={this.DevMode}>
          <LazyLoadImage
            effect="blur"
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
