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
          <Link to="#">Sản phẩm</Link>
          <Link to="/trang-chu">Giới thiệu</Link>
          <Link to="/trang-chu">Liên hệ</Link>
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
        <label htmlFor="nav-mobile-input" className="menu__btn">
          <img
            src={require("../../../res/image/logo.png").default}
            alt="logo"
            className="logo_mobile"
          />
        </label>

        <input type="checkbox" id="nav-mobile-input" className="visually-hidden" hidden />
        <label htmlFor="nav-mobile-input" className="menu__overplay"></label>

        <nav className="menu__item__mobile">

          <label htmlFor="nav-mobile-input" className="menu__mobile__close">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </label>
          <Link to="/trang-chu" className="titile__link_mobile">
            <p className="titile__item">Trang chủ</p>
          </Link>
          <Link to="/home/details" className="titile__link_mobile">
            <p className="titile__item">Sản phẩm</p>
          </Link>
          <Link to="/home/about" className="titile__link_mobile">
            <p className="titile__item">Giới thiệu</p>
          </Link>
          <Link to="/home" className="titile__link_mobile">
            <p className="titile__item">Liên hệ</p>
          </Link>

          <Link to="/trang-chu/gio-hang" className="titile__link_mobile">
            <div className="button-cart titile__item">
              <img
                src={require("../../../res/image/ic_cart.png").default}
                alt="#"
                className="ic_cart"
              />
              <p className="title_cart">Giỏ hàng</p>

            </div>
          </Link>
        </nav>

      </div>


    );
  }
}

export default Navbar;
