import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import NavbarMobile from './NavbarMobile'
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="group-logo">
          <img
            src={require("../../../res/image/logo.png").default}
            alt="logo"
            className="logo"
          />
          <HashLink smooth to="#home">
            <>
              <img
                src={require("../../../res/image/logo.png").default}
                alt="logo"
                className="logo1"
              />
              <img
                src={require("../../../res/image/Kemnhanonline.png").default}
                alt="logo"
                className="logo-title" />
            </>
          </HashLink>

        </div>
        <div className="links">
          <Link to="/">Trang chủ</Link>
          <HashLink smooth to="#product">Sản phẩm</HashLink>
          <HashLink smooth to="#about">Giới thiệu</HashLink>
          <HashLink smooth to="#footer">Liên hệ</HashLink>
          <HashLink smooth to="#news">Khuyễn mãi</HashLink>
          <Link to="/gio-hang">
            <div className="button-cart">
              <img
                src={require("../../../res/image/ic_cart.png").default}
                alt="#"
                className="ic_cart"
              />
              <p className="title_cart">Giỏ hàng</p>

            </div>
          </Link>
        </div>
        <NavbarMobile />
      </div>


    );
  }
}

export default Navbar;
