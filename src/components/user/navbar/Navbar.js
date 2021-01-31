import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <img
            src={require("../../../res/image/Kemnhanonline.png").default}
            alt="logo"
            className="logo-title"
          />
        </div>
        <div className="links">
          <Link to="/trang-chu">Trang chủ</Link>
          <Link to="/home/details">Sản phẩm</Link>
          <Link to="/home/about">Giới thiệu</Link>
          <Link to="/home">Liên hệ</Link>
          <Link to="/trang-chu/gio-hang">
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
      </div>
    );
  }
}

export default Navbar;
