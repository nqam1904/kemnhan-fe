import ImageAssets from '@/constants/ImagesAsset';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/store/apis/orders';
import type { Order } from '@/store/types/order';
import { fCurrency } from '@/utils/format-number';
import { fDate } from '@/utils/format-time';
import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

const OrderComponents: React.FC = () => {
    const { data: orders = [], isLoading, refetch } = useGetOrdersQuery();
    const [updateStatus] = useUpdateOrderStatusMutation();
    const [confirm, setConfirm] = useState<{ show: boolean; id: any; label: string; next: number }>(
        { show: false, id: null, label: '', next: 0 }
    );

    const onRequestUpdate = (order: Order, nextStatus: number) => {
        const label = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() ||
            order.customer?.phone || `#${order.id}`;
        setConfirm({ show: true, id: order.id, label, next: nextStatus });
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
        window.open('https://kemnhanonline.vn/api/orders/export', '_blank');
    };

    const statusText = (s: number) =>
        s === 1 ? 'Chờ duyệt' : s === 2 ? 'Đang giao hàng' : s === 3 ? 'Hoàn thành đơn' : 'Từ chối đơn hàng';

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
                right: true,
                cell: (row: Order) => <span>{fCurrency(row.amountTotal, { currency: 'VND' })}</span>,
            },
            { name: 'Ghi chú', selector: (row: Order) => row.note || '' },
            {
                name: 'Ngày đặt',
                selector: (row: Order) => row.createDate,
                right: true,
                cell: (row: Order) => <span>{fDate(row.createDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Trạng thái',
                selector: (row: Order) => row.status,
                cell: (row: Order) => <span>{statusText(row.status)}</span>,
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
                                    className="btn btn-primary mr-10"
                                    onClick={() => onRequestUpdate(row, nextStatus)}
                                >
                                    {row.status === 1 ? 'Duyệt đơn hàng' : 'Đã giao hàng'}
                                </Button>
                            ) : null}
                            {row.status !== 4 && row.status !== 3 ? (
                                <Button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => onRequestUpdate(row, 4)}
                                >
                                    Từ chối đơn hàng
                                </Button>
                            ) : (
                                <img src={ImageAssets.information} alt="info" width={20} />
                            )}
                        </>
                    );
                },
            },
        ],
        []
    );

    return (
        <>
            <h1 className="mt-10">Đơn hàng</h1>
            <ToastContainer autoClose={1000} />
            <div className="text-right">
                <Button
                    variant="success"
                    className="mbt-10 ml-10"
                    type="button"
                    onClick={exportExcel}
                >
                    Xuất Excel
                </Button>
            </div>
            <DataTable
                title="Hoá đơn"
                columns={columns as any}
                data={orders as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive={true}
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
        </>
    );
};

export default OrderComponents;
