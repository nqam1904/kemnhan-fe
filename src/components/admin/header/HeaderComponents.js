import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import history from "../../../store/Route";
class Header extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.logOutAction()
    if (this.props.data === null) {
      return history.push("/login")
    }
  };
  render() {

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
            <Nav.Link href="#pricing">Đơn hàng</Nav.Link>
            <Nav.Link href="#pricing">Thống kê</Nav.Link>
          </Nav>
          <div style={{ marginRight: 65 }}>
            <NavDropdown title="Tài khoản" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Thông tin tài khoản
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.logOut}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

export default Header;
