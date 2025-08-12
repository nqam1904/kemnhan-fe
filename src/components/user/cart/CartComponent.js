import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL } from '../../../config/setting';
import { history } from '../../../configureStore';
import { currencyFormat, isValidEmailAddress, validateInput } from '../../../utils/Function';
import './Cart.css';
import CartItem from './CartItem';
class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            showCustom: false,
            cart: [],
            layout: 'container-fluid',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            customer: [],
            emailIsValid: '',
            errorMessage: '',
        };
    }
    componentDidMount() {
        if (!localStorage.getItem('cart', this.props.cartItem)) {
            this.setState({
                layout: 'container',
            });
            // toast.success(`${Types.MSG_CART_EMPTY}`);
        } else {
            this.setState({
                showCustom: true,
            });
        }
    }

    showCartItem = () => {
        var result = null;
        const { cartItem } = this.props;
        if (cartItem.length > 0) {
            result = cartItem.map((item, index) => {
                const quantity = parseInt(item.quantity);
                return (
                    <CartItem
                        {...this.props}
                        key={index}
                        item={item}
                        index={index}
                        onDeleteItem={() => this.onDeleteItem(item.product.id)}
                        subItem={() => this.subItem(quantity, item.product.id)}
                        plusItem={() => this.plusItem(quantity, item.product.id)}
                    />
                );
            });
        }
        return result;
    };
    subItem = (quantity, id) => {
        if (quantity > 1) {
            const sl = -1;
            this.props.actUpdateItem(id, sl);
            this.setState({
                cartItem: this.props.cartItem,
            });

            toast.success('Cập nhật thành công!');
        }
    };

    plusItem = (quantity, id) => {
        if (quantity < 100) {
            const sl = 1;
            this.props.actUpdateItem(id, sl);
            this.setState({
                cartItem: this.props.cartItem,
            });
            toast.success('Cập nhật thành công!');
        }
    };

    onDeleteItem = (id) => {
        if (window.confirm('Bạn muốn xoá sản phẩm này')) {
            this.props.actDeleteItem(id);
            // window.location.reload();
            toast.success('Cập nhật thành công!');
            this.setState(
                {
                    cart: this.props.cartItem,
                },
                () => {
                    if (!localStorage.getItem('cart')) {
                        this.setState({
                            showCustom: false,
                            layout: 'container',
                        });
                    }
                }
            );
        }
    };
    showTotalAmount = (cartItem) => {
        var result = 0;
        if (cartItem.length > 0) {
            for (var i = 0; i < cartItem.length; i++) {
                result += cartItem[i].product.price * cartItem[i].quantity;
            }
        }
        return currencyFormat(result);
    };
    onChange = (e) => {
        e.preventDefault();
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        });
    };
    payment = () => {
        const { cartItem } = this.props;
        const { firstName, lastName, email, address, phone, note } = this.state;
        const date = new Date();
        if (firstName === '' || lastName === '' || email === '' || address === '' || phone === '') {
            return toast.warning('Vui lòng nhập đủ thông tin của bạn!');
        } else if (!isValidEmailAddress(email)) {
            toast.error('Nhập đúng định dạng email!');
            return;
        } else if (!validateInput(phone)) {
            toast.error('Số điện thoại phải có 10-11 chữ số!');
            return;
        } else {
            let listProduct = [];
            for (var item of cartItem) {
                listProduct.push({
                    productId: item.product.id,
                    quantity: item.quantity,
                    unitPrice: item.product.price,
                    subtotal: item.product.price * item.quantity,
                    discount: 0,
                    note: note,
                });
            }
            axios
                .post(`${API_URL}/orders`, {
                    data: date,
                    expectDateDelivery: date,
                    note: note,
                    customer: {
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        email: email,
                        address: address,
                    },
                    lines: listProduct,
                })
                .then((_) => {
                    // toast.success("Success!");
                    this.props.actDeleteAll();
                    this.setState({
                        showCustom: false,
                        layout: 'container',
                    });
                    history.push('/SuccessPayment');
                    // window.location.reload();
                })
                .catch((_) => { });
        }
    };

    onDeleteAll = () => {
        if (localStorage.getItem('cart')) {
            this.props.actDeleteAll();
            this.setState({
                showCustom: false,
                layout: 'container',
            });
            toast.success('Thành công!');
        }
    };
    onSaveCustom = () => { };
    render() {
        const { note, cart, showCustom, layout, firstName, lastName, email, address, phone } = this.state;
        const { cartItem } = this.props;
        const emptyCart = (
            <div className="description_cart">
                <div className="page_empty">
                    <img className="img_empty_cart" alt="empty" src={require('../../../res/image/empty.png').default} />
                    <Link to="/" className="btn_back">
                        <span>Mua thêm sản phẩm</span>
                    </Link>
                </div>
            </div>
        );
        const elemCustom = showCustom === true && (
            <div className="cart_custom">
                <div className="cart_header_custom">
                    <p className="content_cart">Đơn hàng</p>
                </div>
                <div className="cart_custom_body">
                    <div className="cart_custom_detail">
                        <input
                            className="input_custom"
                            style={{ marginLeft: 20, width: '90%' }}
                            onChange={this.onChange}
                            name="firstName"
                            value={firstName}
                            placeholder="Nhập họ"
                        />{' '}
                        <br />
                        <input
                            className="input_custom"
                            style={{ marginLeft: 20, width: '90%' }}
                            onChange={this.onChange}
                            name="lastName"
                            value={lastName}
                            placeholder="Nhập tên"
                        />{' '}
                        <br />
                        <input
                            className="input_custom"
                            placeholder="Nhập địa chỉ"
                            style={{ marginLeft: 20, width: '90%' }}
                            name="address"
                            // onBlur={() => this.setState({
                            //   emailIsValid: isValidEmailAddress(this.state.email)
                            // })}
                            value={address}
                            onChange={this.onChange}
                        />
                        <br />
                        <input
                            className="input_custom"
                            style={{ marginLeft: 20, width: '90%' }}
                            placeholder="Nhập số điện thoại"
                            name="phone"
                            type="number"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            value={phone}
                            onChange={this.onChange}
                        />
                        <br />
                        <input
                            className="input_custom"
                            style={{ marginLeft: 20, width: '90%' }}
                            placeholder="Nhập email"
                            value={email}
                            name="email"
                            type="email"
                            onChange={this.onChange}
                        />
                        <input
                            className="input_custom"
                            style={{ marginLeft: 20, width: '90%' }}
                            placeholder="Nhập ghi chú nếu có"
                            value={note}
                            name="note"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="cart_amount_body">
                    <div className="thongtin">
                        <p>Giá sản phẩm (1):</p>
                        <p>Tổng cộng:</p>
                        {/* <p>Phí ship:</p> */}
                    </div>
                    <div className="thanhtoan">
                        <p>{currencyFormat(cartItem[0]?.product.price)} đ</p>
                        <p className="total">{this.showTotalAmount(cartItem)} đ</p>
                    </div>
                </div>
                <div className="btn_payment" onClick={() => this.payment()}>
                    Đặt mua
                </div>
            </div>
        );
        return (
            <div className={layout}>
                <ToastContainer autoClose={2000} />
                <div className="page_cart">
                    <div className="card_cart">
                        <div className="cart_header">
                            <p className="content_cart">Giỏ hàng</p>
                            <p className="number_cart">{cartItem.length ?? 0} Sản phẩm</p>
                        </div>
                        <div className="cart_body">
                            <div className="option">
                                <div className="select_all">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="text_selectAll" style={{ paddingLeft: 8 }}>
                                        Chọn tất cả
                                    </p>
                                </div>
                                <div className="delete_item" onClick={() => this.onDeleteAll()}>
                                    <img src={require('../../../res/image/Delete.png').default} alt="delete" />
                                    <p className="text_delete">Xoá Tất cả</p>
                                </div>
                            </div>
                            <div className="content_cart_item">{!localStorage.getItem('cart', cart) ? emptyCart : this.showCartItem()}</div>
                        </div>
                    </div>
                    {elemCustom}
                </div>
            </div>
        );
    }
}

export default CartComponent;
