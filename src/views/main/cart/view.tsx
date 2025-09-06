import './Cart.css';

import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import { useRouter } from '@/routes/hooks';
import { fNumber } from '@/utils/format-number';
import { Modal, Button } from 'react-bootstrap';
import ImageAssets from '@/constants/ImagesAsset';
import { useMemo, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ClearableInput from '@/components/clearable-input';
import { useCreateOrderMutation } from '@/store/apis/orders';
import { localStorageGetItem } from '@/utils/storage-available';
import { isValidEmailAddress, validatePhoneNumber } from '@/utils/format-string';

import CartItem from './cart-item';

type Product = { id: string | number; price: number };
type LineItem = { product: Product; quantity: number };

type CustomerForm = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    note: string;
};

interface CartViewProps {
    cartItem: LineItem[];
    actDeleteAll: () => void;
    actUpdateItem: (id: string | number, quantityDelta: number) => void;
    actDeleteItem: (id: string | number) => void;
}

function CartView(props: CartViewProps) {
    const router = useRouter();
    const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
    const [showCustom, setShowCustom] = useState<boolean>(false);
    const [layout, setLayout] = useState<string>('container-fluid');
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; id: string | number | null }>({
        show: false,
        id: null,
    });
    const [form, setForm] = useState<CustomerForm>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        note: '',
    });

    useEffect(() => {
        if (!(localStorageGetItem('token') || '')) {
            setLayout('container');
        }
        // Always show the customer info form (guest checkout allowed)
        setShowCustom(true);
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

    const cartItems = props?.cartItem ?? [];
    const renderCartItems = useMemo(() => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) return null;
        return cartItems.map((item, index) => {
            const quantity = Number(item.quantity) || 0;
            return (
                <CartItem
                    key={`${String(item.product?.id)}-${index}`}
                    item={item as any}
                    onDeleteItem={() => setConfirmDelete({ show: true, id: item.product.id })}
                    subItem={() => handleChangeQuantity(quantity, item.product.id, -1)}
                    plusItem={() => handleChangeQuantity(quantity, item.product.id, 1)}
                />
            );
        });
    }, [cartItems]);

    const onDeleteItem = (id: string | number) => {
        const { actDeleteItem } = props;
        actDeleteItem(id);
        toast.success('Cập nhật thành công!');
        if (!(localStorageGetItem('token') || '')) {
            setShowCustom(false);
            setLayout('container');
        }
    };
    const totalAmount = useMemo(
        () => cartItems.reduce(
            (sum, it) => sum + (Number(it?.product?.price) || 0) * (Number(it?.quantity) || 0),
            0
        ),
        [cartItems]
    );
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { target } = e;
        const { name, value } = target as { name: keyof CustomerForm; value: string };
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const payment = async () => {
        const { firstName, lastName, email, address, phone, note } = form;
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
        try {
            await createOrder({
                body: {
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
                },
            }).unwrap();
            props?.actDeleteAll();
            setShowCustom(false);
            setLayout('container');
            router.push(paths.main.successPayment);
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onDeleteAll = () => {
        props?.actDeleteAll();
        setShowCustom(false);
        setLayout('container');
        toast.success('Thành công!');
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
                        value={form.firstName}
                        placeholder="Nhập họ"
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        onChange={onChange as any}
                        name="lastName"
                        value={form.lastName}
                        placeholder="Nhập tên"
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        placeholder="Nhập địa chỉ"
                        style={{ marginLeft: 20, width: '90%' }}
                        name="address"
                        value={form.address}
                        onChange={onChange as any}
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập số điện thoại"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={onChange as any}
                    />
                    <br />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập email"
                        value={form.email}
                        name="email"
                        type="email"
                        onChange={onChange as any}
                    />
                    <ClearableInput
                        className="input_custom"
                        style={{ marginLeft: 20, width: '90%' }}
                        placeholder="Nhập ghi chú nếu có"
                        value={form.note}
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
            <button type="button" className="btn_payment" onClick={payment} disabled={isCreatingOrder}>
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
                        <p className="number_cart">{props?.cartItem.length ?? 0} sản phẩm</p>
                    </div>
                    <div className="cart_body">
                        <div className="option">
                            <div className="select_all">
                                <input type="checkbox" className="checkbox" />
                                <p className="text_selectAll" style={{ paddingLeft: 8 }}>
                                    Chọn tất cả
                                </p>
                            </div>
                            {(props?.cartItem?.length ?? 0) > 0 && (
                                <button type="button" className="delete_item" onClick={onDeleteAll}>
                                    <img src={ImageAssets.delete} alt="delete" />
                                    <p className="text_delete">Xoá tất cả</p>
                                </button>
                            )}
                        </div>
                        <div className="content_cart_item">
                            {props?.cartItem?.length ? renderCartItems : emptyCart}
                        </div>
                    </div>
                </div>
                {elemCustom}
                <Modal
                    centered
                    show={confirmDelete.show}
                    onHide={() => setConfirmDelete({ show: false, id: null })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn muốn xoá sản phẩm này?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setConfirmDelete({ show: false, id: null })}>
                            Huỷ
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                if (confirmDelete.id !== null) onDeleteItem(confirmDelete.id);
                                setConfirmDelete({ show: false, id: null });
                            }}
                        >
                            Xoá
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default CartView;
