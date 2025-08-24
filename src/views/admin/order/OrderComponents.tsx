import axios from 'axios';
import { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { CONFIG } from 'config-global';

import ItemOrder from './ItemOrder';

class AccountComponent extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            orders: [],
            showModal: false,
            titleModal: '',
            btnStatus: '',
        };
    }
    async componentDidMount() {
        await this.getDataOrder();
    }
    getDataOrder() {
        axios
            .get(`${CONFIG.domain}/orders`)
            .then((res) => {
                this.setState({
                    orders: res.data,
                });
            })
            .catch((_) => {
                toast.error('Có lỗi xảy ra');
            });
    }

    onEdit = (id: any, status: any) => {
        if (window.confirm(`Bạn muốn thay đổi trạng thái đơn hàng?`)) {
            axios
                .put(`${CONFIG.domain}/orders/${id}`, {
                    status: status + 1,
                })
                .then((res) => {
                    if (res.data) {
                        toast.success('Success!');
                        this.getDataOrder();
                    }
                })
                .catch((_) => toast.error('Có lỗi xảy ra'));
        }
    };
    onDelete = (id: any) => {
        if (window.confirm(`Bạn có muốn từ chối đơn hàng này? `)) {
            axios
                .put(`${CONFIG.domain}/orders/${id}`, {
                    status: 4,
                })
                .then((res) => {
                    if (res.data) {
                        toast.success('Success!');
                        this.getDataOrder();
                    }
                })
                .catch((_) => toast.error('Có lỗi xảy ra'));
        }
    };

    showOder(orders) {
        var result = null;
        if (orders.length > 0) {
            result = orders.map((item: any, index: any) => {
                return (
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
                        onEdit={() => {
                            this.onEdit(item.id, item.status);
                        }}
                        onDelete={() => {
                            this.onDelete(item.id);
                        }}
                    />
                );
            });
        }
        return result;
    }

    render(): React.ReactNode {
        const { orders } = this.state;

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
                    <tbody>{this.showOder(orders)}</tbody>
                </Table>
            </>
        );
    }
}

export default AccountComponent;
