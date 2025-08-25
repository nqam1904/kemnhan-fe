import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import ItemOrder from './item-order';

const OrderComponents: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);

    const getDataOrder = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/orders`)
            .then((res) => {
                setOrders(res.data || []);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataOrder();
    }, [getDataOrder]);

    const onEdit = useCallback(
        (id: any, status: any) => {
            if (window.confirm(`Bạn muốn thay đổi trạng thái đơn hàng?`)) {
                axios
                    .put(`${CONFIG.serverUrl}/orders/${id}`, {
                        status: status + 1,
                    })
                    .then((res) => {
                        if (res.data) {
                            toast.success('Success!');
                            getDataOrder();
                        }
                    })
                    .catch((_err) => toast.error('Có lỗi xảy ra'));
            }
        },
        [getDataOrder]
    );

    const onDelete = useCallback(
        (id: any) => {
            if (window.confirm(`Bạn có muốn từ chối đơn hàng này? `)) {
                axios
                    .put(`${CONFIG.serverUrl}/orders/${id}`, {
                        status: 4,
                    })
                    .then((res) => {
                        if (res.data) {
                            toast.success('Success!');
                            getDataOrder();
                        }
                    })
                    .catch((_err) => toast.error('Có lỗi xảy ra'));
            }
        },
        [getDataOrder]
    );

    const renderedOrders = useMemo(() => {
        if (!orders || orders.length === 0) return null;
        return orders.map((item: any, index: any) => (
            <ItemOrder
                key={index}
                index={index}
                id={item.id}
                name={item.customer.firstName + ' ' + item.customer.lastName}
                note={item.note}
                amountTotal={item.amountTotal}
                createDate={item.createDate}
                phone={item.customer.phone}
                status={item.status}
                onEdit={() => onEdit(item.id, item.status)}
                onDelete={() => onDelete(item.id)}
            />
        ));
    }, [onDelete, onEdit, orders]);

    return (
        <>
            <h1 className="mt-10"> Danh mục hoá đơn</h1>
            <ToastContainer autoClose={2000} />
            <div className="text-right">
                <Button
                    variant="success"
                    className="mbt-10 ml-10"
                    type="button"
                    onClick={() => {
                        window.open('https://kemnhanonline.vn/api/orders/export', '_blank');
                    }}
                >
                    Xuất Excel
                </Button>
            </div>
            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Họ tên </th>
                        <th> Số điện thoại </th>
                        <th> Tổng tiền</th>
                        <th> Ghi chú</th>
                        <th> Ngày đặt </th>
                        <th> Trạng thái </th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>{renderedOrders}</tbody>
            </Table>
        </>
    );
};

export default OrderComponents;
