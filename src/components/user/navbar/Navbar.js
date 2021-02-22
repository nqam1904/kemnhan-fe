import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import NavbarMobile from './NavbarMobile'
import "./Navbar.css";
import { Modal } from "react-bootstrap";
import { API_NEWS } from "../../../config/setting";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedNews: Math.floor(Math.random() * API_NEWS.length)
    }
  }
  handleClose = () => this.setState({ show: false });
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
          <HashLink smooth="true" to="#product">Sản phẩm</HashLink>
          <HashLink smooth="true" to="#about">Giới thiệu</HashLink>
          <HashLink smooth="true" to="#footer">Liên hệ</HashLink>
          <a className="custom__link" onClick={() => {
            this.setState({
              show: true,
              selectedNews: Math.floor(Math.random() * API_NEWS.length)
            })
          }}> Khuyễn mãi</a>
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

        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Tin tức khuyến mại</Modal.Title>
          </Modal.Header>
          <Modal.Body scrollable="true">
            <div className="content__news">
              <div className="item__news">
                {API_NEWS.map((item, index) => {
                  if (this.state.selectedNews === index) {
                    return (
                      <>
                        <img src={item.image} alt="" width="200" />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                      </>
                    )
                  }
                })}
              </div>
              <div className="list__news">
                {API_NEWS.map((item, index) => (
                  <div className="image__news" onClick={() => this.setState({ selectedNews: index })}>
                    <img src={item.image} alt="" width="200" />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>

          <div className="footer__modal">
            <img src={require('../../../res/image/logo.png').default} width={25} />
            <span>Kemnhanonline</span>
          </div>

        </Modal>
      </div>


    );
  }
}

export default Navbar;
