import { toast } from 'react-toastify';
import { useRouter } from '@/routes/hooks';
import { Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import React, { useMemo, useState, useCallback } from 'react';
import compactDataTableStyles from '@/components/data-table/styles';
import { useGetCustomersQuery, useLazyGetCustomerByIdQuery } from '@/store/apis/customers';

const CustomerView: React.FC = () => {
    const { data: customers = [], isLoading } = useGetCustomersQuery();
    const router = useRouter();
    const [getCustomerById] = useLazyGetCustomerByIdQuery();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [createDate, setCreateDate] = useState<string>('');

    const onEdit = useCallback(async (customerId: any) => {
        try {
            const res = await getCustomerById(customerId).unwrap();
            setShowModal(true);
            setTitleModal('Thông tin khách hàng');
            setFirstName(res.firstName || '');
            setLastName(res.lastName || '');
            setPhone(res.phone || '');
            setEmail(res.email || '');
            setAddress(res.address || '');
            setCreateDate(res.createDate || '');
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    }, [getCustomerById]);

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
                    <Button
                        type="button"
                        className="btn btn-primary white mr-10"
                        onClick={() => onEdit(data.id)}
                    >
                        Xem chi tiết
                    </Button>
                ),
            },
        ],
        [onEdit]
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Danh sách khách hàng</h1>
                <div>
                    <Button
                        variant="success"
                        type="button"
                        onClick={() => {
                            router.push('https://kemnhanonline.vn/api/customers/export');
                        }}
                    >
                        Xuất Excel
                    </Button>
                </div>
            </div>
            <DataTable
                title="Khách hàng"
                columns={columns as any}
                data={customers}
                defaultSortFieldId="title"
                pagination
                responsive
                progressPending={isLoading}
                dense
                customStyles={compactDataTableStyles}
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
                                    Họ <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={firstName} disabled />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    Tên <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={lastName} disabled />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Số điện thoại <sup className="sub_text">*</sup>
                                </label>
                                <input className="form-control" value={phone.toString()} disabled />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    Email <sup className="sub_text">*</sup>
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

export default CustomerView;
