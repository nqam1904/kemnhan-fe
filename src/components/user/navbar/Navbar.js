import axios from 'axios';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../config/setting';
import ImageAssets from '../../../constants/ImagesAsset';
import './Navbar.css';
import NavbarMobile from './NavbarMobile';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: [],
            loading: false,
            // selectedNews: Math.floor(Math.random() * API_NEWS.length)
            selectedNews: 0,
        };
    }
    scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    async componentDidMount() {
        this.setState({
            show: false,
        });
        await this.getPromotions();
    }
    getPromotions = () => {
        this.setState({
            loading: true,
        });
        axios
            .get(`${API_URL}/promotions`)
            .then((res) => {
                this.setState({
                    data: res.data,
                    loading: false,
                });
            })
            .catch((_err) => {});
    };
    handleClose = () => this.setState({ show: false });
    render() {
        const { data, loading } = this.state;
        const result =
            loading === false ? (
                data.map((item, index) => {
                    if (this.state.selectedNews === index) {
                        return (
                            <div>
                                <LazyLoadImage
                                    effect="blur"
                                    src={`${API_URL}/static/${item.images[0]?.key}`}
                                    alt={item.name}
                                    width="300"
                                    placeholderSrc={ImageAssets.logo}
                                />
                                <h3>{item.name}</h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                ></p>
                            </div>
                        );
                    }
                })
            ) : (
                <img src={ImageAssets.loading} alt="loading" width={200} />
            );

        return (
            <div className="nav" style={{ backgroundImage: `url(${ImageAssets.header})` }}>
                <div className="group-logo">
                    <img src={ImageAssets.logo} alt="logo" className="logo" />
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            this.scrollTo('home');
                        }}
                    >
                        <>
                            <img src={ImageAssets.logo} alt="logo" className="logo1" />
                            <img src={ImageAssets.kemnhanonline} alt="kemnhanonline" className="logo-title" />
                        </>
                    </Link>
                </div>
                <div className="links">
                    <Link to="/">Trang chủ</Link>
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            this.scrollTo('product');
                        }}
                    >
                        Sản phẩm
                    </Link>
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            this.scrollTo('about');
                        }}
                    >
                        Giới thiệu
                    </Link>
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            this.scrollTo('footer');
                        }}
                    >
                        Liên hệ
                    </Link>
                    <button
                        type="button"
                        className="custom__link"
                        onClick={() => {
                            this.setState({
                                show: true,
                                selectedNews: 0,
                            });
                        }}
                    >
                        Khuyễn mãi
                    </button>
                    <Link to="/gio-hang">
                        <div className="button-cart">
                            <img src={ImageAssets.icCart} alt="cart" className="ic_cart" />
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
                            <div className="item__news">{result}</div>
                            <div className="list__news">
                                {this.state.data.map((item, index) => (
                                    <div className="image__news" onClick={() => this.setState({ selectedNews: index })}>
                                        <LazyLoadImage
                                            effect="blur"
                                            src={`${API_URL}/static/${item.images[0]?.key}`}
                                            alt={item.name}
                                            width="200"
                                            placeholderSrc={ImageAssets.logo}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal.Body>

                    <div className="footer__modal">
                        <img src={ImageAssets.logo} width={25} alt="logo small" />
                        <span>Kemnhanonline</span>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Navbar;
