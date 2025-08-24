import axios from 'axios';
import { CONFIG } from 'config-global';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

import { isValidEmailAddress, validateInput } from 'utils/Function';

const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'staff' },
];

const AccountComponent: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [id, setId] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isSetRole, setIsSetRole] = useState<string>('');

    const getDataAccount = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/users`)
            .then((res) => {
                setUsers(res.data || []);
            })
            .catch((_) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataAccount();
    }, [getDataAccount]);

    const onEdit = useCallback((userId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/users/${userId}`)
            .then((res) => {
                setId(userId);
                setShowModal(true);
                setFirstName(res.data.firstName || '');
                setLastName(res.data.lastName || '');
                setPhone(res.data.phone || '');
                setPassword(res.data.password || '');
                setEmail(res.data.email || '');
                setIsSetRole(res.data.role || '');
                setTitleModal('Cập nhật tài khoản');
            })
            .catch((_) => {});
    }, []);

    const onDelete = useCallback(
        (userId: any) => {
            axios
                .delete(`${CONFIG.serverUrl}/users/${userId}`)
                .then((_) => {
                    toast.success('Xóa thành công');
                    getDataAccount();
                })
                .catch((error) => {
                    toast.error(`${error}`);
                });
        },
        [getDataAccount]
    );

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Họ',
                selector: 'firstName',
                sortable: true,
            },
            {
                name: 'Tên',
                selector: 'lastName',
                sortable: true,
            },
            {
                name: 'Số điện thoại',
                selector: 'phone',
                sortable: true,
                right: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
                right: true,
            },
            {
                name: 'Chức vụ ',
                selector: 'role',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày tạo',
                selector: 'createDate',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày chỉnh sửa',
                selector: 'writeDate',
                sortable: true,
                right: true,
            },
            {
                name: 'Hành động',
                selector: (data: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => onEdit(data.id)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onDelete(data.id)}
                        >
                            Xoá
                        </Button>
                    </>
                ),
            },
        ],
        [onDelete, onEdit]
    );

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (
                firstName === '' ||
                lastName === '' ||
                phone === '' ||
                password === '' ||
                email === '' ||
                isSetRole === ''
            ) {
                toast.warning('Vui lòng điền đủ thông tin!');
                return;
            } else if (!isValidEmailAddress(email)) {
                toast.error('Nhập đúng định dạng email!');
                return;
            } else if (!validateInput(phone)) {
                toast.error('Số điện thoại phải có 10-11 chữ số');
                return;
            }

            if (id) {
                axios
                    .put(`${CONFIG.serverUrl}/users/${id}`, {
                        firstName,
                        lastName,
                        phone,
                        password,
                        email,
                        role: isSetRole,
                    })
                    .then((_) => {
                        setShowModal(false);
                        setFirstName('');
                        setLastName('');
                        setPhone('');
                        setPassword('');
                        setEmail('');
                        setIsSetRole('');
                        setId('');
                        toast.success('Cập nhật thành công!');
                        getDataAccount();
                    })
                    .catch((_) => {
                        toast.error('Có lỗi xảy ra');
                    });
            } else {
                axios
                    .post(`${CONFIG.serverUrl}/users/${id}`, {
                        firstName,
                        lastName,
                        phone,
                        password,
                        email,
                        role: isSetRole,
                    })
                    .then((_) => {
                        setShowModal(false);
                        setFirstName('');
                        setLastName('');
                        setPhone('');
                        setPassword('');
                        setEmail('');
                        setIsSetRole('');
                        setId('');
                        toast.success('Thêm thành công!');
                        getDataAccount();
                    })
                    .catch((_) => {
                        toast.error('Có lỗi xảy ra');
                    });
            }
        },
        [email, firstName, getDataAccount, id, isSetRole, lastName, password, phone]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            switch (name) {
                case 'firstName':
                    setFirstName(value);
                    break;
                case 'lastName':
                    setLastName(value);
                    break;
                case 'phone':
                    setPhone(value);
                    break;
                case 'password':
                    setPassword(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'isSetRole':
                    setIsSetRole(value);
                    break;
                default:
                    break;
            }
        },
        []
    );

    return (
        <>
            <h1 className="mt-10"> Danh mục tài khoản </h1>
            <ToastContainer autoClose={3000} />

            <div className="text-right">
                <Button
                    type="button"
                    className="btn btn-primary mbt-10"
                    onClick={() => {
                        setShowModal(true);
                        setTitleModal('Thêm tài khoản');
                        setId('');
                        setFirstName('');
                        setLastName('');
                        setPhone('');
                        setPassword('');
                        setEmail('');
                        setIsSetRole('');
                    }}
                >
                    Thêm tài khoản
                </Button>
            </div>
            <DataTable
                title="Account"
                columns={columns}
                data={users}
                defaultSortFieldId="title"
                pagination
                responsive={true}
            />
            {/* <table responsive="lg" id="example" className="table table-bordered">
          <thead>
            <tr>
              <th> # </th>
              <th> Họ tên </th>
              <th> Số điện thoại </th>
              <th> Email </th>
              <th> Chức vụ </th>
              <th> Ngày tạo </th>
              <th> Ngày chỉnh sửa </th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody> {this.showAccount(users)} </tbody>
        </table> */}

            <Modal
                show={showModal}
                size="lg"
                onHide={() => {
                    setShowModal(false);
                }}
            >
                <form onSubmit={onSave}>
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
                                <input
                                    className="form-control"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="Nhập họ"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Tên <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Nhập tên"
                                    value={lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Mật khẩu <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Số điện thoại <sup className="sub_text">*</sup>
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="phone"
                                    placeholder="Nhập thông tin số thoại điện"
                                    value={phone.toString()}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    {' '}
                                    Email <sup className="sub_text">*</sup>{' '}
                                </label>
                                <input
                                    className="form-control"
                                    placeholder="Nhập thông tin email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    Chức vụ <sup className="sub_text">*</sup>
                                </label>
                                <select
                                    className="form-control"
                                    size={1 as any}
                                    onChange={handleChange}
                                    value={isSetRole}
                                    name="isSetRole"
                                >
                                    <option>---Chức vụ---</option>
                                    {roles.map((item: any, index: any) => {
                                        return (
                                            <option value={item.name} key={index}>
                                                {' '}
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
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
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default AccountComponent;
