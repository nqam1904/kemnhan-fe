import { CONFIG } from '@/config-global';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import ClearableInput from '@/components/clearable-input';
import { isValidEmailAddress, validatePhoneNumber } from '@/utils/format-string';
import ImageAssets from 'constants/ImagesAsset';
import { fNumber } from 'utils/format-number';
import CartItem from './cart-item';
import './Cart.css';

interface CartComponentProps {
    cartItem: any[];
    actDeleteAll: () => void;
    actUpdateItem: (id: any, quantity: any) => void;
    actDeleteItem: (id: any) => void;
}

interface CartComponentState {
    count: number;
    showCustom: boolean;
    cart: any[];
    cartItem: any[];
    layout: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    customer: any[];
    emailIsValid: string;
    errorMessage: string;
    note: string;
    [key: string]: any;
}

function CartComponent(props: CartComponentProps) {
    const [showCustom, setShowCustom] = useState<boolean>(false);
    const [cart, setCart] = useState<any[]>([]);
    const [layout, setLayout] = useState<string>('container-fluid');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [note, setNote] = useState<string>('');

    useEffect(() => {
        if (!(localStorage.getItem('token') || '')) {
            setLayout('container');
        } else {
            setShowCustom(true);
        }
    }, []);

    const showCartItem = () => {
        var result = null;
        const { cartItem } = props;
        if (cartItem.length > 0) {
            result = cartItem.map((item: any, index: any) => {
                const quantity = parseInt(item.quantity);
                return (
                    <CartItem
                        key={index}
                        item={item}
                        onDeleteItem={() => onDeleteItem(item.product.id)}
                        subItem={() => subItem(quantity, item.product.id)}
                        plusItem={() => plusItem(quantity, item.product.id)}
                    />
                );
            });
        }
        return result;
    };
    const subItem = (quantity, id) => {
        if (quantity > 1) {
            const sl = -1;
            props.actUpdateItem(id, sl);
            toast.success('Cập nhật thành công!');
        }
    };

    const plusItem = (quantity, id) => {
        if (quantity < 100) {
            const sl = 1;
            props.actUpdateItem(id, sl);
            toast.success('Cập nhật thành công!');
        }
    };

    const onDeleteItem = (id: any) => {
        if (window.confirm('Bạn muốn xoá sản phẩm này')) {
            props.actDeleteItem(id);
            toast.success('Cập nhật thành công!');
            setCart(props.cartItem);
            if (!(localStorage.getItem('token') || '')) {
                setShowCustom(false);
                setLayout('container');
            }
        }
    };
    const showTotalAmount = (cartItem) => {
        var result = 0;
        if (cartItem.length > 0) {
            for (var i = 0; i < cartItem.length; i++) {
                result += cartItem[i].product.price * cartItem[i].quantity;
            }
        }
        return fNumber(result);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if (name === 'firstName') setFirstName(value);
        else if (name === 'lastName') setLastName(value);
        else if (name === 'address') setAddress(value);
        else if (name === 'phone') setPhone(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'note') setNote(value);
    };
    const payment = () => {
        const { cartItem } = props;
        const date = new Date();
        if (firstName === '' || lastName === '' || email === '' || address === '' || phone === '') {
            return toast.warning('Vui lòng nhập đủ thông tin của bạn!');
        } else if (!isValidEmailAddress(email)) {
            toast.error('Nhập đúng định dạng email!');
            return;
        } else if (!validatePhoneNumber(phone)) {
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
                .post(`${CONFIG.serverUrl}/orders`, {
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
                    props.actDeleteAll();
                    setShowCustom(false);
                    setLayout('container');
                    window.location.href = '/SuccessPayment';
                })
                .catch((_) => {
                    toast.error('Có lỗi xảy ra');
                });
        }
    };

    const onDeleteAll = () => {
        if (localStorage.getItem('token') || '') {
            props.actDeleteAll();
            setShowCustom(false);
            setLayout('container');
            toast.success('Thành công!');
        }
    };
    const emptyCart = (
        <div className="description_cart">
            <div className="page_empty">
                <img className="img_empty_cart" alt="empty" src={ImageAssets.empty} />
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
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        onChange={onChange as any}
                        name="firstName"
                        value={firstName}
                        placeholder="Nhập họ"
                    />{' '}
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        onChange={onChange as any}
                        name="lastName"
                        value={lastName}
                        placeholder="Nhập tên"
                    />{' '}
                    <br />
                    <ClearableInput
                        className="input_custom"
                        placeholder="Nhập địa chỉ"
                        style={{ marginLeft: 20, width: '90%' }}
                        name="address"
                        value={address}
                        onChange={onChange as any}
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập số điện thoại"
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={onChange as any}
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập email"
                        value={email}
                        name="email"
                        type="email"
                        onChange={onChange as any}
                    />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập ghi chú nếu có"
                        value={note}
                        name="note"
                        onChange={onChange as any}
                    />
                </div>
            </div>
            <div className="cart_amount_body">
                <div className="thongtin">
                    <p>Giá sản phẩm (1):</p>
                    <p>Tổng cộng:</p>
                </div>
                <div className="thanhtoan">
                    <p>{fNumber(props.cartItem[0]?.product.price)} đ</p>
                    <p className="total">{showTotalAmount(props.cartItem)} đ</p>
                </div>
            </div>
            <div className="btn_payment" onClick={() => payment()}>
                Đặt mua
            </div>
        </div>
    );
    return (
        <div className={layout}>
            <ToastContainer autoClose={1000} />
            <div className="page_cart">
                <div className="card_cart">
                    <div className="cart_header">
                        <p className="content_cart">Giỏ hàng</p>
                        <p className="number_cart">{props.cartItem.length ?? 0} Sản phẩm</p>
                    </div>
                    <div className="cart_body">
                        <div className="option">
                            <div className="select_all">
                                <input type="checkbox" className="checkbox" />
                                <p className="text_selectAll" style={{ paddingLeft: 8 }}>
                                    Chọn tất cả
                                </p>
                            </div>
                            <div className="delete_item" onClick={() => onDeleteAll()}>
                                <img src={ImageAssets.delete} alt="delete" />
                                <p className="text_delete">Xoá Tất cả</p>
                            </div>
                        </div>
                        <div className="content_cart_item">
                            {!(localStorage.getItem('token') || '') ? emptyCart : showCartItem()}
                        </div>
                    </div>
                </div>
                {elemCustom}
            </div>
        </div>
    );
}

export default CartComponent;
