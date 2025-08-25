import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const CustomerComponent: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [createDate, setCreateDate] = useState<string>('');
    const [id, setId] = useState<string>('');

    const getDataAccount = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/customers`)
            .then((res) => {
                setCustomers(res.data || []);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataAccount();
    }, [getDataAccount]);

    const onEdit = useCallback((customerId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/customers/${customerId}`)
            .then((res) => {
                setId(customerId);
                setShowModal(true);
                setTitleModal('Thông tin khách hàng');
                setFirstName(res.data.firstName || '');
                setLastName(res.data.lastName || '');
                setPhone(res.data.phone || '');
                setEmail(res.data.email || '');
                setAddress(res.data.address || '');
                setCreateDate(res.data.createDate || '');
            })
            .catch((_err) => {});
    }, []);

    const columns = useMemo(
        () => [
            { name: '#', selector: 'id', sortable: true },
            { name: 'Họ', selector: 'firstName', sortable: true },
            { name: 'Tên', selector: 'lastName', sortable: true },
            { name: 'Số điện thoại', selector: 'phone', sortable: true, right: true },
            { name: 'Email', selector: 'email', sortable: true, right: true },
            { name: 'Ngày mua hàng', selector: 'createDate', sortable: true, right: true },
            { name: 'Ngày chỉnh sửa', selector: 'writeDate', sortable: true, right: true },
            {
                name: 'Hành động',
                selector: (data: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-primary white mr-10"
                            onClick={() => onEdit(data.id)}
                        >
                            Xem chi tiết
                        </Button>
                    </>
                ),
            },
        ],
        [onEdit]
    );

    return (
        <>
            <h1 className="mt-10"> Danh mục khách hàng </h1>
            <div className="text-right">
                <Button
                    variant="success"
                    className="mbt-10 ml-10"
                    type="button"
                    onClick={() => {
                        window.open('https://kemnhanonline.vn/api/customers/export', '_blank');
                    }}
                >
                    Xuất Excel
                </Button>
            </div>
            <DataTable
                title="Khách hàng"
                columns={columns as any}
                data={customers}
                defaultSortFieldId="title"
                pagination
                responsive={true}
            />

            <Modal
                show={showModal}
                size="lg"
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <form onSubmit={(e) => e.preventDefault()}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="form-group col-6">
                                <label>
                                    {' '}
                                    Họ <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={firstName} disabled />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Tên <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={lastName} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Số điện thoại <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={phone.toString()} disabled />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Email <sup className="sub_text">*</sup>{' '}
                                </label>
                                <input className="form-control" value={email} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label> Địa chỉ</label>
                                <input className="form-control" value={address} disabled />
                            </div>
                            <div className=" form-group col-6">
                                <label> Ngày mua hàng</label>
                                <input className="form-control" value={createDate} disabled />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Đóng
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default CustomerComponent;
