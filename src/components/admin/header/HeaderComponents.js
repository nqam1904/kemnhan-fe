import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import history from "../../../store/Route";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { logout: false, }
  }


  logOut = () => {
    localStorage.clear("token");
    if (this.props.data === null) {
      this.setState({ logout: true })
    }
  };
  render() {
    const { logout } = this.state;
    if (this.props.data === null || logout === true) {
      return <Redirect to="/login" />
    }

    return (

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
        <Navbar.Brand as={Link} to="/admin">
          <img
            src={require("../../../res/image/logo.png").default}
            width={50}
            height={50}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/admin/account">Tài khoản</Nav.Link>
            <Nav.Link as={Link} to="/admin/category">
              Danh mục
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/product">Sản phẩm</Nav.Link>
            <Nav.Link as={Link} to="#">Khách hàng</Nav.Link>
            <Nav.Link as={Link} to="/admin/order">Đơn hàng</Nav.Link>
            <Nav.Link as={Link} to="/admin/media">YouTube</Nav.Link>
          </Nav>
          <NavDropdown title="Tài khoản" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              Thông tin tài khoản
              </NavDropdown.Item>
            <NavDropdown.Item onClick={() => this.logOut()}>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

export default Header;
