import './Cart.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CONFIG } from '@/config-global';
import { fNumber } from '@/utils/format-number';
import ImageAssets from '@/constants/ImagesAsset';
import { useMemo, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ClearableInput from '@/components/clearable-input';
import { isValidEmailAddress, validatePhoneNumber } from '@/utils/format-string';

import CartItem from './cart-item';

type Product = { id: string | number; price: number };
type LineItem = { product: Product; quantity: number };

interface CartViewProps {
    cartItem: LineItem[];
    actDeleteAll: () => void;
    actUpdateItem: (id: string | number, quantityDelta: number) => void;
    actDeleteItem: (id: string | number) => void;
}

function CartView(props: CartViewProps) {
    const [showCustom, setShowCustom] = useState<boolean>(false);
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

    const handleChangeQuantity = (
        currentQuantity: number,
        productId: string | number,
        delta: 1 | -1
    ) => {
        if ((delta === -1 && currentQuantity <= 1) || (delta === 1 && currentQuantity >= 100)) return;
        const { actUpdateItem } = props;
        actUpdateItem(productId, delta);
        toast.success('Cập nhật thành công!');
    };

    const showCartItem = () => {
        const { cartItem } = props;
        if (!Array.isArray(cartItem) || cartItem.length === 0) return null;
        return cartItem.map((item, index) => {
            const quantity = Number(item.quantity) || 0;
            return (
                <CartItem
                    key={`${String(item.product?.id)}-${index}`}
                    item={item as any}
                    onDeleteItem={() => onDeleteItem(item.product.id)}
                    subItem={() => handleChangeQuantity(quantity, item.product.id, -1)}
                    plusItem={() => handleChangeQuantity(quantity, item.product.id, 1)}
                />
            );
        });
    };

    const onDeleteItem = (id: string | number) => {
        if (window.confirm('Bạn muốn xoá sản phẩm này')) {
            const { actDeleteItem } = props;
            actDeleteItem(id);
            toast.success('Cập nhật thành công!');
            if (!(localStorage.getItem('token') || '')) {
                setShowCustom(false);
                setLayout('container');
            }
        }
    };
    const totalAmount = useMemo(() => {
        const items = props?.cartItem ?? [];
        return items.reduce(
            (sum, it) => sum + (Number(it?.product?.price) || 0) * (Number(it?.quantity) || 0),
            0
        );
    }, [props?.cartItem]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { target } = e;
        const { name } = target;
        const { value } = target;
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
            toast.warning('Vui lòng nhập đủ thông tin của bạn!');
            return;
        }
        if (!isValidEmailAddress(email)) {
            toast.error('Nhập đúng định dạng email!');
            return;
        }
        if (!validatePhoneNumber(phone)) {
            toast.error('Số điện thoại phải có 10-11 chữ số!');
            return;
        }
        const listProduct = (cartItem || []).map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price,
            subtotal: item.product.price * item.quantity,
            discount: 0,
            note,
        }));
        axios
            .post(`${CONFIG.serverUrl}/orders`, {
                data: date,
                expectDateDelivery: date,
                note,
                customer: {
                    firstName,
                    lastName,
                    phone,
                    email,
                    address,
                },
                lines: listProduct,
            })
            .then((_) => {
                props?.actDeleteAll();
                setShowCustom(false);
                setLayout('container');
                window.location.href = '/SuccessPayment';
            })
            .catch((_) => {
                toast.error('Có lỗi xảy ra');
            });
    };

    const onDeleteAll = () => {
        if (localStorage.getItem('token') || '') {
            props?.actDeleteAll();
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
                    <p>{fNumber(props?.cartItem?.[0]?.product?.price || 0)} đ</p>
                    <p className="total">{fNumber(totalAmount)} đ</p>
                </div>
            </div>
            <button type="button" className="btn_payment" onClick={payment}>
                Đặt mua
            </button>
        </div>
    );
    return (
        <div className={layout}>
            <ToastContainer autoClose={1000} />
            <div className="page_cart">
                <div className="card_cart">
                    <div className="cart_header">
                        <p className="content_cart">Giỏ hàng</p>
                        <p className="number_cart">{props?.cartItem.length ?? 0} Sản phẩm</p>
                    </div>
                    <div className="cart_body">
                        <div className="option">
                            <div className="select_all">
                                <input type="checkbox" className="checkbox" />
                                <p className="text_selectAll" style={{ paddingLeft: 8 }}>
                                    Chọn tất cả
                                </p>
                            </div>
                            <button type="button" className="delete_item" onClick={onDeleteAll}>
                                <img src={ImageAssets.delete} alt="delete" />
                                <p className="text_delete">Xoá Tất cả</p>
                            </button>
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

export default CartView;
