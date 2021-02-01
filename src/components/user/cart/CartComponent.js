import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Types from '../../../redux/action/mesAction'
import './Cart.css'
class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            showCustom: false,
            cart: [],
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('cart', this.state.cart)) {
            toast.success(`${Types.MSG_CART_EMPTY}`)
        }
    }
    render() {
        const { count, cart } = this.state;
        const emptyCart = (
            <div className="page_empty">
                <img className="img_empty_cart" alt="empty" src={require('../../../res/image/empty.png').default} />
                <Link to='/home' className="btn_back"><span>Mua thêm sản phẩm</span></Link>
            </div>
        )
        return (
            <div className="container-fluid">
                <ToastContainer autoClose={3000} />
                <div className="page_cart">
                    <div className="row">
                        <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                            <div className="card_cart">
                                <div className="cart_header">
                                    <p className="content_cart">Giỏ hàng</p>
                                    <p className="number_cart">{count} Sản phẩm</p>
                                </div>
                                <div className="cart_body">
                                    <div className="option">
                                        <div className="select_all">
                                            <input type="checkbox" className="checkbox" />
                                            <p className="text_selectAll" style={{ paddingLeft: 8 }}>Chọn tất cả</p>
                                        </div>
                                        <div className="delete_item">
                                            <img src={require('../../../res/image/Delete.png').default} alt="delete" />
                                            <p className="text_delete">Xoá</p>
                                        </div>
                                    </div>
                                    <div className="content_cart_item">
                                        <div className="item_empty">
                                            {!localStorage.getItem('cart', cart) ? (emptyCart) : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                            <div className="cart_custom">
                                <div className="cart_header_custom">
                                    <p className="content_cart">Đơn hàng</p>
                                </div>
                                <div className="cart_custom_body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartComponent;