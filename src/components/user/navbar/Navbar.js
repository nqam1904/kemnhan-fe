import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import NavbarMobile from './NavbarMobile'
import "./Navbar.css";
import { Modal } from "react-bootstrap";
import { API_NEWS, API_URL } from "../../../config/setting";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: [],
      loading: false,
      // selectedNews: Math.floor(Math.random() * API_NEWS.length)
      selectedNews: 0
    }
  }
  async componentDidMount() {
    this.setState({
      show: false,

    })
    await this.getPromotions();

  }
  getPromotions = () => {
    const { loading } = this.state
    this.setState({
      loading: true
    })
    axios.get(`${API_URL}/promotions`)
      .then(res => {
        this.setState({
          data: res.data,
          loading: false,
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  handleClose = () => this.setState({ show: false });
  render() {
    const { data, loading } = this.state;
    const result = loading === false ? data.map((item, index) => {
      if (this.state.selectedNews === index) {
        return (
          <div>
            <LazyLoadImage
              effect="blur"
              src={`${API_URL}/static/${item.images[0]?.key}`}
              alt={item.name}
              width="300"
              placeholderSrc={process.env.PUBLIC_URL + "/logo.png"} />
            <h3>{item.name}</h3>
            <p dangerouslySetInnerHTML={{
              __html: item.content
            }}></p>
          </div>
        )
      }
    }) : <img src={require('../../../res/image/loading.gif').default} alt="" width={200} />

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
              selectedNews: 0
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
                {result}
              </div>
              <div className="list__news">
                {this.state.data.map((item, index) => (
                  <div className="image__news" onClick={() => this.setState({ selectedNews: index })}>
                    <LazyLoadImage
                      effect="blur"
                      src={`${API_URL}/static/${item.images[0]?.key}`}
                      alt={item.name}
                      width="200"
                      placeholderSrc={process.env.PUBLIC_URL + "/logo.png"} />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>

          <div className="footer__modal">
            <img src={require('../../../res/image/logo.png').default} width={25} alt="" />
            <span>Kemnhanonline</span>
          </div>

        </Modal>
      </div>


    );
  }
}

export default Navbar;
