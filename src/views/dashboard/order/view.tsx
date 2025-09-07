import './order.css';

import type { Order } from '@/store/types/order';

import { useRouter } from '@/routes/hooks';
import React, { useMemo, useState } from 'react';
import { fCurrency } from '@/utils/format-number';
import DataTable from 'react-data-table-component';
import { fDate, fDateTime } from '@/utils/format-time';
import { Badge, Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import compactDataTableStyles from '@/components/data-table/styles';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/store/apis/orders';

const OrderView: React.FC = () => {
    const { data: orders = [], isLoading, refetch } = useGetOrdersQuery();
    const router = useRouter();
    const [updateStatus] = useUpdateOrderStatusMutation();
    const [confirm, setConfirm] = useState<{ show: boolean; id: any; label: string; next: number }>(
        { show: false, id: null, label: '', next: 0 }
    );
    const [orderDetails, setOrderDetails] = useState<{ show: boolean; order: Order | null }>({
        show: false,
        order: null
    });

    const onRequestUpdate = (order: Order, nextStatus: number) => {
        const label = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() ||
            order.customer?.phone || `#${order.id}`;
        setConfirm({ show: true, id: order.id, label, next: nextStatus });
    };

    const onShowDetails = (order: Order) => {
        setOrderDetails({ show: true, order });
    };

    const onUpdate = async (id: any, status: number) => {
        try {
            await updateStatus({ id, body: { status } }).unwrap();
            toast.success('Success!');
            refetch();
        } catch (e) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const exportExcel = () => {
        router.push('https://kemnhanonline.vn/api/orders/export');
    };

    const getOrderStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return <Badge bg="warning">Chờ duyệt</Badge>;
            case 2:
                return <Badge bg="info">Đang giao</Badge>;
            case 3:
                return <Badge bg="success">Hoàn thành</Badge>;
            case 4:
                return <Badge bg="danger">Từ chối</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    const columns = useMemo(
        () => [
            { name: '#', selector: (_: any, index: number) => index + 1, width: '60px' },
            {
                name: 'Họ tên',
                selector: (row: Order) => `${row.customer.firstName} ${row.customer.lastName}`,
                sortable: true,
            },
            { name: 'Số điện thoại', selector: (row: Order) => row.customer.phone, sortable: true },
            {
                name: 'Tổng tiền',
                selector: (row: Order) => row.amountTotal,
                cell: (row: Order) => <span>{fCurrency(row.amountTotal, { currency: 'VND' })}</span>,
            },
            { name: 'Ghi chú', selector: (row: Order) => row.note || '' },
            {
                name: 'Ngày đặt',
                selector: (row: Order) => row.createDate,
                cell: (row: Order) => <span>{fDate(row.createDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Ngày cập nhật',
                selector: (row: Order) => row.writeDate,
                cell: (row: Order) => <span>{fDateTime(row.writeDate, 'HH:mm DD/MM/YYYY')}</span>,
            },
            {
                name: 'Trạng thái',
                selector: (row: Order) => row.status,
                cell: (row: Order) => getOrderStatusBadge(row.status),
            },
            {
                name: 'Chức năng',
                selector: (row: Order) => row.id as any,
                cell: (row: Order) => {
                    const nextStatus = row.status === 1 ? 2 : row.status === 2 ? 3 : 0;
                    return (
                        <>
                            {nextStatus ? (
                                <Button
                                    type="button"
                                    className={`btn ${row.status === 1 ? 'btn-primary' : 'btn-success'} mr-10`}
                                    onClick={() => onRequestUpdate(row, nextStatus)}
                                >
                                    {row.status === 1 ? 'Duyệt' : 'Đã giao hàng'}
                                </Button>
                            ) : null}
                            {row.status !== 4 && row.status !== 3 ? (
                                <Button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => onRequestUpdate(row, 4)}
                                >
                                    Từ chối
                                </Button>
                            ) : null}
                            <Button
                                type="button"
                                className="btn btn-primary btn-sm ml-2"
                                onClick={() => onShowDetails(row)}
                            >
                                Xem chi tiết
                            </Button>
                        </>
                    );
                },
            },
        ],
        []
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Danh sách đơn hàng</h1>
                <div>
                    <Button
                        variant="success"
                        type="button"
                        onClick={exportExcel}
                    >
                        Xuất Excel
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
            <DataTable
                title=""
                columns={columns as any}
                data={orders as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive
                dense
                customStyles={compactDataTableStyles}
            />
            <Modal
                show={confirm.show}
                onHide={() => setConfirm({ show: false, id: null, label: '', next: 0 })}
                centered
                backdrop="static"
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Xác nhận cập nhật</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`Bạn muốn cập nhật trạng thái đơn hàng của "${confirm.label}"?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => setConfirm({ show: false, id: null, label: '', next: 0 })}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={async () => {
                            if (!confirm.id || !confirm.next) return;
                            await onUpdate(confirm.id, confirm.next);
                            setConfirm({ show: false, id: null, label: '', next: 0 });
                        }}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Order Details Modal */}
            <Modal
                show={orderDetails.show}
                onHide={() => setOrderDetails({ show: false, order: null })}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng #{orderDetails.order?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderDetails.order && (
                        <div className="row">
                            <div className="col-md-6">
                                <h6>Thông tin khách hàng</h6>
                                <p><strong>Họ tên:</strong> {orderDetails.order.customer.firstName} {orderDetails.order.customer.lastName}</p>
                                <p><strong>Số điện thoại:</strong> {orderDetails.order.customer.phone}</p>
                                <p><strong>Email:</strong> {orderDetails.order.customer.email}</p>
                                <p><strong>Địa chỉ:</strong> {orderDetails.order.customer.address}</p>
                                {orderDetails.order.note && (
                                    <p><strong>Ghi chú:</strong> {orderDetails.order.note}</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <h6>Thông tin đơn hàng</h6>
                                <p><strong>Ngày đặt:</strong> {fDate(orderDetails.order.createDate, 'DD/MM/YYYY HH:mm')}</p>
                                <p><strong>Ngày giao dự kiến:</strong> {fDate(orderDetails.order.expectDateDelivery, 'DD/MM/YYYY HH:mm')}</p>
                                <p><strong>Trạng thái:</strong> {getOrderStatusBadge(orderDetails.order.status)}</p>
                                <p><strong>Phí vận chuyển:</strong> {fCurrency(orderDetails.order.shippingFee || 0, { currency: 'VND' })}</p>
                                <p><strong>Giảm giá:</strong> {fCurrency(orderDetails.order.discount || 0, { currency: 'VND' })}</p>
                                <p><strong>Tổng tiền:</strong> {fCurrency(orderDetails.order.amountTotal, { currency: 'VND' })}</p>
                            </div>
                            <div className="col-12 mt-3">
                                <h6>Sản phẩm đặt hàng</h6>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderDetails.order.lines?.map((line, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <strong>{line.product?.name || line.name}</strong>
                                                    </td>
                                                    <td>{line.quantity}</td>
                                                    <td>{fCurrency(line.unitPrice, { currency: 'VND' })}</td>
                                                    <td>{fCurrency(line.subtotal, { currency: 'VND' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="row">
                                    <div className="col-md-6 offset-md-6">
                                        <table className="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Tạm tính:</strong></td>
                                                    <td className="text-right">
                                                        {fCurrency((orderDetails.order.amountTotal - (orderDetails.order.shippingFee || 0)), { currency: 'VND' })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Phí vận chuyển:</strong></td>
                                                    <td className="text-right">
                                                        {fCurrency(orderDetails.order.shippingFee || 0, { currency: 'VND' })}
                                                    </td>
                                                </tr>
                                                {(orderDetails.order.discount || 0) > 0 && (
                                                    <tr>
                                                        <td><strong>Giảm giá:</strong></td>
                                                        <td className="text-right text-success">
                                                            -{fCurrency(orderDetails.order.discount || 0, { currency: 'VND' })}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr className="table-active">
                                                    <td><strong>Tổng cộng:</strong></td>
                                                    <td className="text-right">
                                                        <strong>{fCurrency(orderDetails.order.amountTotal, { currency: 'VND' })}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setOrderDetails({ show: false, order: null })}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrderView;
