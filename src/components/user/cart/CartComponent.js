import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Types from '../../../redux/action/mesAction'
import './Cart.css'
import CartItem from './CartItem';
import { currencyFormat } from '../../../shared/Function';
class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            showCustom: false,
            cart: [],
            layout: "container-fluid",

        }
    }
    componentDidMount() {
        if (!localStorage.getItem('cart', this.props.cartItem)) {
            this.setState({
                layout: "container",

            })
            toast.success(`${Types.MSG_CART_EMPTY}`)
        } else {
            this.setState({
                showCustom: true
            })
        }
    }
    showCartItem = (cartItem) => {
        var result = null;
        if (cartItem.length > 0) {
            result = cartItem.map((item, index) => {
                return (
                    <CartItem
                        key={index}
                        item={item}
                        index={index}
                    />
                )
            })
        }
        return result;
    }
    showTotalAmount = (cartItem) => {

        var result = 0;
        if (cartItem.length > 0) {
            for (var i = 0; i < cartItem.length; i++) {
                result += cartItem[i].product.price * cartItem[i].quantity;
            }
        }
        return currencyFormat(result);
    }
    render() {
        const { count, cart, showCustom, layout } = this.state;
        const { cartItem } = this.props;
        console.log()
        const emptyCart = (
            <div className="description_cart">
                <div className="page_empty">
                    <img className="img_empty_cart" alt="empty" src={require('../../../res/image/empty.png').default} />
                    <Link to='/trang-chu' className="btn_back"><span>Mua thêm sản phẩm</span></Link>
                </div>
            </div>
        )
        const elemCustom = showCustom === true && (

            <div className="cart_custom">
                <div className="cart_header_custom">
                    <p className="content_cart">Đơn hàng</p>
                </div>
                <div className="cart_custom_body">
                    <div className="cart_custom_detail">
                        <input className="input_custom" style={{ marginLeft: 20 }} placeholder="Nhập họ tên" /> <br />
                        <img src={require('../../../res/image/Location.png').default} />
                        <input className="input_custom" placeholder="Nhập địa chỉ" /><br />
                        <img src={require('../../../res/image/Call.png').default} />
                        <input className="input_custom" placeholder="Nhập số điện thoại" /><br />
                        <img src={require('../../../res/image/mail.png').default} />
                        <input className="input_custom" placeholder="Nhập email" />
                    </div>
                    <div style={{ color: '#1890FF' }}>
                        Edit
                    </div>
                </div>
                <div className="cart_amount_body">
                    <div className="thongtin">
                        <p>Giá sản phẩm (1):</p>
                        <p>Tổng cộng:</p>
                        {/* <p>Phí ship:</p> */}
                    </div>
                    <div className="thanhtoan">
                        <p>{currencyFormat(cartItem[0].product.price)} đ</p>
                        <p className="total">{this.showTotalAmount(cartItem)} đ</p>
                    </div>
                </div>
                <div className="btn_payment">
                    Đặt mua
                </div>
            </div>
        )
        return (
            <div className={layout}>
                <ToastContainer autoClose={3000} />
                <div className="page_cart">
                    <div className="card_cart">
                        <div className="cart_header">
                            <p className="content_cart">Giỏ hàng</p>
                            <p className="number_cart">{cartItem.length} Sản phẩm</p>
                        </div>
                        <div className="cart_body">
                            <div className="option">
                                <div className="select_all">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="text_selectAll" style={{ paddingLeft: 8 }}>Chọn tất cả</p>
                                </div>
                                <div className="delete_item" onClick={() => this.props.actDeleteItem()}>
                                    <img src={require('../../../res/image/Delete.png').default} alt="delete" />
                                    <p className="text_delete">Xoá</p>
                                </div>
                            </div>
                            <div className="content_cart_item">
                                {!localStorage.getItem('cart', cart) ? (emptyCart) : this.showCartItem(cartItem)}
                            </div>
                        </div>
                    </div>
                    {elemCustom}
                </div>
            </div>
        );
    }
}

export default CartComponent;